'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SimpleAdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<{
    id: string;
    email: string;
    full_name: string;
    role: string;
  } | null>(null);
  const [patients, setPatients] = useState<{
    id: string;
    email: string;
    full_name: string;
    phone: string;
    created_at: string;
  }[]>([]);

  useEffect(() => {
    checkAdminAndLoadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAdminAndLoadData = async () => {
    try {
      console.log('Checking admin status...');
      
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        console.log('No session found, redirecting to login');
        router.push('/login');
        return;
      }

      console.log('Session found for user:', session.user.email);

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', session.user.id)
        .eq('is_active', true)
        .single();

      if (adminError || !adminData) {
        console.log('Not an admin user, redirecting to login');
        router.push('/login');
        return;
      }

      console.log('Admin verified:', adminData.email, adminData.role);
      setAdminUser(adminData);

      // Load patients
      const { data: patientsData } = await supabase
        .from('patients')
        .select('id, email, full_name, phone, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      setPatients(patientsData || []);
      console.log('Data loaded successfully');

    } catch (error) {
      console.error('Error in admin check:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Admin Dashboard</h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">WRev Admin</h1>
                <p className="text-sm text-gray-600">Healthcare Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{adminUser?.full_name}</p>
                <p className="text-xs text-gray-500 capitalize">{adminUser?.role}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {adminUser?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'A'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {adminUser?.full_name}! 👋
          </h2>
          <p className="text-gray-600">
            You are logged in as <span className="font-semibold capitalize">{adminUser?.role}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">{patients.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Status</p>
                <p className="text-lg font-bold text-green-600">Active</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System</p>
                <p className="text-lg font-bold text-blue-600">Online</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Patients</h3>
          {patients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-medium text-gray-800">{patient.full_name || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">{patient.email}</td>
                      <td className="py-3 px-4 text-gray-600">{patient.phone || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">👥</div>
              <p className="text-gray-600">No patients registered yet</p>
            </div>
          )}
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Admin Dashboard Working!</h4>
              <p className="text-green-700 text-sm">
                Your admin authentication and dashboard are functioning correctly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
