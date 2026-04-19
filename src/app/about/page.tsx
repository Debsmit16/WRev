import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100/60">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_38%),radial-gradient(circle_at_85%_28%,rgba(59,130,246,0.18),transparent_35%)]"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-blue-200/35 blur-3xl"></div>
        <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-cyan-200/35 blur-3xl"></div>
        <div className="parallax-chip left-[8%] top-[28%] rounded-full px-4 py-2 text-xs font-semibold text-blue-700 animation-delay-200">
          Respiratory insight
        </div>
        <div className="parallax-chip right-[10%] top-[22%] rounded-full px-4 py-2 text-xs font-semibold text-cyan-700 animation-delay-400">
          Predictive AI
        </div>
        <div className="parallax-chip left-[18%] bottom-[18%] rounded-full px-4 py-2 text-xs font-semibold text-slate-700 animation-delay-600">
          Connected care
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-down">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-gradient">
              About WRev
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering the future of respiratory health monitoring through innovative technology and compassionate care
            </p>
            <div className="mt-8 inline-flex items-center rounded-full border border-white/70 bg-white/45 px-5 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
              <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Vision Driven Healthcare Innovation
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 section-sheen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left animation-delay-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                WRev was born from a simple yet powerful vision: to transform respiratory healthcare through 
                real-time monitoring and intelligent alerts. We believe that everyone deserves access to 
                advanced health monitoring technology that can prevent emergencies before they happen.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of healthcare professionals, engineers, and data scientists work tirelessly to 
                create solutions that bridge the gap between patients, caregivers, and healthcare providers.
              </p>
            </div>
            <div className="card-glow rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-right animation-delay-400">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">10K+</div>
                  <div className="text-gray-600">Lives Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">50+</div>
                  <div className="text-gray-600">Healthcare Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 section-sheen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Founded by Team_Avyantrix, WRev emerged from personal experiences with respiratory health challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glow rounded-2xl p-6 shadow-lg hover-lift animate-fade-in-left animation-delay-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">2023</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">The Beginning</h3>
              <p className="text-gray-600">
                Team_Avyantrix identified the critical need for real-time respiratory monitoring after witnessing 
                the challenges faced by asthma and COPD patients.
              </p>
            </div>

            <div className="card-glow rounded-2xl p-6 shadow-lg hover-lift animate-fade-in-left animation-delay-400">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600">
                Intensive research and development phase, collaborating with healthcare professionals 
                to create the most effective monitoring solution.
              </p>
            </div>

            <div className="card-glow rounded-2xl p-6 shadow-lg hover-lift animate-fade-in-right animation-delay-600">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white font-bold">2025</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Launch</h3>
              <p className="text-gray-600">
                WRev launches with comprehensive respiratory monitoring capabilities, 
                ready to protect and enhance lives worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-glow rounded-2xl p-5 text-center hover-lift animate-fade-in-left animation-delay-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Care First</h3>
              <p className="text-gray-600 text-sm">Every decision is made with patient wellbeing as our top priority</p>
            </div>

            <div className="card-glow rounded-2xl p-5 text-center hover-lift animate-zoom-in-soft animation-delay-400">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Pushing boundaries with cutting-edge technology and creative solutions</p>
            </div>

            <div className="card-glow rounded-2xl p-5 text-center hover-lift animate-zoom-in-soft animation-delay-600">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600 text-sm">Dependable monitoring you can trust when it matters most</p>
            </div>

            <div className="card-glow rounded-2xl p-5 text-center hover-lift animate-fade-in-right animation-delay-800">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Building connections between patients, families, and healthcare providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why WRev Section */}
      <section className="py-16 bg-gradient-to-br from-white via-sky-50/70 to-cyan-50/70 section-sheen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why WRev Stands Out</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine practical healthcare design with intelligent software to create a system that is useful, approachable, and reliable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glow rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-left animation-delay-200">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v2a3 3 0 006 0v-2c0-1.657-1.343-3-3-3zm0 0V5m0 6v8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Built for Everyday Use</h3>
              <p className="text-gray-600 leading-relaxed">
                WRev is designed to blend into real life, making respiratory monitoring feel simple instead of overwhelming.
              </p>
            </div>

            <div className="card-glow rounded-3xl p-8 shadow-xl hover-lift animate-zoom-in-soft animation-delay-400">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 7h10M7 17h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Actionable Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Instead of noisy notifications, the system highlights what matters most so users can act quickly and confidently.
              </p>
            </div>

            <div className="card-glow rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-right animation-delay-600">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 4v1m0-9v1m7 4a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Care Network Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Patients, caregivers, and doctors can stay connected through one shared monitoring ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
