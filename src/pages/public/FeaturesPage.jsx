import React from 'react';
import { UploadCloud, Sparkles, BookOpen, AlertTriangle, CheckCircle2, History, FileText, Shield } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    { title: 'Curriculum Upload', desc: 'Upload existing PDF curriculum files easily.', icon: UploadCloud },
    { title: 'AI Extraction', desc: 'Extract structured information automatically.', icon: Sparkles },
    { title: 'AI Comparison', desc: 'Compare institutional curriculum against AICTE model reference.', icon: BookOpen },
    { title: 'Gap Analysis', desc: 'Identify potentially missing or outdated content.', icon: AlertTriangle },
    { title: 'Recommendations', desc: 'Display AI-generated suggestions.', icon: CheckCircle2 },
    { title: 'Version Management', desc: 'Maintain complete curriculum revision history.', icon: History },
    { title: 'Reports', desc: 'Generate printable curriculum analysis reports.', icon: FileText },
    { title: 'Secure Access', desc: 'Role-based application interface for Admin, Faculty, and Students.', icon: Shield }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-900">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Platform Features</h1>
        <p className="text-xs text-slate-500">Explore the comprehensive toolkit built for technical education governance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
