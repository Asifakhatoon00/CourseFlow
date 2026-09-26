import React, { useState } from 'react';
import { BookOpen, Plus, Save, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SyllabusBuilderView({ curriculums, setCurriculums, setApprovalRequests }) {
  const [selectedCurrId, setSelectedCurrId] = useState(curriculums[0]?.id || '');
  const activeCurriculum = curriculums.find(c => c.id === selectedCurrId) || curriculums[0];

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: 'PEC-CS602',
    title: 'Cyber Security & Forensic Analysis',
    semester: 6,
    category: 'Professional Elective Course',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    outcomes: [
      "Analyze network security vulnerabilities and threat vectors (Bloom's: Analyze - 90%)",
      "Construct incident response strategies for malware investigation (Bloom's: Create - 92%)"
    ],
    modules: [
      { unit: 1, title: "Fundamentals of Cryptography & Public Key Infrastructure", hours: 8 },
      { unit: 2, title: "Network Security, Firewalls & Intrusion Detection (IDS)", hours: 10 }
    ],
    textbooks: ["Computer Security: Principles and Practice - William Stallings"]
  });

  const [notification, setNotification] = useState('');

  const handleAddCourse = (e) => {
    e.preventDefault();
    const updatedCurriculums = curriculums.map(c => {
      if (c.id === selectedCurrId) {
        return {
          ...c,
          courses: [...c.courses, newCourse],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });

    setCurriculums(updatedCurriculums);

    const newApproval = {
      id: `app-${Date.now()}`,
      curriculumId: selectedCurrId,
      subjectCode: newCourse.code,
      subjectTitle: newCourse.title,
      department: activeCurriculum.department,
      submittedBy: "Prof. R. V. Sharma (Subject Expert)",
      submittedDate: new Date().toISOString().split('T')[0],
      currentStage: "BoS Committee Review",
      status: "Under Review",
      comments: [
        { author: "Prof. R. V. Sharma", role: "Author", text: "Created course draft using Online Syllabus Builder.", date: new Date().toLocaleString() }
      ]
    };

    setApprovalRequests(prev => [newApproval, ...prev]);
    setShowAddForm(false);
    setNotification(`Subject ${newCourse.code}: "${newCourse.title}" successfully added and submitted to BoS Approval Queue!`);

    setTimeout(() => setNotification(''), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Interactive Curriculum & Course Builder
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Author degree curricula, course outcome mappings, credit allocations, and textbook references.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCurrId}
            onChange={(e) => setSelectedCurrId(e.target.value)}
            aria-label="Select active curriculum discipline"
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
          >
            {curriculums.map(c => (
              <option key={c.id} value={c.id}>{c.title} ({c.version})</option>
            ))}
          </select>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow transition flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" /> Add Subject Course
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleAddCourse} className="bg-white p-6 rounded-xl border-2 border-blue-400 shadow-lg space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Add New Subject Course to {activeCurriculum.department}</h3>
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded">Draft Mode</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Code</label>
              <input
                type="text"
                value={newCourse.code}
                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full text-xs p-2 border border-slate-300 rounded focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
              <input
                type="number"
                value={newCourse.semester}
                onChange={(e) => setNewCourse({ ...newCourse, semester: parseInt(e.target.value) })}
                className="w-full text-xs p-2 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Credits</label>
              <input
                type="number"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) })}
                className="w-full text-xs p-2 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course Category</label>
              <select
                value={newCourse.category}
                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                className="w-full text-xs p-2 border border-slate-300 rounded"
              >
                <option>Professional Core Course</option>
                <option>Professional Elective Course</option>
                <option>Open Elective Course</option>
                <option>Basic Science Course</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold rounded-lg shadow flex items-center gap-1.5"
            >
              <Send className="h-4 w-4" /> Save Course & Submit to BoS
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold">{activeCurriculum.title}</h3>
            <p className="text-xs text-slate-300">{activeCurriculum.department} • Total Credits: {activeCurriculum.totalCredits}</p>
          </div>
          <span className="text-xs font-bold bg-blue-500 text-white px-2.5 py-1 rounded">
            Version: {activeCurriculum.version}
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {activeCurriculum.courses.map((course, idx) => (
            <div key={idx} className="p-5 space-y-4 hover:bg-slate-50/50 transition">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-slate-800 text-white px-2.5 py-1 rounded">
                    {course.code}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
                    <p className="text-xs text-slate-500">
                      Semester {course.semester} • {course.category} • Credits: {course.credits} (L: {course.lectureHours}, T: {course.tutorialHours}, P: {course.practicalHours})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    OBE Mapped
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <h5 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  Course Outcomes (COs) & Bloom's Cognitive Mapping:
                </h5>
                <ul className="space-y-1">
                  {course.outcomes.map((co, coIdx) => (
                    <li key={coIdx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{co}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.modules.map((mod, modIdx) => (
                  <div key={modIdx} className="p-3 bg-white rounded border border-slate-200 text-xs">
                    <div className="flex justify-between text-slate-500 font-medium mb-1">
                      <span>Unit {mod.unit}</span>
                      <span>{mod.hours} Hours</span>
                    </div>
                    <p className="font-semibold text-slate-800">{mod.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}