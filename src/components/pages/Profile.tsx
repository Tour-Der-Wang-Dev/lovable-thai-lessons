
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { User, Mail, Calendar, CreditCard, Star } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, subscription, signOut, refreshSubscription } = useAuth();
  const { t } = useLanguage();

  const handleManageSubscription = async () => {
    try {
      const { data } = await supabase.functions.invoke('customer-portal');
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 thai-text">
          กรุณาเข้าสู่ระบบ
        </h2>
        <p className="text-gray-600 thai-text">
          เข้าสู่ระบบเพื่อดูข้อมูลโปรไฟล์และจัดการแพ็คเกจของคุณ
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="thai-text">ข้อมูลส่วนตัว</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700 thai-text">
              สมัครสมาชิกเมื่อ: {new Date(user.created_at || '').toLocaleDateString('th-TH')}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Status */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="thai-text">สถานะแพ็คเกจ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscription?.subscribed ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-800">
                  <Star className="w-3 h-3 mr-1" />
                  แพ็คเกจ {subscription.subscription_tier}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 thai-text">
                หมดอายุ: {new Date(subscription.subscription_end).toLocaleDateString('th-TH')}
              </p>
              <Button onClick={handleManageSubscription} variant="outline">
                จัดการแพ็คเกจ
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Badge variant="outline" className="text-gray-600">
                ยังไม่มีแพ็คเกจ
              </Badge>
              <p className="text-sm text-gray-600 thai-text">
                เลือกแพ็คเกจที่เหมาะกับคุณเพื่อเริ่มเรียนรู้
              </p>
            </div>
          )}
          <Button onClick={refreshSubscription} variant="ghost" size="sm">
            รีเฟรชสถานะ
          </Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="classroom-card">
        <CardContent className="pt-6">
          <Button onClick={signOut} variant="destructive" className="w-full">
            ออกจากระบบ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
