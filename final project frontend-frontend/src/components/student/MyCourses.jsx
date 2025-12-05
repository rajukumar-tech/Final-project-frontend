import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { BookOpen, Users, Calendar } from 'lucide-react';

export function MyCourses({ onNavigate, onLogout }) {
  const courses = [
    {
      id: 1,
      code: 'CSE101',
      name: 'Introduction to Programming',
      instructor: 'Dr. John Smith',
      batch: 'Batch A',
      attendance: 92,
      nextClass: '9:00 AM',
      room: 'Room 101',
      color: 'bg-blue-600',
    },
    {
      id: 2,
      code: 'CSE102',
      name: 'Data Structures',
      instructor: 'Prof. Jane Doe',
      batch: 'Batch A',
      attendance: 85,
      nextClass: '11:00 AM',
      room: 'Room 102',
      color: 'bg-green-600',
    },
    {
      id: 3,
      code: 'CSE103',
      name: 'Database Design',
      instructor: 'Dr. Mike Johnson',
      batch: 'Batch B',
      attendance: 78,
      nextClass: '2:00 PM',
      room: 'Room 103',
      color: 'bg-purple-600',
    },
    {
      id: 4,
      code: 'CSE104',
      name: 'Web Development',
      instructor: 'Prof. Sarah Williams',
      batch: 'Batch B',
      attendance: 95,
      nextClass: '10:00 AM',
      room: 'Room 104',
      color: 'bg-orange-600',
    },
    {
      id: 5,
      code: 'CSE105',
      name: 'Mobile App Development',
      instructor: 'Dr. Robert Brown',
      batch: 'Batch C',
      attendance: 88,
      nextClass: '3:00 PM',
      room: 'Room 105',
      color: 'bg-red-600',
    },
  ];

  return (
    <div className="flex">
      <Sidebar role="student" currentPage="courses" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Sarah Johnson" />

        <div className="flex-1 p-8">
          <h1 className="text-gray-900 text-3xl mb-2">My Courses</h1>
          <p className="text-gray-600 mb-8">View your enrolled courses and attendance details</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <div className={`${course.color} px-6 py-4`}>
                  <div className="flex items-center gap-2 text-white">
                    <BookOpen className="w-5 h-5" />
                    <div>
                      <h3 className="font-semibold">{course.code}</h3>
                      <p className="text-sm opacity-90">{course.batch}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-gray-900 font-semibold mb-4">{course.name}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{course.nextClass} • {course.room}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Attendance</span>
                      <span className="text-gray-900 font-semibold">{course.attendance}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${course.attendance >= 85 ? 'bg-green-500' : course.attendance >= 75 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${course.attendance}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100">
                      View Details
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Mark Attendance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
