import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import TodoModal from './TodoModal';
import { firebaseStorage, firestoreDB } from '../firebase';
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
import TodoCard from './TodoCard';

const theme = createTheme();
/**
 * Функция для получения id из даты
 * @return {number}
 */
export const getId = () => new Date().valueOf();
/**
 * Функция для получения отформатированной даты сейчас
 * @return {number}
 */
const now = dayjs().format();
/**
 * Основной компонент приложения
 * @namespace TodoApp
 */
export default function TodoApp() {
  /**
   * Стейты для инпутов
   * @memberof TodoApp
   * @member todoId
   */
  const [todoId, setTodoId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expDate, setExpDate] = useState(now);
  const [files, setFiles] = useState(null);
  /**
   * Стейты для временного хранения данных
   * @memberof TodoApp
   * @member todos
   */
  const [todos, setTodos] = useState([]);
  const [filesUrl, setFilesUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState(false);
  /**
   * Стейты для модалки добавления задачи
   * @memberof TodoApp
   * @member openAddModal
   */
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);
  /**
   * Функция добавляет задачу на бэк, очищает стейт с файлами
   * и закрывает модалку.
   *
   * Не позволяет добавить задачу без названия, при такой попытке
   * показывает предупреждение.
   * @memberof TodoApp
   */
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
  /**
   * Функция получает задачи с бэка и сохраняет в массив
   * для отрисовки
   * @memberof TodoApp
   */
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
  /**
   * Функция для изменения задачи, обновляет задачу на бэке по id,
   * очищает стейт файлов и закрывает модалку.
   *
   * Не позволяет добавить задачу без названия, при такой попытке
   * показывает предупреждение.
   * @memberof TodoApp
   * @param {function} closeModal функция закрывает модалку
   */
  const editTodo = async (closeModal) => {
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
    closeModal();
  };
  /**
   * Функция переключения готовности задачи, меняет статус
   * готовности на бэке
   *
   * @memberof TodoApp
   * @param {object} todo объект с данными задачи
   */
  const toggleComplete = async (todo) => {
    await updateDoc(doc(firestoreDB, 'todos', todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };
  /**
   * Функция удаления задачи, удаляет задачу на бэке по id
   *
   * @memberof TodoApp
   * @param {string} id id задачи на удаление
   */
  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestoreDB, 'todos', id));
  };
  /**
   * Функция загружает выбранный файл на бэк и сохраняет ссылку на
   * него в специальный стейт. Включает индикатор успешной загрузки.
   *
   * Проверяет чтобы стейт с файлами был не null.
   *
   * Не позволяет загружать файл размером больше 2МБ, при такой
   * попытке показывает предупреждение.
   *
   * @memberof TodoApp
   */
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
        setUploadStatus(true);
      });
    });
  };
  /**
   * Функция подготовки новой задачи, очищает инпуты
   * и открывает модалку
   *
   * @memberof TodoApp
   */
  const handleNewTask = () => {
    setTitle('');
    setDescription('');
    setExpDate(now);
    setFilesUrl('');
    setUploadStatus(false);
    handleOpenAddModal();
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
                openModal={openAddModal}
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
                uploadStatus={uploadStatus}
                setUploadStatus={setUploadStatus}
              ></TodoModal>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {todos &&
              todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  title={title}
                  description={description}
                  expDate={expDate}
                  files={files}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setExpDate={setExpDate}
                  setFiles={setFiles}
                  uploadFile={uploadFile}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                  setFilesUrl={setFilesUrl}
                  setTodoId={setTodoId}
                  uploadStatus={uploadStatus}
                  setUploadStatus={setUploadStatus}
                />
              ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
