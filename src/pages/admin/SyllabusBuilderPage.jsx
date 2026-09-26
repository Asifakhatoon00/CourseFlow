import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import NewVersionModal from '../../components/NewVersionModal';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  FileText
} from 'lucide-react';

export default function SyllabusBuilderPage() {
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState(6); // Default Semester VI
  const [selectedCourseId, setSelectedCourseId] = useState('c-301');
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [notification, setNotification] = useState('');

  // Modals for adding items
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(null); // unitIndex

  // Form states
  const [newCourseForm, setNewCourseForm] = useState({
    code: 'CSE604',
    title: 'Generative AI & LLM Systems',
    credits: 3,
    category: 'Professional Elective',
    semester: 6
  });

  const [newUnitForm, setNewUnitForm] = useState({
    title: 'Unit 5: Generative AI & Vector Databases',
    hours: 8
  });

  const [newTopicForm, setNewTopicForm] = useState('');

  useEffect(() => {
    mockService.getCurriculum('curr-cse-2025').then(res => {
      setCurriculum(res);
      setLoading(false);
    });
  }, []);

  if (loading || !curriculum) {
    return <div className="p-8 text-center text-sm font-bold text-slate-500 animate-pulse">Loading Tree Syllabus Builder...</div>;
  }

  // Find all courses for selected semester
  const semesterData = curriculum.semesters?.find(s => s.semester === selectedSemester) || curriculum.semesters[5];
  const coursesInSemester = semesterData?.courses || [];
  
  // Selected course details
  const activeCourse = coursesInSemester.find(c => c.id === selectedCourseId) || coursesInSemester[0] || {
    id: 'c-301',
    code: 'CSE301',
    title: 'Machine Learning',
    credits: 4,
    category: 'Core',
    modules: [
      { unit: 1, title: 'Supervised Learning & Regression', hours: 8, topics: ['Linear Regression', 'Cost Function', 'Gradient Descent', 'Polynomial Regression'] },
      { unit: 2, title: 'Classification & Decision Trees', hours: 10, topics: ['Logistic Regression', 'Decision Trees', 'Random Forests', 'SVM'] },
      { unit: 3, title: 'Unsupervised Learning & Clustering', hours: 8, topics: ['K-Means Clustering', 'Hierarchical Clustering', 'PCA Dimensionality Reduction'] }
    ],
    outcomes: [
      { id: 'co1', code: 'CO1', text: 'Apply supervised learning algorithms to solve regression and classification problems.' },
      { id: 'co2', code: 'CO2', text: 'Evaluate model performance using precision, recall, and ROC-AUC metrics.' }
    ]
  };

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    const newCourseObj = {
      id: `c-custom-${Date.now()}`,
      code: newCourseForm.code,
      title: newCourseForm.title,
      credits: Number(newCourseForm.credits),
      category: newCourseForm.category,
      modules: [
        { unit: 1, title: 'Unit 1: Fundamentals & Concepts', hours: 8, topics: ['Introduction & Overview', 'Basic Principles'] }
      ],
      outcomes: [
        { id: `co-${Date.now()}`, code: 'CO1', text: `Understand fundamental concepts of ${newCourseForm.title}.` }
      ]
    };

    // Update state
    setCurriculum(prev => {
      const updatedSems = prev.semesters.map(s => {
        if (s.semester === selectedSemester) {
          return { ...s, courses: [...s.courses, newCourseObj] };
        }
        return s;
      });
      return { ...prev, semesters: updatedSems };
    });

    setSelectedCourseId(newCourseObj.id);
    setShowAddCourseModal(false);
    setNotification(`Successfully added subject ${newCourseObj.code}: ${newCourseObj.title} to Semester ${selectedSemester}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleAddUnitSubmit = (e) => {
    e.preventDefault();
    const updatedModules = [
      ...(activeCourse.modules || []),
      {
        unit: (activeCourse.modules?.length || 0) + 1,
        title: newUnitForm.title,
        hours: Number(newUnitForm.hours),
        topics: ['Introduction to Unit', 'Core Concepts']
      }
    ];

    updateActiveCourseModules(updatedModules);
    setShowAddUnitModal(false);
    setNewUnitForm({ title: '', hours: 8 });
    setNotification(`Added new Unit to ${activeCourse.code}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleAddTopicSubmit = (unitIdx) => {
    if (!newTopicForm.trim()) return;
    const updatedModules = [...(activeCourse.modules || [])];
    if (!updatedModules[unitIdx].topics) updatedModules[unitIdx].topics = [];
    updatedModules[unitIdx].topics.push(newTopicForm.trim());

    updateActiveCourseModules(updatedModules);
    setShowAddTopicModal(null);
    setNewTopicForm('');
    setNotification(`Added new topic to Unit ${unitIdx + 1}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleDeleteTopic = (unitIdx, topicIdx) => {
    const updatedModules = [...(activeCourse.modules || [])];
    updatedModules[unitIdx].topics.splice(topicIdx, 1);
    updateActiveCourseModules(updatedModules);
  };

  const updateActiveCourseModules = (newModules) => {
    setCurriculum(prev => {
      const updatedSems = prev.semesters.map(s => {
        if (s.semester === selectedSemester) {
          const updatedCourses = s.courses.map(c => {
            if (c.id === selectedCourseId || c.code === activeCourse.code) {
              return { ...c, modules: newModules };
            }
            return c;
          });
          return { ...s, courses: updatedCourses };
        }
        return s;
      });
      return { ...prev, semesters: updatedSems };
    });
  };

  const handlePublishVersionSubmit = async (versionData) => {
    await mockService.createVersion('curr-cse-2025', versionData);
    setShowVersionModal(false);
    navigate('/curriculums/curr-cse-2025/versions');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2 font-sans text-slate-900">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-extrabold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
            Interactive Tree Syllabus Builder
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            Curriculum Structure & Module Editor
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Program: <strong>{curriculum.programName}</strong> ({curriculum.academicYear}) • Active Version: <strong>{curriculum.version}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowVersionModal(true)}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          <span>Publish & Save Revision (v1.1)</span>
        </button>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Side-by-Side Tree Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Semester & Subject Tree Navigation (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5 flex flex-col">
          
          <div className="flex justify-between items-center pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Semester & Course Hierarchy</h2>
              <p className="text-xs font-bold text-slate-500">Select semester and subject to edit</p>
            </div>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold rounded-xl border border-blue-200 transition flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subject</span>
            </button>
          </div>

          {/* Semester Selector Tabs */}
          <div className="flex overflow-x-auto gap-1.5 pb-2 border-b border-slate-100">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <button
                key={sem}
                onClick={() => {
                  setSelectedSemester(sem);
                  const semCourses = curriculum.semesters?.find(s => s.semester === sem)?.courses || [];
                  if (semCourses.length > 0) setSelectedCourseId(semCourses[0].id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${
                  selectedSemester === sem
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sem {sem}
              </button>
            ))}
          </div>

          {/* Subjects Tree List */}
          <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 max-h-[500px]">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
              Semester {selectedSemester} Subjects ({coursesInSemester.length}):
            </span>

            {coursesInSemester.map(course => {
              const isSelected = course.id === selectedCourseId || course.code === activeCourse.code;
              return (
                <div
                  key={course.id || course.code}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/30 font-extrabold shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 font-bold'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="font-mono text-xs font-extrabold bg-blue-700 text-white px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-sm font-extrabold truncate">{course.title}</span>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {course.credits} Credits
                    </span>
                    <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-blue-700' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Panel: Deep Subject, Module, Chapter & Topic Editor (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 flex flex-col">
          
          {/* Active Subject Header */}
          <div className="flex justify-between items-start pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-extrabold bg-blue-700 text-white px-2.5 py-0.5 rounded">
                  {activeCourse.code}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {activeCourse.category || 'Professional Core'}
                </span>
                <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {activeCourse.credits} Credits
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">{activeCourse.title}</h2>
            </div>

            <button
              onClick={() => setShowAddUnitModal(true)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Add Unit / Module</span>
            </button>
          </div>

          {/* Modules & Topics Tree */}
          <div className="space-y-4 flex-1 overflow-y-auto pr-1 max-h-[500px]">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-700" />
              Units, Chapters & Topics Breakdown:
            </h3>

            {(activeCourse.modules || []).map((mod, uIdx) => (
              <div key={uIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                
                {/* Unit Title Header */}
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold bg-slate-900 text-white px-2.5 py-0.5 rounded">
                      Unit {mod.unit || uIdx + 1}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">{mod.title}</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {mod.hours || 8} Hours
                  </span>
                </div>

                {/* Topics / Chapters List */}
                <div className="space-y-2 pl-2">
                  <span className="text-xs font-bold text-slate-500 uppercase block">Chapters / Topics Covered:</span>
                  <div className="space-y-1.5">
                    {(mod.topics || ['Topic 1', 'Topic 2']).map((topic, tIdx) => (
                      <div key={tIdx} className="flex justify-between items-center p-2.5 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-900">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-700 font-extrabold">•</span>
                          <span>{topic}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteTopic(uIdx, tIdx)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove Topic"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Topic Inline Form / Button */}
                  {showAddTopicModal === uIdx ? (
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={newTopicForm}
                        onChange={(e) => setNewTopicForm(e.target.value)}
                        placeholder="Enter chapter / topic title..."
                        className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        autoFocus
                      />
                      <button
                        onClick={() => handleAddTopicSubmit(uIdx)}
                        className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold rounded-lg shadow"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddTopicModal(null)}
                        className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddTopicModal(uIdx)}
                      className="mt-2 text-xs font-extrabold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Chapter / Topic to Unit {uIdx + 1}</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">
              Add New Subject Course to Semester {selectedSemester}
            </h3>

            <form onSubmit={handleAddCourseSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-800 mb-1">Subject Code</label>
                <input
                  type="text"
                  value={newCourseForm.code}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, code: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-800 mb-1">Course Title</label>
                <input
                  type="text"
                  value={newCourseForm.title}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 mb-1">Credits</label>
                  <input
                    type="number"
                    value={newCourseForm.credits}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, credits: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-800 mb-1">Category</label>
                  <select
                    value={newCourseForm.category}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  >
                    <option>Professional Core</option>
                    <option>Professional Elective</option>
                    <option>Open Elective</option>
                    <option>Basic Science</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white font-extrabold rounded-xl shadow"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Unit Modal */}
      {showAddUnitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-2">
              Add New Unit / Module to {activeCourse.code}
            </h3>

            <form onSubmit={handleAddUnitSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-800 mb-1">Unit Title</label>
                <input
                  type="text"
                  value={newUnitForm.title}
                  onChange={(e) => setNewUnitForm({ ...newUnitForm, title: e.target.value })}
                  placeholder="e.g. Unit 5: Generative AI & Vector Search"
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-800 mb-1">Allocated Hours</label>
                <input
                  type="number"
                  value={newUnitForm.hours}
                  onChange={(e) => setNewUnitForm({ ...newUnitForm, hours: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddUnitModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white font-extrabold rounded-xl shadow"
                >
                  Add Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Version Revision Modal */}
      {showVersionModal && (
        <NewVersionModal
          currentVersion={curriculum.version}
          onSubmit={handlePublishVersionSubmit}
          onClose={() => setShowVersionModal(false)}
        />
      )}

    </div>
  );
}
