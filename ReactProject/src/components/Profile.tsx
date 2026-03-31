import React, { useState } from 'react';
import { Settings, Heart, Info, HeadphonesIcon, Mail, ChevronRight, Wallet, Clock, CheckCircle, XCircle, RefreshCcw, Phone } from 'lucide-react';

export default function Profile({ navigate }: { navigate: (view: string, params?: any) => void }) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header / User Info */}
      <div className="bg-[#A60000] pt-16 pb-12 px-6 relative rounded-b-[2.5rem] shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white border-2 border-white/30 overflow-hidden shadow-inner">
            <img src="https://picsum.photos/seed/user123/100/100" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="text-white">
            <h1 className="font-bold text-xl">潮汕食客_8899</h1>
            <p className="text-white/80 text-sm mt-1 flex items-center">
              138****5678
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative z-10 space-y-4">
        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3" onClick={() => navigate('orderList', { tab: 'all' })}>
            <h2 className="font-bold text-gray-800">我的订单</h2>
            <span className="text-xs text-gray-400 flex items-center cursor-pointer">全部订单 <ChevronRight className="w-3 h-3" /></span>
          </div>
          <div className="flex justify-between px-2">
            <OrderIcon icon={<Wallet className="w-6 h-6" />} label="待支付" onClick={() => navigate('orderList', { tab: 'pending_payment' })} />
            <OrderIcon icon={<Clock className="w-6 h-6" />} label="待服务" onClick={() => navigate('orderList', { tab: 'pending_service' })} />
            <OrderIcon icon={<CheckCircle className="w-6 h-6" />} label="已完成" onClick={() => navigate('orderList', { tab: 'completed' })} />
            <OrderIcon icon={<XCircle className="w-6 h-6" />} label="已取消" onClick={() => navigate('orderList', { tab: 'cancelled' })} />
            <OrderIcon icon={<RefreshCcw className="w-6 h-6" />} label="退款/售后" onClick={() => navigate('orderList', { tab: 'refund' })} />
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem icon={<Heart className="w-5 h-5 text-rose-500" />} label="我的收藏" onClick={() => navigate('favoriteList')} />
          <MenuItem icon={<Settings className="w-5 h-5 text-gray-500" />} label="个人资料编辑" onClick={() => navigate('profileEdit')} />
          <MenuItem icon={<Info className="w-5 h-5 text-blue-500" />} label="关于我们" onClick={() => navigate('aboutUs')} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem icon={<HeadphonesIcon className="w-5 h-5 text-orange-500" />} label="在线客服" onClick={() => navigate('chat')} />
          <MenuItem icon={<Mail className="w-5 h-5 text-green-500" />} label="联系我们" border={false} onClick={() => setShowContactModal(true)} />
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-6 flex flex-col items-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-[#A60000]" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">联系我们</h3>
            <p className="text-gray-500 text-sm mb-6 text-center">客服工作时间：09:00 - 22:00</p>
            <p className="text-2xl font-bold text-[#A60000] mb-8">400-123-4567</p>
            
            <div className="flex w-full space-x-3">
              <button 
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-600 font-medium text-sm"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  window.location.href = 'tel:4001234567';
                  setShowContactModal(false);
                }}
                className="flex-1 py-2.5 rounded-full bg-[#A60000] text-white font-medium text-sm shadow-md"
              >
                呼叫
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderIcon({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={onClick}>
      <div className="text-gray-600 relative">
        {icon}
        {/* Optional badge */}
        {label === '待支付' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>}
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}

function MenuItem({ icon, label, border = true, onClick }: { icon: React.ReactNode, label: string, border?: boolean, onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center justify-between p-4 bg-white active:bg-gray-50 cursor-pointer transition-colors ${border ? 'border-b border-gray-50' : ''}`}>
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </div>
  );
}
