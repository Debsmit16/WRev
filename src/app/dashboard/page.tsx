'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Top Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Dashboard Title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                WRev
              </Link>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <h1 className="hidden sm:block text-xl font-semibold text-gray-800">Dashboard</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Hi {user.name.split(' ')[0]}, here&apos;s your respiratory summary.
            </h2>
            <p className="text-gray-600">
              Monitor your health metrics and stay informed about your respiratory wellness.
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <span>Last sync: {vitals.spo2.timestamp.toLocaleTimeString()}</span>
              <span>•</span>
              <span>Device: {user.deviceId}</span>
              <span>•</span>
              <span>📍 {user.location}</span>
            </div>
          </div>
        </div>

        {/* Real-Time Vitals Overview */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Real-Time Vitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SpO2 Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">SpO₂</h4>
                    <p className="text-sm text-gray-500">Oxygen Saturation</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vitals.spo2.status)}`}>
                  {vitals.spo2.status}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{vitals.spo2.value}%</div>
              <p className="text-sm text-gray-500">Updated {formatTimeAgo(vitals.spo2.timestamp)}</p>
            </div>

            {/* Heart Rate Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Heart Rate</h4>
                    <p className="text-sm text-gray-500">Beats per minute</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vitals.heartRate.status)}`}>
                  {vitals.heartRate.status}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{vitals.heartRate.value} bpm</div>
              <p className="text-sm text-gray-500">Updated {formatTimeAgo(vitals.heartRate.timestamp)}</p>
            </div>

            {/* FEV1 Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">FEV₁</h4>
                    <p className="text-sm text-gray-500">Lung Function</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vitals.fev1.status)}`}>
                  {vitals.fev1.status}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{vitals.fev1.value}L</div>
              <p className="text-sm text-gray-500">Updated {formatTimeAgo(vitals.fev1.timestamp)}</p>
            </div>
          </div>
        </div>

        {/* Air Quality Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></span>
            Air Quality & Environment
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AQI Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Air Quality Index</h4>
                  <p className="text-sm text-gray-500">📍 {airQuality.aqi.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(airQuality.aqi.status)}`}>
                  {airQuality.aqi.status}
                </span>
              </div>

              {/* AQI Circular Gauge */}
              <div className="flex items-center justify-center mb-4">
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

              {/* AQI Color Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Good</span>
                  <span>Moderate</span>
                  <span>Unhealthy</span>
                </div>
                <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full relative">
                  <div
                    className="absolute top-0 w-2 h-2 bg-white border-2 border-gray-800 rounded-full transform -translate-y-0"
                    style={{ left: `${(airQuality.aqi.value / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Environmental Metrics */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <h4 className="font-semibold text-gray-800 mb-4">Environmental Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* PM2.5 */}
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-800">{airQuality.pm25.value}</div>
                  <div className="text-xs text-gray-500">μg/m³</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">PM2.5</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(airQuality.pm25.status)}`}>
                    {airQuality.pm25.status}
                  </span>
                </div>

                {/* CO2 */}
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-800">{airQuality.co2.value}</div>
                  <div className="text-xs text-gray-500">ppm</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">CO₂</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(airQuality.co2.status)}`}>
                    {airQuality.co2.status}
                  </span>
                </div>

                {/* Temperature */}
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-800">{airQuality.temperature.value}</div>
                  <div className="text-xs text-gray-500">{airQuality.temperature.unit}</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">Temperature</div>
                </div>

                {/* Humidity */}
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <div className="text-2xl font-bold text-gray-800">{airQuality.humidity.value}</div>
                  <div className="text-xs text-gray-500">{airQuality.humidity.unit}</div>
                  <div className="text-sm font-medium text-gray-600 mt-1">Humidity</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Trend Graphs & Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Health Trend Graphs */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Health Trends</h3>
                <div className="flex space-x-2">
                  {['spo2', 'fev1', 'pm25'].map((trend) => (
                    <button
                      key={trend}
                      onClick={() => setSelectedTrend(trend)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
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

              {/* Simple Chart Visualization */}
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

          {/* Risk Alerts & Notifications */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Risk Alerts</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {alerts.filter(a => a.type === 'critical' || a.type === 'warning').length} Active
                </span>
              </div>

              {/* Alert Timeline */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 pl-4 py-3 rounded-r-lg ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{alert.message}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.reason}</p>
                        {alert.vitals.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {alert.vitals.map((vital, idx) => (
                              <span key={idx} className="inline-block bg-white/50 px-2 py-1 rounded text-xs text-gray-700 mr-2">
                                {vital}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Info & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Info Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Patient Info</h3>

            {/* Profile Image Placeholder */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Device & Location Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Device ID:</span>
                <span className="font-medium text-gray-800">{user.deviceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium text-gray-800">{user.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Sync:</span>
                <span className="font-medium text-gray-800">{vitals.spo2.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Download Reports</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Medication Tracker</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Pollution Map</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Emergency</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">AI Risk Score</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-teal-50 hover:bg-teal-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-teal-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Share Data</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Settings</span>
                </button>

                <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group">
                  <svg className="w-8 h-8 text-gray-600 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Help & Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
