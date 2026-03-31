import React from 'react';
import { Search, Car, UserCheck, Map as MapIcon, ClipboardList, HeadphonesIcon, Bot } from 'lucide-react';

export default function Home({ navigate }: { navigate: (view: string, params?: any) => void }) {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      {/* Header / Search */}
      <div className="bg-[#A60000] pt-12 pb-4 px-4 sticky top-0 z-40 rounded-b-2xl shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h1 className="text-white font-bold text-xl tracking-wider">潮汕·英歌行</h1>
        </div>
        <div className="relative z-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="搜索服务、潮汕攻略..." 
            className="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none shadow-inner"
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="px-4 mt-4">
        <div className="w-full h-40 rounded-xl overflow-hidden relative shadow-lg">
          <img src="https://picsum.photos/seed/chaoshan-dance/800/400" alt="英歌舞" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white font-bold text-sm">感受非遗魅力：普宁英歌舞震撼来袭</p>
          </div>
        </div>
      </div>

      {/* King Kong Area (Grid) */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-4 px-4 mt-6 bg-white mx-4 py-6 rounded-xl shadow-sm">
        <GridItem icon={<Car className="w-6 h-6 text-[#A60000]" />} label="旅游包车" onClick={() => navigate('service')} />
        <GridItem icon={<UserCheck className="w-6 h-6 text-[#A60000]" />} label="潮汕导游" onClick={() => navigate('service')} />
        <GridItem icon={<MapIcon className="w-6 h-6 text-[#A60000]" />} label="潮汕攻略" onClick={() => navigate('strategy')} />
        <GridItem icon={<ClipboardList className="w-6 h-6 text-[#A60000]" />} label="我的订单" onClick={() => navigate('profile')} />
        <GridItem icon={<HeadphonesIcon className="w-6 h-6 text-[#A60000]" />} label="在线客服" onClick={() => {}} />
        <GridItem icon={<Bot className="w-6 h-6 text-[#A60000]" />} label="智能助手" onClick={() => navigate('ai')} />
      </div>

      {/* Recommended Services */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 border-l-4 border-[#A60000] pl-2">推荐服务</h2>
          <span className="text-xs text-gray-500 cursor-pointer" onClick={() => navigate('serviceList')}>更多 &gt;</span>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2 hide-scrollbar">
          <ServiceCard title="南澳岛一日游" date="2026-03-21" img="https://picsum.photos/seed/nanao/300/200" onClick={() => navigate('serviceDetail', { title: "南澳岛一日游", date: "2026-03-21", img: "https://picsum.photos/seed/nanao/300/200" })} />
          <ServiceCard title="潮州古城深度游" date="2026-03-20" img="https://picsum.photos/seed/chaozhou/300/200" onClick={() => navigate('serviceDetail', { title: "潮州古城深度游", date: "2026-03-20", img: "https://picsum.photos/seed/chaozhou/300/200" })} />
          <ServiceCard title="汕头美食专车" date="2026-03-19" img="https://picsum.photos/seed/food/300/200" onClick={() => navigate('serviceDetail', { title: "汕头美食专车", date: "2026-03-19", img: "https://picsum.photos/seed/food/300/200" })} />
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 border-l-4 border-[#A60000] pl-2">潮汕攻略</h2>
          <span className="text-xs text-gray-500" onClick={() => navigate('strategy')}>更多 &gt;</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <StrategyCard 
            title="2026潮汕英歌舞观看指南：时间与地点全揭秘" 
            time="2026-03-20" 
            img="https://picsum.photos/seed/yingge/150/150" 
            onClick={() => navigate('strategyDetail', { title: "2026潮汕英歌舞观看指南：时间与地点全揭秘", time: "2026-03-20", img: "https://picsum.photos/seed/yingge/150/150" })}
          />
          <StrategyCard 
            title="潮汕牛肉火锅哪家强？本地人吐血推荐" 
            time="2026-03-18" 
            img="https://picsum.photos/seed/beef/150/150" 
            onClick={() => navigate('strategyDetail', { title: "潮汕牛肉火锅哪家强？本地人吐血推荐", time: "2026-03-18", img: "https://picsum.photos/seed/beef/150/150" })}
          />
        </div>
      </div>
    </div>
  );
}

function GridItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-gray-700 font-medium">{label}</span>
    </div>
  );
}

function ServiceCard({ title, date, img, onClick }: { title: string, date: string, img: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="min-w-[140px] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
      <img src={img} alt={title} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
      <div className="p-2">
        <h3 className="text-sm font-bold text-gray-800 truncate">{title}</h3>
        <p className="text-gray-400 text-[10px] mt-1">发布日期: {date}</p>
      </div>
    </div>
  );
}

function StrategyCard({ title, time, img, onClick }: { title: string, time: string, img: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col bg-white rounded-md overflow-hidden shadow-none border border-gray-100 cursor-pointer active:scale-95 transition-transform">
      <img src={img} alt={title} className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
      <div className="p-2 flex flex-col justify-between shrink-0 h-16">
        <h3 className="text-xs font-bold text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-[10px] text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
