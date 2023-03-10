import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MovieListPage from './pages/MovieListPage';
import FavoritePage from './pages/FavoritePage';
import SingleMoviePage from './pages/SingleMoviePage';
import TopBarProgress from 'react-topbar-progress-indicator';
import { ToastContainer } from 'react-toastify';

TopBarProgress.config({
  barColors: {
    0: '#F63030',
    0.5: '#F63835',
    '1.0': '#F6000C',
  },
  shadowBlur: 5,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MovieListPage />} />
          <Route path="favorite" element={<FavoritePage />} />
          <Route path="movie/:id" element={<SingleMoviePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
