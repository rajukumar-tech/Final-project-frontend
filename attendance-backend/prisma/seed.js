// prisma/seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.attendanceRecord.deleteMany({});
  await prisma.attendanceSession.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.batchInstructor.deleteMany({});
  await prisma.batch.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  // Create password hash
  const passwordHash = await bcrypt.hash('password123', 10);
  const adminHash = await bcrypt.hash('admin123', 10);

  // Create Users
  console.log('Creating users...');

  // Admins
  const admins = await Promise.all([
    prisma.user.create({
      data: { name: 'Admin User', email: 'admin@example.com', password: adminHash, role: 'admin' }
    }),
    prisma.user.create({
      data: { name: 'Super Admin', email: 'superadmin@example.com', password: adminHash, role: 'admin' }
    }),
  ]);
  console.log(`  ✓ Created ${admins.length} admins`);

  // Instructors
  const instructors = await Promise.all([
    prisma.user.create({
      data: { name: 'Dr. John Smith', email: 'john.smith@example.com', password: passwordHash, role: 'instructor' }
    }),
    prisma.user.create({
      data: { name: 'Prof. Jane Doe', email: 'jane.doe@example.com', password: passwordHash, role: 'instructor' }
    }),
    prisma.user.create({
      data: { name: 'Dr. Mike Johnson', email: 'mike.johnson@example.com', password: passwordHash, role: 'instructor' }
    }),
    prisma.user.create({
      data: { name: 'Prof. Sarah Williams', email: 'sarah.williams@example.com', password: passwordHash, role: 'instructor' }
    }),
    prisma.user.create({
      data: { name: 'Dr. Robert Brown', email: 'robert.brown@example.com', password: passwordHash, role: 'instructor' }
    }),
    prisma.user.create({
      data: { name: 'Prof. Emily Davis', email: 'emily.davis@example.com', password: passwordHash, role: 'instructor' }
    }),
  ]);
  console.log(`  ✓ Created ${instructors.length} instructors`);

  // Students
  const students = await Promise.all([
    prisma.user.create({ data: { name: 'Alice Johnson', email: 'alice@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Bob Smith', email: 'bob@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Carol Davis', email: 'carol@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'David Miller', email: 'david@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Eve Wilson', email: 'eve@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Frank Brown', email: 'frank@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Grace Lee', email: 'grace@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Henry Taylor', email: 'henry@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Ivy Chen', email: 'ivy@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Jack Anderson', email: 'jack@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Karen White', email: 'karen@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Leo Martinez', email: 'leo@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Mia Garcia', email: 'mia@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Nathan Thomas', email: 'nathan@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Olivia Robinson', email: 'olivia@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Peter Clark', email: 'peter@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Quinn Lewis', email: 'quinn@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Rachel Walker', email: 'rachel@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Sam Hall', email: 'sam@example.com', password: passwordHash, role: 'student' } }),
    prisma.user.create({ data: { name: 'Tina Young', email: 'tina@example.com', password: passwordHash, role: 'student' } }),
  ]);
  console.log(`  ✓ Created ${students.length} students`);

  // Create Courses
  console.log('Creating courses...');
  const courses = await Promise.all([
    prisma.course.create({
      data: { code: 'CSE101', title: 'Introduction to Programming', description: 'Learn the basics of programming with Python' }
    }),
    prisma.course.create({
      data: { code: 'CSE102', title: 'Data Structures', description: 'Learn about arrays, linked lists, trees, and graphs' }
    }),
    prisma.course.create({
      data: { code: 'CSE103', title: 'Database Design', description: 'Introduction to SQL and database management' }
    }),
    prisma.course.create({
      data: { code: 'CSE104', title: 'Web Development', description: 'Build modern web applications with HTML, CSS, JavaScript' }
    }),
    prisma.course.create({
      data: { code: 'CSE105', title: 'Mobile App Development', description: 'Create mobile apps for iOS and Android' }
    }),
    prisma.course.create({
      data: { code: 'CSE201', title: 'Machine Learning', description: 'Introduction to AI and machine learning algorithms' }
    }),
    prisma.course.create({
      data: { code: 'CSE202', title: 'Cloud Computing', description: 'Learn AWS, Azure, and cloud architecture' }
    }),
  ]);
  console.log(`  ✓ Created ${courses.length} courses`);

  // Create Batches
  console.log('Creating batches...');
  const batches = await Promise.all([
    prisma.batch.create({ data: { name: 'Batch A - Morning', courseId: courses[0].id, startDate: new Date('2024-08-01'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch B - Evening', courseId: courses[0].id, startDate: new Date('2024-08-01'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch A', courseId: courses[1].id, startDate: new Date('2024-08-15'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch A', courseId: courses[2].id, startDate: new Date('2024-09-01'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch A', courseId: courses[3].id, startDate: new Date('2024-09-01'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch B', courseId: courses[3].id, startDate: new Date('2024-09-15'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch A', courseId: courses[4].id, startDate: new Date('2024-10-01'), isActive: true } }),
    prisma.batch.create({ data: { name: 'Batch A', courseId: courses[5].id, startDate: new Date('2024-10-01'), isActive: true } }),
  ]);
  console.log(`  ✓ Created ${batches.length} batches`);

  // Assign Instructors to Batches
  console.log('Assigning instructors to batches...');
  await Promise.all([
    prisma.batchInstructor.create({ data: { batchId: batches[0].id, instructorId: instructors[0].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[1].id, instructorId: instructors[1].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[2].id, instructorId: instructors[2].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[3].id, instructorId: instructors[3].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[4].id, instructorId: instructors[0].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[5].id, instructorId: instructors[1].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[6].id, instructorId: instructors[4].id } }),
    prisma.batchInstructor.create({ data: { batchId: batches[7].id, instructorId: instructors[5].id } }),
  ]);
  console.log('  ✓ Assigned instructors to batches');

  // Enroll Students in Batches
  console.log('Enrolling students in batches...');
  const enrollments = [];
  // Enroll students in different batches
  for (let i = 0; i < 5; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[0].id, studentId: students[i].id } }));
  }
  for (let i = 5; i < 10; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[1].id, studentId: students[i].id } }));
  }
  for (let i = 0; i < 10; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[2].id, studentId: students[i].id } }));
  }
  for (let i = 10; i < 15; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[3].id, studentId: students[i].id } }));
  }
  for (let i = 15; i < 20; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[4].id, studentId: students[i].id } }));
  }
  for (let i = 0; i < 8; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[5].id, studentId: students[i].id } }));
  }
  for (let i = 8; i < 16; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[6].id, studentId: students[i].id } }));
  }
  for (let i = 12; i < 20; i++) {
    enrollments.push(prisma.enrollment.create({ data: { batchId: batches[7].id, studentId: students[i].id } }));
  }
  await Promise.all(enrollments);
  console.log(`  ✓ Created ${enrollments.length} enrollments`);

  // Create Attendance Sessions
  console.log('Creating attendance sessions...');
  const sessions = [];
  const sessionDates = [
    new Date('2024-12-01'),
    new Date('2024-12-02'),
    new Date('2024-12-03'),
    new Date('2024-12-04'),
    new Date('2024-12-05'),
  ];

  for (let b = 0; b < batches.length; b++) {
    for (const date of sessionDates) {
      sessions.push(
        prisma.attendanceSession.create({
          data: {
            batchId: batches[b].id,
            instructorId: instructors[b % instructors.length].id,
            sessionDate: date,
            sessionLabel: b % 2 === 0 ? 'Morning' : 'Afternoon',
            duration: 60
          }
        })
      );
    }
  }
  const createdSessions = await Promise.all(sessions);
  console.log(`  ✓ Created ${createdSessions.length} attendance sessions`);

  // Create Attendance Records
  console.log('Creating attendance records...');
  const records = [];
  const statuses = ['present', 'present', 'present', 'present', 'absent', 'present', 'present', 'late', 'present', 'present'];

  for (const session of createdSessions.slice(0, 20)) {
    for (let i = 0; i < Math.min(5, students.length); i++) {
      records.push(
        prisma.attendanceRecord.create({
          data: {
            sessionId: session.id,
            studentId: students[i].id,
            status: statuses[i % statuses.length],
            remarks: statuses[i % statuses.length] === 'absent' ? 'Medical leave' : null
          }
        })
      );
    }
  }
  await Promise.all(records);
  console.log(`  ✓ Created ${records.length} attendance records`);

  console.log('\n✅ Database seeded successfully!');
  console.log('\n📋 Login credentials (Password for all: password123 except admin):');
  console.log('\n   ADMINS:');
  console.log('   • admin@example.com / admin123');
  console.log('   • superadmin@example.com / admin123');
  console.log('\n   INSTRUCTORS:');
  console.log('   • john.smith@example.com / password123');
  console.log('   • jane.doe@example.com / password123');
  console.log('   • mike.johnson@example.com / password123');
  console.log('   • sarah.williams@example.com / password123');
  console.log('   • robert.brown@example.com / password123');
  console.log('   • emily.davis@example.com / password123');
  console.log('\n   STUDENTS:');
  console.log('   • alice@example.com / password123');
  console.log('   • bob@example.com / password123');
  console.log('   • carol@example.com / password123');
  console.log('   • david@example.com / password123');
  console.log('   • eve@example.com / password123');
  console.log('   ... and 15 more students');
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
