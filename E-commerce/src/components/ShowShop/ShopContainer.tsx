import { Box, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { defaultTheme } from "../../main";


interface Props {
  children: ReactNode;
}

const ShopContainer = ({ children }: Props) => {
  return (
    <ThemeProvider theme = {defaultTheme}>

    <Box
    sx={{
      "&:hover": {
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      },
      borderRadius: 2,
      overflow: "hidden",
    }}
    >
      {children}
    </Box>
      </ThemeProvider>
  );
};

export default ShopContainer;