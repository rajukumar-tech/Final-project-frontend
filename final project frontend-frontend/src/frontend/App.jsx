import { useState } from 'react';
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'admin' && (
        
          {currentPage === 'dashboard' && <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'students' && <AdminStudents onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'instructors' && <AdminInstructors onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'batches' && <AdminBatches onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'reports' && <AdminReports onNavigate={handleNavigate} onLogout={handleLogout} />}
        </>
      )}

      {userRole === 'instructor' && (
        
          {currentPage === 'dashboard' && <InstructorDashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'batches' && <InstructorBatches onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'attendance' && <TakeAttendance onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'reports' && <InstructorReports onNavigate={handleNavigate} onLogout={handleLogout} />}
        </>
      )}

      {userRole === 'student' && (
        
          {currentPage === 'dashboard' && <StudentDashboard onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'attendance' && <MyAttendance onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'courses' && <MyCourses onNavigate={handleNavigate} onLogout={handleLogout} />}
          {currentPage === 'announcements' && <Announcements onNavigate={handleNavigate} onLogout={handleLogout} />}
        </>
      )}
    </div>
  );
}
