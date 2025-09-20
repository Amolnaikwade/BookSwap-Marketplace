const MyBooks = ({ myBooks }) => {
  return (
    <div className="my-books">
      <h2>My Books</h2>
      {myBooks.length === 0 && <p>You have not added any books.</p>}
      {myBooks.map((b) => (
        <div key={b._id} className="book-card">
          <img src={b.image} alt={b.title} className="book-img" />
          <h3>{b.title}</h3>
          <p>Author: {b.author}</p>
          <p>Condition: {b.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBooks;
