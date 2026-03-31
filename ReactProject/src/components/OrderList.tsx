import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const Countdown = ({ initialSeconds = 900 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  return <span className="text-red-500 text-xs font-medium">支付剩余 {m}:{s}</span>;
};

export default function OrderList({ params, goBack, navigate }: { params: any, goBack: () => void, navigate: (view: string, p?: any) => void }) {
  const [activeTab, setActiveTab] = useState(params?.tab || 'all');

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'pending_payment', label: '待支付' },
    { id: 'pending_service', label: '待服务' },
    { id: 'completed', label: '已完成' },
    { id: 'cancelled', label: '已取消' },
    { id: 'refund', label: '退款/售后' },
  ];

  const orders = [
    { id: 'ORD2026032301', title: '南澳岛一日游包车', type: 'charter', status: 'pending_payment', price: 300, date: '2026-03-23 10:00', orderTime: '2026-03-22 14:30', vehicle: '5座 舒适型轿车', destination: '汕头站 -> 南澳岛' },
    { id: 'ORD2026032205', title: '林导 (阿林) - 全天预约', type: 'guide', status: 'pending_service', price: 300, date: '2026-03-24 09:00', orderTime: '2026-03-21 09:15', guideName: '林导 (阿林)', guideImg: 'https://picsum.photos/seed/guide1/100/100' },
    { id: 'ORD2026032012', title: '潮州古城深度游', type: 'charter', status: 'completed', price: 299, date: '2026-03-20 14:00', orderTime: '2026-03-18 10:00', vehicle: '7座 商务车', destination: '潮州古城一日游包车' },
    { id: 'ORD2026031808', title: '汕头站接送机', type: 'charter', status: 'cancelled', price: 120, date: '2026-03-18 15:30', orderTime: '2026-03-17 20:00', vehicle: '5座 经济型轿车', destination: '揭阳潮汕机场 -> 汕头市区' },
    { id: 'ORD2026031502', title: '李导 (老李) - 按小时预约', type: 'guide', status: 'refund', price: 150, date: '2026-03-15 08:00', orderTime: '2026-03-10 11:20', guideName: '李导 (老李)', guideImg: 'https://picsum.photos/seed/guide4/100/100' },
  ];

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending_payment': return <span className="text-red-500">待支付</span>;
      case 'pending_service': return <span className="text-blue-500">待服务</span>;
      case 'completed': return <span className="text-green-500">已完成</span>;
      case 'cancelled': return <span className="text-gray-400">已取消</span>;
      case 'refund': return <span className="text-orange-500">退款/售后</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      <div className="bg-white pt-12 pb-0 sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center px-4 mb-2">
          <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
          <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">我的订单</h1>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-3 text-sm font-medium relative ${activeTab === tab.id ? 'text-[#A60000]' : 'text-gray-500'}`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#A60000] rounded-t-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredOrders.length > 0 ? filteredOrders.map(order => (
          <div key={order.id} onClick={() => navigate('orderDetail', order)} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer active:scale-95 transition-transform">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2 mb-3">
              <span className="text-xs text-gray-500">订单号: {order.id}</span>
              <span className="text-sm font-medium">{getStatusText(order.status)}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-gray-800">{order.title}</h3>
              <span className="font-bold text-gray-800">¥{order.price}</span>
            </div>
            <p className="text-xs text-gray-400">预约时间: {order.date}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                {order.status === 'pending_payment' && <Countdown />}
              </div>
              <div className="flex space-x-2">
                {order.status === 'pending_payment' && (
                  <>
                    <button onClick={(e) => e.stopPropagation()} className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs">取消订单</button>
                    <button onClick={(e) => e.stopPropagation()} className="px-4 py-1.5 rounded-full bg-[#A60000] text-white text-xs">立即支付</button>
                  </>
                )}
                {order.status === 'pending_service' && (
                  <>
                    <button onClick={(e) => e.stopPropagation()} className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs">取消订单</button>
                    <button onClick={(e) => e.stopPropagation()} className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs">联系客服</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 text-gray-400 text-sm">
            暂无相关订单
          </div>
        )}
      </div>
    </div>
  );
}
