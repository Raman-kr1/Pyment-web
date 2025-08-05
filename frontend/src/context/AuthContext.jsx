import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // This state will track the initial authentication check
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Check if a session exists on the backend
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch (error) {
        // This is expected if the user is not logged in
        console.log('No active session found.');
      } finally {
        // The check is complete, so we stop loading
        setLoading(false);
      }
    };

    checkUserSession();
  }, []); // Empty array ensures this runs only once on app startup

  // While the session is being checked, show a loading message.
  // This is the key to preventing the redirect.
  if (loading) {
    return <div className="page-container">Loading Application...</div>;
  }

  // Once the check is done, provide the user state and render the app
  return (
    <AuthCtx.Provider value={{ user, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
};
