
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import LiveSessionCard from '@/components/live/LiveSessionCard';
import LiveBanner from '@/components/live/LiveBanner';
import WeeklySchedule from '@/components/live/WeeklySchedule';
import DateFilter from '@/components/live/DateFilter';
import EmptyState from '@/components/live/EmptyState';
import YouTubePlaylist from '@/components/live/YouTubePlaylist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { liveSessions } from '@/data/liveSessions';
import { Video, Calendar, Users, Clock, ExternalLink } from 'lucide-react';

const Live: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('today');
  const [showPlaylist, setShowPlaylist] = useState(false);

  const filteredSessions = liveSessions.filter(session => {
    if (selectedDate === 'week') return true;
    return session.date === selectedDate;
  });

  // YouTube playlist URL from the user's request
  const playlistUrl = 'https://youtube.com/playlist?list=PLGH1_c3wbuGelJNWoiwORW6slpUS8hV76&si=g0Y0_Ci5TTWXW_Ms';

  const upcomingLiveSessions = [
    {
      id: 'live-1',
      title: 'Daily Conversation Practice',
      titleTh: 'ฝึกการสนทนาประจำวัน',
      instructor: 'Teacher Sarah',
      time: '19:00 - 20:00',
      date: 'Today',
      dateTh: 'วันนี้',
      participants: 24,
      maxParticipants: 30,
      level: 'Beginner',
      status: 'upcoming'
    },
    {
      id: 'live-2',
      title: 'Business English Workshop',
      titleTh: 'เวิร์คช็อปภาษาอังกฤษธุรกิจ',
      instructor: 'Teacher Mike',
      time: '20:30 - 21:30',
      date: 'Tomorrow',
      dateTh: 'พรุ่งนี้',
      participants: 18,
      maxParticipants: 25,
      level: 'Intermediate',
      status: 'upcoming'
    },
    {
      id: 'live-3',
      title: 'Pronunciation Masterclass',
      titleTh: 'คลาสเมื่อการออกเสียง',
      instructor: 'Teacher Emma',
      time: '18:00 - 19:00',
      date: 'Live Now',
      dateTh: 'กำลังสด',
      participants: 32,
      maxParticipants: 35,
      level: 'All Levels',
      status: 'live'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Live English Sessions
        </h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 thai-text">
          คลาสภาษาอังกฤษสด
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join interactive live sessions with professional teachers. Practice speaking, get instant feedback, 
          and learn with students from around the world.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto thai-text mt-2">
          เข้าร่วมคลาสสดแบบโต้ตอบกับครูมืออาชีพ ฝึกการพูด รับฟีดแบคทันที 
          และเรียนรู้ร่วมกับนักเรียนจากทั่วโลก
        </p>
      </div>

      {/* Live Now Banner */}
      <LiveBanner />

      {/* Current Live Sessions */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Live & Upcoming Sessions</h3>
        <h4 className="text-xl font-bold text-gray-700 mb-6 thai-text">คลาสสดและคลาสที่จะมาถึง</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingLiveSessions.map((session) => (
            <Card key={session.id} className={`classroom-card hover:shadow-lg transition-shadow ${
              session.status === 'live' ? 'border-2 border-red-300 bg-red-50/30' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getLevelColor(session.level)}>
                    {session.level}
                  </Badge>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status === 'live' ? (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                        LIVE
                      </>
                    ) : (
                      'Upcoming'
                    )}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{session.title}</CardTitle>
                <p className="text-sm thai-text text-gray-600">{session.titleTh}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="thai-text">ครู: {session.instructor}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{session.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{session.date}</span>
                    <span className="ml-1 thai-text">({session.dateTh})</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">
                      {session.participants}/{session.maxParticipants}
                    </span>
                  </div>
                  
                  {session.status === 'live' ? (
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Video className="w-4 h-4 mr-2" />
                      Join Live Session
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      Reserve My Spot
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* YouTube Playlist Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Recorded Live Sessions</h3>
            <h4 className="text-xl font-bold text-gray-700 thai-text">บันทึกคลาสสด</h4>
          </div>
          <Button 
            onClick={() => setShowPlaylist(!showPlaylist)}
            variant="outline"
          >
            {showPlaylist ? 'Hide' : 'Show'} Video Playlist
          </Button>
        </div>
        
        {showPlaylist && (
          <YouTubePlaylist
            playlistUrl={playlistUrl}
            title="English Learning Sessions - Recorded Classes"
            showPlayer={true}
          />
        )}
      </div>

      {/* Date Filters for Scheduled Sessions */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Scheduled Sessions</h3>
        <h4 className="text-xl font-bold text-gray-700 mb-6 thai-text">คลาสที่กำหนดไว้</h4>
        
        <DateFilter 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
        />

        {/* Live Sessions Grid */}
        <div className="lesson-grid mt-6">
          {filteredSessions.map((session) => (
            <LiveSessionCard key={session.id} session={session} />
          ))}
        </div>

        {filteredSessions.length === 0 && <EmptyState />}
      </div>

      {/* Weekly Schedule */}
      <WeeklySchedule />

      {/* Quick Links */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Host a Live Session?
          </h3>
          <h4 className="text-xl font-bold text-gray-700 mb-4 thai-text">
            ต้องการจัดคลาสสดหรือไม่?
          </h4>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Teachers and advanced students can host their own live sessions. 
            Share your knowledge and help others learn English!
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto thai-text mb-8">
            ครูและนักเรียนระดับสูงสามารถจัดคลาสสดของตนเองได้ 
            แบ่งปันความรู้และช่วยผู้อื่นเรียนภาษาอังกฤษ!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Video className="w-4 h-4 mr-2" />
              Request to Host
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Teaching Guidelines
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Live;
