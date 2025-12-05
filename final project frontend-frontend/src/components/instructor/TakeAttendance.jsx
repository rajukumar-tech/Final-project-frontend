import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Calendar, Save, Send, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export function TakeAttendance({ onNavigate, onLogout }) {
  const [selectedBatch, setSelectedBatch] = useState('CS101 - Batch A');
  const [sessionDate, setSessionDate] = useState('2024-08-15');
  const [notes, setNotes] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', roll: 'CSE001', status: 'present', reason: '' },
    { id: 2, name: 'Bob Smith', roll: 'CSE002', status: 'present', reason: '' },
    { id: 3, name: 'Carol Davis', roll: 'CSE003', status: 'present', reason: '' },
    { id: 4, name: 'David Miller', roll: 'CSE004', status: 'absent', reason: 'Medical leave' },
    { id: 5, name: 'Eve Wilson', roll: 'CSE005', status: 'present', reason: '' },
    { id: 6, name: 'Frank Brown', roll: 'CSE006', status: 'late', reason: '' },
    { id: 7, name: 'Grace Lee', roll: 'CSE007', status: 'present', reason: '' },
    { id: 8, name: 'Henry Taylor', roll: 'CSE008', status: 'present', reason: '' },
  ]);

  const handleStatusChange = (studentId, status) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, status } : s));
  };

  const handleReasonChange = (studentId, reason) => {
    setStudents(students.map(s => s.id === studentId ? { ...s, reason } : s));
  };

  const handleBulkAction = (status) => {
    setStudents(students.map(s => ({ ...s, status })));
  };

  const handleSave = () => {
    const now = new Date();
    setLastSaved(now.toLocaleTimeString());
  };

  const handleSubmit = () => {
    alert('Attendance submitted successfully');
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;

  return (
    <div className="flex">
      <Sidebar role="instructor" currentPage="attendance" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Dr. Emily Smith" />

        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-gray-900 text-3xl mb-2">Take Attendance</h1>
            <p className="text-gray-600">Mark student attendance for your session</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Batch</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>CS101 - Batch A</option>
                  <option>CS101 - Batch B</option>
                  <option>CS201 - Batch A</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Status</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-green-300 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 text-sm">
                    {lastSaved ? `Saved at ${lastSaved}` : 'Not saved'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Session Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this session..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-gray-900 font-semibold">Bulk Actions</h3>
                <button
                  onClick={() => handleBulkAction('present')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark All Present
                </button>
                <button
                  onClick={() => handleBulkAction('absent')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Mark All Absent
                </button>
                <button
                  onClick={() => handleBulkAction('late')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm"
                >
                  <Clock className="w-4 h-4" />
                  Mark All Late
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div>Present: <span className="font-semibold">{presentCount}</span></div>
                <div>Absent: <span className="font-semibold">{absentCount}</span></div>
                <div>Late: <span className="font-semibold">{lateCount}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Student</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Roll Number</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-gray-900 font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">{student.name}</td>
                    <td className="px-6 py-3 text-gray-700">{student.roll}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${student.status === 'present'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${student.status === 'absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${student.status === 'late'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      {student.status === 'absent' && (
                        <input
                          type="text"
                          value={student.reason || ''}
                          onChange={(e) => handleReasonChange(student.id, e.target.value)}
                          placeholder="Enter reason..."
                          className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Save className="w-5 h-5" />
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
