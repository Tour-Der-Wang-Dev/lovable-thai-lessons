
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellRing, 
  Calendar, 
  Clock, 
  Mail, 
  MessageSquare,
  Settings,
  CheckCircle,
  X,
  Volume2,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  type: 'live_class' | 'quiz_reminder' | 'course_update' | 'achievement' | 'system';
  title: string;
  titleTh: string;
  message: string;
  messageTh: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationSettings {
  liveClassReminders: boolean;
  quizDeadlines: boolean;
  courseUpdates: boolean;
  achievements: boolean;
  systemUpdates: boolean;
  emailNotifications: boolean;
  lineNotifications: boolean;
  browserNotifications: boolean;
  reminderTiming: number; // minutes before event
}

const NotificationSystem: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'live_class',
      title: 'Live Class Starting Soon',
      titleTh: 'คลาสสดจะเริ่มในอีกไม่ช้า',
      message: 'Speaking Practice Session starts in 30 minutes',
      messageTh: 'คลาสฝึกพูดจะเริ่มในอีก 30 นาที',
      timestamp: '30 นาทีที่แล้ว',
      isRead: false,
      actionUrl: '/live',
      priority: 'high'
    },
    {
      id: '2',
      type: 'quiz_reminder',
      title: 'Quiz Due Tomorrow',
      titleTh: 'แบบทดสอบครบกำหนดพรุ่งนี้',
      message: 'Grammar Fundamentals Quiz due tomorrow at 11:59 PM',
      messageTh: 'แบบทดสอบไวยากรณ์พื้นฐานครบกำหนดพรุ่งนี้เวลา 23:59 น.',
      timestamp: '2 ชั่วโมงที่แล้ว',
      isRead: false,
      actionUrl: '/quizzes',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      titleTh: 'ปลดล็อคความสำเร็จใหม่!',
      message: 'You\'ve completed 5 courses - Dedicated Learner badge earned!',
      messageTh: 'คุณเรียนจบ 5 คอร์สแล้ว - ได้รับเหรียญ "นักเรียนมุ่งมั่น"!',
      timestamp: '1 วันที่แล้ว',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'course_update',
      title: 'New Lesson Added',
      titleTh: 'เพิ่มบทเรียนใหม่',
      message: 'New lesson "Advanced Conversation" added to Business English course',
      messageTh: 'เพิ่มบทเรียนใหม่ "การสนทนาขั้นสูง" ในคอร์สภาษาอังกฤษธุรกิจ',
      timestamp: '2 วันที่แล้ว',
      isRead: true,
      actionUrl: '/courses',
      priority: 'low'
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    liveClassReminders: true,
    quizDeadlines: true,
    courseUpdates: true,
    achievements: true,
    systemUpdates: false,
    emailNotifications: true,
    lineNotifications: true,
    browserNotifications: true,
    reminderTiming: 30
  });

  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast({
      title: 'อ่านแล้วทั้งหมด',
      description: 'ทำเครื่องหมายการแจ้งเตือนทั้งหมดว่าอ่านแล้ว',
    });
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSettingChange = (key: keyof NotificationSettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: 'บันทึกการตั้งค่าแล้ว',
      description: 'การตั้งค่าการแจ้งเตือนถูกบันทึกเรียบร้อยแล้ว',
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'live_class': return <Calendar className="w-5 h-5" />;
      case 'quiz_reminder': return <Clock className="w-5 h-5" />;
      case 'course_update': return <Bell className="w-5 h-5" />;
      case 'achievement': return <CheckCircle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Request browser notification permission
  useEffect(() => {
    if (settings.browserNotifications && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, [settings.browserNotifications]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <BellRing className="w-8 h-8 text-blue-600" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">การแจ้งเตือน</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `คุณมีการแจ้งเตือนใหม่ ${unreadCount} รายการ` : 'ไม่มีการแจ้งเตือนใหม่'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              อ่านทั้งหมด
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>ตั้งค่าการแจ้งเตือน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notification Types */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">ประเภทการแจ้งเตือน</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>คลาสสด</span>
                  </div>
                  <Switch
                    checked={settings.liveClassReminders}
                    onCheckedChange={(checked) => handleSettingChange('liveClassReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>แบบทดสอบ</span>
                  </div>
                  <Switch
                    checked={settings.quizDeadlines}
                    onCheckedChange={(checked) => handleSettingChange('quizDeadlines', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-green-600" />
                    <span>อัพเดทคอร์ส</span>
                  </div>
                  <Switch
                    checked={settings.courseUpdates}
                    onCheckedChange={(checked) => handleSettingChange('courseUpdates', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    <span>ความสำเร็จ</span>
                  </div>
                  <Switch
                    checked={settings.achievements}
                    onCheckedChange={(checked) => handleSettingChange('achievements', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Delivery Methods */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">ช่องทางการแจ้งเตือน</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>อีเมล</span>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span>LINE</span>
                  </div>
                  <Switch
                    checked={settings.lineNotifications}
                    onCheckedChange={(checked) => handleSettingChange('lineNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-orange-600" />
                    <span>เบราว์เซอร์</span>
                  </div>
                  <Switch
                    checked={settings.browserNotifications}
                    onCheckedChange={(checked) => handleSettingChange('browserNotifications', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Timing */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">เวลาแจ้งเตือนล่วงหน้า</h3>
              <select
                value={settings.reminderTiming}
                onChange={(e) => handleSettingChange('reminderTiming', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 นาที</option>
                <option value={15}>15 นาที</option>
                <option value={30}>30 นาที</option>
                <option value={60}>1 ชั่วโมง</option>
                <option value={1440}>1 วัน</option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
              <p className="text-gray-600">การแจ้งเตือนใหม่จะปรากฏที่นี่</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`${getPriorityColor(notification.priority)} ${
                !notification.isRead ? 'ring-2 ring-blue-200' : ''
              } transition-all hover:shadow-md`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    notification.priority === 'high' ? 'bg-red-100' :
                    notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {notification.titleTh}
                          </h3>
                          {!notification.isRead && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">ใหม่</Badge>
                          )}
                          <Badge className={`${getPriorityBadgeColor(notification.priority)} text-xs`}>
                            {notification.priority === 'high' ? 'สำคัญ' : 
                             notification.priority === 'medium' ? 'ปานกลาง' : 'ทั่วไป'}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-2">{notification.messageTh}</p>
                        <p className="text-xs text-gray-500">{notification.timestamp}</p>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {notification.actionUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => window.location.href = notification.actionUrl!}
                      >
                        ดูรายละเอียด
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSystem;
