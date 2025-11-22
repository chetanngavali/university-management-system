import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import StudentAttendance from './pages/student/Attendance';
import StudentResults from './pages/student/Results';
import TeacherAttendance from './pages/teacher/Attendance';
import TeacherResults from './pages/teacher/Results';
import AdminAdmissions from './pages/admin/Admissions';
import Layout from './components/Layout';
import NotFound from './components/NotFound';

const ProtectedRoute = ({ element, requiredRole }: { element: JSX.Element, requiredRole: string | null }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<Layout />}>
            {/* Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={<ProtectedRoute element={<StudentDashboard />} requiredRole="student" />} 
            />
            <Route 
              path="/student/attendance" 
              element={<ProtectedRoute element={<StudentAttendance />} requiredRole="student" />} 
            />
            <Route 
              path="/student/results" 
              element={<ProtectedRoute element={<StudentResults />} requiredRole="student" />} 
            />
            
            {/* Teacher Routes */}
            <Route 
              path="/teacher/dashboard" 
              element={<ProtectedRoute element={<TeacherDashboard />} requiredRole="teacher" />} 
            />
            <Route 
              path="/teacher/attendance" 
              element={<ProtectedRoute element={<TeacherAttendance />} requiredRole="teacher" />} 
            />
            <Route 
              path="/teacher/results" 
              element={<ProtectedRoute element={<TeacherResults />} requiredRole="teacher" />} 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} 
            />
            <Route 
              path="/admin/admissions" 
              element={<ProtectedRoute element={<AdminAdmissions />} requiredRole="admin" />} 
            />
            
            {/* Home route redirects based on user role */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;