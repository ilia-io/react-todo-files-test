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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoModal from './TodoModal';
import { db, firebaseStorage, firestoreDB } from '../firebase';
import { query, set, update } from 'firebase/database';
import TodoSwitch from './TodoSwitch';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import dayjs from 'dayjs';
import { color } from '@mui/system';
import * as colors from '@mui/material/colors';
import { Stack } from '@mui/material';
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

const now = dayjs().format();

export default function Album() {
  const [todoId, setTodoId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expDate, setExpDate] = useState(now);
  const [files, setFiles] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [filesUrl, setFilesUrl] = useState([]);

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

    // const date =
    //   expDate.length < 21 ? expDate : dayjs(expDate).format('DD.MM.YYYY');

    await addDoc(collection(firestoreDB, 'todos'), {
      title,
      isCompleted: false,
      description,
      expDate,
      filesUrl: filesUrl[0],
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
        setFilesUrl((prev) => [url, ...prev]);
      });
    });
  };
  //get Files
  const filesListRef = ref(firebaseStorage, 'uploadedFiles/');
  useEffect(() => {
    listAll(filesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFilesUrl((prev) => [url, ...prev]);
        });
      });
    });
  }, []);

  const handleNewTask = () => {
    setTitle('');
    setDescription('');
    setIsCompleted(false);
    handleOpenAddModal();
  };

  const handleNewEdit = (todo) => {
    setTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setExpDate(todo.expDate);
    setFiles(todo.files);
    setIsCompleted(todo.isCompleted);
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
      isCompleted: false,
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
      isCompleted,
    });
    handleCloseEditModal();
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
            {/* <Todo
              key={todo.id}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              checked={todo.isCompleted}
              handleNewEdit={handleNewEdit}
            /> */}
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
                          isCompleted={todo.isCompleted}
                          setIsCompleted={setIsCompleted}
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
                        {todo.expDate && todo.expDate.length < 12
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
