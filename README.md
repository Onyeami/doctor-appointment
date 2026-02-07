# Doctor Appointment System

Welcome to the Doctor Appointment System! This project is designed to make it easy for patients to find doctors and book appointments, while providing doctors with a simple way to manage their schedules and patients.

## The Patient & Doctor Experience (Frontend)

The "face" of our application is built using **React**. Think of this as the digital clinic where everything happens:

- **For Patients**: 
  - **Find Doctors**: Easily search for doctors based on their specialty or location.
  - **Book Appointments**: Pick a time that works for you and secure your slot in just a few clicks.
  - **Personal Dashboard**: Keep track of all your upcoming and past medical visits in one place.
- **For Doctors**:
  - **Manage Your Practice**: View your daily schedule and manage incoming appointment requests.
  - **Patient Overview**: See a list of your patients and their appointment history.
  - **Secure Login**: A dedicated portal to keep your professional data safe.

### Major Frontend Components
- **`Navbar` & `Footer`**: Provide consistent navigation and helpful links across all pages.
- **`HeroSection`**: The main entry point that guides users to find a doctor or login.
- **`FeaturedDoctors`**: Dynamically displays top-rated doctors fetched from the backend.
- **`DoctorsListPage`**: A comprehensive search interface for exploring medical professionals.
- **`PatientDashboardPage` & `DoctorDashboardPage`**: Role-specific command centers that organize data based on who is logged in.
- **`AppointmentsPage`**: Handles the logic for viewing and managing appointment bookings.

## The Engine Behind the Scenes (Backend)

While the frontend is what you see, the **Backend** (built with **Express**) is the engine that keeps everything running smoothly:

- **Data Management**: It handles the "brain" work—storing patient info and doctor profiles.
- **Security & Trust**: It manages the login process (Authentication).
- **Communication**: It acts as the bridge between the user interface and the database.

### Core Controllers (The Logic Centers)
- **`authController`**: Handles the logic for users to join the platform and sign in securely.
- **`doctorController`**: Manages the details of healthcare providers and handles search queries.
- **`appointmentController`**: Controls the flow of booking, viewing, and updating medical appointments.
- **`patientController`**: Dedicated to managing patient-specific profiles and their health records.

## Technical Features
- **Client-Side Routing**: Uses `react-router-dom` for fast, seamless navigation without page reloads.
- **Dynamic Data Loading**: Uses React's `useEffect` and `fetch` to retrieve real-time data from the backend.
- **RESTful API Design**: A clean and organized way for the frontend to talk to the backend using standard web methods.
- **SQL Database**: A structured database ensures all patient and doctor records are stored reliably.

## Getting Started

To see the project in action on your own computer:

1. **Setup the Backend**:
   - Go into the `backend` folder.
   - Run `npm install` to get the necessary tools.
   - Run `npm start` to fire up the engine.

2. **Setup the Frontend**:
   - Stay in the main folder.
   - Run `npm install` to get the design and interface tools.
   - Run `npm run dev` to open the "digital clinic" in your web browser.

---
*Built with ❤️ to improve healthcare accessibility.*
