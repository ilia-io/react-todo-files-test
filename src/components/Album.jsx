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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoModal from './TodoModal';
import { firebaseStorage, firestoreDB } from '../firebase';
import TodoSwitch from './TodoSwitch';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import dayjs from 'dayjs';
import * as colors from '@mui/material/colors';


const theme = createTheme();

export const getId = () => new Date().valueOf();

const now = dayjs().format();

export default function Album() {
  const [todoId, setTodoId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expDate, setExpDate] = useState(now);
  const [files, setFiles] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filesUrl, setFilesUrl] = useState('');

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);
  //create
  const createTodo = async () => {
    if (title === '') {
      alert('Пожалуйста, введите имя задачи');
      return;
    }
    await addDoc(collection(firestoreDB, 'todos'), {
      title,
      isCompleted: false,
      description,
      expDate,
      filesUrl,
    });
    setFiles(null);
    handleCloseAddModal();
  };
  //read
  useEffect(() => {
    const q = query(collection(firestoreDB, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);
  //update
  const editTodo = async () => {
    if (title === '') {
      alert('Пожалуйста, введите имя задачи');
      return;
    }
    await updateDoc(doc(firestoreDB, 'todos', todoId), {
      title,
      description,
      expDate,
      filesUrl,
    });
    setFiles(null);
    handleCloseEditModal();
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(firestoreDB, 'todos', todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };
  //delete
  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestoreDB, 'todos', id));
  };

  //upload
  const uploadFile = () => {
    if (files === null) {
      return;
    } else if (files.size > 2200000) {
      alert('Файл слишком большой! Выберите не больше 2 МБ');
      return;
    }
    const filesRef = ref(
      firebaseStorage,
      'uploadedFiles/' + files.name + getId()
    );
    uploadBytes(filesRef, files).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFilesUrl(url);
        //setFilesUrl((prev) => [url, ...prev]);
      });
    });
  };
  //get Files
  const filesListRef = ref(firebaseStorage, 'uploadedFiles/');
  useEffect(() => {
    listAll(filesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFilesUrl(url);
          //setFilesUrl((prev) => [url, ...prev]);
        });
      });
    });
  }, []);
  const handleNewTask = () => {
    setTitle('');
    setDescription('');
    setExpDate(now);
    setFilesUrl('');
    handleOpenAddModal();
  };

  const handleNewEdit = (todo) => {
    setTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setExpDate(todo.expDate);
    setFilesUrl(todo.filesUrl);
    handleOpenEditModal();
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <FormatListBulletedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            todo-лист
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
                handleAction={createTodo}
                title={title}
                description={description}
                expDate={expDate}
                files={files}
                setTitle={setTitle}
                setDescription={setDescription}
                setExpDate={setExpDate}
                setFiles={setFiles}
                uploadFile={uploadFile}
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
                    sx={
                      todo.isCompleted === true
                        ? {
                            backgroundColor: colors.green[50],
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                          }
                        : {
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                          }
                    }
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h4" component="h2">
                        {todo.title}
                      </Typography>
                      <Box>
                        <TodoSwitch
                          todo={todo}
                          toggleComplete={toggleComplete}
                        />
                      </Box>

                      <Typography
                        sx={
                          dayjs(todo.expDate).valueOf() < dayjs().valueOf()
                            ? {
                                backgroundColor: colors.red[100],
                              }
                            : {}
                        }
                        variant="p"
                      >
                        Сделать до:{' '}
                        {todo.expDate && todo.expDate.length < 11
                          ? dayjs(todo.expDate)
                          : dayjs(todo.expDate).format('DD.MM.YYYY')}
                      </Typography>
                      <Typography>{todo.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        sx={{ m: 2 }}
                        startIcon={<EditIcon />}
                        onClick={() => handleNewEdit(todo)}
                      >
                        Изменить
                      </Button>
                      <TodoModal
                        open={openEditModal}
                        handleCloseModal={handleCloseEditModal}
                        btnName={'Изменить'}
                        handleAction={editTodo}
                        title={title}
                        description={description}
                        expDate={expDate}
                        files={files}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setExpDate={setExpDate}
                        setFiles={setFiles}
                        uploadFile={uploadFile}
                      ></TodoModal>
                      <Button
                        onClick={() => deleteTodo(todo.id)}
                        size="small"
                        sx={{ m: 2 }}
                        startIcon={<DeleteIcon />}
                      >
                        Удалить
                      </Button>
                    </CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      target={'_blank'}
                      href={todo.filesUrl}
                      disabled={todo.filesUrl ? false : true}
                    >
                      Смотреть файл
                    </Button>
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
