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
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300">
      <div
        className="flex items-center justify-between gap-4 py-2.5 px-6 rounded-full transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 20px 40px -15px rgba(29, 43, 150, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
        }}
      >
        <div className="flex items-center gap-6 flex-shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex gap-2 group cursor-pointer items-center text-left"
            title="BOATS 360° MUSICAL - Trang chủ"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyhtPOL0EdPBcikjDWBr2bQaf2zeigJc_SPT1ZnMTjTO4xbYp-LRMYSdGa_dQmF_ueboounvm335XixXE5dqxEvi5KLG3P77gdwZ9mWXZEz8RQ-9NIRFsAD7Qi2ebRD2jwkZl_gv_7EiyLXlOMR4_OJxvqnuaW5v63oz4sZkHTyC65Y8mcK16NeA05r6hk8HCkg2Nyv1tXISyLh6Eh6HmxH9-5Sc70yeamXtvEqPtHJypLCvObvwcoYfp79gtjpsTFYg"
              alt="BOATS 360° MUSICAL"
              className="h-7 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </button>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 text-sm sm:text-base px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer ${
              currentView === 'home'
                ? 'font-semibold text-[#1d2b96] bg-white shadow-sm border border-white/80'
                : 'font-medium text-[#454653] hover:text-[#1b1b22] hover:bg-white/60'
            }`}
          >
            {lang === 'vi' ? 'Trang chủ' : 'Home'}
          </button>
          <button
            onClick={() => onNavigate('schedule-and-tickets')}
            className={`whitespace-nowrap shrink-0 text-sm sm:text-base px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer ${
              currentView === 'schedule-and-tickets'
                ? 'font-semibold text-[#1d2b96] bg-white shadow-sm border border-white/80'
                : 'font-medium text-[#454653] hover:text-[#1b1b22] hover:bg-white/60'
            }`}
          >
            {lang === 'vi' ? 'Suất diễn' : 'Shows & Tickets'}
          </button>
          <button
            onClick={() => onNavigate('merchandise')}
            className={`whitespace-nowrap shrink-0 text-sm sm:text-base px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer ${
              currentView === 'merchandise'
                ? 'font-semibold text-[#1d2b96] bg-white shadow-sm border border-white/80'
                : 'font-medium text-[#454653] hover:text-[#1b1b22] hover:bg-white/60'
            }`}
          >
            Merchandise
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <div className="inline-flex items-center p-0.5 rounded-full bg-white/70 border border-white/80 shadow-sm">
            <button
              onClick={() => onToggleLang('vi')}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
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
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-[#1d2b96] text-white shadow-xs'
                  : 'text-[#454653] hover:text-[#1b1b22]'
              }`}
              type="button"
            >
              EN
            </button>
          </div>

          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/70 border border-white/80 text-[#454653] hover:bg-white hover:text-[#000f7b] transition-all shadow-sm cursor-pointer"
            title="Xem giỏ hàng"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7d5700] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          <img
            alt="Profile avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/90 shadow-sm"
            src="https://lh3.googleusercontent.com/aida/AEtjO1U10aH7flNnuzaJ_HZzI8Mk-hXEWpDdpFmfSnCrY412VxiopyInoQDMdEXpE6Xx7Si9ZqNAvFpD0ihbQWtypkBfaL6r8Uq0CXRVrZNMy6lBtxtN12Iso078l7gHArmmKGQiGFuWNgBl3JMebYhim9DQS5-SWX5sZoEdj3JsE-xOcVOhAXGZeVowW2CotsLCkEs5-p-9yav_WuwWV_aNO0X5uC9CmKC8D9AcTpRhiFKO0uj0qRAeRSt_NPL8Gi1mjIuhKErLYzNTdQ"
          />
        </div>
      </div>
    </header>
  );
};
