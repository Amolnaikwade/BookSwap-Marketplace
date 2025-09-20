import AuthForm from "../components/AuthForm";
import Message from "../components/Message";
import { useState } from "react";

const LoginPage = ({ setToken }) => {
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <h1>📚 BookSwap Marketplace</h1>
      <AuthForm setToken={setToken} setMessage={setMessage} />
      <Message message={message} />
    </div>
  );
};

export default LoginPage;
