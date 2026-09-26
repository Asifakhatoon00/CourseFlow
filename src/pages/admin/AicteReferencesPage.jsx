import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { BookMarked, Eye, CheckCircle2, Shield } from 'lucide-react';

export default function AicteReferencesPage() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockService.getReferences().then(res => {
      setReferences(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading AICTE References...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">AICTE Model Curriculum Repository</h1>
        <p className="text-xs text-slate-500">
          Official benchmark reference frameworks published by All India Council for Technical Education.
        </p>
      </div>

      <div className="space-y-4">
        {references.map(ref => (
          <div key={ref.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                  {ref.degree}
                </span>
                <span className="text-xs font-bold bg-slate-900 text-white px-2.5 py-0.5 rounded font-mono">
                  {ref.version}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ref.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                  {ref.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{ref.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{ref.description}</p>
              <p className="text-[11px] text-slate-400">
                Uploaded: {ref.uploadedDate} • Applicable: <strong className="text-slate-700">{ref.applicablePeriod}</strong>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/select-reference/curr-cse-2025`)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition"
              >
                Select for Comparison
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
