import "../css/RegisterPage.css";

export default function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">
          Sign up to get started
        </p>

        <form className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="doctor@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

          <div className="register-footer">
            <span>Already have an account?</span>
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
