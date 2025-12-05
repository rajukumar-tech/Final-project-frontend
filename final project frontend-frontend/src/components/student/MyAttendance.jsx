import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { TrendingUp, Calendar, Download } from 'lucide-react';

export function MyAttendance({ onNavigate, onLogout }) {
  const overallAttendance = 92;
  const classAverage = 88;

  const pieData = [
    { name: 'Present', value: 85, color: '#10b981' },
    { name: 'Late', value: 7, color: '#f59e0b' },
    { name: 'Absent', value: 8, color: '#ef4444' },
  ];

  const courseWiseData = [
    { course: 'React Fundamentals', present: 18, absent: 1, late: 1, percentage: 95 },
    { course: 'Web Design Basics', present: 16, absent: 2, late: 2, percentage: 80 },
    { course: 'JavaScript Advanced', present: 17, absent: 1, late: 2, percentage: 90 },
    { course: 'Database Design', present: 19, absent: 0, late: 1, percentage: 98 },
    { course: 'UI/UX Principles', present: 15, absent: 3, late: 2, percentage: 75 },
  ];

  const monthlyHeatmap = [
    { week: 'Week 1', mon: 'P', tue: 'P', wed: 'P', thu: 'L', fri: 'P' },
    { week: 'Week 2', mon: 'P', tue: 'P', wed: 'A', thu: 'P', fri: 'P' },
    { week: 'Week 3', mon: 'P', tue: 'L', wed: 'P', thu: 'P', fri: 'P' },
    { week: 'Week 4', mon: 'P', tue: 'P', wed: 'P', thu: 'P', fri: 'A' },
  ];

  const sessionTimeline = [
    { id: 1, date: 'Dec 4, 2024', course: 'React Fundamentals', session: 'Session 12', status: 'Present', instructor: 'John Smith', note: '' },
    { id: 2, date: 'Dec 3, 2024', course: 'Web Design Basics', session: 'Session 08', status: 'Present', instructor: 'Emma Wilson', note: '' },
    { id: 3, date: 'Dec 2, 2024', course: 'JavaScript Advanced', session: 'Session 15', status: 'Late', instructor: 'Mike Johnson', note: 'Traffic delay' },
    { id: 4, date: 'Dec 1, 2024', course: 'Database Design', session: 'Session 10', status: 'Present', instructor: 'Sarah Davis', note: '' },
    { id: 5, date: 'Nov 30, 2024', course: 'UI/UX Principles', session: 'Session 06', status: 'Present', instructor: 'Tom Brown', note: '' },
    { id: 6, date: 'Nov 29, 2024', course: 'React Fundamentals', session: 'Session 11', status: 'Absent', instructor: 'John Smith', note: 'Medical appointment' },
  ];

  const getStatusColor = (status) => {
    if (status === 'P') return 'bg-green-500';
    if (status === 'L') return 'bg-orange-500';
    if (status === 'A') return 'bg-red-500';
    return 'bg-gray-200';
  };

  return (
    <div className="flex">
      <Sidebar role="student" currentPage="attendance" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Sarah Johnson" />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">My Attendance</h1>
              <p className="text-gray-600">Track your attendance across all courses</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>

          {/* Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Attendance Chart Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 font-semibold mb-4">Overall Attendance</h2>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{overallAttendance}%</div>
                  <p className="text-gray-600 mt-2">Total Attendance</p>
                </div>
              </div>
              <div className="flex justify-center gap-4 text-sm">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 font-semibold mb-4">Statistics</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Present</span>
                  <span className="text-green-700 font-semibold">85 sessions</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Late</span>
                  <span className="text-orange-700 font-semibold">7 sessions</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Absent</span>
                  <span className="text-red-700 font-semibold">8 sessions</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Total Sessions</span>
                  <span className="text-blue-700 font-semibold">100</span>
                </div>
              </div>
            </div>

            {/* Comparison & Streak */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 font-semibold mb-4">Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Your Attendance</span>
                    <span className="text-gray-900 font-semibold">{overallAttendance}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${overallAttendance}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Class Average</span>
                    <span className="text-gray-900 font-semibold">{classAverage}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${classAverage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="text-gray-900 font-semibold">12 Days</h3>
                      <p className="text-gray-600 text-sm">Current Streak</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Heatmap */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h2 className="text-gray-900 font-semibold mb-4">Monthly Heatmap</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700"></th>
                    <th className="px-4 py-2 text-center text-gray-700">Monday</th>
                    <th className="px-4 py-2 text-center text-gray-700">Tuesday</th>
                    <th className="px-4 py-2 text-center text-gray-700">Wednesday</th>
                    <th className="px-4 py-2 text-center text-gray-700">Thursday</th>
                    <th className="px-4 py-2 text-center text-gray-700">Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyHeatmap.map((week, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-gray-700">{week.week}</td>
                      <td className="px-4 py-2 text-center">
                        <div className={`w-10 h-10 mx-auto ${getStatusColor(week.mon)} rounded flex items-center justify-center text-white font-semibold`}>
                          {week.mon}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className={`w-10 h-10 mx-auto ${getStatusColor(week.tue)} rounded flex items-center justify-center text-white font-semibold`}>
                          {week.tue}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className={`w-10 h-10 mx-auto ${getStatusColor(week.wed)} rounded flex items-center justify-center text-white font-semibold`}>
                          {week.wed}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className={`w-10 h-10 mx-auto ${getStatusColor(week.thu)} rounded flex items-center justify-center text-white font-semibold`}>
                          {week.thu}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className={`w-10 h-10 mx-auto ${getStatusColor(week.fri)} rounded flex items-center justify-center text-white font-semibold`}>
                          {week.fri}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600 text-sm">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-600 text-sm">Late</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600 text-sm">Absent</span>
              </div>
            </div>
          </div>

          {/* Course-wise Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h2 className="text-gray-900 font-semibold mb-4">Course-wise Breakdown</h2>
            <div className="space-y-4">
              {courseWiseData.map((course) => (
                <div key={course.course} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900 font-semibold">{course.course}</h3>
                    <span className="text-gray-900 font-bold">{course.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2 text-sm">
                    <span className="text-green-600">{course.present} Present</span>
                    <span className="text-orange-600">{course.late} Late</span>
                    <span className="text-red-600">{course.absent} Absent</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${course.percentage >= 85 ? 'bg-green-500' : course.percentage >= 75 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-gray-900 font-semibold mb-4">Session Timeline</h2>
            <div className="space-y-4">
              {sessionTimeline.map((session) => (
                <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">{session.date}</span>
                      </div>
                      <h3 className="text-gray-900 font-semibold mb-1">
                        {session.course} - {session.session}
                      </h3>
                      <p className="text-gray-600 text-sm">{session.instructor}</p>
                      {session.note && (
                        <p className="text-gray-500 mt-2 italic text-sm">{session.note}</p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${session.status === 'Present'
                        ? 'bg-green-100 text-green-700'
                        : session.status === 'Late'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
