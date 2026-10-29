import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  lang: 'vi' | 'en';
  onToggleLang: (lang: 'vi' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-3 sm:top-4 z-50 mx-auto max-w-7xl px-3 sm:px-6 transition-all duration-300">
        <div
          className="flex items-center justify-between gap-2 sm:gap-4 py-2 sm:py-2.5 px-3.5 sm:px-6 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 20px 40px -15px rgba(29, 43, 150, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
          }}
        >
          {/* Logo Brand */}
          <div className="flex items-center gap-2 sm:gap-6 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer text-left select-none"
              title="BOATS 360° MUSICAL - Trang chủ"
            >
              <span
                className="text-lg sm:text-2xl font-black tracking-tight text-[#1d2b96] uppercase group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                BOATS
              </span>
              <span className="hidden sm:inline-block text-[#c6c5d5] font-light text-base sm:text-lg">|</span>
              <span
                className="hidden sm:inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#454653] uppercase group-hover:text-[#1d2b96] transition-colors"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                360° MUSICAL
              </span>
              {/* Mobile badge */}
              <span className="sm:hidden px-1.5 py-0.5 rounded-md bg-blue-50 text-[#1d2b96] text-[9px] font-black tracking-wider uppercase border border-blue-200/80">
                360°
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap shrink-0 text-sm px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'font-bold text-[#1d2b96] bg-white shadow-xs border border-white/90'
                  : 'font-medium text-[#454653] hover:text-[#1b1b22] hover:bg-white/60'
              }`}
            >
              {lang === 'vi' ? 'Trang chủ' : 'Home'}
            </button>
            <button
              onClick={() => handleNavClick('schedule-and-tickets')}
              className={`whitespace-nowrap shrink-0 text-sm px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentView === 'schedule-and-tickets'
                  ? 'font-bold text-[#1d2b96] bg-white shadow-xs border border-white/90'
                  : 'font-medium text-[#454653] hover:text-[#1b1b22] hover:bg-white/60'
              }`}
            >
              {lang === 'vi' ? 'Suất diễn' : 'Shows & Tickets'}
            </button>
            <button
              onClick={() => handleNavClick('merchandise')}
              className={`whitespace-nowrap shrink-0 text-sm px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentView === 'merchandise'
                  ? 'font-bold text-[#1d2b96] bg-white shadow-xs border border-white/90'
                  : 'font-medium text-[#454653] hover:text-[#1b1b22] hover:bg-white/60'
              }`}
            >
              Merchandise
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-white/80 border border-white shadow-xs">
              <button
                onClick={() => onToggleLang('vi')}
                className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-[#1d2b96] text-white shadow-xs'
                    : 'text-[#454653] hover:text-[#1b1b22]'
                }`}
                type="button"
              >
                VI
              </button>
              <button
                onClick={() => onToggleLang('en')}
                className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#1d2b96] text-white shadow-xs'
                    : 'text-[#454653] hover:text-[#1b1b22]'
                }`}
                type="button"
              >
                EN
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 border border-white text-[#454653] hover:bg-white hover:text-[#000f7b] transition-all shadow-xs cursor-pointer active:scale-95"
              title="Xem giỏ hàng"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[19px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7d5700] text-white text-[9px] sm:text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Avatar / User Icon (Blank / Neutral) */}
            <div
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-[#c6c5d5]/60 text-[#767684] shadow-xs"
              title="Tài khoản cá nhân"
              aria-label="Tài khoản cá nhân"
            >
              <span className="material-symbols-outlined text-[19px]">person</span>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-white text-[#1d2b96] hover:bg-white active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Menu"
              type="button"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl glass-panel shadow-xl space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`flex items-center gap-3 w-full p-2.5 rounded-2xl text-left font-bold text-sm transition-all cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-[#1d2b96] text-white shadow-xs'
                    : 'text-[#1b1b22] hover:bg-white/80 bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">home</span>
                <span>{lang === 'vi' ? 'Trang chủ' : 'Home'}</span>
              </button>

              <button
                onClick={() => handleNavClick('schedule-and-tickets')}
                className={`flex items-center gap-3 w-full p-2.5 rounded-2xl text-left font-bold text-sm transition-all cursor-pointer ${
                  currentView === 'schedule-and-tickets'
                    ? 'bg-[#1d2b96] text-white shadow-xs'
                    : 'text-[#1b1b22] hover:bg-white/80 bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">confirmation_number</span>
                <span>{lang === 'vi' ? 'Lịch diễn & Đặt vé' : 'Shows & Tickets'}</span>
              </button>

              <button
                onClick={() => handleNavClick('merchandise')}
                className={`flex items-center gap-3 w-full p-2.5 rounded-2xl text-left font-bold text-sm transition-all cursor-pointer ${
                  currentView === 'merchandise'
                    ? 'bg-[#1d2b96] text-white shadow-xs'
                    : 'text-[#1b1b22] hover:bg-white/80 bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">storefront</span>
                <span>Merchandise</span>
              </button>
            </div>

            {/* Quick venue & hotline info */}
            <div className="pt-2 border-t border-[#c6c5d5]/30 text-xs text-[#454653] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#1d2b96]">location_on</span>
                <span>Rạp Phú Thọ • Số 3 Lữ Gia, Q.11, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#7d5700]">call</span>
                <span className="font-semibold text-[#1b1b22]">Hotline đặt vé: 1900 6868</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. ERGONOMIC MOBILE FLOATING BOTTOM NAVIGATION BAR (md:hidden) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-sm mx-auto">
        <nav
          className="flex items-center justify-around py-2 px-2 rounded-2xl shadow-[0_12px_32px_rgba(29,43,150,0.16)] border border-white/90 transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          }}
        >
          {/* Tab 1: Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
              currentView === 'home'
                ? 'text-[#1d2b96] font-extrabold'
                : 'text-[#767684] hover:text-[#1b1b22]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl transition-transform ${
                currentView === 'home' ? 'scale-110' : ''
              }`}
            >
              home
            </span>
            <span className="text-[10px] tracking-tight">Trang chủ</span>
          </button>

          {/* Tab 2: Shows & Booking */}
          <button
            onClick={() => handleNavClick('schedule-and-tickets')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
              currentView === 'schedule-and-tickets'
                ? 'text-[#1d2b96] font-extrabold'
                : 'text-[#767684] hover:text-[#1b1b22]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl transition-transform ${
                currentView === 'schedule-and-tickets' ? 'scale-110' : ''
              }`}
            >
              confirmation_number
            </span>
            <span className="text-[10px] tracking-tight">Suất diễn</span>
          </button>

          {/* Tab 3: Merchandise */}
          <button
            onClick={() => handleNavClick('merchandise')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all cursor-pointer ${
              currentView === 'merchandise'
                ? 'text-[#1d2b96] font-extrabold'
                : 'text-[#767684] hover:text-[#1b1b22]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl transition-transform ${
                currentView === 'merchandise' ? 'scale-110' : ''
              }`}
            >
              storefront
            </span>
            <span className="text-[10px] tracking-tight">Merch</span>
          </button>

          {/* Tab 4: Cart */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[#767684] hover:text-[#1d2b96] transition-all cursor-pointer"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#7d5700] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight font-medium">Giỏ vé</span>
          </button>
        </nav>
      </div>
    </>
  );
};
