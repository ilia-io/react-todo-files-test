import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TodoModal from './TodoModal';
import { db } from '../firebase';
import { onValue, ref, set } from 'firebase/database';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodos,
  fetchTodos,
  postTodos,
  putTodos,
} from '../redux/asyncActions';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
    description: 'clean code Lorem ipsum dolor sit',
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

export const getId = () => new Date().valueOf();

export default function Album() {
  //const [todosR, setTodosR] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { todos } = useSelector((state) => state.todoSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const dbRef = ref(db, 'todos');
    onValue(dbRef, (snapshot) => {
      const fbTodos = [];
      snapshot.forEach((childSnapshot) => {
        //const keyName = childSnapshot.key;
        const data = childSnapshot.val();
        fbTodos.push(data);
      });
      //setTodosR(fbTodos);
      dispatch(fetchTodos(fbTodos));
    });
  }, []);

  const handleNewTask = () => {
    setCurrentTodo({});
    handleOpenModal();
  };

  const handleNewEdit = (todo) => {
    setCurrentTodo(todo);
    handleOpenModal();
  };

  const handleAddTodo = (todo) => {
    const { id, title, description, expDate, files } = todo;
   
    const currId = getId();
    // dispatch(
    //   postTodos({
    //     id: currId,
    //     title,
    //     description,
    //     expDate: expDate.format(),
    //     files: '',
    //   })
    // );
  };

  const handleEditTodo = (id, title, description, expDate, files) => {
    handleOpenModal();
    setCurrentTodo({
      id,
      title,
      description,
      expDate,
      files,
    });
    dispatch(
      putTodos({
        id,
        title,
        description,
        expDate,
        files,
      })
    );
  };

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodos(todo));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleNewTask}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Добавить
              </Button>
              <TodoModal
                open={openModal}
                handleCloseModal={handleCloseModal}
                handleAddTodo={handleAddTodo}
                todo={currentTodo}
              ></TodoModal>
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
            {todos &&
              todos.map((todo) => (
                <Grid item key={todo.id} xs={12} sm={6} md={4}>
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
                        {todo.title}
                      </Typography>
                      <Typography gutterBottom variant="h6">
                        Сделать до: {todo.expDate}
                      </Typography>
                      <Typography>{todo.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handleNewEdit(todo)}>Edit</Button>
                      <Button
                        onClick={handleDeleteTodo}
                        size="small"
                        sx={{ m: 2 }}
                      >
                        Delete
                      </Button>
                      {/* //TODO отображение файла */}
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
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
