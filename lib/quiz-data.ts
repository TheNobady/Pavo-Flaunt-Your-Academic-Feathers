// Career Discovery Quiz Data
// Based on class and stream selection, different question sets are used

export interface Question {
  id: number
  question: string
  options: string[]
}

export interface QuizSet {
  title: string
  description: string
  questions: Question[]
}

// For 10th and below - Stream Selection Quiz
export const streamSelectionQuiz: QuizSet = {
  title: "Identifying a Path in Science, Commerce, or Arts",
  description: "This quiz will help identify which stream suits you best for 11th and 12th grade.",
  questions: [
    {
      id: 1,
      question: "When you encounter a complex problem, what is your first instinct?",
      options: [
        "Break it down into smaller, logical steps to find a definitive, evidence-based answer.",
        "Analyze the systems and resources involved to find the most efficient and practical solution.",
        "Explore the different perspectives and human factors behind the problem.",
        "Experiment with a hands-on approach to see what works in the real world.",
      ],
    },
    {
      id: 2,
      question: "Which type of school project do you enjoy the most?",
      options: [
        "A science experiment where you have to follow a procedure, collect data, and report the findings.",
        "A project where you have to create a business plan or manage a budget for a school event.",
        "A debate, essay, or creative project where you can express your ideas and opinions.",
        "Building a model or a working prototype for a science fair.",
      ],
    },
    {
      id: 3,
      question: "Which section of a newspaper or news website are you most likely to read first?",
      options: [
        "Science and Technology, with articles on new discoveries and innovations.",
        "Business and Economy, with updates on the stock market and companies.",
        "Culture, History, or Opinion editorials about social issues.",
        "I don't read the news much, but I'm interested in how things are made and how they work.",
      ],
    },
    {
      id: 4,
      question: "If you had to learn a new skill, which of these would be most appealing?",
      options: [
        "Learning a programming language to build an app or a website.",
        "Learning about investing in the stock market.",
        "Learning a new foreign language.",
        "Learning how to repair a bicycle or an electronic gadget.",
      ],
    },
    {
      id: 5,
      question: "When working in a group, what role do you naturally take on?",
      options: [
        "The analyst, who focuses on the facts and data to make sure the project is accurate.",
        "The manager, who organizes the tasks, sets deadlines, and keeps the team on track.",
        "The communicator, who presents the ideas and ensures everyone's viewpoint is heard.",
        "The builder, who likes to be hands-on and involved in the practical creation of the project.",
      ],
    },
    {
      id: 6,
      question: "Which subject do you find most interesting, even if it's challenging?",
      options: [
        "Mathematics or Physics, because of the clear rules and logical solutions.",
        "Economics or Business Studies, because they explain how the world of money and trade works.",
        "History or English Literature, because they tell stories about people and societies.",
        "Biology or Chemistry, because they explain the processes of life and matter.",
      ],
    },
    {
      id: 7,
      question: "How do you prefer to learn new information?",
      options: [
        "Through structured lessons, textbooks, and logical explanations.",
        "Through case studies that show how theories are applied in real-world business scenarios.",
        "Through discussions, stories, and exploring different interpretations.",
        "Through practical demonstrations and hands-on activities.",
      ],
    },
    {
      id: 8,
      question: "What kind of impact do you want to make in your future career?",
      options: [
        "Discovering something new or inventing a technology that solves a major problem.",
        "Building a successful company or managing large-scale financial systems.",
        "Helping people understand each other better or improving society through policy and communication.",
        "Creating tangible things or improving the physical world around me.",
      ],
    },
    {
      id: 9,
      question: "When you think about the future, which of these questions seems most interesting to explore?",
      options: [
        "How does the universe work?",
        "How can we create and manage wealth effectively?",
        "What does it mean to be human?",
        "How can we build better, more efficient things?",
      ],
    },
    {
      id: 10,
      question: "You are given a large, unorganized dataset. What would you do first?",
      options: [
        "Look for patterns, anomalies, and logical connections within the data.",
        "Sort and categorize the data into a structured system (like a spreadsheet) for easy analysis.",
        "Try to understand the story behind the data—who it represents and what it says about their behavior.",
        "I would be less interested in the data itself and more in what practical application it could be used for.",
      ],
    },
  ],
}

