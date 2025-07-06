
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, BookOpen, FileImage, Video, Headphones, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Documents: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', nameTh: 'หมวดหมู่ทั้งหมด' },
    { id: 'grammar', name: 'Grammar', nameTh: 'ไวยากรณ์' },
    { id: 'vocabulary', name: 'Vocabulary', nameTh: 'คำศัพท์' },
    { id: 'conversation', name: 'Conversation', nameTh: 'การสนทนา' },
    { id: 'business', name: 'Business English', nameTh: 'ภาษาอังกฤษธุรกิจ' },
    { id: 'pronunciation', name: 'Pronunciation', nameTh: 'การออกเสียง' }
  ];

  const documentTypes = [
    { id: 'all', name: 'All Types', nameTh: 'ทุกประเภท', icon: FileText },
    { id: 'pdf', name: 'PDF Documents', nameTh: 'เอกสาร PDF', icon: FileText },
    { id: 'audio', name: 'Audio Files', nameTh: 'ไฟล์เสียง', icon: Headphones },
    { id: 'video', name: 'Video Resources', nameTh: 'วิดีโอ', icon: Video },
    { id: 'worksheet', name: 'Worksheets', nameTh: 'แบบฝึกหัด', icon: FileImage }
  ];

  const documents = [
    {
      id: 1,
      title: 'English Grammar Fundamentals',
      titleTh: 'ไวยากรณ์อังกฤษพื้นฐาน',
      category: 'grammar',
      type: 'pdf',
      size: '2.5 MB',
      pages: 45,
      downloads: 1250,
      description: 'Complete guide to English grammar basics',
      descriptionTh: 'คู่มือครบเครื่องไวยากรณ์อังกฤษพื้นฐาน',
      level: 'Beginner',
      featured: true
    },
    {
      id: 2,
      title: 'Business English Vocabulary List',
      titleTh: 'รายการคำศัพท์ภาษาอังกฤษธุรกิจ',
      category: 'business',
      type: 'pdf',
      size: '1.8 MB',
      pages: 28,
      downloads: 890,
      description: '500+ essential business terms with examples',
      descriptionTh: 'คำศัพท์ธุรกิจสำคัญ 500+ คำ พร้อมตัวอย่าง',
      level: 'Intermediate',
      featured: false
    },
    {
      id: 3,
      title: 'Daily Conversation Audio Pack',
      titleTh: 'ชุดเสียงบทสนทนาประจำวัน',
      category: 'conversation',
      type: 'audio',
      size: '45 MB',
      duration: '2h 15m',
      downloads: 2100,
      description: '20 common conversation scenarios',
      descriptionTh: 'สถานการณ์สนทนาทั่วไป 20 เรื่อง',
      level: 'Beginner',
      featured: true
    },
    {
      id: 4,
      title: 'Pronunciation Practice Videos',
      titleTh: 'วิดีโอฝึกการออกเสียง',
      category: 'pronunciation',
      type: 'video',
      size: '120 MB',
      duration: '45m',
      downloads: 750,
      description: 'Step-by-step pronunciation guide',
      descriptionTh: 'คู่มือการออกเสียงทีละขั้นตอน',
      level: 'All Levels',
      featured: false
    },
    {
      id: 5,
      title: 'Grammar Exercise Worksheets',
      titleTh: 'แบบฝึกหัดไวยากรณ์',
      category: 'grammar',
      type: 'worksheet',
      size: '3.2 MB',
      pages: 60,
      downloads: 1450,
      description: 'Printable grammar exercises with answer keys',
      descriptionTh: 'แบบฝึกหัดไวยากรณ์พิมพ์ได้พร้อมเฉลย',
      level: 'Intermediate',
      featured: false
    },
    {
      id: 6,
      title: 'Essential Vocabulary Flashcards',
      titleTh: 'บัตรคำศัพท์สำคัญ',
      category: 'vocabulary',
      type: 'pdf',
      size: '5.1 MB',
      pages: 100,
      downloads: 1800,
      description: '1000 most common English words with Thai translations',
      descriptionTh: 'คำศัพท์อังกฤษที่ใช้บ่อย 1000 คำ พร้อมคำแปลไทย',
      level: 'All Levels',
      featured: true
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.titleTh.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const typeObj = documentTypes.find(t => t.id === type);
    return typeObj ? typeObj.icon : FileText;
  };

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
          Study Documents & Resources
        </h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4 thai-text">
          เอกสารการเรียนและทรัพยากร
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access our comprehensive collection of study materials, worksheets, audio files, and reference documents 
          to support your English learning journey.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto thai-text mt-2">
          เข้าถึงคลังเอกสารการเรียนที่ครอบคลุม แบบฝึกหัด ไฟล์เสียง และเอกสารอ้างอิง 
          เพื่อสนับสนุนการเรียนรู้ภาษาอังกฤษของคุณ
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search documents... / ค้นหาเอกสาร..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            {documentTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Documents */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Featured Resources</h3>
        <h4 className="text-xl font-bold text-gray-700 mb-6 thai-text">ทรัพยากรแนะนำ</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {documents.filter(doc => doc.featured).map((doc) => {
            const IconComponent = getTypeIcon(doc.type);
            return (
              <Card key={doc.id} className="classroom-card border-2 border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getLevelColor(doc.level)}>
                      {doc.level}
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-lg flex items-center">
                    <IconComponent className="w-5 h-5 mr-2 text-blue-600" />
                    {doc.title}
                  </CardTitle>
                  <p className="text-sm thai-text text-gray-600">{doc.titleTh}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                  <p className="text-xs thai-text text-gray-500 mb-4">{doc.descriptionTh}</p>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>{doc.size}</span>
                    {doc.pages && <span>{doc.pages} pages</span>}
                    {doc.duration && <span>{doc.duration}</span>}
                    <span>{doc.downloads} downloads</span>
                  </div>

                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Documents */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">All Documents</h3>
        <h4 className="text-xl font-bold text-gray-700 mb-6 thai-text">เอกสารทั้งหมด</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            const IconComponent = getTypeIcon(doc.type);
            return (
              <Card key={doc.id} className="classroom-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getLevelColor(doc.level)}>
                      {doc.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg flex items-center">
                    <IconComponent className="w-5 h-5 mr-2 text-gray-600" />
                    {doc.title}
                  </CardTitle>
                  <p className="text-sm thai-text text-gray-600">{doc.titleTh}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                  <p className="text-xs thai-text text-gray-500 mb-4">{doc.descriptionTh}</p>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>{doc.size}</span>
                    {doc.pages && <span>{doc.pages} pages</span>}
                    {doc.duration && <span>{doc.duration}</span>}
                    <span>{doc.downloads} downloads</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Upload Section for Teachers */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            For Teachers & Contributors
          </h3>
          <h4 className="text-xl font-bold text-gray-700 mb-4 thai-text">
            สำหรับครูและผู้ให้ความร่วมมือ
          </h4>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Share your educational resources with our community. Upload worksheets, study guides, 
            or any materials that can help students learn English more effectively.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto thai-text mb-8">
            แบ่งปันทรัพยากรการศึกษาของคุณกับชุมชนของเรา อัปโหลดแบบฝึกหัด คู่มือการเรียน 
            หรือเอกสารใดๆ ที่สามารถช่วยนักเรียนเรียนภาษาอังกฤษได้อย่างมีประสิทธิภาพ
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
