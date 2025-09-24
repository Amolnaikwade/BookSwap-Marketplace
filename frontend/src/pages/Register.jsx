import { useState, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      login({ token: res.data.token, user: res.data.user });
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" required />
          <button type="submit" className="auth-button">Register</button>
        </form>
      </div>
    </div>
  )
}
