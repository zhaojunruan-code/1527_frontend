/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home as HomeIcon, Briefcase, Bot, Map, User } from 'lucide-react';
import Home from './components/Home';
import Service from './components/Service';
import AIAssistant from './components/AIAssistant';
import Strategy from './components/Strategy';
import Profile from './components/Profile';
import ServiceDetail from './components/ServiceDetail';
import StrategyDetail from './components/StrategyDetail';
import MapPage from './components/MapPage';
import GuideDetail from './components/GuideDetail';
import GuideBooking from './components/GuideBooking';
import ServiceList from './components/ServiceList';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import FavoriteList from './components/FavoriteList';
import ProfileEdit from './components/ProfileEdit';
import AboutUs from './components/AboutUs';
import Chat from './components/Chat';
import Login from './components/Login';

export default function App() {
  const [history, setHistory] = useState<{view: string, params?: any}[]>([{ view: 'login' }]);
  const current = history[history.length - 1];

  const navigate = (view: string, params?: any) => {
    setHistory(prev => [...prev, { view, params }]);
  };

  const goBack = () => {
    setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const handleTabClick = (view: string) => {
    setHistory([{ view }]);
  };

  const renderContent = () => {
    switch (current.view) {
      case 'home': return <Home navigate={navigate} />;
      case 'service': return <Service navigate={navigate} />;
      case 'ai': return <AIAssistant />;
      case 'strategy': return <Strategy navigate={navigate} />;
      case 'profile': return <Profile navigate={navigate} />;
      case 'serviceDetail': return <ServiceDetail params={current.params} goBack={goBack} />;
      case 'strategyDetail': return <StrategyDetail params={current.params} goBack={goBack} navigate={navigate} />;
      case 'guideDetail': return <GuideDetail params={current.params} goBack={goBack} navigate={navigate} />;
      case 'guideBooking': return <GuideBooking params={current.params} goBack={goBack} />;
      case 'serviceList': return <ServiceList navigate={navigate} goBack={goBack} />;
      case 'orderList': return <OrderList params={current.params} goBack={goBack} navigate={navigate} />;
      case 'orderDetail': return <OrderDetail params={current.params} goBack={goBack} />;
      case 'favoriteList': return <FavoriteList navigate={navigate} goBack={goBack} />;
      case 'profileEdit': return <ProfileEdit goBack={goBack} />;
      case 'aboutUs': return <AboutUs goBack={goBack} />;
      case 'chat': return <Chat goBack={goBack} />;
      case 'map': return <MapPage params={current.params} goBack={goBack} />;
      case 'login': return <Login navigate={navigate} />;
      default: return <Login navigate={navigate} />;
    }
  };

  const isMainTab = ['home', 'service', 'ai', 'strategy', 'profile'].includes(current.view);

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto ${isMainTab ? 'pb-16' : ''}`}>
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      {isMainTab && (
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50">
          <NavItem icon={<HomeIcon />} label="首页" isActive={current.view === 'home'} onClick={() => handleTabClick('home')} />
          <NavItem icon={<Briefcase />} label="服务" isActive={current.view === 'service'} onClick={() => handleTabClick('service')} />
          <NavItem icon={<Bot />} label="AI助手" isActive={current.view === 'ai'} onClick={() => handleTabClick('ai')} />
          <NavItem icon={<Map />} label="攻略" isActive={current.view === 'strategy'} onClick={() => handleTabClick('strategy')} />
          <NavItem icon={<User />} label="我的" isActive={current.view === 'profile'} onClick={() => handleTabClick('profile')} />
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-[#A60000]' : 'text-gray-500'}`}
    >
      <div className={`${isActive ? 'scale-110 transition-transform' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
