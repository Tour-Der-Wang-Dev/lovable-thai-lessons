
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Clock, 
  ArrowRight, 
  BookOpen,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

interface ResumeSession {
  id: string;
  courseId: string;
  courseTitle: string;
  courseTitleTh: string;
  lessonTitle: string;
  lessonTitleTh: string;
  thumbnail: string;
  lastPosition: string;
  totalDuration: string;
  progressPercentage: number;
  lastAccessed: string;
  type: 'video' | 'document' | 'quiz';
  nextLesson?: {
    title: string;
    titleTh: string;
    duration: string;
  };
}

const AutoResume: React.FC = () => {
  const [resumeSessions, setResumeSessions] = useState<ResumeSession[]>([
    {
      id: '1',
      courseId: 'course-1',
      courseTitle: 'Daily Conversation',
      courseTitleTh: 'การสนทนาประจำวัน',
      lessonTitle: 'Asking for Directions',
      lessonTitleTh: 'การถามทาง',
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      lastPosition: '03:24',
      totalDuration: '08:15',
      progressPercentage: 41,
      lastAccessed: '2 ชั่วโมงที่แล้ว',
      type: 'video',
      nextLesson: {
        title: 'At the Bank',
        titleTh: 'ที่ธนาคาร',
        duration: '06:30'
      }
    },
    {
      id: '2',
      courseId: 'course-2',
      courseTitle: 'Business English',
      courseTitleTh: 'ภาษาอังกฤษธุรกิจ',
      lessonTitle: 'Meeting Preparation',
      lessonTitleTh: 'การเตรียมตัวประชุม',
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      lastPosition: '12:45',
      totalDuration: '15:20',
      progressPercentage: 83,
      lastAccessed: '1 วันที่แล้ว',
      type: 'video',
      nextLesson: {
        title: 'Leading a Meeting',
        titleTh: 'การเป็นประธานในที่ประชุม',
        duration: '18:45'
      }
    },
    {
      id: '3',
      courseId: 'course-3',
      courseTitle: 'IELTS Preparation',
      courseTitleTh: 'เตรียมสอบ IELTS',
      lessonTitle: 'Reading Strategies',
      lessonTitleTh: 'กลยุทธ์การอ่าน',
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      lastPosition: '05:12',
      totalDuration: '22:30',
      progressPercentage: 23,
      lastAccessed: '3 วันที่แล้ว',
      type: 'video'
    }
  ]);

  const [recentlyCompleted, setRecentlyCompleted] = useState([
    {
      id: 'completed-1',
      courseTitle: 'Grammar Fundamentals',
      lessonTitle: 'Present Perfect Tense',
      completedAt: '1 วันที่แล้ว',
      score: 95
    },
    {
      id: 'completed-2',
      courseTitle: 'Pronunciation Practice',
      lessonTitle: 'Vowel Sounds',
      completedAt: '2 วันที่แล้ว',
      score: 88
    }
  ]);

  const handleResumeLesson = (sessionId: string) => {
    console.log(`Resuming lesson: ${sessionId}`);
    // จะ redirect ไปยังบทเรียนพร้อมกับเวลาที่หยุดไว้
  };

  const handleStartFromBeginning = (sessionId: string) => {
    console.log(`Starting from beginning: ${sessionId}`);
    // จะเริ่มบทเรียนใหม่ตั้งแต่ต้น
  };

  const handleNextLesson = (sessionId: string) => {
    console.log(`Going to next lesson: ${sessionId}`);
    // จะไปบทเรียนถัดไป
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'document': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">เรียนต่อจากที่ค้างไว้</h1>
        <p className="text-gray-600">กลับมาเรียนต่อจากจุดที่หยุดไว้ล่าสุด</p>
      </div>

      {/* Resume Sessions */}
      {resumeSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span>บทเรียนที่ยังไม่เสร็จ</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeSessions.map((session) => (
              <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img
                      src={session.thumbnail}
                      alt={session.lessonTitle}
                      className="w-24 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getTypeBadgeColor(session.type)}>
                            {getTypeIcon(session.type)}
                            <span className="ml-1 capitalize">{session.type}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {session.courseTitle}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {session.lessonTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {session.lessonTitleTh}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{session.lastAccessed}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>หยุดไว้ที่: {session.lastPosition}</span>
                        <span>{session.progressPercentage}% เสร็จแล้ว</span>
                      </div>
                      <Progress value={session.progressPercentage} className="h-2" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleResumeLesson(session.id)}
                          className="flex items-center space-x-1"
                        >
                          <Play className="w-4 h-4" />
                          <span>เรียนต่อ</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartFromBeginning(session.id)}
                          className="flex items-center space-x-1"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>เริ่มใหม่</span>
                        </Button>
                      </div>

                      {session.nextLesson && session.progressPercentage > 80 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNextLesson(session.id)}
                          className="flex items-center space-x-1 text-blue-600"
                        >
                          <span>บทถัดไป: {session.nextLesson.titleTh}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recently Completed */}
      {recentlyCompleted.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>เพิ่งเรียนจบ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentlyCompleted.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lesson.lessonTitle}</p>
                      <p className="text-sm text-gray-600">{lesson.courseTitle}</p>
                      <p className="text-xs text-green-600">{lesson.completedAt}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      คะแนน {lesson.score}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {resumeSessions.length === 0 && recentlyCompleted.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีบทเรียนที่ค้างไว้</h3>
            <p className="text-gray-600 mb-4">เริ่มเรียนบทเรียนใหม่เพื่อใช้ฟีเจอร์นี้</p>
            <Button>เริ่มเรียนเลย</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutoResume;
