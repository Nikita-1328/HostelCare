import React, { useState } from 'react';
import Header from '../components/Header';

const Reports = () => {
    const [leaveType, setLeaveType] = useState('Casual Leave');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [dishToChange, setDishToChange] = useState('');
    const [proposedReplacement, setProposedReplacement] = useState('');
    const [changeReason, setChangeReason] = useState('');
    const [attachStats, setAttachStats] = useState(true);

    return (
        <>
            <Header title="Daily Reports & Administration" />
            <style>{`
                .container {
                    padding: 30px;
                    max-width: 1600px;
                    margin: 0 auto;
                }
                
                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 25px;
                    margin-bottom: 30px;
                }

                .stat-box {
                    padding: 25px;
                    border-radius: 8px;
                    color: white;
                    min-height: 140px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .bg-blue { background: #4e73df; }
                .bg-teal { background: #36b9cc; }
                .bg-orange { background: #f6c23e; }
                .bg-green { background: #1cc88a; }

                .stat-label {
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    opacity: 0.9;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .stat-count {
                    font-size: 42px;
                    font-weight: 700;
                    margin: 5px 0;
                }

                .stat-footer {
                    font-size: 13px;
                    opacity: 0.8;
                }

                /* Forms Layout */
                .forms-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }

                .form-card {
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
                    padding: 30px;
                    height: 100%;
                }

                .card-header {
                    margin-bottom: 25px;
                    border-bottom: 1px solid #eaecf4;
                    padding-bottom: 15px;
                }

                .card-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #5a5c69;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .form-desc {
                    font-size: 14px;
                    color: #858796;
                    margin-bottom: 20px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #5a5c69;
                    font-size: 14px;
                }

                .form-control {
                    width: 100%;
                    padding: 12px 15px;
                    border: 1px solid #d1d3e2;
                    border-radius: 6px;
                    font-size: 14px;
                    color: #6e707e;
                    transition: border-color 0.2s;
                }

                .form-control:focus {
                    outline: none;
                    border-color: #4e73df;
                    box-shadow: 0 0 0 3px rgba(78,115,223,0.1);
                }

                .row {
                    display: flex;
                    gap: 20px;
                }

                .col {
                    flex: 1;
                }

                .btn-submit {
                    background: #4e73df;
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .btn-submit:hover {
                    background: #2e59d9;
                }

                /* Leave Balance Box */
                .balance-box {
                    background: #f8f9fc;
                    border-radius: 8px;
                    padding: 20px;
                    margin-top: 20px;
                    border: 1px solid #e3e6f0;
                }

                .balance-header {
                    color: #4e73df;
                    font-weight: 700;
                    margin-bottom: 15px;
                    font-size: 15px;
                }

                .balance-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 0;
                    border-bottom: 1px solid #e3e6f0;
                    font-size: 14px;
                    color: #5a5c69;
                }
                
                .balance-item:last-child {
                    border-bottom: none;
                }

                /* Upload */
                .upload-area {
                    border: 2px dashed #d1d3e2;
                    border-radius: 6px;
                    padding: 30px;
                    text-align: center;
                    color: #858796;
                    cursor: pointer;
                    transition: all 0.2s;
                    position: relative;
                }
                
                .upload-area:hover {
                    border-color: #4e73df;
                    background: #f8f9fc;
                }

                .upload-input {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                }

                .upload-icon {
                    font-size: 24px;
                    color: #d1d3e2;
                    margin-bottom: 10px;
                }

                .checkbox-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-top: 15px;
                }

                @media (max-width: 992px) {
                    .stats-grid { grid-template-columns: 1fr 1fr; }
                    .forms-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="container">
                {/* Stats Section */}
                <h3 style={{ marginBottom: '20px', color: '#5a5c69', fontSize: '20px', fontWeight: 600 }}>Daily Overview</h3>
                <div className="stats-grid">
                    <div className="stat-box bg-blue">
                        <div className="stat-label"><i className="fas fa-bed"></i> Night Attendance</div>
                        <div className="stat-count">209</div>
                        <div className="stat-footer">Students Present Tonight</div>
                    </div>
                    <div className="stat-box bg-teal">
                        <div className="stat-label"><i className="fas fa-door-open"></i> Vacant Rooms</div>
                        <div className="stat-count">05</div>
                        <div className="stat-footer">Rooms with 0 Occupancy</div>
                    </div>
                    <div className="stat-box bg-orange">
                        <div className="stat-label"><i className="fas fa-clipboard-list"></i> Complaints Raised</div>
                        <div className="stat-count">12</div>
                        <div className="stat-footer">New Issues Today</div>
                    </div>
                    <div className="stat-box bg-green">
                        <div className="stat-label"><i className="fas fa-check-circle"></i> Resolved Issues</div>
                        <div className="stat-count">08</div>
                        <div className="stat-footer">Closed Today</div>
                    </div>
                </div>

                {/* Forms Section */}
                <div className="forms-grid">
                    {/* Rector Leave Application */}
                    <div className="form-card">
                        <div className="card-header">
                            <div className="card-title"><i className="fas fa-user-clock"></i> Rector Leave Application</div>
                        </div>

                        <p className="form-desc">Submit request for approval from Higher Officials.</p>

                        <form>
                            <div className="form-group">
                                <label className="form-label">Leave Type</label>
                                <select
                                    className="form-control"
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                >
                                    <option>Casual Leave</option>
                                    <option>Medical Leave</option>
                                    <option>Emergency Leave</option>
                                </select>
                            </div>

                            <div className="row">
                                <div className="col form-group">
                                    <label className="form-label">From Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                </div>
                                <div className="col form-group">
                                    <label className="form-label">To Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Reason</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Brief explanation..."
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                            </div>

                            <button type="button" className="btn-submit">
                                <i className="fas fa-paper-plane"></i> Submit Request
                            </button>

                            <div className="balance-box">
                                <div className="balance-header">Projected Leave Balance</div>
                                <div className="balance-item">
                                    <span>Casual Leave</span>
                                    <span><b>12</b> / 15 remaining</span>
                                </div>
                                <div className="balance-item">
                                    <span>Medical Leave</span>
                                    <span><b>08</b> / 10 remaining</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Menu Change Proposal */}
                    <div className="form-card">
                        <div className="card-header">
                            <div className="card-title"><i className="fas fa-utensils"></i> Menu Change Proposal</div>
                        </div>

                        <p className="form-desc">Propose changes to the mess menu based on student feedback.</p>

                        <form>
                            <div className="row">
                                <div className="col form-group">
                                    <label className="form-label">Current Dish</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Baingan Bharta"
                                        value={dishToChange}
                                        onChange={(e) => setDishToChange(e.target.value)}
                                    />
                                </div>
                                <div className="col form-group">
                                    <label className="form-label">Proposed Replacement</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Aloo Gobhi"
                                        value={proposedReplacement}
                                        onChange={(e) => setProposedReplacement(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Justification</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Why is this change needed? (e.g. Students dislike current option)"
                                    value={changeReason}
                                    onChange={(e) => setChangeReason(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Evidence / Proof</label>
                                <div className="upload-area">
                                    <input type="file" className="upload-input" />
                                    <div className="upload-icon"><i className="fas fa-cloud-upload-alt"></i></div>
                                    <span>Click to upload petition or feedback report</span>
                                </div>
                                <div className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        id="attachStats"
                                        checked={attachStats}
                                        onChange={(e) => setAttachStats(e.target.checked)}
                                    />
                                    <label htmlFor="attachStats" style={{ fontSize: '13px', color: '#6e707e' }}>
                                        Automatically attach "Mess Menu Insights" statistics
                                    </label>
                                </div>
                            </div>

                            <button type="button" className="btn-submit" style={{ marginTop: '10px' }}>
                                <i className="fas fa-paper-plane"></i> Submit Proposal
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reports;
