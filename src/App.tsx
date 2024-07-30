import { Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import ErrorPage from './pages/error-page';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import NotFound from './pages/404';

export default function App() {
  return (
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Calendar />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </PrimeReactProvider>
  );
}
