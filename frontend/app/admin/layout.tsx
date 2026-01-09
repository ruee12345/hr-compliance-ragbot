"use client";

import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#72deff] to-[#0084bd]">
        <div className="text-xl text-white font-bold">Loading Admin Panel...</div>
      </div>
    );
  }

  // Check if user is admin
  const userRole = (session?.user as any)?.role;
  if (userRole !== 'admin') {
    router.push('/employee/chat');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#72deff]/20 to-[#0084bd]/20">
      {/* Admin Header */}
      <header className="bg-[#0084bd] text-white shadow-lg border-b-2 border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, Georgia, serif' }}>
              HR Compliance Admin
            </h1>
            <p className="text-[#feffba] font-medium">Manage Documents & Policies</p>
          </div>
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="flex space-x-4">
              <Link href="/admin/dashboard" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition font-bold">
                Dashboard
              </Link>
              <Link href="/admin/upload" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition font-bold">
                Upload PDF
              </Link>
              <Link href="/admin/documents" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition font-bold">
                Documents
              </Link>
              <Link href="/employee/chat" className="px-4 py-2 bg-[#feffba] text-gray-800 rounded-lg hover:bg-yellow-200 transition font-bold">
                Employee Chat
              </Link>
            </nav>
            
            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white bg-[#006994] px-4 py-2 rounded-lg border border-white/20">
                <div className="font-bold">{session?.user?.email || "User"}</div>
                <div className="opacity-90 capitalize">Admin</div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm bg-[#b22727] text-white rounded-lg hover:bg-[#8c1a1a] font-bold transition border border-white/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#8c6c57] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-medium">HR Compliance AI Admin Panel • Upload PDFs to train the AI assistant</p>
        </div>
      </footer>
    </div>
  );
}
