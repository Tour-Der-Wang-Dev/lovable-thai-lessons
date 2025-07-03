
export interface LiveSession {
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

export const liveSessions: LiveSession[] = [
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

export const dateFilters = [
  { id: 'today', label: 'วันนี้', labelEn: 'Today' },
  { id: 'tomorrow', label: 'พรุ่งนี้', labelEn: 'Tomorrow' },
  { id: 'week', label: 'สัปดาห์นี้', labelEn: 'This Week' }
];
