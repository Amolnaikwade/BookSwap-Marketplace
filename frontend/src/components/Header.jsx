import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Header(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => { logout(); nav('/'); };
  return (
    <header style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd', alignItems:'center' }}>
      <Link to="/" style={{ fontWeight:700 }}>BookSwap</Link>
      <Link to="/">Browse</Link>
      <div style={{ marginLeft:'auto', display:'flex', gap:12, alignItems:'center' }}>
        {user ? (
          <>
            <span>Hi, {user.user.name}</span>
            <Link to="/add">Add Book</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
