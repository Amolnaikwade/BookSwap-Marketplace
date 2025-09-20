import { useState } from "react";
import api from "../api/api";

const BookForm = ({ token, setMessage }) => {
  const [book, setBook] = useState({ title: "", author: "", condition: "", image: "" });

  // Add book handler
  const handleAddBook = async () => {
    try {
      const res = await api.post("/api/books", book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`Book added: ${res.data.title}`);
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="book-form">
      <h2>Add Book</h2>
      <input placeholder="Title" onChange={(e) => setBook({ ...book, title: e.target.value })} />
      <input placeholder="Author" onChange={(e) => setBook({ ...book, author: e.target.value })} />
      <input placeholder="Condition" onChange={(e) => setBook({ ...book, condition: e.target.value })} />
      <input placeholder="Image URL" onChange={(e) => setBook({ ...book, image: e.target.value })} />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default BookForm;
