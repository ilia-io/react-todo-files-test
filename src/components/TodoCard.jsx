import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  colors,
  Grid,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import TodoSwitch from './TodoSwitch';
import TodoModal from './TodoModal';

const TodoCard = ({
  todo,
  title,
  description,
  expDate,
  files,
  setTitle,
  setDescription,
  setExpDate,
  setFiles,
  uploadFile,
  deleteTodo,
  editTodo,
  toggleComplete,
  setFilesUrl,
  setTodoId,
  uploadStatus,
  setUploadStatus,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleNewEdit = () => {
    setTodoId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setExpDate(todo.expDate);
    setFilesUrl(todo.filesUrl);
    setUploadStatus(false);
    setOpenEditModal(true);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
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
            <TodoSwitch todo={todo} toggleComplete={toggleComplete} />
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
            onClick={handleNewEdit}
          >
            Изменить
          </Button>
          <TodoModal
            openModal={openEditModal}
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
            uploadStatus={uploadStatus}
            setUploadStatus={setUploadStatus}
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
  );
};

export default TodoCard;
