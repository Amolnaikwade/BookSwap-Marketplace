import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import AddBook from './pages/AddBook'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'

export default function App(){
  return (
    <div>
      <Header />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/book/:id' element={<BookDetail/>} />
          <Route path='/add' element={<AddBook/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
