/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MerchProduct, Seat, ShowDate, ShowTime } from '../types';

export const SHOW_DATES: ShowDate[] = [
  {
    id: 'd1',
    dayOfWeek: 'Thứ Tư',
    dayMonth: '20 Th10',
    dateStr: 'Thứ Tư, 20/10/2027',
    badge: '1 Suất Tối',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200/60',
  },
  {
    id: 'd2',
    dayOfWeek: 'Thứ Năm',
    dayMonth: '21 Th10',
    dateStr: 'Thứ Năm, 21/10/2027',
    badge: '1 Suất Tối',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200/60',
  },
  {
    id: 'd3',
    dayOfWeek: 'Thứ Sáu',
    dayMonth: '22 Th10',
    dateStr: 'Thứ Sáu, 22/10/2027',
    badge: 'Sáng & Chiều',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200/60',
  },
  {
    id: 'd4',
    dayOfWeek: 'Thứ Bảy',
    dayMonth: '23 Th10',
    dateStr: 'Thứ Bảy, 23/10/2027',
    badge: 'Sáng & Chiều • Hot',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200/60',
  },
  {
    id: 'd5',
    dayOfWeek: 'Chủ Nhật',
    dayMonth: '24 Th10',
    dateStr: 'Chủ Nhật, 24/10/2027',
    badge: 'Sáng & Chiều',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200/60',
  },
];

export const SHOW_TIMES: ShowTime[] = [
  {
    id: 't-morning',
    timeRange: '09:30 - 11:30',
    tag: 'Suất Sáng',
    tagType: 'morning',
    notes: 'Đón khách từ 08:45 • Còn 42 ghế trống',
  },
  {
    id: 't-afternoon',
    timeRange: '14:30 - 16:30',
    tag: 'Suất Chiều',
    tagType: 'afternoon',
    notes: 'Đón khách từ 13:45 • Còn 28 ghế trống',
  },
  {
    id: 't-evening',
    timeRange: '19:30 - 21:30',
    tag: 'Suất Tối',
    tagType: 'evening',
    notes: 'Đón khách từ 18:45 • Còn 18 ghế trống',
  },
];

