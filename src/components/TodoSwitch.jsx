import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
/**
 * Компонент переключатель готовности задачи
 * @namespace TodoSwitch
 */
export default function ControlledSwitches({ todo, toggleComplete }) {
  /**
   * Стейт статуса готовности задачи
   * @memberof TodoSwitch
   * @member checked
   */
  const [checked, setChecked] = useState(todo.isCompleted);
  /**
   * Функция управляет стейтом статуса задачи и отправляет
   * данные задачи в функцию toggleComplete
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @memberof TodoSwitch
   */
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
