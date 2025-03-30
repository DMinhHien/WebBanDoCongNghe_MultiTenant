
import { create } from "zustand";
import { Shop } from "../data/shop";

interface ShopState {
    shops: Shop[];
    filteredShops: Shop[];
    filters: Filters
    setShops: (shops: Shop[]) => void;
    setSearchQuery: (query: string) => void;
    resetFilters: () => void;
  }
interface Filters {
    searchQuery: string;
}
const applyFilters = (shops: Shop[], filters: Filters): Shop[] => {
    const { searchQuery} = filters;
  
    const filtered = shops.filter((shop) => {
      const matchesSearchQuery = searchQuery
        ? shop.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
  
      
      
  
      return (
        matchesSearchQuery 
      );
    });
     return filtered;
}


    const useShopStore = create<ShopState>((set) => ({
        shops: [],
        filteredShops: [],
        filters: {
          searchQuery: "",
        },
        setShops: (shops) =>
          set((state) => ({
            shops,
            filteredShops: applyFilters(shops, state.filters),
          })),
      
        setSearchQuery: (query) =>
          set((state) => ({
            filters: { ...state.filters, searchQuery: query },
            filteredShops: applyFilters(state.shops, {
              ...state.filters,
              searchQuery: query,
            }),
          })),
      
        resetFilters: () =>
          set((state) => ({
            filters: {
              searchQuery: "",
              category: "",
              brand: [],
              sortOption: "",
              priceRange: [0, 100],
            },
            filteredShops: state.shops,
          })),
      }));
      
      export default useShopStore;