'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type UserRole = 'patient' | 'admin' | 'super_admin' | 'moderator';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  permissions: string[];
  is_active: boolean;
  last_login?: string;
}

interface AuthContextType {
  user: User | null;
  adminUser: AdminUser | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string, userType?: 'patient' | 'admin') => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkAdminStatus: (userId?: string) => Promise<AdminUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (userId?: string): Promise<AdminUser | null> => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) {
      console.log('checkAdminStatus: No user ID available');
      return null;
    }

    console.log('checkAdminStatus: Checking admin status for user:', targetUserId);

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', targetUserId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('checkAdminStatus: Database error:', error);
        return null;
      }

      if (!data) {
        console.log('checkAdminStatus: No admin record found for user:', targetUserId);
        return null;
      }

      console.log('checkAdminStatus: Admin found:', data.email, 'Role:', data.role);

      return {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role as UserRole,
        permissions: data.permissions || [],
        is_active: data.is_active,
        last_login: data.last_login
      };
    } catch (error) {
      console.error('checkAdminStatus: Unexpected error:', error);
      return null;
    }
  };

  const updateUserRole = async () => {
    const admin = await checkAdminStatus();
    if (admin) {
      setAdminUser(admin);
      setUserRole(admin.role);
    } else {
      setAdminUser(null);
      setUserRole('patient');
    }
  };

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await updateUserRole();
      }

      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await updateUserRole();
        } else {
          setAdminUser(null);
          setUserRole(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, userType: 'patient' | 'admin' = 'patient') => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && userType === 'admin') {
      // Log admin session
      try {
        await supabase.from('admin_sessions').insert({
          admin_id: user?.id,
          ip_address: 'unknown', // You can get this from request headers in production
          user_agent: navigator.userAgent
        });
      } catch (sessionError) {
        console.error('Error logging admin session:', sessionError);
      }
    }

    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    // Log admin session end if admin
    if (adminUser) {
      try {
        await supabase
          .from('admin_sessions')
          .update({
            logout_time: new Date().toISOString(),
            is_active: false
          })
          .eq('admin_id', adminUser.id)
          .eq('is_active', true);
      } catch (error) {
        console.error('Error logging admin session end:', error);
      }
    }

    await supabase.auth.signOut();
  };

  const value = {
    user,
    adminUser,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
    checkAdminStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
