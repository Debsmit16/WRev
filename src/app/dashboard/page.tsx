'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  // Navigation state
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user data - in real app this would come from authentication
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    deviceId: 'WRV-2024-001',
    location: 'New York, NY'
  });

  // Mock vitals data with real-time simulation
  const [vitals, setVitals] = useState({
    spo2: { value: 98, status: 'normal', timestamp: new Date() },
    heartRate: { value: 72, status: 'normal', timestamp: new Date() },
    fev1: { value: 3.2, status: 'warning', timestamp: new Date() }
  });

  // Mock air quality data
  const [airQuality] = useState({
    pm25: { value: 35, status: 'moderate' },
    co2: { value: 420, status: 'normal' },
    temperature: { value: 22, unit: '°C' },
    humidity: { value: 45, unit: '%' },
    aqi: { value: 68, status: 'moderate', location: 'New York, NY' }
  });

  // Mock alerts data
  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'FEV₁ below normal range',
      reason: 'Lung function decreased + elevated PM2.5',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      vitals: ['FEV₁: 3.2L', 'PM2.5: 35μg/m³']
    },
    {
      id: 2,
      type: 'info',
      message: 'Daily medication reminder',
      reason: 'Inhaler usage due',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      vitals: []
    },
    {
      id: 3,
      type: 'critical',
      message: 'SpO₂ dropped temporarily',
      reason: 'Low oxygen saturation detected',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      vitals: ['SpO₂: 94%', 'Heart Rate: 85 bpm']
    }
  ]);

  // Mock trend data for charts
  const [selectedTrend, setSelectedTrend] = useState('spo2');
  const [trendData] = useState({
    spo2: [
      { time: '6h ago', value: 97 },
      { time: '5h ago', value: 98 },
      { time: '4h ago', value: 96 },
      { time: '3h ago', value: 98 },
      { time: '2h ago', value: 97 },
      { time: '1h ago', value: 98 },
      { time: 'now', value: 98 }
    ],
    fev1: [
      { time: '6h ago', value: 3.4 },
      { time: '5h ago', value: 3.3 },
      { time: '4h ago', value: 3.2 },
      { time: '3h ago', value: 3.1 },
      { time: '2h ago', value: 3.2 },
      { time: '1h ago', value: 3.2 },
      { time: 'now', value: 3.2 }
    ],
    pm25: [
      { time: '6h ago', value: 28 },
      { time: '5h ago', value: 32 },
      { time: '4h ago', value: 35 },
      { time: '3h ago', value: 38 },
      { time: '2h ago', value: 35 },
      { time: '1h ago', value: 33 },
      { time: 'now', value: 35 }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        ...prev,
        spo2: {
          ...prev.spo2,
          value: 96 + Math.floor(Math.random() * 4), // 96-99
          timestamp: new Date()
        },
        heartRate: {
          ...prev.heartRate,
          value: 68 + Math.floor(Math.random() * 12), // 68-79
          timestamp: new Date()
        }
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-orange-500 bg-orange-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m ago`;
    return `${minutes}m ago`;
  };

  // Navigation items
  const navigationItems = [
    { id: 'overview', name: 'Overview', icon: '🏠', description: 'Health summary' },
    { id: 'vitals', name: 'Vitals', icon: '💓', description: 'Live monitoring' },
    { id: 'environment', name: 'Air Quality', icon: '🌫️', description: 'Environmental data' },
    { id: 'trends', name: 'Trends', icon: '📈', description: 'Historical data' },
    { id: 'alerts', name: 'Alerts', icon: '🚨', description: 'Health notifications' },
    { id: 'reports', name: 'Reports', icon: '📋', description: 'Medical reports' },
    { id: 'settings', name: 'Settings', icon: '⚙️', description: 'Preferences' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Mobile-Optimized Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-blue-50 transition-colors active:scale-95"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              WRev
            </Link>
            <div className="hidden sm:block">
              <span className="text-gray-400">|</span>
              <span className="ml-3 text-base sm:text-lg font-medium text-gray-700">Health Dashboard</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Status indicator */}
            <div className="flex sm:hidden items-center space-x-1 bg-gradient-to-r from-green-50 to-emerald-50 px-2 py-1 rounded-full border border-green-200">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-xs font-medium">Online</span>
            </div>

            {/* Desktop Status indicator */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-sm font-medium">System Online</span>
            </div>

            {/* User profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">ID: {user.deviceId}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-xs sm:text-sm">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile-Optimized Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 sm:w-64 bg-gradient-to-b from-white via-blue-50/30 to-cyan-50/30 backdrop-blur-md shadow-xl border-r border-blue-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Mobile Navigation Header */}
            <div className="p-4 sm:p-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between lg:justify-start">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">Health Dashboard</h2>
                  <p className="text-xs sm:text-sm text-blue-600 mt-1">Monitor your wellness</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile-Optimized Navigation Items */}
            <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 hover:shadow-md'
                  }`}
                >
                  <span className="text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{item.name}</p>
                    <p className="text-xs opacity-75 truncate">{item.description}</p>
                  </div>
                </button>
              ))}
            </nav>

            {/* Mobile Emergency Button */}
            <div className="p-3 sm:p-4 border-t border-blue-200 bg-gradient-to-r from-red-50 to-pink-50">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm sm:text-base">Emergency</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay - Fixed */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile-Optimized Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Mobile Page Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.name || 'Overview'}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {activeTab === 'overview' && `Welcome back, ${user.name.split(' ')[0]}! Here's your health summary.`}
                  {activeTab === 'vitals' && 'Monitor your real-time health vitals'}
                  {activeTab === 'environment' && 'Track air quality and environmental factors'}
                  {activeTab === 'trends' && 'Analyze your health trends over time'}
                  {activeTab === 'alerts' && 'Review your health alerts and notifications'}
                  {activeTab === 'reports' && 'Access your medical reports and history'}
                  {activeTab === 'settings' && 'Manage your preferences and device settings'}
                </p>
              </div>
              <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                Updated: {vitals.spo2.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Mobile-Optimized Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Mobile Quick Health Status */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Health Status</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Mobile Overall Status */}
                  <div className="sm:col-span-2 lg:col-span-1 text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300 active:scale-95">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-green-800 text-sm sm:text-base">Good</h3>
                    <p className="text-xs sm:text-sm text-green-600 mt-1">Overall Health</p>
                  </div>

                  {/* Mobile Key Vitals Summary */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 active:scale-95 transition-transform">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🫁</span>
                        <span className="text-blue-700 text-sm sm:text-base font-medium">SpO₂</span>
                      </div>
                      <span className="font-bold text-blue-800 text-sm sm:text-base">{vitals.spo2.value}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100 active:scale-95 transition-transform">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">❤️</span>
                        <span className="text-red-700 text-sm sm:text-base font-medium">Heart Rate</span>
                      </div>
                      <span className="font-bold text-red-800 text-sm sm:text-base">{vitals.heartRate.value} bpm</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 active:scale-95 transition-transform">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🌬️</span>
                        <span className="text-green-700 text-sm sm:text-base font-medium">FEV₁</span>
                      </div>
                      <span className="font-bold text-green-800 text-sm sm:text-base">{vitals.fev1.value}L</span>
                    </div>
                  </div>

                  {/* Mobile Air Quality Summary */}
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 shadow-md hover:shadow-lg transition-shadow duration-300 active:scale-95">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl sm:text-2xl">🌫️</span>
                    </div>
                    <h3 className="font-semibold text-yellow-800 text-sm sm:text-base">Moderate</h3>
                    <p className="text-xs sm:text-sm text-yellow-600 mt-1">Air Quality</p>
                    <p className="text-xs text-yellow-600 mt-1">AQI: {airQuality.aqi.value}</p>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
                  <button
                    onClick={() => setActiveTab('alerts')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {alerts.slice(0, 2).map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{alert.message}</p>
                          <p className="text-sm text-gray-600 mt-1">{alert.reason}</p>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  <button className="p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-center group active:scale-95">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Reports</span>
                  </button>

                  <button className="p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 text-center group active:scale-95">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-lg sm:text-2xl">💊</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Medication</span>
                  </button>

                  <button className="p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 text-center group active:scale-95">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-lg sm:text-2xl">🗺️</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Air Map</span>
                  </button>

                  <button className="p-3 sm:p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all duration-200 text-center group active:scale-95">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Share</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Mobile Vitals Tab */}
          {activeTab === 'vitals' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Mobile SpO2 Card */}
                <div className="sm:col-span-2 lg:col-span-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 active:scale-95 sm:hover:scale-105">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-lg sm:text-2xl">🫁</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">SpO₂</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Oxygen Saturation</p>
                      </div>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vitals.spo2.status)}`}>
                      {vitals.spo2.status}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{vitals.spo2.value}%</div>
                  <p className="text-xs sm:text-sm text-gray-500">Normal: 95-100%</p>
                  <div className="mt-3 sm:mt-4 bg-gradient-to-r from-gray-100 to-blue-50 rounded-full h-2 sm:h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${vitals.spo2.value}%` }}
                    ></div>
                  </div>
                </div>

                {/* Heart Rate Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-red-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-2xl">❤️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Heart Rate</h3>
                        <p className="text-sm text-gray-500">Beats per minute</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vitals.heartRate.status)}`}>
                      {vitals.heartRate.status}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{vitals.heartRate.value} bpm</div>
                  <p className="text-sm text-gray-500">Normal range: 60-100 bpm</p>
                  <div className="mt-4 bg-gradient-to-r from-gray-100 to-red-50 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${(vitals.heartRate.value / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* FEV1 Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-2xl">🌬️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">FEV₁</h3>
                        <p className="text-sm text-gray-500">Lung Function</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vitals.fev1.status)}`}>
                      {vitals.fev1.status}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{vitals.fev1.value}L</div>
                  <p className="text-sm text-gray-500">Normal range: 3.0-4.5L</p>
                  <div className="mt-4 bg-gradient-to-r from-gray-100 to-green-50 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${(vitals.fev1.value / 4.5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Environment Tab */}
          {activeTab === 'environment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AQI Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-200 p-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Air Quality Index</h3>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke={airQuality.aqi.value <= 50 ? '#10b981' : airQuality.aqi.value <= 100 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${(airQuality.aqi.value / 150) * 314} 314`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{airQuality.aqi.value}</div>
                          <div className="text-xs text-gray-500">AQI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(airQuality.aqi.status)}`}>
                      {airQuality.aqi.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">📍 {airQuality.aqi.location}</p>
                  </div>
                </div>

                {/* Environmental Metrics */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-cyan-200 p-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Data</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🌫️</span>
                        <div>
                          <p className="font-medium text-gray-800">PM2.5</p>
                          <p className="text-sm text-gray-500">Fine particles</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">{airQuality.pm25.value}</p>
                        <p className="text-sm text-gray-500">μg/m³</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-cyan-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">💨</span>
                        <div>
                          <p className="font-medium text-gray-800">CO₂</p>
                          <p className="text-sm text-gray-500">Carbon dioxide</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">{airQuality.co2.value}</p>
                        <p className="text-sm text-gray-500">ppm</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <span className="text-2xl block mb-2">🌡️</span>
                        <p className="text-lg font-semibold text-gray-800">{airQuality.temperature.value}{airQuality.temperature.unit}</p>
                        <p className="text-sm text-gray-500">Temperature</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <span className="text-2xl block mb-2">💧</span>
                        <p className="text-lg font-semibold text-gray-800">{airQuality.humidity.value}{airQuality.humidity.unit}</p>
                        <p className="text-sm text-gray-500">Humidity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Health Trends</h3>
                  <div className="flex space-x-2">
                    {['spo2', 'fev1', 'pm25'].map((trend) => (
                      <button
                        key={trend}
                        onClick={() => setSelectedTrend(trend)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedTrend === trend
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                            : 'bg-gradient-to-r from-gray-100 to-blue-50 text-gray-700 hover:from-blue-100 hover:to-cyan-100 hover:shadow-md'
                        }`}
                      >
                        {trend === 'spo2' ? 'SpO₂' : trend === 'fev1' ? 'FEV₁' : 'PM2.5'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-64">
                  <div className="flex items-end justify-between h-full space-x-2 px-4">
                    {trendData[selectedTrend as keyof typeof trendData].map((point, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-cyan-500"
                          style={{
                            height: `${(point.value / Math.max(...trendData[selectedTrend as keyof typeof trendData].map(p => p.value))) * 100}%`,
                            minHeight: '20px'
                          }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                          {point.time}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">
                      {selectedTrend === 'spo2' ? 'Oxygen Saturation (%)' :
                       selectedTrend === 'fev1' ? 'Lung Function (L)' :
                       'PM2.5 Levels (μg/m³)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Alerts & Notifications</h3>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`w-2 h-2 rounded-full ${
                              alert.type === 'critical' ? 'bg-red-500' :
                              alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                            }`}></span>
                            <p className="font-medium text-gray-800">{alert.message}</p>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.reason}</p>
                          {alert.vitals.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {alert.vitals.map((vital, idx) => (
                                <span key={idx} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                                  {vital}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Reports</h3>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">No Reports Available</h4>
                  <p className="text-gray-600 mb-4">Your medical reports will appear here once generated.</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">Device ID</p>
                      <p className="text-sm text-gray-500">{user.deviceId}</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">Location</p>
                      <p className="text-sm text-gray-500">{user.location}</p>
                    </div>
                    <button className="text-blue-600 text-sm font-medium">Update</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">Notifications</p>
                      <p className="text-sm text-gray-500">Health alerts and reminders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
