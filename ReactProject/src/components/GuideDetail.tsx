import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

export default function GuideDetail({ params, goBack, navigate }: { params: any, goBack: () => void, navigate: (v: string, p?: any) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    params?.img || "https://picsum.photos/seed/g1/400/500",
    "https://picsum.photos/seed/g2/400/500",
    "https://picsum.photos/seed/g3/400/500"
  ];

  return (
    <div className="flex flex-col min-h-full bg-white pb-20">
      <div className="relative h-80">
        <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white cursor-pointer backdrop-blur-sm" onClick={goBack}>
          <ChevronLeft className="w-5 h-5" />
        </div>
        <img src={images[currentIndex]} className="w-full h-full object-cover" referrerPolicy="no-referrer" alt={`Slide ${currentIndex}`} />
        
        <div className="absolute inset-y-0 left-0 flex items-center px-2">
          <button onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)} className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <button onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)} className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-3 w-full flex justify-center space-x-2">
          {images.map((_, idx) => (
            <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{params?.name || '导游详情'}</h1>
            <div className="flex flex-wrap gap-1 mt-2">
              {(params?.tags || ['潮汕土著', '美食活地图']).map((tag: string) => (
                <span key={tag} className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">{tag}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">已服务</p>
            <p className="text-lg font-bold text-[#A60000]">{params?.orders || 128}单</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">个人简介</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            您好！我是土生土长的潮汕人，热爱这片土地的文化和美食。我熟悉潮汕的每一条街巷，无论是寻找最地道的牛肉火锅、生腌海鲜，还是探访古老的牌坊街、开元寺，我都能为您提供最专业的讲解和最贴心的服务。带您深度体验潮汕风情，感受英歌舞的震撼。
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#A60000]" />
            可预约时间
          </h2>
          <div className="space-y-3">
            <div className="border border-gray-100 bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-bold text-gray-800 mb-2">今天 (03-23)</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">09:00-12:00</span>
                <span className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">14:00-18:00</span>
                <span className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">19:00-22:00</span>
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-bold text-gray-800 mb-2">明天 (03-24)</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded border border-gray-200">09:00-12:00 (已满)</span>
                <span className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">14:00-18:00</span>
                <span className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">19:00-22:00</span>
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-bold text-gray-800 mb-2">后天 (03-25)</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-red-50 text-[#A60000] px-2 py-1 rounded border border-red-100">全天可约</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-3 z-50">
        <button onClick={() => navigate('guideBooking', params)} className="w-full bg-[#A60000] text-white py-3 rounded-full font-medium shadow-md active:scale-95 transition-transform">立即预约</button>
      </div>
    </div>
  );
}
