
//server\scripts\quizData.js
const quizData = [
  // =====================================================
  // 🔹 DIGITAL DESIGN AND COMPUTER ORGANIZATION (DDCO)
  // =====================================================
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 1 and 2",
    question: "Which logic gate outputs HIGH only when all inputs are HIGH?",
    options: ["OR gate", "AND gate", "XOR gate", "NOR gate"],
    correctAnswer: "AND gate",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 1 and 2",
    question: "The binary equivalent of decimal 13 is:",
    options: ["1101", "1011", "1110", "1001"],
    correctAnswer: "1101",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 1 and 2",
    question: "A combinational circuit that performs addition of binary numbers is called a half adder.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 1 and 2",
    question: "In a full adder, how many inputs and outputs are there?",
    options: ["2 inputs, 1 output", "3 inputs, 2 outputs", "2 inputs, 2 outputs", "3 inputs, 1 output"],
    correctAnswer: "3 inputs, 2 outputs",
    type: "MCQ",
    difficulty: "Medium"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 1 and 2",
    question: "Flip-flops are used to store 1-bit of information.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Hard"
  },

  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 3 and 4",
    question: "Which addressing mode uses the content of a register to determine the operand address?",
    options: ["Immediate", "Direct", "Register indirect", "Indexed"],
    correctAnswer: "Register indirect",
    type: "MCQ",
    difficulty: "Medium"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 3 and 4",
    question: "The control unit of a computer is responsible for performing arithmetic operations.",
    options: ["True", "False"],
    correctAnswer: "False",
    type: "True/False",
    difficulty: "Easy"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 3 and 4",
    question: "Microprogrammed control uses a set of microinstructions stored in memory.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 3 and 4",
    question: "The instruction cycle consists of which two major phases?",
    options: ["Execution and Decode", "Fetch and Execute", "Load and Store", "Decode and Fetch"],
    correctAnswer: "Fetch and Execute",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Digital Design and Computer Organization",
    unit: "Unit 3 and 4",
    question: "Pipelining improves CPU performance by overlapping instruction execution.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Hard"
  },

  // =====================================================
  // 🔹 WEB TECHNOLOGIES
  // =====================================================
  {
    subject: "Web Technologies",
    unit: "Unit 1 and 2",
    question: "HTML stands for?",
    options: [
      "HyperText Markup Language",
      "HyperTransfer Markup Language",
      "HighText Machine Language",
      "HyperText Machine Link"
    ],
    correctAnswer: "HyperText Markup Language",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 1 and 2",
    question: "CSS is used to style the content of a webpage.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Easy"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 1 and 2",
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<p>"],
    correctAnswer: "<a>",
    type: "MCQ",
    difficulty: "Hard"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 1 and 2",
    question: "JavaScript can be used to change HTML content dynamically.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 1 and 2",
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Flask", "React", "Laravel"],
    correctAnswer: "React",
    type: "MCQ",
    difficulty: "Medium"
  },

  {
    subject: "Web Technologies",
    unit: "Unit 3 and 4",
    question: "The HTTP status code 404 indicates?",
    options: ["Server Error", "Page Not Found", "OK", "Redirect"],
    correctAnswer: "Page Not Found",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 3 and 4",
    question: "AJAX allows asynchronous communication with a web server.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 3 and 4",
    question: "Which database is commonly used with Node.js for web apps?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    correctAnswer: "MongoDB",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 3 and 4",
    question: "In REST APIs, POST method is used to update existing data.",
    options: ["True", "False"],
    correctAnswer: "False",
    type: "True/False",
    difficulty: "Hard"
  },
  {
    subject: "Web Technologies",
    unit: "Unit 3 and 4",
    question: "Express.js is used for?",
    options: ["Frontend styling", "Database design", "Server-side routing", "DOM manipulation"],
    correctAnswer: "Server-side routing",
    type: "MCQ",
    difficulty: "Medium"
  },

  // =====================================================
  // 🔹 AUTOMATA THEORY AND FORMAL LANGUAGES (AFLL)
  // =====================================================
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 1 and 2",
    question: "A finite automaton can recognize regular languages only.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Easy"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 1 and 2",
    question: "Which of the following is not a type of automata?",
    options: ["Finite automata", "Pushdown automata", "Turing machine", "Combinational automata"],
    correctAnswer: "Combinational automata",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 1 and 2",
    question: "The language accepted by DFA is always regular.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 1 and 2",
    question: "Which automata model uses a stack as memory?",
    options: ["Finite automata", "Pushdown automata", "Turing machine", "Mealy machine"],
    correctAnswer: "Pushdown automata",
    type: "MCQ",
    difficulty: "Medium"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 1 and 2",
    question: "A context-free grammar can be represented as a 4-tuple.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Hard"
  },

  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 3 and 4",
    question: "Turing Machines can simulate any computational process.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 3 and 4",
    question: "Which of the following is more powerful than a Pushdown Automata?",
    options: ["Finite automata", "Turing machine", "DFA", "NFA"],
    correctAnswer: "Turing machine",
    type: "MCQ",
    difficulty: "Medium"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 3 and 4",
    question: "The Halting problem is decidable.",
    options: ["True", "False"],
    correctAnswer: "False",
    type: "True/False",
    difficulty: "Hard"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 3 and 4",
    question: "The Chomsky hierarchy has how many levels?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "4",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Automata Formal Languages and Logic",
    unit: "Unit 3 and 4",
    question: "Regular expressions can describe all context-free languages.",
    options: ["True", "False"],
    correctAnswer: "False",
    type: "True/False",
    difficulty: "Easy"
  },

  // =====================================================
  // 🔹 DATA STRUCTURES AND ALGORITHMS (DSA)
  // =====================================================
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 1 and 2",
    question: "Which data structure uses LIFO order?",
    options: ["Queue", "Stack", "Linked list", "Tree"],
    correctAnswer: "Stack",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 1 and 2",
    question: "A queue follows FIFO order.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Easy"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 1 and 2",
    question: "Which sorting algorithm has O(n²) complexity in the worst case?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
    correctAnswer: "Bubble Sort",
    type: "MCQ",
    difficulty: "Hard"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 1 and 2",
    question: "Binary search works only on unsorted arrays.",
    options: ["True", "False"],
    correctAnswer: "False",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 1 and 2",
    question: "Which data structure is best suited for implementing recursion?",
    options: ["Array", "Stack", "Queue", "Tree"],
    correctAnswer: "Stack",
    type: "MCQ",
    difficulty: "Medium"
  },

  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 3 and 4",
    question: "A binary tree in which every node has 0 or 2 children is called a full binary tree.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Medium"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 3 and 4",
    question: "Which traversal method visits the left subtree, root, then right subtree?",
    options: ["Preorder", "Postorder", "Inorder", "Level order"],
    correctAnswer: "Inorder",
    type: "MCQ",
    difficulty: "Easy"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 3 and 4",
    question: "Graphs with no cycles are called trees.",
    options: ["True", "False"],
    correctAnswer: "True",
    type: "True/False",
    difficulty: "Easy"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 3 and 4",
    question: "Which algorithm is used for finding the shortest path in a weighted graph?",
    options: ["Kruskal’s", "Prim’s", "Dijkstra’s", "Floyd–Warshall"],
    correctAnswer: "Dijkstra’s",
    type: "MCQ",
    difficulty: "Medium"
  },
  {
    subject: "Data Structures and Algorithms",
    unit: "Unit 3 and 4",
    question: "In a max heap, the smallest element is always at the root.",
    options: ["True", "False"],
    correctAnswer: "False",
    type: "True/False",
    difficulty: "Hard"
  }
];

module.exports = quizData;

