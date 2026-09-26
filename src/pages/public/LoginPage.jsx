import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { BookOpen, ArrowRight, AlertCircle, Building2, Users, ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@demo.edu');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const demoAccounts = [
    { label: 'University Admin', email: 'admin@demo.edu', pass: 'admin123', roleTitle: 'University Admin', route: '/curriculums/upload', icon: Building2 },
    { label: 'Faculty Expert', email: 'faculty@demo.edu', pass: 'faculty123', roleTitle: 'Faculty Member', route: '/faculty/dashboard', icon: Users },
    { label: 'AICTE Super Admin', email: 'superadmin@demo.edu', pass: 'admin123', roleTitle: 'AICTE Super Admin', route: '/admin/dashboard', icon: ShieldCheck }
  ];

  const handleSelectRoleAccount = (acc) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await mockService.login(email, password);
      setLoading(false);
      onLoginSuccess(user);

      if (user.role === 'faculty') {
        navigate('/faculty/dashboard', { replace: true });
      } else if (user.role === 'super_admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/curriculums/upload', { replace: true });
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-slate-900 font-sans text-base">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-slate-300 overflow-hidden p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md">
            <BookOpen className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Portal Sign In</h2>
          <p className="text-sm font-bold text-slate-600">Enter your official university credentials to access your workspace.</p>
        </div>

        {/* Demo Credential Quick-Select Tabs */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
            Select Role Demo Credentials:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {demoAccounts.map((acc, idx) => {
              const Icon = acc.icon;
              const isSelected = email === acc.email;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectRoleAccount(acc)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/30 font-extrabold shadow-sm'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`} />
                  <span className="text-xs font-extrabold leading-tight">{acc.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-sm text-rose-800 font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Manual Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-2 border-t border-slate-200">
          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-base p-3.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. admin@demo.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-slate-900 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-base p-3.5 pr-12 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white text-base font-extrabold rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Lock className="h-4 w-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

      </div>
    </div>
  );
}

