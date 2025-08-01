'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'super_admin' | 'moderator';
}

export default function AdminProtectedRoute({ 
  children, 
  requiredRole = 'admin' 
}: AdminProtectedRouteProps) {
  const { user, adminUser, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in
        router.push('/login');
        return;
      }

      if (!adminUser || !userRole) {
        // Not an admin
        router.push('/login');
        return;
      }

      // Check role hierarchy
      const roleHierarchy = {
        'moderator': 1,
        'admin': 2,
        'super_admin': 3
      };

      const userRoleLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
      const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

      if (userRoleLevel < requiredRoleLevel) {
        // Insufficient permissions
        router.push('/admin'); // Redirect to basic admin dashboard
        return;
      }
    }
  }, [user, adminUser, userRole, loading, router, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Admin Access</h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !adminUser || !userRole) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
