import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function ServiceList({ navigate, goBack }: { navigate: (view: string, params?: any) => void, goBack: () => void }) {
  const services = [
    { id: 1, title: "南澳岛一日游", date: "2026-03-21", img: "https://picsum.photos/seed/nanao/300/400" },
    { id: 2, title: "潮州古城深度游", date: "2026-03-20", img: "https://picsum.photos/seed/chaozhou/300/400" },
    { id: 3, title: "汕头美食专车", date: "2026-03-19", img: "https://picsum.photos/seed/food/300/400" },
    { id: 4, title: "普宁英歌舞观赏专线", date: "2026-03-18", img: "https://picsum.photos/seed/yingge/300/400" },
    { id: 5, title: "揭阳进贤门夜游", date: "2026-03-15", img: "https://picsum.photos/seed/jieyang/300/400" },
    { id: 6, title: "潮汕非遗文化体验", date: "2026-03-10", img: "https://picsum.photos/seed/culture/300/400" },
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 flex items-center border-b border-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">推荐服务</h1>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {services.map(s => (
          <div 
            key={s.id} 
            onClick={() => navigate('serviceDetail', s)} 
            className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-transform aspect-[3/4]"
          >
            <img src={s.img} alt={s.title} className="w-full flex-1 min-h-0 object-cover" referrerPolicy="no-referrer" />
            <div className="p-2 flex flex-col justify-between shrink-0 h-16">
              <h3 className="text-xs font-bold text-gray-800 line-clamp-2">{s.title}</h3>
              <p className="text-[10px] text-gray-400 mt-1">发布日期: {s.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
