import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, RefreshCw, Download, ArrowRight, ShieldCheck, Eye } from 'lucide-react';

export default function SyllabusPdfComparisonView({ currentUser }) {
  const [selectedDept, setSelectedDept] = useState('Computer Science & Engineering');
  const [selectedSemester, setSelectedSemester] = useState('Semester 6');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [comparisonTableData, setComparisonTableData] = useState({
    fileName: 'Presidency_Univ_CSE_Curriculum_2025.pdf',
    comparedAgainst: 'AICTE Standard Model Curriculum B.Tech CSE (v2026.1.0)',
    department: 'Computer Science & Engineering',
    semester: 'Semester 6',
    overallAlignment: '78% Aligned',
    rows: [
      {
        id: 'row-1',
        courseCode: 'PCC-CS401',
        subjectTitle: 'Data Structures & Algorithms',
        unit: 'Unit 1: Linear Data Structures',
        aicteStandard: 'Arrays, Stacks, Queues, Circular Queues, Complexity Analysis (8 Hours)',
        universityPdf: 'Arrays, Single Linked Lists, Stacks, Queues (8 Hours)',
        status: 'Matched',
        statusLabel: 'Matched / Aligned',
        recommendation: 'Fully aligned with AICTE CSE standard model.'
      },
      {
        id: 'row-2',
        courseCode: 'PCC-CS401',
        subjectTitle: 'Data Structures & Algorithms',
        unit: 'Unit 2: Graph Algorithms & Trees',
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
        unit: 'Unit 4: Cloud & Containerization',
        aicteStandard: 'Containerization with Docker, Microservices, Kubernetes Basics (10 Hours)',
        universityPdf: 'Not Found in Uploaded PDF (Legacy Monolithic Servers only)',
        status: 'Missing',
        statusLabel: 'Missing Unit',
        recommendation: 'Introduce Unit 4 Docker & Container Orchestration module (Mandatory in v2026.1).'
      },
      {
        id: 'row-4',
        courseCode: 'PCC-CS403',
        subjectTitle: 'Computer Architecture & Processor Design',
        unit: 'Unit 1: Microprocessor Architecture',
        aicteStandard: 'RISC-V Open Instruction Architecture & ARM Fundamentals (10 Hours)',
        universityPdf: 'Legacy Intel 8085 / 8086 Assembly Programming (10 Hours)',
        status: 'Outdated',
        statusLabel: 'Outdated Topic',
        recommendation: 'Replace legacy 8085 assembly with modern RISC-V open instruction architecture.'
      },
      {
        id: 'row-5',
        courseCode: 'PEC-CS601',
        subjectTitle: 'DevOps & Cloud-Native Engineering',
        unit: 'Full Elective Subject',
        aicteStandard: '3-Credit Professional Elective: CI/CD Pipelines, Terraform, IaC (40 Hours)',
        universityPdf: 'Not Found in University Scheme (Missing Elective)',
        status: 'Missing',
        statusLabel: 'Missing Elective',
        recommendation: 'Introduce PEC-CS601 as Professional Elective in Semester 6.'
      },
      {
        id: 'row-6',
        courseCode: 'INST-CS409',
        subjectTitle: 'University Local Specialization',
        unit: 'Local Institutional Elective',
        aicteStandard: 'AICTE allows up to 20% Local Institutional Specialization quota',
        universityPdf: 'Smart Agriculture IoT Systems (3 Credits)',
        status: 'Extra',
        statusLabel: 'Local Elective',
        recommendation: 'Approved institutional elective under 20% local autonomy quota.'
      }
    ]
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      processPdf(file.name, `${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  };

  const processPdf = (fileName, fileSize) => {
    setUploadedFile({ name: fileName, size: fileSize });
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-900 font-sans text-base">
      
      {/* Top Banner Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
              Official Benchmark Standard Model
            </span>
            <span className="text-sm font-mono font-bold bg-slate-900 text-white px-3 py-1 rounded-lg">
              AICTE CSE v2026.1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            AICTE B.Tech Computer Science & Engineering (CSE) Model Comparison
          </h1>
          <p className="text-sm text-slate-600">
            Upload your university PDF syllabus and view the side-by-side comparison table against the official AICTE B.Tech CSE Model Curriculum.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert("Viewing Official AICTE B.Tech CSE Model Curriculum PDF Booklet...")}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" /> View AICTE CSE Model PDF
          </button>
        </div>
      </div>

      {/* Step 1: Upload Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-blue-700" />
          Step 1: Upload University Syllabus PDF
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold">
          <div>
            <label className="block text-slate-800 mb-1.5 font-bold">Select Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl p-3 font-semibold focus:ring-2 focus:ring-blue-700"
            >
              <option value="Computer Science & Engineering">B.Tech Computer Science & Engineering (CSE)</option>
              <option value="Electronics & Communication Engineering">B.Tech Electronics & Communication (ECE)</option>
              <option value="Information Science & Engineering">B.Tech Information Science & Engineering (ISE)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-800 mb-1.5 font-bold">AICTE Benchmark Standard</label>
            <input
              type="text"
              disabled
              value="AICTE Official B.Tech CSE Model Curriculum (2026 PDF)"
              className="w-full bg-slate-100 border border-slate-300 text-slate-700 text-sm rounded-xl p-3 font-bold"
            />
          </div>
        </div>

        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-700 bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-10 text-center transition cursor-pointer relative group">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl group-hover:scale-105 transition">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">
                Click to browse or drag & drop your University Syllabus PDF file here
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Supports PDF formats (Up to 30 MB)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isProcessing && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
          <RefreshCw className="h-8 w-8 text-blue-700 animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Parsing University PDF & Comparing with AICTE CSE Standard...</h3>
          <p className="text-sm text-slate-600">Matching course codes, units, and learning outcomes...</p>
        </div>
      )}

      {/* Step 2: Side-by-Side Comparison Table */}
      {comparisonTableData && !isProcessing && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300">
                PDF Comparison Complete
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                Side-by-Side Syllabus Comparison Table
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Comparing University PDF (<strong>{comparisonTableData.fileName}</strong>) against <strong>AICTE B.Tech CSE Model Standard</strong>.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-xs uppercase font-bold text-slate-500 block">Alignment Degree</span>
                <span className="text-2xl font-extrabold text-blue-800">{comparisonTableData.overallAlignment}</span>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <button
                onClick={() => alert("Downloading official Side-by-Side Comparison Table (PDF format)...")}
                className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl shadow transition flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download Comparison PDF
              </button>
            </div>
          </div>

          {/* Clean Side-by-Side Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="p-4 font-bold w-1/5 text-sm">Course & Unit</th>
                  <th className="p-4 font-bold w-1/3 text-sm">AICTE B.Tech CSE Model Standard</th>
                  <th className="p-4 font-bold w-1/3 text-sm">Uploaded University Syllabus PDF</th>
                  <th className="p-4 font-bold text-center text-sm">Status</th>
                  <th className="p-4 font-bold text-sm">Action / Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {comparisonTableData.rows.map((row) => {
                  let statusStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                  if (row.status === 'Missing') statusStyle = 'bg-rose-100 text-rose-900 border-rose-300';
                  if (row.status === 'Outdated') statusStyle = 'bg-amber-100 text-amber-900 border-amber-300';
                  if (row.status === 'Extra') statusStyle = 'bg-blue-100 text-blue-900 border-blue-300';

                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 align-top">
                        <div className="font-mono text-blue-900 font-bold text-sm">{row.courseCode}</div>
                        <div className="text-sm font-bold text-slate-900 mt-1">{row.subjectTitle}</div>
                        <div className="text-xs text-slate-600 font-semibold mt-1 bg-slate-100 px-2 py-0.5 rounded w-fit">
                          {row.unit}
                        </div>
                      </td>

                      <td className="p-4 align-top bg-blue-50/40 text-slate-900 leading-relaxed font-semibold">
                        {row.aicteStandard}
                      </td>

                      <td className="p-4 align-top text-slate-900 leading-relaxed font-semibold">
                        <span className={row.status === 'Missing' ? 'text-rose-700 italic font-bold' : ''}>
                          {row.universityPdf}
                        </span>
                      </td>

                      <td className="p-4 text-center align-top whitespace-nowrap">
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-lg border ${statusStyle}`}>
                          {row.statusLabel}
                        </span>
                      </td>

                      <td className="p-4 align-top text-slate-800 leading-relaxed text-sm font-medium">
                        {row.recommendation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-600">
              Ready to create Version 1.1 with updated changes.
            </span>
            <button
              onClick={() => alert("Creating updated Version 1.1 from comparison table...")}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow transition flex items-center gap-2"
            >
              <span>Save & Publish Version 1.1</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
