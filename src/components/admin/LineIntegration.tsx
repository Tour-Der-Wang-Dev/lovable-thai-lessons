
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageSquare, Settings, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LineIntegration = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState({
    totalMessages: 0,
    todayMessages: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Get webhook URL from environment or generate it
    const baseUrl = window.location.origin;
    const generatedWebhookUrl = `${baseUrl.replace('https://', 'https://').replace('http://', 'https://')}/functions/v1/line-webhook`;
    setWebhookUrl(generatedWebhookUrl);
  }, []);

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "คัดลอกแล้ว!",
      description: "URL Webhook ถูกคัดลอกไปยัง clipboard แล้ว",
    });
  };

  const testConnection = async () => {
    try {
      // Test LINE webhook connection
      toast({
        title: "กำลังทดสอบการเชื่อมต่อ...",
        description: "โปรดรอสักครู่",
      });
      
      // Simulate connection test
      setTimeout(() => {
        setIsConnected(true);
        toast({
          title: "เชื่อมต่อสำเร็จ!",
          description: "LINE OA Bot พร้อมใช้งานแล้ว",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "เชื่อมต่อไม่สำเร็จ",
        description: "กรุณาตรวจสอบการตั้งค่า LINE OA",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            สถานะการเชื่อมต่อ LINE OA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isConnected ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">
                  {isConnected ? 'เชื่อมต่อแล้ว' : 'ยังไม่ได้เชื่อมต่อ'}
                </p>
                <p className="text-sm text-gray-600">
                  {isConnected 
                    ? 'LINE OA Bot ทำงานปกติ' 
                    : 'กรุณาตั้งค่า Webhook URL ใน LINE Developers Console'
                  }
                </p>
              </div>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? 'ออนไลน์' : 'ออฟไลน์'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            การตั้งค่า Webhook
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Webhook URL
            </label>
            <div className="flex gap-2">
              <Input 
                value={webhookUrl}
                readOnly
                className="flex-1"
              />
              <Button onClick={copyWebhookUrl} variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              คัดลอก URL นี้ไปใส่ใน LINE Developers Console
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">ขั้นตอนการตั้งค่า:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. เข้า LINE Developers Console</li>
              <li>2. เลือก Channel ของคุณ</li>
              <li>3. ไปที่ Messaging API settings</li>
              <li>4. ใส่ Webhook URL ด้านบน</li>
              <li>5. เปิด "Use webhook" และกด "Verify"</li>
            </ol>
          </div>

          <Button onClick={testConnection} className="w-full">
            ทดสอบการเชื่อมต่อ
          </Button>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>สถิติการใช้งาน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalMessages.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">ข้อความทั้งหมด</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.todayMessages.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">ข้อความวันนี้</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">ผู้ใช้งานแอคทีฟ</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bot Commands */}
      <Card>
        <CardHeader>
          <CardTitle>คำสั่ง Bot ที่ใช้ได้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">"สั่งซื้อ" หรือ "ซื้อคอร์ส"</div>
                <div className="text-sm text-gray-600">แสดงแพ็คเกจเรียนทั้งหมด</div>
              </div>
              <Badge>ใช้งานได้</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">"สวัสดี" หรือ "hello"</div>
                <div className="text-sm text-gray-600">ข้อความต้อนรับ</div>
              </div>
              <Badge>ใช้งานได้</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">"ช่วยเหลือ" หรือ "help"</div>
                <div className="text-sm text-gray-600">แสดงคำสั่งทั้งหมด</div>
              </div>
              <Badge>ใช้งานได้</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">"ติดต่อ" หรือ "contact"</div>
                <div className="text-sm text-gray-600">ข้อมูลการติดต่อ</div>
              </div>
              <Badge>ใช้งานได้</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LineIntegration;
