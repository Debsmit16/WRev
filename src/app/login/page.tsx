'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    console.log('Login attempt with email:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 animate-fade-in-up">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                WRev
              </h1>
            </Link>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome to WRev
            </h2>
            <p className="text-gray-600">
              Log in to access your health dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:outline-none group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Continue</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>

          {/* Additional Options */}
          <div className="mt-8 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">or</span>
              </div>
            </div>

            {/* Demo Access */}
            <button
              type="button"
              className="w-full bg-white/50 border border-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-white/70 hover:border-gray-300 transition-all duration-300 focus:ring-4 focus:ring-gray-500/20 focus:outline-none"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Demo Dashboard</span>
              </span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-gray-500 space-y-2">
            <p>
              Don&apos;t have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Contact us for access
              </a>
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-green-700 text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
