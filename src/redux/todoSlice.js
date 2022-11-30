import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, postTodos, putTodos, deleteTodos } from './asyncActions';

const initialState = {
  todos: [],
  isLoading: false,
  error: '',
  // currentTodo: {
  //   id: '',
  //   title: '',
  //   description: '',
  //   expDate: '',
  //   files: '',
  // },
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // setCurrentTodo(state, action) {
    //   state.currentTodo.id = action.payload.id;
    //   state.currentTodo.title = action.payload.title;
    //   state.currentTodo.description = action.payload.description;
    //   state.currentTodo.expDate = action.payload.expDate;
    //   state.currentTodo.files = action.payload.files;
    // },
    // removeCurrentTodo(state) {
    //   state.currentTodo.id = '';
    //   state.currentTodo.title = '';
    //   state.currentTodo.description = '';
    //   state.currentTodo.expDate = '';
    //   state.currentTodo.files = '';
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(postTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.todos.push(action.payload);
    });
    builder.addCase(postTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(putTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(putTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? (todo = action.payload) : todo
      );
    });
    builder.addCase(putTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(deleteTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

//export const { setCurrentTodo, removeCurrentTodo } = todoSlice.actions;

export default todoSlice.reducer;
