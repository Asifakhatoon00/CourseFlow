import React from 'react';
import { X, PlusCircle, MinusCircle, RefreshCw, GitCompare } from 'lucide-react';

export default function VersionComparisonModal({ diffData, onClose }) {
  if (!diffData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GitCompare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Version Comparison ({diffData.oldVersion} vs {diffData.newVersion})</h3>
              <p className="text-xs text-slate-400">Comparing modifications across curriculum revisions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Comparison Scope</span>
              <span className="font-bold text-slate-900">{diffData.oldVersion} (Archived) $\rightarrow$ {diffData.newVersion} (Current)</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Unchanged Courses</span>
              <span className="font-bold text-slate-800">{diffData.unchangedCount || 41} Courses Intact</span>
            </div>
          </div>

          {/* Added Items */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-emerald-900 flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-emerald-600" />
              Added Content in {diffData.newVersion} ({diffData.added?.length || 0})
            </h4>
            <div className="space-y-1.5">
              {diffData.added?.map((item, i) => (
                <div key={i} className="bg-white p-2.5 rounded border border-emerald-200 text-emerald-900 font-semibold">
                  + [{item.type}] {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* Modified Items */}
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-amber-900 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-amber-600" />
              Modified Content ({diffData.modified?.length || 0})
            </h4>
            <div className="space-y-1.5">
              {diffData.modified?.map((item, i) => (
                <div key={i} className="bg-white p-2.5 rounded border border-amber-200 text-amber-900 font-semibold">
                  ~ [{item.type}] {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* Removed Items */}
          <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-rose-900 flex items-center gap-2">
              <MinusCircle className="h-4 w-4 text-rose-600" />
              Removed Content ({diffData.removed?.length || 0})
            </h4>
            {(!diffData.removed || diffData.removed.length === 0) ? (
              <p className="text-slate-500 italic bg-white/60 p-2 rounded">No content removed in this version.</p>
            ) : (
              <div className="space-y-1.5">
                {diffData.removed.map((item, i) => (
                  <div key={i} className="bg-white p-2.5 rounded border border-rose-200 text-rose-900 font-semibold line-through">
                    - [{item.type}] {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
          >
            Close Version Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
