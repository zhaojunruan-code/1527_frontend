import React from 'react';

export default function Login({ navigate }: { navigate: (view: string) => void }) {
  return (
    <div className="flex flex-col min-h-full bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#A60000]/10 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#A60000]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-32 -left-24 w-48 h-48 bg-[#A60000]/5 rounded-full blur-2xl -z-10" />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Logo */}
        <div className="w-24 h-24 bg-[#A60000] rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-[#A60000]/20 mb-6">
          潮
        </div>
        
        {/* App Name & Slogan */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-wider">潮汕·英歌行</h1>
        <p className="text-sm text-gray-500 mb-16 tracking-widest">探索最地道的潮汕风情</p>

        {/* Login Button */}
        <button 
          onClick={() => navigate('home')}
          className="w-full bg-[#A60000] text-white font-bold text-lg py-4 rounded-full shadow-lg shadow-[#A60000]/30 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>快捷登录</span>
        </button>

        {/* User Agreement */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400">
          <input type="checkbox" className="w-3 h-3 accent-[#A60000] rounded-sm" defaultChecked />
          <span>我已阅读并同意</span>
          <span className="text-[#A60000] cursor-pointer">《用户协议》</span>
          <span>和</span>
          <span className="text-[#A60000] cursor-pointer">《隐私政策》</span>
        </div>
      </div>
    </div>
  );
}
