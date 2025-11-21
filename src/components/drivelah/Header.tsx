import React from 'react';
import { Menu, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#009CA6] text-white h-16 flex items-center justify-between px-4 md:px-8 shadow-md">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-1 hover:bg-white/10 rounded-full">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">∞</span> Drive lah
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" className="hover:text-white/80 transition-colors">Learn more</a>
        <a href="#" className="hover:text-white/80 transition-colors">List your car</a>
        <a href="#" className="hover:text-white/80 transition-colors">Inbox</a>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border-2 border-white">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
        </div>
      </nav>

      <div className="md:hidden w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
        <User className="w-5 h-5" />
      </div>
    </header>
  );
};
