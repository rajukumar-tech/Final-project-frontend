import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Users, UserCheck, BookOpen, Calendar, AlertCircle, TrendingUp, Plus } from 'lucide-react';

export function AdminDashboard({ onNavigate, onLogout }) {
  const stats = [
    { label, value,248', icon, color, trend,
    { label, value, icon, color, trend,
    { label, value, icon, color, trend,
    { label, value, icon, color, trend,
  ];

  const alerts = [
    { id, type, message)', time,
    { id, type, message, time,
    { id, type, message, time,
  ];

  const recentActivity = [
    { id, action, user, batch, time,
    { id, action, user, batch, time,
    { id, action, user, batch, time,
    { id, action, user, batch, time,
  ];

  const quickActions = [
    { label, icon, action,
    { label, icon, action,
    { label, icon, action,
    { label, icon, action,
  ];

  return (
    <div className="flex">
      <Sidebar role="admin" currentPage="dashboard" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onLogout={onLogout} userName="Admin User" />
        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Admin DashboardWelcome back Here&apos;s what&apos;s happening today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      {stat.trend}</span>
                    </div>
                  </div>
                  <h3 className="text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-gray-900 mb-4">Quick Actions
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => onNavigate(action.action)}
                    className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <Icon className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Alerts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Alerts & Warnings
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg ${
                      alert.type === 'warning' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <p className="text-gray-900 mb-1">{alert.message}</p>
                    <p className="text-gray-500">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 mb-4">Recent Activity
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-gray-600">{activity.user} • {activity.batch}</p>
                      <p className="text-gray-500 mt-1">{activity.time}</p>
                    </div>
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
