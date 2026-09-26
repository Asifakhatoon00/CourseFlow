import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockService';
import StepperProgress from '../../components/StepperProgress';
import { UploadCloud, FileText, X, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function UploadCurriculumPage() {
  const [degree, setDegree] = useState('B.Tech');
  const [programName, setProgramName] = useState('Computer Science and Engineering');
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [regulation, setRegulation] = useState('R2025');
  const [title, setTitle] = useState('B.Tech CSE Curriculum 2025-26');
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdCurriculumId, setCreatedCurriculumId] = useState(null);
  const navigate = useNavigate();

  const steps = [
    'Uploading PDF',
    'Reading document',
    'Extracting text',
    'Detecting semesters',
    'Detecting subjects',
    'Extracting credits',
    'Detecting modules',
    'Structuring data'
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (!selected.name.endsWith('.pdf')) {
        alert("Please upload a valid PDF file.");
        return;
      }
      setFile(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      if (!dropped.name.endsWith('.pdf')) {
        alert("Please upload a valid PDF file.");
        return;
      }
      setFile(dropped);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) {
      // Allow demo upload fallback
      setFile({ name: 'Presidency_Univ_CSE_Curriculum_2025-26.pdf', size: 3564000 });
    }

    setIsProcessing(true);
    setIsCompleted(false);
    setCurrentStepIndex(0);

    const programData = { degree, programName, academicYear, regulation, title };
    const uploaded = await mockService.uploadCurriculum(programData, file);
    setCreatedCurriculumId(uploaded.id);

    await mockService.processCurriculum(uploaded.id, (stepIndex) => {
      setCurrentStepIndex(stepIndex);
    });

    setIsCompleted(true);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Page Title */}
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Upload Existing Curriculum</h1>
        <p className="text-xs text-slate-500">
          Upload your institute's existing curriculum document to structure and analyze it.
        </p>
      </div>

      {/* Program Information Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Program Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Degree</label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600"
            >
              <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
              <option value="M.Tech">M.Tech (Master of Technology)</option>
              <option value="MCA">MCA (Master of Computer Applications)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Program / Branch</label>
            <select
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600"
            >
              <option value="Computer Science and Engineering">Computer Science and Engineering</option>
              <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
              <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
              <option value="Information Science & Engineering">Information Science & Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Regulation</label>
            <input
              type="text"
              value={regulation}
              onChange={(e) => setRegulation(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Curriculum Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* PDF Upload Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Curriculum PDF Document Upload
        </h2>

        {!file ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 hover:border-blue-600 bg-slate-50/50 hover:bg-blue-50/50 rounded-2xl p-10 text-center transition cursor-pointer relative group"
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-blue-100 rounded-full text-blue-700 group-hover:scale-110 transition duration-200">
                <UploadCloud className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Drag & drop your curriculum PDF here
                </p>
                <p className="text-xs text-slate-500 mt-1">or browse files from your device</p>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                PDF Documents Only (Up to 30 MB)
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{file.name}</p>
                <p className="text-[11px] text-slate-500">
                  {file.size ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '3.4 MB'} • Ready for Extraction
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFile(null)}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleUploadAndAnalyze}
            disabled={isProcessing}
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Processing Document...</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                <span>Upload & Analyze</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mock PDF Stepper Progress */}
      {(isProcessing || isCompleted) && (
        <div className="space-y-4">
          <StepperProgress
            steps={steps}
            currentStepIndex={currentStepIndex}
            isCompleted={isCompleted}
          />

          {isCompleted && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-3 text-emerald-900">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold">Curriculum successfully processed.</h4>
                  <p className="text-xs text-emerald-800">All 8 semesters and 42 core courses extracted.</p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/curriculums/extracted/${createdCurriculumId || 'curr-cse-2025'}`)}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
              >
                <span>Review Extracted Curriculum</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
