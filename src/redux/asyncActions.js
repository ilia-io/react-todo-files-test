import { createAsyncThunk } from '@reduxjs/toolkit';
import { onValue, ref, remove, set } from 'firebase/database';
import { db } from '../firebase';

const API_URL = ``;

export const fetchTodos = createAsyncThunk(
  'todo/fetchAll',
  async (todoData, thunkAPI) => {
    try {
      return todoData;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить задачи');
    }
  }
);

export const postTodos = createAsyncThunk(
  'todo/post',
  async (todoData, thunkAPI) => {
    try {
      const reference = ref(db, 'todos/' + todoData.id);
      set(reference, {
        id: todoData.id,
        title: todoData.title,
        description: todoData.description,
        expDate: todoData.expDate,
        files: todoData.files,
      });
      return todoData;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось добавить задачу');
    }
  }
);

export const putTodos = createAsyncThunk(
  'todo/put',
  async (todoData, thunkAPI) => {
    try {
      const reference = ref(db, 'todos/' + todoData.id);
      set(reference, {
        id: todoData.id,
        title: todoData.title,
        description: todoData.description,
        expDate: todoData.expDate,
        files: todoData.files,
      });
      return todoData;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось обновить данные');
    }
  }
);

export const deleteTodos = createAsyncThunk(
  'todo/delete',
  async (todoData, thunkAPI) => {
    try {
      const reference = ref(db, 'todos/' + todoData.id);
      remove(reference);
      return todoData.id;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось удалить задачу');
    }
  }
);
