import { Box, Grid } from "@mui/material";
import MainInfo from "./MainInfo";
import MainImage  from "./MainImage";
import { Shop } from "../../../data/shop";

interface Props {
    shop: Shop;
}

const MainLayout = ({ shop }: Props) => {
    return (
      <Box
        sx={{
          padding: 3,
          width: "100%",
          margin: "0 auto",
          bgcolor: "#FAF6F3",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={7}>
            <Box
              sx={{
                height: "100%",
                padding: 2,
              }}
            >
              <MainInfo shop={shop} />
            </Box>
          </Grid>
  
          <Grid item md={5}>
            <Box
              sx={{
                height: "100%",
                padding: 2,
              }}
            >
              <MainImage shop={shop} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default MainLayout;