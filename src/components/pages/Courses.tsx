
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
      title: 'Daily Conversation',
      titleTh: 'การสนทนาประจำวัน',
      description: 'เรียนรู้การสนทนาในชีวิตประจำวันที่ใช้บ่อย พร้อมตัวอย่างและการฝึกพูด',
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      level: 'Beginner',
      levelTh: 'ผู้เริ่มต้น',
      category: 'Conversation',
      categoryTh: 'การสนทนา',
      duration: '12 ชั่วโมง',
      lessons: 24,
      students: 1250,
      rating: 4.8,
      price: 'Free',
      progress: 75,
      isEnrolled: true
    },
    {
      id: 2,
      title: 'Business English',
      titleTh: 'ภาษาอังกฤษธุรกิจ',
      description: 'เรียนรู้ภาษาอังกฤษที่ใช้ในสำนักงานและการประชุม',
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      level: 'Intermediate',
      levelTh: 'ระดับกลาง',
      category: 'Business',
      categoryTh: 'ธุรกิจ',
      duration: '18 ชั่วโมง',
      lessons: 36,
      students: 890,
      rating: 4.9,
      price: 'Premium',
      progress: 45,
      isEnrolled: true
    },
    {
      id: 3,
      title: 'Grammar Fundamentals',
      titleTh: 'ไวยากรณ์พื้นฐาน',
      description: 'เรียนรู้ไวยากรณ์ภาษาอังกฤษเบื้องต้นที่จำเป็น',
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      level: 'Beginner',
      levelTh: 'ผู้เริ่มต้น',
      category: 'Grammar',
      categoryTh: 'ไวยากรณ์',
      duration: '15 ชั่วโมง',
      lessons: 30,
      students: 2100,
      rating: 4.7,
      price: 'Free',
      progress: 90,
      isEnrolled: true
    },
    {
      id: 4,
      title: 'TOEIC Speaking',
      titleTh: 'การพูด TOEIC',
      description: 'เตรียมความพร้อมสำหรับการสอบ TOEIC ส่วนการพูด',
      thumbnail: '/lovable-uploads/ddb0b36d-9ade-4665-a66f-1bf230081312.png',
      level: 'Advanced',
      levelTh: 'ระดับสูง',
      category: 'Test Prep',
      categoryTh: 'เตรียมสอบ',
      duration: '20 ชั่วโมง',
      lessons: 40,
      students: 650,
      rating: 4.9,
      price: 'Premium',
      progress: 30,
      isEnrolled: false
    },
    {
      id: 5,
      title: 'Travel English',
      titleTh: 'ภาษาอังกฤษการเดินทาง',
      description: 'ภาษาอังกฤษที่จำเป็นสำหรับการเดินทางต่างประเทศ',
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      level: 'Intermediate',
      levelTh: 'ระดับกลาง',
      category: 'Travel',
      categoryTh: 'การเดินทาง',
      duration: '10 ชั่วโมง',
      lessons: 20,
      students: 1500,
      rating: 4.6,
      price: 'Free',
      progress: 0,
      isEnrolled: false
    },
    {
      id: 6,
      title: 'Pronunciation Mastery',
      titleTh: 'การออกเสียงให้ถูกต้อง',
      description: 'ฝึกการออกเสียงภาษาอังกฤษให้ชัดเจนและถูกต้อง',
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      level: 'Intermediate',
      levelTh: 'ระดับกลาง',
      category: 'Speaking',
      categoryTh: 'การพูด',
      duration: '14 ชั่วโมง',
      lessons: 28,
      students: 780,
      rating: 4.8,
      price: 'Premium',
      progress: 0,
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
    { id: 'all', label: 'ทั้งหมด', labelEn: 'All' },
    { id: 'conversation', label: 'การสนทนา', labelEn: 'Conversation' },
    { id: 'business', label: 'ธุรกิจ', labelEn: 'Business' },
    { id: 'grammar', label: 'ไวยากรณ์', labelEn: 'Grammar' },
    { id: 'test-prep', label: 'เตรียมสอบ', labelEn: 'Test Prep' }
  ];

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || course.category.toLowerCase().replace(' ', '-') === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
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
          เลือกเรียนคอร์สที่เหมาะกับระดับและความต้องการของคุณ
        </p>
      </div>

      {/* Filters */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="thai-text">กรองคอร์ส</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 thai-text">
                หมวดหมู่
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
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
          <Card key={course.id} className="classroom-card">
            <div className="relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge className={getLevelBadgeColor(course.level)}>
                  {course.levelTh}
                </Badge>
              </div>
              {course.price === 'Premium' && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-500 text-white">
                    Premium
                  </Badge>
                </div>
              )}
              {course.isEnrolled && course.progress > 0 && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    ความคืบหน้า: {course.progress}%
                  </div>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 thai-text mb-2">
                  {course.titleTh}
                </p>
                <p className="text-sm text-gray-600 thai-text line-clamp-2">
                  {course.description}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
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
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} คน</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>

              {course.isEnrolled && course.progress > 0 && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {course.isEnrolled ? (
                  <Button className="flex-1 btn-primary">
                    <Play className="w-4 h-4 mr-2" />
                    {course.progress > 0 ? 'เรียนต่อ' : 'เริ่มเรียน'}
                  </Button>
                ) : (
                  <>
                    <Button 
                      className="flex-1 btn-secondary"
                      onClick={() => course.price === 'Premium' ? onTabChange('pricing') : null}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {course.price === 'Premium' ? 'ซื้อคอร์ส' : 'เรียนฟรี'}
                    </Button>
                  </>
                )}
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 thai-text">
            ไม่พบคอร์สที่ตรงกับการค้นหา
          </h3>
          <p className="text-gray-500 thai-text">
            ลองเปลี่ยนตัวกรองหรือดูคอร์สทั้งหมด
          </p>
        </div>
      )}
    </div>
  );
};

export default Courses;
