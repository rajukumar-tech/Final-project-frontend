import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Users, TrendingUp, Calendar, BookOpen } from 'lucide-react';

export function InstructorBatches({ onNavigate, onLogout }) {
  const batches = [
    { id: 1, name: 'Batch A', course: 'CSE101', students: 45, attendance: 92, nextClass: '9:00 AM', room: 'Room 101' },
    { id: 2, name: 'Batch B', course: 'CSE102', students: 38, attendance: 85, nextClass: '2:00 PM', room: 'Room 102' },
    { id: 3, name: 'Batch C', course: 'CSE103', students: 42, attendance: 88, nextClass: '11:00 AM', room: 'Room 103' },
  ];

  return (
    <div className="flex">
      <Sidebar role="instructor" currentPage="batches" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} userName="Dr. Emily Smith" />
        
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-gray-900 text-3xl mb-2">My Batches</h1>
            <p className="text-gray-600">Manage your assigned batches and classes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-lg p-6 shadow border border-gray-200 hover:shadow-lg transition">
                <div className="mb-4">
                  <h2 className="text-gray-900 font-semibold mb-1">{batch.name}</h2>
                  <p className="text-gray-600 text-sm">{batch.course}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-gray-700 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{batch.students} students</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>Attendance: {batch.attendance}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 text-sm">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>Next: {batch.nextClass}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 text-sm">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span>{batch.room}</span>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <p className="text-gray-600 text-sm font-semibold mb-2">Attendance</p>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${batch.attendance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">
                    Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Settings
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    {batch.nextClass}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <BookOpen className="w-4 h-4 text-orange-600" />
                    {batch.room}</span>
                  </div>
                </div>

                {/* Attendance */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Average Attendance{batch.attendance}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        batch.attendance >= 85 ? 'bg-green-500' = 75 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${batch.attendance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover)}
                    className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover))}
          </div>
        </div>
      </div>
    </div>
  );
}
