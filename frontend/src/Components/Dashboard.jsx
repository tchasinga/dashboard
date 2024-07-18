import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Box, 
  Toolbar, 
  AppBar, 
  IconButton, 
  CircularProgress 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/apis/aply/get')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
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
  }, []);

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
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Type of Services</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Updated At</TableCell>
                      <TableCell>Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <Link key={row._id} to={`/Mydetails${row._id}`}>
                        <TableRow >
                        <TableCell>{row._id}</TableCell>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <div >
                        <TableCell className="w-[40px]">
                          <p className='line-clamp-[1]'>{row.description}</p>
                        </TableCell>
                        </div>
                        <TableCell>{row.typeofservices}</TableCell>
                        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{new Date(row.updatedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          {row.imageUrls && row.imageUrls.length > 0 && (
                            <img src={row.imageUrls[0]} alt={row.fullName} style={{ width: '50px', height: '50px' }} />
                          )}
                        </TableCell>
                      </TableRow>
                      </Link>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
