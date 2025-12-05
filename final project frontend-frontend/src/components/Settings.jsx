import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { User, Bell, Lock, Palette, Globe, Save } from 'lucide-react';
import { useState } from 'react';

export function Settings({ onNavigate, onLogout, role = 'admin' }) {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex">
            <Sidebar role={role} currentPage="settings" onNavigate={onNavigate} />

            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar onLogout={onLogout} onNavigate={onNavigate} userName="User" />

                <div className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-gray-900 text-3xl mb-2">Settings</h1>
                        <p className="text-gray-600">Manage your account preferences</p>
                    </div>

                    <div className="flex gap-6">
                        {/* Settings Tabs */}
                        <div className="w-64 bg-white rounded-lg shadow border border-gray-200 p-4">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <User className="w-5 h-5" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Bell className="w-5 h-5" />
                                    <span>Notifications</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Lock className="w-5 h-5" />
                                    <span>Security</span>
                                </button>
                            </nav>
                        </div>

                        {/* Settings Content */}
                        <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h2>
                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue="User Name"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="user@example.com"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                            <input
                                                type="text"
                                                defaultValue="Computer Science"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={() => alert('Settings saved!')}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="text-gray-900 font-medium">Email Notifications</p>
                                                <p className="text-gray-600 text-sm">Receive email alerts for important updates</p>
                                            </div>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
                                        </label>
                                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="text-gray-900 font-medium">Low Attendance Alerts</p>
                                                <p className="text-gray-600 text-sm">Get notified when students fall below 75%</p>
                                            </div>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
                                        </label>
                                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="text-gray-900 font-medium">Weekly Reports</p>
                                                <p className="text-gray-600 text-sm">Receive weekly attendance summaries</p>
                                            </div>
                                            <input type="checkbox" className="w-5 h-5 text-blue-600" />
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
                                    <div className="space-y-4 max-w-md">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <button
                                            onClick={() => alert('Password updated!')}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <Lock className="w-5 h-5" />
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
