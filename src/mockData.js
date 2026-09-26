export const INITIAL_CURRICULUMS = [
  {
    id: "curr-cse-2026",
    title: "Model Curriculum for B.Tech Computer Science & Engineering",
    degree: "B.Tech",
    department: "Computer Science & Engineering",
    version: "v2026.1.0",
    status: "Published",
    lastUpdated: "2026-08-20",
    author: "AICTE Board of Studies (BoS)",
    totalCredits: 160,
    courses: [
      {
        code: "PCC-CS401",
        title: "Data Structures & Algorithms",
        semester: 4,
        category: "Professional Core Course",
        credits: 4,
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 0,
        outcomes: [
          "Understand the concepts of linear and non-linear data structures (Bloom's: Understand - 95%)",
          "Apply tree and graph traversal algorithms to solve complex computing problems (Bloom's: Apply - 92%)",
          "Analyze time and space complexity of sorting algorithms using asymptotic notations (Bloom's: Analyze - 88%)"
        ],
        modules: [
          { unit: 1, title: "Linear Data Structures: Arrays, Stacks, Queues", hours: 8 },
          { unit: 2, title: "Trees & Binary Search Trees (BST), AVL Trees", hours: 10 },
          { unit: 3, title: "Graph Algorithms: Shortest Path, MST, BFS/DFS", hours: 10 },
          { unit: 4, title: "Sorting & Hashing: QuickSort, MergeSort, Hash Tables", hours: 8 }
        ],
        textbooks: [
          "Data Structures and Algorithms in C++ - Adam Drozdek",
          "Introduction to Algorithms - Cormen, Leiserson, Rivest, Stein"
        ]
      },
      {
        code: "PCC-CS402",
        title: "Operating Systems & Cloud Architecture",
        semester: 4,
        category: "Professional Core Course",
        credits: 4,
        lectureHours: 3,
        tutorialHours: 0,
        practicalHours: 2,
        outcomes: [
          "Explain CPU scheduling, process synchronization, and deadlock prevention mechanisms (Bloom's: Understand - 90%)",
          "Evaluate virtual memory management policies including paging and segmentation (Bloom's: Evaluate - 85%)",
          "Design containerized cloud deployment scripts using Docker and Kubernetes (Bloom's: Create - 94%)"
        ],
        modules: [
          { unit: 1, title: "Processes, Threads & CPU Scheduling Algorithms", hours: 8 },
          { unit: 2, title: "Process Synchronization & Deadlock Management", hours: 9 },
          { unit: 3, title: "Virtual Memory, Paging & File System Management", hours: 9 },
          { unit: 4, title: "Cloud Architecture, Microservices & Containerization", hours: 10 }
        ],
        textbooks: [
          "Operating System Concepts - Silberschatz, Galvin, Gagne",
          "Modern Operating Systems - Andrew S. Tanenbaum"
        ]
      },
      {
        code: "PEC-CS601",
        title: "DevOps & Cloud-Native Engineering",
        semester: 6,
        category: "Professional Elective Course",
        credits: 3,
        lectureHours: 3,
        tutorialHours: 0,
        practicalHours: 0,
        outcomes: [
          "Construct CI/CD automation pipelines using GitHub Actions and Jenkins (Bloom's: Create - 96%)",
          "Analyze infrastructure-as-code automation using Terraform (Bloom's: Analyze - 89%)"
        ],
        modules: [
          { unit: 1, title: "Version Control & Collaborative Workflows with Git", hours: 6 },
          { unit: 2, title: "CI/CD Pipeline Automation & Automated Testing", hours: 9 },
          { unit: 3, title: "Containerization with Docker & Orchestration with Kubernetes", hours: 11 },
          { unit: 4, title: "Infrastructure as Code (IaC) with Terraform & Cloud Security", hours: 10 }
        ],
        textbooks: [
          "The DevOps Handbook - Gene Kim, Jez Humble",
          "Cloud Native Infrastructure - Justin Garrison"
        ]
      }
    ]
  },
  {
    id: "curr-ece-2026",
    title: "Model Curriculum for B.Tech Electronics & Communication Engineering",
    degree: "B.Tech",
    department: "Electronics & Communication Engineering",
    version: "v2026.1.0",
    status: "Published",
    lastUpdated: "2026-08-15",
    author: "AICTE Board of Studies (BoS)",
    totalCredits: 160,
    courses: [
      {
        code: "PCC-EC401",
        title: "Signals and Systems",
        semester: 4,
        category: "Professional Core Course",
        credits: 4,
        lectureHours: 3,
        tutorialHours: 1,
        practicalHours: 0,
        outcomes: [
          "Analyze continuous and discrete-time signals using Fourier Transform (Bloom's: Analyze - 91%)"
        ],
        modules: [
          { unit: 1, title: "Classification of Signals and Systems", hours: 8 },
          { unit: 2, title: "Fourier Series and Fourier Transform Analysis", hours: 10 }
        ],
        textbooks: ["Signals and Systems - Oppenheim & Willsky"]
      }
    ]
  }
];

export const MOCK_APPROVAL_REQUESTS = [
  {
    id: "app-101",
    curriculumId: "curr-cse-2026",
    subjectCode: "PEC-CS601",
    subjectTitle: "DevOps & Cloud-Native Engineering",
    department: "Computer Science & Engineering",
    submittedBy: "Prof. R. V. Sharma (Subject Expert)",
    submittedDate: "2026-08-25",
    currentStage: "BoS Committee Review",
    status: "Under Review",
    comments: [
      { author: "Prof. R. V. Sharma", role: "Author", text: "Added Docker, Kubernetes, and IaC modules as requested by industry panel.", date: "2026-08-25 10:15" },
      { author: "Dr. A. K. Roy", role: "Peer Reviewer", text: "Content is aligned with modern cloud standards. Recommended for approval.", date: "2026-08-27 14:30" }
    ]
  }
];

export const MOCK_VERSION_DIFF = {
  previousVersion: "v2024.1.0",
  currentVersion: "v2026.1.0",
  courseCode: "PCC-CS402",
  courseTitle: "Operating Systems & Cloud Architecture",
  changes: [
    { type: "modified", field: "Course Title", oldVal: "Operating Systems Concepts", newVal: "Operating Systems & Cloud Architecture" },
    { type: "modified", field: "Practical Hours", oldVal: "0 Hours", newVal: "2 Hours (Lab Component Added)" },
    { type: "added", field: "Module 4 Topic", value: "+ Cloud Architecture, Microservices & Containerization with Docker" },
    { type: "removed", field: "Module 4 Legacy Topic", value: "- Legacy Monolithic Server Architectures & Tape Storage Systems" },
    { type: "added", field: "Course Outcome #3", value: "+ Design containerized cloud deployment scripts using Docker and Kubernetes (Bloom's: Create - 94%)" }
  ]
};

export const MOCK_COLLEGES = [
  { id: "col-101", code: "INST-KAR-042", name: "Presidency University, Bengaluru", type: "Autonomous University", status: "Synced (v2026.1)", localElectivesCount: 4 },
  { id: "col-102", code: "INST-MAH-118", name: "College of Engineering, Pune (COEP)", type: "Affiliated Autonomous Institute", status: "Synced (v2026.1)", localElectivesCount: 3 }
];