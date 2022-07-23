import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'fbase';

export default function AuthTest() {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.currentUser === null) {
      console.log('Invalid Access');
      navigate('/');
    }
  }, []);
}
