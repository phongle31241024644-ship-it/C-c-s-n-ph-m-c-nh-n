import React from 'react';
import { CartItem, CustomerInfo, Seat, ShowDate, ShowTime } from '../types';

interface TicketSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: Seat[];
  selectedDate: ShowDate | null;
  selectedTime: ShowTime | null;
  customerInfo: CustomerInfo;
  cartItems?: CartItem[];
  discountAmount?: number;
  onReturnHome: () => void;
}

export const TicketSuccessModal: React.FC<TicketSuccessModalProps> = ({
  isOpen,
  onClose,
  selectedSeats,
  selectedDate,
  selectedTime,
  customerInfo,
  cartItems = [],
  discountAmount = 0,
  onReturnHome,
}) => {
  if (!isOpen) return null;

  const dateStr = selectedDate?.dateStr || 'Thứ Năm, 23/10/2027';
  const timeRange = selectedTime?.timeRange || '19:30 - 21:30';

  const merchItems = cartItems.filter((i) => i.type === 'merch');
  const hasMerch = merchItems.length > 0;

  const hasSelectedSeats = selectedSeats.length > 0;
  const hasTickets = hasSelectedSeats || (!hasMerch && cartItems.length === 0);

  const activeSeats = hasSelectedSeats
    ? selectedSeats
    : hasTickets
    ? [
        { id: 'V05', row: 'V', number: '05', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
        { id: 'V06', row: 'V', number: '06', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
      ]
    : [];

  const ticketSubtotal = activeSeats.reduce((sum, s) => sum + s.price, 0);
  const merchSubtotal = merchItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = Math.max(0, ticketSubtotal + merchSubtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-md">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
            {hasTickets && hasMerch
              ? 'XÁC NHẬN ĐẶT VÉ & VẬT PHẨM THÀNH CÔNG'
              : hasMerch
              ? 'XÁC NHẬN ĐƠN HÀNG VẬT PHẨM THÀNH CÔNG'
              : 'XÁC NHẬN ĐẶT CHỖ THÀNH CÔNG'}
          </span>
          <h2
            className="text-2xl font-extrabold text-[#000f7b]"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            BOATS THE MUSICAL 2027
          </h2>
          <p className="text-xs text-[#454653] max-w-sm">
            Thông tin xác nhận đơn hàng &amp; vé điện tử đã được gửi về email{' '}
            <strong className="text-[#1b1b22] font-semibold">{customerInfo.email || 'của bạn'}</strong>
          </p>
        </div>

        {/* E-Ticket Preview Card (If tickets exist) */}
        {hasTickets && activeSeats.length > 0 && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#000f7b] via-[#1d2b96] to-[#002930] text-white space-y-4 shadow-xl border border-white/20 relative overflow-hidden">
            {/* Subtle ambient light behind pass */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-300 block">
                  VÉ ĐIỆN TỬ CHÍNH THỨC • E-TICKET PASS
                </span>
                <h3 className="text-base font-extrabold text-white">BOATS THE MUSICAL 360°</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wider border border-white/25">
                #BM-2027-8896V
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <span className="text-[10px] text-white/70 block uppercase font-medium">Người nhận vé:</span>
                <span className="font-bold text-sm text-white truncate block">{customerInfo.name || 'Khách hàng'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <span className="text-[10px] text-white/70 block uppercase font-medium">Số điện thoại:</span>
                <span className="font-bold text-sm text-white truncate block">{customerInfo.phone || 'Chưa cung cấp'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <span className="text-[10px] text-white/70 block uppercase font-medium">Suất diễn:</span>
                <span className="font-bold text-white block">{dateStr}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <span className="text-[10px] text-white/70 block uppercase font-medium">Khung giờ:</span>
                <span className="font-bold text-amber-300 block">{timeRange}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-white/80 block uppercase font-semibold mb-1.5">
                Ghế đã giữ ({activeSeats.length} chỗ):
              </span>
              <div className="flex flex-wrap gap-2">
                {activeSeats.map((s) => (
                  <span
                    key={s.id}
                    className="px-3 py-1 rounded-lg bg-white text-[#1d2b96] text-xs font-black shadow-sm flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1d2b96]" />
                    <span>Ghế {s.id} ({s.tier})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* LARGE PROMINENT QR CODE SECTION */}
            <div className="pt-3 border-t border-white/20 flex flex-col items-center justify-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-cyan-300">qr_code_scanner</span>
                Mã QR Soát Vé Tại Cổng Khán Phòng
              </span>

              {/* High-Resolution Large QR Code Box */}
              <div className="p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-white/90 flex flex-col items-center justify-center relative group">
                <svg
                  viewBox="0 0 160 160"
                  className="w-48 h-48 sm:w-56 sm:h-56 text-[#000f7b]"
                  fill="currentColor"
                >
                  {/* Top-Left Corner Detection Pattern */}
                  <rect x="10" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="8" rx="6" />
                  <rect x="22" y="22" width="16" height="16" fill="currentColor" rx="3" />

                  {/* Top-Right Corner Detection Pattern */}
                  <rect x="110" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="8" rx="6" />
                  <rect x="122" y="22" width="16" height="16" fill="currentColor" rx="3" />

                  {/* Bottom-Left Corner Detection Pattern */}
                  <rect x="10" y="110" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="8" rx="6" />
                  <rect x="22" y="122" width="16" height="16" fill="currentColor" rx="3" />

                  {/* Timing patterns & Data Matrix Dots */}
                  <rect x="58" y="15" width="8" height="8" rx="2" />
                  <rect x="74" y="15" width="8" height="8" rx="2" />
                  <rect x="90" y="15" width="8" height="8" rx="2" />
                  <rect x="58" y="30" width="8" height="8" rx="2" />
                  <rect x="90" y="30" width="8" height="8" rx="2" />

                  <rect x="15" y="58" width="8" height="8" rx="2" />
                  <rect x="30" y="58" width="8" height="8" rx="2" />
                  <rect x="15" y="74" width="8" height="8" rx="2" />
                  <rect x="15" y="90" width="8" height="8" rx="2" />

                  {/* Central QR Data Clusters */}
                  <rect x="58" y="58" width="8" height="8" rx="2" />
                  <rect x="74" y="58" width="8" height="8" rx="2" />
                  <rect x="90" y="58" width="8" height="8" rx="2" />
                  <rect x="110" y="58" width="8" height="8" rx="2" />
                  <rect x="126" y="58" width="8" height="8" rx="2" />
                  <rect x="142" y="58" width="8" height="8" rx="2" />

                  <rect x="58" y="74" width="8" height="8" rx="2" />
                  <rect x="90" y="74" width="8" height="8" rx="2" />
                  <rect x="110" y="74" width="8" height="8" rx="2" />
                  <rect x="134" y="74" width="8" height="8" rx="2" />

                  <rect x="58" y="90" width="8" height="8" rx="2" />
                  <rect x="74" y="90" width="8" height="8" rx="2" />
                  <rect x="90" y="90" width="8" height="8" rx="2" />
                  <rect x="110" y="90" width="8" height="8" rx="2" />
                  <rect x="126" y="90" width="8" height="8" rx="2" />

                  {/* Bottom-Right Data Area */}
                  <rect x="58" y="110" width="8" height="8" rx="2" />
                  <rect x="74" y="110" width="8" height="8" rx="2" />
                  <rect x="90" y="110" width="8" height="8" rx="2" />
                  <rect x="110" y="110" width="8" height="8" rx="2" />
                  <rect x="134" y="110" width="8" height="8" rx="2" />

                  <rect x="74" y="126" width="8" height="8" rx="2" />
                  <rect x="110" y="126" width="8" height="8" rx="2" />
                  <rect x="126" y="126" width="8" height="8" rx="2" />
                  <rect x="142" y="126" width="8" height="8" rx="2" />

                  <rect x="58" y="142" width="8" height="8" rx="2" />
                  <rect x="90" y="142" width="8" height="8" rx="2" />
                  <rect x="110" y="142" width="8" height="8" rx="2" />
                  <rect x="134" y="142" width="8" height="8" rx="2" />

                  {/* Center Nautical Logo Badge inside QR */}
                  <circle cx="80" cy="80" r="16" fill="#1d2b96" />
                  <circle cx="80" cy="80" r="14" fill="#ffffff" />
                  <path d="M80 70 L86 82 L74 82 Z" fill="#1d2b96" />
                  <rect x="79" y="82" width="2" height="6" fill="#1d2b96" />
                </svg>

                <div className="mt-2 text-center">
                  <span className="text-[11px] font-black tracking-widest text-[#1d2b96] block uppercase">
                    BM-2027-8896V-PASS
                  </span>
                  <span className="text-[9px] text-[#454653] font-medium block">
                    Cổng kiểm soát vé rạp Phú Thọ
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-white/70 text-center italic">
                * Quý khách vui lòng lưu lại ảnh hoặc mở mã QR này khi đến rạp trước giờ diễn 30 phút.
              </p>
            </div>
          </div>
        )}

        {/* MERCHANDISE RECEIPT CONFIRMATION SECTION (If merch items exist) */}
        {hasMerch && (
          <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-[#1d2b96]/20 shadow-lg space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1d2b96] text-xl">inventory_2</span>
                <h4 className="text-sm font-bold text-[#1b1b22]">
                  Vật Phẩm Kỷ Niệm Đã Xác Nhận ({merchItems.reduce((acc, i) => acc + i.quantity, 0)} món)
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                MÃ NHẬN: #MERCH-8896
              </span>
            </div>

            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {merchItems.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-[#f8f9ff] border border-[#c6c5d5]/40 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-[#c6c5d5]/30 shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-[#1b1b22] truncate text-xs">{item.title}</p>
                      <span className="text-[11px] text-[#767684]">
                        Số lượng: <strong className="text-slate-900">{item.quantity}</strong> × {item.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                  <span className="font-extrabold text-[#1d2b96] text-xs shrink-0">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
            </div>

            {/* Pickup / Delivery Notice */}
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs space-y-1">
              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">storefront</span>
                {customerInfo.shippingMethod === 'delivery'
                  ? 'Giao hàng tận nhà theo địa chỉ đăng ký'
                  : 'Nhận quà tại Quầy Merchandise Sảnh A (Rạp Phú Thọ)'}
              </p>
              <p className="text-[11px] text-amber-800">
                {customerInfo.shippingMethod === 'delivery' && customerInfo.address
                  ? `Đơn hàng sẽ được gửi đến: ${customerInfo.address} trong vòng 2 - 3 ngày làm việc.`
                  : 'Quý khách vui lòng xuất trình mã đơn hàng hoặc tên người nhận vé tại Quầy Check-in trước giờ diễn để nhận túi quà tặng chính thức.'}
              </p>
            </div>
          </div>
        )}

        {/* Grand Total Paid Summary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[#454653] font-semibold">Tổng giá trị thanh toán thành công:</span>
          <span className="text-lg font-black text-[#1d2b96]">{total.toLocaleString('vi-VN')} VNĐ</span>
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
            <span>Tải / Lưu Vé &amp; Hóa Đơn (PDF)</span>
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
