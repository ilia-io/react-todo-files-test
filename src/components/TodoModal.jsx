import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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

export default function BasicModal({ open, handleClose }) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [expDate, setExpDate] = React.useState('');

  const handleTitle = () => {};

  const handleDescription = () => {};

  const handleExpDate = () => {};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
            onChange={handleTitle}
            fullWidth
          />
          <TextField
            id="modal-modal-description"
            sx={{ mt: 1, mb: 2 }}
            label="Описание"
            variant="outlined"
            value={description}
            onChange={handleDescription}
            fullWidth
          />
          <TextField
            id="modal-modal-description"
            sx={{ mt: 1, mb: 2 }}
            label="Дата завершения"
            variant="outlined"
            value={expDate}
            onChange={handleExpDate}
            fullWidth
          />
          <Button fullWidth size="small" variant="contained" component="label">
            Upload
            <input hidden multiple type="file" />
          </Button>
          <Button
            sx={{ mt: 4 }}
            onClick={() => {}}
            variant="contained"
            startIcon={''}
          >
            Сохранить
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
