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
      role: "Hardware Engineer",
      bio: "Hardware specialist focused on medical-grade sensor integration and device optimization for respiratory monitoring.",
      linkedin: "https://www.linkedin.com/in/ayushman-das-ba6272320/",
      image: "/team/ayushman-das.jpg",
      expertise: ["Hardware Design", "Sensor Integration", "Medical Devices"]
    },
    {
      name: "Annick Das",
      role: "Full-Stack Developer",
      bio: "Full-stack developer specializing in healthcare applications and real-time monitoring systems.",
      linkedin: "https://www.linkedin.com/in/ujan-das-b1995b2a2/",
      image: "/team/ujan-das.jpg",
      expertise: ["Full-Stack Development", "Real-time Systems", "Database Design"]
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

  const revealClasses = [
    'animate-fade-in-left animation-delay-200',
    'animate-fade-in-down animation-delay-400',
    'animate-fade-in-right animation-delay-600',
    'animate-fade-in-left animation-delay-800',
    'animate-fade-in-right animation-delay-1000',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50/70">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.35)]">
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
              <Link href="/login" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden section-sheen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-blue-600/10"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>
        <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-16 bottom-10 h-44 w-44 rounded-full bg-cyan-200/30 blur-3xl"></div>
        <div className="absolute left-[14%] top-[20%] h-16 w-16 rounded-full bg-white/45 blur-2xl animate-float"></div>
        <div className="absolute right-[18%] top-[24%] h-20 w-20 rounded-full bg-cyan-300/25 blur-2xl animate-float-delayed"></div>
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-in-down">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-blue-700 shadow-md backdrop-blur-md">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Team Avyantrix
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-gradient">
                <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
                  Meet The Minds Behind WRev
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                The builders, researchers, and innovators shaping our respiratory health platform into a professional, human-centered experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Healthcare-first thinking</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Cross-functional expertise</span>
                <span className="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md">Product + engineering depth</span>
              </div>
            </div>

            <div className="relative animate-zoom-in-soft animation-delay-400">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-transparent blur-2xl"></div>
              <div className="card-glow relative rounded-[2rem] p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/70 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-blue-500">Team snapshot</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">A focused, multidisciplinary core</h2>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    {teamMembers.length} members
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Leadership</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">Product + Tech</p>
                    <p className="mt-1 text-sm text-gray-600">Strategic direction and technical execution</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md">
                    <p className="text-sm font-medium text-gray-500">Core capability</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">IoT + AI</p>
                    <p className="mt-1 text-sm text-gray-600">Sensors, intelligence, and reliable delivery</p>
                  </div>
                  <div className="rounded-2xl border border-white/70 bg-white/65 p-4 backdrop-blur-md sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Collaboration mode</p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">Fast feedback, clinical context, rapid iteration</p>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side-scrolling Team Rail */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto pb-3">
            <div className="flex min-w-max snap-x snap-mandatory gap-5 pr-6">
              {teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-rail`}
                  className={`card-glow min-w-[280px] max-w-[320px] snap-start rounded-[1.75rem] p-5 shadow-xl ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'} ${index === 0 ? 'animation-delay-200' : index === 1 ? 'animation-delay-400' : index === 2 ? 'animation-delay-600' : index === 3 ? 'animation-delay-800' : 'animation-delay-1000'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-[1px] shadow-lg">
                      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/95 text-blue-700">
                        <span className="text-sm font-bold">{member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{member.name}</p>
                      <p className="text-sm font-medium text-blue-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{member.expertise[0]}</p>
                </div>
              ))}
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
                className={`group card-glow rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover-lift ${revealClasses[index % revealClasses.length]}`}
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="mx-auto h-36 w-36 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-[2px] shadow-lg">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white/85 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                      {/* Try to load image first */}
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={144}
                        height={144}
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
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-cyan-400">
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
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-colors hover:bg-blue-700"
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
                        className="rounded-full border border-white/70 bg-white/65 px-3 py-1 text-xs text-blue-700 backdrop-blur-md"
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

      <section className="py-16 bg-gradient-to-r from-blue-50/60 to-cyan-50/60 section-sheen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-glow rounded-[1.75rem] p-6 shadow-lg animate-fade-in-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">People first</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Aligned around real health outcomes</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">Our team combines technical depth with practical healthcare context for decisions that matter.</p>
            </div>
            <div className="card-glow rounded-[1.75rem] p-6 shadow-lg animate-zoom-in-soft animation-delay-300">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Execution style</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Fast loops, clear ownership</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">We move from insight to implementation quickly while keeping quality and reliability in focus.</p>
            </div>
            <div className="card-glow rounded-[1.75rem] p-6 shadow-lg animate-fade-in-right animation-delay-600">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Visual language</p>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Modern glass, intentional motion</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">The updated UI uses transparent layers and directional reveal effects for a professional feel.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
