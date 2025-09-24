import { Link } from 'react-router-dom'
export default function BookCard({ book }){
  return (
    <div style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
      <img src={book.image_url || 'https://via.placeholder.com/200x260'} alt={book.title} style={{ width:'100%', height:200, objectFit:'cover' }} />
      <h3>{book.title}</h3>
      <p>By {book.author || 'Unknown'}</p>
      <p>₹{book.price || 0}</p>
      <Link to={`/book/${book._id}`}>View</Link>
    </div>
  )
}
