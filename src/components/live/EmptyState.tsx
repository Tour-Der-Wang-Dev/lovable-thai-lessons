
import React from 'react';
import { Video } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2 thai-text">
        ไม่มีคลาสสดในวันที่เลือก
      </h3>
      <p className="text-gray-500 thai-text">
        ลองเลือกวันอื่นหรือติดตามประกาศคลาสใหม่
      </p>
    </div>
  );
};

export default EmptyState;
