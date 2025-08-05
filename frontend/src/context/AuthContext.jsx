import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch (error) {
        console.log('No active session or session expired.');
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // We now provide the 'loading' state to the rest of the app.
  return (
    <AuthCtx.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthCtx.Provider>
  );
};
