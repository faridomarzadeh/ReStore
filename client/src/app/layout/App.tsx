import Catalog from "../../features/catalog/Catalog";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default : (paletteType==="light")? '#eaeaea': '#121212'
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} toggleMode={toggleDarkMode} />
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
