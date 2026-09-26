import React from 'react';
import { X, CheckCircle2, AlertTriangle, PlusCircle } from 'lucide-react';

export default function TopicComparisonModal({ course, onClose }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded font-mono">
              {course.instituteCourse}
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Detailed Topic-Level Comparison
            </h3>
            <p className="text-xs text-slate-400">Comparing with AICTE Reference Course: <strong>{course.referenceCourse}</strong></p>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Covered Topics */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-emerald-900 flex items-center gap-2 text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Covered Topics ({course.coveredTopics?.length || 0})
            </h4>
            <div className="space-y-1">
              {course.coveredTopics?.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/80 p-2 rounded text-emerald-900 font-semibold">
                  <span>✓ {topic}</span>
                </div>
              ))}
              {(!course.coveredTopics || course.coveredTopics.length === 0) && (
                <p className="text-slate-500 italic">No direct covered topics matched.</p>
              )}
            </div>
          </div>

          {/* Missing Topics */}
          <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-rose-900 flex items-center gap-2 text-xs">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              Potentially Missing Topics in Institute Syllabus ({course.missingTopics?.length || 0})
            </h4>
            <div className="space-y-1">
              {course.missingTopics?.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/80 p-2 rounded text-rose-900 font-semibold">
                  <span>⚠ {topic}</span>
                </div>
              ))}
              {(!course.missingTopics || course.missingTopics.length === 0) && (
                <p className="text-slate-500 italic">No missing topics detected.</p>
              )}
            </div>
          </div>

          {/* Additional Content */}
          <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-blue-900 flex items-center gap-2 text-xs">
              <PlusCircle className="h-4 w-4 text-blue-600" />
              Additional Content Present in Institute Syllabus ({course.additionalTopics?.length || 0})
            </h4>
            <div className="space-y-1">
              {course.additionalTopics?.map((topic, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/80 p-2 rounded text-blue-900 font-semibold">
                  <span>+ {topic}</span>
                </div>
              ))}
              {(!course.additionalTopics || course.additionalTopics.length === 0) && (
                <p className="text-slate-500 italic">No additional custom topics present.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
          >
            Close Topic Detail
          </button>
        </div>
      </div>
    </div>
  );
}
