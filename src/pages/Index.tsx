
import React, { useState } from 'react';
import { LanguageProvider } from '@/hooks/useLanguage';
import { AuthProvider } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Landing from '@/components/pages/Landing';
import Dashboard from '@/components/pages/Dashboard';
import Courses from '@/components/pages/Courses';
import Live from '@/components/pages/Live';
import Quizzes from '@/components/pages/Quizzes';
import Documents from '@/components/pages/Documents';
import Pricing from '@/components/pages/Pricing';
import Profile from '@/components/pages/Profile';

// Import new student modules
import StudentDashboard from '@/components/student/StudentDashboard';
import BookmarkSystem from '@/components/student/BookmarkSystem';
import AutoResume from '@/components/student/AutoResume';
import NotificationSystem from '@/components/student/NotificationSystem';

// Import LINE integration
import LineIntegration from '@/components/admin/LineIntegration';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Landing onTabChange={setActiveTab} />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'courses':
        return <Courses onTabChange={setActiveTab} />;
      case 'live':
        return <Live />;
      case 'quizzes':
        return <Quizzes />;
      case 'documents':
        return <Documents />;
      case 'pricing':
        return <Pricing onTabChange={setActiveTab} />;
      case 'profile':
        return <Profile />;
      case 'bookmarks':
        return <BookmarkSystem />;
      case 'resume':
        return <AutoResume />;
      case 'notifications':
        return <NotificationSystem />;
      case 'line-integration':
        return <LineIntegration />;
      default:
        return <Landing onTabChange={setActiveTab} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
