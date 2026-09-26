import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import { FileText, CheckCircle2, Edit3, Trash2, Plus, Save, ArrowRight, AlertTriangle } from 'lucide-react';

export default function ExtractedCurriculumPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    mockService.getExtractedCurriculum(id || 'curr-cse-2025').then(res => {
      setData(res);
      const initialCourses = res.curriculum.semesters?.flatMap(s => s.courses) || [];
      setCoursesList(initialCourses);
      setLoading(false);
    });
  }, [id]);

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">
        Loading Extracted Curriculum Data...
      </div>
    );
  }

  const { curriculum, extractionSummary } = data;

  const handleSaveVerified = async () => {
    await mockService.updateExtractedCurriculum(curriculum.id, {
      status: 'Analyzed'
    });
    navigate(`/select-reference/${curriculum.id}`);
  };

  const handleAddCourse = () => {
    const code = prompt("Course Code (e.g. CSE604):", "CSE604");
    const title = prompt("Course Title:", "Generative AI Systems");
    if (code && title) {
      setCoursesList(prev => [
        ...prev,
        { id: `c-new-${Date.now()}`, code, title, credits: 3, category: 'Core', status: 'Active' }
      ]);
    }
  };

  const handleDeleteCourse = (courseId) => {
    setCoursesList(prev => prev.filter(c => c.id !== courseId));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Verification Notice */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center space-x-3 text-amber-900">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <span className="text-xs font-bold">
            AI extracted data — Please verify and edit extracted information before continuing to AICTE Reference Comparison.
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-1.5 bg-white text-slate-800 hover:bg-slate-100 border border-slate-300 text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>{isEditing ? 'Done Editing' : 'Edit Extracted Data'}</span>
          </button>
        </div>
      </div>

      {/* Curriculum Information Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Institute</span>
          <span className="font-bold text-slate-900">{curriculum.institute}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Program</span>
          <span className="font-bold text-slate-900">{curriculum.programName}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Academic Year</span>
          <span className="font-bold text-slate-900">{curriculum.academicYear}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Regulation</span>
          <span className="font-bold text-slate-900">{curriculum.regulation}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Document Name</span>
          <span className="font-bold text-blue-900 truncate block font-mono">{curriculum.fileName || 'Syllabus.pdf'}</span>
        </div>
      </div>

      {/* Extraction Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-semibold">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-900">
          <span className="text-lg font-bold block">{extractionSummary.semestersDetected}</span>
          <span className="text-[11px]">Semesters Detected</span>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl text-indigo-900">
          <span className="text-lg font-bold block">{extractionSummary.coursesDetected}</span>
          <span className="text-[11px]">Courses Detected</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-900">
          <span className="text-lg font-bold block">{extractionSummary.creditsDetected}</span>
          <span className="text-[11px]">Total Credits</span>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900">
          <span className="text-lg font-bold block">{extractionSummary.modulesDetected}</span>
          <span className="text-[11px]">Modules Extracted</span>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl text-purple-900">
          <span className="text-lg font-bold block">{extractionSummary.outcomesDetected}</span>
          <span className="text-[11px]">Course Outcomes</span>
        </div>
      </div>

      {/* Two Panels Layout: Left Mock PDF Preview & Right Extracted Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Mock PDF Preview */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4 h-[600px] flex flex-col">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
            <span className="font-bold flex items-center gap-2 text-slate-300">
              <FileText className="h-4 w-4 text-blue-400" />
              Document Preview ({curriculum.fileName || 'Syllabus.pdf'})
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">Page 1 of 18</span>
          </div>

          <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-y-auto space-y-4 font-mono text-[11px] text-slate-300 leading-relaxed">
            <div className="border-b border-slate-800 pb-3 text-center">
              <p className="font-bold text-white text-xs">{curriculum.institute.toUpperCase()}</p>
              <p className="text-slate-400 text-[10px]">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</p>
              <p className="text-blue-400 text-[10px] font-bold mt-1">SCHEME OF INSTRUCTION AY {curriculum.academicYear}</p>
            </div>

            <div className="space-y-3">
              <p className="font-bold text-amber-400 text-xs">SEMESTER VI SYLLABUS BREAKDOWN</p>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
                <p className="text-white font-bold">1. CSE301 MACHINE LEARNING (4 CREDITS)</p>
                <p className="text-slate-400">Unit 1: Supervised Learning, Regression, Gradient Descent.</p>
                <p className="text-slate-400">Unit 2: Classification, Decision Trees, SVM, Naive Bayes.</p>
                <p className="text-slate-400">Unit 3: Clustering, K-Means, PCA Dimensionality Reduction.</p>
              </div>

              <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
                <p className="text-white font-bold">2. CSE602 CLOUD COMPUTING (3 CREDITS)</p>
                <p className="text-slate-400">Unit 1: Virtualization, IaaS, PaaS, SaaS Architectures.</p>
                <p className="text-slate-400">Unit 2: Docker Engine, Containerization, Kubernetes Pods.</p>
              </div>

              <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
                <p className="text-white font-bold">3. CSE603 WEB TECHNOLOGIES (4 CREDITS)</p>
                <p className="text-slate-400">Unit 1: React Single Page Applications, State, Hooks.</p>
                <p className="text-slate-400">Unit 2: Node.js Express Server, RESTful APIs, JWT Auth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Extracted Structured Curriculum */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-[600px] flex flex-col">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Extracted Structured Courses</h3>
              <p className="text-xs text-slate-500">Extracted courses, credits, and outcomes ready for verification.</p>
            </div>

            <button
              onClick={handleAddCourse}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition flex items-center gap-1 border border-blue-200"
            >
              <Plus className="h-3.5 w-3.5" /> Add Course
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {coursesList.map((course, idx) => (
              <div key={course.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 hover:border-blue-300 transition">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs bg-blue-700 text-white px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{course.title}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {course.credits} Credits
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                  <span>Category: <strong className="text-slate-700">{course.category || 'Core'}</strong></span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Extracted & Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={() => navigate(`/curriculums/view/${curriculum.id}`)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              View Full 8-Semester Structure
            </button>

            <button
              onClick={handleSaveVerified}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
            >
              <span>Save & Continue to AICTE Reference Selection</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
