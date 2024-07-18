import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Detailspages() {
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/apis/aply/getbyid/ + ${data._id}`)
      .then(response => {
        if (response.data) {
          setData(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('Error fetching data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data._id]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {data.fullName}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper>
              <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
                {data.imageUrls && data.imageUrls.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={`${data.fullName} - ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                  </div>
                ))}
              </Carousel>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Email:</Typography>
                <Typography variant="body1" gutterBottom>{data.email}</Typography>

                <Typography variant="h6">Description:</Typography>
                <Typography variant="body1" gutterBottom>{data.description}</Typography>

                <Typography variant="h6">Type of Services:</Typography>
                <Typography variant="body1" gutterBottom>{data.typeofservices}</Typography>

                <Typography variant="h6">Created At:</Typography>
                <Typography variant="body1" gutterBottom>{new Date(data.createdAt).toLocaleString()}</Typography>

                <Typography variant="h6">Updated At:</Typography>
                <Typography variant="body1" gutterBottom>{new Date(data.updatedAt).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
