
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Landing onTabChange={setActiveTab} />;
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
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
