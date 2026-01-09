"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        role,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Try: employee@test.com / employee123 or admin@test.com / admin123');
      } else {
        // Redirect based on role
        if (role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/employee/chat');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#72deff] to-[#0084bd] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20">
        {/* Header */}
        <div className="bg-[#0084bd] text-white p-8 text-center">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
            HR Compliance AI
          </h1>
          <p className="text-[#feffba] mt-2 font-medium">Smart Policy Assistant</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
              Login as:
            </h2>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setRole('employee')}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${role === 'employee' 
                  ? 'bg-[#0084bd] text-white border-2 border-[#0084bd]' 
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-[#72deff]'}`}
              >
                Employee
                <div className="text-sm font-normal opacity-80">Ask Questions</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${role === 'admin' 
                  ? 'bg-[#b22727] text-white border-2 border-[#b22727]' 
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-[#b22727]'}`}
              >
                Admin
                <div className="text-sm font-normal opacity-80">Manage Rules</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-[#0084bd] focus:ring-2 focus:ring-[#72deff] focus:outline-none transition font-medium text-black placeholder:text-gray-500 placeholder:font-normal"
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black rounded-lg focus:border-[#0084bd] focus:ring-2 focus:ring-[#72deff] focus:outline-none transition font-medium text-black placeholder:text-gray-500 placeholder:font-normal"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-[#b22727] font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0084bd] hover:bg-[#006994] text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center font-bold">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-[#feffba] rounded-lg border border-yellow-300">
            <h3 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
              Demo Credentials:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border-2 border-[#72deff]">
                <div className="font-bold text-[#0084bd]">Employee</div>
                <div className="text-sm text-gray-600 font-medium">employee@test.com</div>
                <div className="text-sm text-gray-600 font-medium">employee123</div>
              </div>
              <div className="bg-white p-3 rounded border-2 border-[#b22727]">
                <div className="font-bold text-[#b22727]">Admin</div>
                <div className="text-sm text-gray-600 font-medium">admin@test.com</div>
                <div className="text-sm text-gray-600 font-medium">admin123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}