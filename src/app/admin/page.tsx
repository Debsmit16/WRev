'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Patient {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  last_vitals?: {
    spo2: number;
    heart_rate: number;
    timestamp: string;
  };
}

interface SystemStats {
  totalPatients: number;
  activePatients: number;
  totalVitalsReadings: number;
  criticalAlerts: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<{
    id: string;
    email: string;
    full_name: string;
    role: string;
    permissions: string[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalPatients: 0,
    activePatients: 0,
    totalVitalsReadings: 0,
    criticalAlerts: 0
  });

  // Direct authentication check - no ProtectedRoute wrapper needed
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

      // Load dashboard data
      await loadDashboardData();

    } catch (error) {
      console.error('Error in admin check:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const loadDashboardData = async () => {
    console.log('Loading admin dashboard data...');
    try {
      // Load patients with error handling
      console.log('Loading patients...');
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('id, email, full_name, phone, created_at')
        .order('created_at', { ascending: false })
        .limit(10); // Limit to 10 for faster loading

      if (patientsError) {
        console.error('Error loading patients:', patientsError);
      } else {
        console.log('Patients loaded:', patientsData?.length || 0);
      }

      // Load system stats with error handling
      console.log('Loading system stats...');
      const { count: totalPatients, error: countError } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error('Error loading patient count:', countError);
      }

      // Set data even if some queries fail
      setPatients(patientsData || []);
      setSystemStats({
        totalPatients: totalPatients || 0,
        activePatients: patientsData?.length || 0,
        totalVitalsReadings: 0, // Simplified for now
        criticalAlerts: 0 // Simplified for now
      });

      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set empty data to prevent infinite loading
      setPatients([]);
      setSystemStats({
        totalPatients: 0,
        activePatients: 0,
        totalVitalsReadings: 0,
        criticalAlerts: 0
      });
    }
  };

  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: '📊', description: 'System overview' },
    { id: 'patients', name: 'Patients', icon: '👥', description: 'Manage patients' },
    { id: 'analytics', name: 'Analytics', icon: '📈', description: 'Health analytics' },
    { id: 'alerts', name: 'Alerts', icon: '🚨', description: 'Critical alerts' },
    { id: 'settings', name: 'Settings', icon: '⚙️', description: 'System settings' },
  ];

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
                onClick={signOut}
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
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-3xl font-bold text-gray-800">{systemStats.totalPatients}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Patients</p>
                    <p className="text-3xl font-bold text-gray-800">{systemStats.activePatients}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vitals Readings</p>
                    <p className="text-3xl font-bold text-gray-800">{systemStats.totalVitalsReadings}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">💓</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                    <p className="text-3xl font-bold text-red-600">{systemStats.criticalAlerts}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🚨</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Patients</h3>
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
                    {patients.slice(0, 5).map((patient) => (
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
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">All Patients</h3>
              <div className="text-sm text-gray-600">
                Total: {patients.length} patients
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
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
                      <td className="py-3 px-4">
                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {['analytics', 'alerts', 'settings'].includes(activeTab) && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-gray-600">
                The {navigationItems.find(item => item.id === activeTab)?.name} section is under development.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
