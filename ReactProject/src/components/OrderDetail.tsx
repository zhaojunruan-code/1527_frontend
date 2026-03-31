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
  return <span className="text-red-500 text-sm font-medium">支付剩余 {m}:{s}</span>;
};

export default function OrderDetail({ params, goBack }: { params: any, goBack: () => void }) {
  const order = params || {};

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending_payment': return <span className="text-red-500 font-bold">待支付</span>;
      case 'pending_service': return <span className="text-blue-500 font-bold">待服务</span>;
      case 'completed': return <span className="text-green-500 font-bold">已完成</span>;
      case 'cancelled': return <span className="text-gray-400 font-bold">已取消</span>;
      case 'refund': return <span className="text-orange-500 font-bold">退款/售后</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24 relative">
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 flex items-center border-b border-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">订单详情</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <span className="text-gray-800 font-bold">订单状态</span>
          {getStatusText(order.status)}
        </div>

        {/* Info Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
          {order.type === 'guide' ? (
            <div className="flex items-center space-x-4 border-b border-gray-50 pb-4">
              <img src={order.guideImg || "https://picsum.photos/seed/g1/100/100"} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" alt="Guide" />
              <div>
                <h2 className="font-bold text-gray-800">{order.guideName || order.title}</h2>
                <p className="text-xs text-gray-500 mt-1">潮汕资深导游</p>
              </div>
            </div>
          ) : (
            <div className="border-b border-gray-50 pb-4">
              <h2 className="font-bold text-gray-800">{order.title}</h2>
            </div>
          )}

          <div className="space-y-3 text-sm">
            {order.type === 'charter' && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500">车型</span>
                  <span className="text-gray-800">{order.vehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">目的地/行程</span>
                  <span className="text-gray-800">{order.destination}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">预约时间</span>
              <span className="text-gray-800">{order.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">订单总价</span>
              <span className="text-[#A60000] font-bold">¥{order.price}</span>
            </div>
          </div>
        </div>

        {/* Order Meta Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">订单编号</span>
            <span className="text-gray-800">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">下单时间</span>
            <span className="text-gray-800">{order.orderTime}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {(order.status === 'pending_payment' || order.status === 'pending_service') && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 p-4 flex justify-between items-center z-50">
          <div>
            {order.status === 'pending_payment' && <Countdown />}
          </div>
          <div className="flex space-x-3">
            {order.status === 'pending_payment' && (
              <>
                <button className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium">取消订单</button>
                <button className="px-5 py-2 rounded-full bg-[#A60000] text-white text-sm font-medium">立即支付</button>
              </>
            )}
            {order.status === 'pending_service' && (
              <>
                <button className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium">取消订单</button>
                <button className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium">联系客服</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
