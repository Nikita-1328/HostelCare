import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { API_BASE_URL } from '../../../config';

function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Event');
    const [statusMessage, setStatusMessage] = useState('');

    const fetchAnnouncements = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/announcements`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAnnouncements(data);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
            setStatusMessage('Could not load announcements.');
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Maintenance': return '#e74a3b';
            case 'Academic': return '#1cc88a';
            case 'Account': return '#f6c23e';
            case 'Other': return '#858796';
            default: return '#4e73df';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setStatusMessage('Please login to post announcements.');
            return;
        }

        if (!title.trim() || !content.trim()) {
            setStatusMessage('Title and content are required.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/announcements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    category,
                    color: getCategoryColor(category)
                })
            });

            const data = await response.json();
            if (response.ok) {
                setStatusMessage('Announcement posted successfully.');
                setTitle('');
                setContent('');
                setCategory('Event');
                fetchAnnouncements();
            } else {
                setStatusMessage(data.message || 'Failed to post announcement.');
            }
        } catch (error) {
            console.error('Error posting announcement:', error);
            setStatusMessage('Server error while posting announcement.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this announcement?')) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setStatusMessage('Announcement deleted successfully.');
                fetchAnnouncements();
            } else {
                setStatusMessage(data.message || 'Failed to delete announcement.');
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
            setStatusMessage('Server error while deleting announcement.');
        }
    };

    return (
        <>
            <Header title="Announcements" />
            <style>{`
                .announcements-container {
                    padding: 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }
                .card {
                    background: #fff;
                    border-radius: 12px;
                    padding: 25px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                }
                .section-title {
                    margin: 0 0 20px 0;
                    color: #5a5c69;
                    font-size: 18px;
                    border-bottom: 2px solid #eaecf4;
                    padding-bottom: 10px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-control {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #d1d3e2;
                    border-radius: 4px;
                    margin-top: 5px;
                    font-family: inherit;
                }
                .btn-submit {
                    background: #4e73df;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .btn-submit:hover {
                    background: #2e59d9;
                }
                .forms-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                .announcement-item {
                    border-left: 4px solid #4e73df;
                    padding: 15px;
                    background: #f8f9fc;
                    margin-bottom: 15px;
                    border-radius: 4px;
                }
                .announcement-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .announcement-title {
                    font-weight: bold;
                    color: #333;
                }
                .announcement-info {
                    font-size: 12px;
                    color: #858796;
                }
                .status-message {
                    color: #1f2937;
                    background: #eff6ff;
                    border: 1px solid #c7d2fe;
                    padding: 12px 16px;
                    border-radius: 10px;
                }
                .delete-btn {
                    background: #e74a3b;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 6px 12px;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .forms-grid { grid-template-columns: 1fr; }
                }
            `}</style>
            <div className="announcements-container">
                {statusMessage && <div className="status-message">{statusMessage}</div>}
                <div className="card">
                    <h3 className="section-title">Compose Announcement</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Announcement title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Event">Event</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Academic">Academic</option>
                                <option value="Account">Account</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your announcement details here..."
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">Publish Announcement</button>
                    </form>
                </div>

                <div className="card">
                    <h3 className="section-title">Latest Announcements</h3>
                    {announcements.length === 0 ? (
                        <p style={{ color: '#858796' }}>No announcements available.</p>
                    ) : (
                        announcements.map((announcement) => (
                            <div key={announcement._id} className="announcement-item">
                                <div className="announcement-header">
                                    <div>
                                        <div className="announcement-title">{announcement.title}</div>
                                        <div className="announcement-info">{announcement.category} • Posted by: {announcement.author?.name || announcement.author?.role || 'Staff'}</div>
                                    </div>
                                    <button className="delete-btn" onClick={() => handleDelete(announcement._id)}>Delete</button>
                                </div>
                                <div style={{ color: '#5a5c69', fontSize: '14px' }}>{announcement.content}</div>
                                <div className="announcement-info" style={{ marginTop: '10px' }}>{new Date(announcement.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminAnnouncements;
