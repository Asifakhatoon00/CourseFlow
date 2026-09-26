import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { BookOpen, Sparkles, Edit3, CheckCircle2 } from 'lucide-react';

export default function FacultyDashboardPage({ user }) {
  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockService.getCourses().then(res => {
      setCourses(res);
      mockService.getRecommendations('curr-cse-2025').then(recs => {
        setRecommendations(recs);
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Faculty Dashboard...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-2xl text-white shadow-md flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            Faculty Workspace
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">Welcome, {user?.name || 'Prof. Ananya Rao'}</h1>
          <p className="text-xs text-blue-100 mt-0.5">Assigned Courses, Course Outcomes & AI Syllabus Recommendations</p>
        </div>
      </div>

      {/* Assigned Courses Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-700" />
          My Assigned Courses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(course => (
            <div key={course.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-mono font-bold text-xs bg-blue-700 text-white px-2.5 py-0.5 rounded">
                  {course.code}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {course.credits} Credits
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
              <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active Course
                </span>
                <button
                  onClick={() => navigate(`/course/${course.code}`)}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition shadow-sm"
                >
                  Edit Course Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Recommendations for Assigned Courses
        </h3>

        <div className="space-y-3">
          {recommendations.map(rec => (
            <div key={rec.id} className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">{rec.type}</span>
              <h4 className="font-bold text-slate-900">{rec.title}</h4>
              <p className="text-slate-700">{rec.description}</p>
              <p className="font-bold text-emerald-800 bg-white p-2 rounded border border-amber-200">Action: {rec.suggestedAction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
