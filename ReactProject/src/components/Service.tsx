import { useState, useMemo } from 'react';
import { Car, MapPin, Clock, Phone, Star, Search } from 'lucide-react';

export default function Service({ navigate }: { navigate: (view: string, params?: any) => void }) {
  const [activeTab, setActiveTab] = useState<'charter' | 'guide'>('charter');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tabs - Redesigned and moved to top */}
      <div className="bg-[#A60000] pt-12 pb-4 px-4 sticky top-0 z-40 shadow-sm">
        <div className="flex bg-black/10 p-1 rounded-xl">
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'charter' ? 'bg-white text-[#A60000] shadow-sm' : 'text-white/80'}`}
            onClick={() => setActiveTab('charter')}
          >
            旅游包车/接送
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'guide' ? 'bg-white text-[#A60000] shadow-sm' : 'text-white/80'}`}
            onClick={() => setActiveTab('guide')}
          >
            潮汕导游预约
          </button>
        </div>
        
        {/* Search Bar for Guide Service */}
        {activeTab === 'guide' && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索导游、标签..." 
              className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'charter' ? <CharterService navigate={navigate} /> : <GuideService navigate={navigate} />}
      </div>
    </div>
  );
}

function CharterService({ navigate }: { navigate: (view: string, params?: any) => void }) {
  const [vehicle, setVehicle] = useState('');
  const [destination, setDestination] = useState('');

  // Calculate price based on selections
  const price = useMemo(() => {
    if (!vehicle || !destination) return null;
    
    let basePrice = 0;
    if (destination.includes('接送机')) basePrice = 120;
    else if (destination.includes('南澳岛')) basePrice = 300;
    else if (destination.includes('一日游')) basePrice = 400;
    else basePrice = 200;

    if (vehicle.includes('舒适')) basePrice += 50;
    else if (vehicle.includes('商务')) basePrice += 150;
    else if (vehicle.includes('中巴')) basePrice += 300;

    return basePrice;
  }, [vehicle, destination]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center"><Car className="w-5 h-5 mr-2 text-[#A60000]"/> 预约包车</h2>
        
        <div className="space-y-4">
          {/* Vehicle Type */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">选择车型</label>
            <select 
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#A60000]"
            >
              <option value="" disabled>请选择车型</option>
              <option value="5座 经济型轿车">5座 经济型轿车</option>
              <option value="5座 舒适型轿车">5座 舒适型轿车</option>
              <option value="7座 商务车">7座 商务车 (别克GL8等)</option>
              <option value="14座 中巴车">14座 中巴车</option>
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">目的地/行程</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-9 text-sm focus:outline-none focus:border-[#A60000] appearance-none"
              >
                <option value="" disabled>请选择目的地或行程安排</option>
                <option value="揭阳潮汕机场接送机">揭阳潮汕机场接送机</option>
                <option value="汕头站 -> 南澳岛">汕头站 -&gt; 南澳岛</option>
                <option value="潮州古城一日游包车">潮州古城一日游包车</option>
                <option value="汕头美食打卡专车">汕头美食打卡专车</option>
                <option value="普宁英歌舞观赏专线">普宁英歌舞观赏专线</option>
              </select>
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">预约时间</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="datetime-local" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-9 text-sm focus:outline-none focus:border-[#A60000]" />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">价格</p>
            {price !== null ? (
              <p className="text-[#A60000] font-bold text-2xl">¥ <span className="text-3xl">{price}</span></p>
            ) : (
              <p className="text-gray-400 font-bold text-xl mt-1">--</p>
            )}
          </div>
          <button 
            disabled={price === null}
            className={`px-6 py-2.5 rounded-full font-medium text-sm shadow-md transition-transform ${price !== null ? 'bg-[#A60000] text-white active:scale-95 shadow-red-900/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            立即下单
          </button>
        </div>
      </div>

      <button 
        onClick={() => navigate('chat')}
        className="w-full bg-white border border-[#A60000] text-[#A60000] py-3 rounded-xl font-medium flex items-center justify-center space-x-2 active:bg-red-50 transition-colors"
      >
        <Phone className="w-4 h-4" />
        <span>联系客服定制行程</span>
      </button>
    </div>
  );
}

function GuideService({ navigate }: { navigate: (view: string, params?: any) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <GuideCard 
        name="林导 (阿林)" 
        tags={['潮汕土著', '美食活地图']} 
        orders={128} 
        img="https://picsum.photos/seed/guide1/300/400" 
        onClick={() => navigate('guideDetail', { name: "林导 (阿林)", tags: ['潮汕土著', '美食活地图'], orders: 128, img: "https://picsum.photos/seed/guide1/300/400" })}
      />
      <GuideCard 
        name="陈导 (小陈)" 
        tags={['历史文化', '摄影跟拍']} 
        orders={85} 
        img="https://picsum.photos/seed/guide2/300/400" 
        onClick={() => navigate('guideDetail', { name: "陈导 (小陈)", tags: ['历史文化', '摄影跟拍'], orders: 85, img: "https://picsum.photos/seed/guide2/300/400" })}
      />
      <GuideCard 
        name="黄导 (大黄)" 
        tags={['南澳岛环岛', '赶海体验']} 
        orders={204} 
        img="https://picsum.photos/seed/guide3/300/400" 
        onClick={() => navigate('guideDetail', { name: "黄导 (大黄)", tags: ['南澳岛环岛', '赶海体验'], orders: 204, img: "https://picsum.photos/seed/guide3/300/400" })}
      />
      <GuideCard 
        name="李导 (老李)" 
        tags={['英歌舞解说', '非遗体验']} 
        orders={312} 
        img="https://picsum.photos/seed/guide4/300/400" 
        onClick={() => navigate('guideDetail', { name: "李导 (老李)", tags: ['英歌舞解说', '非遗体验'], orders: 312, img: "https://picsum.photos/seed/guide4/300/400" })}
      />
    </div>
  );
}

function GuideCard({ name, tags, orders, img, onClick }: { name: string, tags: string[], orders: number, img: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-transform aspect-[3/4]">
      <img src={img} alt={name} className="w-full flex-1 min-h-0 object-cover" referrerPolicy="no-referrer" />
      <div className="p-2 flex flex-col justify-between shrink-0 h-20">
        <div>
          <h3 className="font-bold text-gray-800 text-sm truncate">{name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] bg-red-50 text-[#A60000] px-1 rounded border border-red-100 truncate max-w-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-gray-400">已售 {orders} 单</span>
        </div>
      </div>
    </div>
  );
}
