import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { ChevronDown, ChevronRight, Eye, Edit3, ArrowLeft, BookOpen, Layers } from 'lucide-react';

export default function VerifiedCurriculumViewerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSemesters, setExpandedSemesters] = useState({ 6: true, 1: true });

  useEffect(() => {
    mockService.getCurriculum(id || 'curr-cse-2025').then(curr => {
      setCurriculum(curr);
      setLoading(false);
    });
  }, [id]);

  if (loading || !curriculum) {
    return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Verified Curriculum...</div>;
  }

  const toggleSemester = (semNum) => {
    setExpandedSemesters(prev => ({ ...prev, [semNum]: !prev[semNum] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      {/* Back & Title Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{curriculum.title}</h1>
            <p className="text-xs text-slate-500">{curriculum.programName} • {curriculum.academicYear} • Version {curriculum.version}</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/select-reference/${curriculum.id}`)}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition"
        >
          Select AICTE Reference & Analyze
        </button>
      </div>

      {/* Expandable Semesters List */}
      <div className="space-y-4">
        {curriculum.semesters?.map(sem => {
          const isOpen = expandedSemesters[sem.semester];
          return (
            <div key={sem.semester} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Semester Accordion Header */}
              <div
                onClick={() => toggleSemester(sem.semester)}
                className="p-4 bg-slate-50 hover:bg-slate-100 cursor-pointer flex justify-between items-center transition border-b border-slate-200/60"
              >
                <div className="flex items-center space-x-3">
                  {isOpen ? <ChevronDown className="h-5 w-5 text-blue-700" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
                  <h3 className="text-sm font-bold text-slate-900">{sem.title}</h3>
                  <span className="text-xs font-semibold text-slate-500">({sem.courses?.length || 0} Courses)</span>
                </div>

                <span className="text-xs font-bold text-blue-900 bg-white px-3 py-1 rounded-md border border-slate-200">
                  {sem.totalCredits} Credits
                </span>
              </div>

              {/* Semester Courses Table */}
              {isOpen && (
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="p-3 font-bold">Code</th>
                        <th className="p-3 font-bold">Course Title</th>
                        <th className="p-3 font-bold">Credits</th>
                        <th className="p-3 font-bold">Category</th>
                        <th className="p-3 font-bold text-center">Status</th>
                        <th className="p-3 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {sem.courses?.map(course => (
                        <tr key={course.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-mono font-bold text-blue-900">{course.code}</td>
                          <td className="p-3 font-bold text-slate-900">{course.title}</td>
                          <td className="p-3 text-slate-800 font-bold">{course.credits}</td>
                          <td className="p-3 text-slate-600">{course.category}</td>
                          <td className="p-3 text-center">
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                              {course.status || 'Active'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => navigate(`/course/course-cse301`)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded text-[11px] transition inline-flex items-center gap-1"
                            >
                              <Eye className="h-3.5 w-3.5" /> View Course
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
