import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TodosProvider } from './providers/TodosProvider.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </StrictMode>
);
