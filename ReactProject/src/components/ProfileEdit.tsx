import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';

export default function ProfileEdit({ goBack }: { goBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 flex items-center border-b border-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">个人资料编辑</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <img src="https://picsum.photos/seed/user123/100/100" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute bottom-0 right-0 bg-[#A60000] p-1.5 rounded-full text-white border-2 border-white">
              <Camera className="w-3 h-3" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">点击更换头像</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <span className="text-sm text-gray-700 w-20">昵称</span>
            <input type="text" defaultValue="潮汕食客_8899" className="flex-1 text-right text-sm text-gray-800 focus:outline-none" />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <span className="text-sm text-gray-700 w-20">手机号</span>
            <input type="tel" defaultValue="138****5678" className="flex-1 text-right text-sm text-gray-800 focus:outline-none" />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <span className="text-sm text-gray-700 w-20">性别</span>
            <select className="flex-1 text-right text-sm text-gray-800 focus:outline-none bg-transparent appearance-none" dir="rtl">
              <option>保密</option>
              <option>男</option>
              <option>女</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-gray-700 w-20">个性签名</span>
            <input type="text" placeholder="介绍一下自己吧" className="flex-1 text-right text-sm text-gray-800 focus:outline-none" />
          </div>
        </div>

        <button className="w-full bg-[#A60000] text-white py-3 rounded-full font-medium shadow-md mt-6 active:scale-95 transition-transform">
          保存修改
        </button>
      </div>
    </div>
  );
}
