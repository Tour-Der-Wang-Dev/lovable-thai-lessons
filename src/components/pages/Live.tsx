
import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, MessageCircle, Bell } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LiveSessionCard from '@/components/live/LiveSessionCard';
import LiveBanner from '@/components/live/LiveBanner';
import WeeklySchedule from '@/components/live/WeeklySchedule';

const Live: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('today');

  const liveSessions = [
    {
      id: 1,
      title: 'Daily Conversation Practice',
      titleTh: 'ฝึกการสนทนาประจำวัน',
      teacher: 'Teacher Sarah',
      teacherTh: 'ครูซาร่าห์',
      time: '19:00 - 20:00',
      date: 'today',
      dateLabel: 'วันนี้',
      platform: 'zoom',
      participants: 24,
      maxParticipants: 30,
      level: 'Beginner',
      levelTh: 'ผู้เริ่มต้น',
      description: 'เรียนรู้การสนทนาในชีวิตประจำวันผ่านการฝึกพูดกับครูและเพื่อนร่วมคลาส',
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      isLive: false,
      canJoin: true
    },
    {
      id: 2,
      title: 'Business English Workshop',
      titleTh: 'เวิร์คช็อปภาษาอังกฤษธุรกิจ',
      teacher: 'Teacher Mike',
      teacherTh: 'ครูไมค์',
      time: '20:30 - 21:30',
      date: 'today',
      dateLabel: 'วันนี้',
      platform: 'tiktok',
      participants: 45,
      maxParticipants: 50,
      level: 'Intermediate',
      levelTh: 'ระดับกลาง',
      description: 'เรียนรู้การใช้ภาษาอังกฤษในสถานการณ์ทางธุรกิจ',
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      isLive: true,
      canJoin: true
    },
    {
      id: 3,
      title: 'Grammar Fundamentals',
      titleTh: 'ไวยากรณ์พื้นฐาน',
      teacher: 'Teacher Emma',
      teacherTh: 'ครูเอ็มม่า',
      time: '18:00 - 19:00',
      date: 'tomorrow',
      dateLabel: 'พรุ่งนี้',
      platform: 'zoom',
      participants: 18,
      maxParticipants: 25,
      level: 'Beginner',
      levelTh: 'ผู้เริ่มต้น',
      description: 'เรียนรู้ไวยากรณ์ภาษาอังกฤษเบื้องต้นที่จำเป็น',
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      isLive: false,
      canJoin: true
    },
    {
      id: 4,
      title: 'TOEIC Speaking Practice',
      titleTh: 'ฝึกพูด TOEIC',
      teacher: 'Teacher David',
      teacherTh: 'ครูเดวิด',
      time: '19:30 - 20:30',
      date: 'tomorrow',
      dateLabel: 'พรุ่งนี้',
      platform: 'zoom',
      participants: 12,
      maxParticipants: 15,
      level: 'Advanced',
      levelTh: 'ระดับสูง',
      description: 'เตรียมพร้อมสำหรับส่วนการพูดในการสอบ TOEIC',
      thumbnail: '/lovable-uploads/ddb0b36d-9ade-4665-a66f-1bf230081312.png',
      isLive: false,
      canJoin: true
    }
  ];

  const dateFilters = [
    { id: 'today', label: 'วันนี้', labelEn: 'Today' },
    { id: 'tomorrow', label: 'พรุ่งนี้', labelEn: 'Tomorrow' },
    { id: 'week', label: 'สัปดาห์นี้', labelEn: 'This Week' }
  ];

  const filteredSessions = liveSessions.filter(session => {
    if (selectedDate === 'week') return true;
    return session.date === selectedDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 thai-text">
          {t('live_sessions')}
        </h1>
        <p className="text-gray-600 thai-text">
          เรียนแบบสดๆ กับครูมืออาชีพ พูดคุยและฝึกฝนได้จริง
        </p>
      </div>

      {/* Live Now Banner */}
      <LiveBanner />

      {/* Date Filters */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="thai-text">เลือกวันที่</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {dateFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedDate === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDate(filter.id)}
                className="thai-text"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Sessions Grid */}
      <div className="lesson-grid">
        {filteredSessions.map((session) => (
          <LiveSessionCard key={session.id} session={session} />
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 thai-text">
            ไม่มีคลาสสดในวันที่เลือก
          </h3>
          <p className="text-gray-500 thai-text">
            ลองเลือกวันอื่นหรือติดตามประกาศคลาสใหม่
          </p>
        </div>
      )}

      {/* Weekly Schedule */}
      <WeeklySchedule />
    </div>
  );
};

export default Live;
