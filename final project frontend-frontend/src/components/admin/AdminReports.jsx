import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Download, Calendar, TrendingUp, Users, BookOpen, AlertTriangle } from 'lucide-react';

export function AdminReports({ onNavigate, onLogout }) {
  const attendanceTrendData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 87 },
    { month: 'Mar', attendance: 82 },
    { month: 'Apr', attendance: 89 },
    { month: 'May', attendance: 91 },
    { month: 'Jun', attendance: 88 },
    { month: 'Jul', attendance: 90 },
    { month: 'Aug', attendance: 89 },
  ];

  const courseDistributionData = [
    { course: 'CSE101', students: 45 },
    { course: 'CSE102', students: 38 },
    { course: 'CSE103', students: 42 },
    { course: 'CSE104', students: 40 },
    { course: 'CSE105', students: 35 },
  ];

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="reports" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} userName="Admin User" />
        
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">Analytics & Reports</h1>
              <p className="text-gray-600">Comprehensive attendance analytics and insights</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Calendar className="w-5 h-5" />
                Date Range
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-600">Average Attendance</span>
              </div>
              <h2 className="text-gray-900 text-3xl font-semibold">88.5%</h2>
              <p className="text-green-600 text-sm mt-2">↑ 1.2% from last month</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600">Total Students</span>
              </div>
              <h2 className="text-gray-900 text-3xl font-semibold">200</h2>
              <p className="text-gray-600 text-sm mt-2">Across all batches</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Total Courses</span>
              </div>
              <h2 className="text-gray-900 text-3xl font-semibold">10</h2>
              <p className="text-gray-600 text-sm mt-2">Active courses</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">At Risk</span>
              </div>
              <h2 className="text-gray-900 text-3xl font-semibold">15</h2>
              <p className="text-orange-600 text-sm mt-2">Below 75% attendance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Chart visualization would appear here</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h2>
              <div className="space-y-4">
                {courseDistributionData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900 font-medium">{item.course}</span>
                      <span className="text-gray-900 font-semibold">{item.students} students</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(item.students / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Attendance Summary</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-900 font-semibold">Month</th>
                    <th className="px-6 py-3 text-left text-gray-900 font-semibold">Average %</th>
                    <th className="px-6 py-3 text-left text-gray-900 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceTrendData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-900 font-medium">{item.month}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-200 rounded-full h-2 w-24">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${item.attendance}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-900 font-semibold">{item.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        {index > 0 && (
                          <span className={item.attendance > attendanceTrendData[index - 1].attendance ? 'text-green-600' : 'text-red-600'}>
                            {item.attendance > attendanceTrendData[index - 1].attendance ? '↑' : '↓'}
                          </span>
                        )}
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
                </div>
                <span className="text-gray-600">Avg Attendance
              <h2 className="text-gray-900">89.5%</h2>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-600">Total Sessions
              <h2 className="text-gray-900">1,248</h2>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Top Batch
              <h2 className="text-gray-900">CS101-A
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">At Risk
              <h2 className="text-gray-900">24</h2>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Attendance Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 mb-4">Attendance Trends
                <LineChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Course Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 mb-4">Course-wise Distribution
                <BarChart data={courseDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="course" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#3b82f6" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Absentee Reasons */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 mb-4">Absentee Reasons
                
                  <Pie
                    data={absenteeReasonsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {absenteeReasonsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Download Center */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">
              <h2 className="text-gray-900 mb-4">Download Reports
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Monthly Attendance ReportComplete attendance data for August 2024</div>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Student Performance ReportIndividual student attendance metrics
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Batch Analytics ReportComparative analysis across all batches
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Instructor Performance ReportTeaching effectiveness and session completion
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