// Medical Stream Quiz (PCB)
export const medicalStreamQuiz: QuizSet = {
  title: "Navigating the Medical Science Stream (PCB)",
  description: "Discover your ideal career path in the medical field.",
  questions: [
    {
      id: 1,
      question:
        "A patient arrives at the hospital with a rare and complex set of symptoms. What aspect of their care would you find most engaging?",
      options: [
        "Leading the diagnostic process: analyzing test results, consulting with specialists, and determining the underlying illness.",
        "Providing direct patient care: monitoring vital signs, administering treatments, and offering emotional support to the patient and their family.",
        "Ensuring the precise formulation and dispensing of the specialized medications required for treatment.",
        "Analyzing the patient's blood and tissue samples in the lab to provide the data needed for diagnosis.",
      ],
    },
    {
      id: 2,
      question: "Your ideal work environment in a hospital would be:",
      options: [
        "In the consultation room or operating theatre, making critical decisions.",
        "On the hospital ward, interacting directly with patients throughout their recovery.",
        "In the pharmacy, managing inventory and ensuring the accuracy of prescriptions.",
        "In the rehabilitation center, working one-on-one with patients to restore their physical function.",
      ],
    },
    {
      id: 3,
      question: "What kind of problem-solving do you enjoy most?",
      options: [
        "A diagnostic mystery that requires deep medical knowledge and logical deduction.",
        "A logistical challenge, like managing the care plan for multiple patients with different needs.",
        "A procedural challenge that requires meticulous attention to detail and zero error, like compounding a drug.",
        "A functional challenge, like designing an exercise regimen to help someone walk again.",
      ],
    },
    {
      id: 4,
      question: "When a new medical treatment is introduced, what are you most curious about?",
      options: [
        "The clinical trial data and the biological mechanism by which it works.",
        "The protocol for administering it to patients and managing potential side effects.",
        "Its chemical composition, stability, and interactions with other drugs.",
        "Its impact on a patient's long-term mobility and quality of life.",
      ],
    },
    {
      id: 5,
      question: "Which of these tasks would give you the greatest sense of accomplishment?",
      options: [
        "Correctly diagnosing a disease that other specialists had missed.",
        "Helping a critically ill patient through a difficult recovery with compassionate care.",
        "Preventing a harmful drug interaction by catching a prescription error.",
        "Helping an athlete recover from a major injury and return to their sport.",
      ],
    },
    {
      id: 6,
      question: "How do you prefer to use technology in a healthcare setting?",
      options: [
        "Using advanced imaging and diagnostic tools to identify illnesses.",
        "Using electronic health records and patient monitoring systems to track progress.",
        "Using automated dispensing systems and software to manage pharmaceuticals.",
        "Using biofeedback and motion-analysis equipment to guide physical therapy.",
      ],
    },
    {
      id: 7,
      question: "In a high-pressure emergency situation, where would you be most effective?",
      options: [
        "Taking charge of the medical team and making split-second treatment decisions.",
        "Calmly executing medical procedures and stabilizing the patient.",
        "Quickly and accurately preparing the necessary emergency medications.",
        "Later, in the post-emergency phase, planning and implementing the patient's rehabilitation.",
      ],
    },
    {
      id: 8,
      question: 'What does "patient care" primarily mean to you?',
      options: [
        "Applying the best medical science to achieve a cure.",
        "Providing holistic support—physical, emotional, and psychological—during illness.",
        "Ensuring the patient receives safe and effective medication.",
        "Empowering the patient to regain their physical independence.",
      ],
    },
    {
      id: 9,
      question: "When you read about a medical breakthrough, what is your first thought?",
      options: [
        "I want to understand the science behind this and how I can apply it.",
        "I wonder how this will change the way we care for patients day-to-day.",
        "I need to know the pharmaceutical details: dosage, formulation, and manufacturing.",
        "I'm curious about how this could be integrated into rehabilitation programs.",
      ],
    },
    {
      id: 10,
      question: "Which skill is most critical for a healthcare professional?",
      options: [
        "Analytical and diagnostic reasoning.",
        "Empathy and resilience.",
        "Precision and attention to detail.",
        "Patience and motivational ability.",
      ],
    },
  ],
}

