const MyRequests = ({ requests }) => {
  return (
    <div className="my-requests">
      <h2>My Requests</h2>
      {requests.length === 0 && <p>No requests sent yet.</p>}
      {requests.map((r) => (
        <div key={r._id} className="book-card">
          <h3>{r.book.title}</h3>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
