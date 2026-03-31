import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Heart } from 'lucide-react';

export default function StrategyDetail({ params, goBack, navigate }: { params: any, goBack: () => void, navigate: (v: string, p: any) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const images = [
    params?.img || "https://picsum.photos/seed/st1/400/300",
    "https://picsum.photos/seed/st2/400/300",
    "https://picsum.photos/seed/st3/400/300"
  ];

  const locationName = params?.title?.includes('英歌') ? '普宁市流沙广场' : '潮州古城牌坊街';

  return (
    <div className="flex flex-col min-h-full bg-white pb-8 relative">
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
        <div className="flex justify-between items-start gap-4">
          <h1 className="text-xl font-bold text-gray-800 flex-1">{params?.title || '攻略详情'}</h1>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex flex-col items-center justify-center space-y-1 shrink-0 active:scale-95 transition-transform mt-1"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            <span className={`text-[10px] ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
              {isFavorite ? '已收藏' : '收藏'}
            </span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">发布时间: {params?.time || '2026-03-20'}</p>
        
        <div 
          className="flex items-center mt-4 bg-gray-50 p-3 rounded-xl cursor-pointer active:bg-gray-100 border border-gray-100"
          onClick={() => navigate('map', { name: locationName, address: `广东省${locationName}附近` })}
        >
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#A60000]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">{locationName}</p>
            <p className="text-xs text-gray-500 mt-0.5">点击查看地图及导航</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              潮汕地区，以其独特的文化和美食闻名遐迩。来到这里，你不仅能品尝到令人垂涎欲滴的牛肉火锅、卤鹅和各种粿品，还能感受到浓厚的历史底蕴。
            </p>
            <p>
              如果是为了看英歌舞而来，建议提前查好演出时间表。英歌舞通常在逢年过节或者重大庆典时表演，气势磅礴，极具阳刚之气，被誉为“中华战舞”。现场观看的震撼力是视频里无法体会到的。
            </p>
            <p>
              除了看表演，古城的Citywalk也是必不可少的。穿梭在牌坊街，两旁是古色古香的骑楼，耳边是悠扬的潮剧，仿佛穿越回了古代。记得去开元寺感受一下宁静，去广济桥看看“过河拆桥”的奇景。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
