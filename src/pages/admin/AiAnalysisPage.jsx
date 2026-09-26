import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import TopicComparisonModal from '../../components/TopicComparisonModal';
import NewVersionModal from '../../components/NewVersionModal';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Eye, RefreshCw, Layers, PlusCircle, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function AiAnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseForTopic, setSelectedCourseForTopic] = useState(null);
  const [showVersionModal, setShowVersionModal] = useState(false);

  useEffect(() => {
    mockService.getAnalysis(id || 'analysis-101').then(res => {
      setAnalysis(res);
      mockService.getRecommendations(res.curriculumId).then(recs => {
        setRecommendations(recs);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading || !analysis) {
    return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading AI Alignment Analysis...</div>;
  }

  const { summary, courseComparisons, skillGaps } = analysis;

  const skillChartData = [
    { name: 'Python', current: 100, reference: 100 },
    { name: 'Data Structures', current: 100, reference: 100 },
    { name: 'Database', current: 80, reference: 100 },
    { name: 'Machine Learning', current: 85, reference: 100 },
    { name: 'Cloud Computing', current: 0, reference: 95 },
    { name: 'MLOps', current: 0, reference: 90 },
    { name: 'Generative AI', current: 0, reference: 85 }
  ];

  const getResultBadge = (result) => {
    switch (result) {
      case 'Match': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Partial': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Potential Gap': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Additional': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const handleCreateVersionSubmit = async (versionData) => {
    await mockService.createVersion(analysis.curriculumId, versionData);
    setShowVersionModal(false);
    navigate(`/curriculums/${analysis.curriculumId}/versions`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 w-fit">
            <Sparkles className="h-3.5 w-3.5" /> Curriculum Alignment Analysis
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            AI Alignment & Gap Detection Results
          </h1>
          <p className="text-xs text-blue-200 mt-1">
            Institute: <strong>{analysis.institute}</strong> • Program: <strong>{analysis.program}</strong> ({analysis.version}) vs <strong>{analysis.referenceTitle}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowVersionModal(true)}
          className="px-5 py-3 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
        >
          <span>Edit & Create Version 1.1</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Analysis Summary Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Potential Matches</span>
          <h3 className="text-2xl font-extrabold text-emerald-600">{summary.potentialMatches}</h3>
          <p className="text-[11px] text-slate-500 font-semibold">Matched Course Modules</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Partial Matches</span>
          <h3 className="text-2xl font-extrabold text-amber-600">{summary.partialMatches}</h3>
          <p className="text-[11px] text-slate-500 font-semibold">Partial Coverage</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Potential Gaps</span>
          <h3 className="text-2xl font-extrabold text-rose-600">{summary.potentialGaps}</h3>
          <p className="text-[11px] text-slate-500 font-semibold">Missing Benchmark Topics</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Additional Content</span>
          <h3 className="text-2xl font-extrabold text-blue-600">{summary.additionalContent}</h3>
          <p className="text-[11px] text-slate-500 font-semibold">Local Institutional Electives</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Needs Review</span>
          <h3 className="text-2xl font-extrabold text-slate-800">{summary.needsReview}</h3>
          <p className="text-[11px] text-slate-500 font-semibold">Manual Audit Suggested</p>
        </div>
      </div>

      {/* Course Comparison Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Course-Level Alignment Table</h3>
            <p className="text-xs text-slate-500">Click any row to view detailed topic-level covered vs missing breakdown.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-3 font-bold">Institute Course</th>
                <th className="p-3 font-bold">AICTE Reference Course</th>
                <th className="p-3 font-bold text-center">Result</th>
                <th className="p-3 font-bold text-center">Confidence</th>
                <th className="p-3 font-bold text-right">Topic Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {courseComparisons.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => setSelectedCourseForTopic(c)}>
                  <td className="p-3 font-bold text-slate-900">{c.instituteCourse}</td>
                  <td className="p-3 text-blue-900 font-semibold">{c.referenceCourse}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border ${getResultBadge(c.result)}`}>
                      {c.result}
                    </span>
                  </td>
                  <td className="p-3 text-center text-slate-600 font-bold">{c.confidence}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedCourseForTopic(c); }}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded text-xs transition inline-flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" /> Topic Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendation Cards Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI-Generated Curriculum Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(rec => (
            <div key={rec.id} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded ${
                  rec.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {rec.type}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{rec.description}</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Suggested Action</span>
                <p className="text-[11px] font-semibold text-slate-800">{rec.suggestedAction}</p>
                <div className="pt-2 flex justify-between">
                  <button onClick={() => navigate('/course/course-cse301')} className="text-[11px] font-bold text-blue-700 hover:underline">
                    Review Course
                  </button>
                  <button onClick={() => alert("Recommendation dismissed.")} className="text-[11px] font-semibold text-slate-400 hover:text-slate-600">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Gap Analysis Visualization Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Skill Competency Gap Analysis (Current vs AICTE 2026 Reference)
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="current" fill="#3b82f6" name="Current Curriculum Coverage (%)" />
                <Bar dataKey="reference" fill="#10b981" name="AICTE Reference Demand (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-3 text-xs">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Potential Skill Gaps Identified</span>
            <ul className="space-y-2 font-bold text-rose-950">
              <li className="flex items-center gap-2">⚠ Cloud Computing (0% vs 95% Reference)</li>
              <li className="flex items-center gap-2">⚠ MLOps Pipelines (0% vs 90% Reference)</li>
              <li className="flex items-center gap-2">⚠ Generative AI & Vector Search (0% vs 85% Reference)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCourseForTopic && (
        <TopicComparisonModal
          course={selectedCourseForTopic}
          onClose={() => setSelectedCourseForTopic(null)}
        />
      )}

      {showVersionModal && (
        <NewVersionModal
          currentVersion={analysis.version}
          onSubmit={handleCreateVersionSubmit}
          onClose={() => setShowVersionModal(false)}
        />
      )}
    </div>
  );
}
