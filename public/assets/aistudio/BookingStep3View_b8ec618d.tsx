import React, { useState, useEffect } from 'react';
import { CustomerInfo, Seat, ShowDate, ShowTime } from '../types';

interface BookingStep3ViewProps {
  selectedDate: ShowDate | null;
  selectedTime: ShowTime | null;
  selectedSeats: Seat[];
  customerInfo: CustomerInfo;
  discountAmount: number;
  onBackToStep2: () => void;
  onCompleteBooking: () => void;
}

export const BookingStep3View: React.FC<BookingStep3ViewProps> = ({
  selectedDate,
  selectedTime,
  selectedSeats,
  customerInfo,
  discountAmount,
  onBackToStep2,
  onCompleteBooking,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'card' | 'wallet'>('vietqr');
  const [secondsLeft, setSecondsLeft] = useState(580); // 09:40
  const [copiedAccount, setCopiedAccount] = useState(false);

  const displayDateStr = selectedDate ? selectedDate.dateStr : 'Thứ Năm, 23/10/2027';
  const displayTimeRange = selectedTime ? selectedTime.timeRange : '19:30 - 21:30';

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('988601102027');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const total = Math.max(0, subtotal - discountAmount);

  // Fallback to V05 & V06 if none selected
  const activeSeats =
    selectedSeats.length > 0
      ? selectedSeats
      : [
          { id: 'V05', row: 'V', number: '05', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
          { id: 'V06', row: 'V', number: '06', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
        ];

  return (
    <div className="w-full pt-6 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="text-center max-w-4xl mx-auto pt-2 pb-1">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white shadow-sm mb-4">
            <svg className="w-5 h-5 text-[#1d2b96] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 3C5.46 3 3 5.46 3 8.5c0 2.22 1.31 4.14 3.2 5l-.7 2.1c-.2.6.25 1.2.88 1.15l2.22-.19c.45.62 1.05 1.12 1.76 1.45L9.5 20.5c-.17.51.21 1.05.75 1.05.13 0 .26-.03.38-.1l2.5-1.44c.43.08.87.12 1.32.12 4.14 0 7.5-3.36 7.5-7.5S18.59 5.13 14.5 5.13c-.34 0-.67.02-1 .07C12.44 3.82 10.57 3 8.5 3zm0 2c1.47 0 2.8.62 3.75 1.62-.57.94-.92 2.03-.98 3.2C10.5 9.3 9.55 9 8.5 9c-1.93 0-3.5 1.57-3.5 3.5 0 .2.02.4.05.59C4.42 12.06 4 10.84 4 9.5 4 6.46 6.01 4 8.5 4zm6 3.13c2.49 0 4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5c-.75 0-1.46-.18-2.08-.52l-1.92 1.11.56-1.68c-.68-.8-1.06-1.84-1.06-2.91 0-2.49 2.01-5 4.5-5zm-1.5 2.87a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm-1.5 3.5c-1.1 0-1.8.6-2 1.1-.08.2.07.4.28.4h3.44c.21 0 .36-.2.28-.4-.2-.5-.9-1.1-2-1.1zm-6-2.5a1 1 0 100 2 1 1 0 000-2zm-2 0a1 1 0 100 2 1 1 0 000-2zm1 3c.7 0 1.28.35 1.57.85.08.15-.02.32-.18.32H6.61c-.16 0-.26-.17-.18-.32.29-.5.87-.85 1.57-.85z" />
            </svg>
            <span className="font-bold text-xs tracking-wider text-[#1d2b96] uppercase select-none font-title-md">
              RẠP XIẾC &amp; BIỂU DIỄN ĐA NĂNG PHÚ THỌ
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-[#000f7b] font-extrabold tracking-tight uppercase"
            style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif', letterSpacing: '-0.015em' }}
          >
            ĐẶT VÉ &amp; SƠ ĐỒ KHÁN PHÒNG 360°
          </h1>
          <p className="mt-2.5 text-[#454653] font-body-lg text-sm sm:text-base">
            Trải nghiệm âm thanh vòm chuẩn điện ảnh và công nghệ trình chiếu holographic biển sóng bao trọn từng góc nhìn.
          </p>

          {/* Stepper (Step 3 Active) */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 py-3 px-6 mx-auto inline-flex items-center gap-6 mt-6">
            {/* Step 1: Completed */}
            <div className="flex items-center gap-2.5 text-left cursor-pointer" onClick={onBackToStep2}>
              <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                ✓
              </div>
              <div>
                <span className="block text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
                  BƯỚC 1 • HOÀN THÀNH
                </span>
                <span className="block text-xs font-semibold text-slate-800">
                  Chọn suất &amp; ngày diễn
                </span>
              </div>
            </div>

            <div className="w-16 h-0.5 bg-emerald-400 shrink-0 hidden sm:block" />

            {/* Step 2: Completed */}
            <div className="flex items-center gap-2.5 text-left cursor-pointer" onClick={onBackToStep2}>
              <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                ✓
              </div>
              <div>
                <span className="block text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
                  BƯỚC 2 • HOÀN THÀNH
                </span>
                <span className="block text-xs font-semibold text-slate-800">
                  Vị trí ghế ({activeSeats.map((s) => s.id).join(', ')})
                </span>
              </div>
            </div>

            <div className="w-16 h-0.5 bg-[#1d2b96] shrink-0 hidden sm:block" />

            {/* Step 3: Active */}
            <div className="flex items-center gap-2.5 text-left">
              <div className="bg-[#1d2b96] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-blue-100 shrink-0">
                3
              </div>
              <div>
                <span className="block text-[11px] font-bold text-[#1d2b96] uppercase tracking-wide">
                  BƯỚC 3 • ĐANG CHỌN
                </span>
                <span className="block text-xs font-bold text-slate-900">Thông tin &amp; Thanh toán</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: SEAT MAP & ARTISTIC TICKET PREVIEW (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Sơ Đồ Khán Phòng Tròn 360° locked status */}
            <div
              className="p-5 sm:p-7 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 25px 50px -18px rgba(29, 43, 150, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c6c5d5]/40">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
                      Bước 3: Vị trí ghế đã giữ chỗ
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
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {activeSeats.length} ghế {activeSeats[0]?.tier || 'VIP'} đang khóa giữ
                  </span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-white/70 border border-white/90 text-xs shadow-xs">
                <div className="flex flex-wrap items-center gap-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#c0266f]" />
                    <span className="text-[11px] font-medium text-[#1b1b22]">VIP (1.299k)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#8b5cf6]" />
                    <span className="text-[11px] font-medium text-[#1b1b22]">Premium (799k)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#14b8a6]" />
                    <span className="text-[11px] font-medium text-[#1b1b22]">Standard (499k)</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-2 border-l border-[#c6c5d5]/40">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1d2b96] ring-2 ring-[#909cff]" />
                    <span className="text-[11px] font-bold text-[#000f7b]">
                      Đang chọn ({activeSeats.map((s) => s.id).join(', ')})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-300" />
                    <span className="text-[11px] text-[#767684]">Đã bán / Khóa</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#1d2b96] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                  Sân khấu vòm ở phía trước
                </div>
              </div>

              {/* Theater View Graphic */}
              <div className="mt-4 relative rounded-2xl overflow-hidden border border-white/90 shadow-sm bg-gradient-to-b from-white/95 via-[#f2f6ff] to-[#e8eeff] p-4 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-2xl flex flex-col items-center">
                  <img
                    alt="Sơ Đồ Khán Phòng Tròn 360° Phú Thọ"
                    className="w-full h-auto object-contain max-h-[380px] drop-shadow-sm select-none"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAQNIKFInPp9Gm_nEyQ8cxiK9Ab4kimJhZgfuwyLTHltyBLtrBERpLqbD_2esiadDHyDMdtC2T3pHZtBnv6r_ZYNxsSzLYR9m_fabdg5usBrVtTNBEOP2WvnJWrZ0J8G89EDFc5sWK9Dfl8IZjR_HcFqaAFbGrARD9P73XTDgNn-dAMPT5SV_d87F2nsHOXINgsYZcnM0jgIIf5ma3aW-bTODeUjXLCmslviCzETOFXJFehqgXJ-hDx56VMXBk9s1U-g"
                  />
                  {/* Indicator Badge for Selected Seats */}
                  <div className="absolute bottom-16 sm:bottom-20 z-10 flex items-center gap-2 bg-[#1d2b96] text-white px-3.5 py-1.5 rounded-full shadow-lg border border-white/80 animate-bounce">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-extrabold tracking-wide uppercase">
                      Vị trí ghế đã khóa: {activeSeats.map((s) => s.id).join(', ')}
                    </span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">
                      Khu {activeSeats[0]?.tier || 'VIP'} A
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ELEGANT VIP TICKET PREVIEW CARDS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1d2b96] text-xl">
                    confirmation_number
                  </span>
                  <h3
                    className="text-base font-bold text-[#1b1b22] uppercase tracking-wide"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    Vé Điện Tử Đã Giữ Chỗ ({String(activeSeats.length).padStart(2, '0')} Vé)
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Đã gán số ghế &amp; mã vé
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSeats.map((seat, index) => (
                  <div
                    key={seat.id}
                    className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-white/90 flex flex-col justify-between"
                    style={{
                      background: 'rgba(255, 255, 255, 0.88)',
                      backdropFilter: 'blur(24px)',
                      boxShadow: '0 20px 40px -15px rgba(29, 43, 150, 0.08)',
                    }}
                  >
                    {/* Top Maritime Theme Banner */}
                    <div className="relative w-full h-32 overflow-hidden p-5 text-white flex flex-col justify-between rounded-t-3xl bg-gradient-to-r from-[#000f7b] via-[#1d2b96] to-[#002930] shadow-sm">
                      <div className="z-10 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold border border-white/30 shadow-xs">
                          Vé {index + 1} / {activeSeats.length} • 360° Musical
                        </span>
                        <span className="text-[11px] tracking-wider text-amber-200 bg-amber-500/20 backdrop-blur-md px-2 py-0.5 rounded-full font-bold border border-amber-300/40">
                          HẠNG {seat.tier} A
                        </span>
                      </div>
                      <div className="z-10 space-y-0.5 drop-shadow-sm">
                        <h3
                          className="text-3xl font-extrabold tracking-tight text-white leading-none uppercase"
                          style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif' }}
                        >
                          BOATS
                        </h3>
                        <p className="text-[9px] uppercase font-semibold text-blue-200 flex justify-between w-fit min-w-[130px] tracking-[0.38em]">
                          THE MUSICAL
                        </p>
                      </div>
                    </div>

                    {/* Perforated Tear Divider */}
                    <div className="relative h-4 bg-transparent flex items-center justify-between px-2">
                      <div className="w-5 h-5 -ml-5 rounded-full bg-[#f8f9ff]" />
                      <div className="flex-1 border-b-2 border-dashed border-[#c6c5d5]/60 mx-2" />
                      <div className="w-5 h-5 -mr-5 rounded-full bg-[#f8f9ff]" />
                    </div>

                    {/* Ticket Info Details */}
                    <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase text-[#767684] font-bold block mb-0.5">
                            Suất diễn
                          </span>
                          <p className="text-[13px] font-bold text-[#1b1b22]">
                            {displayDateStr} • {displayTimeRange.split(' - ')[0]}
                          </p>
                          <p className="text-xs text-[#000f7b] font-semibold">
                            {displayTimeRange}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-[#767684] font-bold block mb-0.5">
                            Địa điểm
                          </span>
                          <p className="text-[13px] font-bold text-[#1b1b22] truncate">
                            Rạp Xiếc &amp; Biểu Diễn Đa Năng Phú Thọ
                          </p>
                          <p className="text-xs text-[#454653] truncate">
                            Số 3 Lữ Gia, P.15, Q.11, TP. HCM
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#f5f2fc] flex items-center justify-between border border-[#c6c5d5]/30 mt-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs shrink-0 ${
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
                            <span className="text-xs font-bold text-[#1b1b22] block">
                              Ghế {seat.tier} {seat.number}
                            </span>
                            <span className="text-[10px] text-[#454653]">
                              Khu {seat.tier} A
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#000f7b] tracking-wider font-mono">
                          #BM-2027-8896V-0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: GIỎ VÉ & THANH TOÁN (Sticky 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="backdrop-blur-xl bg-white/75 border border-white/80 shadow-2xl rounded-3xl p-6 sticky top-24 space-y-5"
              style={{
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
                      Giỏ Vé &amp; Thanh Toán
                    </h3>
                    <p className="text-[11px] text-[#454653]">
                      Hoàn tất thông tin thanh toán để nhận vé điện tử PDF &amp; QR
                    </p>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Badge */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    Thời gian giữ vé:
                  </span>
                </div>
                <span className="text-sm font-black text-[#ba1a1a] tracking-widest font-mono">
                  {formatTimer(secondsLeft)}
                </span>
              </div>

              {/* Show Info Card */}
              <div className="p-3 rounded-2xl bg-white/70 border border-white/80 space-y-1.5 text-xs shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#454653]">Vở diễn:</span>
                  <span className="font-bold text-[#000f7b]">BOATS The Musical</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#454653]">Suất diễn:</span>
                  <span className="font-semibold text-[#1b1b22]">
                    {displayTimeRange}, {displayDateStr.includes(', ') ? displayDateStr.split(', ')[1] : displayDateStr}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#454653]">Địa điểm:</span>
                  <span className="font-semibold text-[#1b1b22] text-right">
                    Rạp Xiếc &amp; Biểu Diễn Đa Năng Phú Thọ
                  </span>
                </div>
              </div>

              {/* Selected Seats Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#454653]">
                    Ghế đã chọn ({String(activeSeats.length).padStart(2, '0')} vé):
                  </span>
                  <span className="text-[11px] text-[#000f7b] font-semibold">
                    Khu khán đài {activeSeats[0]?.tier || 'VIP'} A
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {activeSeats.map((seat) => (
                    <div
                      key={seat.id}
                      className="p-2.5 rounded-xl bg-white/90 border border-amber-200/80 flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs ${
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
                          <h4 className="text-xs font-bold text-[#1b1b22]">Ghế {seat.tier} {seat.number}</h4>
                          <span className="text-[10px] text-[#454653]">{seat.priceFormatted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Verification Info */}
              <div className="pt-3 border-t border-[#c6c5d5]/30">
                <div className="p-3 rounded-2xl bg-[#f5f2fc]/80 border border-[#c6c5d5]/40 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#767684] uppercase text-[10px] font-bold">
                    <span>Thông tin người nhận vé</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span> Đã xác thực
                    </span>
                  </div>
                  <p className="font-bold text-[#1b1b22] flex items-center gap-1.5 pt-0.5">
                    <span className="material-symbols-outlined text-sm text-[#000f7b]">person</span>
                    {customerInfo.name || 'Nguyễn Hoàng Nam'}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#454653] gap-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">call</span>
                      {customerInfo.phone || '0912 345 678'}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">mail</span>
                      {customerInfo.email || 'nam.nguyen@gmail.com'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-3 border-t border-[#c6c5d5]/30 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#454653]">
                  Phương thức thanh toán
                </label>

                {/* Option 1: VietQR */}
                <div
                  onClick={() => setPaymentMethod('vietqr')}
                  className={`rounded-2xl border-2 p-3.5 space-y-3 shadow-xs transition-all cursor-pointer ${
                    paymentMethod === 'vietqr'
                      ? 'border-[#1d2b96] bg-[#f8f9ff]'
                      : 'border-[#c6c5d5]/60 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#1d2b96] flex items-center justify-center shrink-0 bg-white">
                      {paymentMethod === 'vietqr' && <div className="w-2 h-2 rounded-full bg-[#1d2b96]" />}
                    </div>
                    <div className="shrink-0 text-[#1d2b96] mt-0.5">
                      <span className="material-symbols-outlined text-xl">qr_code_2</span>
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          Chuyển khoản VietQR / Napas247
                        </h4>
                        <span className="text-[9px] font-bold bg-[#fcefdc] text-[#7d5700] px-2 py-0.5 rounded uppercase tracking-wider shrink-0 border border-amber-200/60">
                          Khuyến dùng
                        </span>
                      </div>
                      <p className="text-[10px] text-[#454653] mt-0.5 leading-tight">
                        Tạo mã QR tức thì • Không mất phí giao dịch
                      </p>
                    </div>
                  </div>

                  {/* Nested Details Box */}
                  {paymentMethod === 'vietqr' && (
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#000f7b]/20 shadow-xs mt-1">
                      <div className="w-20 h-20 bg-[#f5f2fc] rounded-lg p-1 flex items-center justify-center shrink-0 border border-[#c6c5d5]/40">
                        <svg className="w-full h-full text-[#000f7b]" fill="currentColor" viewBox="0 0 100 100">
                          <rect fill="none" height="28" rx="4" stroke="currentColor" strokeWidth="6" width="28" x="5" y="5" />
                          <rect fill="currentColor" height="14" rx="2" width="14" x="12" y="12" />
                          <rect fill="none" height="28" rx="4" stroke="currentColor" strokeWidth="6" width="28" x="67" y="5" />
                          <rect fill="currentColor" height="14" rx="2" width="14" x="74" y="12" />
                          <rect fill="none" height="28" rx="4" stroke="currentColor" strokeWidth="6" width="28" x="5" y="67" />
                          <rect fill="currentColor" height="14" rx="2" width="14" x="12" y="74" />
                          <rect height="6" width="6" x="40" y="8" />
                          <rect height="6" width="8" x="52" y="8" />
                          <rect height="8" width="8" x="40" y="20" />
                          <rect height="12" width="6" x="10" y="42" />
                          <rect fill="#1d2b96" height="20" rx="4" width="20" x="40" y="40" />
                          <circle cx="50" cy="50" fill="#ffffff" r="4" />
                          <rect height="8" width="8" x="68" y="40" />
                          <rect height="12" width="6" x="40" y="68" />
                          <rect height="12" width="14" x="48" y="80" />
                        </svg>
                      </div>
                      <div className="text-xs space-y-1 flex-1 min-w-0">
                        <p className="text-[10px] text-[#767684] uppercase font-semibold">
                          MBBank • BOATS THE MUSICAL
                        </p>
                        <div className="flex items-center justify-between font-bold text-[#1b1b22] bg-[#f5f2fc] px-2 py-0.5 rounded">
                          <span className="tracking-wider text-xs font-mono">9886 0110 2027</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyAccount();
                            }}
                            className="text-[#000f7b] hover:opacity-80 p-0.5 cursor-pointer"
                            title="Sao chép số TK"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-sm">
                              {copiedAccount ? 'done' : 'content_copy'}
                            </span>
                          </button>
                        </div>
                        <p className="text-[10px] text-[#454653] font-medium truncate">
                          Nội dung:{' '}
                          <span className="font-bold text-[#000f7b]">
                            BM 8896V {(customerInfo.name || 'NGUYEN HOANG NAM').toUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: International Cards */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`rounded-2xl border p-3.5 flex items-start gap-3 cursor-pointer transition-colors shadow-xs ${
                    paymentMethod === 'card'
                      ? 'border-[#1d2b96] bg-[#f8f9ff]'
                      : 'border-[#c6c5d5]/60 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#1d2b96] flex items-center justify-center shrink-0 bg-white">
                    {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#1d2b96]" />}
                  </div>
                  <div className="shrink-0 text-slate-700 mt-0.5">
                    <span className="material-symbols-outlined text-xl">credit_card</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      Thẻ Quốc tế (Visa / MasterCard / JCB)
                    </h4>
                    <p className="text-[10px] text-[#454653] mt-0.5 leading-tight">
                      Hỗ trợ bảo mật 3D Secure quốc tế
                    </p>
                  </div>
                </div>

                {/* Option 3: E-Wallets */}
                <div
                  onClick={() => setPaymentMethod('wallet')}
                  className={`rounded-2xl border p-3.5 flex items-start gap-3 cursor-pointer transition-colors shadow-xs ${
                    paymentMethod === 'wallet'
                      ? 'border-[#1d2b96] bg-[#f8f9ff]'
                      : 'border-[#c6c5d5]/60 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#1d2b96] flex items-center justify-center shrink-0 bg-white">
                    {paymentMethod === 'wallet' && <div className="w-2 h-2 rounded-full bg-[#1d2b96]" />}
                  </div>
                  <div className="shrink-0 text-slate-700 mt-0.5">
                    <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      Ví điện tử MoMo / ZaloPay / VNPay
                    </h4>
                    <p className="text-[10px] text-[#454653] mt-0.5 leading-tight">
                      Thanh toán nhanh qua ứng dụng liên kết
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="pt-3 border-t border-[#c6c5d5]/40 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#454653]">
                  <span>Tạm tính ({activeSeats.length} vé VIP):</span>
                  <span className="font-semibold text-[#1b1b22]">
                    {subtotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Mã ưu đãi đã áp dụng:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#454653]">
                  <span>Phí tiện ích &amp; phát hành vé QR:</span>
                  <span className="text-emerald-700 font-semibold">Miễn phí (0đ)</span>
                </div>
                <div className="flex items-baseline justify-between pt-2.5 border-t border-dashed border-[#c6c5d5]/50">
                  <span className="font-bold text-sm text-[#1b1b22]">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-[#1d2b96] font-title-lg tracking-tight">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Confirmation Button */}
              <button
                onClick={onCompleteBooking}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#1d2b96] hover:bg-[#000f7b] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-[#1d2b96]/40 active:scale-[0.98] transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">shield</span>
                <span>Xác Nhận Đã Chuyển Khoản &amp; Nhận Vé</span>
              </button>

              {/* Trust Footer */}
              <div className="pt-1 text-center space-y-1">
                <p className="text-[11px] text-[#767684] flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-emerald-600">security</span>
                  Bảo mật SSL 256-bit • Vé điện tử gửi tức thì qua Email &amp; Zalo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
