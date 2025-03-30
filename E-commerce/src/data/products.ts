export interface Product {
    id: string;
    productName: string;
    unitPrice: string;
    description: string;
    quantity: string;
    status: string;
    image: string;
    rating: number;
    categoryName: string;
  }
  export const categories = [
    "Iphone",
    "Máy tính Bảng ",
    "Ti vi",
    "Điện Thoại",
    "Tay cam",
  ];
//  export const sampleProducts: Product[] = Array.from({length: 30}, (_, i) => ({
//   id: i +1,
//   productName:  `Product ${i + 1}`,
//   unitPrice: '100.000d',
//   image: `https://via.placeholder.com/150?text=Product+${i + 1}`,
//   rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
//   category: categories[i % categories.length],
//  }));
