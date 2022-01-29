import './App.css';
import { Business } from './components/Business';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div className="App">
      <h1>Quick Connect</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardContent className="HomeGridItem">
                <h1>Customer</h1>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardContent className="HomeGridItem">
                <h1>Business</h1>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Business />
    </div>
  );
}

export default App;
