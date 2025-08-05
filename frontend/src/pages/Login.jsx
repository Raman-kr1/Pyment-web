import { useContext, useState } from 'react';
import { AuthCtx } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const { setUser } = useContext(AuthCtx);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data.user);
  };
  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
      <button>Login</button>
    </form>
  );
}