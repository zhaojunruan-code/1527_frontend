import React from 'react';
import { ChevronLeft, Search } from 'lucide-react';

export default function FavoriteList({ navigate, goBack }: { navigate: (view: string, params?: any) => void, goBack: () => void }) {
  const favorites = [
    {
      id: 1,
      title: "2026潮汕英歌舞观看指南：时间与地点全揭秘",
      time: "2026-03-20",
      img: "https://picsum.photos/seed/yingge1/400/300"
    },
    {
      id: 2,
      title: "南澳岛两日游保姆级攻略，看最美日落",
      time: "2026-03-15",
      img: "https://picsum.photos/seed/nanao1/400/300"
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center mb-4">
          <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
          <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">我的收藏</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="搜索收藏的攻略..." 
            className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#A60000] transition-shadow"
          />
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2">
        {favorites.map(s => (
          <div 
            key={s.id} 
            onClick={() => navigate('strategyDetail', s)} 
            className="flex flex-col bg-white rounded-md overflow-hidden shadow-none border border-gray-100 cursor-pointer active:scale-95 transition-transform"
          >
            <img src={s.img} alt={s.title} className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
            <div className="p-2 flex flex-col justify-between shrink-0 h-16">
              <h2 className="font-bold text-gray-800 text-xs line-clamp-2">{s.title}</h2>
              <p className="text-[10px] text-gray-400 mt-1">{s.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