// Non-Medical Science Stream Quiz (PCM)
export const nonMedicalStreamQuiz: QuizSet = {
  title: "Charting a Course in the Non-Medical Science Stream (PCM)",
  description: "Find your path in engineering, research, architecture, or IT.",
  questions: [
    {
      id: 1,
      question:
        "Your team is tasked with developing a solution for urban traffic congestion. What is your preferred role?",
      options: [
        "Designing and building the physical infrastructure, like a new flyover or smart traffic light system.",
        "Researching and modeling traffic flow data to discover a new, more efficient routing algorithm.",
        "Designing the overall urban space, focusing on aesthetics, human flow, and integration with the cityscape.",
        "Developing the software and mobile app that drivers will use to navigate the new system.",
      ],
    },
    {
      id: 2,
      question: 'What kind of "building" excites you more?',
      options: [
        "Building a functional and robust machine, like an engine or a robot.",
        "Building a body of knowledge through experiments and theoretical work.",
        "Building a beautiful and habitable space, like a house or a public park.",
        "Building a complex and elegant piece of software from lines of code.",
      ],
    },
    {
      id: 3,
      question: "When faced with a technical challenge, your approach is to:",
      options: [
        "Apply established engineering principles to create a reliable and scalable solution.",
        "Formulate a hypothesis and design an experiment to test it, seeking a fundamental understanding.",
        "Sketch out multiple visual concepts, focusing on form, function, and user experience.",
        "Write code to create a prototype, debug it, and iterate until it works perfectly.",
      ],
    },
    {
      id: 4,
      question: "Which of these projects sounds most appealing?",
      options: [
        "Managing the construction of a large-scale project, like a dam or a power plant.",
        "Working in a lab to discover a new material with unique properties.",
        "Designing a sustainable, eco-friendly building that wins a design award.",
        "Creating a new open-source software library that will be used by thousands of developers.",
      ],
    },
    {
      id: 5,
      question: "What is your primary motivation?",
      options: [
        "To solve practical problems and make systems work more efficiently.",
        "To push the boundaries of human knowledge and discover new truths.",
        "To create spaces and objects that are both functional and aesthetically pleasing.",
        "To use logic and code to create powerful digital tools.",
      ],
    },
    {
      id: 6,
      question: "Which tool are you most comfortable using?",
      options: [
        "CAD software, simulators, and physical tools.",
        "Laboratory equipment, statistical software, and academic journals.",
        "Sketchbooks, 3D modeling software, and architectural drawings.",
        "A code editor, a compiler, and version control systems like Git.",
      ],
    },
    {
      id: 7,
      question: 'How do you define a "successful" project?',
      options: [
        "It's built on time, within budget, and performs its function flawlessly for years.",
        "It results in a published paper that contributes a novel finding to the scientific community.",
        "It's celebrated for its innovative design and positive impact on the people who use it.",
        "It has clean, efficient code, is easy to maintain, and provides a seamless user experience.",
      ],
    },
    {
      id: 8,
      question: "When learning a new technical concept, you prefer to:",
      options: [
        "Understand how it can be applied to solve a real-world engineering problem.",
        "Understand the underlying theory and mathematical proofs behind it.",
        "Understand how it influences design principles and aesthetics.",
        "Understand how to implement it in a programming language.",
      ],
    },
    {
      id: 9,
      question: "What is your ideal work environment?",
      options: [
        "A project site, a factory floor, or a design office focused on large-scale systems.",
        "A university or corporate research lab.",
        "An architectural studio or design firm.",
        "A tech company, working collaboratively on a software product.",
      ],
    },
    {
      id: 10,
      question: "Which of these individuals do you admire most?",
      options: [
        "An engineer who designed a revolutionary piece of infrastructure.",
        "A scientist who won a Nobel Prize for a fundamental discovery.",
        "An architect whose buildings changed the skyline of a city.",
        "A programmer who created an operating system used by millions.",
      ],
    },
  ],
}

