import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Search, Filter, Download, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function AdminStudents({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', roll: 'CSE001', batch: 'Batch A', attendance: 92, status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', roll: 'CSE002', batch: 'Batch A', attendance: 85, status: 'Active' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', roll: 'CSE003', batch: 'Batch B', attendance: 78, status: 'Active' },
    { id: 4, name: 'David Miller', email: 'david@example.com', roll: 'CSE004', batch: 'Batch B', attendance: 95, status: 'Active' },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', roll: 'CSE005', batch: 'Batch C', attendance: 88, status: 'Inactive' },
    { id: 6, name: 'Frank Brown', email: 'frank@example.com', roll: 'CSE006', batch: 'Batch C', attendance: 82, status: 'Active' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', roll: 'CSE007', batch: 'Batch A', attendance: 91, status: 'Active' },
    { id: 8, name: 'Henry Taylor', email: 'henry@example.com', roll: 'CSE008', batch: 'Batch B', attendance: 79, status: 'Active' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="students" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Admin User" />

        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">Students Management</h1>
              <p className="text-gray-600">Manage and monitor all students in the system</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              Add Student
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, or roll number..."
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Roll No.</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Batch</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Attendance</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-gray-900">{student.name}</td>
                    <td className="px-6 py-3 text-gray-700">{student.email}</td>
                    <td className="px-6 py-3 text-gray-700">{student.roll}</td>
                    <td className="px-6 py-3 text-gray-700">{student.batch}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 rounded-full h-2 w-16">
                          <div
                            className={`h-2 rounded-full ${student.attendance >= 85 ? 'bg-green-500' : 'bg-orange-500'
                              }`}
                            style={{ width: `${student.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900">{student.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${student.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                        }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-lg p-12 shadow border border-gray-200 text-center">
              <p className="text-gray-600">No students found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
