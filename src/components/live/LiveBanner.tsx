
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LiveBanner: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div>
              <h3 className="text-lg font-semibold">กำลังไลฟ์อยู่ตอนนี้!</h3>
              <p className="text-red-100">Business English Workshop กับ Teacher Mike</p>
            </div>
          </div>
          <Button className="bg-white text-red-500 hover:bg-red-50">
            เข้าร่วมเลย
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveBanner;
