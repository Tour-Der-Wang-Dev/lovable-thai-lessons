
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Play, 
  Clock, 
  Star,
  Tag,
  Filter,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BookmarkedLesson {
  id: string;
  courseId: string;
  courseTitle: string;
  lessonTitle: string;
  lessonTitleTh: string;
  thumbnail: string;
  timestamp: string;
  notes: string;
  tags: string[];
  addedAt: string;
  duration: string;
  progress: number;
  type: 'video' | 'document' | 'quiz' | 'live';
}

const BookmarkSystem: React.FC = () => {
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<BookmarkedLesson[]>([
    {
      id: '1',
      courseId: 'course-1',
      courseTitle: 'Daily Conversation',
      lessonTitle: 'Ordering Food at Restaurant',
      lessonTitleTh: 'การสั่งอาหารในร้านอาหาร',
      thumbnail: '/lovable-uploads/5aedb5ee-f07f-44e3-b36a-63440a7526d2.png',
      timestamp: '05:24',
      notes: 'สำนวนสำคัญ: "I\'d like to order..." และ "Could I have the check, please?"',
      tags: ['conversation', 'restaurant', 'beginner'],
      addedAt: '2 วันที่แล้ว',
      duration: '12:30',
      progress: 45,
      type: 'video'
    },
    {
      id: '2',
      courseId: 'course-2',
      courseTitle: 'Business English',
      lessonTitle: 'Email Writing Essentials',
      lessonTitleTh: 'หลักการเขียนอีเมลภาษาอังกฤษ',
      thumbnail: '/lovable-uploads/649ec985-75fc-485f-b4b0-f75f4c67d7bd.png',
      timestamp: '08:15',
      notes: 'Subject line ต้องชัดเจน, ใช้ formal tone, จบด้วย professional closing',
      tags: ['business', 'writing', 'email'],
      addedAt: '1 สัปดาห์ที่แล้ว',
      duration: '18:45',
      progress: 80,
      type: 'video'
    },
    {
      id: '3',
      courseId: 'course-3',
      courseTitle: 'Grammar Fundamentals',
      lessonTitle: 'Present Perfect Tense',
      lessonTitleTh: 'Present Perfect Tense',
      thumbnail: '/lovable-uploads/719adec2-33ff-4e84-b2bf-59ca684bdaaa.png',
      timestamp: '03:42',
      notes: 'ใช้กับประสบการณ์ที่ไม่ระบุเวลาชัดเจน: have/has + past participle',
      tags: ['grammar', 'tense', 'intermediate'],
      addedAt: '3 วันที่แล้ว',
      duration: '15:20',
      progress: 100,
      type: 'video'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const filterOptions = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'video', label: 'วิดีโอ' },
    { value: 'document', label: 'เอกสาร' },
    { value: 'quiz', label: 'แบบทดสอบ' },
    { value: 'live', label: 'คลาสสด' }
  ];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bookmark.lessonTitleTh.includes(searchTerm) ||
                         bookmark.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || bookmark.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
    toast({
      title: 'ลบบุ๊คมาร์คแล้ว',
      description: 'บทเรียนถูกลบออกจากรายการโปรดแล้ว',
    });
  };

  const handleSaveNote = (id: string) => {
    setBookmarks(prev => prev.map(b => 
      b.id === id ? { ...b, notes: noteText } : b
    ));
    setEditingNote(null);
    setNoteText('');
    toast({
      title: 'บันทึกโน้ตแล้ว',
      description: 'หมายเหตุของคุณถูกบันทึกเรียบร้อยแล้ว',
    });
  };

  const startEditingNote = (id: string, currentNote: string) => {
    setEditingNote(id);
    setNoteText(currentNote);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'document': return <BookmarkCheck className="w-4 h-4" />;
      case 'quiz': return <Star className="w-4 h-4" />;
      case 'live': return <Clock className="w-4 h-4" />;
      default: return <Bookmark className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'quiz': return 'bg-yellow-100 text-yellow-800';
      case 'live': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">บทเรียนโปรด</h1>
          <p className="text-gray-600">จัดการบทเรียนที่คุณบุ๊คมาร์คไว้</p>
        </div>
        <Badge className="bg-orange-100 text-orange-800">
          {bookmarks.length} รายการ
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="ค้นหาบทเรียน หรือโน้ต..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {filteredBookmarks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบบทเรียนที่คุณค้นหา</h3>
              <p className="text-gray-600">ลองเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
            </CardContent>
          </Card>
        ) : (
          filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={bookmark.thumbnail}
                    alt={bookmark.lessonTitle}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={getTypeBadgeColor(bookmark.type)}>
                            {getTypeIcon(bookmark.type)}
                            <span className="ml-1 capitalize">{bookmark.type}</span>
                          </Badge>
                          <Badge variant="outline">
                            {bookmark.courseTitle}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {bookmark.lessonTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {bookmark.lessonTitleTh}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                          <span>เวลา: {bookmark.timestamp}</span>
                          <span>ระยะเวลา: {bookmark.duration}</span>
                          <span>เพิ่มเมื่อ: {bookmark.addedAt}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBookmark(bookmark.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Notes Section */}
                    <div className="mb-4">
                      {editingNote === bookmark.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="เพิ่มหมายเหตุ..."
                            className="w-full"
                            rows={3}
                          />
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleSaveNote(bookmark.id)}
                            >
                              บันทึก
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingNote(null)}
                            >
                              ยกเลิก
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 cursor-pointer hover:bg-yellow-100 transition-colors"
                          onClick={() => startEditingNote(bookmark.id, bookmark.notes)}
                        >
                          <p className="text-sm text-gray-700">
                            {bookmark.notes || 'คลิกเพื่อเพิ่มหมายเหตุ...'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {bookmark.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${bookmark.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{bookmark.progress}%</span>
                      </div>
                      <Button size="sm" className="flex items-center space-x-1">
                        <Play className="w-4 h-4" />
                        <span>เรียนต่อ</span>
                      </Button>
                    </div>
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

export default BookmarkSystem;
