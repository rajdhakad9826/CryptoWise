import React from 'react'
import { Box, TextField } from '@mui/material';

const SearchBar = ({searchVal}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center",margin:'30px 0' }}>
    <TextField
     onChange={(e)=>{
      searchVal(e.target.value)
    }}
      variant="outlined"
      label="Search"
      sx={{
        height: "50px",
        width: "80%",
        paddingBottom: "30px",
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
            "& fieldset": {
              borderColor: "#fff",
            },
          '&:hover fieldset': {
            borderColor: '#fff !important',
          }

      }}
      inputProps={{ style: { color: "#fff" } }}
      InputLabelProps={{
        style: { color: "#fff" },
      }}
    />
  </Box>
    )
}

export default SearchBar