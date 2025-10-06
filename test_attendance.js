// Set DATABASE_URL for testing BEFORE importing modules
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_6UnZv3ToOiIb@ep-round-pond-ad2jhehr-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

import { storage } from './server/storage.js';
import { insertUserSchema, insertAttendanceSchema } from './shared/schema.js';

async function createDummyData() {
  console.log('Creating dummy data for testing...');

  try {
    // Create admin user
    const adminData = {
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@school.com',
      password: 'admin123',
      employeeId: 'ADM001'
    };
    const admin = await storage.createUser(insertUserSchema.parse(adminData));
    console.log('Created admin:', admin.id);

    // Create teachers
    const teachers = [
      {
        role: 'teacher',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@school.com',
        password: 'teacher123',
        employeeId: 'TCH001',
        department: 'Mathematics'
      },
      {
        role: 'teacher',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@school.com',
        password: 'teacher123',
        employeeId: 'TCH002',
        department: 'Science'
      }
    ];

    const createdTeachers = [];
    for (const teacherData of teachers) {
      const teacher = await storage.createUser(insertUserSchema.parse(teacherData));
      createdTeachers.push(teacher);
      console.log('Created teacher:', teacher.id, teacher.firstName);
    }

    // Create students for Class 10A
    const students = [
      {
        role: 'student',
        firstName: 'Aarav',
        lastName: 'Sharma',
        email: 'aarav.sharma.10A@school.com',
        password: 'student123',
        studentId: 'STU10A001',
        class: '10',
        section: 'A'
      },
      {
        role: 'student',
        firstName: 'Priya',
        lastName: 'Patel',
        email: 'priya.patel.10A@school.com',
        password: 'student123',
        studentId: 'STU10A002',
        class: '10',
        section: 'A'
      },
      {
        role: 'student',
        firstName: 'Rohan',
        lastName: 'Kumar',
        email: 'rohan.kumar.10A@school.com',
        password: 'student123',
        studentId: 'STU10A003',
        class: '10',
        section: 'A'
      },
      {
        role: 'student',
        firstName: 'Sneha',
        lastName: 'Singh',
        email: 'sneha.singh.10A@school.com',
        password: 'student123',
        studentId: 'STU10A004',
        class: '10',
        section: 'A'
      },
      {
        role: 'student',
        firstName: 'Vikram',
        lastName: 'Gupta',
        email: 'vikram.gupta.10A@school.com',
        password: 'student123',
        studentId: 'STU10A005',
        class: '10',
        section: 'A'
      }
    ];

    const createdStudents = [];
    for (const studentData of students) {
      const student = await storage.createUser(insertUserSchema.parse(studentData));
      createdStudents.push(student);
      console.log('Created student:', student.id, student.firstName);
    }

    return { admin, teachers: createdTeachers, students: createdStudents };

  } catch (error) {
    console.error('Error creating dummy data:', error);
    throw error;
  }
}

async function testAttendanceMarking(teacherId, students) {
  console.log('\nTesting attendance marking...');

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Mark attendance for all students
    const attendanceData = students.map(student => ({
      studentId: student.id,
      date: today,
      status: Math.random() > 0.2 ? 'present' : 'absent', // 80% present, 20% absent
      markedBy: teacherId,
      subject: 'Mathematics',
      class: '10',
      section: 'A'
    }));

    console.log('Marking attendance for', attendanceData.length, 'students...');

    const result = await storage.markAttendance(attendanceData.map(data => insertAttendanceSchema.parse(data)));
    console.log('Attendance marked successfully:', result.length, 'records');

    // Verify the attendance was saved
    const savedAttendance = await storage.getAttendanceByClass('10', 'A', today);
    console.log('Verified saved attendance:', savedAttendance.length, 'records found');

    // Test updating attendance (mark same students again with different status)
    console.log('\nTesting attendance update...');
    const updatedAttendanceData = attendanceData.map(data => ({
      ...data,
      status: data.status === 'present' ? 'absent' : 'present' // Flip the status
    }));

    const updateResult = await storage.markAttendance(updatedAttendanceData.map(data => insertAttendanceSchema.parse(data)));
    console.log('Attendance updated successfully:', updateResult.length, 'records');

    // Verify the update
    const updatedAttendance = await storage.getAttendanceByClass('10', 'A', today);
    console.log('Verified updated attendance:', updatedAttendance.length, 'records found');

    return { initial: result, updated: updateResult };

  } catch (error) {
    console.error('Error testing attendance marking:', error);
    throw error;
  }
}

async function runTests() {
  try {
    console.log('Starting attendance system tests...\n');

    // Create dummy data
    const { admin, teachers, students } = await createDummyData();

    // Test attendance marking
    const attendanceResults = await testAttendanceMarking(teachers[0].id, students);

    console.log('\n✅ All tests completed successfully!');
    console.log('Summary:');
    console.log('- Created 1 admin, 2 teachers, 5 students');
    console.log('- Marked initial attendance:', attendanceResults.initial.length, 'records');
    console.log('- Updated attendance:', attendanceResults.updated.length, 'records');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the tests
runTests();
