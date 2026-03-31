import { Map, Search } from 'lucide-react';

export default function Strategy({ navigate }: { navigate: (view: string, params?: any) => void }) {
  const strategies = [
    {
      id: 1,
      title: "2026潮汕英歌舞观看指南：时间与地点全揭秘",
      time: "2026-03-20",
      author: "潮汕文旅局",
      views: "1.2w",
      img: "https://picsum.photos/seed/yingge1/400/300"
    },
    {
      id: 2,
      title: "潮汕牛肉火锅哪家强？本地人吐血推荐",
      time: "2026-03-18",
      author: "吃货小分队",
      views: "8500",
      img: "https://picsum.photos/seed/beef1/400/300"
    },
    {
      id: 3,
      title: "南澳岛两日游保姆级攻略，看最美日落",
      time: "2026-03-15",
      author: "旅行达人阿星",
      views: "2.1w",
      img: "https://picsum.photos/seed/nanao1/400/300"
    },
    {
      id: 4,
      title: "潮州古城Citywalk路线，穿越千年时光",
      time: "2026-03-10",
      author: "古建爱好者",
      views: "5400",
      img: "https://picsum.photos/seed/chaozhou1/400/300"
    },
    {
      id: 5,
      title: "揭阳进贤门夜景打卡，周边小吃一网打尽",
      time: "2026-03-05",
      author: "揭阳土著",
      views: "3200",
      img: "https://picsum.photos/seed/jieyang1/400/300"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-[#A60000] pt-12 pb-4 px-4 sticky top-0 z-40">
        <h1 className="text-white font-bold text-xl text-center flex items-center justify-center mb-4">
          <Map className="w-5 h-5 mr-2" />
          游玩攻略
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="搜索攻略、景点、美食..." 
            className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 grid grid-cols-2 gap-2">
        {strategies.map(s => (
          <div key={s.id} onClick={() => navigate('strategyDetail', s)} className="flex flex-col bg-white rounded-md overflow-hidden shadow-none border border-gray-100 cursor-pointer active:scale-95 transition-transform">
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
