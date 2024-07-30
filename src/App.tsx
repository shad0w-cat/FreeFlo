
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import ErrorPage from './pages/error-page';
import React, { useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import NotFound from './pages/404';
import Introduction from './components/Introduction';
import ReproductiveHealth from './components/ReproductiveHealth';
import Information from './components/Information';
import Profile from './components/Profile';
import FlashScreen from './components/FlashScreen';
//import LoginRegister from './components/LoginRegister';

export default function App() {
  const [showFlashScreen, setShowFlashScreen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (showFlashScreen) {
    return <FlashScreen onFlashEnd={() => setShowFlashScreen(false)} />;
  }

  // if (!isAuthenticated) {
  //   return <LoginRegister onLogin={() => setIsAuthenticated(true)} />;
  // }

  return (
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Introduction />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reproductive-health" element={<ReproductiveHealth />} />
          <Route path="information" element={<Information />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </PrimeReactProvider>
  );
}