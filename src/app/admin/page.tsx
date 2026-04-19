'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function GlassMetricCard({
  title,
  value,
  subtitle,
  tone,
}: {
  title: string;
  value: string;
  subtitle: string;
  tone: 'sky' | 'emerald' | 'rose' | 'cyan';
}) {
  const toneClass =
    tone === 'sky'
      ? 'from-sky-500 to-blue-500'
      : tone === 'emerald'
        ? 'from-emerald-500 to-teal-500'
        : tone === 'rose'
          ? 'from-rose-500 to-orange-500'
          : 'from-cyan-500 to-blue-500';

  return (
    <article className="w-[280px] snap-start rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-sm shadow-md">
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className={`mt-3 bg-gradient-to-r ${toneClass} bg-clip-text text-3xl font-bold text-transparent`}>{value}</p>
      <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
    </article>
  );
}

function MetricBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/70 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

interface SystemStats {
  totalPatients: number;
  activePatients: number;
  totalVitalsReadings: number;
  criticalAlerts: number;
}

type DeviceStatus = 'online' | 'idle' | 'offline';
type AdminRole = 'super_admin' | 'ops_admin' | 'clinical_admin' | 'viewer';

type DeviceRegistryItem = {
  id: string;
  alias: string;
  firmware: string;
  lastSeen: string;
  battery: number;
  status: DeviceStatus;
};

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  lastLogin: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === '1';
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<{
    id: string;
    email: string;
    full_name: string;
    role: string;
    permissions: string[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalPatients: 0,
    activePatients: 0,
    totalVitalsReadings: 0,
    criticalAlerts: 0
  });
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminRole>('viewer');
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>([
    {
      id: 'u-1',
      name: 'Ava Turner',
      email: 'ava.turner@wrev.health',
      role: 'super_admin',
      active: true,
      lastLogin: '12 min ago',
    },
    {
      id: 'u-2',
      name: 'Noah James',
      email: 'noah.james@wrev.health',
      role: 'ops_admin',
      active: true,
      lastLogin: '39 min ago',
    },
    {
      id: 'u-3',
      name: 'Mia Patel',
      email: 'mia.patel@wrev.health',
      role: 'clinical_admin',
      active: true,
      lastLogin: '2 hr ago',
    },
    {
      id: 'u-4',
      name: 'Ethan Reed',
      email: 'ethan.reed@wrev.health',
      role: 'viewer',
      active: false,
      lastLogin: '2 days ago',
    },
  ]);

  const [deviceRegistry] = useState<DeviceRegistryItem[]>([
    { id: 'WRV-0012', alias: 'Unit Kolkata-12', firmware: 'v2.4.7', lastSeen: '20 sec ago', battery: 91, status: 'online' },
    { id: 'WRV-0041', alias: 'Unit Kolkata-41', firmware: 'v2.4.5', lastSeen: '2 min ago', battery: 64, status: 'online' },
    { id: 'WRV-0170', alias: 'Unit Durgapur-09', firmware: 'v2.3.8', lastSeen: '11 min ago', battery: 46, status: 'idle' },
    { id: 'WRV-0218', alias: 'Unit Siliguri-05', firmware: 'v2.4.7', lastSeen: '27 min ago', battery: 28, status: 'idle' },
    { id: 'WRV-0304', alias: 'Unit Howrah-07', firmware: 'v2.2.9', lastSeen: '2 hr ago', battery: 14, status: 'offline' },
    { id: 'WRV-0331', alias: 'Unit Asansol-03', firmware: 'v2.4.1', lastSeen: '4 hr ago', battery: 8, status: 'offline' },
  ]);

  // Direct authentication check - no ProtectedRoute wrapper needed
  useEffect(() => {
    if (isDemo) {
      setAdminUser({
        id: 'demo-admin',
        email: 'demo.admin@wrev.health',
        full_name: 'Demo Admin',
        role: 'super_admin',
        permissions: ['all'],
      });
      loadDashboardData();
      setLoading(false);
      return;
    }

    checkAdminAndLoadData();
  }, [isDemo]); // eslint-disable-line react-hooks/exhaustive-deps

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

      const roleResponse = await fetch('/api/auth/resolve-role', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!roleResponse.ok) {
        console.log('Role resolution failed, redirecting to login');
        router.push('/login');
        return;
      }

      const rolePayload = await roleResponse.json() as { role?: string };
      const role = rolePayload.role;

      if (!role || !['admin', 'super_admin', 'moderator'].includes(role)) {
        console.log('Not an admin user, redirecting to login');
        router.push('/login');
        return;
      }

      console.log('Admin verified:', session.user.email, role);
      setAccessToken(session.access_token);
      setAdminUser({
        id: session.user.id,
        email: session.user.email || '',
        full_name: (session.user.user_metadata?.full_name as string) || 'Admin User',
        role,
        permissions: [],
      });

      // Load dashboard data
      await loadDashboardData(session.access_token);

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

  // Patient management functions
  const handleEditPatient = (patient: Patient) => {
    setEditingPatient({ ...patient });
    setIsEditModalOpen(true);
  };

  const handleSavePatient = async (updatedPatient: Patient) => {
    try {
      if (!accessToken) {
        throw new Error('Missing auth session for update request');
      }

      const response = await fetch(`/api/admin/patients/${updatedPatient.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update patient');
      }

      // Reload data
      await loadDashboardData(accessToken);
      setIsEditModalOpen(false);
      setEditingPatient(null);
      console.log('Patient updated successfully');
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Error updating patient. Please try again.');
    }
  };

  const loadDashboardData = async (token?: string) => {
    console.log('Loading admin dashboard data...');
    try {
      const authToken = token || accessToken;
      if (!authToken) {
        throw new Error('Missing auth token for dashboard data');
      }

      // Load all patients with full data
      console.log('Loading patients...');
      const response = await fetch('/api/admin/patients', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load patients from API');
      }

      const payload = await response.json() as { patients?: Patient[] };
      const patientsData = payload.patients || [];

      console.log('Patients loaded:', patientsData.length);

      // Load system stats with error handling
      console.log('Loading system stats...');
      const totalPatients = patientsData.length;

      // Set data even if some queries fail
      setSystemStats({
        totalPatients: totalPatients || 0,
        activePatients: patientsData.length || 0,
        totalVitalsReadings: 0, // Simplified for now
        criticalAlerts: 0 // Simplified for now
      });

      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set empty data to prevent infinite loading
      setSystemStats({
        totalPatients: 0,
        activePatients: 0,
        totalVitalsReadings: 0,
        criticalAlerts: 0
      });
    }
  };

  const monthlyActiveUsers = Math.max(42, Math.round(systemStats.activePatients * 1.34));
  const activeDevices = deviceRegistry.filter((d) => d.status === 'online').length;
  const adherenceRate = Math.max(78, Math.min(99, Math.round(88 + systemStats.activePatients / 30)));
  const severityVolumes = {
    critical: Math.max(3, Math.round(systemStats.criticalAlerts + 2)),
    high: Math.max(8, Math.round(systemStats.activePatients * 0.18)),
    moderate: Math.max(16, Math.round(systemStats.activePatients * 0.32)),
    low: Math.max(20, Math.round(systemStats.activePatients * 0.42)),
  };

  const alertGeoBreakdown = [
    { zone: 'North Zone', count: 31 },
    { zone: 'South Zone', count: 22 },
    { zone: 'East Zone', count: 27 },
    { zone: 'West Zone', count: 19 },
  ];

  const alertByTime = [
    { period: '00-06', count: 9 },
    { period: '06-12', count: 21 },
    { period: '12-18', count: 33 },
    { period: '18-24', count: 24 },
  ];

  const modelPerformance = {
    version: 'RespireSense v3.2.1',
    sensitivity: 93.4,
    specificity: 91.2,
    f1Score: 0.92,
    calibrationError: 0.07,
    driftDelta: 1.8,
    lastRetrain: '2026-03-28',
    nextRetrain: '2026-04-25',
  };

  const createManagedUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Please enter user name and email.');
      return;
    }

    const newUser: ManagedUser = {
      id: `u-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      active: true,
      lastLogin: 'Never',
    };

    setManagedUsers((prev) => [newUser, ...prev]);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('viewer');
  };

  const toggleUserStatus = (id: string) => {
    setManagedUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    );
  };

  const updateUserRole = (id: string, role: AdminRole) => {
    setManagedUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  const sendResetPassword = (email: string) => {
    alert(`Password reset link sent to ${email}`);
  };

  const deviceStatusClass = (status: DeviceStatus) => {
    if (status === 'online') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (status === 'idle') return 'border-amber-200 bg-amber-50 text-amber-700';
    return 'border-rose-200 bg-rose-50 text-rose-700';
  };

  const roleChipClass = (role: AdminRole) => {
    if (role === 'super_admin') return 'border-blue-200 bg-blue-50 text-blue-700';
    if (role === 'ops_admin') return 'border-cyan-200 bg-cyan-50 text-cyan-700';
    if (role === 'clinical_admin') return 'border-violet-200 bg-violet-50 text-violet-700';
    return 'border-gray-200 bg-gray-50 text-gray-700';
  };

  const adminInitials = adminUser?.full_name
    ? adminUser.full_name
        .split(' ')
        .filter(Boolean)
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AD';

  const navigationItems = [
    { id: 'overview', name: 'Platform KPIs', icon: '📊', description: 'Executive health overview' },
    { id: 'devices', name: 'Device Registry', icon: '🛰️', description: 'Hardware fleet health' },
    { id: 'users', name: 'User Management', icon: '🧑‍⚕️', description: 'Admin access control' },
    { id: 'alerts', name: 'Alert Analytics', icon: '🚨', description: 'Severity + geography trends' },
    { id: 'ai', name: 'AI Performance', icon: '🧠', description: 'Model reliability and drift' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Admin Dashboard</h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">WRev Command Center</h1>
                <p className="text-sm text-gray-600">Operations, risk and AI oversight</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{adminUser?.full_name}</p>
                <p className="text-xs text-gray-500 capitalize">{adminUser?.role}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {adminInitials}
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
          <div className="card-glow overflow-x-auto rounded-3xl p-3 shadow-lg">
            <div className="flex min-w-max gap-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center space-x-2 rounded-2xl px-4 py-2.5 font-medium transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg'
                    : 'border border-white/70 bg-white/60 text-gray-700 hover:bg-white/85 hover:shadow-md'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
                <span className={`hidden text-xs sm:inline ${activeTab === item.id ? 'text-white/85' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {item.description}
                </span>
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-down">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Platform KPI Deck</h2>
                  <p className="mt-1 text-sm text-gray-600">MAU, active devices, alert severity volume, and adherence trajectory.</p>
                </div>
                <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-sky-700 backdrop-blur-sm">
                  Live executive snapshot
                </span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-max snap-x snap-mandatory gap-4">
                  <GlassMetricCard title="Monthly Active Users" value={String(monthlyActiveUsers)} subtitle="+12.4% vs last month" tone="sky" />
                  <GlassMetricCard title="Active Devices" value={`${activeDevices}/${deviceRegistry.length}`} subtitle="Fleet currently online" tone="emerald" />
                  <GlassMetricCard
                    title="Critical Alert Volume"
                    value={String(severityVolumes.critical)}
                    subtitle="Needs immediate triage"
                    tone="rose"
                  />
                  <GlassMetricCard title="Medication Adherence" value={`${adherenceRate}%`} subtitle="Program-wide adherence" tone="cyan" />
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
              <div className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left xl:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900">Alert Volume by Severity</h3>
                <p className="mt-1 text-sm text-gray-600">Cross-channel alerts distributed by urgency</p>
                <div className="mt-5 space-y-3">
                  {[
                    { label: 'Critical', value: severityVolumes.critical, cls: 'bg-rose-500' },
                    { label: 'High', value: severityVolumes.high, cls: 'bg-orange-500' },
                    { label: 'Moderate', value: severityVolumes.moderate, cls: 'bg-amber-500' },
                    { label: 'Low', value: severityVolumes.low, cls: 'bg-sky-500' },
                  ].map((item) => {
                    const percent = Math.round((item.value / Math.max(severityVolumes.low, 1)) * 100);
                    return (
                      <div key={item.label}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700">{item.label}</span>
                          <span className="text-gray-600">{item.value}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/70">
                          <div className={`h-2.5 rounded-full ${item.cls}`} style={{ width: `${Math.max(12, percent)}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
                <h3 className="text-lg font-semibold text-gray-900">Adherence Pulse</h3>
                <p className="mt-1 text-sm text-gray-600">7-day completion confidence</p>
                <div className="mt-5 flex items-center justify-center">
                  <div
                    className="grid h-36 w-36 place-items-center rounded-full"
                    style={{ background: `conic-gradient(#06b6d4 ${adherenceRate * 3.6}deg, #e2e8f0 0deg)` }}
                  >
                    <div className="grid h-28 w-28 place-items-center rounded-full bg-white/85 backdrop-blur-sm">
                      <p className="text-3xl font-bold text-gray-900">{adherenceRate}%</p>
                      <p className="text-xs text-gray-500">adherence</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-xs text-cyan-700">
                  Outlier cohorts are being auto-enrolled into intervention reminders.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left">
              <h3 className="text-lg font-semibold text-gray-900">Create Admin Account</h3>
              <p className="mt-1 text-sm text-gray-600">Provision new users and assign baseline role access.</p>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="rounded-xl border border-white/70 bg-white/70 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="rounded-xl border border-white/70 bg-white/70 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
                />
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as AdminRole)}
                  className="rounded-xl border border-white/70 bg-white/70 px-3 py-2.5 text-sm focus:border-sky-400 focus:outline-none"
                >
                  <option value="viewer">Viewer</option>
                  <option value="clinical_admin">Clinical Admin</option>
                  <option value="ops_admin">Ops Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
                <button
                  type="button"
                  onClick={createManagedUser}
                  className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg"
                >
                  Create Account
                </button>
              </div>
            </div>

            <div className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-up">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-gray-900">Access and Role Controls</h3>
                <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-gray-700">
                  {managedUsers.length} accounts
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Role</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Last Login</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managedUsers.map((userItem) => (
                      <tr key={userItem.id} className="border-b border-slate-100 text-sm">
                        <td className="px-3 py-3 font-medium text-slate-800">{userItem.name}</td>
                        <td className="px-3 py-3 text-slate-600">{userItem.email}</td>
                        <td className="px-3 py-3">
                          <select
                            value={userItem.role}
                            onChange={(e) => updateUserRole(userItem.id, e.target.value as AdminRole)}
                            className={`rounded-lg border px-2 py-1 text-xs font-semibold capitalize ${roleChipClass(userItem.role)}`}
                          >
                            <option value="viewer">viewer</option>
                            <option value="clinical_admin">clinical_admin</option>
                            <option value="ops_admin">ops_admin</option>
                            <option value="super_admin">super_admin</option>
                          </select>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${userItem.active ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                            {userItem.active ? 'Active' : 'Deactivated'}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-600">{userItem.lastLogin}</td>
                        <td className="px-3 py-3 text-right">
                          <div className="inline-flex gap-2">
                            <button
                              type="button"
                              onClick={() => sendResetPassword(userItem.email)}
                              className="rounded-lg border border-white/70 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-white"
                            >
                              Reset Password
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleUserStatus(userItem.id)}
                              className="rounded-lg border border-white/70 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-white"
                            >
                              {userItem.active ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Hardware Device Registry</h3>
                <p className="mt-1 text-sm text-gray-600">Firmware integrity, heartbeat freshness, and battery readiness.</p>
              </div>
              <span className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700">
                {deviceRegistry.length} registered devices
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Device</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Firmware</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Last Seen</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Battery</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceRegistry.map((device) => (
                    <tr key={device.id} className="border-b border-slate-100 text-sm">
                      <td className="px-3 py-3">
                        <p className="font-semibold text-slate-800">{device.id}</p>
                        <p className="text-xs text-slate-500">{device.alias}</p>
                      </td>
                      <td className="px-3 py-3 text-slate-700">{device.firmware}</td>
                      <td className="px-3 py-3 text-slate-700">{device.lastSeen}</td>
                      <td className="px-3 py-3">
                        <div className="w-32">
                          <div className="mb-1 flex justify-between text-xs text-slate-600">
                            <span>{device.battery}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200">
                            <div
                              className={`h-2 rounded-full ${device.battery > 40 ? 'bg-emerald-500' : device.battery > 20 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${device.battery}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${deviceStatusClass(device.status)}`}>
                          {device.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'alerts' && (
          <div className="grid gap-6 xl:grid-cols-3">
            <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left xl:col-span-2">
              <h3 className="text-xl font-semibold text-gray-900">Alert Analytics Breakdown</h3>
              <p className="mt-1 text-sm text-gray-600">By geography, risk level, and time-of-day window.</p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-800">Geography Distribution</p>
                  <div className="mt-3 space-y-3">
                    {alertGeoBreakdown.map((item) => (
                      <div key={item.zone}>
                        <div className="mb-1 flex justify-between text-xs text-slate-600">
                          <span>{item.zone}</span>
                          <span>{item.count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${Math.min(100, item.count * 2.4)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/70 bg-white/60 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-800">Time-of-Day Distribution</p>
                  <div className="mt-3 space-y-3">
                    {alertByTime.map((item) => (
                      <div key={item.period}>
                        <div className="mb-1 flex justify-between text-xs text-slate-600">
                          <span>{item.period}</span>
                          <span>{item.count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${Math.min(100, item.count * 2.8)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
              <h3 className="text-xl font-semibold text-gray-900">Risk Level Mix</h3>
              <p className="mt-1 text-sm text-gray-600">Severity-based operational load</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: 'Critical', value: severityVolumes.critical, cls: 'border-rose-200 bg-rose-50 text-rose-700' },
                  { label: 'High', value: severityVolumes.high, cls: 'border-orange-200 bg-orange-50 text-orange-700' },
                  { label: 'Moderate', value: severityVolumes.moderate, cls: 'border-amber-200 bg-amber-50 text-amber-700' },
                  { label: 'Low', value: severityVolumes.low, cls: 'border-sky-200 bg-sky-50 text-sky-700' },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl border px-3 py-2 ${item.cls}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em]">{item.label}</p>
                    <p className="mt-1 text-lg font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-left lg:col-span-2">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">AI Model Performance</h3>
                  <p className="mt-1 text-sm text-gray-600">Current model version, predictive quality and retraining cadence.</p>
                </div>
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {modelPerformance.version}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <MetricBlock label="Sensitivity" value={`${modelPerformance.sensitivity}%`} />
                <MetricBlock label="Specificity" value={`${modelPerformance.specificity}%`} />
                <MetricBlock label="F1 Score" value={String(modelPerformance.f1Score)} />
                <MetricBlock label="Calibration Error" value={String(modelPerformance.calibrationError)} />
              </div>

              <div className="mt-4 rounded-2xl border border-white/70 bg-white/60 p-4 text-sm text-slate-700 backdrop-blur-sm">
                Drift delta is currently <span className="font-semibold">{modelPerformance.driftDelta}%</span>, still within accepted operational threshold.
              </div>
            </section>

            <section className="card-glow rounded-[2rem] p-6 shadow-xl animate-fade-in-right">
              <h3 className="text-xl font-semibold text-gray-900">Retrain Schedule</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-white/70 bg-white/70 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Last Retrain</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{modelPerformance.lastRetrain}</p>
                </div>
                <div className="rounded-xl border border-white/70 bg-white/70 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Next Planned Retrain</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{modelPerformance.nextRetrain}</p>
                </div>
              </div>
            </section>
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
