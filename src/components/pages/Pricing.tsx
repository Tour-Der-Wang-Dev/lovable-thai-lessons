
import React from 'react';
import { Check, Star, Zap, Crown, Gift } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingProps {
  onTabChange: (tab: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onTabChange }) => {
  const { t } = useLanguage();

  const packages = [
    {
      id: 'general',
      name: 'แพ็คเกจทั่วไป',
      nameEn: 'General Package',
      price: 390,
      originalPrice: 490,
      discount: '20%',
      icon: Star,
      color: 'blue',
      popular: false,
      description: 'เหมาะสำหรับผู้เริ่มต้นเรียนภาษาอังกฤษ',
      features: [
        'คอร์สเรียนพื้นฐาน 10 คอร์ส',
        'วิดีโอบทเรียน HD คุณภาพสูง',
        'แบบทดสอบออนไลน์',
        'เอกสารประกอบการเรียน PDF',
        'การเข้าถึงเนื้อหา 30 วัน',
        'ซับพอร์ต LINE ในเวลาทำการ'
      ],
      cta: 'เริ่มเรียนเลย'
    },
    {
      id: 'cefr',
      name: 'แพ็คเกจ CEFR',
      nameEn: 'CEFR Package',
      price: 590,
      originalPrice: 790,
      discount: '25%',
      icon: Zap,
      color: 'orange',
      popular: true,
      description: 'เรียนตามมาตรฐาน CEFR พร้อมรับรอง',
      features: [
        'คอร์ส CEFR ครบทุกระดับ A1-C2',
        'คลาสเรียนสด 4 ครั้ง/เดือน',
        'แบบทดสอบวัดระดับ CEFR',
        'ใบรับรองหลังจบคอร์ส',
        'การเข้าถึงเนื้อหา 60 วัน',
        'ซับพอร์ต LINE 24/7',
        'คลาสทบทวนฟรี 2 ครั้ง'
      ],
      cta: 'สั่งซื้อยอดนิยม'
    },
    {
      id: 'combo',
      name: 'แพ็คเกจรวม',
      nameEn: 'Combo Package',
      price: 1500,
      originalPrice: 2000,
      discount: '25%',
      icon: Crown,
      color: 'purple',
      popular: false,
      description: 'ครบครันที่สุด เรียนได้ทุกคอร์ส',
      features: [
        'คอร์สทั้งหมดในระบบ (50+ คอร์ส)',
        'คลาสเรียนสดไม่จำกัด',
        'คลาส 1-on-1 กับครู 2 ครั้ง/เดือน',
        'แบบทดสอบ Mock Test ทุกประเภท',
        'ใบรับรองจากสถาบัน',
        'การเข้าถึงเนื้อหา 90 วัน',
        'ซับพอร์ต Priority 24/7',
        'คลาสเสริมพิเศษฟรี'
      ],
      cta: 'อัพเกรดเลย'
    }
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'blue': return 'btn-secondary';
      case 'orange': return 'btn-primary';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white';
      default: return 'btn-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 thai-text">
          {t('choose_package')}
        </h1>
        <p className="text-lg text-gray-600 thai-text mb-6">
          เลือกแพ็คเกจที่เหมาะกับระดับและเป้าหมายการเรียนของคุณ
        </p>
        <div className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full inline-flex">
          <Gift className="w-5 h-5" />
          <span className="font-medium thai-text">โปรโมชั่นพิเศษ! ลดสูงสุด 25% วันนี้เท่านั้น</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`classroom-card relative ${
              pkg.popular ? 'ring-2 ring-orange-500 ring-opacity-50 scale-105' : ''
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  {t('popular')}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 ${getIconColor(pkg.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <pkg.icon className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 thai-text">
                {pkg.name}
              </CardTitle>
              <p className="text-sm text-gray-600 thai-text">
                {pkg.description}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl text-gray-400 line-through">
                    ฿{pkg.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-red-100 text-red-600">
                    -{pkg.discount}
                  </Badge>
                </div>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ฿{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-1 thai-text">{t('per_month')}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-gray-700 thai-text">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full ${getButtonColor(pkg.color)} text-base font-semibold py-3`}
                size="lg"
                onClick={() => {
                  console.log(`Selected package: ${pkg.id}`);
                  // Handle payment integration here
                }}
              >
                {pkg.cta}
              </Button>

              {/* Additional Info */}
              <p className="text-xs text-gray-500 text-center mt-3 thai-text">
                ชำระเงินปลอดภัย • ยกเลิกได้ตลอดเวลา
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="classroom-card mt-12">
        <CardHeader>
          <CardTitle className="text-center thai-text">เปรียบเทียบแพ็คเกจ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 thai-text">ฟีเจอร์</th>
                  <th className="text-center py-3 thai-text">ทั่วไป</th>
                  <th className="text-center py-3 thai-text">CEFR</th>
                  <th className="text-center py-3 thai-text">รวม</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 thai-text">จำนวนคอร์ส</td>
                  <td className="text-center py-3">10</td>
                  <td className="text-center py-3">25</td>
                  <td className="text-center py-3">50+</td>
                </tr>
                <tr>
                  <td className="py-3 thai-text">คลาสเรียนสด</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">4/เดือน</td>
                  <td className="text-center py-3">ไม่จำกัด</td>
                </tr>
                <tr>
                  <td className="py-3 thai-text">คลาส 1-on-1</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">2/เดือน</td>
                </tr>
                <tr>
                  <td className="py-3 thai-text">ใบรับรอง</td>
                  <td className="text-center py-3">-</td>
                  <td className="text-center py-3">✓</td>
                  <td className="text-center py-3">✓</td>
                </tr>
                <tr>
                  <td className="py-3 thai-text">ซับพอร์ต</td>
                  <td className="text-center py-3 thai-text">เวลาทำการ</td>
                  <td className="text-center py-3">24/7</td>
                  <td className="text-center py-3">Priority 24/7</td>
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
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 thai-text">
              สามารถยกเลิกหรือเปลี่ยนแปลงแพ็คเกจได้หรือไม่?
            </h4>
            <p className="text-gray-600 text-sm thai-text">
              ได้ครับ คุณสามารถยกเลิกหรืออัพเกรดแพ็คเกจได้ตลอดเวลา โดยติดต่อทีมซับพอร์ตผ่าน LINE
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 thai-text">
              การชำระเงินปลอดภัยหรือไม่?
            </h4>
            <p className="text-gray-600 text-sm thai-text">
              ปลอดภัย 100% เราใช้ระบบ Stripe ที่มีมาตรฐานความปลอดภัยระดับธนาคาร
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 thai-text">
              หากเรียนจบแล้วจะได้ใบรับรองหรือไม่?
            </h4>
            <p className="text-gray-600 text-sm thai-text">
              แพ็คเกจ CEFR และ Combo จะได้รับใบรับรองการจบคอร์สที่สามารถใช้อ้างอิงได้
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <div className="text-center bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 thai-text">
          ยังไม่แน่ใจว่าจะเลือกแพ็คเกจไหน?
        </h3>
        <p className="text-gray-600 mb-6 thai-text">
          ปรึกษาทีมของเราได้ฟรี เราจะช่วยหาแพ็คเกจที่เหมาะกับคุณที่สุด
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="btn-secondary">
            <span className="mr-2">💬</span>
            แชท LINE
          </Button>
          <Button variant="outline">
            <span className="mr-2">📞</span>
            โทรปรึกษา
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
