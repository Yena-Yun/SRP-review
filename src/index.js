import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocalTokenStorage } from './storage/localTokenStorage';
import { HttpClient } from './api/httpClient';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import { AuthService } from './service/Auth/AuthService';
import { TodoService } from './service/Todo/TodoService';

const root = ReactDOM.createRoot(document.getElementById('root'));

const localTokenStorage = new LocalTokenStorage();
const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL,
  localTokenStorage
);
const authService = new AuthService(httpClient, localTokenStorage);
const todoService = new TodoService(httpClient);

root.render(
  <AuthProvider authService={authService}>
    <TodoProvider todoService={todoService}>
      <App />
    </TodoProvider>
  </AuthProvider>
);
