import React from 'react';
import { ViewMode } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectTier: (tier: 'VIP' | 'Premium' | 'Standard') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectTier }) => {
  const [posterTilt, setPosterTilt] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handlePosterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPosterTilt({ x: x * 14, y: -y * 14 });
  };

  const handlePosterMouseLeave = () => {
    setPosterTilt({ x: 0, y: 0 });
  };

  return (
    <div className="w-full pt-6 pb-24 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Column: Official Poster 2027 Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onMouseMove={handlePosterMouseMove}
            onMouseLeave={handlePosterMouseLeave}
            className="w-full max-w-md p-4 sm:p-5 rounded-3xl glass-panel shadow-xl space-y-4 will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${posterTilt.x}deg) rotateX(${posterTilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Poster Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#1d2b96]/15 bg-white shadow-sm group">
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1d2b96] text-[10px] font-bold tracking-widest uppercase border border-[#1d2b96]/20 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#c0266f]" />
                  OFFICIAL POSTER 2027
                </span>
              </div>

              {/* Poster Image */}
              <img
                src="assets/aistudio/Untitled-2-Recovered_577ab8c9_577ab8c9.png"
                alt="BOATS THE MUSICAL - Official Poster 2027"
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* CTA Book Now Button - Modern & High Impact */}
            <button
              onClick={() => {
                onSelectTier('VIP');
                onNavigate('schedule-and-tickets');
              }}
              className="relative group/cta overflow-hidden w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#000f7b] via-[#1d2b96] to-[#2563eb] text-white font-bold text-sm tracking-wide shadow-xl shadow-[#1d2b96]/25 hover:shadow-2xl hover:shadow-[#1d2b96]/45 active:scale-[0.98] transition-all duration-300 cursor-pointer border border-white/20"
            >
              {/* Animated Light Sweep overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <span className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-white/15 backdrop-blur-xs shadow-xs text-white group-hover/cta:scale-110 transition-transform">
                <span className="material-symbols-outlined text-lg">confirmation_number</span>
              </span>
              <span className="relative uppercase font-black tracking-wider text-base">
                ĐẶT VÉ NGAY
              </span>
              <span className="relative material-symbols-outlined text-xl group-hover/cta:translate-x-1.5 transition-transform duration-200">
                arrow_forward
              </span>
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-between text-[10px] text-[#454653] font-medium pt-1 px-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-600">verified</span>
                Vé chính hãng 100%
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#000f7b]">airline_seat_recline_extra</span>
                Chọn ghế 360°
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-600">bolt</span>
                Xác nhận tức thì
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Heading, Synopsis & Fast Metrics */}
        <div className="lg:col-span-7 space-y-6 pt-2">
          {/* SUBTITLE BADGE: "360° MUSICAL" */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white shadow-xs text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
            <span className="material-symbols-outlined text-sm text-[#1d2b96]">theater_comedy</span>
            <span>360° MUSICAL</span>
          </div>

          {/* LUXURIOUS EDITORIAL TITLE: "BOATS THE MUSICAL" With Running Specular Light Sheen */}
          <div className="pt-1 pb-2">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] select-none luxury-sheen-title"
              style={{ fontFamily: '"Plus Jakarta Sans", "Be Vietnam Pro", sans-serif' }}
            >
              BOATS THE MUSICAL
            </h1>

            {/* Clean, Elegant Subtitle Line Accent */}
            <div className="flex items-center gap-3 mt-2.5">
              <div className="h-[2px] w-8 bg-[#1d2b96]/60 rounded-full" />
              <span
                className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#1d2b96]"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                360° MUSICAL
              </span>
              <div className="h-[1.5px] w-24 bg-[#1d2b96]/20 rounded-full" />
            </div>
          </div>

          {/* Synopsis Card */}
          <div className="reveal-on-scroll p-6 sm:p-7 rounded-3xl glass-panel space-y-3.5 relative">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
              <span className="material-symbols-outlined text-base">menu_book</span>
              <span>TÓM TẮT KỊCH BẢN</span>
            </div>
            <p className="text-sm sm:text-[15px] text-[#454653] leading-relaxed text-justify">
              <strong className="text-[#1b1b22] font-semibold">BOATS THE MUSICAL</strong> là một trải nghiệm nghệ thuật đa giác quan 360 độ, đưa khán giả chìm vào dòng cảm xúc của một người phụ nữ lạc giữa ký ức và mất mát ngoài khơi xa. Trên hành trình dựng lại con thuyền dang dở cùng hình bóng người chồng trong tưởng tượng, ranh giới giữa thực và ảo dần vỡ vụn, buộc nàng đối diện sự thật để học cách buông tay và sống tiếp. Giữa âm nhạc đương đại và điện tử, không gian chuyển động đa hướng cùng sự đồng sáng tạo của cộng đồng bản địa, BOATS mở ra một trải nghiệm sân khấu da diết, sâu sắc về tình người.
            </p>
          </div>

          {/* 3 Metric Summary Cards in a Row */}
          <div className="reveal-on-scroll grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 border border-white/80 bg-white/70 shadow-xs hover:border-[#1d2b96]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1d2b96] shrink-0">
                <span className="material-symbols-outlined text-xl">calendar_today</span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#767684] uppercase tracking-wider block">THỜI GIAN</span>
                <p className="text-xs font-bold text-[#1b1b22] truncate">09/2027 – 11/2027</p>
                <p className="text-[10px] text-[#454653]">Khởi chiếu định kỳ</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 border border-white/80 bg-white/70 shadow-xs hover:border-[#1d2b96]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-[#004e5b] shrink-0">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#767684] uppercase tracking-wider block">ĐỊA ĐIỂM</span>
                <p className="text-xs font-bold text-[#1b1b22] truncate">Rạp Phú Thọ</p>
                <p className="text-[10px] text-[#454653] truncate">Số 3 Lữ Gia, TP.HCM</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 border border-white/80 bg-white/70 shadow-xs hover:border-[#1d2b96]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#7d5700] shrink-0">
                <span className="material-symbols-outlined text-xl">theater_comedy</span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#767684] uppercase tracking-wider block">ĐỊNH DẠNG</span>
                <p className="text-xs font-bold text-[#1b1b22] truncate">Đa giác quan</p>
                <p className="text-[10px] text-[#454653]">360° Kịch • Âm nhạc</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 TRỤ CỘT NGHỆ THUẬT ĐỘT PHÁ */}
      <section className="space-y-8 pt-4">
        <div className="reveal-on-scroll text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1d2b96]">
            TRẢI NGHIỆM ĐỘC BẢN
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1b1b22] tracking-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            3 Trụ Cột Nghệ Thuật Đột Phá
          </h2>
          <p className="text-sm text-[#454653]">
            Hòa quyện giữa công nghệ trình diễn tương lai và bản sắc thủ công bản địa miền duyên hải.
          </p>
        </div>

        <div className="reveal-on-scroll grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl glass-panel space-y-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/80 bg-slate-900 shadow-sm group/img">
                <img
                  src="assets/aistudio/sander-hallaste--WsWcSHw8bU-unsplash_cc28e23e.jpg"
                  alt="Âm nhạc đương đại & Điện tử giao thoa"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Âm thanh phòng thu &amp; Synth
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-100/60 flex items-center justify-center text-[#1d2b96]">
                <span className="material-symbols-outlined text-2xl">graphic_eq</span>
              </div>
              <h3 className="text-lg font-bold text-[#1b1b22] leading-snug">
                Âm nhạc đương đại &amp; Điện tử giao thoa
              </h3>
              <p className="text-xs sm:text-sm text-[#454653] leading-relaxed">
                Sự hòa quyện giữa dàn nhạc cụ mộc mạc mang âm sắc biển đảo cùng lớp âm thanh synth điện tử hiện đại, tạo ra trường cảm xúc tầng tầng lớp lớp đưa tâm tưởng người nghe trôi dạt khôn nguôi.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl glass-panel space-y-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/80 bg-slate-900 shadow-sm group/img">
                <img
                  src="assets/aistudio/48355b194660391.6600368ea6206_15a5d45f.webp"
                  alt="Khán phòng xoay & Sân khấu 360° tương tác đa chiều"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c0266f] animate-pulse" />
                  Khán phòng vòm 360°
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100/60 flex items-center justify-center text-[#7d5700]">
                <span className="material-symbols-outlined text-2xl">crop_free</span>
              </div>
              <h3 className="text-lg font-bold text-[#1b1b22] leading-snug">
                Khán phòng xoay &amp; Sân khấu 360° tương tác đa chiều
              </h3>
              <p className="text-xs sm:text-sm text-[#454653] leading-relaxed">
                Phá vỡ góc nhìn sân khấu hộp truyền thống, khán phòng di động chuyển hướng linh hoạt theo từng cao trào kịch bản, bao bọc khán giả trọn vẹn trong không gian ánh sáng, gió và nước.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl glass-panel space-y-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/80 bg-slate-900 shadow-sm group/img">
                <img
                  src="assets/aistudio/307169893_6137599389-01_98795c11.jpg"
                  alt="Đồng sáng tạo từ nghệ sĩ & thợ thủ công bản địa"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white/90 border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Gỗ mộc &amp; Cánh buồm bản địa
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-100/60 flex items-center justify-center text-[#004e5b]">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>
              <h3 className="text-lg font-bold text-[#1b1b22] leading-snug">
                Đồng sáng tạo từ nghệ sĩ &amp; thợ thủ công bản địa
              </h3>
              <p className="text-xs sm:text-sm text-[#454653] leading-relaxed">
                Từng chi tiết khung thuyền, dây buồm và đạo cụ biểu diễn được đan lát, gọt đẽo từ chính đôi tay của các nghệ nhân làng chài ven biển, thổi hồn văn hóa dân gian chân thực vào sân khấu đỉnh cao.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LỊCH DIỄN CHÍNH THỨC */}
      <section className="reveal-on-scroll glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Info */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
              LỊCH DIỄN CHÍNH THỨC
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#1b1b22] tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Mùa Diễn 09 – 11/2027
            </h2>
            <p className="text-xs sm:text-sm text-[#454653] leading-relaxed">
              Tại Rạp xiếc và Biểu diễn Đa năng Phú Thọ – trung tâm nghệ thuật trình diễn quy mô bậc nhất TP. Hồ Chí Minh với công nghệ âm thanh vòm 360 độ hiện đại.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#454653]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-[#1d2b96] shrink-0">location_on</span>
                <span className="font-semibold text-[#1b1b22]">Số 3 đường Lữ Gia, phường 15, quận 11, TP. HCM</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-emerald-600 shrink-0">local_parking</span>
                <span>Bãi đậu xe rộng rãi có hướng dẫn viên • Cổng soát vé mở 45 phút trước giờ diễn</span>
              </div>
            </div>
          </div>

          {/* Right Schedule Blocks */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1 */}
            <div className="p-5 rounded-2xl bg-white/80 border border-white/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#c6c5d5]/40 pb-2.5">
                <span className="text-xs font-extrabold text-[#1d2b96] uppercase tracking-wider">
                  THỨ TƯ &amp; THỨ NĂM
                </span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  2 Suất / ngày
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/60 border border-amber-200/60">
                  <span className="text-[#454653] font-medium">Suất Sáng</span>
                  <span className="font-bold text-[#1b1b22]">09:00 – 11:00</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50/60 border border-blue-200/60">
                  <span className="text-[#454653] font-medium">Suất Tối</span>
                  <span className="font-bold text-[#1b1b22]">19:30 – 21:30</span>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-5 rounded-2xl bg-white/80 border border-white/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-[#c6c5d5]/40 pb-2.5">
                <span className="text-xs font-extrabold text-[#1d2b96] uppercase tracking-wider">
                  THỨ SÁU – CHỦ NHẬT
                </span>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-full">
                  1 Suất / ngày
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50/60 border border-rose-200/60">
                  <span className="text-[#454653] font-medium">Suất Tối Cuối Tuần</span>
                  <span className="font-bold text-[#1b1b22]">19:30 – 21:30</span>
                </div>
                <div className="p-2 text-[11px] text-[#767684] italic">
                  * Khuyến khích đặt sớm do lượng vé cuối tuần giới hạn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÁC HẠNG VÉ BOATS THE MUSICAL */}
      <section className="reveal-on-scroll space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1d2b96]">
              LỰA CHỌN HẠNG VÉ
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#1b1b22] tracking-tight mt-1"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Các Hạng Vé BOATS The Musical
            </h2>
          </div>
          <button
            onClick={() => onNavigate('schedule-and-tickets')}
            className="text-xs font-bold text-[#1d2b96] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Xem sơ đồ chi tiết khán phòng 360°
            <span className="material-symbols-outlined text-sm">north_east</span>
          </button>
        </div>

        <div className="reveal-on-scroll grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* STANDARD */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel flex flex-col justify-between h-full border border-white hover:shadow-xl transition-all relative">
            <div className="space-y-3.5">
              {/* Badge Slot */}
              <div className="h-7 flex items-center">
                <span className="px-3 py-1 rounded-full bg-[#14b8a6]/15 text-[#0d9488] border border-[#14b8a6]/30 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                  TIÊU CHUẨN
                </span>
              </div>

              {/* Title & Capacity */}
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-xs font-black text-[#14b8a6] uppercase tracking-wider">
                  STANDARD
                </span>
                <span className="text-[10px] font-semibold text-[#767684] bg-white/80 px-2 py-0.5 rounded-full border border-[#c6c5d5]/50">
                  Sức chứa: 1.000
                </span>
              </div>

              {/* Price */}
              <div>
                <span className="text-2xl font-black text-[#14b8a6]">499.000</span>
                <span className="text-xs font-bold text-[#767684] ml-1">VNĐ</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#454653] min-h-[38px] leading-relaxed">
                <strong className="text-[#1b1b22]">Vị trí:</strong> Hai bên và phía sau khán phòng 360°, bao quát trọn vẹn cảnh diễn.
              </p>

              {/* Benefits (4 items) */}
              <ul className="space-y-2 pt-3 border-t border-[#c6c5d5]/30 text-xs text-[#454653]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#14b8a6]">check_circle</span>
                  <span>Ghế ngồi Standard bao quát toàn cảnh 360°</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#14b8a6]">check_circle</span>
                  <span>Hệ thống âm thanh vòm sống động</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#14b8a6]">check_circle</span>
                  <span>Khán phòng điều hòa chuẩn quốc tế</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#14b8a6]">check_circle</span>
                  <span>Hỗ trợ chuyển đổi suất diễn trước 48h</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectTier('Standard');
                onNavigate('schedule-and-tickets');
              }}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold text-xs border border-[#14b8a6] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Chọn Ghế Standard
            </button>
          </div>

          {/* PREMIUM (POPULAR) */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel flex flex-col justify-between h-full border-2 border-[#8b5cf6]/70 shadow-lg hover:shadow-2xl transition-all relative">
            <div className="space-y-3.5">
              {/* Badge Slot */}
              <div className="h-7 flex items-center">
                <span className="px-3 py-1 rounded-full bg-[#8b5cf6] text-white text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm border border-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  PHỔ BIẾN NHẤT
                </span>
              </div>

              {/* Title & Capacity */}
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-xs font-black text-[#8b5cf6] uppercase tracking-wider">
                  PREMIUM
                </span>
                <span className="text-[10px] font-semibold text-[#767684] bg-white/80 px-2 py-0.5 rounded-full border border-[#c6c5d5]/50">
                  Sức chứa: 600
                </span>
              </div>

              {/* Price */}
              <div>
                <span className="text-2xl font-black text-[#8b5cf6]">799.000</span>
                <span className="text-xs font-bold text-[#767684] ml-1">VNĐ</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#454653] min-h-[38px] leading-relaxed">
                <strong className="text-[#1b1b22]">Vị trí:</strong> Khu trung tâm, góc nhìn tốt, hòa mình trọn vẹn vào không gian âm thanh vòm.
              </p>

              {/* Benefits (4 items) */}
              <ul className="space-y-2 pt-3 border-t border-[#c6c5d5]/30 text-xs text-[#454653]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#8b5cf6]">check_circle</span>
                  <span>Ghế ngồi Premium khu vực trung tâm</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#8b5cf6]">check_circle</span>
                  <span>Tầm nhìn lý tưởng &amp; âm thanh vòm tối ưu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#8b5cf6]">check_circle</span>
                  <span>Lối vào ưu tiên (Priority check-in)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#8b5cf6]">check_circle</span>
                  <span>Nước suối &amp; khăn lạnh đón tiếp tại sảnh</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectTier('Premium');
                onNavigate('schedule-and-tickets');
              }}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-xs border border-[#8b5cf6] shadow-md transition-all cursor-pointer active:scale-95"
            >
              Chọn Ghế Premium
            </button>
          </div>

          {/* VIP */}
          <div className="p-6 sm:p-7 rounded-3xl glass-panel flex flex-col justify-between h-full border border-[#c0266f]/40 hover:shadow-xl transition-all relative">
            <div className="space-y-3.5">
              {/* Badge Slot */}
              <div className="h-7 flex items-center">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c0266f] to-[#e11d48] text-white text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm border border-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  CAO CẤP NHẤT
                </span>
              </div>

              {/* Title & Capacity */}
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-xs font-black text-[#c0266f] uppercase tracking-wider">
                  VIP
                </span>
                <span className="text-[10px] font-semibold text-[#767684] bg-white/80 px-2 py-0.5 rounded-full border border-[#c6c5d5]/50">
                  Sức chứa: 400
                </span>
              </div>

              {/* Price */}
              <div>
                <span className="text-2xl font-black text-[#c0266f]">1.299.000</span>
                <span className="text-xs font-bold text-[#767684] ml-1">VNĐ</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#454653] min-h-[38px] leading-relaxed">
                <strong className="text-[#1b1b22]">Vị trí:</strong> Gần sân khấu / vị trí trung tâm tốt nhất với tầm nhìn trực diện hoàn hảo.
              </p>

              {/* Benefits (4 items) */}
              <ul className="space-y-2 pt-3 border-t border-[#c6c5d5]/30 text-xs text-[#454653]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#c0266f]">check_circle</span>
                  <span>Ghế VIP hàng đầu trực diện sân khấu</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#c0266f]">check_circle</span>
                  <span>Lối vào ưu tiên (Priority check-in)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#c0266f]">check_circle</span>
                  <span>01 Official Playbill chính thức</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-[#c0266f]">check_circle</span>
                  <span>01 Limited Bracelet (Vòng tay giới hạn)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectTier('VIP');
                onNavigate('schedule-and-tickets');
              }}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#c0266f] hover:bg-[#a01c59] text-white font-bold text-xs border border-[#c0266f] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Chọn Ghế VIP
            </button>
          </div>
        </div>
      </section>

      {/* 5. CỬA HÀNG LƯU NIỆM BANNER */}
      <section
        className="reveal-on-scroll glass-panel p-6 sm:p-8 rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 25px 50px -18px rgba(29, 43, 150, 0.08)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d2b96]">
              CỬA HÀNG LƯU NIỆM
            </span>
            <h3
              className="text-xl sm:text-2xl font-extrabold text-[#1b1b22] tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Khám Phá Merchandise Bản Giới Hạn
            </h3>
            <p className="text-xs sm:text-sm text-[#454653] leading-relaxed">
              Lưu giữ kỷ niệm với đĩa nhạc Vinyl độc bản, áo thun nghệ thuật in thủ công, sổ ký họa và các sản phẩm chế tác từ gỗ thuyền truyền thống.
            </p>
          </div>

          <button
            onClick={() => onNavigate('merchandise')}
            className="inline-flex items-center justify-center gap-2.5 py-3 px-6 rounded-2xl border-2 border-[#1d2b96] bg-white text-[#1d2b96] hover:bg-[#1d2b96] hover:text-white font-bold text-sm transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">storefront</span>
            <span>Ghé thăm Cửa hàng BOATS</span>
          </button>
        </div>
      </section>
    </div>
  );
};
