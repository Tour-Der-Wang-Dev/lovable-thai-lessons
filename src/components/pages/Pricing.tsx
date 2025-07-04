import React, { useState } from 'react';
import { Check, Star, Users, Clock, Video, BookOpen, Award, Zap, CreditCard } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import AuthModal from '@/components/auth/AuthModal';

interface PricingProps {
  onTabChange: (tab: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onTabChange }) => {
  const { t } = useLanguage();
  const { user, subscription } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const packages = [
    {
      id: 'general',
      name: 'General Package',
      nameTh: 'แพ็คเกจทั่วไป',
      description: 'เหมาะสำหรับผู้เริ่มต้นเรียนภาษาอังกฤษ',
      monthlyPrice: 390,
      yearlyPrice: 3900,
      originalMonthlyPrice: 490,
      originalYearlyPrice: 4900,
      discount: '20%',
      color: 'blue',
      popular: false,
      features: [
        'คอร์สเรียนพื้นฐาน 20+ คอร์ส',
        'วิดีโอบทเรียน HD',
        'แบบทดสอบออนไลน์',
        'เอกสารประกอบการเรียน',
        'ซัพพอร์ต 24/7',
        'เรียนผ่านมือถือได้'
      ],
      featuresEn: [
        '20+ Basic Courses',
        'HD Video Lessons',
        'Online Quizzes',
        'Learning Materials',
        '24/7 Support',
        'Mobile Learning'
      ],
      limitations: [
        'ไม่รวมคลาสสด',
        'ไม่รวมการสอบ CEFR'
      ]
    },
    {
      id: 'cefr',
      name: 'CEFR Package',
      nameTh: 'แพ็คเกจ CEFR',
      description: 'เตรียมความพร้อมสำหรับการสอบมาตรฐานสากล',
      monthlyPrice: 590,
      yearlyPrice: 5900,
      originalMonthlyPrice: 790,
      originalYearlyPrice: 7900,
      discount: '25%',
      color: 'green',
      popular: false,
      features: [
        'คอร์ส General Package ทั้งหมด',
        'คอร์สเตรียมสอบ CEFR A1-C2',
        'แบบทดสอบจำลอง CEFR',
        'การวิเคราะห์คะแนนแบบละเอียด',
        'เอกสารเตรียมสอบพิเศษ',
        'คลาสสดเฉพาะ CEFR 2 ครั้ง/เดือน'
      ],
      featuresEn: [
        'All General Package features',
        'CEFR Prep Courses A1-C2',
        'CEFR Mock Tests',
        'Detailed Score Analysis',
        'Special Exam Materials',
        '2 CEFR Live Classes/month'
      ],
      limitations: [
        'คลาสสดจำกัด 2 ครั้ง/เดือน'
      ]
    },
    {
      id: 'combo',
      name: 'Combo Package',
      nameTh: 'แพ็คเกจรวม',
      description: 'ครบครันที่สุด! รวมทุกคุณสมบัติ',
      monthlyPrice: 1500,
      yearlyPrice: 15000,
      originalMonthlyPrice: 2000,
      originalYearlyPrice: 20000,
      discount: '25%',
      color: 'orange',
      popular: true,
      features: [
        'คอร์สทั้งหมด 50+ คอร์ส',
        'คลาสสดไม่จำกัด',
        'การสอนแบบ 1:1 2 ชั่วโมง/เดือน',
        'การวิเคราะห์ผลการเรียนแบบละเอียด',
        'เอกสารเฉพาะบุคคล',
        'ปรึกษาครูได้ตลอด 24/7',
        'รับรองผลการเรียน',
        'ส่วนลดสำหรับการสอบจริง 50%'
      ],
      featuresEn: [
        'All 50+ Courses',
        'Unlimited Live Classes',
        '2hrs/month 1:1 Teaching',
        'Detailed Learning Analytics',
        'Personalized Materials',
        '24/7 Teacher Consultation',
        'Learning Guarantee',
        '50% Real Exam Discount'
      ],
      limitations: []
    }
  ];

  const handleSubscribe = async (packageId: string) => {
    if (!user) {
      return;
    }

    setLoading(packageId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { package: packageId }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
    } finally {
      setLoading(null);
    }
  };

  const isCurrentPlan = (packageId: string) => {
    if (!subscription?.subscribed) return false;
    return subscription.subscription_tier?.toLowerCase() === packageId;
  };

  const getPrice = (pkg: typeof packages[0]) => {
    return billingPeriod === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;
  };

  const getOriginalPrice = (pkg: typeof packages[0]) => {
    return billingPeriod === 'monthly' ? pkg.originalMonthlyPrice : pkg.originalYearlyPrice;
  };

  const getColorClasses = (color: string, isPopular: boolean = false) => {
    const colors = {
      blue: {
        border: 'border-blue-200',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        button: 'btn-secondary'
      },
      green: {
        border: 'border-green-200',
        bg: 'bg-green-50',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700 text-white'
      },
      orange: {
        border: 'border-orange-200',
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        button: 'btn-primary'
      }
    };
    
    return isPopular ? {
      ...colors[color as keyof typeof colors],
      border: 'border-orange-400 ring-2 ring-orange-400'
    } : colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 thai-text">
          {t('choose_package')}
        </h1>
        <p className="text-gray-600 thai-text max-w-2xl mx-auto">
          เลือกแพ็คเกจที่เหมาะกับความต้องการและงบประมาณของคุณ พร้อมส่วนลดพิเศษ!
        </p>
      </div>

      {/* Real-time Subscription Status */}
      {user && subscription && (
        <Card className="classroom-card border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-500 text-white">
                  <CreditCard className="w-3 h-3 mr-1" />
                  {subscription.subscribed ? 'แพ็คเกจปัจจุบัน' : 'ยังไม่มีแพ็คเกจ'}
                </Badge>
                {subscription.subscribed && (
                  <span className="text-sm font-medium text-green-800">
                    {subscription.subscription_tier}
                  </span>
                )}
              </div>
              {subscription.subscribed && subscription.subscription_end && (
                <span className="text-sm text-green-700">
                  หมดอายุ: {new Date(subscription.subscription_end).toLocaleDateString('th-TH')}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <Button
            variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingPeriod('monthly')}
            className="thai-text"
          >
            รายเดือน
          </Button>
          <Button
            variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingPeriod('yearly')}
            className="thai-text relative"
          >
            รายปี
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
              ประหยัด 15%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {packages.map((pkg) => {
          const currentPrice = billingPeriod === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;
          const originalPrice = billingPeriod === 'monthly' ? pkg.originalMonthlyPrice : pkg.originalYearlyPrice;
          const isCurrent = isCurrentPlan(pkg.id);
          
          return (
            <Card key={pkg.id} className={`classroom-card relative ${isCurrent ? 'ring-2 ring-green-400 border-green-400' : pkg.popular ? 'ring-2 ring-orange-400 border-orange-400' : 'border-gray-200'}`}>
              {pkg.popular && !isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    {t('popular')}
                  </Badge>
                </div>
              )}
              
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    <Check className="w-4 h-4 mr-1" />
                    แพ็คเกจปัจจุบัน
                  </Badge>
                </div>
              )}

              <CardHeader className={pkg.color === 'orange' ? 'bg-orange-50' : pkg.color === 'green' ? 'bg-green-50' : 'bg-blue-50'}>
                <div className="text-center">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </CardTitle>
                  <p className="text-lg font-semibold text-gray-700 thai-text mb-2">
                    {pkg.nameTh}
                  </p>
                  <p className="text-sm text-gray-600 thai-text">
                    {pkg.description}
                  </p>
                </div>

                <div className="text-center mt-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ฿{currentPrice.toLocaleString()}
                    </span>
                    <div className="text-left">
                      <div className="text-sm text-gray-500 line-through">
                        ฿{originalPrice.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 thai-text">
                        {billingPeriod === 'monthly' ? '/เดือน' : '/ปี'}
                      </div>
                    </div>
                  </div>
                  <Badge className="mt-2 bg-red-100 text-red-800">
                    ประหยัด {pkg.discount}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 thai-text">
                        {feature}
                      </span>
                    </div>
                  ))}
                  
                  {pkg.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 thai-text mb-2">ข้อจำกัด:</p>
                      {pkg.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500 thai-text">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {user ? (
                  <Button 
                    className={`w-full ${isCurrent ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : pkg.color === 'orange' ? 'btn-primary' : pkg.color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' : 'btn-secondary'}`}
                    onClick={() => handleSubscribe(pkg.id)}
                    disabled={loading === pkg.id || isCurrent}
                  >
                    {loading === pkg.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        กำลังดำเนินการ...
                      </>
                    ) : isCurrent ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        <span className="thai-text">แพ็คเกจปัจจุบัน</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="thai-text">{t('buy_now')}</span>
                      </>
                    )}
                  </Button>
                ) : (
                  <AuthModal
                    trigger={
                      <Button className={`w-full ${pkg.color === 'orange' ? 'btn-primary' : pkg.color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' : 'btn-secondary'}`}>
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="thai-text">เข้าสู่ระบบเพื่อสั่งซื้อ</span>
                      </Button>
                    }
                  />
                )}

                <p className="text-center text-xs text-gray-500 mt-2 thai-text">
                  ทดลองใช้ฟรี 7 วัน • ยกเลิกได้ทุกเมื่อ
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Comparison */}
      <Card className="classroom-card mt-12">
        <CardHeader>
          <CardTitle className="text-center thai-text">เปรียบเทียบแพ็คเกจ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 thai-text">คุณสมบัติ</th>
                  <th className="text-center py-3 px-4 thai-text">ทั่วไป</th>
                  <th className="text-center py-3 px-4 thai-text">CEFR</th>
                  <th className="text-center py-3 px-4 thai-text">รวม</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 thai-text">จำนวนคอร์ส</td>
                  <td className="text-center py-3 px-4">20+</td>
                  <td className="text-center py-3 px-4">30+</td>
                  <td className="text-center py-3 px-4">50+</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 thai-text">คลาสสด/เดือน</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">2</td>
                  <td className="text-center py-3 px-4">ไม่จำกัด</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 thai-text">การสอน 1:1</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">2 ชม./เดือน</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 thai-text">การสอบ CEFR</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 thai-text">รับรองผลการเรียน</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="classroom-card">
        <CardHeader>
          <CardTitle className="thai-text">คำถามที่พบบ่อย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 thai-text">สามารถยกเลิกได้ทุกเมื่อหรือไม่?</h4>
              <p className="text-sm text-gray-600 thai-text mt-1">
                ได้ครับ คุณสามารถยกเลิกได้ทุกเมื่อโดยไม่มีค่าธรรมเนียมเพิ่มเติม
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 thai-text">มีการทดลองใช้ฟรีหรือไม่?</h4>
              <p className="text-sm text-gray-600 thai-text mt-1">
                มีครับ ทุกแพ็คเกจมีการทดลองใช้ฟรี 7 วัน
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 thai-text">สามารถเปลี่ยนแพ็คเกจได้หรือไม่?</h4>
              <p className="text-sm text-gray-600 thai-text mt-1">
                ได้ครับ คุณสามารถอัพเกรดหรือดาวน์เกรดแพ็คเกจได้ทุกเมื่อ
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-orange-400 text-white p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 thai-text">
          พร้อมเริ่มต้นการเรียนรู้แล้วหรือยัง?
        </h3>
        <p className="mb-6 thai-text">
          เริ่มทดลองใช้ฟรี 7 วัน วันนี้ ไม่ต้องใช้บัตรเครดิต
        </p>
        <Button 
          onClick={() => onTabChange('courses')}
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
        >
          <span className="thai-text font-semibold">เริ่มทดลองฟรี</span>
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
