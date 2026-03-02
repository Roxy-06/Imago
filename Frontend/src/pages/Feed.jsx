import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:3000/api/posts')
        setPosts(res.data.posts)
      } catch (err) {
        console.error(err)
        setError('Failed to load posts. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="feed-section">
      <div className="feed-header">
        <h1 className="feed-title">Your Feed</h1>
        <p className="feed-subtitle">Discover amazing content from the community</p>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <p className="empty-state-text">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <p className="empty-state-text" style={{color: '#ef4444'}}>{error}</p>
        </div>
      ) : posts.length > 0 ? (
        posts.map(post => (
          <article key={post._id} className="post">
            <div className="post-image-container">
              <img src={post.image} alt={post.caption} />
            </div>
            <div className="post-content">
              <p className="post-caption">{post.caption}</p>
              <div className="post-meta">
                <span>📅 Just now</span>
              </div>
              <div className="post-actions">
                <button className="post-action-btn post-like-btn">
                  <span>❤️</span> Like
                </button>
                <button className="post-action-btn post-share-btn">
                  <span>📤</span> Share
                </button>
              </div>
            </div>
          </article>
        ))
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📸</div>
          <h2 className="empty-state-title">No Posts Yet</h2>
          <p className="empty-state-text">Be the first to share something amazing!</p>
          <Link to="/create-post" className="empty-state-action">
            Create Your First Post
          </Link>
        </div>
      )}
    </section>
  )
}