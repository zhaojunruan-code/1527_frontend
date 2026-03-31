import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';

export default function Chat({ goBack }: { goBack: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', text: '欢迎来到潮汕英歌行在线客服，请问有什么可以帮您？', time: '10:00' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setInput('');
    
    // Mock reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'system',
        text: '客服代表已收到您的消息，正在为您处理，请稍候...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white pt-12 pb-4 px-4 sticky top-0 z-40 flex items-center border-b border-gray-100 shadow-sm">
        <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer" onClick={goBack} />
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-6">在线客服</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl p-3 ${msg.type === 'user' ? 'bg-[#A60000] text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${msg.type === 'user' ? 'text-white/70' : 'text-gray-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-3 flex items-center space-x-2 z-50">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="请输入您的问题..." 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#A60000]"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#A60000] rounded-full flex items-center justify-center text-white flex-shrink-0 active:scale-95 transition-transform"
        >
          <Send className="w-4 h-4 ml-[-2px]" />
        </button>
      </div>
    </div>
  );
}
