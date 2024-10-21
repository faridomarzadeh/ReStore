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
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const[loading, setLoading] = useState(true);

  useEffect(() =>{
    const buyerId = getCookie("buyerId");

    if(buyerId)
    {
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(()=>setLoading(false))
    }
    else
    {
      setLoading(false)
    }

  },[dispatch])

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
