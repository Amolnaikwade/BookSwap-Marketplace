import AuthForm from "../components/AuthForm";
import Message from "../components/Message";
import { useState } from "react";
import "./LoginPage.css"; // Import CSS for styling

const LoginPage = ({ setToken }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="app-title">BookSwap Marketplace</h1>
        <p className="subtitle">Exchange and request books with ease</p>

        {/* Auth Form */}
        <AuthForm setToken={setToken} setMessage={setMessage} />

        {/* Message (Success / Error) */}
        <Message message={message} />
      </div>
    </div>
  );
};

export default LoginPage;
