import { create } from "zustand";

type CartStore = {
  cartDetail: number;
  refreshCart: boolean;
  setCartDetail: (value: number) => void;
  setRefreshCart: (value: boolean) => void;
  incrementCartDetail: (value: number) => void; 
};

const useCartStore = create<CartStore>((set) => ({
  cartDetail: 0,
  refreshCart: false,
  setCartDetail: (value: number) => set({ cartDetail: value }),
  setRefreshCart: (value: boolean) => set({ refreshCart: value }),
  incrementCartDetail: (value) =>
    set((state) => ({ cartDetail: state.cartDetail + value })),
}));

export default useCartStore;