import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(); 
  const location=useLocation();

  useEffect(() => {
    setSelectedItem(location.pathname==='/'? '/home' : `${location.pathname}`);
}, [location]);


  const handleItemClick = (text) => {
    setSelectedItem(`/${text}`);
    setIsDrawerOpen(false);
  };
  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <MenuIcon
          size="large"
          edge="start"
          sx={{ color: "#fff", fontSize: "35px", zIndex: 99 }}
        />
      </IconButton>
      <MuiDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: "250px",
            height: "100vh",
            background: "#14161a",
          }}
        >
          <CloseRoundedIcon
            sx={{
              color: "#fff",
              margin: "5px",
              padding: "5px",
              fontSize: "30px",
              borderRadius: "50%",
              transition: "background 0.3s",
              cursor: "pointer",
              "&:hover": {
                background: "#394e62",
              },
            }}
            onClick={() => setIsDrawerOpen(false)}
          />
          <Divider sx={{ background: "#fff" }} />

          <List>
            {["home", "coins", "exchange"].map((text, index) => (
              <Link
                key={text}
                to={text === "home" ? "/" : `/${text}`}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <ListItem
                  onClick={() => handleItemClick(text)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#1d2026",
                    },
                    ...(`/${text}` === selectedItem && {
                      backgroundColor: "#394e62",
                      "&:hover": {
                        backgroundColor: "#394e62",
                      },
                    }),
                  }}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{
                        fontSize: "18px",
                        textTransform: "capitalize"
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </MuiDrawer>
    </>
  );
};

export default Drawer;
