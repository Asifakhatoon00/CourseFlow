import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';

export default function StepperProgress({ steps, currentStepIndex, isCompleted }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
        <span>Simulated Document Processing Pipeline</span>
        {isCompleted && (
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
            ✓ Processing Complete
          </span>
        )}
      </h3>

      <div className="space-y-2">
        {steps.map((stepName, idx) => {
          const isDone = idx < currentStepIndex || isCompleted;
          const isCurrent = idx === currentStepIndex && !isCompleted;
          
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition flex items-center justify-between text-xs font-semibold ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : isCurrent
                  ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-blue-600 animate-spin flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />
                )}
                <span>{stepName}</span>
              </div>

              <span className="text-[10px] font-mono">
                {isDone ? '✓ Completed' : isCurrent ? 'Processing...' : 'Pending'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
