
import React from 'react';
import { Heart, MessageCircle, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Kru English</h3>
                <p className="text-sm text-gray-500 thai-text">ครูอิงลิช</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 thai-text">
              เรียนภาษาอังกฤษกับครูมืออาชีพ พร้อมระบบที่ออกแบบมาเพื่อคนไทยโดยเฉพาะ
            </p>
            <p className="text-gray-600">
              Learn English with professional teachers using a system designed specifically for Thai learners.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">ติดต่อเรา</h4>
            <div className="space-y-3">
              <a 
                href="https://lin.ee/yOEjxmf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>LINE: @kruenglish</span>
              </a>
              <a 
                href="tel:+66123456789" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>โทร: 012-345-6789</span>
              </a>
              <a 
                href="mailto:info@kruenglish.com" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@kruenglish.com</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">ติดตามเรา</h4>
            <div className="space-y-3">
              <a 
                href="https://www.tiktok.com/@kruenglish" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
              >
                <div className="w-4 h-4 bg-current rounded"></div>
                <span>TikTok</span>
              </a>
              <a 
                href="https://www.facebook.com/kruenglish" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <div className="w-4 h-4 bg-current rounded"></div>
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.youtube.com/kruenglish" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <div className="w-4 h-4 bg-current rounded"></div>
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Kru English. สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <span className="text-gray-500 text-sm thai-text">สร้างด้วยความใส่ใจ</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-gray-500 text-sm thai-text">เพื่อคนไทย</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
