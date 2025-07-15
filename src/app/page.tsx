import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">WRev</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 font-medium">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</Link>
              <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Glassy gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-blue-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                WRev
              </span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
              Respiratory Health Protection System
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Real-time respiratory and environmental monitoring for asthma and COPD care
            </p>

            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-2">
                <span>Enter Dashboard</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced monitoring capabilities designed for comprehensive respiratory care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* SpO2 Monitoring */}
            <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  SpO2 Monitoring
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Continuous oxygen saturation tracking with real-time alerts for critical levels
                </p>
              </div>
            </div>

            {/* Pollution Alerts */}
            <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Pollution Alerts
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Environmental monitoring with instant notifications for harmful air quality levels
                </p>
              </div>
            </div>

            {/* Geo-Tagged Warnings */}
            <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Geo-Tagged Warnings
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Location-based health alerts and environmental hazard notifications
                </p>
              </div>
            </div>

            {/* Caregiver Notifications */}
            <div className="group relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Caregiver Notifications
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant alerts to family members and healthcare providers during emergencies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              System in Development
            </h3>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our team of healthcare professionals and engineers are working to deliver
              the most advanced respiratory monitoring solution. Expected launch in Q2 2025.
            </p>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-8 py-4 rounded-2xl border border-blue-200/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-4 animate-pulse"></div>
              <span className="font-semibold">Development in Progress</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
