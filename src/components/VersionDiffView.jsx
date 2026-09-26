import React from 'react';
import { GitCompare, PlusCircle, MinusCircle, RefreshCw } from 'lucide-react';
import { MOCK_VERSION_DIFF } from '../mockData';

export default function VersionDiffView() {
  const diffData = MOCK_VERSION_DIFF;

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-blue-600" />
            Git-Like Visual Syllabus Version Comparator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Side-by-side visual comparison highlighting additions, deletions, and credit adjustments between curriculum revisions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
          <span className="text-xs font-bold text-slate-700 px-2 py-1 bg-white rounded shadow-sm">
            {diffData.previousVersion} (Previous)
          </span>
          <span className="text-xs text-slate-400 font-bold">VS</span>
          <span className="text-xs font-bold text-blue-700 px-2 py-1 bg-blue-50 border border-blue-200 rounded shadow-sm">
            {diffData.currentVersion} (Active Model)
          </span>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center shadow">
        <div>
          <span className="text-xs font-bold bg-blue-500 px-2 py-0.5 rounded text-white">{diffData.courseCode}</span>
          <h3 className="text-base font-bold mt-1">{diffData.courseTitle}</h3>
        </div>
        <div className="text-right text-xs text-slate-300">
          <p>Total Differences Detected: <span className="font-bold text-amber-400">{diffData.changes.length} Changes</span></p>
          <p className="text-[11px] text-slate-400">Automated Semantic JSON Diff Engine</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-blue-600" />
          Diff Changes Breakdown ({diffData.previousVersion} $\rightarrow$ {diffData.currentVersion})
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {diffData.changes.map((item, idx) => {
            if (item.type === 'modified') {
              return (
                <div key={idx} className="p-3 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-lg space-y-1">
                  <div className="flex justify-between font-sans font-bold text-amber-900">
                    <span>MODIFIED: {item.field}</span>
                    <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded">MODIFIED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="bg-white/80 p-2 rounded text-rose-700 line-through">
                      - {item.oldVal}
                    </div>
                    <div className="bg-white/80 p-2 rounded text-emerald-800 font-semibold">
                      + {item.newVal}
                    </div>
                  </div>
                </div>
              );
            }

            if (item.type === 'added') {
              return (
                <div key={idx} className="p-3 bg-emerald-50/80 border-l-4 border-emerald-500 rounded-r-lg font-sans">
                  <div className="flex justify-between items-center font-bold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <PlusCircle className="h-4 w-4 text-emerald-600" /> ADDED: {item.field}
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-mono">+ ADDED</span>
                  </div>
                  <p className="text-xs text-emerald-900 font-semibold mt-1 bg-white/80 p-2 rounded">
                    {item.value}
                  </p>
                </div>
              );
            }

            if (item.type === 'removed') {
              return (
                <div key={idx} className="p-3 bg-rose-50/80 border-l-4 border-rose-500 rounded-r-lg font-sans">
                  <div className="flex justify-between items-center font-bold text-rose-900">
                    <span className="flex items-center gap-1.5">
                      <MinusCircle className="h-4 w-4 text-rose-600" /> DELETED: {item.field}
                    </span>
                    <span className="text-[10px] bg-rose-200 text-rose-800 px-2 py-0.5 rounded font-mono">- DELETED</span>
                  </div>
                  <p className="text-xs text-rose-800 line-through mt-1 bg-white/80 p-2 rounded">
                    {item.value}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
}