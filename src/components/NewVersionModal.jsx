import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

export default function NewVersionModal({ currentVersion = 'v1.0', onSubmit, onClose }) {
  const [versionNumber, setVersionNumber] = useState('v1.1');
  const [changeSummary, setChangeSummary] = useState('Added Generative AI module to ML syllabus & updated cloud computing lab credits.');
  const [versionType, setVersionType] = useState('Minor Revision');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ versionNumber, changeSummary, versionType });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-900 text-white p-5 flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-white">Create New Curriculum Version</h3>
            <p className="text-xs text-blue-200">Current Active Version: <strong>{currentVersion}</strong></p>
          </div>
          <button onClick={onClose} className="p-1 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-slate-50 text-xs">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Immutable Version Rule:</strong> Published version <strong>{currentVersion}</strong> will remain archived in history and will not be directly overwritten.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Version</label>
              <input
                type="text"
                disabled
                value={currentVersion}
                className="w-full p-2.5 bg-slate-200 border border-slate-300 rounded-lg font-bold text-slate-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">New Version Number</label>
              <input
                type="text"
                value={versionNumber}
                onChange={(e) => setVersionNumber(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-bold text-blue-900 focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Revision Type</label>
            <select
              value={versionType}
              onChange={(e) => setVersionType(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600"
            >
              <option value="Minor Revision">Minor Revision (Credit/Module Tweak)</option>
              <option value="Major Revision">Major Revision (New Scheme / Regulation)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Change Summary / Revision Notes</label>
            <textarea
              rows={3}
              value={changeSummary}
              onChange={(e) => setChangeSummary(e.target.value)}
              placeholder="Describe what changed in this version..."
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-800 focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" /> Create Version {versionNumber}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
