import RequestButton from "./RequestButton";

const BookList = ({ books, setMessage, refreshBooks }) => {
  return (
    <div className="book-list">
      <h2>All Books</h2>
      {books.length === 0 && <p>No books available.</p>}
      {books.map((b) => (
        <div key={b._id} className="book-card">
          <img src={b.image} alt={b.title} className="book-img" />
          <h3>{b.title}</h3>
          <p>Author: {b.author}</p>
          <p>Condition: {b.condition}</p>
          {b.requested ? (
            <p>Status: {b.requested.status}</p>
          ) : (
            <RequestButton bookId={b._id} setMessage={setMessage} refreshBooks={refreshBooks} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookList;
