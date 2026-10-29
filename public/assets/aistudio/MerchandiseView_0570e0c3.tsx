import React, { useState } from 'react';
import { MERCH_PRODUCTS } from '../data/mockData';
import { MerchProduct, ViewMode } from '../types';

interface MerchandiseViewProps {
  onAddToCart: (product: MerchProduct) => void;
  onAddCombo: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const MerchandiseView: React.FC<MerchandiseViewProps> = ({
  onAddToCart,
  onAddCombo,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'fashion' | 'bags' | 'jewelry' | 'prints'
  >('all');

  // Track active side for items with front & back
  const [activeSides, setActiveSides] = useState<Record<string, 'front' | 'back'>>({
    m1: 'front',
    m2: 'front',
    m3: 'front',
  });

  const toggleSide = (id: string, side: 'front' | 'back') => {
    setActiveSides((prev) => ({ ...prev, [id]: side }));
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? MERCH_PRODUCTS
      : MERCH_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full pt-8 pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        {/* HERO & CURATED STATEMENT */}
        <section className="relative z-10 space-y-8">
          {/* Overline Metadata */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2 text-[#454653] text-[11px] font-mono uppercase tracking-widest">
              <span className="text-[#1d2b96] font-bold">BOATS 2027</span>
              <span>/</span>
              <span>KỶ NIỆM PHỤC TRANG &amp; ẤN PHẨM</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md shadow-sm text-[#000f7b] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#7d5700] animate-pulse" />
              <span>CHÍNH HÃNG ĐỘC QUYỀN VỞ DIỄN</span>
            </div>
          </div>

          {/* Main Headline & Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col space-y-3">
              <span className="text-xs text-[#000f7b] tracking-widest uppercase font-semibold">
                THE OFFICIAL BOATS COLLECTIVE
              </span>
              <h1
                className="tracking-tight leading-none"
                style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif' }}
              >
                <span className="block text-[#1d2b96] font-extrabold text-3xl md:text-5xl lg:text-5xl tracking-tight leading-tight">
                  BỘ SƯU TẬP LƯU NIỆM
                </span>
                <span className="block font-bold text-2xl md:text-4xl lg:text-4xl tracking-wider text-[#7d5700] mt-1">
                  CHÍNH THỨC
                </span>
              </h1>
              <p className="text-base text-[#454653] max-w-2xl leading-relaxed">
                Lưu giữ ký ức về hải trình nghệ thuật đa giác quan 360°. Toàn bộ sản phẩm được hoàn thiện tỉ mỉ từ phom dáng, chất liệu vải hữu cơ cao cấp đến kỹ thuật in khắc lụa bản quyền INTERPLAY.
              </p>
            </div>

            {/* Quick Summary Widget */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="w-full sm:w-auto p-5 rounded-2xl bg-white/75 backdrop-blur-xl shadow-lg border border-white/80 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-[#dfe0ff] flex items-center justify-center text-[#000f7b] flex-shrink-0">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#454653] uppercase tracking-wider font-mono">
                    Phiên bản
                  </span>
                  <span className="text-lg font-bold text-[#1d2b96]">Mùa diễn 2027</span>
                  <span className="text-xs text-[#7d5700] font-medium">Giới hạn số lượng ấn bản</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="p-2 rounded-2xl bg-white/60 backdrop-blur-xl shadow-md border border-white/80 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1d2b96] text-white shadow-sm'
                  : 'text-[#454653] hover:text-[#000f7b] hover:bg-white/70'
              }`}
            >
              Tất cả (9)
            </button>
            <button
              onClick={() => setSelectedCategory('fashion')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === 'fashion'
                  ? 'bg-[#1d2b96] text-white shadow-sm'
                  : 'text-[#454653] hover:text-[#000f7b] hover:bg-white/70'
              }`}
            >
              Áo thun &amp; Thời trang (2)
            </button>
            <button
              onClick={() => setSelectedCategory('bags')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === 'bags'
                  ? 'bg-[#1d2b96] text-white shadow-sm'
                  : 'text-[#454653] hover:text-[#000f7b] hover:bg-white/70'
              }`}
            >
              Túi &amp; Bao bì (2)
            </button>
            <button
              onClick={() => setSelectedCategory('jewelry')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === 'jewelry'
                  ? 'bg-[#1d2b96] text-white shadow-sm'
                  : 'text-[#454653] hover:text-[#000f7b] hover:bg-white/70'
              }`}
            >
              Quà lưu niệm &amp; Vòng tay (2)
            </button>
            <button
              onClick={() => setSelectedCategory('prints')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === 'prints'
                  ? 'bg-[#1d2b96] text-white shadow-sm'
                  : 'text-[#454653] hover:text-[#000f7b] hover:bg-white/70'
              }`}
            >
              Bộ vé &amp; Ấn phẩm sưu tầm (3)
            </button>
          </div>
        </section>

        {/* PRODUCTS GRID SHOWCASE */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="product-grid">
            {filteredProducts.map((product) => {
              const currentSide = activeSides[product.id] || 'front';
              const displayImage =
                currentSide === 'back' && product.backImage
                  ? product.backImage
                  : product.frontImage;

              return (
                <article
                  key={product.id}
                  className="product-item group flex flex-col rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/80 ring-1 ring-white/60"
                >
                  {/* Image Display Area */}
                  <div className="relative bg-[#f5f2fc] aspect-square w-full overflow-hidden flex items-center justify-center p-6">
                    {/* Badge */}
                    <span
                      className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                        product.badgeColor || 'bg-white/90 text-[#000f7b]'
                      }`}
                    >
                      {product.badge}
                    </span>

                    {/* Front / Back Toggle Buttons if available */}
                    {product.backImage && (
                      <div className="absolute top-4 right-4 z-10 flex gap-1.5 bg-white/80 backdrop-blur-md p-1 rounded-full border border-white/60 shadow-sm">
                        <button
                          type="button"
                          onClick={() => toggleSide(product.id, 'front')}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            currentSide === 'front'
                              ? 'bg-[#1d2b96] text-white'
                              : 'text-[#454653] hover:text-[#000f7b]'
                          }`}
                        >
                          {product.frontLabel || 'Mặt trước'}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSide(product.id, 'back')}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            currentSide === 'back'
                              ? 'bg-[#1d2b96] text-white'
                              : 'text-[#454653] hover:text-[#000f7b]'
                          }`}
                        >
                          {product.backLabel || 'Mặt sau'}
                        </button>
                      </div>
                    )}

                    <img
                      alt={product.title}
                      className="product-display-img w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      src={displayImage}
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-7 flex flex-col flex-1 justify-between bg-gradient-to-b from-transparent to-white/40">
                    <div className="flex flex-col space-y-2">
                      <span className="text-[11px] uppercase tracking-widest text-[#454653] font-mono">
                        {product.subtitle}
                      </span>
                      <h3 className="text-lg text-[#1d2b96] font-semibold leading-snug">
                        {product.title}
                      </h3>
                      <p className="text-xs text-[#454653] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="pt-6 mt-6 border-t border-[#c6c5d5]/40 flex items-center justify-between gap-2">
                      {product.specialActionType === 'add_to_cart' ? (
                        <>
                          <div>
                            <span className="text-[11px] text-[#454653] block">Giá niêm yết</span>
                            <span className="text-lg font-bold text-[#1d2b96]">
                              {product.priceFormatted}
                            </span>
                          </div>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="cart-add-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d2b96] hover:bg-[#000f7b] text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.03] cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              add_shopping_cart
                            </span>
                            <span>Thêm</span>
                          </button>
                        </>
                      ) : product.specialActionType === 'internal_only' ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#454653] font-bold">
                              ĐỒNG PHỤC EKIP SẢN XUẤT
                            </span>
                            <span className="text-xs text-[#7d5700] font-medium">
                              Dành riêng cho BTC &amp; Hậu đài
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#e3e1eb] text-[#1b1b22] text-[11px] font-semibold border border-white/60 shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">lock</span>
                            <span>Ấn phẩm nội bộ</span>
                          </span>
                        </>
                      ) : product.specialActionType === 'complimentary' ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#7d5700] font-bold">
                              QUÀ TẶNG KÈM
                            </span>
                            <span className="text-xs font-semibold text-[#1d2b96]">
                              {product.priceFormatted}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100/70 text-[#7d5700] text-[11px] font-semibold border border-amber-300/60">
                            <span className="material-symbols-outlined text-[16px]">
                              featured_seasonal_and_gifts
                            </span>
                            <span>{product.specialBadgeText}</span>
                          </span>
                        </>
                      ) : product.specialActionType === 'included_with_ticket' ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#1d2b96] font-bold">
                              ẤN PHẨM THEO VÉ
                            </span>
                            <span className="text-xs text-[#454653]">Kèm khi đặt vé vật lý</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#dfe0ff] text-[#000f7b] text-[11px] font-semibold shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">
                              confirmation_number
                            </span>
                            <span>Kèm theo vé xem</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-[#000f7b] font-bold">
                              VẬT PHẨM CHECK-IN
                            </span>
                            <span className="text-xs text-[#454653]">Tặng kèm theo vé rạp</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#e3e1eb] text-[#1b1b22] text-[11px] font-semibold border border-white/60 shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">door_front</span>
                            <span>Phát tại cửa rạp</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* THEATRICAL ARTISTIC BANNER (Combo Box) */}
        <section className="py-6">
          <div className="relative rounded-3xl p-8 lg:p-14 overflow-hidden bg-gradient-to-r from-[#1d2b96] via-[#000f7b] to-[#002930] text-white shadow-2xl border border-white/20">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col space-y-4">
                <span className="text-[11px] uppercase tracking-widest text-[#ffdeaa] font-bold font-mono">
                  COMBO QUÀ TẶNG KHÁN GIẢ CAO CẤP
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                  Gói Sưu Tầm Trọn Vẹn "Hải Trình BOATS"
                </h2>
                <p className="text-sm sm:text-base text-[#e3e1eb] max-w-xl leading-relaxed">
                  Bao gồm: 01 Áo Thun Khán Giả Đặc Biệt + 01 Túi Tote Canvas + 01 Vòng Tay Chuỗi Đá Xanh + 01 Vé Cứng Mỹ Thuật &amp; Postcard. Tặng kèm Hộp Kỷ Niệm sang trọng.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-4">
                <div className="text-left lg:text-right">
                  <span className="text-sm text-white/70 line-through block font-mono">
                    1.370.000 VNĐ
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#fdc662] font-mono">
                    1.190.000 VNĐ
                  </span>
                </div>
                <button
                  onClick={onAddCombo}
                  className="px-8 py-3.5 rounded-full bg-[#fdc662] hover:bg-[#ffdeaa] text-[#755100] font-bold text-sm shadow-lg transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">stars</span>
                  <span>Đặt Trọn Bộ Combo</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE & SHIPPING CARDS (3-COLUMN GLASS) */}
        <section className="py-6">
          <div className="text-center max-w-xl mx-auto pb-10">
            <span className="text-xs uppercase tracking-widest text-[#000f7b] font-bold block mb-2 font-mono">
              ĐẶC QUYỀN HẬU CẦN
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#1d2b96]"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Chính Sách &amp; Trải Nghiệm Khán Giả
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-xl shadow-lg border border-white/80 flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#dfe0ff] flex items-center justify-center text-[#1d2b96]">
                <span className="material-symbols-outlined text-3xl">theater_comedy</span>
              </div>
              <h3 className="text-lg font-bold text-[#1d2b96]">Nhận tại Rạp Xiếc &amp; Phú Thọ</h3>
              <p className="text-sm text-[#454653] leading-relaxed">
                Đặt trước online, nhận quà trực tiếp tại quầy check-in Merchandise sảnh chính trước giờ diễn 45 phút không cần xếp hàng.
              </p>
              <span className="text-xs text-[#000f7b] font-semibold uppercase tracking-wider pt-2 flex items-center gap-1">
                <span>Quầy Fast-Track</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-xl shadow-lg border border-white/80 flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdeaa] flex items-center justify-center text-[#271900]">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              <h3 className="text-lg font-bold text-[#1d2b96]">Giao hàng toàn quốc</h3>
              <p className="text-sm text-[#454653] leading-relaxed">
                Đóng gói cẩn trọng trong hộp giấy mỹ thuật bảo vệ chống va đập. Miễn phí giao hàng tiêu chuẩn cho đơn từ 600.000 VNĐ.
              </p>
              <span className="text-xs text-[#000f7b] font-semibold uppercase tracking-wider pt-2 flex items-center gap-1">
                <span>Thời gian: 2-4 ngày</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-white/75 backdrop-blur-xl shadow-lg border border-white/80 flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#a6eeff] flex items-center justify-center text-[#00404a]">
                <span className="material-symbols-outlined text-3xl">confirmation_number</span>
              </div>
              <h3 className="text-lg font-bold text-[#1d2b96]">Ưu đãi chủ vé nhạc kịch</h3>
              <p className="text-sm text-[#454653] leading-relaxed">
                Giảm ngay 10% cho khách đã đặt vé trước ngày công chiếu hoặc xuất trình mã vé tại quầy lưu niệm trước và sau đêm diễn.
              </p>
              <span className="text-xs text-[#000f7b] font-semibold uppercase tracking-wider pt-2 flex items-center gap-1">
                <span>Nhập mã vé khi checkout</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </div>
        </section>

        {/* FLOATING BOTTOM PILL */}
        <div className="fixed bottom-5 inset-x-0 z-40 px-4 pointer-events-none flex justify-center">
          <div
            className="pointer-events-auto flex items-center justify-between gap-4 py-2.5 px-5 rounded-full shadow-2xl transition-all duration-300 border border-white/80"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 16px 36px -10px rgba(29, 43, 150, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
            }}
          >
            <div className="flex items-center gap-3 pl-1">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#fdc662] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#454653] font-semibold font-mono">
                  Mùa diễn 2027 · Sắp mở màn
                </span>
                <span className="text-[13px] font-bold text-[#1d2b96] leading-tight">
                  BOATS THE MUSICAL
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-[#c6c5d5]/40 mx-1" />
            <button
              onClick={() => onNavigate('schedule-and-tickets')}
              className="inline-flex items-center gap-2 bg-[#1d2b96] hover:bg-[#000f7b] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
              <span>Đặt vé ngay / Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
