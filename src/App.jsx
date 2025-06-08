import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import SeriePage from './pages/SeriePage'
import SerieFormPage from './pages/SerieFormPage'
import CategoryFormPage from './pages/CategoryFormPage' 
import HeaderComponent from './components/HeaderComponent'

function Layout() {
  return (
    <>
      <HeaderComponent />
      <Outlet /> {}
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/series" element={<SeriePage />} />
          <Route path="/series/new" element={<SerieFormPage />} />
          <Route path="/series/edit/:id" element={<SerieFormPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/edit/:id" element={<CategoryFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App