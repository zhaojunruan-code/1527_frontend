import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function AboutUs({ goBack }: { goBack: () => void }) {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-6">
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 flex items-center border-b border-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">关于我们</h1>
      </div>

      <div className="flex flex-col items-center pt-12 pb-8 px-6">
        <div className="w-20 h-20 bg-[#A60000] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
          潮
        </div>
        <h2 className="text-xl font-bold text-gray-800">潮汕·英歌行</h2>
        <p className="text-sm text-gray-500 mt-1">Version 1.0.0</p>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none">
          <h3 className="text-lg font-bold text-gray-800 mb-2">我们的使命</h3>
          <p className="mb-3">
            <strong>“潮汕·英歌行”</strong>致力于为您提供最地道、最深度的潮汕本地游玩体验。我们深耕潮汕本地文化，汇聚了最优质的导游资源、最靠谱的包车服务以及最全面的游玩攻略。
          </p>
          <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">核心服务</h3>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li><strong>定制包车：</strong> 舒适便捷的出行体验，覆盖潮汕全境。</li>
            <li><strong>资深导游：</strong> 本地土著带您深入了解潮汕历史与风土人情。</li>
            <li><strong>精选攻略：</strong> 实时更新的游玩指南，不错过任何精彩瞬间。</li>
          </ul>
          <p>
            无论您是想近距离感受<em>“中华战舞”</em>英歌舞的震撼，还是想寻觅隐藏在街巷深处的地道美食，我们都能为您量身定制专属行程，让您的潮汕之旅不留遗憾。
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between p-4 border-b border-gray-50">
            <span className="text-sm text-gray-700">官方网站</span>
            <span className="text-sm text-gray-500">www.chaoshan-travel.com</span>
          </div>
          <div className="flex justify-between p-4 border-b border-gray-50">
            <span className="text-sm text-gray-700">服务协议</span>
            <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
          </div>
          <div className="flex justify-between p-4">
            <span className="text-sm text-gray-700">隐私政策</span>
            <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-12 pb-6 text-center">
        <p className="text-xs text-gray-400">Copyright © 2026 潮汕英歌行</p>
        <p className="text-xs text-gray-400 mt-1">All Rights Reserved.</p>
      </div>
    </div>
  );
}
