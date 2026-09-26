import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { GitCompare, Eye, FileText } from 'lucide-react';

export default function ComparisonListPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockService.getDashboardData().then(d => {
      mockService.getAnalysis('analysis-101').then(res => {
        setAnalyses([res]);
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Comparison Records...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Curriculum Comparison Records</h1>
        <p className="text-xs text-slate-500">History of AI alignment scans and reference comparisons.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white border-b border-slate-800">
              <th className="p-3.5 font-bold">Program</th>
              <th className="p-3.5 font-bold">Curriculum Version</th>
              <th className="p-3.5 font-bold">AICTE Reference</th>
              <th className="p-3.5 font-bold">Analysis Date</th>
              <th className="p-3.5 font-bold">Result</th>
              <th className="p-3.5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {analyses.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="p-3.5 font-bold text-slate-900">{item.program}</td>
                <td className="p-3.5 font-mono text-blue-900 font-bold">{item.version}</td>
                <td className="p-3.5 text-slate-800 font-semibold">{item.referenceTitle}</td>
                <td className="p-3.5 text-slate-500">{item.analysisDate}</td>
                <td className="p-3.5">
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                    78% Alignment
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => navigate(`/analysis/${item.id}`)}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded text-xs transition inline-flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <button
                    onClick={() => navigate('/reports')}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-xs transition inline-flex items-center gap-1 border border-slate-300"
                  >
                    <FileText className="h-3.5 w-3.5" /> Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
