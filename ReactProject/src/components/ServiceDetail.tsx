import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ServiceDetail({ params, goBack }: { params: any, goBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    params?.img || "https://picsum.photos/seed/s1/400/300",
    "https://picsum.photos/seed/s2/400/300",
    "https://picsum.photos/seed/s3/400/300"
  ];

  return (
    <div className="flex flex-col min-h-full bg-white pb-6">
      <div className="relative h-64">
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
        <h1 className="text-xl font-bold text-gray-800">{params?.title || '服务详情'}</h1>
        <p className="text-sm text-gray-500 mt-2">发布日期: {params?.date || '2026-03-21'}</p>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">服务介绍</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            这是一项为您精心准备的潮汕特色服务。无论您是想体验地道的潮汕美食，还是想深入了解潮汕的历史文化，我们都能为您提供最优质的体验。全程由本地资深向导陪同，带您走街串巷，品尝最正宗的牛肉火锅、生腌海鲜，感受英歌舞的震撼与魅力。
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mt-4">
            <span className="font-bold text-gray-800">服务包含：</span><br/>
            1. 全程专车接送<br/>
            2. 资深本地向导讲解<br/>
            3. 特色景点门票<br/>
            4. 旅游意外险
          </p>
        </div>
      </div>
    </div>
  );
}
