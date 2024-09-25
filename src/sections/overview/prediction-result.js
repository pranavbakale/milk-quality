import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export const PredictionResult = ({ prediction, accuracy, suggestions }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Prediction Result
            </Typography>
            <Typography variant="body1" gutterBottom>
              Prediction: {prediction}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Accuracy: {accuracy}%
            </Typography>
            <Typography variant='body1' gutterBottom>
              Suggestions: <span dangerouslySetInnerHTML={{ __html: suggestions }} />
              {/* Suggestions:{suggestions} */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
