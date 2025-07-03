
import React, { useState } from 'react';
import { Play, BookOpen, Clock, Users, Star, Filter } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CoursesProps {
  onTabChange: (tab: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const courses = [
    {
      id: 1,
      title: 'English Conversation Basics',
      titleTh: 'การสนทนาภาษาอังกฤษเบื้องต้น',
      description: 'เรียนรู้การสนทนาภาษาอังกฤษในชีวิตประจำวัน',
      level: 'beginner',
      category: 'conversation',
      duration: '4 ชั่วโมง',
      students: 1250,
      rating: 4.8,
      progress: 85,
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      lessons: 12,
      isEnrolled: true
    },
    {
      id: 2,
      title: 'Business English Essentials',
      titleTh: 'ภาษาอังกฤษธุรกิจพื้นฐาน',
      description: 'ภาษาอังกฤษสำหรับการทำงานและธุรกิจ',
      level: 'intermediate',
      category: 'business',
      duration: '6 ชั่วโมง',
      students: 890,
      rating: 4.9,
      progress: 60,
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      lessons: 18,
      isEnrolled: true
    },
    {
      id: 3,
      title: 'TOEIC Test Preparation',
      titleTh: 'เตรียมสอบ TOEIC',
      description: 'เตรียมพร้อมสำหรับการสอบ TOEIC',
      level: 'advanced',
      category: 'test-prep',
      duration: '8 ชั่วโมง',
      students: 567,
      rating: 4.7,
      progress: 40,
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      lessons: 24,
      isEnrolled: true
    },
    {
      id: 4,
      title: 'Grammar Fundamentals',
      titleTh: 'ไวยากรณ์พื้นฐาน',
      description: 'เรียนรู้ไวยากรณ์ภาษาอังกฤษที่จำเป็น',
      level: 'beginner',
      category: 'grammar',
      duration: '5 ชั่วโมง',
      students: 2100,
      rating: 4.6,
      progress: 0,
      thumbnail: '/lovable-uploads/ddb0b36d-9ade-4665-a66f-1bf230081312.png',
      lessons: 15,
      isEnrolled: false
    },
    {
      id: 5,
      title: 'Advanced Speaking Skills',
      titleTh: 'ทักษะการพูดขั้นสูง',
      description: 'พัฒนาทักษะการพูดภาษาอังกฤษให้คล่องแคล่ว',
      level: 'advanced',
      category: 'speaking',
      duration: '7 ชั่วโมง',
      students: 423,
      rating: 4.9,
      progress: 0,
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      lessons: 21,
      isEnrolled: false
    },
    {
      id: 6,
      title: 'English for Travel',
      titleTh: 'ภาษาอังกฤษสำหรับการท่องเที่ยว',
      description: 'ภาษาอังกฤษที่จำเป็นสำหรับการเดินทาง',
      level: 'intermediate',
      category: 'travel',
      duration: '3 ชั่วโมง',
      students: 1678,
      rating: 4.5,
      progress: 0,
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      lessons: 9,
      isEnrolled: false
    }
  ];

  const levels = [
    { id: 'all', label: 'ทั้งหมด', labelEn: 'All' },
    { id: 'beginner', label: 'ผู้เริ่มต้น', labelEn: 'Beginner' },
    { id: 'intermediate', label: 'ระดับกลาง', labelEn: 'Intermediate' },
    { id: 'advanced', label: 'ระดับสูง', labelEn: 'Advanced' }
  ];

  const categories = [
    { id: 'all', label: 'ทุกหมวดหมู่', labelEn: 'All Categories' },
    { id: 'conversation', label: 'การสนทนา', labelEn: 'Conversation' },
    { id: 'business', label: 'ธุรกิจ', labelEn: 'Business' },
    { id: 'test-prep', label: 'เตรียมสอบ', labelEn: 'Test Prep' },
    { id: 'grammar', label: 'ไวยากรณ์', labelEn: 'Grammar' },
    { id: 'speaking', label: 'การพูด', labelEn: 'Speaking' },
    { id: 'travel', label: 'การท่องเที่ยว', labelEn: 'Travel' }
  ];

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 thai-text">
          {t('all_courses')}
        </h1>
        <p className="text-gray-600 thai-text">
          เลือกคอร์สที่เหมาะกับระดับและความสนใจของคุณ
        </p>
      </div>

      {/* Filters */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="thai-text">ตัวกรอง</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 thai-text">
                ระดับความยาก
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level.id)}
                    className="thai-text"
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 thai-text">
                หมวดหมู่
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="thai-text"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="lesson-grid">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="classroom-card group">
            <div className="relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                <Button 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-primary"
                  onClick={() => {/* Handle course start */}}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {course.isEnrolled ? t('watch_now') : 'เริ่มเรียน'}
                </Button>
              </div>
              {course.isEnrolled && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500">
                    กำลังเรียน
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 thai-text line-clamp-1">
                    {course.titleTh}
                  </p>
                </div>
                <Badge className={getLevelBadgeColor(course.level)}>
                  {t(course.level)}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-4 thai-text line-clamp-2">
                {course.description}
              </p>

              {course.isEnrolled && course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="thai-text">ความก้าวหน้า</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} บทเรียน</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} คน</span>
                </div>
                {course.isEnrolled ? (
                  <Button 
                    className="btn-secondary"
                    onClick={() => {/* Continue course */}}
                  >
                    เรียนต่อ
                  </Button>
                ) : (
                  <Button 
                    className="btn-primary"
                    onClick={() => onTabChange('pricing')}
                  >
                    เริ่มเรียน
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 thai-text">
            ไม่พบคอร์สที่ตรงกับเงื่อนไข
          </h3>
          <p className="text-gray-500 thai-text">
            ลองเปลี่ยนตัวกรองหรือค้นหาคอร์สอื่น
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
