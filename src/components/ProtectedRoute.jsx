import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute checks if a user has access to a page based on their role.
 * @param {ReactNode} children - The component to render if access is allowed.
 * @param {string[]} allowedRoles - Array of roles allowed to access the route.
 * @param {string} userRole - The current user's role (from context, Redux, or localStorage)
 */
export default function ProtectedRoute({ children, allowedRoles, userRole }) {
  if (!userRole) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
   
    return <Navigate to="/" replace />; 
  }

  // User is allowed
  return children;
}
