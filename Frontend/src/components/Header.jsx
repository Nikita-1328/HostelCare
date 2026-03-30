import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ title }) => {
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [mailOpen, setMailOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Header */}
            <div className="topbar">
                <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <i className="fas fa-building"></i> HostelCare
                </Link>
                <div className="user-profile">
                    {/* Notification Dropdown */}
                    <div
                        className={`icon-dropdown ${notificationOpen ? 'active' : ''}`}
                        onClick={() => setNotificationOpen(!notificationOpen)}
                    >
                        <i className="fas fa-bell"></i>
                        <div className="dropdown-menu extended">
                            <div className="dropdown-header">Notifications Center</div>
                            <a href="#" className="dropdown-list-item">
                                <div className="icon-circle" style={{ background: '#4e73df' }}>
                                    <i className="fas fa-file-invoice-dollar"></i>
                                </div>
                                <div className="content">
                                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#333' }}>Fee Payment Alert</span>
                                    <div className="small-text">45 Students pending fees</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-list-item">
                                <div className="icon-circle" style={{ background: '#1cc88a' }}>
                                    <i className="fas fa-donate"></i>
                                </div>
                                <div className="content">
                                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#333' }}>New Complaint</span>
                                    <div className="small-text">Room 201: Fan issue</div>
                                </div>
                            </a>
                            <Link to="/notifications" style={{ display: 'block', textAlign: 'center', padding: '10px', fontSize: '12px', color: '#858796', textDecoration: 'none' }}>
                                Show All Alerts
                            </Link>
                        </div>
                    </div>

                    {/* Mail Dropdown */}
                    <div
                        className={`icon-dropdown ${mailOpen ? 'active' : ''}`}
                        onClick={() => setMailOpen(!mailOpen)}
                    >
                        <i className="fas fa-envelope"></i>
                        <div className="dropdown-menu extended">
                            <div className="dropdown-header">Message Center</div>
                            <a href="#" className="dropdown-list-item">
                                <div className="icon-circle" style={{ background: '#f6c23e' }}>
                                    <i className="fas fa-exclamation-triangle"></i>
                                </div>
                                <div className="content">
                                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#333' }}>Admin Office</span>
                                    <div className="small-text">Urgent: Submit monthly report</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-list-item">
                                <div className="icon-circle" style={{ background: '#e74a3b' }}>
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="content">
                                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#333' }}>Warden B</span>
                                    <div className="small-text">Requesting meeting tomorrow</div>
                                </div>
                            </a>
                            <a href="#" style={{ display: 'block', textAlign: 'center', padding: '10px', fontSize: '12px', color: '#858796', textDecoration: 'none' }}>
                                Read More Messages
                            </a>
                        </div>
                    </div>

                    <div
                        className={`profile-dropdown ${profileOpen ? 'active' : ''}`}
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        <div className="user-avatar"><i className="fas fa-female"></i></div>
                        <span>Mrs. Kumar <i className="fas fa-chevron-down"></i></span>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item"><i className="fas fa-sign-out-alt"></i> Sign Out</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-header">
                <h2>{title}</h2>
            </div>

            {/* Navigation */}
            <div className="navbar">
                <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                <Link to="/notifications" className={isActive('/notifications') ? 'active' : ''}><i className="fas fa-bell"></i> Notifications</Link>
                <Link to="/students" className={isActive('/students') ? 'active' : ''}><i className="fas fa-user-friends"></i> Girls</Link>
                <Link to="/gatepass" className={isActive('/gatepass') ? 'active' : ''}><i className="fas fa-ticket-alt"></i> Gate Pass</Link>
                <Link to="/complaints" className={isActive('/complaints') ? 'active' : ''}><i className="fas fa-exclamation-circle"></i> Complaints</Link>
                <Link to="/announcements" className={isActive('/announcements') ? 'active' : ''}><i className="fas fa-bullhorn"></i> Announcements</Link>
                <Link to="/reports" className={isActive('/reports') ? 'active' : ''}><i className="fas fa-file-alt"></i> Reports</Link>
                <Link to="/settings" className={isActive('/settings') ? 'active' : ''}><i className="fas fa-cog"></i> Settings</Link>
            </div>
        </>
    );
};

export default Header;
