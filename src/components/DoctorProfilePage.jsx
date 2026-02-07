import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/DoctorProfilePage.css";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);

  // Booking Form State
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [bookingStatus, setBookingStatus] = useState({ loading: false, message: '', type: '' });

  // Fetch Doctor Details and Reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docRes, revRes] = await Promise.all([
          fetch(`http://localhost:3000/api/doctors/${id}`),
          fetch(`http://localhost:3000/api/reviews/doctor/${id}`)
        ]);

        const [docData, revData] = await Promise.all([
          docRes.json(),
          revRes.json()
        ]);

        if (docRes.ok) {
          setDoctor(docData);
        } else {
          setError('Doctor not found');
        }

        if (revRes.ok) {
          setReviews(revData);
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setBookingStatus({ loading: true, message: '', type: '' });

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setBookingStatus({ loading: false, message: 'Please login to book an appointment', type: 'error' });
      // Optionally redirect to login
      // navigate('/login');
      return;
    }

    try {
      // Combine date and time for backend
      const appointmentDateTime = `${booking.date} ${booking.time}:00`;

      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          doctor_id: id,
          appointment_date: appointmentDateTime,
          notes: booking.reason
        })
      });

      const data = await response.json();

      if (response.ok) {
        setBookingStatus({ loading: false, message: 'Appointment booked successfully!', type: 'success' });
        // Reset form
        setBooking({ date: '', time: '', reason: '' });
      } else {
        setBookingStatus({ loading: false, message: data.message || 'Booking failed', type: 'error' });
      }
    } catch (err) {
      setBookingStatus({ loading: false, message: 'Network error', type: 'error' });
    }
  };

  if (loading) return <div className="doctor-profile-page"><p>Loading profile...</p></div>;
  if (error || !doctor) return <div className="doctor-profile-page"><p>{error || 'Doctor not found'}</p></div>;

  return (
    <div className="doctor-profile-page">
      <div className="profile-left">
        <img
          src={doctor.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&size=150&background=4F46E5&color=fff`}
          alt={doctor.name}
          className="doctor-avatar-large"
        />
        <h2>{doctor.name}</h2>
        <div className="specialty">{doctor.specialty}</div>

        <div className="bio-section" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h3>About</h3>
          <p>{doctor.bio || "No additional details provided."}</p>
        </div>

        <div className="details-grid">
          <div className="rate-info"><strong>Rate:</strong> {doctor.hourly_rate ? `€${doctor.hourly_rate}/hr` : 'Not specified'}</div>
          <div className="rating-info"><strong>Rating:</strong> {doctor.rating || 'N/A'} ⭐</div>
        </div>

        <div className="reviews-section" style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <h3>Patient Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p style={{ color: '#666' }}>No reviews yet.</p>
          ) : (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{review.patient_name}</span>
                    <span style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#4b5563' }}>{review.comment || "No comment provided."}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="profile-right">
        <h3>Book an Appointment</h3>

        {bookingStatus.message && (
          <div className={`status-message ${bookingStatus.type}`} style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            backgroundColor: bookingStatus.type === 'error' ? '#ffebee' : '#e8f5e9',
            color: bookingStatus.type === 'error' ? '#c62828' : '#2e7d32'
          }}>
            {bookingStatus.message}
          </div>
        )}

        <form className="appointment-form" onSubmit={handleBookAppointment}>
          {/* Pre-filled / Read-only Patient Info could go here if we used Context */}

          <label>
            Preferred Date
            <input
              type="date"
              name="date"
              value={booking.date}
              onChange={handleBookingChange}
              required
            />
          </label>
          <label>
            Preferred Time
            <input
              type="time"
              name="time"
              value={booking.time}
              onChange={handleBookingChange}
              required
            />
          </label>
          <label>
            Reason for Visit
            <textarea
              name="reason"
              rows={3}
              value={booking.reason}
              onChange={handleBookingChange}
            />
          </label>
          <button type="submit" className="book-btn" disabled={bookingStatus.loading}>
            {bookingStatus.loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
