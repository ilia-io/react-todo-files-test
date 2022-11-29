import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, postTodos, putTodos, deleteTodos } from './asyncActions';

const initialState = {
  todos: [],
  isLoading: false,
  error: '',
  // currentUser: {
  //   id: 0,
  //   name: '',
  //   email: '',
  //   password: '',
  // },
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // setCurrentUser(state, action: PayloadAction<ICurrentUser>) {
    //   state.currentUser.id = action.payload.id;
    //   state.currentUser.name = action.payload.name;
    //   state.currentUser.email = action.payload.email;
    //   state.currentUser.password = action.payload.password;
    // },
    // removeCurrentUser(state) {
    //   state.currentUser.id = 0;
    //   state.currentUser.name = '';
    //   state.currentUser.email = '';
    //   state.currentUser.password = '';
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

// export const { setCurrentUser, removeCurrentUser } = usersSlice.actions;

export default todoSlice.reducer;
