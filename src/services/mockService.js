import { MOCK_USERS } from '../data/users';
import { MOCK_INSTITUTES } from '../data/institutes';
import { MOCK_PROGRAMS } from '../data/programs';
import { MOCK_CURRICULUMS } from '../data/curriculums';
import { MOCK_COURSES } from '../data/courses';
import { MOCK_REFERENCES } from '../data/references';
import { MOCK_ANALYSES } from '../data/analyses';
import { MOCK_RECOMMENDATIONS } from '../data/recommendations';
import { MOCK_NOTIFICATIONS } from '../data/notifications';

// In-memory persistent state during the application session
let curriculumsState = [...MOCK_CURRICULUMS];
let analysesState = [...MOCK_ANALYSES];
let recommendationsState = [...MOCK_RECOMMENDATIONS];
let notificationsState = [...MOCK_NOTIFICATIONS];
let currentUserState = null;

// Helper to simulate network latency
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const mockService = {
  // Authentication - Guaranteed fallback to ensure 100% login success
  async login(email, password) {
    await delay(200);
    const cleanEmail = (email || 'admin@demo.edu').trim().toLowerCase();
    let user = MOCK_USERS.find(u => u.email.toLowerCase() === cleanEmail);
    
    if (!user) {
      user = {
        id: `user-${Date.now()}`,
        email: cleanEmail,
        password: password || '123456',
        name: cleanEmail.includes('faculty') ? 'Prof. Ananya Rao' : cleanEmail.includes('super') ? 'AICTE Central Authority' : 'Dr. S. K. Mehta (University Admin)',
        role: cleanEmail.includes('faculty') ? 'faculty' : cleanEmail.includes('super') ? 'super_admin' : 'institute_admin',
        roleTitle: cleanEmail.includes('faculty') ? 'Faculty Member' : cleanEmail.includes('super') ? 'AICTE Super Admin' : 'University Admin',
        institute: 'Presidency University'
      };
    }
    currentUserState = user;
    return user;
  },

  async getCurrentUser() {
    return currentUserState;
  },

  async logout() {
    currentUserState = null;
    return true;
  },

  // Dashboard Data
  async getDashboardData() {
    await delay(150);
    return {
      institute: MOCK_INSTITUTES[0],
      stats: {
        totalCurriculums: curriculumsState.length,
        curriculumVersions: curriculumsState.reduce((acc, c) => acc + (c.versions?.length || 1), 0),
        analysesCompleted: analysesState.length,
        needsReview: 3,
        programs: MOCK_PROGRAMS.length
      },
      recentCurriculums: curriculumsState,
      analysisSummary: {
        analyzedCount: 9,
        potentialMatches: 40,
        partialMatches: 4,
        potentialGaps: 3,
        needsManualReview: 2
      }
    };
  },

  // Curriculums
  async getCurriculums() {
    await delay(150);
    return [...curriculumsState];
  },

  async getCurriculum(id) {
    await delay(150);
    const curr = curriculumsState.find(c => c.id === id);
    if (!curr) return curriculumsState[0];
    return curr;
  },

  async uploadCurriculum(programData, file) {
    await delay(300);
    const newId = `curr-${Date.now()}`;
    const newCurr = {
      id: newId,
      programId: programData.programId || 'prog-cse',
      programName: programData.programName || 'B.Tech Computer Science and Engineering',
      degree: programData.degree || 'B.Tech',
      academicYear: programData.academicYear || '2025-26',
      regulation: programData.regulation || 'R2025',
      title: programData.title || `${programData.degree || 'B.Tech'} Curriculum ${programData.academicYear || '2025-26'}`,
      institute: 'Presidency University',
      version: 'v1.0',
      status: 'Processing',
      analysisStatus: 'Processing',
      lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      aicteReferenceId: 'ref-aicte-2026',
      aicteReferenceName: 'AICTE Model Curriculum 2026',
      totalCredits: 160,
      fileName: file ? file.name : 'Uploaded_Curriculum.pdf',
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '3.4 MB',
      semesters: [...MOCK_CURRICULUMS[0].semesters],
      versions: [
        {
          version: 'v1.0',
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          author: currentUserState?.name || 'Dr. S. K. Mehta',
          summary: 'Initial uploaded curriculum from PDF.',
          type: 'Major Version',
          status: 'Current'
        }
      ]
    };
    curriculumsState.unshift(newCurr);
    return newCurr;
  },

  async processCurriculum(id, onStepProgress) {
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

    for (let i = 0; i < steps.length; i++) {
      if (onStepProgress) onStepProgress(i, steps[i]);
      await delay(200);
    }

    const currIndex = curriculumsState.findIndex(c => c.id === id);
    if (currIndex !== -1) {
      curriculumsState[currIndex].status = 'Ready for Review';
      curriculumsState[currIndex].analysisStatus = 'Ready for Review';
    }
    return true;
  },

  async getExtractedCurriculum(id) {
    await delay(150);
    const curr = await this.getCurriculum(id);
    return {
      curriculum: curr,
      extractionSummary: {
        semestersDetected: 8,
        coursesDetected: 42,
        creditsDetected: 160,
        modulesDetected: 168,
        outcomesDetected: 126
      }
    };
  },

  async updateExtractedCurriculum(id, updatedCurriculum) {
    await delay(200);
    const index = curriculumsState.findIndex(c => c.id === id);
    if (index !== -1) {
      curriculumsState[index] = { ...curriculumsState[index], ...updatedCurriculum, status: 'Analyzed' };
    }
    return curriculumsState[index];
  },

  // References
  async getReferences() {
    await delay(150);
    return MOCK_REFERENCES;
  },

  // Analysis & AI Alignment
  async runAnalysis(curriculumId, referenceId) {
    await delay(400);
    const curr = await this.getCurriculum(curriculumId);
    const ref = MOCK_REFERENCES.find(r => r.id === referenceId) || MOCK_REFERENCES[0];

    const newAnalysis = {
      id: `analysis-${Date.now()}`,
      curriculumId: curr.id,
      curriculumTitle: curr.title,
      institute: curr.institute,
      program: curr.programName,
      version: curr.version,
      referenceId: ref.id,
      referenceTitle: ref.title,
      analysisDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      summary: {
        potentialMatches: 40,
        partialMatches: 4,
        potentialGaps: 3,
        additionalContent: 5,
        needsReview: 2
      },
      courseComparisons: MOCK_ANALYSES[0].courseComparisons,
      skillGaps: MOCK_ANALYSES[0].skillGaps
    };

    analysesState.unshift(newAnalysis);

    const currIndex = curriculumsState.findIndex(c => c.id === curriculumId);
    if (currIndex !== -1) {
      curriculumsState[currIndex].status = 'Analyzed';
      curriculumsState[currIndex].analysisStatus = 'Analyzed';
      curriculumsState[currIndex].aicteReferenceId = ref.id;
      curriculumsState[currIndex].aicteReferenceName = ref.title;
    }

    return newAnalysis;
  },

  async getAnalysis(id) {
    await delay(150);
    const found = analysesState.find(a => a.id === id || a.curriculumId === id);
    return found || analysesState[0];
  },

  async getRecommendations(curriculumId) {
    await delay(150);
    return recommendationsState.filter(r => r.curriculumId === curriculumId || true);
  },

  // Versions
  async getVersionHistory(curriculumId) {
    await delay(150);
    const curr = await this.getCurriculum(curriculumId);
    return curr.versions || [];
  },

  async createVersion(curriculumId, versionData) {
    await delay(300);
    const currIndex = curriculumsState.findIndex(c => c.id === curriculumId);
    if (currIndex !== -1) {
      const oldVersion = curriculumsState[currIndex].version;
      const newVersionStr = versionData.versionNumber || 'v1.1';

      curriculumsState[currIndex].versions = curriculumsState[currIndex].versions.map(v => ({ ...v, status: 'Archived' }));

      const newVerEntry = {
        version: newVersionStr,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        author: currentUserState?.name || 'Prof. Ananya Rao',
        summary: versionData.changeSummary || 'Updated curriculum structure and electives.',
        type: versionData.versionType || 'Minor Revision',
        status: 'Current'
      };

      curriculumsState[currIndex].versions.unshift(newVerEntry);
      curriculumsState[currIndex].version = newVersionStr;
      curriculumsState[currIndex].lastUpdated = newVerEntry.date;
    }
    return curriculumsState[currIndex];
  },

  async compareVersions(oldVersion, newVersion) {
    await delay(200);
    return {
      oldVersion: oldVersion || 'v1.0',
      newVersion: newVersion || 'v1.1',
      added: [
        { type: 'Course Module', title: 'Generative AI & LLM Fine-Tuning Module in CSE301 Machine Learning' },
        { type: 'Elective Subject', title: 'PEC602 DevSecOps & Container Security (3 Credits)' }
      ],
      removed: [],
      modified: [
        { type: 'Course Credit', title: 'CSE301 Machine Learning Lab component credits increased from 3 to 4' }
      ],
      unchangedCount: 41
    };
  },

  // Courses & Programs & Notifications
  async getCourses() {
    await delay(150);
    return MOCK_COURSES;
  },

  async getPrograms() {
    await delay(150);
    return MOCK_PROGRAMS;
  },

  async getNotifications() {
    await delay(150);
    return notificationsState;
  },

  async getReports() {
    await delay(150);
    return [
      {
        id: 'report-1',
        title: 'Curriculum Alignment Analysis Report — B.Tech CSE v1.1',
        program: 'B.Tech Computer Science and Engineering',
        institute: 'Presidency University',
        curriculumVersion: 'v1.1',
        aicteReference: 'AICTE Model Curriculum 2026',
        date: '24 Sep 2026',
        fileSize: '1.2 MB'
      }
    ];
  }
};
