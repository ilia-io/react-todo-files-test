import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack, TextField } from '@mui/material';
import TodoDatePicker from './TodoDatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PhotoCamera } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export default function BasicModal({
  open,
  handleCloseModal,
  setTitle,
  setDescription,
  expDate,
  setExpDate,
  setFiles,
  title,
  description,
  files,
  handleAction,
  uploadFile,
  btnName,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="modal-modal-description"
            sx={{ mt: 1, mb: 2 }}
            label="Заголовок"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            id="modal-modal-description"
            sx={{ mt: 1, mb: 2 }}
            label="Описание"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TodoDatePicker expDate={expDate} setExpDate={setExpDate} />
          <Button sx={{ mt: '16px' }} fullWidth size="small" component="label">
            Выбрать файл
            <input
              hidden
              type="file"
              onChange={(event) => {
                setFiles(event.target.files[0]);
              }}
            />
          </Button>
          <Button
            sx={{ mt: '16px' }}
            fullWidth
            size="small"
            variant="contained"
            component="label"
            disabled={files ? false : true}
            onClick={() => uploadFile()}
          >
            загрузить
          </Button>
          <Button
            sx={{ mt: 4 }}
            onClick={() => {
              handleAction();
            }}
            variant="contained"
            startIcon={''}
          >
            {btnName}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
