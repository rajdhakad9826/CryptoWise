import React, { useContext, useEffect, useState } from "react";
// import image1 from "../img/img1.png";
// import image2 from "../img/img5.jpg";
import { Typography, Container, Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { Crypto } from "../context/CryptoContext";
import axios from "axios";
import Loader from "./Loader";


const HomePage = () => {
  const [cryptoStats,setCryptoStats] = useState([])
  const { currency, symbol } = useContext(Crypto);
  const [isLoading,setIsLoading] =useState(true);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
   
    const fetchGlobal = async () => {
      try {
        const crypto = await axios.get(
           `https://api.coingecko.com/api/v3/global`
          );
          setCryptoStats(crypto.data.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          setIsLoading(false);
      }
    };
    fetchGlobal();
    
  }, [])
  const marketCapKeys = cryptoStats?.total_market_cap ? Object.keys(cryptoStats.total_market_cap) : [];

  return (
    <div style={{
      background:'#14161a',
    }}>
      <Container
        sx={{
          marginTop: "80px",
          height: "85vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{color:"#fff"}}>Global Crypto Stats</Typography>
        <Container
          sx={{
            width: "90%",
            color: "#fff",
            padding:"30px 0"
          }}
        >
          {isLoading ? <Loader/> :
          <Grid container spacing={3}>
              <StatsCard head="Coins" color="#16c12c" value={numberWithCommas(cryptoStats.active_cryptocurrencies)} />
              <StatsCard head="Exchanges" color="#16c12c" value={numberWithCommas(cryptoStats.markets)} />
              <StatsCard head="MarketCap" color="#16c12c" value={`${symbol}${numberWithCommas(cryptoStats.total_market_cap[currency.toLowerCase()])}`} />
              <StatsCard head="24h Volume" color="#16c12c" value={`${symbol}${numberWithCommas(cryptoStats.total_volume[currency.toLowerCase()])}`} />
              <StatsCard head="24h Change" color={cryptoStats.market_cap_change_percentage_24h_usd>=0?"#16c12c":"#d2192a"} value={cryptoStats.market_cap_change_percentage_24h_usd.toFixed(2)+"%"} />
              <StatsCard head="Dominance" color="#16c12c" value={`${marketCapKeys[0].toUpperCase()} ${cryptoStats.market_cap_percentage[marketCapKeys[0]].toFixed(2)}%  ,${marketCapKeys[1].toUpperCase()} ${cryptoStats.market_cap_percentage[marketCapKeys[1]].toFixed(2)}%`} />  
          </Grid>
}
        </Container>
      </Container>
    </div>
  );
};

const StatsCard=({head,value,color})=>{
  return(
    <Grid item xs={12} sm={6} md={6}>
             <Card sx={{ background: "#1d2026", color: "#fff" }}>
      <CardActionArea>
        <CardContent>
          <Typography  variant="h4" component="div">
           {head}
          </Typography>
          <Typography variant="h6" component="div" sx={{color:color,marginTop:"10px"}}>
              {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  )
}

export default HomePage;


