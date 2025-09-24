import { useState, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AddBook(){
  const [form, setForm] = useState({ title:'', author:'', description:'', price:0, image_url:'', category:'' });
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  if (!user) return <div>Please login to add a book.</div>;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/books', form);
      nav(`/book/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:8, maxWidth:480 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} type="number" />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
