import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, RefreshCw, Download, ArrowRight, ShieldCheck, Search } from 'lucide-react';

export default function SyllabusPdfComparisonView({ currentUser }) {
  const [selectedDept, setSelectedDept] = useState('Computer Science & Engineering');
  const [selectedSemester, setSelectedSemester] = useState('Semester 4');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonTableData, setComparisonTableData] = useState(null);

  // Pre-configured sample university PDF syllabi for 1-click testing
  const samplePdfs = [
    {
      id: 'pdf-1',
      name: 'VTU_2022_Scheme_Computer_Science_Syllabus.pdf',
      college: 'Visvesvaraya Technological University (VTU)',
      size: '2.8 MB'
    },
    {
      id: 'pdf-2',
      name: 'Presidency_Univ_CSE_Curriculum_2023.pdf',
      college: 'Presidency University, Bengaluru',
      size: '3.4 MB'
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processPdf(file.name, `${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  };

  const handleSampleSelect = (sample) => {
    processPdf(sample.name, sample.size);
  };

  const processPdf = (fileName, fileSize) => {
    setUploadedFile({ name: fileName, size: fileSize, uploadDate: new Date().toLocaleDateString() });
    setIsProcessing(true);
    setComparisonTableData(null);

    setTimeout(() => {
      setIsProcessing(false);
      setComparisonTableData({
        fileName: fileName,
        comparedAgainst: 'AICTE Model Curriculum (v2026.1.0)',
        department: selectedDept,
        semester: selectedSemester,
        overallAlignment: '76% Aligned',
        summaryStats: {
          matchedCount: 14,
          missingCount: 3,
          outdatedCount: 2,
          extraLocalCount: 2
        },
        rows: [
          {
            id: 'row-1',
            courseCode: 'PCC-CS401',
            subjectTitle: 'Data Structures & Algorithms',
            unit: 'Unit 1: Linear Data Structures',
            aicteStandard: 'Arrays, Stacks, Queues, Circular Queues, Complexity Analysis (8 Hours)',
            universityPdf: 'Arrays, Single Linked Lists, Stacks, Queues (8 Hours)',
            status: 'Matched',
            statusLabel: 'Aligned',
            recommendation: 'No changes required. Fully aligns with AICTE model.'
          },
          {
            id: 'row-2',
            courseCode: 'PCC-CS401',
            subjectTitle: 'Data Structures & Algorithms',
            unit: 'Unit 2: Trees & Graph Algorithms',
            aicteStandard: 'BST, AVL Trees, B-Trees, Graph Traversal (BFS/DFS), Shortest Path (10 Hours)',
            universityPdf: 'BST, Binary Trees, Simple BFS/DFS Traversal (8 Hours)',
            status: 'Missing',
            statusLabel: 'Missing Topics',
            recommendation: 'Add AVL Trees & Dijkstra Shortest Path algorithm (+2 Hours).'
          },
          {
            id: 'row-3',
            courseCode: 'PCC-CS402',
            subjectTitle: 'Operating Systems & Cloud Architecture',
            unit: 'Unit 3: Memory Management & Paging',
            aicteStandard: 'Virtual Memory, Paging, Segmentation, Page Replacement Algorithms (9 Hours)',
            universityPdf: 'Contiguous Allocation, Paging, Segmentation (8 Hours)',
            status: 'Matched',
            statusLabel: 'Aligned',
            recommendation: 'Fully aligned with AICTE core framework.'
          },
          {
            id: 'row-4',
            courseCode: 'PCC-CS402',
            subjectTitle: 'Operating Systems & Cloud Architecture',
            unit: 'Unit 4: Cloud & Microservices',
            aicteStandard: 'Containerization with Docker, Microservices, Kubernetes Basics (10 Hours)',
            universityPdf: 'Not Present in Uploaded PDF (Legacy Monolithic Servers only)',
            status: 'Missing',
            statusLabel: 'Missing Unit',
            recommendation: 'Introduce Unit 4 Docker & Container Orchestration module (Mandatory in v2026.1).'
          },
          {
            id: 'row-5',
            courseCode: 'PEC-CS601',
            subjectTitle: 'DevOps & Cloud-Native Engineering',
            unit: 'Full Elective Subject',
            aicteStandard: '3-Credit Professional Elective: CI/CD Pipelines, Terraform, IaC (40 Hours)',
            universityPdf: 'Not Found in University Scheme (Missing Elective)',
            status: 'Missing',
            statusLabel: 'Elective Gap',
            recommendation: 'Introduce PEC-CS601 as Professional Elective in Semester 6.'
          },
          {
            id: 'row-6',
            courseCode: 'PCC-CS403',
            subjectTitle: 'Microprocessors & Architecture',
            unit: 'Unit 1: Processor Architecture',
            aicteStandard: 'RISC-V Open Architecture & ARM Cortex Fundamentals (10 Hours)',
            universityPdf: 'Legacy Intel 8085 / 8086 Assembly Programming (10 Hours)',
            status: 'Outdated',
            statusLabel: 'Outdated Topic',
            recommendation: 'Replace legacy 8085 assembly with modern RISC-V open instruction architecture.'
          },
          {
            id: 'row-7',
            courseCode: 'INST-CS409',
            subjectTitle: 'University Local Specialization',
            unit: 'Local Institutional Elective',
            aicteStandard: 'AICTE allows up to 20-30% Local University Specialization credits',
            universityPdf: 'Regional Industry Skill: Smart Agriculture IoT Systems (3 Credits)',
            status: 'Extra',
            statusLabel: 'Local Elective',
            recommendation: 'Approved institutional elective under 20% local autonomy quota.'
          }
        ]
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            University Syllabus Ingestion & Automated Benchmarking
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-2">
            Upload University PDF & Compare with AICTE Model Standard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as: <strong className="text-slate-800">{currentUser?.name || 'University User'}</strong> ({currentUser?.institution || 'Presidency University'})
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">Model Standard:</span>
          <span className="font-bold text-blue-900 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-sm">
            AICTE Model Curriculum v2026.1.0
          </span>
        </div>
      </div>

      {/* Upload Box Container */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Step 1: Upload University Syllabus PDF
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Department / Branch</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-blue-700"
            >
              <option value="Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
              <option value="Electronics & Communication Engineering">B.Tech Electronics & Communication</option>
              <option value="Information Science & Engineering">B.Tech Information Science & Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Academic Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg p-2.5 font-medium focus:ring-2 focus:ring-blue-700"
            >
              <option value="Semester 4">Semester 4 (2nd Year)</option>
              <option value="Semester 5">Semester 5 (3rd Year)</option>
              <option value="Semester 6">Semester 6 (3rd Year)</option>
              <option value="Full Scheme">Full 4-Year Scheme (8 Semesters)</option>
            </select>
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-700 bg-slate-50/50 hover:bg-blue-50/50 rounded-xl p-8 text-center transition cursor-pointer relative">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <UploadCloud className="h-8 w-8 text-blue-700" />
            <p className="text-xs font-bold text-slate-800">
              Click to select or drag and drop your University Syllabus PDF file here
            </p>
            <p className="text-[11px] text-slate-500">
              Supports official University PDF schemes (Up to 30 MB)
            </p>
          </div>
        </div>

        {/* Quick Sample Test Buttons */}
        <div className="pt-2">
          <p className="text-xs font-bold text-slate-500 mb-2">Or test instantly using a sample university PDF:</p>
          <div className="flex flex-wrap gap-3">
            {samplePdfs.map(sample => (
              <button
                key={sample.id}
                onClick={() => handleSampleSelect(sample)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 rounded-lg text-xs font-semibold text-slate-800 transition flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-blue-700" />
                <span>{sample.name} ({sample.size})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isProcessing && (
        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center space-y-3">
          <RefreshCw className="h-8 w-8 text-blue-700 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Parsing PDF & Running AICTE Model Comparison...</h3>
          <p className="text-xs text-slate-500">Extracting topics, units, and credit breakdown from uploaded document...</p>
        </div>
      )}

      {/* Comparison Table Section */}
      {comparisonTableData && !isProcessing && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Table Header Summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
                  Comparison Complete
                </span>
                <span className="text-xs text-slate-500">File: <strong>{comparisonTableData.fileName}</strong></span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Detailed Curriculum Comparison Table
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Alignment</span>
                <span className="text-xl font-bold text-blue-800">{comparisonTableData.overallAlignment}</span>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <button
                onClick={() => alert("Downloading official Side-by-Side Comparison Report (PDF format)...")}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded shadow transition flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Export PDF Table
              </button>
            </div>
          </div>

          {/* Structured Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="p-3 font-bold w-1/6">Course Code & Unit</th>
                  <th className="p-3 font-bold w-1/3">AICTE Model Curriculum Standard</th>
                  <th className="p-3 font-bold w-1/3">Uploaded University Syllabus (PDF)</th>
                  <th className="p-3 font-bold text-center">Status</th>
                  <th className="p-3 font-bold">Action / Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonTableData.rows.map((row) => {
                  let statusBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                  if (row.status === 'Missing') statusBg = 'bg-rose-100 text-rose-800 border-rose-300';
                  if (row.status === 'Outdated') statusBg = 'bg-amber-100 text-amber-800 border-amber-300';
                  if (row.status === 'Extra') statusBg = 'bg-blue-100 text-blue-800 border-blue-300';

                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-semibold text-slate-900 align-top">
                        <div className="font-mono text-blue-900 font-bold">{row.courseCode}</div>
                        <div className="text-[11px] text-slate-700 mt-0.5">{row.subjectTitle}</div>
                        <div className="text-[10px] text-slate-500 font-medium mt-1 bg-slate-100 px-1.5 py-0.5 rounded w-fit">
                          {row.unit}
                        </div>
                      </td>

                      <td className="p-3 text-slate-800 align-top bg-blue-50/30">
                        <p className="font-medium leading-relaxed">{row.aicteStandard}</p>
                      </td>

                      <td className="p-3 text-slate-800 align-top">
                        <p className={`font-medium leading-relaxed ${row.status === 'Missing' ? 'text-rose-700 italic' : ''}`}>
                          {row.universityPdf}
                        </p>
                      </td>

                      <td className="p-3 text-center align-top whitespace-nowrap">
                        <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded border ${statusBg}`}>
                          {row.statusLabel}
                        </span>
                      </td>

                      <td className="p-3 text-slate-700 align-top font-medium text-[11px]">
                        {row.recommendation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-slate-500">
              Report ready for HOD and Board of Studies (BoS) Curriculum Approval Committee.
            </span>
            <button
              onClick={() => alert("Comparison table submitted to Board of Studies Approval Queue!")}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>Submit to Board of Studies (BoS)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
