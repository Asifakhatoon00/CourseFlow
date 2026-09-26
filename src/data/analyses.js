export const MOCK_ANALYSES = [
  {
    id: 'analysis-101',
    curriculumId: 'curr-cse-2025',
    curriculumTitle: 'B.Tech CSE Curriculum 2025-26',
    institute: 'Presidency University',
    program: 'B.Tech CSE',
    version: 'v1.0',
    referenceId: 'ref-aicte-2026',
    referenceTitle: 'AICTE Model Curriculum 2026',
    analysisDate: '24 Sep 2026',
    summary: {
      potentialMatches: 40,
      partialMatches: 4,
      potentialGaps: 3,
      additionalContent: 5,
      needsReview: 2
    },
    courseComparisons: [
      {
        instituteCourse: 'Programming Fundamentals in C',
        referenceCourse: 'Programming for Problem Solving',
        result: 'Match',
        confidence: 'High',
        coveredTopics: ['Variables & Data Types', 'Control Flow', 'Functions', 'Arrays & Pointers'],
        missingTopics: [],
        additionalTopics: ['File I/O']
      },
      {
        instituteCourse: 'Data Structures & Algorithms',
        referenceCourse: 'Data Structures & Algorithms',
        result: 'Match',
        confidence: 'High',
        coveredTopics: ['Arrays', 'Stacks & Queues', 'Trees', 'Graphs'],
        missingTopics: ['AVL Trees', 'Dijkstra Algorithm'],
        additionalTopics: []
      },
      {
        instituteCourse: 'Database Management Systems',
        referenceCourse: 'Database Systems',
        result: 'Partial',
        confidence: 'Medium',
        coveredTopics: ['Relational Schema', 'SQL Queries', 'Normalization'],
        missingTopics: ['Vector Databases for GenAI', 'NoSQL Graph Databases'],
        additionalTopics: ['Legacy Stored Procedures']
      },
      {
        instituteCourse: 'Machine Learning',
        referenceCourse: 'Machine Learning',
        result: 'Match',
        confidence: 'High',
        coveredTopics: ['Regression', 'Classification', 'Decision Trees'],
        missingTopics: ['Clustering Methods', 'Model Evaluation ROC-AUC'],
        additionalTopics: ['Neural Networks Basics']
      },
      {
        instituteCourse: 'Not Found in Institute Syllabus',
        referenceCourse: 'Cloud Computing & Microservices',
        result: 'Potential Gap',
        confidence: 'High',
        coveredTopics: [],
        missingTopics: ['Docker Containerization', 'Kubernetes Orchestration', 'Microservices Architecture'],
        additionalTopics: []
      }
    ],
    skillGaps: {
      current: ['Python', 'Java', 'Data Structures', 'Database', 'Machine Learning'],
      reference: ['Python', 'Data Structures', 'Database', 'Machine Learning', 'Cloud Computing', 'Generative AI', 'MLOps'],
      gaps: ['Cloud Computing', 'MLOps', 'Generative AI']
    }
  }
];
