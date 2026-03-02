import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState(null)
    const [formData, setFormData] = useState({
        caption: ''
    })
    const [error, setError] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFileName(file.name)
        }
    }

    const handleCaptionChange = (e) => {
        setFormData(prev => ({
            ...prev,
            caption: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        
        const file = e.target.image.files?.[0]
        if (!file) {
            setError('Please select an image')
            return
        }
        
        if (!formData.caption.trim()) {
            setError('Please enter a caption')
            return
        }

        const data = new FormData()
        data.append('image', file)
        data.append('caption', formData.caption)

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:3000/api/create-post', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)
            
            // Reset form
            setFormData({ caption: '' })
            setFileName(null)
            e.target.reset()
            
            // Show success and navigate
            setTimeout(() => {
                navigate('/feed')
            }, 1000)
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Error creating post. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="create-post-section">
            <div className="create-post-header">
                <h1 className="create-post-title">Create a New Post</h1>
                <p className="create-post-subtitle">Share your moment with the world</p>
            </div>

            <form className="create-post-form" onSubmit={handleSubmit}>
                {error && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#dc2626',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <div className="form-group file-input-wrapper">
                    <label className="form-label">Select Image</label>
                    <input 
                        id="file-input"
                        type="file" 
                        name="image" 
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                    <label htmlFor="file-input" className="file-input-label">
                        <span>🖼️</span>
                        <span>{fileName ? `Selected: ${fileName}` : 'Click to upload or drag and drop'}</span>
                    </label>
                    {fileName && <span className="file-name">✓ {fileName}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="caption">Write a Caption</label>
                    <textarea 
                        id="caption"
                        className="form-textarea"
                        name="caption" 
                        placeholder="Share your thoughts... (max 500 characters)"
                        value={formData.caption}
                        onChange={handleCaptionChange}
                        maxLength="500"
                        disabled={loading}
                    />
                    <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)',
                        marginTop: '0.25rem'
                    }}>
                        {formData.caption.length}/500
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? '⏳ Publishing...' : '🚀 Publish Post'}
                </button>
            </form>
        </section>
    )
}

export default CreatePost
