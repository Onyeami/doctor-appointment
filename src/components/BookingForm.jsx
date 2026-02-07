import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import "../css/DashboardPage.css";

export default function BookingForm({ basePath = '/dash' }) {
    const [options, setOptions] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const user = JSON.parse(localStorage.getItem('user'));
    const isDoctor = user?.role === 'doctor';

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const endpoint = isDoctor
                    ? 'http://localhost:3000/api/doctors/patients'
                    : 'http://localhost:3000/api/doctors';

                const response = await fetch(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setOptions(data);
                } else {
                    setMessage({ type: 'error', text: 'Failed to load options' });
                }
            } catch (err) {
                setMessage({ type: 'error', text: 'Network error' });
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [isDoctor, user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedId || !date) {
            setMessage({ type: 'error', text: 'Please fill in all required fields' });
            return;
        }

        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const body = isDoctor
                ? { patient_id: selectedId, appointment_date: date, notes }
                : { doctor_id: selectedId, appointment_date: date, notes };

            const response = await fetch('http://localhost:3000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: `Appointment ${isDoctor ? 'proposed' : 'booked'} successfully!` });
                setSelectedId('');
                setDate('');
                setNotes('');
            } else {
                setMessage({ type: 'error', text: result.message || 'Failed to create appointment' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="dashboard-page">
            <DashboardSidebar basePath={basePath} activePage="book" />

            <main className="dashboard-main">
                <div className="page-container" style={{ maxWidth: '600px' }}>
                    <h2 className="page-title">
                        {isDoctor ? 'Book Follow-up Appointment' : 'Book a New Appointment'}
                    </h2>

                    {loading ? (
                        <p>Loading options...</p>
                    ) : (
                        <div className="table-card" style={{ padding: '24px' }}>
                            {message.text && (
                                <div style={{
                                    padding: '12px',
                                    marginBottom: '16px',
                                    borderRadius: '4px',
                                    backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                                    color: message.type === 'success' ? '#166534' : '#991b1b',
                                    border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`
                                }}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                        {isDoctor ? 'Select Patient' : 'Select Doctor'}
                                    </label>
                                    <select
                                        required
                                        value={selectedId}
                                        onChange={(e) => setSelectedId(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    >
                                        <option value="">-- Choose {isDoctor ? 'Patient' : 'Doctor'} --</option>
                                        {options.map(opt => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.name} {opt.specialty ? `(${opt.specialty})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {isDoctor && options.length === 0 && (
                                        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                            Note: You can only book for patients you have a prior history with.
                                        </p>
                                    )}
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Notes (Optional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add any specific instructions or reason for visit..."
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontWeight: '600',
                                        cursor: submitting ? 'not-allowed' : 'pointer',
                                        opacity: submitting ? 0.7 : 1
                                    }}
                                >
                                    {submitting ? 'Creating Appointment...' : 'Confirm Appointment'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
