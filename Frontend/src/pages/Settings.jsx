import React, { useState } from 'react';
import Header from '../components/Header';

const Settings = () => {
    const [activeMenu, setActiveMenu] = useState('security');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <>
            <Header title="System Settings" />

            <div className="container">
                <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 3fr' }}>
                    {/* Settings Sidebar */}
                    <div className="widget" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ background: '#FFFFFF', padding: '15px', borderBottom: '1px solid #e3e6f0', fontWeight: 600, color: 'var(--text-primary)' }}>
                            <i className="fas fa-cogs"></i> Settings Menu
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li onClick={() => setActiveMenu('security')} style={{ padding: '12px 20px', borderLeft: activeMenu === 'security' ? '3px solid var(--primary)' : '3px solid transparent', background: activeMenu === 'security' ? '#f0f4f8' : 'transparent', color: activeMenu === 'security' ? 'var(--primary)' : '#6e707e', fontWeight: 500, cursor: 'pointer' }}>
                                <i className="fas fa-shield-alt" style={{ width: '20px' }}></i> Security &amp; Password
                            </li>
                            <li onClick={() => setActiveMenu('profile')} style={{ padding: '12px 20px', borderLeft: activeMenu === 'profile' ? '3px solid var(--primary)' : '3px solid transparent', background: activeMenu === 'profile' ? '#f0f4f8' : 'transparent', color: activeMenu === 'profile' ? 'var(--primary)' : '#6e707e', cursor: 'pointer', transition: '0.2s' }}>
                                <i className="fas fa-user-cog" style={{ width: '20px' }}></i> Profile
                            </li>
                            <li onClick={() => setActiveMenu('notifications')} style={{ padding: '12px 20px', borderLeft: activeMenu === 'notifications' ? '3px solid var(--primary)' : '3px solid transparent', background: activeMenu === 'notifications' ? '#f0f4f8' : 'transparent', color: activeMenu === 'notifications' ? 'var(--primary)' : '#6e707e', cursor: 'pointer', transition: '0.2s' }}>
                                <i className="fas fa-bell" style={{ width: '20px' }}></i> Notifications
                            </li>
                        </ul>
                    </div>

                    {/* Settings Content */}
                    <div className="widget">
                        <div className="widget-header">
                            <div className="widget-title">Change Password</div>
                        </div>

                        <div style={{ background: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffeeba' }}>
                            <i className="fas fa-exclamation-triangle"></i> For security reasons, you will be logged out after changing your password.
                        </div>

                        <form>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#5a5c69' }}>Current Password</label>
                                <input type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #d1d3e2', borderRadius: '5px', fontSize: '14px' }} />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#5a5c69' }}>New Password</label>
                                <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #d1d3e2', borderRadius: '5px', fontSize: '14px' }} />
                                <small style={{ color: '#858796', marginTop: '5px', display: 'block' }}>Minimum 8 characters, mixed case and special characters.</small>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#5a5c69' }}>Confirm New Password</label>
                                <input type="password" placeholder="Re-enter new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #d1d3e2', borderRadius: '5px', fontSize: '14px' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #e3e6f0', paddingTop: '20px' }}>
                                <button type="button" className="btn-action view-btn" style={{ padding: '10px 25px', fontSize: '14px' }}>Update Password</button>
                                <button type="button" className="btn-sm" style={{ fontSize: '14px', background: 'white', border: '1px solid #d1d3e2' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
