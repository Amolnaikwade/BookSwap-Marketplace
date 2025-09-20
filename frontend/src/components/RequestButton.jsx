import api from "../api/api";

const RequestButton = ({ bookId, setMessage, refreshBooks }) => {
  const handleRequest = async () => {
    try {
      const res = await api.post(`/api/requests/${bookId}`);
      setMessage("Request sent!");
      refreshBooks(); // Refresh the book list to show status
    } catch (err) {
      setMessage(err.response?.data?.msg || err.message);
    }
  };

  return <button onClick={handleRequest}>Request Book</button>;
};

export default RequestButton;
