
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Star, 
  Play, 
  Calendar,
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CourseProgress {
  id: string;
  title: string;
  titleTh: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  thumbnail: string;
  level: string;
  estimatedTime: string;
  certificate?: boolean;
}

interface StudentStats {
  totalCourses: number;
  completedCourses: number;
  totalTime: number;
  averageScore: number;
  certificates: number;
  streak: number;
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats>({
    totalCourses: 8,
    completedCourses: 3,
    totalTime: 156,
    averageScore: 87,
    certificates: 2,
    streak: 7
  });

  const [recentCourses, setRecentCourses] = useState<CourseProgress[]>([
    {
      id: '1',
      title: 'Daily Conversation',
      titleTh: 'การสนทนาประจำวัน',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      lastAccessed: '2 ชั่วโมงที่แล้ว',
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      level: 'Beginner',
      estimatedTime: '2 ชั่วโมง'
    },
    {
      id: '2',
      title: 'Business English',
      titleTh: 'ภาษาอังกฤษธุรกิจ',
      progress: 45,
      totalLessons: 25,
      completedLessons: 11,
      lastAccessed: '1 วันที่แล้ว',
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      level: 'Intermediate',
      estimatedTime: '3 ชั่วโมง'
    },
    {
      id: '3',
      title: 'Grammar Fundamentals',
      titleTh: 'ไวยากรณ์พื้นฐาน',
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
      lastAccessed: '3 วันที่แล้ว',
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      level: 'Beginner',
      estimatedTime: 'เสร็จแล้ว',
      certificate: true
    }
  ]);

  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: '1',
      title: 'Speaking Practice Session',
      titleTh: 'ฝึกพูดภาษาอังกฤษ',
      time: '19:00 - 20:00',
      date: 'วันนี้',
      instructor: 'Teacher Sarah'
    },
    {
      id: '2',
      title: 'Business Writing Workshop',
      titleTh: 'เวิร์คช็อปการเขียนภาษาอังกฤษธุรกิจ',
      time: '20:30 - 21:30',
      date: 'พรุ่งนี้',
      instructor: 'Teacher Mike'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          สวัสดี {user?.email?.split('@')[0] || 'นักเรียน'}! 👋
        </h1>
        <p className="text-blue-100">
          คุณเรียนมาแล้ว {stats.streak} วันติดต่อกัน! เก่งมาก! 🔥
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">คอร์สที่เรียน</p>
                <p className="text-2xl font-bold text-green-700">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">ชั่วโมงเรียน</p>
                <p className="text-2xl font-bold text-blue-700">{stats.totalTime}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold text-purple-700">{stats.averageScore}%</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">ใบรับรอง</p>
                <p className="text-2xl font-bold text-orange-700">{stats.certificates}</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>ความคืบหน้าคอร์สเรียน</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.titleTh}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {course.completedLessons}/{course.totalLessons} บทเรียน
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{course.progress}%</p>
                          <p className="text-xs text-gray-500">{course.lastAccessed}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            เหลือ {course.estimatedTime}
                          </span>
                          <div className="flex items-center space-x-2">
                            {course.certificate && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                ได้ใบรับรอง
                              </Badge>
                            )}
                            <Button size="sm" className="text-xs">
                              <Play className="w-3 h-3 mr-1" />
                              เรียนต่อ
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Classes & Quick Actions */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>คลาสที่จะมาถึง</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingClasses.map((session) => (
                <div key={session.id} className="border-l-4 border-orange-400 pl-4 py-2">
                  <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                  <p className="text-xs text-gray-600">{session.titleTh}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">{session.date}</span> • {session.time}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.date}
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full mt-2 text-xs">
                    เข้าร่วม
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievement Section */}
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <Star className="w-5 h-5" />
                <span>ความสำเร็จล่าสุด</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      จบคอร์ส Grammar Fundamentals
                    </p>
                    <p className="text-xs text-yellow-600">3 วันที่แล้ว</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      ได้คะแนน Quiz 95%
                    </p>
                    <p className="text-xs text-yellow-600">1 สัปดาห์ที่แล้ว</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
