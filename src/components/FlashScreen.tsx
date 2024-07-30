import React, { useEffect } from 'react';
import './FlashScreen.css';

interface FlashScreenProps {
  onFlashEnd: () => void;
}

const FlashScreen: React.FC<FlashScreenProps> = ({ onFlashEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFlashEnd();
    }, 3000); // Flash screen duration

    return () => clearTimeout(timer);
  }, [onFlashEnd]);

  return (
    <div className="flash-screen">
      <h1>Welcome to Period Tracker</h1>
    </div>
  );
};

export default FlashScreen;