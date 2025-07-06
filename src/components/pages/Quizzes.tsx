
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, BookOpen, Target, CheckCircle, XCircle } from 'lucide-react';

const Quizzes: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Quizzes', nameTh: 'แบบทดสอบทั้งหมด' },
    { id: 'grammar', name: 'Grammar', nameTh: 'ไวยากรณ์' },
    { id: 'vocabulary', name: 'Vocabulary', nameTh: 'คำศัพท์' },
    { id: 'listening', name: 'Listening', nameTh: 'การฟัง' },
    { id: 'reading', name: 'Reading', nameTh: 'การอ่าน' }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Present Tense Mastery',
      titleTh: 'การใช้ Present Tense',
      category: 'grammar',
      level: 'Beginner',
      levelTh: 'ระดับเริ่มต้น',
      questions: 20,
      duration: 15,
      attempts: 3,
      bestScore: 85,
      completed: true
    },
    {
      id: 2,
      title: 'Business Vocabulary',
      titleTh: 'คำศัพท์ธุรกิจ',
      category: 'vocabulary',
      level: 'Intermediate',
      levelTh: 'ระดับกลang',
      questions: 25,
      duration: 20,
      attempts: 1,
      bestScore: null,
      completed: false
    },
    {
      id: 3,
      title: 'Daily Conversation Listening',
      titleTh: 'การฟังบทสนทนาประจำวัน',
      category: 'listening',
      level: 'Beginner',
      levelTh: 'ระดับเริ่มต้น',
      questions: 15,
      duration: 25,
      attempts: 2,
      bestScore: 92,
      completed: true
    },
    {
      id: 4,
      title: 'Reading Comprehension',
      titleTh: 'ความเข้าใจในการอ่าน',
      category: 'reading',
      level: 'Advanced',
      levelTh: 'ระดับสูง',
      questions: 30,
      duration: 35,
      attempts: 0,
      bestScore: null,
      completed: false
    }
  ];

  const filteredQuizzes = selectedCategory === 'all' 
    ? quizzes 
    : quizzes.filter(quiz => quiz.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          English Quizzes & Tests
        </h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 thai-text">
          แบบทดสอบภาษาอังกฤษ
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Test your English skills with our comprehensive quizzes covering grammar, vocabulary, listening, and reading comprehension.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto thai-text mt-2">
          ทดสอบทักษะภาษาอังกฤษของคุณด้วยแบบทดสอบที่ครอบคลุมไวยากรณ์ คำศัพท์ การฟัง และความเข้าใจในการอ่าน
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="classroom-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
            <div className="text-xs thai-text text-gray-500">แบบทดสอบทั้งหมด</div>
          </CardContent>
        </Card>
        <Card className="classroom-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-xs thai-text text-gray-500">เสร็จสิ้นแล้ว</div>
          </CardContent>
        </Card>
        <Card className="classroom-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <div className="text-sm text-gray-600">Avg Score</div>
            <div className="text-xs thai-text text-gray-500">คะแนนเฉลี่ย</div>
          </CardContent>
        </Card>
        <Card className="classroom-card">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">Achievements</div>
            <div className="text-xs thai-text text-gray-500">ความสำเร็จ</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="text-sm"
          >
            {category.name}
            <span className="ml-1 thai-text text-xs">({category.nameTh})</span>
          </Button>
        ))}
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="classroom-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge className={getLevelColor(quiz.level)}>
                  {quiz.level}
                </Badge>
                {quiz.completed && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <p className="text-sm thai-text text-gray-600">{quiz.titleTh}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {quiz.questions} questions
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {quiz.duration} min
                  </div>
                </div>
                
                {quiz.bestScore && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Best Score:</span>
                    <Badge variant="outline" className="text-blue-600">
                      {quiz.bestScore}%
                    </Badge>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 thai-text">
                    พยายาม: {quiz.attempts} ครั้ง
                  </span>
                </div>
                
                <Button 
                  className="w-full mt-4"
                  variant={quiz.completed ? "outline" : "default"}
                >
                  {quiz.completed ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Start Quiz
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            More Quizzes Coming Soon!
          </h3>
          <h4 className="text-xl font-bold text-gray-700 mb-4 thai-text">
            แบบทดสอบเพิ่มเติมเร็วๆ นี้!
          </h4>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're continuously adding new quizzes and assessments to help you improve your English skills. 
            Stay tuned for speaking tests, writing assessments, and specialized topic quizzes.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto thai-text mt-2">
            เรากำลังเพิ่มแบบทดสอบและการประเมินใหม่ๆ อย่างต่อเนื่องเพื่อช่วยพัฒนาทักษะภาษาอังกฤษของคุณ 
            ติดตามแบบทดสอบการพูด การประเมินการเขียน และแบบทดสอบหัวข้อเฉพาะ
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quizzes;
