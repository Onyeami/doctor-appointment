// src/api.js
import axios from "axios";

// Create a base Axios instance
const api = axios.create({
  baseURL: "https://your-backend-url.com/api", 
  timeout: 20000, 
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);



// Auth
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const registerUser = (data) => api.post("/auth/register", data);
export const logoutUser = () => api.post("/auth/logout");
export const registerProvider = (data) => api.post("/auth/register-provider", data);

// Appointments
export const getAppointments = () => api.get("/appointments");
export const getAppointmentById = (id) => api.get(`/appointments/${id}`);
export const cancelAppointment = (id) => api.delete(`/appointments/${id}`);
export const createAppointment = (data) => api.post("/appointments", data);
export const updateAppointmentStatus = (id, status) =>
  api.put(`/appointments/${id}/status`, { status });
export const rescheduleAppointment = (id, payload) =>
  api.put(`/appointments/${id}/reschedule`, payload);

// Patients
export const getPatients = () => api.get("/patients");
export const getPatientById = (id) => api.get(`/patients/${id}`);

// Doctors
export const getDoctors = () => api.get("/doctors");
export const getDoctorById = (id) => api.get(`/doctors/${id}`);

// Export the raw instance if needed
export default api;
