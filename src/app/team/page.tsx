'use client';

import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Team() {
  const teamMembers = [
    {
      name: "Debsmit Ghosh",
      role: "Project Lead",
      bio: "Leading the WRev project development and coordinating team efforts to create innovative respiratory health solutions.",
      linkedin: "https://www.linkedin.com/in/debsmit-ghosh-23267227b/",
      image: "/team/debsmit-ghosh.jpg",
      expertise: ["Project Management", "Healthcare Innovation", "Team Coordination"]
    },
    {
      name: "Anuksha Ganguly",
      role: "Technical Lead",
      bio: "Technical specialist with expertise in IoT and healthcare systems, architecting WRev's core technology stack.",
      linkedin: "https://www.linkedin.com/in/anuksha-ganguly-3a25b62a7/",
      image: "/team/anuksha-ganguly.jpg",
      expertise: ["IoT Development", "Healthcare Tech", "System Architecture"]
    },
    {
      name: "Ujan Das",
      role: "Full-Stack Developer",
      bio: "Full-stack developer specializing in healthcare applications and real-time monitoring systems.",
      linkedin: "https://www.linkedin.com/in/ujan-das-b1995b2a2/",
      image: "/team/ujan-das.jpg",
      expertise: ["Full-Stack Development", "Real-time Systems", "Database Design"]
    },
    {
      name: "Ayushman Das",
      role: "Hardware Engineer",
      bio: "Hardware specialist focused on medical-grade sensor integration and device optimization for respiratory monitoring.",
      linkedin: "https://www.linkedin.com/in/ayushman-das-ba6272320/",
      image: "/team/ayushman-das.jpg",
      expertise: ["Hardware Design", "Sensor Integration", "Medical Devices"]
    },
    {
      name: "Sobhan Roy",
      role: "Data Scientist",
      bio: "AI/ML specialist developing predictive algorithms for respiratory health monitoring and data analysis.",
      linkedin: "https://www.linkedin.com/in/sobhan-roy-596378259/",
      image: "/team/sobhan-roy.jpg",
      expertise: ["Machine Learning", "Data Analysis", "Predictive Modeling"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              WRev
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">About</Link>
              <Link href="/features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</Link>
              <Link href="/team" className="text-blue-600 font-medium">Team</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-blue-600/10"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              The passionate innovators behind WRev&apos;s revolutionary respiratory health technology
            </p>
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-6 py-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-blue-700 text-sm font-medium">Team Avyantrix</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {/* Try to load image first */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                        onLoad={(e) => {
                          // Image loaded successfully, hide fallback
                          const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'none';
                        }}
                        onError={(e) => {
                          // Image failed to load, show fallback
                          console.log(`Failed to load image: ${member.image}`);
                          (e.target as HTMLElement).style.display = 'none';
                          const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
