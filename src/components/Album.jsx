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
import { onValue, ref, remove, set } from 'firebase/database';

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
  const [todoId, setTodoId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expDate, setExpDate] = useState('31.12.2022');
  const [files, setFiles] = useState('');
  const [todos, setTodos] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    const dbRef = ref(db, 'todos');
    onValue(dbRef, (snapshot) => {
      const fbTodos = [];
      snapshot.forEach((childSnapshot) => {
        //const keyName = childSnapshot.key;
        const data = childSnapshot.val();
        fbTodos.push(data);
      });
      setTodos(fbTodos);
    });
  }, []);

  const handleNewTask = () => {
    setTitle('');
    setDescription('');
    setExpDate('');
    setFiles('');
    handleOpenAddModal();
  };

  const handleNewEdit = (todo) => {
    setTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setExpDate(todo.expDate);
    setFiles(todo.files);
    handleOpenEditModal();
  };

  const handleAddTodo = () => {
    const newId = getId();
    const date =
      typeof expDate === 'string' ? expDate : expDate.format('DD.MM.YYYY');
    const reference = ref(db, 'todos/' + newId);
    set(reference, {
      id: newId,
      title,
      description,
      expDate: date,
      files,
    });
    handleCloseAddModal();
  };

  const handleEditTodo = () => {
    const reference = ref(db, 'todos/' + todoId);
    const date =
      typeof expDate === 'string' ? expDate : expDate.format('DD.MM.YYYY');
    set(reference, {
      id: todoId,
      title,
      description,
      expDate: date,
      files,
    });
    handleCloseEditModal();
  };

  const handleDeleteTodo = (todo) => {
    const reference = ref(db, 'todos/' + todo.id);
    remove(reference);
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
                open={openAddModal}
                handleCloseModal={handleCloseAddModal}
                btnName={'Сохранить'}
                handleAction={handleAddTodo}
                title={title}
                description={description}
                expDate={expDate}
                files={files}
                setTitle={setTitle}
                setDescription={setDescription}
                setExpDate={setExpDate}
                setFiles={setFiles}
              ></TodoModal>
            </Box>
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
                      <TodoModal
                        open={openEditModal}
                        handleCloseModal={handleCloseEditModal}
                        btnName={'Изменить'}
                        handleAction={handleEditTodo}
                        title={title}
                        description={description}
                        expDate={expDate}
                        files={files}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setExpDate={setExpDate}
                        setFiles={setFiles}
                      ></TodoModal>
                      <Button
                        onClick={() => handleDeleteTodo(todo)}
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
