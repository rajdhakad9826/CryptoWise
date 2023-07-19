import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Loader from "./Loader";
import axios from "axios";
import { Crypto } from "../context/CryptoContext";
import SearchBar from "./SearchBar";
import Pager from "./Pager";
import styled from "@emotion/styled";

const Coins = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { currency, symbol } = useContext(Crypto);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const coins = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        setData(coins.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchCoin();
  }, [currency]);

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },[])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const CustomTableCell = styled(TableCell)({
    color: "#fff",
  });

  const filteredCoins = data.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Box sx={{ padding: "80px 0 40px 0" }}>
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            textAlign: "center",
            marginBottom: page === 1 ? "0px" : "20px",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        {page === 1 && <SearchBar searchVal={setSearch} />}
        <TableContainer>
          <Container>
            {isLoading ? (
              <Loader />
            ) : (
              <Table>
                <TableHead sx={{ background: "#394e62" }}>
                  <TableRow>
                    {[
                      "#",
                      "Coin",
                      "Price",
                      "1h",
                      "24h",
                      "7d",
                      "24h Volume",
                      "Market Cap",
                      "Last 7 Days"
                    ].map((text) => (
                      <CustomTableCell key={text}>{text}</CustomTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  { filteredCoins
                    .slice((page - 1) * 25, page * 25)
                    .map((coin) => {
                      return (
                        <TableRow
                          key={coin.name}
                          sx={{
                            height: "110px",
                            ":hover": {
                              background: "#1d2026",
                            },
                          }}
                        >
                          <CustomTableCell>
                            #{coin.market_cap_rank}
                          </CustomTableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                              }}
                            >
                              <img
                                src={coin.image}
                                alt={coin.name}
                                height="50"
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
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
                                <span style={{ color: "darkgrey" }}>
                                  {coin.name}
                                </span>
                              </Box>
                            </Box>
                          </TableCell>
                          <CustomTableCell>
                            {symbol}
                            {numberWithCommas(coin.current_price)}
                          </CustomTableCell>
                          <PercentageChange
                            change={coin.price_change_percentage_1h_in_currency}
                          />
                          <PercentageChange
                            change={
                              coin.price_change_percentage_24h_in_currency
                            }
                          />
                          <PercentageChange
                            change={coin.price_change_percentage_7d_in_currency}
                          />
                          <CustomTableCell>
                            {symbol}
                            {numberWithCommas(coin.total_volume)}
                          </CustomTableCell>
                          <CustomTableCell>
                            {symbol}
                            {numberWithCommas(coin.market_cap)}
                          </CustomTableCell>
                          <CustomTableCell width={'170px'}>
                           <Sparklines data={coin.sparkline_in_7d.price} svgWidth={150} svgHeight={70} >
                           <SparklinesLine color={coin.price_change_percentage_7d_in_currency>=0 ? '#16c12c' : 'red'} style={{ fill: "none" }}/>
                           </Sparklines>                         
                          </CustomTableCell>
                        </TableRow>
                      );
                    })   }
                </TableBody>
              </Table>
            )}
          </Container>
        </TableContainer>
        <Pager length={filteredCoins.length} setPage={setPage} per_page={25} />
      </Box>
    </>
  );
};

const PercentageChange = ({ change }) => {
  return (
    <TableCell style={{ color: change >= 0.00 ? "#16c12c" : "red" }}>
      {change >= 0 && "+"}
      {change ? change.toFixed(2) + "%" : "NA"}
    </TableCell>
  );
};

export default Coins;
