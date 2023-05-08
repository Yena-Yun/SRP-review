import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext(null);
export const useTodo = () => useContext(TodoContext);

// 쓰는 입장에서 최대한 편한 값으로 내려보내기 위한 추가 작업 진행
export const TodoProvider = ({ children, todoService }) => {
  const [todos, setTodos] = useState([]);

  // todos가 변경될 때마다(수정, 삭제 등) get() 함수로 todos를 받아와서 setTodos에 셋팅
  useEffect(() => {
    todoService.get().then(setTodos); // .then(data) => setTodos(data) 축약형
  }, [todoService, setTodos]);

  const createTodo = async (todo) => {
    const newTodo = await todoService.create(todo);
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = async ({ todo, isCompleted, id }) => {
    const newTodo = await todoService.update({
      todo,
      isCompleted,
      id,
    });

    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = async (id) => {
    await todoService.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id)); // 삭제 후에 todos도 업데이트
  }

  return (
    <TodoContext.Provider
      value={{ todos, createTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}