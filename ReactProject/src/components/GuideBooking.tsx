import React, { useState } from 'react';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';

export default function GuideBooking({ params, goBack }: { params: any, goBack: () => void }) {
  const [bookingType, setBookingType] = useState<'full' | 'hourly'>('full');
  const [selectedDate, setSelectedDate] = useState('03-23');
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  const toggleHour = (hour: string) => {
    if (selectedHours.includes(hour)) {
      setSelectedHours(selectedHours.filter(h => h !== hour));
    } else {
      setSelectedHours([...selectedHours, hour]);
    }
  };

  const dates = [
    { date: '03-23', label: '今天' },
    { date: '03-24', label: '明天' },
    { date: '03-25', label: '后天' },
  ];

  const hours = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00',
    '19:00-20:00', '20:00-21:00', '21:00-22:00'
  ];

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 flex items-center border-b border-gray-100">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">预约导游</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Guide Info */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4">
          <img src={params?.img || "https://picsum.photos/seed/g1/100/100"} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" alt="Guide" />
          <div>
            <h2 className="font-bold text-gray-800">{params?.name || '导游'}</h2>
            <p className="text-xs text-gray-500 mt-1">请选择您的预约方式和时间</p>
          </div>
        </div>

        {/* Booking Type */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">预约方式</h3>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setBookingType('full')}
              className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${bookingType === 'full' ? 'border-[#A60000] bg-red-50 text-[#A60000]' : 'border-gray-200 bg-white text-gray-600'}`}
            >
              <Calendar className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">全天预约</span>
              <span className="text-xs mt-1 opacity-80">¥300/天</span>
            </div>
            <div 
              onClick={() => setBookingType('hourly')}
              className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${bookingType === 'hourly' ? 'border-[#A60000] bg-red-50 text-[#A60000]' : 'border-gray-200 bg-white text-gray-600'}`}
            >
              <Clock className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">按小时预约</span>
              <span className="text-xs mt-1 opacity-80">¥50/小时</span>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">选择日期</h3>
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
            {dates.map(d => (
              <div 
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex-shrink-0 w-20 py-3 rounded-lg flex flex-col items-center justify-center cursor-pointer border ${selectedDate === d.date ? 'border-[#A60000] bg-[#A60000] text-white' : 'border-gray-200 bg-white text-gray-600'}`}
              >
                <span className="text-xs mb-1">{d.label}</span>
                <span className="text-sm font-bold">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hour Selection (Only if hourly) */}
        {bookingType === 'hourly' && (
          <div>
            <h3 className="font-bold text-gray-800 mb-3">选择时间段 (可多选)</h3>
            <div className="grid grid-cols-3 gap-2">
              {hours.map(h => {
                const isSelected = selectedHours.includes(h);
                return (
                  <div 
                    key={h}
                    onClick={() => toggleHour(h)}
                    className={`py-2 rounded border text-center text-xs cursor-pointer transition-colors ${isSelected ? 'border-[#A60000] bg-red-50 text-[#A60000]' : 'border-gray-200 bg-white text-gray-600'}`}
                  >
                    {h}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-3 flex justify-between items-center z-50">
        <div className="text-[#A60000] font-bold text-xl">
          ¥{bookingType === 'full' ? 300 : selectedHours.length * 50}
        </div>
        <button className="bg-[#A60000] text-white px-8 py-2.5 rounded-full font-medium shadow-md active:scale-95 transition-transform">
          确认预约
        </button>
      </div>
    </div>
  );
}
