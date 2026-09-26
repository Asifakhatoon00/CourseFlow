import { MOCK_COURSES } from './courses';

export const MOCK_CURRICULUMS = [
  {
    id: 'curr-cse-2025',
    programId: 'prog-cse',
    programName: 'B.Tech Computer Science and Engineering',
    degree: 'B.Tech',
    academicYear: '2025-26',
    regulation: 'R2025',
    title: 'B.Tech CSE Curriculum 2025-26',
    institute: 'Presidency University',
    version: 'v1.0',
    status: 'Analyzed',
    analysisStatus: 'Analyzed',
    lastUpdated: '24 Sep 2026',
    aicteReferenceId: 'ref-aicte-2026',
    aicteReferenceName: 'AICTE Model Curriculum 2026',
    totalCredits: 160,
    semesters: [
      {
        semester: 1,
        title: 'Semester 1',
        totalCredits: 20,
        courses: [
          { id: 'c101', code: 'MAT101', title: 'Calculus & Linear Algebra', credits: 4, category: 'Basic Science', status: 'Active' },
          { id: 'c102', code: 'PHY101', title: 'Engineering Physics', credits: 4, category: 'Basic Science', status: 'Active' },
          { id: 'c103', code: 'CSE101', title: 'Programming Fundamentals in C', credits: 4, category: 'Core', status: 'Active' }
        ]
      },
      {
        semester: 2,
        title: 'Semester 2',
        totalCredits: 20,
        courses: [
          { id: 'c201', code: 'MAT201', title: 'Differential Equations & Transforms', credits: 4, category: 'Basic Science', status: 'Active' },
          { id: 'c202', code: 'EEE201', title: 'Basic Electrical Engineering', credits: 4, category: 'Engineering Science', status: 'Active' },
          { id: 'c203', code: 'CSE201', title: 'Object-Oriented Programming with Java', credits: 4, category: 'Core', status: 'Active' }
        ]
      },
      {
        semester: 3,
        title: 'Semester 3',
        totalCredits: 20,
        courses: [
          { id: 'c301', code: 'CSE301', title: 'Data Structures & Algorithms', credits: 4, category: 'Core', status: 'Active' },
          { id: 'c302', code: 'CSE302', title: 'Discrete Mathematics', credits: 3, category: 'Core', status: 'Active' },
          { id: 'c303', code: 'ECE301', title: 'Digital Electronics', credits: 4, category: 'Engineering Science', status: 'Active' }
        ]
      },
      {
        semester: 4,
        title: 'Semester 4',
        totalCredits: 20,
        courses: [
          { id: 'c401', code: 'CSE401', title: 'Operating Systems', credits: 4, category: 'Core', status: 'Active' },
          { id: 'c402', code: 'CSE402', title: 'Database Management Systems', credits: 4, category: 'Core', status: 'Active' },
          { id: 'c403', code: 'CSE403', title: 'Computer Organization & Architecture', credits: 4, category: 'Core', status: 'Active' }
        ]
      },
      {
        semester: 5,
        title: 'Semester 5',
        totalCredits: 20,
        courses: [
          { id: 'c501', code: 'CSE501', title: 'Computer Networks', credits: 4, category: 'Core', status: 'Active' },
          { id: 'c502', code: 'CSE502', title: 'Theory of Computation', credits: 3, category: 'Core', status: 'Active' },
          { id: 'c503', code: 'CSE503', title: 'Software Engineering', credits: 3, category: 'Core', status: 'Active' }
        ]
      },
      {
        semester: 6,
        title: 'Semester 6',
        totalCredits: 20,
        courses: MOCK_COURSES.map(c => ({ id: c.id, code: c.code, title: c.title, credits: c.credits, category: c.category, status: 'Active' }))
      },
      {
        semester: 7,
        title: 'Semester 7',
        totalCredits: 20,
        courses: [
          { id: 'c701', code: 'CSE701', title: 'Artificial Intelligence', credits: 4, category: 'Core', status: 'Active' },
          { id: 'c702', code: 'PEC701', title: 'Professional Elective I (Cyber Security)', credits: 3, category: 'Elective', status: 'Active' },
          { id: 'c703', code: 'PRJ701', title: 'Major Project Phase I', credits: 4, category: 'Project', status: 'Active' }
        ]
      },
      {
        semester: 8,
        title: 'Semester 8',
        totalCredits: 20,
        courses: [
          { id: 'c801', code: 'OEC801', title: 'Open Elective II (Robotics)', credits: 3, category: 'Elective', status: 'Active' },
          { id: 'c802', code: 'PRJ801', title: 'Major Project Phase II & Internship', credits: 10, category: 'Project', status: 'Active' }
        ]
      }
    ],
    versions: [
      {
        version: 'v1.1',
        date: '24 Sep 2026',
        author: 'Prof. Ananya Rao',
        summary: 'Added Generative AI module to ML syllabus & updated cloud computing lab credits.',
        type: 'Minor Revision',
        status: 'Current'
      },
      {
        version: 'v1.0',
        date: '10 Sep 2026',
        author: 'Dr. S. K. Mehta',
        summary: 'Initial uploaded and structured curriculum from institute PDF.',
        type: 'Major Version',
        status: 'Archived'
      }
    ]
  },
  {
    id: 'curr-aiml-2025',
    programId: 'prog-aiml',
    programName: 'B.Tech AI & Machine Learning',
    degree: 'B.Tech',
    academicYear: '2025-26',
    regulation: 'R2025',
    title: 'B.Tech AI & ML Curriculum 2025-26',
    institute: 'Presidency University',
    version: 'v1.0',
    status: 'Ready for Review',
    analysisStatus: 'Ready for Review',
    lastUpdated: '22 Sep 2026',
    aicteReferenceId: 'ref-aicte-2026',
    aicteReferenceName: 'AICTE Model Curriculum 2026',
    totalCredits: 160,
    semesters: [],
    versions: [
      {
        version: 'v1.0',
        date: '22 Sep 2026',
        author: 'Dr. S. K. Mehta',
        summary: 'Initial uploaded curriculum.',
        type: 'Major Version',
        status: 'Current'
      }
    ]
  }
];
