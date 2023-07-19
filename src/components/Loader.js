import {Box} from '@mui/material'
import React from 'react'

const Loader = () => {
    const loaderStyle = {
        border: '5px solid #1d2026',
        borderTop: '5px solid #394e62',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite',
      };
    
      const keyframesStyle = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
  return (
    <>   
     <style>{keyframesStyle}</style>
     <Box sx={{ display: 'flex',height:'50vh',width:'100%',justifyContent:'center',alignItems:'center'}}>
      <div style={loaderStyle}></div>
   </Box>
   
   </>
  )
}

export default Loader