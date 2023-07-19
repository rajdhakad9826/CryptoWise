import './App.css'
import HomePage from './components/HomePage';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Coins from './components/Coins';
import Header from './components/Header';
import Exchange from './components/Exchange';
import CryptoContext from './context/CryptoContext';
import { createTheme,ThemeProvider } from '@mui/material';
import CoinPage from './components/CoinPage';

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Poppins'
      },
    },
  })

  return (
   <>
   <CryptoContext>
   <ThemeProvider theme={theme}>

      <BrowserRouter>
     <Header/>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/coins/:id' element={<CoinPage/>}/>
      <Route path='/exchange' element={<Exchange/>}/>        
     </Routes>
     
   </BrowserRouter>
   </ThemeProvider>
   </CryptoContext>
     </>
  );
}

export default App;
