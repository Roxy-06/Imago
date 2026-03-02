import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import { Feed } from './pages/Feed'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

const Navigation = () => {
  const location = useLocation()
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📸</span>
          <span className="logo-text">Imago</span>
        </Link>
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' || location.pathname === '/feed' ? 'active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            Feed
          </Link>
          <Link 
            to="/create-post" 
            className={`nav-link ${location.pathname === '/create-post' ? 'active' : ''}`}
          >
            <span className="nav-icon">➕</span>
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default App