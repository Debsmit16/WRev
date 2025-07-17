import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <Navigation />

      {/* Mobile-Optimized Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-blue-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>

        {/* Mobile-Optimized Floating Elements */}
        <div className="absolute top-20 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-2xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Mobile Status Badge */}
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse"></span>
            <span className="text-green-700 text-xs sm:text-sm font-medium">Live Health Monitoring Active</span>
          </div>

          {/* Mobile-Optimized Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 animate-fade-in-up animation-delay-200">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
              WRev
            </span>
          </h1>

          {/* Mobile-Optimized Subtitle */}
          <h2 className="text-lg sm:text-2xl lg:text-4xl font-semibold text-gray-700 mb-4 sm:mb-6 animate-fade-in-up animation-delay-400 px-2">
            Respiratory Health Protection System
          </h2>

          {/* Mobile-Optimized Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed animate-fade-in-up animation-delay-600 px-4">
            Real-time respiratory and environmental monitoring for asthma and COPD care.
            Advanced AI-powered insights to protect your health before symptoms appear.
          </p>

          {/* Mobile-Optimized CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 animate-fade-in-up animation-delay-800 px-4">
            <Link href="/dashboard" className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-2">
                <span>Start Monitoring</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <button className="group border-2 border-blue-500 text-blue-600 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:bg-blue-50 hover:border-blue-600 active:scale-95 transition-all duration-300">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch Demo</span>
              </span>
            </button>
          </div>

          {/* Mobile-Optimized Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 animate-fade-in-up animation-delay-1000 px-4">
            <div className="text-center group hover:scale-105 active:scale-95 transition-transform duration-300 p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">10K+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Lives Protected</div>
            </div>
            <div className="text-center group hover:scale-105 active:scale-95 transition-transform duration-300 p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">99.9%</div>
              <div className="text-gray-600 text-xs sm:text-sm">Uptime</div>
            </div>
            <div className="text-center group hover:scale-105 active:scale-95 transition-transform duration-300 p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-600 text-xs sm:text-sm">Monitoring</div>
            </div>
            <div className="text-center group hover:scale-105 active:scale-95 transition-transform duration-300 p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 mb-1 sm:mb-2">50+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Healthcare Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Key Features Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Key Features
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Advanced monitoring capabilities designed for comprehensive respiratory care
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Mobile SpO2 Monitoring */}
            <div className="group relative bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                  SpO2 Monitoring
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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

      {/* How It Works Preview Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-blue-50/30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              How WRev Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple setup, powerful monitoring, and intelligent insights in four easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Setup Sensors</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Easy installation of medical-grade sensors in your environment
              </p>
            </div>

            {/* Step 2 */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse">
                  <div className="w-full h-full bg-blue-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Monitor 24/7</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Continuous tracking of SpO2, air quality, and environmental factors
              </p>
            </div>

            {/* Step 3 */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Analysis</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced algorithms analyze patterns and predict potential issues
              </p>
            </div>

            {/* Step 4 */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 17h.01M6 17h.01M12 3v4m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Alerts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instant notifications to you and your caregivers when needed
              </p>
            </div>
          </div>

          {/* Process Flow Animation */}
          <div className="mt-16 relative">
            <div className="flex justify-center items-center space-x-4">
              <div className="hidden lg:block w-full h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200 relative">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" style={{width: '25%'}}></div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/how-it-works" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group">
              <span>Learn more about our process</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
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

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-white"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See what medical experts and patients are saying about WRev&apos;s innovative approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">Dr</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Dr. Sarah Chen</h4>
                    <p className="text-gray-600 text-sm">Pulmonologist</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  &quot;WRev represents the future of respiratory care. The real-time monitoring capabilities will revolutionize how we manage chronic conditions.&quot;
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Maria Rodriguez</h4>
                    <p className="text-gray-600 text-sm">Asthma Patient</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  &quot;Finally, a system that gives me peace of mind. Knowing my family will be alerted if something happens is invaluable.&quot;
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">Dr</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Dr. James Wilson</h4>
                    <p className="text-gray-600 text-sm">Emergency Medicine</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  &quot;The predictive capabilities could prevent countless emergency room visits. This technology is a game-changer.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-8">Trusted by leading healthcare institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-gray-100 px-6 py-3 rounded-lg">
                <span className="text-gray-600 font-semibold">Mayo Clinic</span>
              </div>
              <div className="bg-gray-100 px-6 py-3 rounded-lg">
                <span className="text-gray-600 font-semibold">Johns Hopkins</span>
              </div>
              <div className="bg-gray-100 px-6 py-3 rounded-lg">
                <span className="text-gray-600 font-semibold">Cleveland Clinic</span>
              </div>
              <div className="bg-gray-100 px-6 py-3 rounded-lg">
                <span className="text-gray-600 font-semibold">Mass General</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated on WRev Development
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Be the first to know when WRev launches and get exclusive early access
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-white/20 focus:outline-none text-gray-800 placeholder-gray-500"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300 whitespace-nowrap">
                Get Notified
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              No spam, unsubscribe at any time
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
