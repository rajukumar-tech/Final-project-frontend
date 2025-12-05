import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Download, Calendar, BarChart3 } from 'lucide-react';

export function InstructorReports({ onNavigate, onLogout }) {
  const attendanceOverTime = [
    { date: '2024-08-15', cs101a: 92, cs101b: 85, cs201a: 88 },
    { date: '2024-08-16', cs101a: 95, cs101b: 87, cs201a: 90 },
    { date: '2024-08-17', cs101a: 90, cs101b: 82, cs201a: 85 },
    { date: '2024-08-18', cs101a: 93, cs101b: 88, cs201a: 92 },
    { date: '2024-08-19', cs101a: 96, cs101b: 90, cs201a: 94 },
  ];

  const studentPerformance = [
    { name: 'Alice Johnson', attendance: 96, status: 'Excellent' },
    { name: 'Bob Smith', attendance: 92, status: 'Good' },
    { name: 'Carol Davis', attendance: 85, status: 'Good' },
    { name: 'David Miller', attendance: 78, status: 'Fair' },
    { name: 'Eve Wilson', attendance: 88, status: 'Good' },
    { name: 'Frank Brown', attendance: 72, status: 'At Risk' },
    { name: 'Grace Lee', attendance: 94, status: 'Excellent' },
    { name: 'Henry Taylor', attendance: 80, status: 'Good' },
  ];

  return (
    <div className="flex">
      <Sidebar role="instructor" currentPage="reports" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Dr. Emily Smith" />

        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Track and analyze attendance across your batches</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Calendar className="w-5 h-5" />
                Select Period
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h3 className="text-gray-600 text-sm mb-2">Average Attendance</h3>
              <p className="text-gray-900 text-3xl font-semibold">88.5%</p>
              <p className="text-green-600 text-sm mt-2">↑ 2.3% from last week</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h3 className="text-gray-600 text-sm mb-2">Total Classes Held</h3>
              <p className="text-gray-900 text-3xl font-semibold">45</p>
              <p className="text-gray-600 text-sm mt-2">Across 3 batches</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h3 className="text-gray-600 text-sm mb-2">Students at Risk</h3>
              <p className="text-gray-900 text-3xl font-semibold">3</p>
              <p className="text-orange-600 text-sm mt-2">Below 75% threshold</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h3 className="text-gray-600 text-sm mb-2">Total Students</h3>
              <p className="text-gray-900 text-3xl font-semibold">125</p>
              <p className="text-gray-600 text-sm mt-2">Active enrollments</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600">Chart visualization would appear here</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Batch Comparison</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 font-medium">Batch A (CS101)</span>
                    <span className="text-gray-900 font-semibold">92%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 font-medium">Batch B (CS101)</span>
                    <span className="text-gray-900 font-semibold">87%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 font-medium">Batch C (CS201)</span>
                    <span className="text-gray-900 font-semibold">89%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Student Performance</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-900 font-semibold">Student Name</th>
                    <th className="px-6 py-3 text-left text-gray-900 font-semibold">Attendance %</th>
                    <th className="px-6 py-3 text-left text-gray-900 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformance.map((student, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-900">{student.name}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-200 rounded-full h-2 w-24">
                            <div
                              className={`h-2 rounded-full ${student.attendance >= 85
                                ? 'bg-green-500'
                                : student.attendance >= 75
                                  ? 'bg-orange-500'
                                  : 'bg-red-500'
                                }`}
                              style={{ width: `${student.attendance}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-900 font-semibold min-w-[40px]">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${student.status === 'Excellent'
                          ? 'bg-green-100 text-green-700'
                          : student.status === 'At Risk'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                          }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
