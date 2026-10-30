import React, { useState, useEffect } from 'react';
import { CartItem, CustomerInfo, MerchProduct, Seat, ShowDate, ShowTime } from '../types';

interface BookingStep3ViewProps {
  selectedDate: ShowDate | null;
  selectedTime: ShowTime | null;
  selectedSeats: Seat[];
  customerInfo: CustomerInfo;
  onChangeCustomerInfo?: (info: Partial<CustomerInfo>) => void;
  discountAmount: number;
  cartItems?: CartItem[];
  onUpdateQuantity?: (id: string, delta: number) => void;
  onRemoveItem?: (id: string) => void;
  onAddMerchToCart?: (product: MerchProduct) => void;
  onBackToStep2: () => void;
  onCompleteBooking: () => void;
  onNavigateToMerch?: () => void;
}

export const BookingStep3View: React.FC<BookingStep3ViewProps> = ({
  selectedDate,
  selectedTime,
  selectedSeats,
  customerInfo,
  onChangeCustomerInfo,
  discountAmount,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onAddMerchToCart,
  onBackToStep2,
  onCompleteBooking,
  onNavigateToMerch,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'card' | 'wallet'>('vietqr');
  const [secondsLeft, setSecondsLeft] = useState(580); // 09:40
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>(
    customerInfo.shippingMethod || 'pickup'
  );
  const [shippingAddress, setShippingAddress] = useState(customerInfo.address || '');
  const [shippingNote, setShippingNote] = useState(customerInfo.note || '');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const displayDateStr = selectedDate ? selectedDate.dateStr : 'Thứ Sáu, 22/10/2027';
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

  const handleShippingChange = (method: 'pickup' | 'delivery') => {
    setShippingMethod(method);
    onChangeCustomerInfo?.({ shippingMethod: method });
  };

  const handleAddressChange = (address: string) => {
    setShippingAddress(address);
    onChangeCustomerInfo?.({ address });
  };

  const handleNoteChange = (note: string) => {
    setShippingNote(note);
    onChangeCustomerInfo?.({ note });
  };

  // Filter merchandise items and ticket items
  const merchItems = cartItems.filter((item) => item.type === 'merch');
  const ticketItemsInCart = cartItems.filter((item) => item.type === 'ticket');
  const hasMerch = merchItems.length > 0;

  // Validation rules for customer information
  const isNameValid = (customerInfo.name || '').trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((customerInfo.email || '').trim());
  const isPhoneValid = /^[0-9+() -]{9,15}$/.test((customerInfo.phone || '').trim());
  const isDeliverySelected = hasMerch && shippingMethod === 'delivery';
  const isAddressValid = isDeliverySelected
    ? (shippingAddress || customerInfo.address || '').trim().length >= 5
    : true;

  const isCustomerInfoComplete = isNameValid && isEmailValid && isPhoneValid && isAddressValid;

  const missingFields: string[] = [];
  if (!isNameValid) missingFields.push('Họ và tên');
  if (!isPhoneValid) missingFields.push('Số điện thoại');
  if (!isEmailValid) missingFields.push('Email');
  if (isDeliverySelected && !isAddressValid) missingFields.push('Địa chỉ nhận hàng');

  const handleConfirmPayment = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!isCustomerInfoComplete) {
      // Smooth scroll to the customer info section
      const target = document.getElementById('step3-customer-info-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Focus on the first invalid field
      setTimeout(() => {
        if (!isNameValid) {
          document.getElementById('step3-cust-name')?.focus();
        } else if (!isPhoneValid) {
          document.getElementById('step3-cust-phone')?.focus();
        } else if (!isEmailValid) {
          document.getElementById('step3-cust-email')?.focus();
        } else if (isDeliverySelected && !isAddressValid) {
          document.getElementById('step3-cust-address')?.focus();
        }
      }, 100);
      return;
    }

    onCompleteBooking();
  };

  // Active seats logic: if user explicitly selected seats in step 2, use them.
  // If no seats selected in array, but tickets exist in cart, use them.
  // If user only has merch, do NOT inject unwanted fake tickets.
  // If neither seats nor merch exists, show fallback demo seats.
  const hasUserSelectedSeats = selectedSeats.length > 0;
  const hasAnyTickets = hasUserSelectedSeats || ticketItemsInCart.length > 0;
  const shouldShowTickets = hasAnyTickets || !hasMerch;

  const activeSeats: Seat[] = hasUserSelectedSeats
    ? selectedSeats
    : shouldShowTickets
    ? [
        { id: 'V05', row: 'V', number: '05', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
        { id: 'V06', row: 'V', number: '06', tier: 'VIP' as const, price: 1299000, priceFormatted: '1.299.000đ', status: 'selected' as const },
      ]
    : [];

  const ticketSubtotal = activeSeats.reduce((sum, s) => sum + s.price, 0);
  const merchSubtotal = merchItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const combinedSubtotal = ticketSubtotal + merchSubtotal;
  const total = Math.max(0, combinedSubtotal - discountAmount);

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
              {!shouldShowTickets
                ? 'BỘ SƯU TẬP LƯU NIỆM CHÍNH THỨC • BOATS 2027'
                : 'RẠP XIẾC & BIỂU DIỄN ĐA NĂNG PHÚ THỌ'}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase blue-luxury-sheen leading-normal py-1"
            style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif', letterSpacing: '-0.01em' }}
          >
            {hasMerch && shouldShowTickets
              ? 'THANH TOÁN VÉ & VẬT PHẨM LƯU NIỆM'
              : hasMerch
              ? 'THANH TOÁN VẬT PHẨM KỶ NIỆM BOATS'
              : 'ĐẶT VÉ & SƠ ĐỒ KHÁN PHÒNG 360°'}
          </h1>
          <p className="mt-2.5 text-[#454653] font-body-lg text-sm sm:text-base">
            {hasMerch && shouldShowTickets
              ? 'Xác nhận đơn hàng tích hợp gồm vé xem biểu diễn 360° và các vật phẩm lưu niệm chính thức "Hải Trình BOATS".'
              : hasMerch
              ? 'Hoàn tất đơn hàng vật phẩm kỷ niệm chính thức BOATS The Musical. Quà tặng được đóng gói cao cấp.'
              : 'Trải nghiệm âm thanh vòm chuẩn điện ảnh và công nghệ trình chiếu holographic biển sóng bao trọn từng góc nhìn.'}
          </p>

          {/* Stepper: Only shown when booking tickets or combined booking (shouldShowTickets) */}
          {shouldShowTickets ? (
            <div className="glass-panel reveal-on-scroll rounded-2xl py-3 px-6 mx-auto inline-flex items-center gap-6 mt-6">
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
                    {activeSeats.length > 0
                      ? `Vị trí ghế (${activeSeats.map((s) => s.id).join(', ')})`
                      : 'Thông tin khán giả'}
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
                  <span className="block text-xs font-bold text-slate-900">
                    {hasMerch
                      ? 'Thanh toán Vé & Merchandise'
                      : 'Thông tin & Thanh toán'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Merchandise Direct Checkout Header (No Stepper 1-2-3) */
            <div className="reveal-on-scroll flex flex-wrap items-center justify-center gap-3.5 mt-6">
              {onNavigateToMerch && (
                <button
                  type="button"
                  onClick={onNavigateToMerch}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#1d2b96] font-bold text-xs border border-white shadow-sm transition-all hover:scale-105 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>Quay lại Cửa Hàng Merchandise</span>
                </button>
              )}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/90 text-[#1d2b96] font-bold text-xs border border-blue-200/80 shadow-xs">
                <span className="material-symbols-outlined text-base text-[#fdc662]">shopping_bag</span>
                <span>Thanh Toán Trực Tiếp Merchandise • Không Cần Qua Các Bước Đặt Vé</span>
              </div>
            </div>
          )}
        </div>

        {/* 2-COLUMN MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: TICKETS & MERCHANDISE DETAILS (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. MERCHANDISE SHOWCASE SECTION (If items present) */}
            {hasMerch && (
              <div className="glass-panel reveal-on-scroll p-5 sm:p-7 rounded-3xl space-y-5 border-2 border-[#1d2b96]/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#c6c5d5]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#1d2b96] text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
                          Vật Phẩm Kỷ Niệm Chính Thức
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase">
                          {merchItems.reduce((acc, i) => acc + i.quantity, 0)} Món Trong Giỏ
                        </span>
                      </div>
                      <h2
                        className="text-xl sm:text-2xl font-extrabold text-[#1b1b22] tracking-tight mt-0.5"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                      >
                        Danh Sách Merchandise Đã Chọn
                      </h2>
                    </div>
                  </div>
                  {onNavigateToMerch && (
                    <button
                      onClick={onNavigateToMerch}
                      type="button"
                      className="text-xs font-bold text-[#1d2b96] hover:underline flex items-center gap-1 self-start sm:self-center bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/60 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      Chọn thêm vật phẩm
                    </button>
                  )}
                </div>

                {/* Items List Cards */}
                <div className="space-y-3">
                  {merchItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/90 border border-[#c6c5d5]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#1d2b96]/40 transition-all"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-[#f8f9ff] border border-[#c6c5d5]/40 p-1 shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-[#1d2b96] text-white flex items-center justify-center font-bold text-xs shrink-0">
                            MERCH
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-[#1b1b22] truncate">{item.title}</h4>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
                              Chính Hãng
                            </span>
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-[#767684] mt-0.5 truncate">{item.subtitle}</p>
                          )}
                          <p className="text-xs text-[#1d2b96] font-semibold mt-1">
                            Đơn giá: {item.priceFormatted || `${item.price.toLocaleString('vi-VN')}đ`}
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div className="flex items-center border border-[#c6c5d5]/60 rounded-xl bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-[#454653] font-bold text-sm cursor-pointer"
                            type="button"
                            title="Giảm số lượng"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-bold text-sm text-[#1b1b22]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-[#454653] font-bold text-sm cursor-pointer"
                            type="button"
                            title="Tăng số lượng"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-[110px]">
                          <span className="text-sm font-extrabold text-[#1d2b96] block">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                          <span className="text-[10px] text-[#767684]">
                            ({item.quantity} × {item.price.toLocaleString('vi-VN')}đ)
                          </span>
                        </div>

                        {onRemoveItem && (
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 rounded-lg text-[#767684] hover:text-[#ba1a1a] hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Xóa vật phẩm này"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping / Delivery Option for Merchandise */}
                <div className="pt-4 border-t border-[#c6c5d5]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#454653] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#1d2b96]">local_shipping</span>
                      Phương thức nhận vật phẩm kỷ niệm
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Miễn phí giao nhận
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option 1: Pickup at Theater Counter */}
                    <div
                      onClick={() => handleShippingChange('pickup')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        shippingMethod === 'pickup'
                          ? 'border-[#1d2b96] bg-[#f8f9ff]'
                          : 'border-[#c6c5d5]/50 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#1d2b96] flex items-center justify-center shrink-0 bg-white">
                          {shippingMethod === 'pickup' && <div className="w-2 h-2 rounded-full bg-[#1d2b96]" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug flex items-center gap-1.5">
                            <span>Nhận tại Quầy Check-in Rạp Phú Thọ</span>
                            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                              Tiện nhất
                            </span>
                          </h4>
                          <p className="text-[11px] text-[#454653] mt-1 leading-normal">
                            Xuất trình mã QR/Mã đơn tại Quầy Merchandise sảnh A trước giờ mở màn. Đã kèm túi canvas &amp; hộp quà cao cấp.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Home Delivery */}
                    <div
                      onClick={() => handleShippingChange('delivery')}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        shippingMethod === 'delivery'
                          ? 'border-[#1d2b96] bg-[#f8f9ff]'
                          : 'border-[#c6c5d5]/50 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-[#1d2b96] flex items-center justify-center shrink-0 bg-white">
                          {shippingMethod === 'delivery' && <div className="w-2 h-2 rounded-full bg-[#1d2b96]" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">
                            Giao tận nơi toàn quốc
                          </h4>
                          <p className="text-[11px] text-[#454653] mt-1 leading-normal">
                            Đóng gói tiêu chuẩn chuyển phát nhanh tận nhà trong 2 - 3 ngày làm việc (Freeship toàn quốc cho khán giả).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address Input when Delivery is chosen */}
                  {shippingMethod === 'delivery' && (
                    <div className="p-3.5 rounded-2xl bg-white border border-[#1d2b96]/30 space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-[#1b1b22] block" htmlFor="step3-cust-address">
                          Địa chỉ nhận hàng chi tiết: *
                        </label>
                        {isAddressValid && (
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">check</span>
                            Hợp lệ
                          </span>
                        )}
                      </div>
                      <input
                        id="step3-cust-address"
                        type="text"
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                        value={shippingAddress}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-all ${
                          hasAttemptedSubmit && !isAddressValid
                            ? 'border-red-500 ring-2 ring-red-100 bg-red-50/40'
                            : 'border-[#c6c5d5] focus:ring-2 focus:ring-[#1d2b96] bg-slate-50'
                        }`}
                      />
                      {hasAttemptedSubmit && !isAddressValid && (
                        <p className="text-[10px] text-red-600 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">error</span>
                          Vui lòng nhập địa chỉ nhận hàng chi tiết (tối thiểu 5 ký tự)
                        </p>
                      )}
                      <input
                        type="text"
                        placeholder="Ghi chú thêm cho bưu tá (nếu có)..."
                        value={shippingNote}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#c6c5d5]/80 text-xs focus:outline-none focus:ring-2 focus:ring-[#1d2b96] bg-slate-50"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. TICKET SECTION (Seat Map & Artistic Preview) */}
            {shouldShowTickets && activeSeats.length > 0 && (
              <>
                {/* Sơ Đồ Khán Phòng Tròn 360° locked status */}
                <div className="glass-panel reveal-on-scroll p-5 sm:p-7 rounded-3xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c6c5d5]/40">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
                          Vị trí vé đã khóa chỗ
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
                            <span className="text-xs font-bold text-[#000f7b] tracking-wider">
                              #BM-2027-8896V-0{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 3. INVITATION BANNER IF NO MERCH IN CART */}
            {!hasMerch && (
              <div className="glass-panel p-5 rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-white to-blue-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-2xl">redeem</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                      Ưu Đãi Kèm Vé
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Thêm Gói Sưu Tầm Trọn Vẹn "Hải Trình BOATS" cùng vé?
                    </h4>
                    <p className="text-xs text-[#454653]">
                      Bao gồm Lightstick cảm ứng, Sách ảnh Tour &amp; Postcard độc quyền (Ưu đãi trọn gói 1.190.000 VNĐ).
                    </p>
                  </div>
                </div>
                {onAddMerchToCart && (
                  <button
                    onClick={() => {
                      onAddMerchToCart({
                        id: 'combo-hai-trinh-boats',
                        title: 'Gói Sưu Tầm Trọn Vẹn "Hải Trình BOATS"',
                        subtitle: 'Combo Quà Tặng Khán Giả Cao Cấp',
                        category: 'fashion',
                        price: 1190000,
                        priceFormatted: '1.190.000 VNĐ',
                        description: 'Trọn bộ sưu tập giới hạn',
                        badge: 'COMBO VIP',
                        frontImage:
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDpK4FWTcVBluvKbUSKo5XivYTQsZTJfQO6Jh8EybTi4UX3z5qDBqtq5d5Old41phQk0TmOZVzDCIahki0gmkR5HhF-kIR_zxyexRWPi2yry11zBcibiYPyagrVkXTDZboge-D7bk2DuYtcunVParhx9Sb9hAg1tO3Bg9qGQrsJaZNApTmy3IbJNnhjmOkWjFnTiRrsPk-HTr-hpbjuyti0wvE4LM4m0lw435P7X6pUHRUVPN-dvihiA0x7uJTcR-lITw',
                        specialActionType: 'add_to_cart',
                      });
                    }}
                    type="button"
                    className="shrink-0 px-4 py-2.5 rounded-xl bg-[#1d2b96] hover:bg-[#000f7b] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    <span>+ Thêm Combo Vào Đơn</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: GIỎ ĐƠN HÀNG TÍCH HỢP & THANH TOÁN (Sticky 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel reveal-on-scroll rounded-3xl p-6 sticky top-24 space-y-5">
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
                      {hasMerch && shouldShowTickets
                        ? 'Chi Tiết Đơn Hàng Tích Hợp'
                        : hasMerch
                        ? 'Chi Tiết Đơn Merchandise'
                        : 'Giỏ Vé & Thanh Toán'}
                    </h3>
                    <p className="text-[11px] text-[#454653]">
                      Hoàn tất thanh toán để nhận vé QR &amp; xác nhận vật phẩm
                    </p>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Badge */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    Thời gian giữ đơn hàng:
                  </span>
                </div>
                <span className="text-sm font-black text-[#ba1a1a] tracking-widest">
                  {formatTimer(secondsLeft)}
                </span>
              </div>

              {/* Show Info Card (if tickets included) */}
              {shouldShowTickets && activeSeats.length > 0 && (
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
              )}

              {/* ITEMIZED SUMMARY: SECTION 1 - TICKETS */}
              {shouldShowTickets && activeSeats.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-[#c6c5d5]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#454653] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#c0266f]">confirmation_number</span>
                      Vé Xem Biểu Diễn ({String(activeSeats.length).padStart(2, '0')} vé):
                    </span>
                    <span className="text-xs font-bold text-[#1d2b96]">
                      {ticketSubtotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {activeSeats.map((seat) => (
                      <div
                        key={seat.id}
                        className="p-2 rounded-xl bg-white/90 border border-amber-200/80 flex items-center justify-between shadow-xs"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-lg text-white flex items-center justify-center font-bold text-[11px] ${
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
                            <h4 className="text-[11px] font-bold text-[#1b1b22]">Ghế {seat.tier} {seat.number}</h4>
                            <span className="text-[10px] text-[#454653]">{seat.priceFormatted}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ITEMIZED SUMMARY: SECTION 2 - MERCHANDISE */}
              {hasMerch && (
                <div className="space-y-2 pt-2 border-t border-[#c6c5d5]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#454653] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#1d2b96]">inventory_2</span>
                      Vật Phẩm Kỷ Niệm ({merchItems.reduce((acc, i) => acc + i.quantity, 0)} món):
                    </span>
                    <span className="text-xs font-bold text-[#1d2b96]">
                      {merchSubtotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {merchItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-white/90 border border-[#c6c5d5]/40 flex items-center justify-between gap-2 shadow-xs text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-8 h-8 rounded-lg object-contain bg-[#f5f2fc] p-0.5 border border-[#c6c5d5]/30 shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-[#1b1b22] truncate text-[11px]">{item.title}</p>
                            <span className="text-[10px] text-[#767684]">
                              SL: {item.quantity} × {item.price.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>
                        <span className="font-extrabold text-[#1d2b96] text-[11px] shrink-0">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery badge in right column */}
                  <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-blue-900 font-medium">Nhận hàng:</span>
                    <span className="font-bold text-[#1d2b96]">
                      {shippingMethod === 'pickup'
                        ? 'Tại rạp Phú Thọ (Check-in A)'
                        : 'Giao tận nơi toàn quốc'}
                    </span>
                  </div>
                </div>
              )}

              {/* Customer Information (Directly Editable & Validated) */}
              <div id="step3-customer-info-section" className="pt-2 border-t border-[#c6c5d5]/30 scroll-mt-24">
                <div
                  className={`p-4 rounded-2xl transition-all ${
                    hasAttemptedSubmit && !isCustomerInfoComplete
                      ? 'bg-red-50/70 border-2 border-red-400 shadow-sm'
                      : isCustomerInfoComplete
                      ? 'bg-[#f5f2fc]/90 border border-emerald-300 shadow-xs'
                      : 'bg-[#f5f2fc]/80 border border-[#c6c5d5]/50'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#c6c5d5]/30">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#1d2b96] text-base">person_pin</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b1b22]">
                        Thông tin khách hàng *
                      </span>
                    </div>
                    {isCustomerInfoComplete ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">check_circle</span>
                        Đã hợp lệ
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">priority_high</span>
                        Bắt buộc điền
                      </span>
                    )}
                  </div>

                  {/* Customer Information Fields */}
                  <div className="mt-3 space-y-2.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-medium text-[#454653]" htmlFor="step3-cust-name">
                          Họ và tên khách hàng *
                        </label>
                        {isNameValid && (
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">check</span>
                            Hợp lệ
                          </span>
                        )}
                      </div>
                      <input
                        id="step3-cust-name"
                        type="text"
                        placeholder="Nhập họ và tên người nhận vé"
                        value={customerInfo.name || ''}
                        onChange={(e) => onChangeCustomerInfo?.({ name: e.target.value })}
                        className={`w-full bg-white border rounded-xl px-3 py-2 text-xs text-[#1b1b22] font-medium focus:outline-none transition-all ${
                          hasAttemptedSubmit && !isNameValid
                            ? 'border-red-500 ring-2 ring-red-100 bg-red-50/50'
                            : 'border-[#c6c5d5]/70 focus:border-[#1d2b96] focus:ring-1 focus:ring-[#1d2b96]'
                        }`}
                      />
                      {hasAttemptedSubmit && !isNameValid && (
                        <p className="text-[10px] text-red-600 font-medium flex items-center gap-1 pt-0.5">
                          <span className="material-symbols-outlined text-xs">error</span>
                          Vui lòng nhập họ và tên (tối thiểu 2 ký tự)
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-medium text-[#454653]" htmlFor="step3-cust-phone">
                          Số điện thoại liên hệ *
                        </label>
                        {isPhoneValid && (
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">check</span>
                            Hợp lệ
                          </span>
                        )}
                      </div>
                      <input
                        id="step3-cust-phone"
                        type="tel"
                        placeholder="Ví dụ: 0912 345 678"
                        value={customerInfo.phone || ''}
                        onChange={(e) => onChangeCustomerInfo?.({ phone: e.target.value })}
                        className={`w-full bg-white border rounded-xl px-3 py-2 text-xs text-[#1b1b22] font-medium focus:outline-none transition-all ${
                          hasAttemptedSubmit && !isPhoneValid
                            ? 'border-red-500 ring-2 ring-red-100 bg-red-50/50'
                            : 'border-[#c6c5d5]/70 focus:border-[#1d2b96] focus:ring-1 focus:ring-[#1d2b96]'
                        }`}
                      />
                      {hasAttemptedSubmit && !isPhoneValid && (
                        <p className="text-[10px] text-red-600 font-medium flex items-center gap-1 pt-0.5">
                          <span className="material-symbols-outlined text-xs">error</span>
                          Vui lòng nhập số điện thoại hợp lệ (từ 9 - 15 số)
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-medium text-[#454653]" htmlFor="step3-cust-email">
                          Email nhận vé điện tử &amp; hóa đơn *
                        </label>
                        {isEmailValid && (
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">check</span>
                            Hợp lệ
                          </span>
                        )}
                      </div>
                      <input
                        id="step3-cust-email"
                        type="email"
                        placeholder="tenban@gmail.com"
                        value={customerInfo.email || ''}
                        onChange={(e) => onChangeCustomerInfo?.({ email: e.target.value })}
                        className={`w-full bg-white border rounded-xl px-3 py-2 text-xs text-[#1b1b22] font-medium focus:outline-none transition-all ${
                          hasAttemptedSubmit && !isEmailValid
                            ? 'border-red-500 ring-2 ring-red-100 bg-red-50/50'
                            : 'border-[#c6c5d5]/70 focus:border-[#1d2b96] focus:ring-1 focus:ring-[#1d2b96]'
                        }`}
                      />
                      {hasAttemptedSubmit && !isEmailValid && (
                        <p className="text-[10px] text-red-600 font-medium flex items-center gap-1 pt-0.5">
                          <span className="material-symbols-outlined text-xs">error</span>
                          Email không hợp lệ (vd: ten@domain.com)
                        </p>
                      )}
                    </div>

                    {/* If delivery is chosen for merch */}
                    {isDeliverySelected && (
                      <div className="space-y-1 pt-2 border-t border-[#c6c5d5]/30">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-medium text-[#454653]" htmlFor="step3-cust-side-addr">
                            Địa chỉ giao hàng tận nơi *
                          </label>
                          {isAddressValid && (
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-xs">check</span>
                              Hợp lệ
                            </span>
                          )}
                        </div>
                        <input
                          id="step3-cust-side-addr"
                          type="text"
                          placeholder="Số nhà, tên đường, phường/xã, tỉnh/TP..."
                          value={shippingAddress}
                          onChange={(e) => handleAddressChange(e.target.value)}
                          className={`w-full bg-white border rounded-xl px-3 py-2 text-xs text-[#1b1b22] font-medium focus:outline-none transition-all ${
                            hasAttemptedSubmit && !isAddressValid
                              ? 'border-red-500 ring-2 ring-red-100 bg-red-50/50'
                              : 'border-[#c6c5d5]/70 focus:border-[#1d2b96] focus:ring-1 focus:ring-[#1d2b96]'
                          }`}
                        />
                        {hasAttemptedSubmit && !isAddressValid && (
                          <p className="text-[10px] text-red-600 font-medium flex items-center gap-1 pt-0.5">
                            <span className="material-symbols-outlined text-xs">error</span>
                            Vui lòng nhập địa chỉ nhận hàng (tối thiểu 5 ký tự)
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2 border-t border-[#c6c5d5]/30 space-y-3">
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
                          <span className="tracking-wider text-xs font-bold">9886 0110 2027</span>
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
                            BM 8896V {customerInfo.name ? customerInfo.name.toUpperCase() : 'BOATS ORDER'}
                          </span>
                        </p>
                        <p className="text-[10px] font-bold text-emerald-700">
                          Số tiền: {total.toLocaleString('vi-VN')} VNĐ
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

              {/* Price Calculation Summary */}
              <div className="pt-3 border-t border-[#c6c5d5]/40 space-y-1.5 text-xs">
                {shouldShowTickets && activeSeats.length > 0 && (
                  <div className="flex items-center justify-between text-[#454653]">
                    <span>Tạm tính ({activeSeats.length} vé xem):</span>
                    <span className="font-semibold text-[#1b1b22]">
                      {ticketSubtotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                )}
                {hasMerch && (
                  <div className="flex items-center justify-between text-[#454653]">
                    <span>Tạm tính ({merchItems.reduce((a, b) => a + b.quantity, 0)} món merchandise):</span>
                    <span className="font-semibold text-[#1b1b22]">
                      {merchSubtotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Mã ưu đãi đã áp dụng:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[#454653]">
                  <span>Phí tiện ích, QR &amp; đóng gói:</span>
                  <span className="text-emerald-700 font-semibold">Miễn phí (0đ)</span>
                </div>
                <div className="flex items-baseline justify-between pt-2.5 border-t border-dashed border-[#c6c5d5]/50">
                  <span className="font-bold text-sm text-[#1b1b22]">Tổng thanh toán:</span>
                  <span className="text-2xl font-black text-[#1d2b96] font-title-lg tracking-tight">
                    {total.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Validation Warning Alert if user clicks without filling customer info */}
              {hasAttemptedSubmit && !isCustomerInfoComplete && (
                <div className="p-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-900 text-xs flex items-start gap-2.5 shadow-xs">
                  <span className="material-symbols-outlined text-lg text-red-600 shrink-0 mt-0.5">error</span>
                  <div className="space-y-1">
                    <p className="font-extrabold text-red-700">Chưa thể xác nhận thanh toán!</p>
                    <p className="text-[11px] text-red-800 leading-relaxed">
                      Bạn chưa điền đầy đủ: <strong className="underline">{missingFields.join(', ')}</strong>. Vui lòng hoàn thành thông tin người nhận ở phía trên trước khi tiếp tục.
                    </p>
                  </div>
                </div>
              )}

              {/* Status Indicator Bar */}
              <div className="flex items-center justify-between text-xs px-1">
                <span className="text-[11px] text-[#454653]">Trạng thái thông tin:</span>
                {isCustomerInfoComplete ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Đã đủ điều kiện thanh toán
                  </span>
                ) : (
                  <span className="text-amber-800 font-bold flex items-center gap-1 text-[11px]">
                    <span className="material-symbols-outlined text-sm">pending</span>
                    Cần nhập {missingFields.join(', ')}
                  </span>
                )}
              </div>

              {/* Confirmation Button */}
              <button
                onClick={handleConfirmPayment}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg transition-all cursor-pointer ${
                  isCustomerInfoComplete
                    ? 'bg-[#1d2b96] hover:bg-[#000f7b] text-white hover:shadow-[#1d2b96]/40 active:scale-[0.98]'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300'
                }`}
                type="button"
                title={
                  isCustomerInfoComplete
                    ? 'Nhấp để xác nhận thanh toán'
                    : `Vui lòng điền thông tin khách hàng (${missingFields.join(', ')})`
                }
              >
                <span className="material-symbols-outlined text-lg">
                  {isCustomerInfoComplete ? 'shield' : 'lock'}
                </span>
                <span>
                  {!isCustomerInfoComplete
                    ? 'Điền Thông Tin Để Mở Khóa Xác Nhận'
                    : hasMerch && shouldShowTickets && activeSeats.length > 0
                    ? 'Xác Nhận Đã Chuyển Khoản Vé & Vật Phẩm'
                    : hasMerch
                    ? 'Xác Nhận Đã Chuyển Khoản Vật Phẩm'
                    : 'Xác Nhận Đã Chuyển Khoản & Nhận Vé'}
                </span>
              </button>

              {!isCustomerInfoComplete && (
                <p className="text-[10px] text-center text-amber-900 font-medium -mt-2">
                  * Yêu cầu nhập đầy đủ Họ tên, Số điện thoại và Email để kích hoạt xác nhận thanh toán
                </p>
              )}

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