export const INITIAL_SEATS: Seat[] = [
  // VIP Row V
  { id: 'V01', row: 'V', number: '01', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'sold' },
  { id: 'V02', row: 'V', number: '02', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'sold' },
  { id: 'V03', row: 'V', number: '03', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },
  { id: 'V04', row: 'V', number: '04', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },
  { id: 'V05', row: 'V', number: '05', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },
  { id: 'V06', row: 'V', number: '06', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },
  { id: 'V07', row: 'V', number: '07', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },
  { id: 'V08', row: 'V', number: '08', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'sold' },
  { id: 'V09', row: 'V', number: '09', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },
  { id: 'V10', row: 'V', number: '10', tier: 'VIP', price: 1299000, priceFormatted: '1.299.000đ', status: 'available' },

  // Premium Row A
  { id: 'A01', row: 'A', number: '01', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },
  { id: 'A02', row: 'A', number: '02', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },
  { id: 'A03', row: 'A', number: '03', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'sold' },
  { id: 'A04', row: 'A', number: '04', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },
  { id: 'A05', row: 'A', number: '05', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },
  { id: 'A06', row: 'A', number: '06', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },
  { id: 'A07', row: 'A', number: '07', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'sold' },
  { id: 'A08', row: 'A', number: '08', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'sold' },
  { id: 'A09', row: 'A', number: '09', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },
  { id: 'A10', row: 'A', number: '10', tier: 'Premium', price: 799000, priceFormatted: '799.000đ', status: 'available' },

  // Standard Row G
  { id: 'G01', row: 'G', number: '01', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G02', row: 'G', number: '02', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G03', row: 'G', number: '03', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G04', row: 'G', number: '04', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'sold' },
  { id: 'G05', row: 'G', number: '05', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G06', row: 'G', number: '06', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G07', row: 'G', number: '07', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G08', row: 'G', number: '08', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
  { id: 'G09', row: 'G', number: '09', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'sold' },
  { id: 'G10', row: 'G', number: '10', tier: 'Standard', price: 499000, priceFormatted: '499.000đ', status: 'available' },
];

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'm1',
    title: 'Áo T-shirt BOATS Official',
    subtitle: 'Áo phông kỷ niệm chính thức',
    category: 'fashion',
    price: 300000,
    priceFormatted: '300.000 VNĐ',
    description: 'Chất cotton 100% 260gsm dệt ống cao cấp. Mặt trước in logo BOATS tối giản bên ngực trái, mặt sau in đồ họa con thuyền rẽ sóng Ultramarine.',
    badge: 'BESTSELLER · SỐ LƯỢNG 200',
    badgeColor: 'bg-[#ffdeaa] text-[#271900]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8d61_GRtOcs89gQamoYGU5sixqQVr4sOTzA_xr20MpZUSCOqcOBRwuiwSMm41ZyXT7nFwPdcwRIPEQTx3UNcWOaXnuaTYhsxJCcI_LGjk0JOtGfcJSwrkz05kQ4G-t3cyNCT8cH_8oueBDoqEkBoQHmP1zsHwbFcmOaY2o_iOs0zH3Y5bEMoh7VXznNMQ1YjeHHgn_8Fx1r_kUor9Ii7Lk0mo9tmDqxo7NBjZ4K-0-MP9J3_5xsirdho1saLy1j8tsg',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7SoN2TZfX8eMqXwwc_LG1Klsnsk5sveSBL3so0I4urc3FPW-Bn6FDeVqMHlOo5Ks5bIlP0cVKY7_wCn_dTShkYvuENkZLaaYF124OoKIMDpmBES2X0FVl-GWj1oUJtpEFxyqiOIa-MFHJCPJ54ENJaDxt2HsdIC9u6kEYTJaXYVr7ufu11eF6zuk5Y9xCLRQ1E7svZuW2HmAPcOB5jI7x3l8GZSev-FNeOP84-eCBYetxfDPzRQ3jXJJhTFtnZo43kA',
    frontLabel: 'Mặt trước',
    backLabel: 'Mặt sau',
    specialActionType: 'add_to_cart',
  },
  {
    id: 'm2',
    title: 'Áo Phông BTC INTERPLAY',
    subtitle: 'Đồng phục Ban Tổ Chức',
    category: 'fashion',
    price: 0,
    priceFormatted: 'Dành riêng cho BTC',
    description: 'Phiên bản đen tuyền giới hạn cho Ban tổ chức và Ekip sản xuất. Mặt trước in typographic Interplay tối giản, mặt sau in typo ORGANIZER khối nổi.',
    badge: 'ẤN PHẨM NỘI BỘ',
    badgeColor: 'bg-[#e3e1eb] text-[#1b1b22]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6oiAUpRmQQWrL4vbFKEfOi7POYxdhZGnMkf4kxJ_GMrXv6mZCf_NyJH79LdjE5k-JkbNXzhu1KCXN8IYuvTxCsg55q6IuBnCVEhE_En5DxaINietCuKz6GKpbUkLp5p1RhP6WDXK1h0Kj-tDv5sgOSgG8hZYWkGhP7nUz1tiJxQhyD0dyJlXlBvlRPCeaXJuAoEZ-6GxKKNiPXYWa0ppISzxlBLgIpMz2_9NkL0v0D81OwS8ffCEc2rsxvA7TcI129Q',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjdehD1g1YSwxDFOWq3iOmW2YDeyp4Wmh_ADGaSvqd5Qh131HXrh8vH8ipzopgF5Pb9m8UK2dkwTDZpnvj_k7jkgjbLdAESnRo1_bY_qAmqLB3vF8H3UJZ5U3Bv_bUHgDp4u_zz7vg24Q9vp-sHe-5bbcAP0N2N9G-8XzsQC7kEhl0b1TpcwEzsBFHIK3WTffppLHcjCI0OKUoY6ywhPn2U0lscihGHlXMGHAnrirj87dAkAk18lX1xbrvcxaQqODY_A',
    frontLabel: 'Mặt trước',
    backLabel: 'Mặt sau',
    specialActionType: 'internal_only',
  },
  {
    id: 'm3',
    title: 'Túi Tote Canvas BOATS The Musical',
    subtitle: 'Túi vải canvas cao cấp',
    category: 'bags',
    price: 100000,
    priceFormatted: '100.000 VNĐ',
    description: 'Vải canvas mộc dệt dày dặn, quai xanh coban biển sâu. Mặt A in tranh thủy ấn con thuyền rẽ sóng nghệ thuật, mặt B in typography BOATS thẳng đứng tinh xảo.',
    badge: 'BESTSELLER · SỐ LƯỢNG 250',
    badgeColor: 'bg-[#a6eeff] text-[#001f25]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpK4FWTcVBluvKbUSKo5XivYTQsZTJfQO6Jh8EybTi4UX3z5qDBqtq5d5Old41phQk0TmOZVzDCIahki0gmkR5HhF-kIR_zxyexRWPi2yry11zBcibiYPyagrVkXTDZboge-D7bk2DuYtcunVParhx9Sb9hAg1tO3Bg9qGQrsJaZNApTmy3IbJNnhjmOkWjFnTiRrsPk-HTr-hpbjuyti0wvE4LM4m0lw435P7X6pUHRUVPN-dvihiA0x7uJTcR-lITw',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6tGQxcyf1E2acXE2VEXrE3eaKlSx4oel92AdzBLosoHKKcFV1PTO7VtWeWFn_Ml6sMgeDGUqtmptSxYXh3P5mc104toH2eA751vg_U2PnyIyR0jVGv13Wne1tsrt_mo3mrRFhoRbnTVLgOvFuVt7KKxM4OEPtfO2LYHmLxOVHEHUe5bIYVydHEPnzGK6-il1f-B6ZJs9RA1mCOFLYcn6ShuwJftGoYbxnTL0ZF9vxBAV3sKljbhG-lMxO2nMXlOSUKA',
    frontLabel: 'Mặt thuyền',
    backLabel: 'Mặt chữ',
    specialActionType: 'add_to_cart',
  },
  {
    id: 'm4',
    title: 'Túi Giấy Quà Tặng Paper Bag BOATS',
    subtitle: 'Túi giấy đựng quà tặng',
    category: 'bags',
    price: 0,
    priceFormatted: 'Tặng kèm mọi đơn mua Merchandise',
    description: 'Túi giấy kraft trắng nghệ thuật dập nổi biểu trưng con thuyền, quai xoắn cotton dẻo dai cao cấp.',
    badge: 'BAO BÌ TẶNG KÈM',
    badgeColor: 'bg-[#fdc662] text-[#755100]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDarmLII2SRBIVuYi047EecUJX0OkPtWL06343BaZrgbeTw7cRnLxlO0gaQ7zeOcCZLvn2BdUgD6yjGB7xXmh2899ulqawBuy2KEtsRgkxBRMRQSbO82eF2wAT6Xz2rofPKl0l5gNK-8NbvfoG69QFz8S-YQrgsmaXdRBWuXhR8-55sSqbX-SNN5ZUYOIPXKnc-lIjkQOyjaCEQ5A0oz0G6cUmc5cHYc8vK2_l7mzE4-70vxH5Eokk4er27U2qkBJjm5g',
    specialActionType: 'complimentary',
    specialBadgeText: 'Bao bì tặng kèm',
  },
  {
    id: 'm5',
    title: 'Vòng Tay Hạt Chuỗi Đá Xanh BOATS',
    subtitle: 'Vòng tay hạt lưu niệm',
    category: 'jewelry',
    price: 120000,
    priceFormatted: '120.000 VNĐ',
    description: 'Hạt đá phong cách đại dương xanh thẫm kết hợp charm khắc laser logo BOATS 2027 độc bản.',
    badge: 'SỐ LƯỢNG 300',
    badgeColor: 'bg-[#ffdeaa] text-[#271900]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD61djpB-2vBzqo5DQm6mCTOC9A29pF6u-lHxjmFwSCQzpN_pxs37CMwRuPAZdAHRMrgDmBOx9muF6EO0SW7xtuIl27NstOk0Z8en2SAt8i36sySzsUxBK4Pghl70Yi2HwYLvUVk8b7INzKtM9_TCamCQWA3EtyLjqQdtfMezAGxyxZfTQbuxkMnd8zaR_oGNm33CLKgrELbyuK7tQpyKHimVg7nTvO2mM5seqSGKZ1dSvP9bySsNAIms__1SW-KVmutg',
    specialActionType: 'add_to_cart',
  },
  {
    id: 'm6',
    title: 'Bộ Vòng Tay Vải Lụa Check-in 3 Hạng Ghế',
    subtitle: 'Vòng tay check-in vào rạp',
    category: 'jewelry',
    price: 0,
    priceFormatted: 'Tặng kèm theo vé rạp',
    description: 'Trọn bộ 3 vòng tay vải lụa thêu hoa văn cổ điển (VIP, Premium, Standard) kèm khóa thông minh chống tái sử dụng.',
    badge: 'VÒNG CHECK-IN RẠP',
    badgeColor: 'bg-white/90 text-[#000f7b]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSgbGSdPTcOCWDD8oaKNTjHj3kkxab8cNNyF1Fn8dzJsRNNhSgApehkQWj8MOfsZ07fMfh9lv6IthwX0kr0ekYYn0enNrZkfhxQx999JxE2Bettd0lOsLxnkkZL-CCZFEKnHQbzY_kLC3ovaPxSaI-alWkVE-WdTsz2o3mun7gUKA_ezaJ7Z_en7vIChlzVr1qKF8QhiLd2BBy6EQ9jUn6hHCEXIq1rdueFsMGqtZrRQI5C2fWK1IAKUUAHE25FHADlw',
    specialActionType: 'checkin_item',
    specialBadgeText: 'Phát tại cửa rạp',
  },
  {
    id: 'm7',
    title: 'Vé Cứng Sưu Tầm Nghệ Thuật',
    subtitle: 'Vé lưu niệm in mỹ thuật',
    category: 'prints',
    price: 0,
    priceFormatted: 'Kèm khi đặt vé vật lý',
    description: 'Vé in offset trên giấy mỹ thuật định lượng 350gsm, ép kim xanh dương, dập nổi barcode và kèm phong bì đựng độc quyền.',
    badge: "VÉ SƯU TẦM",
    badgeColor: 'bg-[#dfe0ff] text-[#000f7b]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkB3GMBkSgr-B2qI7N8s2sLaM0XQ3025AgiuKeKyWxZ4NCyuJrNuAeEyX8rfOrJjR7RGAaTTwz-ekU2fTjQg3x-dT1-eyH_xWb1I76mlERVCEr4XV3fJfC2IlKWCmBdLwsGYt03IIT1FTpCfjwXyG-Z2f47JBM_GD9a0TvPTEpdNzf0PI-DIID4D8Nf_PsxG--Qv3YKyeDk5DuyBpKN8cc2qB0kXC8XKcHpRGnzBwceL2Rn9PK77G9utXm-ZdUbNw_Pg',
    specialActionType: 'included_with_ticket',
  },
  {
    id: 'm8',
    title: 'Postcard Set BOATS The Musical',
    subtitle: 'Bộ 4 bưu thiếp nghệ thuật',
    category: 'prints',
    price: 50000,
    priceFormatted: '50.000 VNĐ',
    description: 'Trọn bộ 4 postcard in offset mỹ thuật 350gsm tái hiện 4 hồi kịch kinh điển và ký họa con thuyền rẽ sóng độc quyền.',
    badge: 'BÁN CHẠY · SỐ LƯỢNG 400',
    badgeColor: 'bg-[#fdc662] text-[#755100]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHo8wSTcgy-QYCTWXUGUJkWE7cJ_hLwS2D1beDl_LHgYRRuj6nJfx2zM-mH5FqabUSLrLPS_33fQpwMz7a7MVi3QJ6XZT8WKHHsClGy-RZ0Yc686vnMqyf6x6v_tP-wB37baDst5gi6aBWf5ISB3HeAtX6yvkmctqmcRpgid-g9oDfHsNHNLYdi2QhFxKGVtml3R-wrsJ_HN8pG6VbDUYySzvdy1qtFcXNhcd5PNGBvtoyR3d5mLlQwMMmHPLPuuZ8KA',
    specialActionType: 'add_to_cart',
  },
  {
    id: 'm9',
    title: 'Thẻ Đeo Ban Tổ Chức (BTC Lanyard Pass)',
    subtitle: 'Thẻ đeo Ban Tổ Chức & Ekip',
    category: 'prints',
    price: 0,
    priceFormatted: 'Dành riêng cho BTC',
    description: 'Thẻ nhựa cứng phủ mờ chống xước phong cách tối giản thanh lịch, kèm dây đeo dệt mật độ cao và móc hợp kim dành cho thành viên Ban Tổ Chức.',
    badge: 'THẺ BAN TỔ CHỨC',
    badgeColor: 'bg-[#e3e1eb] text-[#1b1b22]',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNdkMLOW6TWGZBpHJ35QWPHRJvk2xATkhydiL363WkN0a24BAZOfr1tU8HSgEX3loqGMJlm5wJ5NSvDen7ugbghNCfP2kRsQ5x25SvroVN29Tb5CmHzLAeKKxAY5MRffTDW2jVw85rjNAdmUF2yPo2x6FKxORc14RjZUN1iCu1CXGulR7eBrlca90Lhq9dON5rUJ6YZFiMLcn25_9zu3OtIFIt3N9J4MYSDPuqK5awwPprm58EU0SCISB5_0ClD1f6Jg',
    specialActionType: 'internal_only',
  },
];

