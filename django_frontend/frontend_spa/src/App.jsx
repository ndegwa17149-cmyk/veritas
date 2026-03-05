import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Assets from './pages/Assets'
import Login from './pages/Login'
import Submit from './pages/Submit'
import parseJwt from './utils/auth'

export default function App(){
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('veritas_token')
    if(token){
      const payload = parseJwt(token)
      if(payload && payload.sub){
        setUser({id: payload.sub, is_admin: payload.is_admin, username: payload.username || null})
      }
    }
  },[])

  function logout(){
    localStorage.removeItem('veritas_token')
    setUser(null)
    nav('/')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">Veritas</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/submit">Submit</Link></li>
              <li className="nav-item">
                {user ? (
                  <button className="btn btn-outline-light ms-2" onClick={logout}>Logout</button>
                ) : (
                  <Link className="nav-link" to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<Assets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </main>

      <footer className="bg-light text-center py-3 mt-auto">
        <div className="container small text-muted">
          &copy; 2026 Veritas. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
