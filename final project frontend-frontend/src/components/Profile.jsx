import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { User, Mail, Calendar, BookOpen, Users, Award, ArrowLeft } from 'lucide-react';

export function Profile({ onNavigate, onLogout, role = 'admin', userData }) {
    // Use userData if available, otherwise use defaults
    const user = userData || {
        name: 'User',
        email: 'user@example.com',
        role: role
    };

    const getRoleLabel = (role) => {
        if (role === 'admin') return 'Administrator';
        if (role === 'instructor') return 'Instructor';
        return 'Student';
    };

    const getRoleColor = (role) => {
        if (role === 'admin') return 'bg-purple-100 text-purple-700';
        if (role === 'instructor') return 'bg-blue-100 text-blue-700';
        return 'bg-green-100 text-green-700';
    };

    return (
        <div className="flex">
            <Sidebar role={role} currentPage="profile" onNavigate={onNavigate} />

            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar onLogout={onLogout} onNavigate={onNavigate} userName={user.name} />

                <div className="flex-1 p-8">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>

                    <div className="max-w-3xl">
                        {/* Profile Header */}
                        <div className="bg-white rounded-xl shadow border border-gray-200 p-8 mb-6">
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)}`}>
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">User ID</span>
                                        <span className="text-gray-900 font-mono text-sm">{user.id?.substring(0, 8) || 'N/A'}...</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Role</span>
                                        <span className="text-gray-900">{getRoleLabel(user.role)}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Status</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Active</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-600">Joined</span>
                                        <span className="text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
                                <div className="space-y-4">
                                    {role === 'admin' && (
                                        <>
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                                <Users className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <p className="text-gray-900 font-medium">Total Users</p>
                                                    <p className="text-gray-600 text-sm">Managing 50+ users</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                                <BookOpen className="w-5 h-5 text-green-600" />
                                                <div>
                                                    <p className="text-gray-900 font-medium">Active Courses</p>
                                                    <p className="text-gray-600 text-sm">5 courses running</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {role === 'instructor' && (
                                        <>
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                                <Users className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <p className="text-gray-900 font-medium">My Batches</p>
                                                    <p className="text-gray-600 text-sm">Teaching 3 batches</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-green-600" />
                                                <div>
                                                    <p className="text-gray-900 font-medium">Sessions Conducted</p>
                                                    <p className="text-gray-600 text-sm">45 sessions this semester</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {role === 'student' && (
                                        <>
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                                <Award className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <p className="text-gray-900 font-medium">Attendance Rate</p>
                                                    <p className="text-gray-600 text-sm">92% overall</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                                <BookOpen className="w-5 h-5 text-green-600" />
                                                <div>
                                                    <p className="text-gray-900 font-medium">Enrolled Courses</p>
                                                    <p className="text-gray-600 text-sm">5 active courses</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => onNavigate('settings')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => onNavigate('settings')}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Change Password
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
