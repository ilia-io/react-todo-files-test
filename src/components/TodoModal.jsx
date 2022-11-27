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
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
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
            value={''}
            onChange={() => {}}
            fullWidth
          />
          <TextField
            id="modal-modal-description"
            sx={{ mt: 1, mb: 2 }}
            label="Описание"
            variant="outlined"
            value={''}
            onChange={() => {}}
            fullWidth
          />
          <TextField
            id="modal-modal-description"
            sx={{ mt: 1, mb: 2 }}
            label="Дата завершения"
            variant="outlined"
            value={''}
            onChange={() => {}}
            fullWidth
          />
          <Button fullWidth size="small" variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
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
