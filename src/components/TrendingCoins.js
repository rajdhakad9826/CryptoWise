import React, { useContext, useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Box
} from "@mui/material";
import { Crypto } from "../context/CryptoContext";
import axios from "axios";

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const { currency, symbol } = useContext(Crypto);

  

  useEffect(() => {
    const fetchTrendingCoins = async () => {
        try {
          const coins = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
          );
          setTrendingCoins(coins.data);
        } catch (error) {
          console.log(error.message);
        }
      };
    fetchTrendingCoins();
  }, [currency]);


  return (
    <Container sx={{margin:"30px 0",width: "90%"}}>
      <Grid container spacing={3}>
        {trendingCoins.map((coin) => {
          return (
            <Grid item xs={12} sm={4} md={4}>
              <Card
                sx={{ maxWidth: 345, background: "#1d2026", color: "#fff" }}
                elevation={2}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        height: "100px",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                        }}
                      >
                        <img src={coin.image} alt={coin.name} height="40" />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 20,
                              color: "#fff",
                            }}
                          >
                            {coin.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{coin.name}</span>
                        </Box>
                      </Box>
                      <Sparklines
                        data={coin.sparkline_in_7d.price}
                        svgWidth={100}
                        svgHeight={50}
                      >
                        <SparklinesLine
                          color={
                            coin.price_change_percentage_7d_in_currency >= 0
                              ? "#16c12c"
                              : "red"
                          }
                          style={{ fill: "none" }}
                        />
                      </Sparklines>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: "40px",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                        {symbol}
                        {coin.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ textAlign: "center" ,color:coin.price_change_percentage_24h_in_currency>=0?"#16c12c":"#d2192a"}}>
                        {coin.price_change_percentage_24h_in_currency >= 0 &&
                          "+"}
                        {coin.price_change_percentage_24h_in_currency?.toFixed(
                          2
                        ) + "%"}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default TrendingCoins;
