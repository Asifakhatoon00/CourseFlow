import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import FeaturesPage from './pages/public/FeaturesPage';
import LoginPage from './pages/public/LoginPage';

// Core Primary Operating Pages
import UploadCurriculumPage from './pages/admin/UploadCurriculumPage';
import SyllabusPdfComparisonView from './pages/admin/SyllabusPdfComparisonView';
import FacultyPage from './pages/admin/FacultyPage';
import VersionManagementPage from './pages/admin/VersionManagementPage';
import ReportsPage from './pages/admin/ReportsPage';
import CourseDetailPage from './pages/admin/CourseDetailPage';
import FacultyDashboardPage from './pages/faculty/FacultyDashboardPage';
import SuperAdminDashboardPage from './pages/superadmin/SuperAdminDashboardPage';
import AiAnalysisPage from './pages/admin/AiAnalysisPage';
import AicteReferencesPage from './pages/admin/AicteReferencesPage';
import ProgramsPage from './pages/admin/ProgramsPage';

import SyllabusBuilderPage from './pages/admin/SyllabusBuilderPage';

import { mockService } from './services/mockService';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await mockService.logout();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing & Login Routes */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><FeaturesPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage onLoginSuccess={handleLoginSuccess} /></PublicLayout>} />

        {/* Role Workspaces */}
        <Route
          path="/faculty/dashboard"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <FacultyDashboardPage user={currentUser} />
            </DashboardLayout>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <SuperAdminDashboardPage user={currentUser} />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <UploadCurriculumPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/curriculums/builder"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <SyllabusBuilderPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/curriculums/upload"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <UploadCurriculumPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/analysis/analysis-101"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <SyllabusPdfComparisonView currentUser={currentUser} />
            </DashboardLayout>
          }
        />

        <Route
          path="/analysis"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <AiAnalysisPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/faculty"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <FacultyPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/curriculums/:id/versions"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <VersionManagementPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <ReportsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/course/:code"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <CourseDetailPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/aicte-references"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <AicteReferencesPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/programs"
          element={
            <DashboardLayout user={currentUser} onLogout={handleLogout}>
              <ProgramsPage />
            </DashboardLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

