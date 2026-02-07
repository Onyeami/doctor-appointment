# Frontend Documentation - Doctor Appointment System

This document provides an overview of the frontend architecture, components, and data flow for the Doctor Appointment System.

## Architecture Overview
- **Framework**: React (Vite-based)
- **Styling**: Vanilla CSS
- **Routing**: React Router DOM (v6+)
- **API Communication**: Native `fetch()` API

## Routing Structure
The application uses a centralized routing system defined in `App.jsx`.

### Public Routes
- `/`: Landing page (Hero, Featured Doctors, How It Works).
- `/login`: Patient login.
- `/login-doctor`: Doctor login.
- `/register`: Patient registration.
- `/register-doctor`: Doctor registration.
- `/doctors`: Public listing of available doctors.
- `/doctors/:id`: Detailed doctor profile.

### Dashboard Routes (Protected)
Both Patients and Doctors share a similar dashboard layout but with different content:
- `/patient-dash`: Patient home overview.
- `/doctor-dash`: Doctor home overview.
- `/dash/appointments`: Centralized appointments view (role-dependent).
- `/dash/profile`: User profile management.
- `/dash/settings`: App settings (Notifications, Dark Mode).

## Component Hierarchy & Props

### Key Components
| Component | Description | Major Props |
| :--- | :--- | :--- |
| `Navbar` | Persistent top navigation. | N/A |
| `FeaturedDoctors` | Displays a grid of top doctors on the homepage. | `doctors` (Array), `onViewProfile` (Fn) |
| `DoctorCard` | Reusable card for doctor summaries. | `doctor` (Object) |
| `ProfileCard` | Displays detailed user info on profile pages. | `data` (Object), `isDoctor` (Boolean) |
| `DashboardSidebar` | Sidebar with navigation links for dashboards. | `basePath` (String), `activePage` (String) |
| `AppointmentRow` | Individual row within the appointments table. | `appointment` (Object) |

### Prop Patterns
- **`basePath`**: Used in dashboard components (e.g., `AppointmentsPage`) to maintain correct URL context when navigating (e.g., `/patient-dash` vs `/doctor-dash`).
- **Data Injection**: Most display components receive a single object prop (e.g., `doctor`, `appointment`) containing all necessary fields.

## State Management

### Local State (`useState`)
Each page manages its own data-fetching state:
- `data`: Holds the API response (e.g., list of doctors).
- `loading`: Boolean to toggle skeleton loaders or spinners.
- `error`: Stores API error messages for user feedback.

### Global/Persistent State
The application relies on `localStorage` for authentication:
- **`user`**: Stores a JSON object containing the user's ID, name, email, role, and **JWT Token**.

## Data Flow (Frontend Focused)
1. **User Action**: User clicks a button or page loads.
2. **Side Effect (`useEffect`)**: Triggered on mount or dependency change.
3. **API Call**: `fetch()` is called with the stored JWT token in the `Authorization` header.
4. **Local Update**: `setLoading(false)` and `setData(result)` are called.
5. **Re-render**: Component updates to show live data from the backend.
