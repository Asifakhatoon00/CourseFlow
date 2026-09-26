import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroVisual from '../../components/HeroVisual';
import { UploadCloud, Sparkles, BookOpen, AlertTriangle, CheckCircle2, History, FileText, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const demoStats = [
    { value: '120+', label: 'Institutes Registered' },
    { value: '35+', label: 'Academic Programs' },
    { value: '250+', label: 'Curricula Analyzed' },
    { value: '800+', label: 'Curriculum Versions' }
  ];

  const steps = [
    { num: '01', title: 'Upload', desc: 'Upload an existing institute curriculum PDF document.' },
    { num: '02', title: 'Extract', desc: 'The system extracts structured course, credit, and outcome information.' },
    { num: '03', title: 'Compare', desc: 'Compare the curriculum against the selected AICTE reference.' },
    { num: '04', title: 'Analyze', desc: 'Identify matches, potential gaps, deviations, and recommendations.' },
    { num: '05', title: 'Improve', desc: 'Review changes and create an immutable new curriculum version.' }
  ];

  const features = [
    { title: 'Curriculum Upload', desc: 'Upload existing curriculum PDF documents easily.', icon: UploadCloud },
    { title: 'AI Extraction', desc: 'Extract structured curriculum data from uploaded documents.', icon: Sparkles },
    { title: 'AI Comparison', desc: 'Compare institutional curriculum with AICTE reference models.', icon: BookOpen },
    { title: 'Gap Analysis', desc: 'Identify potentially missing or outdated content.', icon: AlertTriangle },
    { title: 'Recommendations', desc: 'Display AI-generated curriculum improvement suggestions.', icon: CheckCircle2 },
    { title: 'Version Management', desc: 'Maintain complete immutable curriculum revision history.', icon: History },
    { title: 'Reports', desc: 'Generate printable curriculum alignment reports.', icon: FileText },
    { title: 'Secure Access', desc: 'Role-based access control for Institute Admin, Faculty, and Students.', icon: Shield }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div className="space-y-4 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            PRJ_154 • AICTE Unified Curriculum Portal Framework • SDG 9
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            A Unified Platform for Smarter Curriculum Development
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Upload, analyze, compare and continuously improve institutional curricula using AI-powered curriculum analysis and version management.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Upload Curriculum</span>
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Hero Visual Component */}
        <HeroVisual />
      </section>

      {/* Demo Statistics Banner */}
      <section className="bg-blue-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {demoStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</span>
                <p className="text-xs text-blue-200 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-center text-blue-300/80 mt-6 italic">
            * Demonstration values illustrating system capabilities across registered technical institutions.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
          <p className="text-xs text-slate-500">Five simple steps from document upload to version publishing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative">
              <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded font-mono">
                {step.num}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Platform Features</h2>
          <p className="text-xs text-slate-500">Comprehensive suite of curriculum digitization and analysis tools.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
