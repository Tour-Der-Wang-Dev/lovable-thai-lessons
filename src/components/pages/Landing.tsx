
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, FileText, Award, Calendar, Users, Star, CheckCircle } from 'lucide-react';

interface LandingProps {
  onTabChange: (tab: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onTabChange }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      titleTh: 'คอร์สเรียนแบบโต้ตอบ',
      description: 'Structured learning paths with video lessons, exercises, and quizzes',
      descriptionTh: 'เส้นทางการเรียนที่มีโครงสร้าง พร้อมบทเรียนวิดีโอ แบบฝึกหัด และแบบทดสอบ',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: () => onTabChange('courses')
    },
    {
      icon: Video,
      title: 'Live Sessions',
      titleTh: 'คลาสสดออนไลน์',
      description: 'Real-time classes with professional teachers and interactive practice',
      descriptionTh: 'คลาสเรียนสดกับครูมืออาชีพ และการฝึกฝนแบบโต้ตอบ',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      action: () => onTabChange('live')
    },
    {
      icon: Award,
      title: 'Quizzes & Tests',
      titleTh: 'แบบทดสอบและควิซ',
      description: 'Comprehensive assessments to track your learning progress',
      descriptionTh: 'การประเมินผลที่ครอบคลุมเพื่อติดตามความก้าวหน้า',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: () => onTabChange('quizzes')
    },
    {
      icon: FileText,
      title: 'Study Documents',
      titleTh: 'เอกสารการเรียน',
      description: 'Downloadable resources, notes, and reference materials',
      descriptionTh: 'ทรัพยากรที่ดาวน์โหลดได้ บันทึก และเอกสารอ้างอิง',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: () => onTabChange('documents')
    }
  ];

  const stats = [
    { label: 'Active Students', labelTh: 'นักเรียนที่ใช้งาน', value: '5,000+', icon: Users },
    { label: 'Course Hours', labelTh: 'ชั่วโมงเรียน', value: '500+', icon: BookOpen },
    { label: 'Live Sessions', labelTh: 'คลาสสด', value: '200+', icon: Video },
    { label: 'Success Rate', labelTh: 'อัตราความสำเร็จ', value: '95%', icon: Star }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      nameTh: 'ซาร่า จอห์นสัน',
      role: 'Marketing Manager',
      roleTh: 'ผู้จัดการฝ่ายการตลาด',
      content: 'The live sessions helped me improve my speaking confidence dramatically!',
      contentTh: 'คลาสสดช่วยให้ฉันมั่นใจในการพูดมากขึ้น!'
    },
    {
      name: 'Michael Chen',
      nameTh: 'ไมเคิล เฉิน',
      role: 'Software Developer',
      roleTh: 'นักพัฒนาซอฟต์แวร์',
      content: 'Structured courses made learning English systematic and effective.',
      contentTh: 'คอร์สที่มีโครงสร้างทำให้การเรียนภาษาอังกฤษเป็นระบบและมีประสิทธิภาพ'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master English with <span className="text-blue-600">Kru English</span>
          </h1>
          <h2 className="text-3xl font-bold text-gray-700 mb-8 thai-text">
            เรียนภาษาอังกฤษกับครูมืออาชีพ
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners in our comprehensive English learning platform with live classes, 
            interactive courses, and personalized learning paths.
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto thai-text">
            เข้าร่วมกับนักเรียนหลายพันคนในแพลตฟอร์มเรียนภาษาอังกฤษที่ครอบคลุม 
            พร้อมคลาสสด คอร์สโต้ตอบ และเส้นทางการเรียนส่วนบุคคล
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onTabChange('dashboard')}
              className="btn-primary text-lg px-8 py-3"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
            <Button 
              onClick={() => onTabChange('live')}
              variant="outline" 
              className="text-lg px-8 py-3"
            >
              <Video className="w-5 h-5 mr-2" />
              Join Live Class
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Kru English?</h2>
          <h3 className="text-2xl font-bold text-gray-700 thai-text">ทำไมต้องเลือก Kru English?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="classroom-card hover:shadow-lg transition-shadow cursor-pointer" onClick={feature.action}>
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <p className="text-lg thai-text text-gray-600">{feature.titleTh}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-2">{feature.description}</p>
                <p className="text-sm thai-text text-gray-500">{feature.descriptionTh}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Success in Numbers</h2>
          <h3 className="text-2xl font-bold text-gray-700 thai-text">ความสำเร็จของเราในตัวเลข</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
              <div className="text-sm thai-text text-gray-500">{stat.labelTh}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          <h3 className="text-2xl font-bold text-gray-700 thai-text">นักเรียนของเราพูดอย่างไร</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="classroom-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm thai-text text-gray-500">{testimonial.roleTh}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">"{testimonial.content}"</p>
                <p className="text-sm thai-text text-gray-600">"{testimonial.contentTh}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your English Journey?</h2>
          <h3 className="text-2xl font-bold mb-8 thai-text">พร้อมเริ่มต้นการเดินทางภาษาอังกฤษแล้วหรือยัง?</h3>
          <p className="text-xl mb-8">
            Join our community of learners and start improving your English today with expert teachers and proven methods.
          </p>
          <p className="text-lg mb-12 thai-text">
            เข้าร่วมชุมชนนักเรียนของเรา และเริ่มพัฒนาภาษาอังกฤษวันนี้กับครูผู้เชี่ยวชาญและวิธีการที่พิสูจน์แล้ว
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onTabChange('pricing')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              View Pricing Plans
            </Button>
            <Button 
              onClick={() => onTabChange('courses')}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
