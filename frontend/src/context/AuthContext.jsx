import { createContext, useState, useEffect } from 'react';
import { setAuthToken } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('bookswap_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user?.token) setAuthToken(user.token);
  }, [user]);

  const login = (userWithToken) => {
    setUser(userWithToken);
    localStorage.setItem('bookswap_user', JSON.stringify(userWithToken));
  };
  const logout = () => { setUser(null); localStorage.removeItem('bookswap_user'); setAuthToken(null); };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
