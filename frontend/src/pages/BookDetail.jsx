import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import API from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function BookDetail(){
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(()=>{ API.get(`/books/${id}`).then(r=>setBook(r.data)).catch(e=>console.error(e)); }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this book?')) return;
    try { await API.delete(`/books/${id}`); nav('/'); } 
    catch (err) { console.error(err); alert('Delete failed'); }
  };

  const handleRequest = async () => {
    try {
      await API.post(`/requests/${book._id}`);
      alert('Book requested successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Request failed');
    }
  }

  if(!book) return <div>Loading...</div>
  const isOwner = user && user.user.id === book.owner?._id;

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.image_url || 'https://via.placeholder.com/400x520'} alt={book.title} style={{ maxWidth:320 }} />
      <p>{book.description}</p>
      <p>Author: {book.author}</p>
      <p>Price: ₹{book.price}</p>
      <p>Owner: {book.owner?.name} ({book.owner?.email})</p>

      {isOwner ? (
        <div style={{ marginTop:12 }}>
          <button onClick={()=>nav(`/edit/${book._id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div style={{ marginTop:12 }}>
          <button onClick={handleRequest}>Request Book</button>
        </div>
      )}
    </div>
  )
}
