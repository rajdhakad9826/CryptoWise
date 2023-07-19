import { Box, Pagination } from '@mui/material'
import React from 'react'


const Pager = ({length,per_page,setPage}) => {

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
<Box sx={{display:"flex",height:"100px",justifyContent:"center",alignItems:"center"}}>
      <Pagination size="medium" sx={{"& .MuiPaginationItem-root": {
      color: "#fff"
    },"& .Mui-selected": {
        background:'#1d2026 !important'
    }}} count={Math.ceil(length/per_page)} onChange={handleChange} />
      </Box>
    )
}

export default Pager