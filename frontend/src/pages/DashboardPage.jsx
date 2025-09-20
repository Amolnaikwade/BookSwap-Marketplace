import { useState, useEffect } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import MyBooks from "../components/MyBooks";
import MyRequests from "../components/MyRequests";
import Message from "../components/Message";
import api from "../api/api";

const DashboardPage = ({ token }) => {
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/api/books");
      setBooks(res.data);
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  const fetchMyBooks = async () => {
    try {
      const res = await api.get("/api/books/my");
      setMyBooks(res.data);
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await api.get("/api/requests/my");
      setMyRequests(res.data);
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMyBooks();
    fetchMyRequests();
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <BookForm token={token} setMessage={setMessage} />
      <BookList books={books} setMessage={setMessage} refreshBooks={fetchBooks} />
      <MyBooks myBooks={myBooks} />
      <MyRequests requests={myRequests} />
      <Message message={message} />
    </div>
  );
};

export default DashboardPage;
