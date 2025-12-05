import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Users, UserCheck, BookOpen, Calendar, AlertCircle, TrendingUp, Plus } from 'lucide-react';

export function AdminDashboard({ onNavigate, onLogout }) {
  const stats = [
    { label: 'Total Users', value: '248', icon: Users, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Active Students', value: '189', icon: UserCheck, color: 'bg-green-500', trend: '+8%' },
    { label: 'Courses', value: '12', icon: BookOpen, color: 'bg-purple-500', trend: '+2' },
    { label: 'Sessions', value: '456', icon: Calendar, color: 'bg-orange-500', trend: '+24%' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Low attendance in Batch A1', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New course added', time: '5 hours ago' },
  ];

  const recentActivity = [
    { id: 1, action: 'Course created', user: 'Admin', batch: 'CSE101', time: '1 hour ago' },
    { id: 2, action: 'Batch enrollment', user: 'Teacher', batch: 'Batch A1', time: '2 hours ago' },
    { id: 3, action: 'Attendance recorded', user: 'Teacher', batch: 'Batch B2', time: '3 hours ago' },
  ];

  const quickActions = [
    { label: 'Create Course', icon: Plus, action: 'courses' },
    { label: 'Manage Batches', icon: BookOpen, action: 'batches' },
    { label: 'View Reports', icon: Calendar, action: 'reports' },
  ];

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="dashboard" onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="Admin User" />
        <div className="flex-1 p-8">
          <h1 className="text-gray-900 text-3xl mb-8">Welcome back Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-green-600 text-sm mt-2">{stat.trend}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Alerts & Warnings</h2>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded ${alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                    <p className="text-gray-900">{alert.message}</p>
                    <p className="text-gray-500 text-sm">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="border-b pb-3">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.user} • {activity.batch}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
