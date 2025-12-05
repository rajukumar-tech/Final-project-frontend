import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Search, Filter, Download, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function AdminInstructors({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const instructors = [
    { id: 1, name: 'Dr. John Smith', email: 'john@example.com', department: 'CSE', batches: 3, sessions: 45, status: 'Active' },
    { id: 2, name: 'Prof. Jane Doe', email: 'jane@example.com', department: 'CSE', batches: 2, sessions: 30, status: 'Active' },
    { id: 3, name: 'Dr. Mike Johnson', email: 'mike@example.com', department: 'CSE', batches: 4, sessions: 60, status: 'Active' },
    { id: 4, name: 'Prof. Sarah Williams', email: 'sarah@example.com', department: 'IT', batches: 2, sessions: 25, status: 'Inactive' },
  ];

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="instructors" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Admin User" />

        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">Instructors Management</h1>
              <p className="text-gray-600">Manage and monitor all instructors in the system</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              Add Instructor
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
                    placeholder="Search by name, email, or department..."
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
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Department</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Batches</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Sessions</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstructors.map((instructor) => (
                  <tr key={instructor.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-gray-900">{instructor.name}</td>
                    <td className="px-6 py-3 text-gray-700">{instructor.email}</td>
                    <td className="px-6 py-3 text-gray-700">{instructor.department}</td>
                    <td className="px-6 py-3 text-gray-700">{instructor.batches}</td>
                    <td className="px-6 py-3 text-gray-700">{instructor.sessions}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${instructor.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}>
                        {instructor.status}
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

          {filteredInstructors.length === 0 && (
            <div className="bg-white rounded-lg p-12 shadow border border-gray-200 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No instructors found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
