import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Search, Filter, Plus, Users, BookOpen, Calendar } from 'lucide-react';
import { useState } from 'react';

export function AdminBatches({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const batches = [
    {
      id: 1,
      name: 'Batch A',
      course: 'CS101 - Intro to Programming',
      year: 2024,
      instructor: 'Dr. John Smith',
      students: 45,
      attendance: 92,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Batch B',
      course: 'CS101 - Intro to Programming',
      year: 2024,
      instructor: 'Prof. Jane Doe',
      students: 38,
      attendance: 88,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Batch C',
      course: 'CS201 - Data Structures',
      year: 2024,
      instructor: 'Dr. Mike Johnson',
      students: 52,
      attendance: 85,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Batch D',
      course: 'CS301 - Web Development',
      year: 2024,
      instructor: 'Prof. Sarah Williams',
      students: 30,
      attendance: 78,
      status: 'Inactive'
    },
  ];

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="batches" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Admin User" />

        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">Batch Management</h1>
              <p className="text-gray-600">Manage all academic batches and their assignments</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-5 h-5" />
              Create Batch
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search batches, courses, or instructors..."
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          {/* Batches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
                {/* Batch Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold text-lg mb-1">{batch.name}</h3>
                    <p className="text-gray-600 text-sm">{batch.course}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${batch.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {batch.status}
                  </span>
                </div>

                {/* Batch Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{batch.instructor}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">{batch.students} students</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Year {batch.year}</span>
                  </div>
                </div>

                {/* Attendance Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 text-sm">Attendance</span>
                    <span className="text-gray-900 font-medium">{batch.attendance}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${batch.attendance >= 85 ? 'bg-green-500' : batch.attendance >= 75 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      style={{ width: `${batch.attendance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                    View Details
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredBatches.length === 0 && (
            <div className="bg-white rounded-lg p-12 shadow border border-gray-200 text-center">
              <p className="text-gray-600">No batches found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
