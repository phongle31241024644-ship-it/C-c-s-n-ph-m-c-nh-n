import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full mt-16 shadow-[0_-1px_16px_rgba(29,43,150,0.03)]"
      style={{
        background: 'rgba(245, 242, 252, 0.75)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 -4px 30px rgba(29, 43, 150, 0.03)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
          {/* Col 1 */}
          <div className="md:col-span-5 flex flex-col space-y-3">
            <span
              className="text-3xl font-extrabold text-[#1d2b96] tracking-tight leading-none"
              style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif' }}
            >
              BOATS
            </span>
            <p className="text-[11px] uppercase tracking-widest text-[#454653] font-semibold">
              Vở nhạc kịch đa giác quan 360°
            </p>
            <p className="text-sm text-[#454653] max-w-sm pt-1 leading-relaxed">
              Hành trình nghệ thuật sân khấu đương đại đắm chìm trong âm hưởng đại dương, công nghệ trình chiếu không gian ba chiều và biểu diễn xiếc kịch quốc tế.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-4 flex flex-col space-y-2.5">
            <h4 className="text-xs font-bold text-[#1d2b96] uppercase tracking-wider mb-1">
              Địa điểm &amp; Liên hệ
            </h4>
            <div className="flex items-start gap-2 text-[#454653] text-sm">
              <span className="material-symbols-outlined text-[18px] text-[#1d2b96] shrink-0 mt-0.5">
                location_on
              </span>
              <p className="leading-snug">
                Rạp xiếc và Biểu diễn Đa năng Phú Thọ<br />
                Số 3 đường Lữ Gia, phường 15, quận 11, TP. Hồ Chí Minh
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#454653] text-sm pt-1">
              <span className="material-symbols-outlined text-[18px] text-[#1d2b96] shrink-0">
                call
              </span>
              <p className="font-medium text-[#1b1b22]">
                Hotline: 1900 6868 / (+84) 28 3865 4321
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#454653] text-sm">
              <span className="material-symbols-outlined text-[18px] text-[#1d2b96] shrink-0">
                mail
              </span>
              <p>tickets@boatsthemusical.vn</p>
            </div>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-3 flex flex-col space-y-2.5">
            <h4 className="text-xs font-bold text-[#1d2b96] uppercase tracking-wider mb-1">
              Kết nối với chúng tôi
            </h4>
            <p className="text-sm text-[#454653] leading-relaxed">
              Theo dõi hậu trường và các ưu đãi sớm nhất của vở diễn.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-[#efecf6] flex items-center justify-center text-[#454653] hover:bg-[#1d2b96] hover:text-white transition-colors"
                title="Website & Facebook"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                href="#trailer"
                className="w-9 h-9 rounded-full bg-[#efecf6] flex items-center justify-center text-[#454653] hover:bg-[#1d2b96] hover:text-white transition-colors"
                title="Trailer & Video"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-[#efecf6] flex items-center justify-center text-[#454653] hover:bg-[#1d2b96] hover:text-white transition-colors"
                title="Hình ảnh hậu trường"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 rounded-2xl p-4 mt-4 border border-white/80">
          <p className="text-xs text-[#454653]">
            © 2027 BOATS THE MUSICAL Production. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#454653]">
            <button className="hover:text-[#1b1b22] transition-colors cursor-pointer">
              Điều khoản vé
            </button>
            <button className="hover:text-[#1b1b22] transition-colors cursor-pointer">
              Chính sách bảo mật
            </button>
            <button className="hover:text-[#1b1b22] transition-colors cursor-pointer">
              Quy định khán phòng
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
