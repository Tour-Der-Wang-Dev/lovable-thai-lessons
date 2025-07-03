
import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, MessageCircle, Bell } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const filteredSessions = liveSession.filter(session => {
    if (selectedDate === 'week') return true;
    return session.date === selectedDate;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'zoom': return <Video className="w-4 h-4" />;
      case 'tiktok': return <div className="w-4 h-4 bg-pink-500 rounded"></div>;
      default: return <Video className="w-4 h-4" />;
    }
  };

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
      <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div>
                <h3 className="text-lg font-semibold">กำลังไลฟ์อยู่ตอนนี้!</h3>
                <p className="text-red-100">Business English Workshop กับ Teacher Mike</p>
              </div>
            </div>
            <Button className="bg-white text-red-500 hover:bg-red-50">
              เข้าร่วมเลย
            </Button>
          </div>
        </CardContent>
      </Card>

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
          <Card key={session.id} className="classroom-card">
            <div className="relative">
              <img 
                src={session.thumbnail} 
                alt={session.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {session.isLive && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 animate-pulse">
                    🔴 LIVE
                  </Badge>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Badge className={getLevelBadgeColor(session.level)}>
                  {session.levelTh}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {session.time}
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {session.title}
                </h3>
                <p className="text-sm text-gray-600 thai-text mb-2">
                  {session.titleTh}
                </p>
                <p className="text-sm text-gray-600 thai-text line-clamp-2">
                  {session.description}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {session.teacher.split(' ')[1]?.[0] || 'T'}
                      </span>
                    </div>
                    <span className="thai-text">{session.teacherTh}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    {getPlatformIcon(session.platform)}
                    <span className="text-xs uppercase">{session.platform}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="thai-text">{session.dateLabel}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{session.participants}/{session.maxParticipants}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {session.canJoin ? (
                  <>
                    <Button 
                      className={`flex-1 ${session.isLive ? 'btn-primary bg-red-500 hover:bg-red-600' : 'btn-secondary'}`}
                      disabled={session.participants >= session.maxParticipants}
                    >
                      {session.isLive ? (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          เข้าร่วมไลฟ์
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4 mr-2" />
                          ตั้งเตือน
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button disabled className="flex-1">
                    เต็มแล้ว
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
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

      {/* Quick Schedule */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="thai-text">ตารางเรียนสดประจำสัปดาห์</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900 thai-text">จันทร์ - ศุกร์</div>
              <div className="text-sm text-blue-700">19:00 - 20:00</div>
              <div className="text-xs text-blue-600 thai-text">การสนทนาประจำวัน</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900 thai-text">จันทร์, พุธ, ศุกร์</div>
              <div className="text-sm text-green-700">20:30 - 21:30</div>
              <div className="text-xs text-green-600 thai-text">ภาษาอังกฤษธุรกิจ</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-medium text-orange-900 thai-text">เสาร์ - อาทิตย์</div>
              <div className="text-sm text-orange-700">10:00 - 11:00</div>
              <div className="text-xs text-orange-600 thai-text">เตรียมสอบ TOEIC</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Live;
