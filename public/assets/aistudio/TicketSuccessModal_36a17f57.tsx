import React from 'react';
import { CustomerInfo, Seat, ShowDate, ShowTime } from '../types';

interface TicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: Seat[];
  selectedDate: ShowDate | null;
  selectedTime: ShowTime | null;
  customerInfo: CustomerInfo;
  onReturnHome: () => void;
}

export const TicketSuccessModal: React.FC<TicketSuccessModalProps> = ({
  isOpen,
  onClose,
  selectedSeats,
  selectedDate,
  selectedTime,
  customerInfo,
  onReturnHome,
}) => {
  if (!isOpen) return null;

  const dateStr = selectedDate?.dateStr || 'Thứ Năm, 23/10/2027';
  const timeRange = selectedTime?.timeRange || '19:30 - 21:30';

  const activeSeats =
    selectedSeats.length > 0
      ? selectedSeats
      : [
          { id: 'V05', row: 'V', number: '05', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
          { id: 'V06', row: 'V', number: '06', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6"
        style={{
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 25px 60px -15px rgba(29, 43, 150, 0.3)',
        }}
      >
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-md">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 font-mono">
            XÁC NHẬN ĐẶT CHỖ THÀNH CÔNG
          </span>
          <h2
            className="text-2xl font-extrabold text-[#000f7b]"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            BOATS THE MUSICAL 2027
          </h2>
          <p className="text-xs text-[#454653] max-w-sm">
            Vé điện tử &amp; mã QR đã được gửi về email{' '}
            <strong className="text-[#1b1b22] font-semibold">{customerInfo.email || 'nam.nguyen@gmail.com'}</strong>
          </p>
        </div>

        {/* E-Ticket Preview Card inside modal */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#000f7b] to-[#1d2b96] text-white space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-200">
              VÉ XEM NHẠC KỊCH 360°
            </span>
            <span className="text-xs font-mono font-bold">#BM-2027-8896V</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-white/70 block">Người nhận vé:</span>
              <span className="font-bold">{customerInfo.name || 'Nguyễn Hoàng Nam'}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/70 block">Số điện thoại:</span>
              <span className="font-bold">{customerInfo.phone || '0912 345 678'}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/70 block">Suất diễn:</span>
              <span className="font-bold">{dateStr}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/70 block">Giờ diễn:</span>
              <span className="font-bold">{timeRange}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-white/70 block">Ghế đã giữ:</span>
              <div className="flex gap-1.5 mt-0.5">
                {activeSeats.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 rounded bg-white text-[#1d2b96] text-xs font-black"
                  >
                    {s.id}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-[#1d2b96]">qr_code</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              window.print?.();
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#1d2b96] hover:bg-[#000f7b] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Tải / Lưu Vé Điện Tử (PDF &amp; QR)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onReturnHome();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#efecf6] hover:bg-[#e3e1eb] text-[#1b1b22] font-semibold text-xs transition-colors cursor-pointer"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    </div>
  );
};
