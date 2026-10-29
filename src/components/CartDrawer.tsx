import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md h-full glass-panel shadow-2xl z-10 flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#c6c5d5]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1d2b96] text-2xl">shopping_bag</span>
            <h3
              className="text-lg font-bold text-[#1b1b22]"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Giỏ Hàng Của Bạn
            </h3>
            <span className="text-xs bg-[#1d2b96]/10 text-[#1d2b96] px-2 py-0.5 rounded-full font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efecf6] hover:bg-[#c6c5d5]/40 text-[#454653] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-[#767684]">
              <span className="material-symbols-outlined text-5xl text-[#c6c5d5]">
                production_quantity_limits
              </span>
              <p className="text-sm font-medium">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs max-w-xs text-[#454653]">
                Hãy chọn ghế trên sơ đồ 360° hoặc thêm các vật phẩm kỷ niệm chính thức.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#c6c5d5]/40 flex items-center justify-between gap-3 shadow-xs"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-contain bg-white border border-[#c6c5d5]/40 p-1 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-[#c0266f] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    {item.seatId || 'VÉ'}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#1b1b22] truncate">{item.title}</h4>
                  <p className="text-[11px] text-[#1d2b96] font-semibold">
                    {item.price > 0 ? `${(item.price * item.quantity).toLocaleString('vi-VN')}đ` : 'Miễn phí'}
                  </p>
                  {item.subtitle && (
                    <p className="text-[10px] text-[#767684] truncate">{item.subtitle}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {item.type === 'merch' && item.price > 0 && (
                    <div className="flex items-center border border-[#c6c5d5]/60 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 hover:bg-slate-100 text-[#454653] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-[#1b1b22]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 text-[#454653] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 rounded-lg text-[#767684] hover:text-[#ba1a1a] hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#c6c5d5]/40 bg-white/90 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#454653] uppercase">Tổng thanh toán:</span>
              <span className="text-2xl font-black text-[#1d2b96]">
                {total.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#1d2b96] hover:bg-[#000f7b] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-[#1d2b96]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {items.every((i) => i.type === 'merch')
                  ? 'Tiến Hành Thanh Toán Merchandise'
                  : items.some((i) => i.type === 'merch')
                  ? 'Tiến Hành Đặt Chỗ & Thanh Toán Tích Hợp'
                  : 'Tiến Hành Đặt Chỗ & Thanh Toán'}
              </span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