// Commerce Stream Quiz
export const commerceStreamQuiz: QuizSet = {
  title: "Exploring the Commerce Stream",
  description: "Discover your ideal career in business, finance, and commerce.",
  questions: [
    {
      id: 1,
      question:
        "A company is considering acquiring a smaller competitor. What is the most critical task in your opinion?",
      options: [
        "Conducting a thorough audit of the target company's financial statements to ensure their accuracy and identify any hidden liabilities.",
        "Creating a financial model to forecast the future earnings of the combined entity and determine if the acquisition price is fair.",
        "Developing the post-acquisition integration strategy, managing the teams, and ensuring a smooth transition.",
        "Ensuring the entire acquisition process complies with corporate law and all regulatory filings are handled correctly.",
      ],
    },
    {
      id: 2,
      question: "When you look at a company's annual report, what are you most interested in?",
      options: [
        "The balance sheet and cash flow statement, verifying the numbers and checking for compliance with accounting standards.",
        "The market trends, growth projections, and management's discussion, trying to predict the company's future performance.",
        "The overall business strategy, operational efficiency, and competitive positioning.",
        "The corporate governance report and details on board meetings, ensuring the company is run ethically and legally.",
      ],
    },
    {
      id: 3,
      question: "Which of these activities sounds most rewarding?",
      options: [
        "Finding a critical error in a financial record that saves a company from a major penalty.",
        "Recommending an undervalued stock that generates a significant return for investors.",
        "Leading a team to successfully launch a new product that captures a large market share.",
        "Guiding a company through a complex legal issue, ensuring its long-term stability.",
      ],
    },
    {
      id: 4,
      question: "Your ideal role in a company involves:",
      options: [
        "Ensuring financial integrity and adherence to rules.",
        "Analyzing data to guide future investment and strategy.",
        "Leading people and projects to achieve business goals.",
        "Upholding the legal and ethical framework of the organization.",
      ],
    },
    {
      id: 5,
      question: "What kind of risk are you most comfortable with?",
      options: [
        "I am risk-averse; my job is to identify and mitigate financial and compliance risks.",
        "Calculated market risk, based on thorough analysis and modeling.",
        "Strategic risk, such as entering a new market or launching a new product line.",
        "Legal and regulatory risk; my role is to navigate it successfully.",
      ],
    },
    {
      id: 6,
      question: 'How do you define "value" in a business context?',
      options: [
        "Accurate, transparent, and compliant financial reporting.",
        "Growth in shareholder value and return on investment.",
        "Market leadership, brand strength, and employee satisfaction.",
        "Strong corporate governance and a solid legal foundation.",
      ],
    },
    {
      id: 7,
      question: "Which skill do you believe is most important for business success?",
      options: [
        "Meticulous attention to detail and a systematic approach.",
        "Strong analytical and quantitative skills.",
        "Leadership and strategic thinking.",
        "Deep knowledge of corporate law and regulations.",
      ],
    },
    {
      id: 8,
      question: "A new government regulation impacting your industry is announced. What is your first action?",
      options: [
        "Assess how the new rule will affect the company's accounting and tax reporting procedures.",
        "Analyze the financial impact of the regulation on the company's profitability and stock price.",
        "Strategize how the business can adapt its operations to turn the regulation into a competitive advantage.",
        "Read the full text of the law to understand its legal implications and advise the board on compliance.",
      ],
    },
    {
      id: 9,
      question: "What kind of professional would you seek advice from when starting a business?",
      options: [
        "A CA to set up the accounting systems and ensure tax compliance.",
        "A financial analyst to evaluate the business plan and secure funding.",
        "A seasoned manager or entrepreneur to advise on strategy and operations.",
        "A company secretary or lawyer to handle the legal structure and incorporation.",
      ],
    },
    {
      id: 10,
      question: "Your work is most successful when it:",
      options: [
        "Passes a rigorous audit with no issues.",
        "Accurately predicts a market movement.",
        "Leads to measurable business growth.",
        "Protects the company from legal trouble.",
      ],
    },
  ],
}

