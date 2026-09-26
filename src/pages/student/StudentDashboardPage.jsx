import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { BookOpen, ChevronRight, CheckCircle2, Lock } from 'lucide-react';

export default function StudentDashboardPage({ user }) {
  const [curriculum, setCurriculum] = useState(null);
  const [selectedSem, setSelectedSem] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockService.getCurriculum('curr-cse-2025').then(res => {
      setCurriculum(res);
      setLoading(false);
    });
  }, []);

  if (loading || !curriculum) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Student Portal...</div>;

  const currentSemesterData = curriculum.semesters?.find(s => s.semester === selectedSem) || curriculum.semesters?.[5];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-blue-200 bg-blue-800 px-3 py-1 rounded-full border border-blue-700">
            Student Read-Only Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-2">Welcome, {user?.name || 'Aarav Sharma'}</h1>
          <p className="text-xs text-blue-100 mt-0.5">{user?.institute || 'Presidency University'} • {curriculum.programName}</p>
        </div>

        <div className="bg-white/10 px-3.5 py-2 rounded-xl text-xs font-bold border border-white/20">
          Current Semester: {selectedSem}
        </div>
      </div>

      {/* Program Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Program</span>
          <span className="font-bold text-slate-900 text-sm">{curriculum.programName}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Active Regulation</span>
          <span className="font-bold text-slate-900 text-sm">{curriculum.regulation} ({curriculum.version})</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Total Credits</span>
          <span className="font-bold text-blue-900 text-sm">{curriculum.totalCredits} Credits</span>
        </div>
      </div>

      {/* Semester Selector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 mr-2">Select Semester:</span>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(semNum => (
          <button
            key={semNum}
            onClick={() => setSelectedSem(semNum)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedSem === semNum
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Semester {semNum}
          </button>
        ))}
      </div>

      {/* Course List for Selected Semester */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            Semester {selectedSem} Published Subjects
          </h3>
          <span className="text-xs font-bold text-slate-500">
            {currentSemesterData?.courses?.length || 0} Subjects ({currentSemesterData?.totalCredits || 20} Credits)
          </span>
        </div>

        <div className="space-y-3">
          {currentSemesterData?.courses?.map(course => (
            <div key={course.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-300 transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-blue-700 text-white px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{course.title}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Category: {course.category} • Required Credits: <strong>{course.credits}</strong></p>
              </div>

              <button
                onClick={() => navigate(`/course/course-cse301`)}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-blue-700 font-bold rounded-xl text-xs border border-slate-300 transition flex items-center gap-1"
              >
                <span>View Syllabus & Modules</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
