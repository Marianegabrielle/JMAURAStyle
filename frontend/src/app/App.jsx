import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './AppState';
import { AppRouter } from './Router';
localStorage.removeItem('stylevault.app.state.v1');
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
}
