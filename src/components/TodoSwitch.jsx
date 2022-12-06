import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

export default function ControlledSwitches({
  isCompleted,
  setIsCompleted,
  todo,
  toggleComplete,
}) {
  const [checked, setChecked] = useState(isCompleted);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    toggleComplete(todo);
  };

  return (
    <>
      <FormControlLabel
        value="label"
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Сделано"
      />
    </>
  );
}
