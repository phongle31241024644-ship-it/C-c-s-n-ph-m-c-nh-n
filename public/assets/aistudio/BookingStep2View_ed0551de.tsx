import React, { useState } from 'react';
import { CustomerInfo, Seat, ShowDate, ShowTime } from '../types';
import { SHOW_DATES, SHOW_TIMES } from '../data/mockData';

interface BookingStep2ViewProps {
  selectedDate: ShowDate | null;
  selectedTime: ShowTime | null;
  onBackToStep1: () => void;
  seats: Seat[];
  onToggleSeat: (seatId: string) => void;
  onAutoPickSeats: () => void;
  customerInfo: CustomerInfo;
  onChangeCustomerInfo: (info: Partial<CustomerInfo>) => void;
  couponCode: string;
  onApplyCoupon: (code: string) => void;
  discountAmount: number;
  onProceedToStep3: () => void;
}

export const BookingStep2View: React.FC<BookingStep2ViewProps> = ({
  selectedDate,
  selectedTime,
  onBackToStep1,
  seats,
  onToggleSeat,
  onAutoPickSeats,
  customerInfo,
  onChangeCustomerInfo,
  couponCode,
  onApplyCoupon,
  discountAmount,
  onProceedToStep3,
}) => {
  const displayDate = selectedDate || SHOW_DATES[1];
  const displayTime = selectedTime || SHOW_TIMES[0];

  const [activeZone, setActiveZone] = useState<'all' | 'VIP' | 'Premium' | 'Standard'>('VIP');
  const [couponInput, setCouponInput] = useState(couponCode);

  const selectedSeats = seats.filter((s) => s.status === 'selected');
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const vipSeats = seats.filter((s) => s.tier === 'VIP');
  const premiumSeats = seats.filter((s) => s.tier === 'Premium');
  const standardSeats = seats.filter((s) => s.tier === 'Standard');

  const vipAvailable = vipSeats.filter((s) => s.status === 'available').length;
  const premiumAvailable = premiumSeats.filter((s) => s.status === 'available').length;
  const standardAvailable = standardSeats.filter((s) => s.status === 'available').length;

  return (
    <div className="w-full pt-6 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="text-center max-w-4xl mx-auto pt-2 pb-1">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[#1d2b96] text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <span className="material-symbols-outlined text-sm">theater_comedy</span>
            Rạp Xiếc &amp; biểu diễn đa năng Phú Thọ
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-[#000f7b] font-extrabold tracking-tight uppercase"
            style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif', letterSpacing: '-0.015em' }}
          >
            ĐẶT VÉ &amp; SƠ ĐỒ KHÁN PHÒNG 360°
          </h1>
          <p className="mt-2.5 text-[#454653] text-sm sm:text-base">
            Trải nghiệm âm thanh vòm chuẩn điện ảnh và công nghệ trình chiếu holographic biển sóng bao trọn từng góc nhìn.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8 px-2">
          <div
            className="py-3.5 px-4 sm:px-6 rounded-2xl flex items-center justify-between gap-2 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.68)',
              backdropFilter: 'blur(28px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 20px 40px -15px rgba(29, 43, 150, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
            }}
          >
            {/* Step 1: Completed & Clickable */}
            <button
              onClick={onBackToStep1}
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity cursor-pointer"
              title="Nhấp để đổi suất & ngày diễn"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Bước 1 • Hoàn thành</p>
                <h4 className="text-xs font-bold text-[#1b1b22]">
                  {displayDate.dayMonth} • {displayTime.timeRange}
                </h4>
              </div>
            </button>

            <div className="flex-1 h-0.5 bg-emerald-300 mx-2 hidden sm:block" />

            {/* Step 2: Active */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1d2b96] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#1d2b96]/20 shadow-xs">
                2
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1d2b96]">Bước 2 • Đang chọn</p>
                <h4 className="text-xs font-bold text-[#1b1b22]">
                  Vị trí ghế ({selectedSeats.length > 0 ? selectedSeats.map((s) => s.id).join(', ') : 'Chưa chọn ghế'})
                </h4>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-[#c6c5d5]/40 mx-2 hidden sm:block" />

            {/* Step 3: Upcoming */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#e9e7f0] border border-[#c6c5d5]/60 text-[#454653] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#454653]">Bước 3 • Tiếp theo</p>
                <h4 className="text-xs font-medium text-[#454653]">Thông tin &amp; Thanh toán</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Show Summary Bar with Change Date Button */}
        <div
          className="p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/90 shadow-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#dfe0ff] flex items-center justify-center text-[#000f7b] shrink-0">
              <span className="material-symbols-outlined text-xl">event_available</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1d2b96] block">
                Suất diễn đã chọn (Bước 1)
              </span>
              <p className="text-sm font-bold text-[#1b1b22]">
                {displayDate.dateStr} • {displayTime.timeRange} ({displayTime.tag})
              </p>
              <p className="text-xs text-[#454653]">Rạp Xiếc &amp; Đa Năng Phú Thọ • TP.HCM</p>
            </div>
          </div>

          <button
            onClick={onBackToStep1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#c6c5d5]/70 hover:border-[#1d2b96] text-[#1d2b96] text-xs font-bold transition-all shadow-xs cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">edit_calendar</span>
            <span>Đổi suất diễn khác</span>
          </button>
        </div>

        {/* MAIN 2-COLUMN: SEAT MAP & STICKY CART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Sơ đồ khán phòng (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div
              className="p-5 sm:p-7 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 25px 50px -18px rgba(29, 43, 150, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
              }}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c6c5d5]/40">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
                      Bước 2: Chọn vị trí ghế ngồi
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                      Live 360° Interactive
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-extrabold text-[#1b1b22] tracking-tight mt-0.5"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    Sơ Đồ Khán Phòng Tròn 360°
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onAutoPickSeats}
                    id="auto-pick-btn"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1d2b96]/10 border border-[#1d2b96]/30 text-[#1d2b96] hover:bg-[#1d2b96] hover:text-white transition-all text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>Tự động chọn ghế tốt nhất</span>
                  </button>
                </div>
              </div>

              {/* 1. Zone Quick Selector */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#454653] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#000f7b]">tune</span>
                    Chọn nhanh phân khu khán đài
                  </span>
                  <span className="text-[11px] text-[#454653]">
                    Tổng chỗ trống: <strong className="text-[#000f7b] font-bold">104 ghế</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5" id="zone-selector-tabs">
                  {/* VIP Tab */}
                  <button
                    onClick={() => setActiveZone('VIP')}
                    className={`flex flex-col p-2.5 rounded-2xl text-left transition-all shadow-xs relative cursor-pointer ${
                      activeZone === 'VIP'
                        ? 'border-2 border-[#000f7b] bg-[#1d2b96]/10'
                        : 'border border-[#c6c5d5]/60 bg-white/70 hover:bg-white hover:border-[#1d2b96]/60'
                    }`}
                  >
                    {activeZone === 'VIP' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#000f7b] animate-ping" />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#000f7b] flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#c0266f]" />
                        VIP (V1 - V2)
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1b1b22]">1.299.000đ</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Còn {vipAvailable} ghế
                      </span>
                    </div>
                    <span className="text-[9px] text-[#454653] mt-1">Gần sân khấu nhất • Góc nhìn trọn vẹn</span>
                  </button>

                  {/* Premium Tab */}
                  <button
                    onClick={() => setActiveZone('Premium')}
                    className={`flex flex-col p-2.5 rounded-2xl text-left transition-all shadow-xs relative cursor-pointer ${
                      activeZone === 'Premium'
                        ? 'border-2 border-[#8b5cf6] bg-[#8b5cf6]/10'
                        : 'border border-[#c6c5d5]/60 bg-white/70 hover:bg-white hover:border-[#1d2b96]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1b1b22] flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                        Premium (A1 - A3)
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1b1b22]">799.000đ</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Còn {premiumAvailable} ghế
                      </span>
                    </div>
                    <span className="text-[9px] text-[#454653] mt-1">Khán đài tầm trung • Âm thanh vòm</span>
                  </button>

                  {/* Standard Tab */}
                  <button
                    onClick={() => setActiveZone('Standard')}
                    className={`flex flex-col p-2.5 rounded-2xl text-left transition-all shadow-xs relative cursor-pointer ${
                      activeZone === 'Standard'
                        ? 'border-2 border-[#14b8a6] bg-[#14b8a6]/10'
                        : 'border border-[#c6c5d5]/60 bg-white/70 hover:bg-white hover:border-[#1d2b96]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1b1b22] flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]" />
                        Standard (G1 - G3)
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1b1b22]">499.000đ</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Còn {standardAvailable} ghế
                      </span>
                    </div>
                    <span className="text-[9px] text-[#454653] mt-1">Tầng cao toàn cảnh • Hiệu ứng hologram</span>
                  </button>

                  {/* 360 All Tab */}
                  <button
                    onClick={() => setActiveZone('all')}
                    className={`flex flex-col p-2.5 rounded-2xl text-left transition-all shadow-xs relative cursor-pointer ${
                      activeZone === 'all'
                        ? 'border-2 border-[#000f7b] bg-[#1d2b96]/10'
                        : 'border border-[#c6c5d5]/60 bg-white/70 hover:bg-white hover:border-[#1d2b96]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1b1b22] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-[#000f7b]">crop_free</span>
                        Toàn cảnh (360°)
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1b1b22]">Tất cả khu</span>
                      <span className="text-[10px] font-semibold text-[#000f7b] bg-[#1d2b96]/10 px-1.5 py-0.5 rounded border border-[#1d2b96]/20">
                        104/380
                      </span>
                    </div>
                    <span className="text-[9px] text-[#454653] mt-1">Xem tổng thể toàn bộ khán đài tròn</span>
                  </button>
                </div>
              </div>

              {/* 2. Legend */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 py-2 px-4 rounded-xl bg-white/70 border border-white/90 text-xs">
                <div className="flex flex-wrap items-center gap-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#c0266f]" />
                    <span className="text-[11px] font-medium text-[#1b1b22]">VIP (1.299k)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
                    <span className="text-[11px] font-medium text-[#1b1b22]">Premium (799k)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#14b8a6]" />
                    <span className="text-[11px] font-medium text-[#1b1b22]">Standard (499k)</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-2 border-l border-[#c6c5d5]/40">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-300" />
                    <span className="text-[11px] font-bold text-emerald-700">
                      Đang chọn ({selectedSeats.length} ghế)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-300" />
                    <span className="text-[11px] text-[#767684]">Đã bán / Khóa</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#1d2b96] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                  Nhấp trực tiếp vào ghế để chọn/hủy
                </div>
              </div>

              {/* 3. Interactive Seat Matrix & Minimap */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* Seat Matrix Area (8 cols) */}
                <div
                  className="lg:col-span-8 relative flex flex-col p-4 sm:p-5 rounded-2xl border border-white/90 shadow-inner overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(rgba(255, 255, 255, 0.85) 0%, rgba(240, 246, 255, 0.5) 50%, rgba(235, 240, 255, 0.65) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: 'inset 0 2px 10px rgba(255, 255, 255, 0.8), 0 10px 30px -10px rgba(29, 43, 150, 0.06)',
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#1d2b96_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                  {/* Stage Dome simulation */}
                  <div className="relative z-10 w-full mb-4 flex flex-col items-center justify-center">
                    <div className="w-3/4 max-w-xs py-2 px-4 rounded-b-3xl bg-gradient-to-r from-[#000f7b] to-[#1d2b96] text-white text-center shadow-md border-b border-[#1d2b96]/30">
                      <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200 block leading-none">
                        SÂN KHẤU TRUNG TÂM VÒM 360°
                      </span>
                      <span className="text-xs font-black tracking-wider uppercase">
                        STAGE - BIỂN SÓNG HOLOGRAPHIC
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-between text-[10px] text-[#454653] font-medium px-4 mt-1.5">
                      <span>← Cánh Trái (Khán đài A)</span>
                      <span className="text-[#000f7b] font-bold">Khoảng cách tối ưu: 6.5m - 18m</span>
                      <span>Cánh Phải (Khán đài B) →</span>
                    </div>
                  </div>

                  {/* VIP Row V01 - V10 */}
                  <div
                    className={`relative z-10 space-y-3.5 mb-4 p-3 rounded-2xl bg-white/70 border border-[#c0266f]/20 shadow-xs transition-opacity ${
                      activeZone !== 'all' && activeZone !== 'VIP' ? 'opacity-60' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-bold text-[#c0266f] flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#c0266f]" />
                        KHU VIP V1 (Gần sân khấu nhất)
                      </span>
                      <span className="text-[10px] font-semibold text-[#454653]">
                        Hàng ghế V (VIP) • 1.299.000đ/vé
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                      {vipSeats.map((seat) => {
                        const isSold = seat.status === 'sold';
                        const isSelected = seat.status === 'selected';

                        if (isSold) {
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled
                              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-slate-300 text-[#767684] text-[10px] sm:text-[11px] font-bold flex items-center justify-center cursor-not-allowed opacity-60 shadow-xs"
                              title={`Ghế ${seat.id} (Đã bán)`}
                            >
                              {seat.id}
                            </button>
                          );
                        }

                        if (isSelected) {
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => onToggleSeat(seat.id)}
                              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-emerald-500 ring-4 ring-emerald-300/80 text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center cursor-pointer shadow-md transform scale-110 transition-all"
                              title={`Ghế ${seat.id} (Đang chọn)`}
                            >
                              <span className="relative flex flex-col items-center leading-none">
                                <span>{seat.id}</span>
                                <span className="material-symbols-outlined text-[10px] -mt-0.5">check</span>
                              </span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => onToggleSeat(seat.id)}
                            className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#c0266f] hover:brightness-110 active:scale-95 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105"
                            title={`Ghế ${seat.id} - ${seat.priceFormatted}`}
                          >
                            {seat.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Premium Row A01 - A10 */}
                  <div
                    className={`relative z-10 space-y-3.5 mb-4 p-3 rounded-2xl bg-white/70 border border-[#8b5cf6]/20 shadow-xs transition-opacity ${
                      activeZone !== 'all' && activeZone !== 'Premium' ? 'opacity-60' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-bold text-[#8b5cf6] flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                        KHU PREMIUM A (Tầm nhìn bao quát)
                      </span>
                      <span className="text-[10px] font-semibold text-[#454653]">
                        Hàng ghế A • 799.000đ/vé
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                      {premiumSeats.map((seat) => {
                        const isSold = seat.status === 'sold';
                        const isSelected = seat.status === 'selected';

                        if (isSold) {
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled
                              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-slate-300 text-[#767684] text-[10px] sm:text-[11px] font-bold flex items-center justify-center cursor-not-allowed opacity-60 shadow-xs"
                              title={`Ghế ${seat.id} (Đã bán)`}
                            >
                              {seat.id}
                            </button>
                          );
                        }

                        if (isSelected) {
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => onToggleSeat(seat.id)}
                              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-emerald-500 ring-4 ring-emerald-300/80 text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center cursor-pointer shadow-md transform scale-110 transition-all"
                              title={`Ghế ${seat.id} (Đang chọn)`}
                            >
                              <span className="relative flex flex-col items-center leading-none">
                                <span>{seat.id}</span>
                                <span className="material-symbols-outlined text-[10px] -mt-0.5">check</span>
                              </span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => onToggleSeat(seat.id)}
                            className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#8b5cf6] hover:brightness-110 active:scale-95 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105"
                            title={`Ghế ${seat.id} - ${seat.priceFormatted}`}
                          >
                            {seat.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Standard Row G01 - G10 */}
                  <div
                    className={`relative z-10 space-y-3.5 p-3 rounded-2xl bg-white/70 border border-[#14b8a6]/20 shadow-xs transition-opacity ${
                      activeZone !== 'all' && activeZone !== 'Standard' ? 'opacity-60' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-bold text-[#14b8a6] flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-[#14b8a6]" />
                        KHU STANDARD G (Toàn cảnh vòng ngoài)
                      </span>
                      <span className="text-[10px] font-semibold text-[#454653]">
                        Hàng ghế G • 499.000đ/vé
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                      {standardSeats.map((seat) => {
                        const isSold = seat.status === 'sold';
                        const isSelected = seat.status === 'selected';

                        if (isSold) {
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled
                              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-slate-300 text-[#767684] text-[10px] sm:text-[11px] font-bold flex items-center justify-center cursor-not-allowed opacity-60 shadow-xs"
                              title={`Ghế ${seat.id} (Đã bán)`}
                            >
                              {seat.id}
                            </button>
                          );
                        }

                        if (isSelected) {
                          return (
                            <button
                              key={seat.id}
                              type="button"
                              onClick={() => onToggleSeat(seat.id)}
                              className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-emerald-500 ring-4 ring-emerald-300/80 text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center cursor-pointer shadow-md transform scale-110 transition-all"
                              title={`Ghế ${seat.id} (Đang chọn)`}
                            >
                              <span className="relative flex flex-col items-center leading-none">
                                <span>{seat.id}</span>
                                <span className="material-symbols-outlined text-[10px] -mt-0.5">check</span>
                              </span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => onToggleSeat(seat.id)}
                            className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-[#14b8a6] hover:brightness-110 active:scale-95 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105"
                            title={`Ghế ${seat.id} - ${seat.priceFormatted}`}
                          >
                            {seat.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Minimap Overview (4 cols) */}
                <div
                  className="lg:col-span-4 flex flex-col justify-between p-4 rounded-2xl bg-white/80 border border-white/90 shadow-sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.72)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 15px 35px -10px rgba(29, 43, 150, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#c6c5d5]/40">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1b1b22] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-[#000f7b]">map</span>
                        Bản Đồ Vị Trí (Minimap)
                      </span>
                      <span className="text-[10px] font-bold text-[#000f7b] bg-[#1d2b96]/10 px-2 py-0.5 rounded-full">
                        360° Sân khấu
                      </span>
                    </div>
                    <p className="text-[11px] text-[#454653] mb-2">
                      Đang phóng to góc nhìn:{' '}
                      <strong className="text-[#c0266f]">
                        {activeZone === 'VIP'
                          ? 'Khu Vực VIP Trung Tâm'
                          : activeZone === 'Premium'
                          ? 'Khu Vực Premium Trung Gian'
                          : activeZone === 'Standard'
                          ? 'Khu Vực Standard Toàn Cảnh'
                          : 'Toàn Thể Khán Đài 360°'}
                      </strong>
                    </p>

                    <div className="relative w-full rounded-xl overflow-hidden border border-[#c6c5d5]/50 shadow-inner group">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP30L_GtJBvFDFLi5B3xx4sjGqVK4TpAjqZlJbHpJ8Dk-pjxSqngfz6r84xQIeZyun93qG0f5peQ2QgRxkapjGlHTJaMwSbZFybm0wzpDeW4HRCl824QhYUhw2PZJn7DnFZ4rCzwwcfUymJMr5IABNVOEQ9apK7_DF4Cm0ggiZjikg-nG-KhQ1h-3dsX1NkkVCtr3lWpJeVoTLSE3CyZaexq41H9pcKBJKPgpfTC1s-bZxSMrwVVb8"
                        alt="Sơ Đồ Toàn Cảnh Rạp Xiếc Khán Phòng 360°"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Active viewfinder indicator */}
                      <div className="absolute inset-x-8 bottom-3 top-1/2 border-2 border-[#c0266f] rounded-lg bg-[#c0266f]/15 pointer-events-none flex items-center justify-center shadow-sm">
                        <span className="px-1.5 py-0.5 rounded bg-[#c0266f] text-white text-[8px] font-black uppercase tracking-wider shadow-xs">
                          Vị trí đang chọn
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Seats in session info */}
                  <div className="mt-3 pt-3 border-t border-[#c6c5d5]/40 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b1b22] block">
                      Ghế đang chọn trong phiên:
                    </span>
                    <div className="space-y-1.5">
                      {selectedSeats.length === 0 ? (
                        <p className="text-xs text-[#767684] italic text-center py-2">
                          Chưa có ghế nào được chọn. Hãy nhấp vào ghế trên sơ đồ.
                        </p>
                      ) : (
                        selectedSeats.map((seat) => (
                          <div
                            key={seat.id}
                            className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white font-black text-[11px] flex items-center justify-center shadow-xs">
                                {seat.id}
                              </span>
                              <div>
                                <p className="text-xs font-bold text-[#1b1b22]">
                                  Ghế {seat.tier} {seat.number} • Hàng {seat.row}
                                </p>
                                <p className="text-[10px] text-emerald-700 font-semibold">
                                  {seat.priceFormatted} • {seat.tier === 'VIP' ? 'Trung tâm' : seat.tier}
                                </p>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-emerald-600 text-base">
                              check_circle
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    <p className="text-[10px] text-[#454653] text-center pt-1">
                      Ghế đã được tự động đồng bộ vào Giỏ vé thanh toán.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Giỏ Vé & Thông Tin Đặt Chỗ (4 cols Sticky) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="p-5 sm:p-6 rounded-3xl sticky top-24"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(32px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 25px 60px -15px rgba(29, 43, 150, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.75) inset',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#c6c5d5]/40">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1d2b96] text-2xl">
                    shopping_cart_checkout
                  </span>
                  <div>
                    <h3
                      className="text-lg font-bold text-[#1b1b22] tracking-tight"
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      Giỏ Vé &amp; Thông Tin Đặt Chỗ
                    </h3>
                    <p className="text-[11px] text-[#454653]">
                      Bước 2: Chọn ghế và xác nhận thông tin người nhận vé
                    </p>
                  </div>
                </div>
              </div>

              {/* Show Summary Info */}
              <div className="mt-3.5 p-3 rounded-2xl bg-white/70 border border-white/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#454653]">Vở diễn:</span>
                  <span className="font-bold text-[#000f7b]">BOATS The Musical</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#454653]">Suất diễn:</span>
                  <span className="font-semibold text-[#1b1b22]">
                    {displayDate.dateStr} ({displayTime.timeRange})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#454653]">Địa điểm:</span>
                  <span className="font-semibold text-[#1b1b22] text-right">
                    Rạp Xiếc &amp; Đa Năng Phú Thọ
                  </span>
                </div>
              </div>

              {/* Selected Seats List */}
              <div className="mt-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#454653]">
                    Ghế đã chọn ({selectedSeats.length} vé):
                  </span>
                  <span className="text-[11px] text-[#1d2b96] font-medium">
                    {selectedSeats.length > 0 ? `Khu ${selectedSeats[0].tier}` : ''}
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedSeats.length === 0 ? (
                    <div className="p-4 rounded-xl border border-dashed border-[#c6c5d5] text-center text-xs text-[#767684]">
                      Vui lòng chọn ít nhất 1 ghế trên sơ đồ
                    </div>
                  ) : (
                    selectedSeats.map((seat) => (
                      <div
                        key={seat.id}
                        className="p-2.5 rounded-xl bg-white/90 border border-amber-200/80 flex items-center justify-between shadow-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs shadow-xs ${
                              seat.tier === 'VIP'
                                ? 'bg-[#c0266f]'
                                : seat.tier === 'Premium'
                                ? 'bg-[#8b5cf6]'
                                : 'bg-[#14b8a6]'
                            }`}
                          >
                            {seat.id}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#1b1b22] leading-tight">
                              Ghế {seat.tier} {seat.number} • Hàng {seat.row}
                            </p>
                            <p className="text-[11px] text-[#1d2b96] font-semibold">
                              {seat.priceFormatted}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onToggleSeat(seat.id)}
                          type="button"
                          className="text-[#767684] hover:text-[#ba1a1a] transition-colors p-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Xóa ghế"
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="mt-4 pt-3.5 border-t border-[#c6c5d5]/30">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b1b22] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#1d2b96]">person</span>
                    Thông tin người nhận vé
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Vé điện tử QR
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-[#454653]" htmlFor="cust-name">
                      Họ và tên khách hàng *
                    </label>
                    <input
                      className="w-full bg-white/90 border border-[#c6c5d5]/70 rounded-xl px-3 py-1.5 text-xs text-[#1b1b22] focus:outline-none focus:border-[#000f7b] font-medium"
                      id="cust-name"
                      placeholder="Ví dụ: Nguyễn Hoàng Nam"
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => onChangeCustomerInfo({ name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#454653]" htmlFor="cust-email">
                        Email nhận vé *
                      </label>
                      <input
                        className="w-full bg-white/90 border border-[#c6c5d5]/70 rounded-xl px-3 py-1.5 text-xs text-[#1b1b22] focus:outline-none focus:border-[#000f7b] font-medium"
                        id="cust-email"
                        placeholder="nam.nguyen@gmail.com"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => onChangeCustomerInfo({ email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#454653]" htmlFor="cust-phone">
                        Số điện thoại *
                      </label>
                      <input
                        className="w-full bg-white/90 border border-[#c6c5d5]/70 rounded-xl px-3 py-1.5 text-xs text-[#1b1b22] focus:outline-none focus:border-[#000f7b] font-medium"
                        id="cust-phone"
                        placeholder="0912 345 678"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => onChangeCustomerInfo({ phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Code / Voucher */}
              <div className="mt-4 pt-3.5 border-t border-[#c6c5d5]/30">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-[#454653] mb-1.5"
                  htmlFor="coupon-checkout"
                >
                  Mã ưu đãi / Voucher
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      className="w-full bg-white/90 border border-[#c6c5d5]/70 rounded-xl px-3 py-2 text-xs font-bold text-[#1b1b22] focus:outline-none focus:border-[#000f7b] uppercase tracking-wider"
                      id="coupon-checkout"
                      placeholder="MÃ ƯU ĐÃI"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    />
                    {discountAmount > 0 && (
                      <span className="material-symbols-outlined absolute right-2.5 top-2 text-sm text-emerald-600">
                        check_circle
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onApplyCoupon(couponInput)}
                    className="px-3.5 py-2 rounded-xl bg-[#1d2b96] text-xs font-bold text-white hover:brightness-110 transition-all cursor-pointer"
                    type="button"
                  >
                    Áp dụng
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px]">
                  {discountAmount > 0 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      Giảm 10% (-{discountAmount.toLocaleString('vi-VN')}đ)
                    </span>
                  ) : (
                    <span className="text-[#767684]">Chưa áp dụng ưu đãi</span>
                  )}
                  <div className="flex items-center gap-1.5 text-[#454653]">
                    <span className="text-[10px]">Gợi ý:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCouponInput('EARLYBIRD10');
                        onApplyCoupon('EARLYBIRD10');
                      }}
                      className="px-1.5 py-0.5 rounded bg-[#efecf6] text-[10px] font-bold text-[#1d2b96] hover:bg-white transition-colors cursor-pointer"
                    >
                      EARLYBIRD10
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCouponInput('BOATSVIP');
                        onApplyCoupon('BOATSVIP');
                      }}
                      className="px-1.5 py-0.5 rounded bg-[#efecf6] text-[10px] font-bold text-[#1d2b96] hover:bg-white transition-colors cursor-pointer"
                    >
                      BOATSVIP
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="mt-4 pt-3.5 border-t border-[#c6c5d5]/40 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#454653]">
                  <span>Tạm tính ({selectedSeats.length} vé):</span>
                  <span className="font-medium text-[#1b1b22]">
                    {subtotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Mã ưu đãi đã áp dụng:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between pt-2 border-t border-dashed border-[#c6c5d5]/50">
                  <span className="font-bold text-sm text-[#1b1b22]">Tổng tạm tính:</span>
                  <span className="text-xl font-black text-[#000f7b]">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Next Step Button */}
              <button
                onClick={onProceedToStep3}
                disabled={selectedSeats.length === 0}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1d2b96] via-[#000f7b] to-[#000f7b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-[#1d2b96]/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                <span>Tiếp tục sang bước Thanh toán</span>
              </button>

              <div className="mt-3.5 flex items-center justify-center gap-4 text-[11px] text-[#454653]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-emerald-600">security</span>
                  Bảo mật SSL 256-bit
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-amber-700">timer</span>
                  Giữ vé trong 10:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
