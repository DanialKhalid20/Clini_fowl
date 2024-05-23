import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userId is already stored to avoid running twice
    if (!sessionStorage.getItem('userId')) {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userId');

      if (userId) {
        sessionStorage.setItem('userId', userId);
      } else {
        navigate('/Loginpage');
    }
      
      // Redirect to the desired page
      navigate('/Landing');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
