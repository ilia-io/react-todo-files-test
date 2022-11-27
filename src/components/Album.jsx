import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Modal, Paper, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PhotoCamera, PhotoCameraBack } from '@mui/icons-material';
import TodoModal from './TodoModal';
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const testTodo = {
  id: 1,
  title: 'make todo app',
  description: 'clean code',
  expDate: '11.12.2022',
  files: 'file url',
};

const cards = [
  {
    id: 1,
    title: 'make todo app',
    description: 'clean code',
    expDate: '11.12.2022',
    files: 'file url',
  },
  {
    id: 2,
    title: 'make todo app',
    description:
      'clean code Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, harum iure illum velit atque quos nisi. Doloremque facere adipisci porro! Fugiat corrupti, assumenda, itaque rem enim amet delectus alias laudantium at doloremque voluptatum vel dolorum accusamus, aperiam suscipit facere? ',
    expDate: '11.12.2022',
    files: 'file url',
  },
  {
    id: 3,
    title: 'make todo app',
    description: 'clean code',
    expDate: '11.12.2022',
    files: 'file url',
  },
  {
    id: 4,
    title: 'make todo app',
    description: 'clean code',
    expDate: '11.12.2022',
    files: 'file url',
  },
  {
    id: 5,
    title: 'make todo app',
    description: 'clean code',
    expDate: '11.12.2022',
    files: 'file url',
  },
  {
    id: 6,
    title: 'make todo app',
    description: 'clean code',
    expDate: '11.12.2022',
    files: 'file url',
  },
];

const theme = createTheme();

export default function Album() {
  const [inputTodo, setInputTodo] = React.useState('');
  const handleChange = (event) => {
    setInputTodo(event.target.value);
  };
  const handleAddTodo = () => {};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Todo App
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                id="outlined-basic"
                label="Что будем делать?"
                variant="outlined"
                value={inputTodo}
                onChange={handleChange}
                fullWidth
              />
              <Button
                onClick={handleAddTodo}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Добавить
              </Button>
            </Box>

            {/* <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography> */}
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* <CardMedia
                    component="img"
                    sx={{
                      // display: 'none',
                      // 16:9
                      // pt: '56.25%',
                    }}
                    image="https://picsum.photos/100"
                    alt="random"
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {card.title}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      Сделать до: {card.expDate}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <TodoModal ></TodoModal>
                    <Button size="small" sx={{ m: 2 }}>
                      Delete
                    </Button>
                    <Button
                      size="small"
                      sx={{ mr: 2 }}
                      component="label"
                    >
                      Upload
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    {/* <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoCameraBack />
                    </IconButton> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
