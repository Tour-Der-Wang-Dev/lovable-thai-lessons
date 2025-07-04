
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SuccessProps {
  onTabChange: (tab: string) => void;
}

const Success: React.FC<SuccessProps> = ({ onTabChange }) => {
  const { refreshSubscription } = useAuth();

  useEffect(() => {
    // Refresh subscription status after successful payment
    const timer = setTimeout(() => {
      refreshSubscription();
    }, 2000);

    return () => clearTimeout(timer);
  }, [refreshSubscription]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="classroom-card border-green-200">
        <CardHeader className="bg-green-50 text-center">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800 thai-text">
            ชำระเงินสำเร็จ!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 pt-6">
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              <span className="text-lg font-semibold text-gray-900 thai-text">
                การสมัครแพ็คเกจเสร็จสิ้น
              </span>
            </div>
            <p className="text-gray-600 thai-text">
              ขอบคุณที่เลือกใช้บริการ Kru English! 
              แพ็คเกจของคุณจะเริ่มใช้งานได้ทันที
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900 thai-text">
                สิ่งที่คุณจะได้รับ
              </span>
            </div>
            <ul className="text-sm text-blue-800 thai-text space-y-1">
              <li>• เข้าถึงคอร์สเรียนทั้งหมดในแพ็คเกจ</li>
              <li>• คลาสเรียนสดตามแพ็คเกจที่เลือก</li>
              <li>• เอกสารการเรียนและแบบทดสอบ</li>
              <li>• การสนับสนุนจากทีมงาน 24/7</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => onTabChange('courses')}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              เริ่มเรียนเลย
            </Button>
            <Button 
              onClick={() => onTabChange('profile')}
              variant="outline"
              className="flex-1"
            >
              ดูข้อมูลแพ็คเกจ
            </Button>
          </div>

          <p className="text-xs text-gray-500 thai-text">
            หากมีคำถามหรือต้องการความช่วยเหลือ สามารถติดต่อทีมงานได้ตลอด 24 ชั่วโมง
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
