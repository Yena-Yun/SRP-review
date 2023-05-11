import { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';

function Todos() {
  const [newTodo, setNewTodo] = useState('');
  const [updateId, setUpdateId] = useState(0);
  const [updateInput, setUpdateInput] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { todos, createTodo, updateTodo, deleteTodo } = useTodo();
  const { islogin } = useAuth();

  const saveUserInput = ({ target }) => {
    setNewTodo(target.value);
  }

  const handleCreate = () => {
    if (!newTodo) return;
    createTodo(newTodo);
    setNewTodo('');
  }

  const openUpdate = (id) => {
    setUpdateId(id);
  }
  
  const toggleEditMode = () => {
    setIsEdit(prev => !prev);
  }

  const handleUpdate = async (todo, id, isCompleted) => {
    await updateTodo({
      todo: updateInput.length > 0 ? updateInput : todo,
      id,
      isCompleted,
    });

    setUpdateId(0);
  };

  const handleCompleted = async ({ target }, todo, id) => {
    await updateTodo({
      todo,
      isCompleted: target.checked,
      id,
    });
  }

  const handleUpdateChange = ({ target }) => {
    setUpdateInput(target.value);
  }

  const handleDelete = async (id) => {
    await deleteTodo(id);
  }

  return (
    <div>
      <input value={newTodo} onChange={saveUserInput} />
      <button onClick={handleCreate}>create</button>
      {islogin && todos?.map(({ id, todo, isCompleted }) => (
        <li key={id}>
          <input
            type='checkbox'
            checked={isCompleted}
            onChange={(e) => {
              handleCompleted(e, todo, id);
            }}
          />
          {isEdit && updateId === id ? (
            <input
              value={updateInput.length < 1 ? todo : updateInput}
              onChange={handleUpdateChange}
            />
          ) : (
            <p
              style={{
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {todo}
            </p>
          )}
          <div>
            {isEdit && updateId === id ? (
              <button onClick={() => handleUpdate(todo, id, isCompleted)}>
                submit
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleEditMode();
                  openUpdate(id);
                }}
              >
                edit
              </button>
            )}
            <button onClick={() => handleDelete(id)}>delete</button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default Todos;
