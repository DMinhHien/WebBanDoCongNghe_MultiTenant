import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./route.tsx";
import { AuthProvider } from './components/Auth/AuthContext.tsx';
import './main.css'

const theme = createTheme({
  palette: {
    primary: {
      main: "#5f5a56",
      light: "#eaddee",
    },
    secondary: {
      main: "#f1bd8e",
      light: "#fffff7",
    },
    warning: {
      main: "#bf6159",
    },
    background: {
      default: "#fffff7",
    },
  },
  typography: {
    fontFamily: "Helvetica",
    fontWeightRegular: "500",
  },
});
export const defaultTheme = createTheme({
  typography: {
    fontFamily: "",
    fontWeightRegular: 550,
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
