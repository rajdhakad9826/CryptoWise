import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import {
  Avatar,
  Box,
  CardActionArea,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pager from "./Pager";

const Exchange = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search,setSearch]=useState('');
  const [page, setPage] = useState(1);


  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const exchange = await axios.get(
          "https://api.coingecko.com/api/v3/exchanges?per_page=250&page=1"
        );
        setData(exchange.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      }
    };
    fetchExchange();
  }, []);
  const filteredData=data.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <Box sx={{ padding: "80px 0 40px 0" }}>
      <Typography variant='h5' sx={{color:'#fff',textAlign:'center',marginBottom: page === 1 ? '0px':'20px'}}>Top Crypto Exchanges Ranked by Trust Score</Typography>
      {page===1 && <SearchBar searchVal={setSearch}/>}
      
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Grid container spacing={3}>
            { filteredData.length ? filteredData.slice((page-1)*100,page*100).map((coin, index) => (
              <ExchangeCard
                key={index}
                trust_score={coin.trust_score}
                id={coin.id}
                name={coin.name}
                image_url={coin.image}
                url={coin.url}
                rank={coin.trust_score_rank}
              />
            )) : <Typography variant="subtitle1" sx={{color:"#fff",marginTop:"20px",width:"100%",textAlign:"center"}}>no results found.</Typography>

            }
          </Grid>
        </Container>
      )}
      <Pager length={filteredData.length} per_page={100} setPage={setPage} />
    </Box>
  );
};

const ExchangeCard = ({ rank, image_url, url, name, trust_score }) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        sx={{ maxWidth: 345, background: "#1d2026", color: "#fff" }}
        elevation={2}
      >
        <CardActionArea href={url} target="_blank">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: "240px",
            }}
          >
            <Typography gutterBottom variant="h6">
              #{rank}
            </Typography>
            <Avatar
              alt={name}
              src={image_url}
              sx={{ height: "50px", width: "50px" }}
            />
            <Typography variant="h6" sx={{textAlign:'center'}}>{name}</Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems:"center",
              height: "30px",
              width: "100%",
              background: "#394e62",
            }}
          >
            <Typography variant="subtitle2">
              Trust Score
            </Typography>
            <Typography variant="subtitle2">
              {trust_score}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Exchange;
