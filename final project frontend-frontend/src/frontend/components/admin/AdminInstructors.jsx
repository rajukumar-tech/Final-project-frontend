import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Search, Filter, Download, Plus, MoreVertical, Edit, Trash2, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function AdminInstructors({ onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const instructors = [
    { id, name, email, department, batches, sessions, status,
    { id, name, email, department, batches, sessions, status,
    { id, name, email, department, batches, sessions, status,
    { id, name, email, department, batches, sessions, status,
    { id, name, email, department, batches, sessions, status,
  ];

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="instructors" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} userName="Admin User" />
        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            
              <h1 className="text-gray-900 mb-2">Instructors ManagementManage and monitor all instructors in the system
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Plus className="w-5 h-5" />
              Add Instructor

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
                    placeholder="Search by name, email, or department..."
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Filter className="w-5 h-5" />
                Filter
                <Download className="w-5 h-5" />
                Export
          </div>

          {/* Instructors Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  
                    <th className="px-6 py-4 text-left text-gray-700">InstructorDepartmentAssigned BatchesActive SessionsStatusActions
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {instructors.map((instructor) => (
                    <tr key={instructor.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600">{instructor.name.split(' ')[1].charAt(0)}</span>
                          </div>
                          
                            <div className="text-gray-900">{instructor.name}</div>
                            <div className="text-gray-500">{instructor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{instructor.department}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          {instructor.batches} batches
                      <td className="px-6 py-4 text-gray-900">{instructor.sessions} sessions
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                          {instructor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-gray-600">Showing 1 to 5 of 87 instructors
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Previous1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover);
}
