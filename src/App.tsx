import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { LoginPage } from './pages/LoginPage';
import { useAppStore } from './store';

function App() {
  const { getCourses, getInstructors, getAnnouncements } = useAppStore();

  useEffect(() => {
    // Preload initial data
    getCourses();
    getInstructors();
    getAnnouncements();
  }, [getCourses, getInstructors, getAnnouncements]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="login" element={<LoginPage />} />
        
        {/* Add these routes as you build them */}
        {/* 
        <Route path="instructors" element={<InstructorsPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="instructors/:id" element={<InstructorDetailPage />} />
        <Route path="dashboard/*" element={<ProtectedRoute element={<DashboardLayout />} />} />
        */}
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;