
import { Box, Divider } from "@mui/material";
import GuaranteeGrid from "../components/HomePage/Guarantee/GuaranteeGrid";
import BannerProduct from "../components/HomePage/Banner/BannerProduct";
import BannerShop from "../components/HomePage/Banner/BannerShop";
const DividerSection = () => (
    <Divider sx={{ width: "80%", borderBottomWidth: 2, marginY: 10 }} />
);
function HomePage() {
    
    return(
    <Box>
        <BannerProduct />
        <DividerSection/>
        <BannerShop/>
        <DividerSection/>
        <GuaranteeGrid />
    </Box>
    );
}
export default HomePage;