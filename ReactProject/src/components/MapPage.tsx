import React from 'react';
import { ChevronLeft, MapPin, Navigation } from 'lucide-react';

export default function MapPage({ params, goBack }: { params: any, goBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white pt-12 pb-3 px-4 sticky top-0 z-40 shadow-sm flex items-center">
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer -ml-2" onClick={goBack}>
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </div>
        <h1 className="flex-1 text-center font-bold text-lg text-gray-800 pr-6">位置详情</h1>
      </div>

      {/* Map Area (Mock) */}
      <div className="flex-1 relative bg-[#e5e3df] overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: 'radial-gradient(#d1d1d1 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* Roads Mock */}
        <div className="absolute top-1/2 left-0 w-full h-4 bg-white -translate-y-1/2 rotate-12"></div>
        <div className="absolute top-0 left-1/2 w-4 h-full bg-white -translate-x-1/2 -rotate-12"></div>

        {/* Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg mb-1 whitespace-nowrap text-sm font-bold text-gray-800">
            {params?.name || '目标位置'}
          </div>
          <MapPin className="w-10 h-10 text-[#A60000] fill-white" />
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-5 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{params?.name || '目标位置'}</h2>
            <p className="text-sm text-gray-500 mt-1">{params?.address || '广东省潮汕地区'}</p>
          </div>
          <div className="w-12 h-12 bg-[#A60000] rounded-full flex items-center justify-center shadow-md shadow-red-900/20 cursor-pointer active:scale-95 transition-transform">
            <Navigation className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium active:bg-gray-200">打车前往</button>
          <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium active:bg-gray-200">周边探索</button>
        </div>
      </div>
    </div>
  );
}
