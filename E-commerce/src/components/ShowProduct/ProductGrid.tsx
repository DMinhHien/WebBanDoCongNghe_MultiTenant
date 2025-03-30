import { Box } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../data/products";
import ProductContainer from "./ProductContainer";

interface Props {
    products: Product[];
}

const ProductGrid = ({products}: Props) => {
    return (
        <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Thiết lập độ rộng tối thiểu 225px cho mỗi cột
          justifyItems: "center",
        }}
      >
        {products.map((product) => (
        <ProductContainer key={product.id}>
          <ProductCard product={product} />
        </ProductContainer>
      ))}
        </Box>
    )
}
export default ProductGrid;