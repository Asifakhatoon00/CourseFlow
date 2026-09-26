import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { BookOpen, History, Sparkles, AlertTriangle, GraduationCap, ArrowRight, Eye, UploadCloud } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function DashboardPage({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockService.getDashboardData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">
        Loading Institute Admin Dashboard...
      </div>
    );
  }

  const { stats, recentCurriculums, analysisSummary } = data;

  const pieChartData = [
    { name: 'Potential Matches', value: analysisSummary.potentialMatches, color: '#16a34a' },
    { name: 'Partial Matches', value: analysisSummary.partialMatches, color: '#eab308' },
    { name: 'Potential Gaps', value: analysisSummary.potentialGaps, color: '#ef4444' },
    { name: 'Needs Manual Review', value: analysisSummary.needsManualReview, color: '#3b82f6' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Analyzed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Ready for Review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Needs Review':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Processing':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            {user?.institute || 'Presidency University'} Workspace
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            Welcome back, {user?.name || 'Institute Admin'}
          </h1>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            Continuous curriculum digitization, AI alignment analysis, and version governance.
          </p>
        </div>

        <button
          onClick={() => navigate('/curriculums/upload')}
          className="px-5 py-3 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload New Curriculum</span>
        </button>
      </div>

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Curriculums</p>
          <h3 className="text-2xl font-extrabold text-slate-900">{stats.totalCurriculums}</h3>
          <p className="text-[10px] text-blue-700 font-semibold flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Active Schemes
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Curriculum Versions</p>
          <h3 className="text-2xl font-extrabold text-slate-900">{stats.curriculumVersions}</h3>
          <p className="text-[10px] text-indigo-700 font-semibold flex items-center gap-1">
            <History className="h-3 w-3" /> Revisions Logged
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Analyses Completed</p>
          <h3 className="text-2xl font-extrabold text-slate-900">{stats.analysesCompleted}</h3>
          <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> AI Scans Run
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Needs Review</p>
          <h3 className="text-2xl font-extrabold text-amber-600">{stats.needsReview}</h3>
          <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Gaps Actionable
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Programs</p>
          <h3 className="text-2xl font-extrabold text-slate-900">{stats.programs}</h3>
          <p className="text-[10px] text-slate-600 font-semibold flex items-center gap-1">
            <GraduationCap className="h-3 w-3" /> B.Tech Branches
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Curriculums & Alignment Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Curriculums Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Curriculums</h3>
              <p className="text-xs text-slate-500">Institutional curriculum status and version history.</p>
            </div>
            <button
              onClick={() => navigate('/curriculums')}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <th className="p-3 font-bold">Program</th>
                  <th className="p-3 font-bold">Academic Year</th>
                  <th className="p-3 font-bold">Version</th>
                  <th className="p-3 font-bold">AICTE Reference</th>
                  <th className="p-3 font-bold">Analysis Status</th>
                  <th className="p-3 font-bold">Last Updated</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {recentCurriculums.map(curr => (
                  <tr key={curr.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900">{curr.programName}</td>
                    <td className="p-3 text-slate-600">{curr.academicYear}</td>
                    <td className="p-3">
                      <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {curr.version}
                      </span>
                    </td>
                    <td className="p-3 text-blue-900 font-semibold">{curr.aicteReferenceName}</td>
                    <td className="p-3">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(curr.analysisStatus)}`}>
                        {curr.analysisStatus}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{curr.lastUpdated}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => navigate(`/curriculums/extracted/${curr.id}`)}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded text-xs transition flex items-center gap-1 ml-auto"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Analysis Summary Card (Chart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">AI Analysis Summary</span>
              <h3 className="text-base font-bold text-slate-900">Curriculum Alignment Analysis</h3>
              <p className="text-xs text-slate-500 mt-0.5">Aggregated alignment across institute curricula.</p>
            </div>

            <div className="h-56 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`${val} Modules`, 'Count']} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button
            onClick={() => navigate('/analysis/analysis-101')}
            className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            <span>Open Detailed AI Alignment Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
