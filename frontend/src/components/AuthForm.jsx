import { useState } from "react";
import api, { setAuthToken } from "../api/api";

const AuthForm = ({ setToken, setMessage }) => {
  const [signupData, setSignupData] = useState({ username: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Signup handler
  const handleSignup = async () => {
    try {
      const res = await api.post("/api/auth/signup", signupData);
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  // Login handler
  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", loginData);
      const token = res.data.token;
      setToken(token);
      setAuthToken(token); // Set token for future requests
      setMessage("Login successful!");
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <input placeholder="Username" onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
      <button onClick={handleSignup}>Signup</button>

      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthForm;
