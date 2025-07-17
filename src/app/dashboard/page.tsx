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
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              WRev
            </Link>
            <div className="hidden sm:block">
              <span className="text-gray-400">|</span>
              <span className="ml-3 text-lg font-medium text-gray-700">Health Dashboard</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-sm font-medium">Online</span>
            </div>

            {/* User profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">Patient ID: {user.deviceId}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Navigation Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your health data</p>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div className="text-left">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs opacity-75">{item.description}</p>
                  </div>
                </button>
              ))}
            </nav>

            {/* Emergency Button */}
            <div className="p-4 border-t border-gray-200">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Emergency</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {navigationItems.find(item => item.id === activeTab)?.name || 'Overview'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'overview' && `Welcome back, ${user.name.split(' ')[0]}! Here's your health summary.`}
                  {activeTab === 'vitals' && 'Monitor your real-time health vitals'}
                  {activeTab === 'environment' && 'Track air quality and environmental factors'}
                  {activeTab === 'trends' && 'Analyze your health trends over time'}
                  {activeTab === 'alerts' && 'Review your health alerts and notifications'}
                  {activeTab === 'reports' && 'Access your medical reports and history'}
                  {activeTab === 'settings' && 'Manage your preferences and device settings'}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {vitals.spo2.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Health Status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Overall Status */}
                  <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-green-800">Good</h3>
                    <p className="text-sm text-green-600 mt-1">Overall Health</p>
                  </div>

                  {/* Key Vitals Summary */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">SpO₂</span>
                      <span className="font-semibold text-gray-800">{vitals.spo2.value}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Heart Rate</span>
                      <span className="font-semibold text-gray-800">{vitals.heartRate.value} bpm</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">FEV₁</span>
                      <span className="font-semibold text-gray-800">{vitals.fev1.value}L</span>
                    </div>
                  </div>

                  {/* Air Quality Summary */}
                  <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🌫️</span>
                    </div>
                    <h3 className="font-semibold text-yellow-800">Moderate</h3>
                    <p className="text-sm text-yellow-600 mt-1">Air Quality</p>
                    <p className="text-xs text-yellow-600 mt-1">AQI: {airQuality.aqi.value}</p>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">View Reports</span>
                  </button>

                  <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-center group">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">💊</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Medication</span>
                  </button>

                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-center group">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">🗺️</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Air Map</span>
                  </button>

                  <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-center group">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Share Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Vitals Tab */}
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SpO2 Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🫁</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">SpO₂</h3>
                        <p className="text-sm text-gray-500">Oxygen Saturation</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vitals.spo2.status)}`}>
                      {vitals.spo2.status}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{vitals.spo2.value}%</div>
                  <p className="text-sm text-gray-500">Normal range: 95-100%</p>
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${vitals.spo2.value}%` }}
                    ></div>
                  </div>
                </div>

                {/* Heart Rate Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
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
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(vitals.heartRate.value / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* FEV1 Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
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
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Data</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Health Trends</h3>
                  <div className="flex space-x-2">
                    {['spo2', 'fev1', 'pm25'].map((trend) => (
                      <button
                        key={trend}
                        onClick={() => setSelectedTrend(trend)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedTrend === trend
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
