
import React from 'react';
import { Play, Clock, BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const { t } = useLanguage();

  const stats = [
    { 
      icon: BookOpen, 
      label: 'คอร์สที่เรียนจบ', 
      value: '12', 
      color: 'text-blue-600 bg-blue-100' 
    },
    { 
      icon: Clock, 
      label: 'ชั่วโมงการเรียน', 
      value: '48', 
      color: 'text-green-600 bg-green-100' 
    },
    { 
      icon: Award, 
      label: 'คะแนนเฉลี่ย', 
      value: '87%', 
      color: 'text-orange-600 bg-orange-100' 
    },
    { 
      icon: TrendingUp, 
      label: 'ความก้าวหน้า', 
      value: '78%', 
      color: 'text-purple-600 bg-purple-100' 
    }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'English Conversation Basics',
      titleTh: 'การสนทนาภาษาอังกฤษเบื้องต้น',
      level: 'Beginner',
      progress: 85,
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png'
    },
    {
      id: 2,
      title: 'Business English',
      titleTh: 'ภาษาอังกฤษธุรกิจ',
      level: 'Intermediate',
      progress: 60,
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png'
    },
    {
      id: 3,
      title: 'TOEIC Preparation',
      titleTh: 'เตรียมสอบ TOEIC',
      level: 'Advanced',
      progress: 40,
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png'
    }
  ];

  const upcomingLive = [
    {
      id: 1,
      title: 'Daily Conversation Practice',
      titleTh: 'ฝึกการสนทนาประจำวัน',
      time: '19:00',
      date: 'วันนี้',
      teacher: 'Teacher Sarah'
    },
    {
      id: 2,
      title: 'Grammar Workshop',
      titleTh: 'เวิร์คช็อปไวยากรณ์',
      time: '20:30',
      date: 'พรุ่งนี้',
      teacher: 'Teacher Mike'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="teacher-highlight rounded-xl p-8 text-center">
        <img 
          src="/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png" 
          alt="Professional Teacher"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 thai-text">
          {t('welcome')}
        </h1>
        <p className="text-lg mb-6 opacity-90 thai-text">
          {t('welcome_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onTabChange('courses')}
            className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            {t('learn_now')}
          </Button>
          <Button 
            onClick={() => onTabChange('live')}
            className="btn-secondary bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            <Users className="w-5 h-5 mr-2" />
            {t('join_class')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="classroom-card">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 thai-text">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Courses */}
        <Card className="classroom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="thai-text">{t('recent_courses')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600 thai-text">{course.titleTh}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {course.level}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {course.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              onClick={() => onTabChange('courses')}
              variant="outline" 
              className="w-full mt-4"
            >
              ดูคอร์สทั้งหมด
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Live Sessions */}
        <Card className="classroom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span className="thai-text">{t('upcoming_live')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingLive.map((session) => (
              <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <p className="text-sm text-gray-600 thai-text">{session.titleTh}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-600">{session.time}</div>
                    <div className="text-xs text-gray-500 thai-text">{session.date}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{session.teacher}</span>
                  <Button size="sm" className="btn-primary">
                    {t('join_live')}
                  </Button>
                </div>
              </div>
            ))}
            <Button 
              onClick={() => onTabChange('live')}
              variant="outline" 
              className="w-full mt-4"
            >
              ดูคลาสสดทั้งหมด
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
