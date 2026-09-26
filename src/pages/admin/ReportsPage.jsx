import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockService';
import { FileText, Download, Eye, CheckCircle2, Shield } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockService.getReports().then(res => {
      setReports(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Reports...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Curriculum Analysis Reports</h1>
        <p className="text-xs text-slate-500">
          Generated curriculum analysis and AICTE model alignment reports.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map(rep => (
          <div key={rep.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">PDF Report</span>
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{rep.curriculumVersion}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{rep.title}</h3>
              <p className="text-xs text-slate-600">
                Institute: <strong>{rep.institute}</strong> • Reference: <strong>{rep.aicteReference}</strong> • Date: {rep.date}
              </p>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => alert(`Opening report preview for ${rep.title}`)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center justify-center gap-1.5"
              >
                <Eye className="h-4 w-4" /> View Report
              </button>
              <button
                onClick={() => alert(`Downloading official PDF report file: ${rep.title}.pdf`)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <Download className="h-4 w-4" /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
