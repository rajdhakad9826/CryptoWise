import React, { useContext } from "react";
import Drawer from "./Drawer";
import {
  AppBar,
  Typography,
  Toolbar,
  Box
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Crypto } from "../context/CryptoContext";
import { Link } from "react-router-dom";

const Header = () => {
  const {currency , setCurrency } = useContext(Crypto)
   return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, background: "#394e62" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          > <Link to='/' style={{textDecoration:'none',color: "#fff"}}>CoinWise</Link>
            
          </Typography>
          <Select
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
            variant="standard"
            sx={{
              margin: "0px 20px",
              paddingLeft: "10px",
              color: "#fff",
              height: "35px",
              width: "80px",
              border: "1px solid",
              "& .MuiSvgIcon-root": { color: "#fff" },
            }}
            disableUnderline
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
          <Drawer/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
