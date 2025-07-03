
import React from 'react';
import { Calendar, Clock, Users, Video, BookOpen, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  onTabChange: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const { t } = useLanguage();

  const stats = [
    {
      title: 'คอร์สที่เรียนแล้ว',
      titleEn: 'Completed Courses',
      value: '12',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'ชั่วโมงการเรียน',
      titleEn: 'Learning Hours',
      value: '45',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'คลาสสด',
      titleEn: 'Live Sessions',
      value: '8',
      icon: Video,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'คะแนนเฉลี่ย',
      titleEn: 'Average Score',
      value: '87%',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Daily Conversation',
      titleTh: 'การสนทนาประจำวัน',
      progress: 75,
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Business English',
      titleTh: 'ภาษาอังกฤษธุรกิจ',
      progress: 45,
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Grammar Fundamentals',
      titleTh: 'ไวยากรณ์พื้นฐาน',
      progress: 90,
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      level: 'Beginner'
    }
  ];

  const upcomingLive = [
    {
      id: 1,
      title: 'Daily Conversation Practice',
      titleTh: 'ฝึกการสนทนาประจำวัน',
      time: '19:00 - 20:00',
      date: 'วันนี้',
      teacher: 'Teacher Sarah'
    },
    {
      id: 2,
      title: 'Business English Workshop',
      titleTh: 'เวิร์คช็อปภาษาอังกฤษธุรกิจ',
      time: '20:30 - 21:30',
      date: 'พรุ่งนี้',
      teacher: 'Teacher Mike'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="teacher-highlight text-center">
        <h1 className="text-3xl font-bold mb-4 thai-text">
          {t('welcome')}
        </h1>
        <p className="text-lg mb-6 thai-text">
          {t('welcome_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onTabChange('live')}
            className="btn-primary flex items-center space-x-2"
          >
            <Video className="w-5 h-5" />
            <span className="thai-text">{t('join_class')}</span>
          </Button>
          <Button 
            onClick={() => onTabChange('courses')}
            className="btn-secondary flex items-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span className="thai-text">{t('learn_now')}</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="classroom-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 thai-text">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Progress */}
        <Card className="classroom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="thai-text">{t('my_progress')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600 thai-text">{course.titleTh}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.progress}%
                  </Badge>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => onTabChange('courses')}
              variant="outline" 
              className="w-full mt-4"
            >
              <span className="thai-text">ดูคอร์สทั้งหมด</span>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Live Sessions */}
        <Card className="classroom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="thai-text">{t('upcoming_live')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLive.map((session) => (
                <div key={session.id} className="border-l-4 border-orange-400 pl-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{session.title}</h4>
                      <p className="text-sm text-gray-600 thai-text">{session.titleTh}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span className="thai-text">{session.teacher}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      {session.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => onTabChange('live')}
              className="w-full mt-4 btn-primary"
            >
              <span className="thai-text">ดูคลาสสดทั้งหมด</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="thai-text">เริ่มเรียนด่วน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => onTabChange('courses')}
              variant="outline" 
              className="h-20 flex flex-col items-center space-y-2"
            >
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-sm thai-text">คอร์สเรียน</span>
            </Button>
            <Button 
              onClick={() => onTabChange('live')}
              variant="outline" 
              className="h-20 flex flex-col items-center space-y-2"
            >
              <Video className="w-6 h-6 text-red-600" />
              <span className="text-sm thai-text">คลาสสด</span>
            </Button>
            <Button 
              onClick={() => onTabChange('quizzes')}
              variant="outline" 
              className="h-20 flex flex-col items-center space-y-2"
            >
              <Award className="w-6 h-6 text-green-600" />
              <span className="text-sm thai-text">แบบทดสอบ</span>
            </Button>
            <Button 
              onClick={() => onTabChange('pricing')}
              variant="outline" 
              className="h-20 flex flex-col items-center space-y-2"
            >
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <span className="text-sm thai-text">อัพเกรด</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
