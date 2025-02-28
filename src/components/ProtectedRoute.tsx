import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

/**
 * A wrapper component that protects routes requiring authentication
 * and/or admin privileges.
 */
const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
  const { user, profile, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, redirect to login
  if (!user) {
    // Save the attempted URL for redirecting after login
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and has admin if required), render the outlet
  return <Outlet />;
};

export default ProtectedRoute;
