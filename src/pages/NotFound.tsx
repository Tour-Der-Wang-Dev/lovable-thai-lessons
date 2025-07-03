
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 thai-text">
            ไม่พบหน้าที่คุณต้องการ
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="thai-text">กลับหน้าก่อนหน้า</span>
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center space-x-2 btn-primary"
          >
            <Home className="w-4 h-4" />
            <span className="thai-text">กลับหน้าแรก</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
