import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Bell, Calendar, User, FileText, Filter, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function Announcements({ onNavigate, onLogout }) {
  const [filter, setFilter] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Assignment 1 Due',
      course: 'CSE101',
      instructor: 'Dr. John Smith',
      date: '2024-08-15',
      time: '11:59 PM',
      message: 'Please submit your assignment on the portal before the deadline.',
      status: 'new',
      hasAttachment: true,
    },
    {
      id: 2,
      title: 'Assignment 3 Deadline Extended',
      course: 'CSE102',
      instructor: 'Prof. Jane Doe',
      date: '2024-08-18',
      time: '5:00 PM',
      message: 'The deadline for Assignment 3 has been extended to August 20th. Please submit your work before 11 PM.',
      status: 'new',
      hasAttachment: false,
    },
    {
      id: 3,
      title: 'Midterm Exam Scheduled',
      course: 'CSE103',
      instructor: 'Dr. Mike Johnson',
      date: '2024-08-22',
      time: '10:00 AM',
      message: 'Midterm exam will be conducted in the main auditorium. Please report 15 minutes early.',
      status: 'read',
      hasAttachment: true,
    },
    {
      id: 4,
      title: 'Class Rescheduled',
      course: 'CSE104',
      instructor: 'Prof. Sarah Williams',
      date: '2024-08-20',
      time: '2:00 PM',
      message: 'Class has been rescheduled from 3:00 PM to 4:00 PM due to maintenance work.',
      status: 'read',
      hasAttachment: false,
    },
    {
      id: 5,
      title: 'Lab Session Cancelled',
      course: 'CSE105',
      instructor: 'Dr. Robert Brown',
      date: '2024-08-19',
      time: '9:00 AM',
      message: 'Lab session is cancelled today. Will resume from next week.',
      status: 'read',
      hasAttachment: false,
    },
    {
      id: 6,
      title: 'New Study Material Available',
      course: 'CSE101',
      instructor: 'Dr. John Smith',
      date: '2024-08-17',
      time: '3:30 PM',
      message: 'New study material for Chapter 5 has been uploaded to the portal.',
      status: 'read',
      hasAttachment: true,
    },
  ];

  const filteredAnnouncements = filter === 'all'
    ? announcements
    : announcements.filter(a => a.status === filter);

  return (
    <div className="flex">
      <Sidebar role="student" currentPage="announcements" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Sarah Johnson" />

        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 text-3xl mb-2">Announcements</h1>
              <p className="text-gray-600">Stay updated with the latest announcements from your instructors</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition ${filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-4 py-2 rounded-lg transition ${filter === 'new'
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                New
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg transition ${filter === 'read'
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Read
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-lg p-6 shadow hover:shadow-md transition border ${announcement.status === 'new'
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${announcement.status === 'new' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                      <Bell className={`w-6 h-6 ${announcement.status === 'new' ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-gray-900 font-semibold">{announcement.title}</h3>
                        {announcement.status === 'new' && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">New</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{announcement.course}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{announcement.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{announcement.date} at {announcement.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{announcement.message}</p>
                      {announcement.hasAttachment && (
                        <div className="flex items-center gap-2 text-blue-600 text-sm">
                          <FileText className="w-4 h-4" />
                          <span>Attachment available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="bg-white rounded-lg p-12 shadow border border-gray-200 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2">No announcements found</h3>
              <p className="text-gray-600">
                {filter === 'new'
                  ? 'You have no new announcements at the moment.'
                  : 'You have no read announcements.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}