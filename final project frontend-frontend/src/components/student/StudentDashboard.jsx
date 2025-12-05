import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { TrendingUp, Calendar, AlertTriangle, BookOpen, Clock } from 'lucide-react';

export function StudentDashboard({ onNavigate, onLogout }) {
  const overallAttendance = 92;

  const todayClasses = [
    { id: 1, course: 'CSE101', time: '9:00 AM', instructor: 'Dr. John Smith', room: 'Room 101', status: 'Ongoing' },
    { id: 2, course: 'CSE102', time: '11:00 AM', instructor: 'Prof. Jane Doe', room: 'Room 102', status: 'Upcoming' },
    { id: 3, course: 'CSE103', time: '2:00 PM', instructor: 'Dr. Mike Johnson', room: 'Room 103', status: 'Upcoming' },
  ];

  const recentActivity = [
    { id: 1, course: 'CSE101', date: '2024-08-20', time: '9:00 AM', status: 'Present', instructor: 'Dr. John Smith' },
    { id: 2, course: 'CSE102', date: '2024-08-20', time: '11:00 AM', status: 'Present', instructor: 'Prof. Jane Doe' },
    { id: 3, course: 'CSE103', date: '2024-08-19', time: '2:00 PM', status: 'Absent', instructor: 'Dr. Mike Johnson' },
    { id: 4, course: 'CSE104', date: '2024-08-18', time: '10:00 AM', status: 'Present', instructor: 'Prof. Sarah Williams' },
  ];

  return (
    <div className="flex">
      <Sidebar role="student" currentPage="dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Sarah Johnson" />

        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-gray-900 text-3xl mb-2">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, Sarah. Here's your attendance overview.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">Overall Attendance</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">{overallAttendance}%</h2>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${overallAttendance}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600">Today's Classes</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">3</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Active Courses</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">5</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Current Streak</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">12 days</h2>
            </div>
          </div>

          {overallAttendance < 75 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h3 className="text-orange-900 font-semibold">Attendance Alert</h3>
                  <p className="text-orange-700 text-sm mt-1">Your attendance is below 75%. Please attend classes regularly.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Today's Classes</h2>
                <button className="text-blue-600 text-sm hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {todayClasses.map((classItem) => (
                  <div key={classItem.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold mb-1">{classItem.course}</h3>
                        <p className="text-gray-600 text-sm mb-2">{classItem.instructor}</p>
                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                        {classItem.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-blue-600 text-sm hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-gray-900 font-semibold">{activity.course}</p>
                      <p className="text-gray-600 text-sm">{activity.date} • {activity.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${activity.status === 'Present'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
