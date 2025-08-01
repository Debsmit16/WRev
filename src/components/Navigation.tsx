'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Beautiful Mobile-Optimized Navigation */}
      <nav className="backdrop-blur-md bg-white/95 border-b border-blue-100 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg sm:text-xl">W</span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                WRev
              </span>
            </Link>
            
            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-3">
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-300 active:scale-95 hover:from-blue-600 hover:to-cyan-600"
              >
                Login
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl hover:bg-blue-50 transition-colors active:scale-95 border border-blue-200"
              >
                <svg 
                  className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="ml-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600"
              >
                Login
              </Link>
              <Link
                href="/admin"
                className="ml-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-indigo-600 text-sm"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Beautiful Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-gradient-to-b from-white/95 to-blue-50/95 backdrop-blur-md border-t border-blue-100 shadow-xl">
            <div className="px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 active:scale-95 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-md'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-md'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {item.href === '/' && '🏠'}
                      {item.href === '/about' && 'ℹ️'}
                      {item.href === '/features' && '⭐'}
                      {item.href === '/how-it-works' && '⚙️'}
                      {item.href === '/pricing' && '💰'}
                      {item.href === '/team' && '👥'}
                      {item.href === '/contact' && '📞'}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
              
              {/* Special Login Button */}
              <div className="pt-4 border-t border-blue-200 mt-4">
                <Link
                  href="/login"
                  className="block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 active:scale-95 hover:from-blue-600 hover:to-cyan-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-xl">🔐</span>
                    <span>Login to WRev</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
