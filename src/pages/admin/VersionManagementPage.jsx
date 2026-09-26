import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import NewVersionModal from '../../components/NewVersionModal';
import VersionComparisonModal from '../../components/VersionComparisonModal';
import { History, Plus, GitCompare, CheckCircle2 } from 'lucide-react';

export default function VersionManagementPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewVersionModal, setShowNewVersionModal] = useState(false);
  const [diffData, setDiffData] = useState(null);

  useEffect(() => {
    mockService.getCurriculum(id || 'curr-cse-2025').then(curr => {
      setCurriculum(curr);
      mockService.getVersionHistory(curr.id).then(vers => {
        setVersions(vers);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading || !curriculum) return <div className="p-8 text-center text-sm text-slate-500 font-semibold animate-pulse">Loading Version History...</div>;

  const handleCreateVersionSubmit = async (versionData) => {
    const updatedCurr = await mockService.createVersion(curriculum.id, versionData);
    setCurriculum(updatedCurr);
    setVersions(updatedCurr.versions);
    setShowNewVersionModal(false);
  };

  const handleCompareVersions = async (oldV, newV) => {
    const res = await mockService.compareVersions(oldV, newV);
    setDiffData(res);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 text-slate-900 font-sans text-base">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
            Syllabus Version Control System
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            Curriculum Revision History & Version Control
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Program: <strong>{curriculum.programName}</strong> • Current Active Version: <strong className="text-blue-900 font-mono">{curriculum.version}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleCompareVersions('v1.0', 'v1.1')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-xl border border-slate-300 transition flex items-center gap-2"
          >
            <GitCompare className="h-4 w-4" /> Compare v1.0 vs v1.1
          </button>
          <button
            onClick={() => setShowNewVersionModal(true)}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl shadow transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create Version 1.1
          </button>
        </div>
      </div>

      {/* Simple Clean Version History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
          <History className="h-5 w-5 text-blue-700" />
          Version Revision History Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-4 font-bold">Version</th>
                <th className="p-4 font-bold">Date Published</th>
                <th className="p-4 font-bold">Revision Type</th>
                <th className="p-4 font-bold">Revision Notes / Changes Summary</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {versions.map((ver, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-mono font-extrabold text-blue-900 text-base">{ver.version}</td>
                  <td className="p-4 text-slate-600 font-semibold">{ver.date}</td>
                  <td className="p-4 font-semibold text-slate-800">{ver.type}</td>
                  <td className="p-4 text-slate-900 font-semibold max-w-xs">{ver.summary}</td>
                  <td className="p-4">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-lg border ${
                      ver.status === 'Current' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      {ver.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleCompareVersions('v1.0', ver.version)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg transition inline-flex items-center gap-1 text-xs"
                    >
                      <GitCompare className="h-3.5 w-3.5" /> Compare vs v1.0
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showNewVersionModal && (
        <NewVersionModal
          currentVersion={curriculum.version}
          onSubmit={handleCreateVersionSubmit}
          onClose={() => setShowNewVersionModal(false)}
        />
      )}

      {diffData && (
        <VersionComparisonModal
          diffData={diffData}
          onClose={() => setDiffData(null)}
        />
      )}
    </div>
  );
}
