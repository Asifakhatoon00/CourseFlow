import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, Award, Edit3 } from 'lucide-react';

export default function CourseDetailPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    mockService.getCourses().then(courses => {
      setCourse(courses[0]); // CSE301 Machine Learning
    });
  }, [code]);

  if (!course) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Course Details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <span className="text-xs font-mono font-bold bg-blue-700 text-white px-2 py-0.5 rounded">{course.code}</span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">{course.title}</h1>
          </div>
        </div>

        <button onClick={() => alert("Edit course modal demo")} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center gap-1.5">
          <Edit3 className="h-3.5 w-3.5" /> Edit Course Details
        </button>
      </div>

      {/* Basic Info Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Course Code</span>
          <span className="font-mono text-blue-900 font-bold">{course.code}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Credits</span>
          <span className="text-slate-900 font-bold">{course.credits} Credits</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
          <span className="text-slate-900">{course.category}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Course Type</span>
          <span className="text-slate-900">{course.type}</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Course Description</h3>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">{course.description}</p>
      </div>

      {/* Modules List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-700" />
          Course Modules ({course.modules?.length})
        </h3>

        <div className="space-y-3">
          {course.modules?.map((m, idx) => (
            <div key={m.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <h4 className="font-bold text-slate-900">{m.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Outcomes */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Course Outcomes (COs)
        </h3>

        <div className="space-y-2">
          {course.outcomes?.map(co => (
            <div key={co.id} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-start space-x-3 text-xs">
              <span className="font-mono font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-300">
                {co.code}
              </span>
              <span className="font-semibold text-emerald-950">{co.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Badges */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Award className="h-4 w-4 text-indigo-600" />
          Target Industry Competencies & Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {course.skills?.map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-800 text-xs font-bold rounded-lg border border-indigo-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
