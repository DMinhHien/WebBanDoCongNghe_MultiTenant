import { Box, createTheme, Grid, ThemeProvider } from "@mui/material";
import CategoryFilter from "./CategoryFilter";

const theme = createTheme({
    typography: {
      fontFamily: "Nunito",
      fontWeightRegular: 500,
    },
  });

  const FilterProduct = () => {
    return (
      <ThemeProvider theme={theme}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box
            sx={{
              border: "1px solid #ccc", // đường viền nhỏ
              borderRadius: "4px", // bo góc nhẹ
            }}
          >
            <CategoryFilter />
          </Box>
        </Grid>
      </ThemeProvider>
    );
  };
  
  export default FilterProduct;