import React, { useState } from 'react';

export default function LoginView({ onLogin, onPublicAccess }) {
  const [activeTab, setActiveTab] = useState('university'); // 'university' or 'aicte'
  const [universityRole, setUniversityRole] = useState('univ_admin'); // 'univ_admin', 'hod', 'course_coordinator'
  const [email, setEmail] = useState('admin@presidency.ac.in');
  const [password, setPassword] = useState('123456');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'aicte') {
      setEmail('admin@aicte-india.org');
    } else {
      setEmail('admin@presidency.ac.in');
    }
  };

  const handleUniversityRoleChange = (role) => {
    setUniversityRole(role);
    if (role === 'univ_admin') setEmail('admin@presidency.ac.in');
    else if (role === 'hod') setEmail('hod.cse@presidency.ac.in');
    else if (role === 'course_coordinator') setEmail('coordinator.dbms@presidency.ac.in');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'aicte') {
      onLogin({
        type: 'aicte',
        role: 'aicte_admin',
        roleLabel: 'AICTE Central Admin',
        name: 'AICTE Central Authority',
        email
      });
    } else {
      const roleLabels = {
        univ_admin: 'University Admin',
        hod: 'Head of Department (HOD)',
        course_coordinator: 'Course In-Charge / Committee Member'
      };
      onLogin({
        type: 'university',
        role: universityRole,
        roleLabel: roleLabels[universityRole],
        institution: 'Presidency University, Bengaluru',
        name: universityRole === 'univ_admin' ? 'Dr. S. K. Mehta (University Admin)' : universityRole === 'hod' ? 'Prof. Ananya Rao (HOD CSE)' : 'Dr. R. K. Varma (Course In-Charge)',
        email
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans text-slate-900">
      {/* Left Branding Panel */}
      <div className="lg:w-5/12 bg-blue-900 text-white p-8 lg:p-12 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-lg">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AICTE Curriculum Portal</h1>
              <p className="text-xs text-blue-200">All India Council for Technical Education</p>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <span className="inline-block px-3 py-1 rounded bg-blue-800 text-blue-200 text-xs font-semibold">
              Official Government Portal
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
              Unified Platform for Model Curricula & University Approvals
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Enables AICTE central authorities to publish model curricula and approve institutes, while allowing approved universities and their departmental teams to upload, compare, and update local course structures.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-800 text-xs text-blue-300 flex justify-between items-center">
          <span>Ministry of Education • Govt. of India</span>
          <button
            onClick={onPublicAccess}
            className="text-white hover:underline font-semibold text-xs"
          >
            Public Catalog Access →
          </button>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="lg:w-7/12 p-8 lg:p-16 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-white p-8 lg:p-10 rounded-xl border border-slate-200 shadow-sm">
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Sign In to Your Account</h2>
            <p className="text-xs text-slate-500 mt-1">Select your login category to access your portal workspace.</p>
          </div>

          {/* Main Account Type Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => handleTabSwitch('university')}
              className={`py-2 text-xs font-bold rounded-md transition ${
                activeTab === 'university'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              University / College
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('aicte')}
              className={`py-2 text-xs font-bold rounded-md transition ${
                activeTab === 'aicte'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AICTE Central Admin
            </button>
          </div>

          {/* Sub-role selector for University login */}
          {activeTab === 'university' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Select Your Role in University:</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="universityRole"
                    checked={universityRole === 'univ_admin'}
                    onChange={() => handleUniversityRoleChange('univ_admin')}
                    className="text-blue-700 focus:ring-blue-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">University Administrator</p>
                    <p className="text-[11px] text-slate-500">Manage institute profile & assign team member permissions</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="universityRole"
                    checked={universityRole === 'hod'}
                    onChange={() => handleUniversityRoleChange('hod')}
                    className="text-blue-700 focus:ring-blue-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Head of Department (HOD)</p>
                    <p className="text-[11px] text-slate-500">Upload department syllabus PDF & run comparison against AICTE model</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="universityRole"
                    checked={universityRole === 'course_coordinator'}
                    onChange={() => handleUniversityRoleChange('course_coordinator')}
                    className="text-blue-700 focus:ring-blue-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Course In-Charge / Review Committee</p>
                    <p className="text-[11px] text-slate-500">Review syllabus units, topics, credits, and learning outcomes</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'aicte' && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              <p className="font-bold">AICTE Central Authority Portal</p>
              <p className="text-slate-600 mt-0.5">Use your official AICTE administrator credentials to manage model curricula and approve registered universities.</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition"
            >
              Sign In to {activeTab === 'aicte' ? 'AICTE Admin Portal' : 'University Portal'}
            </button>
          </form>

          {/* Direct Public Catalog Link */}
          <div className="text-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onPublicAccess}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              Skip Sign In — Browse Public Student Catalog
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
