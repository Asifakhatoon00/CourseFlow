import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout({ children, onOpenLogin }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Navbar onOpenLogin={onOpenLogin} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
