import { create } from 'zustand';

type BookingState = {
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  clearBooking: () => void;
};

export const useBookingStore = create<BookingState>(set => ({
  selectedSeats: [],

  setSelectedSeats: seats =>
    set({
      selectedSeats: seats,
    }),

  clearBooking: () =>
    set({
      selectedSeats: [],
    }),
}));