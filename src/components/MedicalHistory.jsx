import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import "../css/DashboardPage.css";
import "../css/Tables.css";

export default function MedicalHistory({ basePath = '/patient-dash' }) {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const response = await fetch(`http://localhost:3000/api/medical-records/patient/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setRecords(data);
                } else {
                    setError(data.message || 'Failed to fetch medical history');
                }
            } catch (err) {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="dashboard-page">
            <DashboardSidebar basePath={basePath} activePage="history" />
            <main className="dashboard-main">
                <div className="page-container">
                    <h2 className="page-title">Medical History</h2>
                    {loading ? (
                        <p>Loading records...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : records.length === 0 ? (
                        <p>No medical records found yet.</p>
                    ) : (
                        <div className="history-list">
                            {records.map(record => (
                                <div key={record.id} className="table-card" style={{ padding: '20px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                                        <div>
                                            <h3 style={{ margin: 0 }}>Diagnosis: {record.diagnosis}</h3>
                                            <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
                                                Doctor: {record.doctor_name} ({record.specialty})
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right', color: '#888', fontSize: '14px' }}>
                                            {new Date(record.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <h4 style={{ margin: '0 0 8px', fontSize: '15px' }}>Prescription</h4>
                                            <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>{record.prescription || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 8px', fontSize: '15px' }}>Treatment Plan</h4>
                                            <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>{record.treatment_plan || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
