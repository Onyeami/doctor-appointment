import React, { useState } from 'react';

export default function ReviewForm({ appointmentId, onReviewSubmitted }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetch('http://localhost:3000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    appointment_id: appointmentId,
                    rating,
                    comment
                })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Thank you for your feedback!');
                if (onReviewSubmitted) onReviewSubmitted();
            } else {
                setMessage(data.message || 'Failed to submit review');
            }
        } catch (err) {
            setMessage('Network error');
        } finally {
            setSubmitting(false);
        }
    };

    if (message === 'Thank you for your feedback!') {
        return <div style={{ padding: '20px', textAlign: 'center', color: '#166534', backgroundColor: '#dcfce7', borderRadius: '8px' }}>{message}</div>;
    }

    return (
        <div className="review-form table-card" style={{ padding: '24px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                style={{
                                    fontSize: '24px',
                                    color: star <= rating ? '#fbbf24' : '#d1d5db',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Comment (Optional)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: '10px 24px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.7 : 1
                    }}
                >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                {message && <p style={{ color: '#991b1b', marginTop: '10px' }}>{message}</p>}
            </form>
        </div>
    );
}
