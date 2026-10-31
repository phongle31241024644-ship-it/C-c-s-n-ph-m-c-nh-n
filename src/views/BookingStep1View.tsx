import React from 'react';
import { ShowDate, ShowTime } from '../types';
import { SHOW_DATES, SHOW_TIMES } from '../data/mockData';

interface BookingStep1ViewProps {
  selectedDate: ShowDate | null;
  onSelectDate: (d: ShowDate) => void;
  selectedTime: ShowTime | null;
  onSelectTime: (t: ShowTime | null) => void;
  onProceedToStep2: () => void;
  onAutoProceedToStep2?: (d: ShowDate, t: ShowTime) => void;
}

export const BookingStep1View: React.FC<BookingStep1ViewProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  onProceedToStep2,
  onAutoProceedToStep2,
}) => {
  // Thứ 4 (d1) và Thứ 5 (d2) có 1 suất buổi tối; Thứ 6 (d3), Thứ 7 (d4), Chủ Nhật (d5) có suất sáng & tối
  const isEveningOnlyDate = (d: ShowDate | null) => d?.id === 'd1' || d?.id === 'd2';
  const isWeekendMultiSession = (d: ShowDate | null) => d?.id === 'd3' || d?.id === 'd4' || d?.id === 'd5';
  const isReady = selectedDate !== null && selectedTime !== null;

  const eveningTime = SHOW_TIMES.find((t) => t.tagType === 'evening') || SHOW_TIMES[2];
  const weekendTimes = SHOW_TIMES.filter((t) => t.tagType === 'morning' || t.tagType === 'evening');

  const handleDateClick = (d: ShowDate) => {
    if (isEveningOnlyDate(d)) {
      // Thứ 4, Thứ 5: Chỉ có 1 suất tối (19:30 - 21:30)
      // Tự động chọn sẵn suất tối và chuyển thẳng qua Bước 2 (Chọn ghế) luôn
      if (onAutoProceedToStep2) {
        onAutoProceedToStep2(d, eveningTime);
      } else {
        onSelectDate(d);
        onSelectTime(eveningTime);
        onProceedToStep2();
      }
    } else {
      // Thứ 6, Thứ 7, Chủ Nhật: Có 2 suất (Sáng & Tối) -> để người dùng tự chọn
      onSelectDate(d);
      onSelectTime(null);
    }
  };

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
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase blue-luxury-sheen leading-normal py-1"
            style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif', letterSpacing: '-0.01em' }}
          >
            {'ĐẶT VÉ & SƠ ĐỒ KHÁN PHÒNG 360°'}
          </h1>
          <p className="mt-2.5 text-[#454653] text-sm sm:text-base">
            Trải nghiệm âm thanh vòm chuẩn điện ảnh và công nghệ trình chiếu holographic biển sóng bao trọn từng góc nhìn.
          </p>
        </div>

        {/* Stepper Progress Bar (Step 1 Active) */}
        <div className="max-w-4xl mx-auto mb-8 px-2 reveal-on-scroll">
          <div className="py-3.5 px-4 sm:px-6 rounded-2xl flex items-center justify-between gap-2 shadow-sm glass-panel">
            {/* Step 1: Active */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1d2b96] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#1d2b96]/20 shadow-xs">
                1
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#1d2b96]">
                  Bước 1 • Đang chọn
                </p>
                <h4 className="text-xs font-bold text-[#1b1b22]">
                  {selectedDate && selectedTime
                    ? `${selectedDate.dayMonth} • ${selectedTime.timeRange}`
                    : selectedDate
                    ? `${selectedDate.dayMonth} • Vui lòng chọn buổi`
                    : 'Chọn suất & ngày diễn'}
                </h4>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-[#c6c5d5]/40 mx-2 hidden sm:block" />

            {/* Step 2: Upcoming */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#e9e7f0] border border-[#c6c5d5]/60 text-[#454653] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#454653]">
                  Bước 2 • Tiếp theo
                </p>
                <h4 className="text-xs font-medium text-[#454653]">Vị trí ghế ngồi 360°</h4>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-[#c6c5d5]/40 mx-2 hidden sm:block" />

            {/* Step 3: Upcoming */}
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-[#e9e7f0] border border-[#c6c5d5]/60 text-[#454653] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#454653]">
                  Bước 3 • Tiếp theo
                </p>
                <h4 className="text-xs font-medium text-[#454653]">Thông tin &amp; Thanh toán</h4>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION BƯỚC 1: CHỌN NGÀY & SUẤT DIỄN */}
        <section className="glass-panel reveal-on-scroll p-6 sm:p-9 rounded-3xl space-y-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#c6c5d5]/40">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
                Bước 1: Chọn ngày &amp; suất diễn
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#1b1b22] tracking-tight mt-0.5"
                style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif' }}
              >
                Lịch Diễn Tuần Này
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-[#454653] bg-[#f5f2fc] px-3.5 py-2 rounded-full border border-white shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sẵn sàng mở bán suất diễn tháng 10/2027
            </div>
          </div>

          {/* 1. Chọn ngày */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b1b22] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#1d2b96]">calendar_month</span>
                1. Chọn ngày trong tuần
              </span>
              <span className="text-xs text-[#000f7b] font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                <span className="material-symbols-outlined text-sm">event_repeat</span> Xem toàn bộ tháng
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5" id="date-picker-group">
              {SHOW_DATES.map((d) => {
                const isSelected = selectedDate?.id === d.id;
                const isDirectStep2 = isEveningOnlyDate(d);

                return (
                  <button
                    key={d.id}
                    onClick={() => handleDateClick(d)}
                    type="button"
                    title={isDirectStep2 ? `${d.dayOfWeek} (${d.dayMonth}) - Tự động chọn suất tối & chuyển ngay qua Bước 2` : `${d.dayOfWeek} (${d.dayMonth}) - Chọn để xem các suất (Sáng / Tối)`}
                    className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all text-center cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-2 border-[#1d2b96] bg-[#1d2b96]/10 shadow-md ring-2 ring-[#1d2b96]/30'
                        : 'border border-[#1d2b96]/20 bg-white/80 hover:border-[#1d2b96] hover:shadow-md hover:bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute -top-2.5 right-2 px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-[#1d2b96] text-white shadow-xs">
                        Đang chọn
                      </span>
                    )}
                    {isDirectStep2 && !isSelected && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.2 text-[8px] font-bold uppercase rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300">
                        Suất Tối
                      </span>
                    )}
                    <span
                      className={`text-xs font-bold tracking-wide uppercase ${
                        isSelected ? 'text-[#1d2b96]' : 'text-[#454653]'
                      }`}
                    >
                      {d.dayOfWeek}
                    </span>
                    <span
                      className={`text-2xl font-bold my-1 ${
                        isSelected ? 'text-[#1d2b96]' : 'text-[#1b1b22]'
                      }`}
                      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {d.dayMonth}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border mt-1 ${d.badgeColor}`}>
                      {d.badge}
                    </span>
                    {isDirectStep2 && (
                      <span className="text-[9px] text-[#1d2b96] font-semibold mt-1.5 flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                        <span>Vào Bước 2</span>
                        <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Chọn khung giờ diễn */}
          <div className="pt-6 border-t border-[#c6c5d5]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b1b22] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#1d2b96]">schedule</span>
                2. Khung giờ diễn {selectedDate ? `(${selectedDate.dateStr}):` : '(Vui lòng chọn ngày trước):'}
              </span>
              {selectedDate && (
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    isWeekendMultiSession(selectedDate)
                      ? 'text-amber-800 bg-amber-50 border-amber-200'
                      : 'text-indigo-800 bg-indigo-50 border-indigo-200'
                  }`}
                >
                  {isWeekendMultiSession(selectedDate)
                    ? `${selectedDate.dayOfWeek}: Có 2 Suất (Sáng & Tối)`
                    : `${selectedDate.dayOfWeek}: 1 Suất Tối`}
                </span>
              )}
            </div>

            {selectedDate === null ? (
              <div className="p-8 rounded-2xl border border-dashed border-[#c6c5d5] bg-white/50 text-center space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#c6c5d5]">touch_app</span>
                <p className="text-sm font-medium text-[#454653]">
                  Hãy bấm chọn 1 ngày diễn ở trên để hiển thị các khung giờ có sẵn
                </p>
                <p className="text-xs text-[#767684]">
                  Thứ 4, 5: 1 suất tối (19:30 – 21:30) • Thứ 6, 7, CN: Có 2 suất Sáng (09:30) &amp; Tối (19:30)
                </p>
              </div>
            ) : isWeekendMultiSession(selectedDate) ? (
              /* THỨ 6, THỨ 7, CHỦ NHẬT: CÓ 2 BUỔI (SÁNG & TỐI) -> NGƯỜI DÙNG TỰ CHỌN */
              <div className="space-y-2">
                <p className="text-xs text-[#454653]">
                  <strong className="text-[#000f7b]">{selectedDate.dayOfWeek} ({selectedDate.dayMonth})</strong> có 2 suất diễn (Sáng &amp; Tối). Vui lòng bấm chọn khung giờ bạn mong muốn:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {weekendTimes.map((t) => {
                    const isSelected = selectedTime?.id === t.id;
                    const isMorning = t.tagType === 'morning';

                    return (
                      <div
                        key={t.id}
                        onClick={() => onSelectTime(t)}
                        className={`cursor-pointer relative p-4 rounded-2xl transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-2 border-[#000f7b] bg-white/95 shadow-md ring-2 ring-[#000f7b]/20'
                            : 'border border-[#c6c5d5]/70 bg-white/70 hover:bg-white hover:border-[#1d2b96]/50 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                              isMorning
                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                : 'bg-orange-50 border-orange-200 text-orange-700'
                            }`}
                          >
                            <span className="material-symbols-outlined text-2xl">
                              {isMorning ? 'wb_sunny' : 'routine'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold text-lg ${
                                  isSelected ? 'text-[#000f7b]' : 'text-[#1b1b22]'
                                }`}
                              >
                                {t.timeRange}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  isMorning
                                    ? 'bg-amber-500/10 text-amber-800'
                                    : 'bg-orange-500/10 text-orange-800'
                                }`}
                              >
                                {t.tag}
                              </span>
                            </div>
                            <p className="text-xs text-[#454653] mt-0.5">{t.notes}</p>
                          </div>
                        </div>
                        <span
                          className={`material-symbols-outlined text-2xl ${
                            isSelected ? 'text-[#000f7b]' : 'text-[#c6c5d5]'
                          }`}
                        >
                          {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* THỨ 4, THỨ 5: CHỈ CÓ 1 SUẤT BUỔI TỐI (19:30 - 21:30) */
              <div className="space-y-3">
                <div className="p-3 sm:p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-700 text-2xl shrink-0">info</span>
                  <div className="text-xs text-[#454653]">
                    <span className="font-bold text-[#000f7b]">{selectedDate.dayOfWeek} ({selectedDate.dayMonth}) chỉ biểu diễn duy nhất 1 Suất Tối (19:30 – 21:30)</span>.
                    <span className="block mt-0.5">Hệ thống đã tự động chọn sẵn suất tối. Bạn có thể bấm tiếp tục để chuyển sang chọn ghế.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border-2 border-[#000f7b] bg-white/95 shadow-md ring-2 ring-[#000f7b]/20 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl">nights_stay</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-[#000f7b]">19:30 – 21:30</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-800">
                          Suất Tối Duy Nhất
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Đã tự động chọn
                        </span>
                      </div>
                      <p className="text-xs text-[#454653] mt-0.5">Còn 18 ghế trống • 1 Suất Tối</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-2xl text-emerald-600">check_circle</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. Bottom Action Bar */}
          <div className="pt-6 border-t border-[#c6c5d5]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#454653]">
              {isReady ? (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>
                    Đã chọn suất diễn:{' '}
                    <strong className="text-[#1b1b22] font-bold">
                      {selectedDate.dateStr} ({selectedTime.timeRange})
                    </strong>
                  </span>
                </div>
              ) : selectedDate && isWeekendMultiSession(selectedDate) ? (
                <div className="flex items-center gap-2 text-amber-800">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Vui lòng chọn Suất Sáng (09:30 – 11:30) hoặc Suất Tối (19:30 – 21:30) để tiếp tục.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#767684]">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span>Vui lòng chọn ngày diễn. (Chọn Thứ 4 hoặc Thứ 5 sẽ có 1 suất tối và có thể chuyển thẳng sang Bước 2).</span>
                </div>
              )}
            </div>

            <button
              onClick={onProceedToStep2}
              disabled={!isReady}
              className={`inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-md ${
                isReady
                  ? 'bg-gradient-to-r from-[#000f7b] via-[#1d2b96] to-[#1d2b96] text-white hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-[#1d2b96]/30'
                  : 'bg-slate-200 text-[#767684] cursor-not-allowed opacity-60'
              }`}
              type="button"
            >
              <span>Tiếp Tục Chọn Ghế Ngồi (Bước 2)</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
