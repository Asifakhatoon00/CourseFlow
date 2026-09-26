import React, { useState } from 'react';
import { Search, Download, BookOpen, CheckCircle2, Building2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function PublicCatalogView({ curriculums, onOpenLogin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Computer Science & Engineering', 'Electronics & Communication Engineering', 'Information Science & Engineering'];

  const filteredCurriculums = curriculums.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || c.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleDownloadPDF = (currTitle) => {
    alert(`Downloading official AICTE Model Syllabus PDF booklet for "${currTitle}".`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
            Government of India • AICTE National Curriculum Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Official Model Curricula for Technical Universities
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Browse, search, and download official AICTE benchmark model course structures for Engineering, Technology, and Applied Sciences.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center space-y-2 w-full md:w-auto flex-shrink-0">
          <p className="text-xs font-bold text-white">Representing a University or College?</p>
          <button
            onClick={onOpenLogin}
            className="w-full px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-lg shadow transition flex items-center justify-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            <span>University Sign In / Upload Syllabus</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Explore AICTE Model Curricula</h3>
            <p className="text-xs text-slate-500">Search by course title, branch, or semester credits.</p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search course title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2">Filter Branch:</span>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedDept === dept
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept === 'All' ? 'All Branches' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Curricula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCurriculums.map(curr => (
          <div key={curr.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3 py-1 rounded-md border border-blue-200">
                  {curr.degree}
                </span>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-mono">
                  {curr.version}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">{curr.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{curr.department} • Total Required Credits: <strong className="text-slate-800">{curr.totalCredits}</strong></p>
              </div>

              {/* Course Subject Highlights */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider block">Core Subjects Included:</span>
                <div className="space-y-1.5">
                  {curr.courses.map((course, cIdx) => (
                    <div key={cIdx} className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                        {course.code}: {course.title}
                      </span>
                      <span className="font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {course.credits} Credits
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                AICTE Official Model Standard
              </span>

              <button
                onClick={() => handleDownloadPDF(curr.title)}
                className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" /> Download PDF Syllabus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}