export const MOCK_COURSES = [
  {
    id: 'course-cse301',
    code: 'CSE301',
    title: 'Machine Learning',
    semester: 6,
    credits: 4,
    category: 'Core',
    type: 'Theory + Practical',
    description: 'Fundamentals of supervised, unsupervised, and reinforcement learning, model evaluation, and deployment.',
    modules: [
      { id: 'm1', title: 'Module 1: Introduction to Machine Learning', description: 'Supervised vs Unsupervised Learning, Feature Vectors, Data Preprocessing.' },
      { id: 'm2', title: 'Module 2: Regression & Linear Models', description: 'Linear Regression, Gradient Descent, Logistic Regression, Regularization.' },
      { id: 'm3', title: 'Module 3: Classification & Decision Trees', description: 'Decision Trees, Random Forests, Support Vector Machines (SVM), Naive Bayes.' },
      { id: 'm4', title: 'Module 4: Clustering & Unsupervised Learning', description: 'K-Means, Hierarchical Clustering, Principal Component Analysis (PCA).' },
      { id: 'm5', title: 'Module 5: Model Evaluation & Validation', description: 'Cross-Validation, Precision/Recall, ROC-AUC Curve, Hyperparameter Tuning.' }
    ],
    outcomes: [
      { id: 'co1', code: 'CO1', text: 'Understand machine learning fundamentals and mathematical principles.' },
      { id: 'co2', code: 'CO2', text: 'Implement classification and regression models on real-world datasets.' },
      { id: 'co3', code: 'CO3', text: 'Evaluate machine learning models using statistical metrics and validation techniques.' }
    ],
    skills: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis', 'Scikit-Learn']
  },
  {
    id: 'course-cse602',
    code: 'CSE602',
    title: 'Cloud Computing & Microservices',
    semester: 6,
    credits: 3,
    category: 'Core',
    type: 'Theory',
    description: 'Cloud architecture principles, virtualization, containerization with Docker, Kubernetes, and serverless computing.',
    modules: [
      { id: 'm1', title: 'Module 1: Cloud Service Models', description: 'IaaS, PaaS, SaaS, Public/Private Cloud Architectures.' },
      { id: 'm2', title: 'Module 2: Containerization', description: 'Docker Engine, Images, Containers, Multi-Stage Builds.' },
      { id: 'm3', title: 'Module 3: Microservices Design', description: 'Monolith vs Microservices, REST APIs, Service Mesh.' },
      { id: 'm4', title: 'Module 4: Orchestration & DevOps', description: 'Kubernetes Pods, Services, Deployments, CI/CD Integration.' }
    ],
    outcomes: [
      { id: 'co1', code: 'CO1', text: 'Explain cloud computing architectures and virtualization layers.' },
      { id: 'co2', code: 'CO2', text: 'Containerize monolithic applications using Docker and Kubernetes.' }
    ],
    skills: ['Cloud Computing', 'Docker', 'Kubernetes', 'Microservices', 'DevOps']
  },
  {
    id: 'course-cse603',
    code: 'CSE603',
    title: 'Web Technologies & Frameworks',
    semester: 6,
    credits: 4,
    category: 'Core',
    type: 'Theory + Practical',
    description: 'Modern full-stack web application design, React single-page applications, Node.js backend services, and RESTful APIs.',
    modules: [
      { id: 'm1', title: 'Module 1: Modern HTML5 & Responsive CSS', description: 'Flexbox, Grid, Tailwind CSS, Responsive Design.' },
      { id: 'm2', title: 'Module 2: JavaScript ES6+ & Async Programming', description: 'Promises, Async/Await, ES Modules, DOM Manipulation.' },
      { id: 'm3', title: 'Module 3: React Single-Page Applications', description: 'Components, Props, State, Hooks, Routing.' },
      { id: 'm4', title: 'Module 4: Node.js & Express REST APIs', description: 'Express Server, Middleware, JWT Authentication, Database Connection.' }
    ],
    outcomes: [
      { id: 'co1', code: 'CO1', text: 'Construct responsive user interfaces using React and modern CSS.' },
      { id: 'co2', code: 'CO2', text: 'Develop secure RESTful API backends with Node.js and Express.' }
    ],
    skills: ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS']
  },
  {
    id: 'course-cse401',
    code: 'CSE401',
    title: 'Data Structures & Algorithms',
    semester: 4,
    credits: 4,
    category: 'Core',
    type: 'Theory + Practical',
    description: 'Linear and non-linear data structures, searching and sorting techniques, dynamic programming, and asymptotic complexity.',
    modules: [
      { id: 'm1', title: 'Module 1: Linear Data Structures', description: 'Arrays, Stacks, Queues, Linked Lists.' },
      { id: 'm2', title: 'Module 2: Trees & Binary Search Trees', description: 'Traversals, BST Operations, AVL Trees, Heap.' },
      { id: 'm3', title: 'Module 3: Graph Algorithms', description: 'BFS, DFS, Shortest Path (Dijkstra), MST (Kruskal, Prim).' },
      { id: 'm4', title: 'Module 4: Algorithm Analysis & Complexity', description: 'Big-O Notation, Recurrence Relations, Sorting.' }
    ],
    outcomes: [
      { id: 'co1', code: 'CO1', text: 'Analyze space and time complexity of algorithmic solutions.' },
      { id: 'co2', code: 'CO2', text: 'Select and implement optimal data structures for complex computing tasks.' }
    ],
    skills: ['Algorithms', 'Data Structures', 'C++', 'Java', 'Problem Solving']
  }
];
