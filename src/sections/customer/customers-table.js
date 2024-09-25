import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

export const MilkQualityInfo = () => {
  const renderColorBoxes = () => {
    const colorBoxes = [];
    for (let i = 240; i <= 255; i++) {
      const color = `rgb(${i},${i},${i})`;
      colorBoxes.push(
        <Grid item key={color}>
          <Typography>{i}</Typography>
          <Box bgcolor={color} width={30} height={30} border="1px solid #ccc" />
        </Grid>
      );
    }
    return colorBoxes;
  };
  return (
    <Box mt={4} ml={4} mr={4}>
      <Typography variant="h5" align="center" mb={2}>Data Parameters</Typography>
      <Grid container spacing={3}>
        {/* pH */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">pH</Typography>
            <Typography>
              pH value of the milk. Range: 3 to 9.5. Optimal: 6.25 to 6.90.
            </Typography>
          </Paper>
        </Grid>
        {/* Temperature */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Temperature</Typography>
            <Typography>
              Temperature of the milk in Celsius. Range: 34°C to 90°C. Optimal: 34°C to 45.20°C.
            </Typography>
          </Paper>
        </Grid>
        {/* Taste */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Taste</Typography>
            <Typography>
              Categorical data representing taste. Values: 0 (Bad) or 1 (Good).
            </Typography>
          </Paper>
        </Grid>
        {/* Odor */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Odor</Typography>
            <Typography>
              Categorical data representing odor. Values: 0 (Bad) or 1 (Good).
            </Typography>
          </Paper>
        </Grid>
        {/* Fat */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Fat</Typography>
            <Typography>
              Categorical data representing fat content. Values: 0 (Low) or 1 (High).
            </Typography>
          </Paper>
        </Grid>
        {/* Turbidity */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Turbidity</Typography>
            <Typography>
              Categorical data representing turbidity. Values: 0 (Low) or 1 (High).
            </Typography>
          </Paper>
        </Grid>
        {/* Colour */}
        <Grid item xs={12} sm={8}>
          <Paper variant="outlined" sx={{ p: 2.35, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Colour</Typography>
            <Typography>
              Colour of the milk. Range: 240 to 255.
            </Typography>
            <Grid container spacing={2}>
              {renderColorBoxes().map((colorBox, index) => (
                <Grid item key={index}>
                  {colorBox}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        {/* Grade */}
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 4, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' } }}>
            <Typography variant="h6">Grade (Target)</Typography>
            <Typography>
              Categorical data representing milk grade. Values: Low (Bad), Medium (Moderate), High.
            </Typography>
          </Paper>
        </Grid>
      </Grid>  
    </Box>
    
  );
};

export default MilkQualityInfo;
