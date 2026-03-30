import React from 'react';
import Header from '../components/Header';

const GatePass = () => {
    return (
        <>
            <Header title="Gate Pass Management" />

            <div className="container">
                {/* Stats Cards */}
                <div className="stats-cards" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="card bg-orange">
                        <div className="card-label"><i className="fas fa-clock"></i> Pending Requests</div>
                        <h3>8</h3>
                        <p>Awaiting Approval</p>
                    </div>
                    <div className="card bg-teal">
                        <div className="card-label"><i className="fas fa-check-circle"></i> Approved Today</div>
                        <h3>12</h3>
                        <p>Gate Passes Issued</p>
                    </div>
                </div>

                {/* Pending Gate Pass Requests */}
                <div className="widget">
                    <div className="widget-header">
                        <div className="widget-title">Pending Gate Pass Requests</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Room</th>
                                <th>Reason</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Priya Sharma</td>
                                <td>201</td>
                                <td>Medical Appointment</td>
                                <td>25 Jan - 26 Jan</td>
                                <td>
                                    <button className="btn-action approve-btn">Approve</button>
                                    <button className="btn-action reject-btn">Reject</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Anjali Verma</td>
                                <td>305</td>
                                <td>Family Function</td>
                                <td>26 Jan - 28 Jan</td>
                                <td>
                                    <button className="btn-action approve-btn">Approve</button>
                                    <button className="btn-action reject-btn">Reject</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Sneha Patel</td>
                                <td>112</td>
                                <td>Weekend Home Visit</td>
                                <td>27 Jan - 28 Jan</td>
                                <td>
                                    <button className="btn-action approve-btn">Approve</button>
                                    <button className="btn-action reject-btn">Reject</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Kavya Nair</td>
                                <td>408</td>
                                <td>Interview</td>
                                <td>28 Jan</td>
                                <td>
                                    <button className="btn-action approve-btn">Approve</button>
                                    <button className="btn-action reject-btn">Reject</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default GatePass;
