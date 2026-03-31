import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIAssistant() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '胶己人，你好！我是潮汕智能助手。关于潮汕旅游、美食、英歌舞文化，或者行程规划，都可以问我哦！' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commonQuestions = [
    "普宁英歌舞哪里看？",
    "潮州三天两夜怎么玩？",
    "推荐正宗的牛肉火锅",
    "南澳岛需要买门票吗？"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = text;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "你是一个专门解答中国广东潮汕地区（汕头、潮州、揭阳）旅游、文化、美食的智能助手。你特别了解英歌舞。请用热情、友好的语气回答，偶尔可以带一点点潮汕话的拼音或特色词汇（如胶己人）。回答要简洁明了，适合手机屏幕阅读。"
        }
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || '不好意思，我刚才走神了，请再问一次。' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: '网络好像有点问题，请稍后再试哦。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-[#A60000] pt-12 pb-4 px-4 sticky top-0 z-40 shadow-sm flex items-center justify-center">
        <Bot className="w-5 h-5 text-white mr-2" />
        <h1 className="text-white font-bold text-lg">潮汕百事通 AI</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-100 ml-2' : 'bg-[#A60000] mr-2'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-blue-600" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-[#A60000] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[85%] flex-row">
              <div className="w-8 h-8 rounded-full bg-[#A60000] mr-2 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="p-3 rounded-2xl text-sm bg-white text-gray-500 border border-gray-100 shadow-sm rounded-tl-none flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3">
        {/* Quick Questions */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 mb-3 pb-1">
          {commonQuestions.map((q, i) => (
            <button 
              key={i}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap bg-red-50 text-[#A60000] border border-red-100 px-3 py-1.5 rounded-full text-xs flex items-center"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {q}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="问问潮汕好玩好吃的..." 
            className="flex-1 bg-gray-100 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#A60000]"
          />
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#A60000] text-white flex items-center justify-center disabled:opacity-50 flex-shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
