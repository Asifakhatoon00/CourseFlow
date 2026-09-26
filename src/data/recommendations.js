export const MOCK_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    curriculumId: 'curr-cse-2025',
    title: 'Potential Curriculum Gap — Cloud-Native Infrastructure',
    courseName: 'Cloud Computing & Microservices',
    type: 'Potential Curriculum Gap',
    severity: 'High',
    description: 'Model Evaluation and Docker Containerization topics were not clearly identified in the current Machine Learning and Operating Systems syllabus.',
    suggestedAction: 'Review the Machine Learning syllabus and add a 1-credit practical lab component for Docker & Kubernetes.',
    status: 'Active'
  },
  {
    id: 'rec-2',
    curriculumId: 'curr-cse-2025',
    title: 'Industry Skill Alignment — Generative AI & Vector DBs',
    courseName: 'Database Management Systems',
    type: 'Industry Skill Gap',
    severity: 'Medium',
    description: 'AICTE 2026 reference mandates exposure to Vector Search (pgvector / Pinecone) for Retrieval-Augmented Generation (RAG).',
    suggestedAction: 'Include a 2-hour lecture module on Vector Embeddings in DBMS Module 4.',
    status: 'Active'
  },
  {
    id: 'rec-3',
    curriculumId: 'curr-cse-2025',
    title: 'Outdated Topic Replacement — Legacy Assembly',
    courseName: 'Computer Organization & Architecture',
    type: 'Outdated Content',
    severity: 'Medium',
    description: '8085 Assembly instruction sets can be modernized with RISC-V open instruction architecture.',
    suggestedAction: 'Replace 8085 Assembly lectures with RISC-V Open Architecture fundamentals.',
    status: 'Active'
  }
];
