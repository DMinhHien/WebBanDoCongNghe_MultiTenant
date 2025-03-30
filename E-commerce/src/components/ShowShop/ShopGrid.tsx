import { Box } from "@mui/material";
import ShopCard from "../ShopCard/ShopCardUpdate";
import { Shop } from "../../data/shop";
import ShopContainer from "./ShopContainer";

interface Props {
    shops: Shop[];
}

const ShopGrid = ({shops}: Props) => {
    return (
        <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Thiết lập độ rộng tối thiểu 225px cho mỗi cột
          justifyItems: "center",
        }}
      >
        {shops.map((shop) => (
        <ShopContainer key={shop.id}>
          <ShopCard shop={shop} />
        </ShopContainer>
      ))}
        </Box>
    )
}
export default ShopGrid;