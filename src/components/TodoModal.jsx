import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import TodoDatePicker from './TodoDatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
  btnName,
  handleAction,
  title,
  description,
  expDate,
  files,
  setTitle,
  setDescription,
  setExpDate,
  setFiles,
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
          <Button
            sx={{ mt: '16px' }}
            fullWidth
            size="small"
            variant="contained"
            component="label"
          >
            Загрузить файл
            <input hidden multiple type="file" />
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
