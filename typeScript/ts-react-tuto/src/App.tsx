import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodosContextProvider } from './contexts/TodosContext';
import Root from './components/Root';

const App = () => {
  return (
    // <TodosContextProvider>
    //   <TodoForm/>
    //   <TodoList/>
    // </TodosContextProvider>
    <Root/>
  );
};

export default App;