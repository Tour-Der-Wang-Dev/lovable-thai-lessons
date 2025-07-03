
import React from 'react';
import { Calendar, Clock, Users, Video, MessageCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LiveSession {
  id: number;
  title: string;
  titleTh: string;
  teacher: string;
  teacherTh: string;
  time: string;
  date: string;
  dateLabel: string;
  platform: string;
  participants: number;
  maxParticipants: number;
  level: string;
  levelTh: string;
  description: string;
  thumbnail: string;
  isLive: boolean;
  canJoin: boolean;
}

interface LiveSessionCardProps {
  session: LiveSession;
}

const LiveSessionCard: React.FC<LiveSessionCardProps> = ({ session }) => {
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
    <Card className="classroom-card">
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
  );
};

export default LiveSessionCard;
