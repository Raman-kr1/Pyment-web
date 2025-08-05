// src/pages/Login.jsx
import { useContext, useState } from 'react';
import { AuthCtx } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const { setUser } = useContext(AuthCtx);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRegister = async () => {
    try {
      await api.post('/auth/signup', { email, password });
      setMessage('Registration successful! Please log in.');
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
      setIsError(true);
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setMessage('Login successful!');
      setIsError(false);
      setTimeout(() => (window.location.href = '/'), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <h2>Login or Register</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
      {message && <p className={`message ${isError ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
}