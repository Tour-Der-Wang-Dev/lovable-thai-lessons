
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeeklySchedule: React.FC = () => {
  return (
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
  );
};

export default WeeklySchedule;
