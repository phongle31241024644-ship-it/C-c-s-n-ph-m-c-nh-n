/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { InteractiveMouseEffect } from './components/InteractiveMouseEffect';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { TicketSuccessModal } from './components/TicketSuccessModal';
import { HomeView } from './views/HomeView';
import { BookingStep1View } from './views/BookingStep1View';
import { BookingStep2View } from './views/BookingStep2View';
import { BookingStep3View } from './views/BookingStep3View';
import { MerchandiseView } from './views/MerchandiseView';
import { INITIAL_SEATS, SHOW_TIMES } from './data/mockData';
import { BookingStep, CartItem, CustomerInfo, MerchProduct, Seat, ShowDate, ShowTime, ViewMode } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);

  // No date or time pre-selected initially - user operates step 1 freely
  const [selectedDate, setSelectedDate] = useState<ShowDate | null>(null);
  const [selectedTime, setSelectedTime] = useState<ShowTime | null>(null);

  const [seats, setSeats] = useState<Seat[]>(INITIAL_SEATS);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    shippingMethod: 'pickup',
    note: '',
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Merch & ticket cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global reveal-on-scroll effect across all views and steps
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
        threshold: 0.08,
        rootMargin: '0px 0px -25px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [currentView, bookingStep]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Recalculate discount based on selected seats and coupon
  const updateDiscount = (currentSeats: Seat[], code: string) => {
    const selected = currentSeats.filter((s) => s.status === 'selected');
    const subtotal = selected.reduce((sum, s) => sum + s.price, 0);

    if (code === 'EARLYBIRD10') {
      setDiscountAmount(Math.round(subtotal * 0.1));
    } else if (code === 'BOATSVIP') {
      setDiscountAmount(Math.round(subtotal * 0.15));
    } else if (code === 'STUDENT50') {
      setDiscountAmount(Math.round(subtotal * 0.2));
    } else {
      setDiscountAmount(0);
    }
  };

  // Seat toggle handler
  const handleToggleSeat = (seatId: string) => {
    setSeats((prev) => {
      const updated = prev.map((seat) => {
        if (seat.id === seatId) {
          if (seat.status === 'sold') return seat;
          const nextStatus = seat.status === 'selected' ? 'available' : 'selected';
          return { ...seat, status: nextStatus as 'available' | 'selected' };
        }
        return seat;
      });

      // Synchronize tickets in cartItems
      const targetSeat = updated.find((s) => s.id === seatId);
      if (targetSeat) {
        if (targetSeat.status === 'selected') {
          const dateStr = selectedDate?.dateStr || 'Thứ Sáu, 22/10/2027';
          const timeRange = selectedTime?.timeRange || '19:30 - 21:30';
          setCartItems((prevItems) => {
            if (prevItems.some((i) => i.seatId === seatId)) return prevItems;
            return [
              ...prevItems,
              {
                id: `ticket-${seatId}`,
                type: 'ticket',
                title: `Vé ${targetSeat.tier} BOATS The Musical - Ghế ${seatId}`,
                subtitle: `${dateStr} • ${timeRange}`,
                price: targetSeat.price,
                priceFormatted: targetSeat.priceFormatted,
                quantity: 1,
                seatId,
              },
            ];
          });
          showToast(`Đã chọn ghế ${seatId}`);
        } else {
          setCartItems((prevItems) => prevItems.filter((i) => i.seatId !== seatId));
          showToast(`Đã hủy chọn ghế ${seatId}`);
        }
      }

      updateDiscount(updated, couponCode);
      return updated;
    });
  };

  // Auto-pick best seats handler
  const handleAutoPickSeats = () => {
    setSeats((prev) => {
      // Find 2 available VIP or Premium seats
      const availableVip = prev.filter((s) => s.tier === 'VIP' && s.status === 'available');
      const pickList =
        availableVip.length >= 2
          ? availableVip.slice(0, 2)
          : prev.filter((s) => s.status === 'available').slice(0, 2);

      if (pickList.length === 0) {
        showToast('Không tìm thấy ghế trống phù hợp');
        return prev;
      }

      const pickIds = new Set(pickList.map((p) => p.id));
      const updated = prev.map((seat) => {
        if (pickIds.has(seat.id)) {
          return { ...seat, status: 'selected' as const };
        }
        return seat;
      });

      const dateStr = selectedDate?.dateStr || 'Thứ Sáu, 22/10/2027';
      const timeRange = selectedTime?.timeRange || '19:30 - 21:30';

      // Update cart items
      setCartItems((prevItems) => {
        const withoutOldTickets = prevItems.filter((i) => i.type !== 'ticket');
        const newTicketItems: CartItem[] = updated
          .filter((s) => s.status === 'selected')
          .map((s) => ({
            id: `ticket-${s.id}`,
            type: 'ticket',
            title: `Vé ${s.tier} BOATS The Musical - Ghế ${s.id}`,
            subtitle: `${dateStr} • ${timeRange}`,
            price: s.price,
            priceFormatted: s.priceFormatted,
            quantity: 1,
            seatId: s.id,
          }));
        return [...withoutOldTickets, ...newTicketItems];
      });

      updateDiscount(updated, couponCode);
      showToast(`Đã tự động chọn các ghế tốt nhất: ${Array.from(pickIds).join(', ')}`);
      return updated;
    });
  };

  // Tier selection from Home routes to Step 1
  const handleSelectTierFromHome = (_tier: 'VIP' | 'Premium' | 'Standard') => {
    setCurrentView('schedule-and-tickets');
    setBookingStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add merchandise product to cart
  const handleAddMerchToCart = (product: MerchProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          type: 'merch',
          title: product.title,
          subtitle: product.subtitle,
          price: product.price,
          priceFormatted: product.priceFormatted,
          quantity: 1,
          image: product.frontImage,
        },
      ];
    });
    showToast(`Đã thêm vào giỏ hàng: ${product.title}`);
  };

  // Add Combo to cart
  const handleAddComboToCart = () => {
    setCartItems((prev) => {
      const comboId = 'combo-hai-trinh-boats';
      const existing = prev.find((i) => i.id === comboId);
      if (existing) {
        return prev.map((i) => (i.id === comboId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: comboId,
          type: 'merch',
          title: 'Gói Sưu Tầm Trọn Vẹn "Hải Trình BOATS"',
          subtitle: 'Combo 4 Món: Áo T-shirt + Túi Tote + Vòng Tay Hạt + Postcard Set',
          price: 490000,
          priceFormatted: '490.000 VNĐ',
          quantity: 1,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDpK4FWTcVBluvKbUSKo5XivYTQsZTJfQO6Jh8EybTi4UX3z5qDBqtq5d5Old41phQk0TmOZVzDCIahki0gmkR5HhF-kIR_zxyexRWPi2yry11zBcibiYPyagrVkXTDZboge-D7bk2DuYtcunVParhx9Sb9hAg1tO3Bg9qGQrsJaZNApTmy3IbJNnhjmOkWjFnTiRrsPk-HTr-hpbjuyti0wvE4LM4m0lw435P7X6pUHRUVPN-dvihiA0x7uJTcR-lITw',
        },
      ];
    });
    showToast('Đã thêm Gói Sưu Tầm Trọn Vẹn vào giỏ hàng');
  };

  // Remove item from cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => {
      const removed = prev.find((i) => i.id === id);
      if (removed && removed.seatId) {
        setSeats((curr) => curr.map((s) => (s.id === removed.seatId ? { ...s, status: 'available' } : s)));
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  // Update quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);
    updateDiscount(seats, code);
    if (code === 'EARLYBIRD10' || code === 'BOATSVIP' || code === 'STUDENT50') {
      showToast(`Đã áp dụng mã ưu đãi ${code}!`);
    } else {
      showToast('Mã ưu đãi không hợp lệ');
    }
  };

  // Direct fast jump from Step 1 to Step 2 for Friday, Saturday, Sunday
  const handleAutoProceedToStep2 = (date: ShowDate, time: ShowTime) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setBookingStep(2);
    showToast(`Đã tự động chọn suất tối ${date.dayOfWeek} (${date.dayMonth}) và chuyển sang Bước 2!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const selectedSeats = seats.filter((s) => s.status === 'selected');

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-[#1d2b96] selection:text-white">
      {/* Background glow effects & Interactive Motion Canvas */}
      <AmbientBackground />
      <InteractiveMouseEffect />

      {/* Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'schedule-and-tickets') {
            setBookingStep(1);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        onToggleLang={(l) => setLang(l)}
      />

      {/* Main Views */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <HomeView
            onNavigate={(view) => {
              setCurrentView(view);
              if (view === 'schedule-and-tickets') setBookingStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectTier={handleSelectTierFromHome}
          />
        )}

        {/* Step 1: Chọn Suất & Ngày Diễn */}
        {currentView === 'schedule-and-tickets' && bookingStep === 1 && (
          <BookingStep1View
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
            selectedTime={selectedTime}
            onSelectTime={(t) => setSelectedTime(t)}
            onProceedToStep2={() => {
              setBookingStep(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAutoProceedToStep2={handleAutoProceedToStep2}
          />
        )}

        {/* Step 2: Chọn Vị Trí Ghế Ngồi 360° */}
        {currentView === 'schedule-and-tickets' && bookingStep === 2 && (
          <BookingStep2View
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onBackToStep1={() => {
              setBookingStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            seats={seats}
            onToggleSeat={handleToggleSeat}
            onAutoPickSeats={handleAutoPickSeats}
            customerInfo={customerInfo}
            onChangeCustomerInfo={(info) => setCustomerInfo((prev) => ({ ...prev, ...info }))}
            couponCode={couponCode}
            onApplyCoupon={handleApplyCoupon}
            discountAmount={discountAmount}
            cartItems={cartItems}
            onProceedToStep3={() => {
              setBookingStep(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Step 3: Thông Tin & Thanh Toán */}
        {currentView === 'schedule-and-tickets' && bookingStep === 3 && (
          <BookingStep3View
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
            customerInfo={customerInfo}
            onChangeCustomerInfo={(info) => setCustomerInfo((prev) => ({ ...prev, ...info }))}
            discountAmount={discountAmount}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onAddMerchToCart={handleAddMerchToCart}
            onBackToStep2={() => {
              setBookingStep(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteBooking={() => setIsSuccessModalOpen(true)}
            onNavigateToMerch={() => {
              setCurrentView('merchandise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Merchandise View */}
        {currentView === 'merchandise' && (
          <MerchandiseView
            onAddToCart={handleAddMerchToCart}
            onAddCombo={handleAddComboToCart}
            onNavigate={(view) => {
              setCurrentView(view);
              if (view === 'schedule-and-tickets') setBookingStep(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
          setCurrentView('schedule-and-tickets');
          setBookingStep(3);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Ticket Success Confirmation Modal */}
      <TicketSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        selectedSeats={selectedSeats}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        customerInfo={customerInfo}
        cartItems={cartItems}
        discountAmount={discountAmount}
        onReturnHome={() => {
          setCurrentView('home');
          setBookingStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 transition-all duration-300 animate-bounce">
          <div className="p-4 rounded-2xl bg-[#1d2b96] text-white shadow-2xl flex items-center gap-3.5 border border-white/20">
            <span className="material-symbols-outlined text-[#fdc662] text-xl">check_circle</span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
