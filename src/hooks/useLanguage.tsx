
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'th' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  th: {
    // Navigation
    dashboard: 'หน้าแรก',
    courses: 'คอร์สเรียน',
    live: 'เรียนสด',
    quizzes: 'แบบทดสอบ',
    documents: 'เอกสาร',
    pricing: 'แพ็คเกจ',
    profile: 'โปรไฟล์',
    
    // Dashboard
    welcome: 'ยินดีต้อนรับสู่ครูอิงลิช!',
    welcome_subtitle: 'เรียนภาษาอังกฤษกับครูมืออาชีพ พร้อมระบบที่ออกแบบมาเพื่อคนไทยโดยเฉพาะ',
    learn_with_professional: 'เรียนกับครูมืออาชีพ!',
    join_class: 'เข้าร่วมคลาส',
    learn_now: 'เรียนเลย!',
    my_progress: 'ความก้าวหน้าของฉัน',
    recent_courses: 'คอร์สล่าสุด',
    upcoming_live: 'คลาสสดที่จะมาถึง',
    
    // Courses
    all_courses: 'คอร์สทั้งหมด',
    beginner: 'ผู้เริ่มต้น',
    intermediate: 'ระดับกลาง',
    advanced: 'ระดับสูง',
    watch_now: 'ดูเลย',
    take_quiz: 'ทำแบบทดสอบ',
    
    // Live Sessions
    live_sessions: 'คลาสเรียนสด',
    join_live: 'เข้าร่วมสด',
    upcoming_sessions: 'คลาสที่จะมาถึง',
    
    // Pricing
    choose_package: 'เลือกแพ็คเกจที่เหมาะกับคุณ',
    general_package: 'แพ็คเกจทั่วไป',
    cefr_package: 'แพ็คเกจ CEFR',
    combo_package: 'แพ็คเกจรวม',
    per_month: '/เดือน',
    buy_now: 'สั่งซื้อตอนนี้',
    popular: 'ยอดนิยม',
    
    // Common
    loading: 'กำลังโหลด...',
    error: 'เกิดข้อผิดพลาด',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    continue: 'ดำเนินการต่อ',
    back: 'กลับ',
    next: 'ถัดไป'
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    courses: 'Courses',
    live: 'Live',
    quizzes: 'Quizzes',
    documents: 'Documents',
    pricing: 'Pricing',
    profile: 'Profile',
    
    // Dashboard
    welcome: 'Welcome to Kru English!',
    welcome_subtitle: 'Learn English with professional teachers using a system designed specifically for Thai learners',
    learn_with_professional: 'Learn with Professional Teachers!',
    join_class: 'Join Class',
    learn_now: 'Learn Now!',
    my_progress: 'My Progress',
    recent_courses: 'Recent Courses',
    upcoming_live: 'Upcoming Live Sessions',
    
    // Courses
    all_courses: 'All Courses',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    watch_now: 'Watch Now',
    take_quiz: 'Take Quiz',
    
    // Live Sessions
    live_sessions: 'Live Sessions',
    join_live: 'Join Live',
    upcoming_sessions: 'Upcoming Sessions',
    
    // Pricing
    choose_package: 'Choose Your Perfect Package',
    general_package: 'General Package',
    cefr_package: 'CEFR Package',
    combo_package: 'Combo Package',
    per_month: '/month',
    buy_now: 'Buy Now',
    popular: 'Popular',
    
    // Common
    loading: 'Loading...',
    error: 'Error occurred',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    next: 'Next'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'th' | 'en'>('th');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('kru-english-language') as 'th' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'th' ? 'en' : 'th';
    setLanguage(newLanguage);
    localStorage.setItem('kru-english-language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
