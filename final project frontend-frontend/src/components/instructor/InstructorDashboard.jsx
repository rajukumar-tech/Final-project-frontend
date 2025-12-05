import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Calendar, ClipboardList, BookOpen, AlertTriangle, Clock } from 'lucide-react';

export function InstructorDashboard({ onNavigate, onLogout }) {
  const todaySessions = [
    { id: 1, batch: 'Batch A', course: 'CSE101', time: '9:00 AM', room: 'Room 101', status: 'Ongoing' },
    { id: 2, batch: 'Batch B', course: 'CSE102', time: '11:00 AM', room: 'Room 102', status: 'Upcoming' },
    { id: 3, batch: 'Batch C', course: 'CSE103', time: '2:00 PM', room: 'Room 103', status: 'Upcoming' },
  ];

  const attendanceToMark = [
    { id: 1, batch: 'Batch A', date: '2024-08-20', time: '9:00 AM', students: 45 },
    { id: 2, batch: 'Batch B', date: '2024-08-20', time: '2:00 PM', students: 38 },
  ];

  const batches = [
    { id: 1, name: 'Batch A', students: 45, attendance: 92 },
    { id: 2, name: 'Batch B', students: 38, attendance: 85 },
    { id: 3, name: 'Batch C', students: 42, attendance: 88 },
  ];

  const alerts = [
    { id: 1, student: 'John Doe', batch: 'Batch A', attendance: 65, message: 'Low attendance warning' },
    { id: 2, student: 'Jane Smith', batch: 'Batch B', attendance: 72, message: 'Below 75% threshold' },
  ];

  return (
    <div className="flex">
      <Sidebar role="instructor" currentPage="dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Dr. Emily Smith" />

        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-gray-900 text-3xl mb-2">Instructor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. Smith. Here's your schedule for today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">Today's Sessions</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">3</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Pending Attendance</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">2</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">My Batches</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">3</h2>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-600">Students at Risk</span>
              </div>
              <h2 className="text-gray-900 text-2xl font-semibold">2</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Sessions</h2>
              <div className="space-y-3">
                {todaySessions.map((session) => (
                  <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold mb-1">{session.batch}</h3>
                        <p className="text-gray-600 text-sm mb-2">{session.course}</p>
                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <span>{session.room}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${session.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                          }`}
                      >
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance to Mark</h2>
              <div className="space-y-3">
                {attendanceToMark.map((item) => (
                  <div key={item.id} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h3 className="text-gray-900 font-semibold mb-1">{item.batch}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.date} • {item.time}</p>
                    <button
                      onClick={() => onNavigate('attendance')}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                    >
                      Mark Attendance
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">My Batches</h2>
                <button
                  onClick={() => onNavigate('batches')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {batches.map((batch) => (
                  <div key={batch.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900 font-semibold">{batch.name}</h3>
                      <span className="text-gray-600 text-sm">{batch.students} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${batch.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900 text-sm font-semibold min-w-[45px]">{batch.attendance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Students at Risk</h2>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold mb-1">{alert.student}</h3>
                        <p className="text-gray-600 text-sm">{alert.batch} • {alert.attendance}% attendance</p>
                        <p className="text-gray-700 text-sm mt-1">{alert.message}</p>
                      </div>
                    </div>
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
