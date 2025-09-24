import { useEffect, useState } from 'react'
import API from '../api/api'
import BookCard from '../components/BookCard'
import './Home.css'

export default function Home(){
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=>{ fetchBooks(); }, []);

  async function fetchBooks(query){
    try {
      const res = await API.get('/books', { params: query ? { q: query } : {} });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(q);
  };

  return (
    <div className="home-container">
      <h2 className="home-title">Available Books</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input 
          value={q} 
          onChange={e=>setQ(e.target.value)} 
          placeholder="Search by title, author, category" 
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
        <button type="button" onClick={()=>{ setQ(''); fetchBooks(); }} className="clear-button">Clear</button>
      </form>

      <div className="books-grid">
        {books.map(b => <BookCard key={b._id} book={b} />)}
      </div>
    </div>
  )
}
