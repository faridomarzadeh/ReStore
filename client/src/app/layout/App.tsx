import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';
import { getCookie } from "../utils/util";
import { agent } from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import { LoadingComponent } from "./LoadingComponent";

function App() {
  const{setBasket} = useStoreContext();
  const[loading, setLoading] = useState(true);

  useEffect(() =>{
    const buyerId = getCookie("buyerId");

    if(buyerId)
    {
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(()=>setLoading(false))
    }

  },[setBasket])

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
  if(loading)
    return <LoadingComponent message="Initializing App ..."/>
  
  return (
    <>
      <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar/>
        <CssBaseline />
        <Header darkMode={darkMode} toggleMode={toggleDarkMode} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
