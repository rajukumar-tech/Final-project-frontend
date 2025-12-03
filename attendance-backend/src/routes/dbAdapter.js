const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function makeLocalUserStore() {
  const file = path.join(__dirname, '../../dev_users.json');
  let users = [];
  try {
    if (fs.existsSync(file)) users = JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  } catch (e) {
    users = [];
  }
  function save() {
    try { fs.writeFileSync(file, JSON.stringify(users, null, 2)); } catch (e) {}
  }

  return {
    user: {
      findUnique: async ({ where }) => {
        if (!where) return null;
        if (where.email) return users.find(u => u.email === where.email) || null;
        if (where.id) return users.find(u => u.id === where.id) || null;
        return null;
      },
      create: async ({ data, select }) => {
        const now = new Date().toISOString();
        const newUser = {
          id: crypto.randomUUID(),
          email: data.email,
          password: data.password,
          name: data.name ?? null,
          role: data.role ?? 'user',
          createdAt: now,
          updatedAt: now,
        };
        users.push(newUser);
        save();

        if (select) {
          const out = {};
          Object.keys(select).forEach(k => { if (select[k]) out[k] = newUser[k]; });
          return out;
        }
        return newUser;
      },
      update: async ({ where, data, select }) => {
        if (!where || !where.id) return null;
        const idx = users.findIndex(u => u.id === where.id);
        if (idx === -1) return null;

        if (data.email) {
          const other = users.find(u => u.email === data.email && u.id !== where.id);
          if (other) throw new Error('EMAIL_TAKEN');
        }

        const now = new Date().toISOString();
        const u = users[idx];
        if (data.name !== undefined) u.name = data.name;
        if (data.email !== undefined) u.email = data.email;
        if (data.password !== undefined) u.password = data.password;
        if (data.role !== undefined) u.role = data.role;
        u.updatedAt = now;
        users[idx] = u;
        save();

        if (select) {
          const out = {};
          Object.keys(select).forEach(k => { if (select[k]) out[k] = u[k]; });
          return out;
        }
        return u;
      }
    }
  };
}

function createSafeDb(prisma) {
  const fallback = makeLocalUserStore();
  return {
    user: {
      findUnique: async (args) => {
        if (!prisma) return fallback.user.findUnique(args);
        try {
          const res = await prisma.user.findUnique(args);
          if (!res) {
            // if prisma returned nothing, try the fallback store
            const fb = await fallback.user.findUnique(args);
            if (fb) return fb;
          }
          return res;
        } catch (e) {
          const msg = String(e || '');
          if (msg.includes('driverAdapterFactory') || msg.includes('requires either') || msg.includes('adapter')) {
            // degrade to fallback
            return fallback.user.findUnique(args);
          }
          throw e;
        }
      },
      create: async (args) => {
        if (!prisma) return fallback.user.create(args);
        try { return await prisma.user.create(args); } catch (e) {
          const msg = String(e || '');
          if (msg.includes('driverAdapterFactory') || msg.includes('requires either') || msg.includes('adapter')) {
            return fallback.user.create(args);
          }
          throw e;
        }
      },
      update: async (args) => {
        if (!prisma) return fallback.user.update(args);
        try { return await prisma.user.update(args); } catch (e) {
          const msg = String(e || '');
          if (msg.includes('driverAdapterFactory') || msg.includes('requires either') || msg.includes('adapter')) {
            return fallback.user.update(args);
          }
          throw e;
        }
      }
    }
  };
}

module.exports = { createSafeDb };
