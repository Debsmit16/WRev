'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Patient {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  medical_conditions: string[];
  medications: string[];
  allergies: string[];
  created_at: string;
  updated_at: string;
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
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
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

  // Search and filter functions
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.full_name?.toLowerCase().includes(term.toLowerCase()) ||
        patient.email?.toLowerCase().includes(term.toLowerCase()) ||
        patient.phone?.includes(term)
      );
      setFilteredPatients(filtered);
    }
  };

  // Patient management functions
  const handleEditPatient = (patient: Patient) => {
    setEditingPatient({ ...patient });
    setIsEditModalOpen(true);
  };

  const handleSavePatient = async (updatedPatient: Patient) => {
    try {
      const { error } = await supabase
        .from('patients')
        .update({
          full_name: updatedPatient.full_name,
          phone: updatedPatient.phone,
          date_of_birth: updatedPatient.date_of_birth,
          gender: updatedPatient.gender,
          address: updatedPatient.address,
          emergency_contact_name: updatedPatient.emergency_contact_name,
          emergency_contact_phone: updatedPatient.emergency_contact_phone,
          medical_conditions: updatedPatient.medical_conditions,
          medications: updatedPatient.medications,
          allergies: updatedPatient.allergies,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedPatient.id);

      if (error) throw error;

      // Reload data
      await loadDashboardData();
      setIsEditModalOpen(false);
      setEditingPatient(null);
      console.log('Patient updated successfully');
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Error updating patient. Please try again.');
    }
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const loadDashboardData = async () => {
    console.log('Loading admin dashboard data...');
    try {
      // Load all patients with full data
      console.log('Loading patients...');
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

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
      const patients = patientsData || [];
      setPatients(patients);
      setFilteredPatients(patients);
      setSystemStats({
        totalPatients: totalPatients || 0,
        activePatients: patients.length || 0,
        totalVitalsReadings: 0, // Simplified for now
        criticalAlerts: 0 // Simplified for now
      });

      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set empty data to prevent infinite loading
      setPatients([]);
      setFilteredPatients([]);
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
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search patients by name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-purple-50 px-4 py-2 rounded-lg">
                  Showing {filteredPatients.length} of {patients.length} patients
                </div>
              </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Patient Management</h3>
              </div>

              {filteredPatients.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Age</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Gender</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-800">{patient.full_name || 'N/A'}</td>
                          <td className="py-3 px-4 text-gray-600">{patient.email}</td>
                          <td className="py-3 px-4 text-gray-600">{patient.phone || 'N/A'}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {patient.date_of_birth
                              ? Math.floor((new Date().getTime() - new Date(patient.date_of_birth).getTime()) / (1000 * 60 * 60 * 24 * 365))
                              : 'N/A'
                            }
                          </td>
                          <td className="py-3 px-4 text-gray-600 capitalize">{patient.gender || 'N/A'}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(patient.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewPatient(patient)}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleEditPatient(patient)}
                                className="text-purple-600 hover:text-purple-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-purple-50 transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">👥</div>
                  <p className="text-gray-600 mb-2">
                    {searchTerm ? 'No patients found matching your search' : 'No patients registered yet'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => handleSearch('')}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
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

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Patient Details</h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-800">{selectedPatient.full_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedPatient.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-800">{selectedPatient.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-gray-800">
                      {selectedPatient.date_of_birth
                        ? new Date(selectedPatient.date_of_birth).toLocaleDateString()
                        : 'N/A'
                      }
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <p className="text-gray-800 capitalize">{selectedPatient.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-gray-800">{selectedPatient.address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Name</label>
                    <p className="text-gray-800">{selectedPatient.emergency_contact_name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                    <p className="text-gray-800">{selectedPatient.emergency_contact_phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPatient.medical_conditions?.length > 0 ? (
                        selectedPatient.medical_conditions.map((condition, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {condition}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">None</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Medications</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPatient.medications?.length > 0 ? (
                        selectedPatient.medications.map((medication, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {medication}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">None</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Allergies</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPatient.allergies?.length > 0 ? (
                        selectedPatient.allergies.map((allergy, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">None</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Account Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Joined</label>
                    <p className="text-gray-800">{new Date(selectedPatient.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Updated</label>
                    <p className="text-gray-800">{new Date(selectedPatient.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleEditPatient(selectedPatient);
                  setSelectedPatient(null);
                }}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Edit Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Edit Modal */}
      {isEditModalOpen && editingPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Edit Patient</h3>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingPatient(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingPatient) {
                handleSavePatient(editingPatient);
              }
            }} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editingPatient.full_name || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, full_name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editingPatient.phone || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={editingPatient.date_of_birth || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, date_of_birth: e.target.value})}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={editingPatient.gender || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, gender: e.target.value as 'male' | 'female' | 'other'})}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={editingPatient.address || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, address: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                    <input
                      type="text"
                      value={editingPatient.emergency_contact_name || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, emergency_contact_name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={editingPatient.emergency_contact_phone || ''}
                      onChange={(e) => setEditingPatient({...editingPatient, emergency_contact_phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter emergency contact phone"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                    <input
                      type="text"
                      value={editingPatient.medical_conditions?.join(', ') || ''}
                      onChange={(e) => setEditingPatient({
                        ...editingPatient,
                        medical_conditions: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter medical conditions (comma separated)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
                    <input
                      type="text"
                      value={editingPatient.medications?.join(', ') || ''}
                      onChange={(e) => setEditingPatient({
                        ...editingPatient,
                        medications: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter medications (comma separated)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                    <input
                      type="text"
                      value={editingPatient.allergies?.join(', ') || ''}
                      onChange={(e) => setEditingPatient({
                        ...editingPatient,
                        allergies: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter allergies (comma separated)"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingPatient(null);
                  }}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
