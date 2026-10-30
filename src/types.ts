/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewMode = 'home' | 'schedule-and-tickets' | 'merchandise';
export type BookingStep = 1 | 2 | 3;

export interface ShowDate {
  id: string;
  dayOfWeek: string;
  dayMonth: string;
  dateStr: string;
  badge: string;
  badgeColor: string;
}

export interface ShowTime {
  id: string;
  timeRange: string;
  tag: string;
  tagType: 'morning' | 'afternoon' | 'evening';
  notes: string;
}

export interface Seat {
  id: string;
  row: string;
  number: string;
  tier: 'VIP' | 'Premium' | 'Standard';
  price: number;
  priceFormatted: string;
  status: 'available' | 'selected' | 'sold';
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  shippingMethod?: 'pickup' | 'delivery';
  note?: string;
}

export interface CartItem {
  id: string;
  type: 'ticket' | 'merch';
  title: string;
  subtitle?: string;
  price: number;
  priceFormatted: string;
  quantity: number;
  image?: string;
  seatId?: string;
}

export interface MerchProduct {
  id: string;
  title: string;
  subtitle: string;
  category: 'fashion' | 'bags' | 'jewelry' | 'prints';
  price: number;
  priceFormatted: string;
  description: string;
  badge: string;
  badgeColor?: string;
  frontImage: string;
  backImage?: string;
  frontLabel?: string;
  backLabel?: string;
  specialActionType: 'add_to_cart' | 'internal_only' | 'complimentary' | 'included_with_ticket' | 'checkin_item';
  specialBadgeText?: string;
}