// Arts/Humanities Stream Quiz
export const artsStreamQuiz: QuizSet = {
  title: "Defining a Vocation in the Arts & Humanities Stream",
  description: "Find your calling in civil service, media, design, psychology, or law.",
  questions: [
    {
      id: 1,
      question: "A major social issue, like water scarcity, is affecting a region. How would you want to contribute?",
      options: [
        "By working within the government to formulate and implement a large-scale policy to address the problem.",
        "By investigating the issue on the ground, interviewing affected people, and publishing a detailed report to raise public awareness.",
        "By creating a powerful visual campaign (infographics, a short film) to explain the issue and motivate people to act.",
        "By studying the psychological impact of the crisis on the community and providing counseling and support.",
      ],
    },
    {
      id: 2,
      question: "What is the most powerful tool for creating change in society?",
      options: [
        "Effective governance and public policy.",
        "A well-informed public, driven by objective journalism.",
        "Compelling communication and creative expression that connects with people emotionally.",
        "An understanding of human behavior and mental well-being.",
      ],
    },
    {
      id: 3,
      question: "When you are presented with a complex human story, what is your first instinct?",
      options: [
        "To analyze its broader implications for policy and social structures.",
        "To find the core facts, verify them, and structure them into a clear narrative for others to understand.",
        "To think about how to best represent this story visually or interactively.",
        "To understand the motivations and emotional state of the people involved.",
      ],
    },
    {
      id: 4,
      question: "Your ideal work involves:",
      options: [
        "Administering systems and services for the public good.",
        "Seeking out truth and communicating it effectively.",
        "Creating visually engaging and user-friendly experiences.",
        "Helping individuals navigate their personal challenges and improve their mental health.",
      ],
    },
    {
      id: 5,
      question: "Which of these tasks would you find most fulfilling?",
      options: [
        "Successfully implementing a government scheme that benefits thousands of people.",
        "Breaking a major news story that exposes corruption and leads to reform.",
        "Designing an app interface that is both beautiful and incredibly easy for people to use.",
        "Helping a client overcome a long-standing personal fear or anxiety.",
      ],
    },
    {
      id: 6,
      question: "How do you prefer to argue a point?",
      options: [
        "By citing policy documents, historical precedent, and administrative rules.",
        "By presenting verified facts, eyewitness accounts, and data in a logical sequence.",
        "I prefer not to argue, but to persuade through visual storytelling and empathetic design.",
        "By understanding the other person's perspective and using principles of psychology to build rapport and find common ground.",
      ],
    },
    {
      id: 7,
      question: "What kind of reading material do you prefer?",
      options: [
        "Government reports, policy analyses, and history books.",
        "Newspapers, investigative journalism, and non-fiction reportage.",
        "Design magazines, art books, and tech blogs about user experience.",
        "Books on psychology, human behavior, and self-improvement.",
      ],
    },
    {
      id: 8,
      question: "A conflict arises between two parties. Your natural role is to be the:",
      options: [
        "Administrator, who ensures the resolution process follows the established rules.",
        "Reporter, who documents the perspectives of both sides without taking a stance.",
        "Mediator, who tries to understand the emotional needs of both parties to find a resolution.",
        "Advocate, who systematically builds a case for one party based on evidence and legal principles.",
      ],
    },
    {
      id: 9,
      question: 'What does "truth" mean to you in a professional context?',
      options: [
        "The most effective and equitable policy based on available data.",
        "An objective fact that has been rigorously verified.",
        "An authentic emotional experience conveyed through design or art.",
        "A deep understanding of an individual's subjective experience.",
      ],
    },
    {
      id: 10,
      question: "Your work is most successful when it:",
      options: [
        "Improves the functioning of a public system.",
        "Informs and empowers the public.",
        "Makes a complex idea simple and engaging for users.",
        "Leads to a positive change in an individual's life.",
      ],
    },
  ],
}

// Career results mapping
export const careerResults = {
  streamSelection: {
    science: "Science Stream",
    commerce: "Commerce Stream",
    arts: "Arts/Humanities Stream",
  },
  medical: {
    doctor: "Medical Doctor (MBBS)",
    nurse: "Nurse (B.Sc. Nursing)",
    pharmacist: "Pharmacist (B.Pharm)",
    physiotherapist: "Physiotherapist (BPT)",
  },
  nonMedical: {
    engineer: "Engineer (B.Tech)",
    scientist: "Scientist/Researcher (B.Sc./M.Sc.)",
    architect: "Architect (B.Arch)",
    itProfessional: "IT Professional/Developer (BCA/B.Sc. IT)",
  },
  commerce: {
    ca: "Chartered Accountant (CA)",
    financialAnalyst: "Financial Analyst",
    businessManager: "Business Manager (BBA/MBA)",
    companySecretary: "Company Secretary (CS)/Corporate Lawyer (B.Com LLB)",
  },
  arts: {
    civilServant: "Civil Servant (IAS/IPS)",
    journalist: "Journalist/Media Professional",
    designer: "Graphic/UX Designer",
    psychologist: "Psychologist/Counselor",
    lawyer: "Lawyer (BA LLB)",
  },
}

export function getQuizForClassAndStream(userClass: string, stream?: string): QuizSet {
  // For 10th and below, use stream selection quiz
  if (userClass === "class-8" || userClass === "class-9" || userClass === "class-10") {
    return streamSelectionQuiz
  }

  // For 11th and 12th, use stream-specific quizzes
  switch (stream) {
    case "medical":
      return medicalStreamQuiz
    case "non-medical":
      return nonMedicalStreamQuiz
    case "commerce":
      return commerceStreamQuiz
    case "arts":
      return artsStreamQuiz
    default:
      return streamSelectionQuiz
  }
}
