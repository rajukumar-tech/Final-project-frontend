import { GraduationCap, LayoutDashboard, Users, BookOpen, BarChart3, Settings, ClipboardList, FileText, Bell } from 'lucide-react';

export function Sidebar({ role, currentPage, onNavigate }) {
  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'instructors', label: 'Instructors', icon: GraduationCap },
    { id: 'batches', label: 'Batches', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const instructorNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Take Attendance', icon: ClipboardList },
    { id: 'batches', label: 'My Batches', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: ClipboardList },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  const navItems = role === 'admin' ? adminNav : role === 'instructor' ? instructorNav : studentNav;

  const getRoleLabel = (role) => {
    if (role === 'admin') return 'Admin Portal';
    if (role === 'instructor') return 'Instructor Portal';
    return 'Student Portal';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-gray-900 font-semibold">AttendanceHub</div>
            <div className="text-gray-500 text-sm">{getRoleLabel(role)}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
