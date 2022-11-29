import React, { useEffect } from 'react';
import Album from './components/Album';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './redux/asyncActions';

function App() {
  return (
      <>
        <Album />
      </>
  );
}

export default App;