export interface MerchProjectionItem {
  name: string;
  quantity: number;
  price: number;
  priceFormatted: string;
  grossRevenue: number;
  grossRevenueFormatted: string;
}

export const MERCH_PROJECTION_DATA: MerchProjectionItem[] = [
  {
    name: 'Túi Tote',
    quantity: 250,
    price: 100000,
    priceFormatted: '100.000đ',
    grossRevenue: 25000000,
    grossRevenueFormatted: '25.000.000đ',
  },
  {
    name: 'Vòng tay hạt',
    quantity: 300,
    price: 120000,
    priceFormatted: '120.000đ',
    grossRevenue: 36000000,
    grossRevenueFormatted: '36.000.000đ',
  },
  {
    name: 'Áo T-shirt',
    quantity: 200,
    price: 300000,
    priceFormatted: '300.000đ',
    grossRevenue: 60000000,
    grossRevenueFormatted: '60.000.000đ',
  },
  {
    name: 'Postcard Set',
    quantity: 400,
    price: 50000,
    priceFormatted: '50.000đ',
    grossRevenue: 20000000,
    grossRevenueFormatted: '20.000.000đ',
  },
];

export const TOTAL_MERCH_PROJECTION = {
  totalQuantity: 1150,
  totalGrossRevenue: 141000000,
  totalGrossRevenueFormatted: '141.000.000đ',
};
