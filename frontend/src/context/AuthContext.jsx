import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
export const AuthCtx = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // optional: hit /me endpoint to restore session
  }, []);
  return (
    <AuthCtx.Provider value={{ user, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
};