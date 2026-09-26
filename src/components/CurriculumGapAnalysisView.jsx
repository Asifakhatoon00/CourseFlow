import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, CheckCircle2, Sparkles, ArrowRight, Download, RefreshCw, BookOpen, Layers, Zap, ShieldCheck } from 'lucide-react';

export default function CurriculumGapAnalysisView({ curriculums }) {
  const [selectedDept, setSelectedDept] = useState('Computer Science & Engineering');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Pre-configured sample college syllabi for instant demo testing
  const sampleCollegeSyllabi = [
    {
      id: 'sample-vtu-cse',
      name: 'State Tech Univ 2022 Scheme (CSE).pdf',
      college: 'Affiliated University Scheme',
      dept: 'Computer Science & Engineering',
      fileSize: '3.4 MB',
      uploadDate: '2026-09-20'
    },
    {
      id: 'sample-pres-ece',
      name: 'Presidency Univ ECE Curriculum 2023.pdf',
      college: 'Presidency University, Bengaluru',
      dept: 'Electronics & Communication Engineering',
      fileSize: '2.8 MB',
      uploadDate: '2026-09-18'
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().split('T')[0]
      });
      runGapAnalysis(file.name);
    }
  };

  const handleSelectSample = (sample) => {
    setUploadedFile({
      name: sample.name,
      fileSize: sample.fileSize,
      uploadDate: sample.uploadDate
    });
    runGapAnalysis(sample.name);
  };

  const runGapAnalysis = (fileName) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI scanning and semantic diff against AICTE Model Curriculum v2026.1
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        collegeSyllabusName: fileName,
        comparedAgainst: 'AICTE Model Curriculum B.Tech CSE (v2026.1.0)',
        complianceScore: 78, // 78% aligned with benchmark
        totalCreditsUploaded: 154,
        aicteRequiredCredits: 160,
        missingCoreModules: [
          {
            courseCode: 'PCC-CS402',
            courseTitle: 'Operating Systems & Cloud Architecture',
            missingComponent: 'Unit 4: Cloud Architecture, Microservices & Docker Containerization',
            severity: 'High',
            reason: 'Mandatory in AICTE v2026.1 model. Currently missing in uploaded college syllabus.'
          },
          {
            courseCode: 'PEC-CS601',
            courseTitle: 'DevOps & Cloud-Native Engineering',
            missingComponent: 'Entire Professional Elective Subject',
            severity: 'Critical',
            reason: 'Industry gap identified: 84% tech recruiters mandate CI/CD & Terraform exposure.'
          }
        ],
        outdatedTopics: [
          {
            courseTitle: 'Data Structures & Algorithms',
            topic: 'Legacy Monolithic Array Implementations',
            recommendation: 'Replace 4 hours of basic array lectures with Dynamic Graph Algorithms & Vector Indices for AI'
          },
          {
            courseTitle: 'Database Management Systems',
            topic: 'Relational-only SQL Schemas',
            recommendation: 'Integrate Hybrid Vector Search (pgvector / Pinecone) for LLM Retrieval-Augmented Generation (RAG)'
          }
        ],
        industryRecommendations: [
          {
            domain: 'Generative AI & MLOps',
            topic: 'LLM Fine-Tuning & Model Evaluation',
            relevanceScore: '96% High Demand',
            suggestedAction: 'Include as 3-Credit Open Elective in Semester 6'
          },
          {
            domain: 'Cloud Security & DevSecOps',
            topic: 'Zero-Trust Architecture & IAM Security',
            relevanceScore: '92% High Demand',
            suggestedAction: 'Add 1-Credit Hands-on Lab in Semester 5'
          }
        ],
        bloomsAlignment: {
          rememberUnderstand: 35, // 35% low-tier cognitive
          applyAnalyze: 45,        // 45% mid-tier
          evaluateCreate: 20       // 20% high-tier (AICTE recommends 35%+)
        }
      });
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <Sparkles className="h-4 w-4 text-amber-400" />
            AICTE Automated Curriculum Benchmark & Ingestion Engine
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            University Curriculum File Upload & Automated Gap Analysis
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Upload your college's existing syllabus document (PDF/Word/JSON). Our NLP parser compares it against the AICTE Model Curriculum v2026.1 to highlight missing topics, outdated credits, and recommend industry-relevant modern subjects.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-indigo-200">
          Model Standard: <span className="text-white font-bold">AICTE v2026.1</span>
        </div>
      </div>

      {/* Upload and Department Selection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <UploadCloud className="h-5 w-5 text-blue-600" />
            Step 1: Upload College/University Curriculum Document
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Academic Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl p-2.5 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
                <option value="Electronics & Communication Engineering">B.Tech Electronics & Communication</option>
                <option value="Information Science & Engineering">B.Tech Information Science & Engineering</option>
                <option value="Artificial Intelligence & Data Science">B.Tech AI & Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Benchmark Standard</label>
              <input
                type="text"
                disabled
                value="AICTE Model Curriculum (v2026.1.0)"
                className="w-full bg-slate-100 border border-slate-300 text-slate-600 text-xs rounded-xl p-2.5 font-semibold"
              />
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/30 rounded-2xl p-8 text-center transition cursor-pointer relative group">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.json"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:scale-110 transition duration-200">
                <UploadCloud className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Click to browse or drop your university syllabus PDF/Word file here
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Supports PDF, DOCX, and JSON formats (Up to 25MB)
                </p>
              </div>
            </div>
          </div>

          {/* Sample Pre-loaded Syllabi for instant testing */}
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
              Or Click a Sample University Syllabus to Test Instantly:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sampleCollegeSyllabi.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 rounded-xl transition text-left"
                >
                  <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{sample.name}</p>
                    <p className="text-[10px] text-slate-500">{sample.college} • {sample.fileSize}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info & Status Sidebar */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold flex items-center gap-2 text-indigo-400 pb-3 border-b border-slate-800">
              <ShieldCheck className="h-4 w-4" />
              Automated NLP Scanner Features
            </h4>
            
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Topic Gap Analysis:</strong> Detects unit-level missing topics against AICTE 160-credit framework.</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Industry Skill Alignment:</strong> Identifies emerging tech (DevOps, GenAI, Microservices, Cybersecurity).</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Bloom's Taxonomy Audit:</strong> Evaluates Cognitive Taxonomy breakdown for NBA/NAAC accreditation compliance.</span>
              </li>
            </ul>
          </div>

          {uploadedFile && (
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Active Upload</span>
              <p className="text-xs font-bold text-white truncate">{uploadedFile.name}</p>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Size: {uploadedFile.fileSize}</span>
                <span>Date: {uploadedFile.uploadDate}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Loading State */}
      {isAnalyzing && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="inline-block p-4 bg-indigo-50 rounded-full text-indigo-600 animate-spin">
            <RefreshCw className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">AI Semantic Gap Engine Scanning Syllabus...</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Extracting course outcomes, credit distribution, and matching topics against AICTE Model Curriculum v2026.1.0...
            </p>
          </div>
        </div>
      )}

      {/* Gap Analysis Output Results */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6">
          {/* Executive Compliance Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  Automated Gap Report Generated
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Curriculum Gap & Compliance Report
                </h3>
                <p className="text-xs text-slate-500">
                  Uploaded Document: <span className="font-semibold text-slate-800">{analysisResult.collegeSyllabusName}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Alignment Score</span>
                  <span className="text-2xl font-black text-indigo-600">{analysisResult.complianceScore}%</span>
                </div>
                <div className="h-8 w-px bg-slate-300"></div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Credits</span>
                  <span className="text-sm font-bold text-slate-800">
                    {analysisResult.totalCreditsUploaded} / {analysisResult.aicteRequiredCredits} Credits
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Compliance Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>AICTE Benchmark Compliance Degree</span>
                <span>{analysisResult.complianceScore}% Aligned (6 Credits Short)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-600" style={{ width: `${analysisResult.complianceScore}%` }}></div>
                <div className="h-full bg-amber-400" style={{ width: '12%' }} title="Outdated topics needing replacement"></div>
                <div className="h-full bg-rose-500" style={{ width: '10%' }} title="Missing mandatory AICTE modules"></div>
              </div>
              <div className="flex gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-600"></span> AICTE Aligned (78%)</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400"></span> Needs Modernization (12%)</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500"></span> Missing Modules (10%)</span>
              </div>
            </div>

            {/* Gap Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Missing Core Modules */}
              <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  Missing Mandatory AICTE Core Modules ({analysisResult.missingCoreModules.length})
                </h4>

                <div className="space-y-3">
                  {analysisResult.missingCoreModules.map((item, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-lg border border-rose-200 shadow-sm space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-900 font-mono">{item.courseCode}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.severity === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.severity} Gap
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800">{item.courseTitle}</p>
                      <p className="text-xs font-semibold text-rose-700 bg-rose-50 p-2 rounded">
                        Missing: {item.missingComponent}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outdated Topics to Replace */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-amber-600" />
                  Outdated Topics Recommended for Replacement ({analysisResult.outdatedTopics.length})
                </h4>

                <div className="space-y-3">
                  {analysisResult.outdatedTopics.map((item, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-lg border border-amber-200 shadow-sm space-y-1.5">
                      <p className="text-xs font-bold text-slate-900">{item.courseTitle}</p>
                      <div className="text-xs text-rose-700 line-through bg-rose-50 p-1.5 rounded">
                        - Outdated: {item.topic}
                      </div>
                      <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-1.5 rounded">
                        + Action: {item.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Industry Relevant Suggestions */}
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4">
              <h4 className="text-sm font-bold flex items-center gap-2 text-indigo-400">
                <Sparkles className="h-4 w-4 text-amber-400" />
                AI Recommended Modern Industry Topics to Introduce
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.industryRecommendations.map((rec, idx) => (
                  <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-indigo-300">{rec.domain}</span>
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        {rec.relevanceScore}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white">{rec.topic}</p>
                    <p className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-700/50">
                      Recommendation: {rec.suggestedAction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Ready to submit for Board of Studies (BoS) Curriculum Ratification</span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => alert("Downloading official AICTE Gap Analysis Report (PDF format)...")}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download PDF Gap Summary
                </button>
                <button
                  onClick={() => alert("Curriculum Gap Report submitted to Board of Studies (BoS) queue!")}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  Submit Recommendations to BoS <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
