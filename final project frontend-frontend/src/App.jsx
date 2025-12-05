import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminInstructors } from './components/admin/AdminInstructors';
import { AdminBatches } from './components/admin/AdminBatches';
import { AdminReports } from './components/admin/AdminReports';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { TakeAttendance } from './components/instructor/TakeAttendance';
import { InstructorBatches } from './components/instructor/InstructorBatches';
import { InstructorReports } from './components/instructor/InstructorReports';
import { StudentDashboard } from './components/student/StudentDashboard';
import { MyAttendance } from './components/student/MyAttendance';
import { MyCourses } from './components/student/MyCourses';
import { Announcements } from './components/student/Announcements';
import { isAuthenticated, getCurrentUser, clearAuth } from './services/auth';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Check for existing authentication on mount
  useEffect(() => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setUserRole(user.role);
        setUserData(user);
      }
    }
  }, []);

  const handleLogin = (role, user) => {
    setUserRole(role);
    setUserData(user);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'admin' && (
        <>
          {currentPage === 'dashboard' && <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'students' && <AdminStudents onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'instructors' && <AdminInstructors onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'batches' && <AdminBatches onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'reports' && <AdminReports onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
        </>
      )}

      {userRole === 'instructor' && (
        <>
          {currentPage === 'dashboard' && <InstructorDashboard onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'batches' && <InstructorBatches onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'attendance' && <TakeAttendance onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'reports' && <InstructorReports onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
        </>
      )}

      {userRole === 'student' && (
        <>
          {currentPage === 'dashboard' && <StudentDashboard onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'attendance' && <MyAttendance onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'courses' && <MyCourses onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
          {currentPage === 'announcements' && <Announcements onNavigate={handleNavigate} onLogout={handleLogout} userData={userData} />}
        </>
      )}
    </div>
  );
}
