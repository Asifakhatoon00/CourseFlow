import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-900">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
          About Project PRJ_154
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          A Unified Portal for Model Curriculum Development
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          AICTE Model Curriculum Portal for all AICTE-Approved Institutes in India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-rose-50/70 border border-rose-200 p-6 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="h-5 w-5" />
            <span>The Problem</span>
          </div>
          <p className="text-xs text-rose-950 leading-relaxed">
            Technical institutes often maintain curriculum information across unstructured PDF documents, spread across different versions and academic regulations. This makes side-by-side comparison, gap analysis, and timely syllabus revision difficult and error-prone.
          </p>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            <span>The Solution</span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed">
            A unified portal that transforms uploaded curriculum documents into structured information and provides automated tools for AI comparison, gap identification, continuous improvement, and version control.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">SDG 9 Alignment</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          This project maps directly to <strong>SDG 9 — Industry, Innovation and Infrastructure</strong> by fostering digital infrastructure for technical education and standardizing skills alignment with modern tech industry needs (Cloud, DevSecOps, AI/ML).
        </p>
      </div>
    </div>
  );
}
