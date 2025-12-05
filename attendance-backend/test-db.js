// test-db.js - Run this to check if users exist in database
const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();

    try {
        console.log('Testing Prisma connection...');

        // Check users
        const users = await prisma.user.findMany();
        console.log(`\n📋 Found ${users.length} users in database:`);
        users.forEach(u => {
            console.log(`  - ${u.email} (${u.role})`);
        });

        if (users.length === 0) {
            console.log('\n⚠️  No users found! Run the seed script:');
            console.log('   npx prisma migrate dev --name init');
            console.log('   node prisma/seed.js');
        } else {
            console.log('\n✅ Database has users. Login should work with:');
            console.log('   Admin: admin@example.com / admin123');
        }

        // Check courses
        const courses = await prisma.course.findMany();
        console.log(`\n📚 Found ${courses.length} courses`);

        // Check batches
        const batches = await prisma.batch.findMany();
        console.log(`📦 Found ${batches.length} batches`);

    } catch (error) {
        console.error('❌ Database error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
