
import { create } from "zustand";
import { Product } from "../data/products";

interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    filters: Filters
    setProducts: (products: Product[]) => void;
    setSearchQuery: (query: string) => void;
    setCategoryFilter: (category: string) => void;
    resetFilters: () => void;
  }
interface Filters {
    searchQuery: string;
    category: string;
}
const applyFilters = (products: Product[], filters: Filters): Product[] => {
    const { searchQuery, category,  } = filters;
  
    const filtered = products.filter((product) => {
      const matchesSearchQuery = searchQuery
        ? product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
  
      const matchesCategory = category ? product.categoryName === category : true;
      
  
      return (
        matchesSearchQuery && matchesCategory 
      );
    });
     return filtered;
}


    const useProductStore = create<ProductState>((set) => ({
        products: [],
        filteredProducts: [],
        filters: {
          searchQuery: "",
          category: "",
        },
        setProducts: (products) =>
          set((state) => ({
            products,
            filteredProducts: applyFilters(products, state.filters),
          })),
      
        setSearchQuery: (query) =>
          set((state) => ({
            filters: { ...state.filters, searchQuery: query },
            filteredProducts: applyFilters(state.products, {
              ...state.filters,
              searchQuery: query,
            }),
          })),
      
        setCategoryFilter: (category) =>
          set((state) => ({
            filters: { ...state.filters, category },
            filteredProducts: applyFilters(state.products, {
              ...state.filters,
              category,
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
            filteredProducts: state.products,
          })),
      }));
      
      export default useProductStore;