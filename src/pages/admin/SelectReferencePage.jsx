import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, RefreshCw } from 'lucide-react';

export default function SelectReferencePage() {
  const { curriculumId } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [references, setReferences] = useState([]);
  const [selectedReferenceId, setSelectedReferenceId] = useState('ref-aicte-2026');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    mockService.getCurriculum(curriculumId || 'curr-cse-2025').then(curr => {
      setCurriculum(curr);
    });
    mockService.getReferences().then(refs => {
      setReferences(refs);
    });
  }, [curriculumId]);

  if (!curriculum) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Reference Selection...</div>;

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await mockService.runAnalysis(curriculum.id, selectedReferenceId);
    setIsAnalyzing(false);
    navigate(`/analysis/${result.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Select AICTE Reference Curriculum</h1>
        <p className="text-xs text-slate-500">
          Choose an official AICTE model standard benchmark to compare your institutional curriculum against.
        </p>
      </div>

      {/* Selected Institute Curriculum Info Box */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-2">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Institute Curriculum Selected</span>
        <h3 className="text-lg font-bold text-white">{curriculum.title}</h3>
        <p className="text-xs text-slate-300">
          {curriculum.institute} • {curriculum.programName} • Version {curriculum.version} ({curriculum.academicYear})
        </p>
      </div>

      {/* Select Reference List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Select Official AICTE Reference Model
        </h3>

        <div className="space-y-3">
          {references.map(ref => {
            const isSelected = selectedReferenceId === ref.id;
            return (
              <div
                key={ref.id}
                onClick={() => setSelectedReferenceId(ref.id)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-start justify-between gap-4 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{ref.title}</span>
                    <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded font-mono">{ref.version}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{ref.status}</span>
                  </div>
                  <p className="text-xs text-slate-600">{ref.description}</p>
                  <p className="text-[11px] text-slate-400">Applicable: {ref.applicablePeriod}</p>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="radio"
                    name="aicteReference"
                    checked={isSelected}
                    onChange={() => setSelectedReferenceId(ref.id)}
                    className="text-blue-600 focus:ring-blue-600 h-4 w-4"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Running AI Analysis...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>Run AI Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
