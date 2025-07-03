
import React, { useState } from 'react';
import { LanguageProvider } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Dashboard from '@/components/pages/Dashboard';
import Courses from '@/components/pages/Courses';
import Live from '@/components/pages/Live';
import Pricing from '@/components/pages/Pricing';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'courses':
        return <Courses onTabChange={setActiveTab} />;
      case 'live':
        return <Live />;
      case 'quizzes':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 thai-text">แบบทดสอบ</h2>
            <p className="text-gray-600 thai-text">ระบบแบบทดสอบกำลังพัฒนา เร็วๆ นี้</p>
          </div>
        );
      case 'documents':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 thai-text">เอกสารการเรียน</h2>
            <p className="text-gray-600 thai-text">ระบบเอกสารกำลังพัฒนา เร็วๆ นี้</p>
          </div>
        );
      case 'pricing':
        return <Pricing onTabChange={setActiveTab} />;
      case 'profile':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 thai-text">โปรไฟล์</h2>
            <p className="text-gray-600 thai-text">ระบบโปรไฟล์กำลังพัฒนา เร็วๆ นี้</p>
          </div>
        );
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
