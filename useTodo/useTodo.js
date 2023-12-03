import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [];

const init = () => {
  return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodo = () => {
  
  const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );
  
  //el useEffect se dispara cuando el componente se monta y cada vez que cambie el "todos"
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos])  

  const handleNewTodo = ( todo ) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    }

    dispatch( action );
  }

  const handleRemoveTodo = ( id ) => {
    //console.log( id );
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id,
    })
  }

  const handleToggleTodo = ( id ) => {
    console.log( id );
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id,
    })
  }  

  const todosCount = todos.length;
  const pendingTodosCount =  todos.filter(todo => !todo.done).length;

  return {
    todos,
    todosCount, 
    pendingTodosCount,
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
  }
}
