import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

function Todos() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, createTodo, updateTodo, deleteTodo } = useTodo();

  const saveUserInput = ({ target }) => {
    setNewTodo(target.value);
  }

  const handleCreate = () => {
    if (!newTodo) return;
    createTodo(newTodo);
    setNewTodo('');
  }

  const handleDelete = async (id) => {
    await deleteTodo(id);
  }

  return (
    <div>
      <input value={newTodo} onChange={saveUserInput} />
      <button onClick={handleCreate}>create</button>
      {todos?.map(({ id, todo }) => (
        <li key={id}>
            <p>{todo}</p>
          <div>
              <button>
                edit
              </button>
            <button onClick={() => handleDelete(id)}>delete</button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default Todos;
