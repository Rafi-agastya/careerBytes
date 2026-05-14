import db from '../config/db';
import { roadmapLevels, roles } from './schema';

// ─── Roles Data ───────────────────────────────────────────────────────────────

const rolesData = [
  {
    name: 'UI/UX Designer',
    description:
      'Design intuitive and engaging digital experiences by understanding user needs and translating them into effective interfaces.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: true,
  },
  {
    name: 'Frontend Developer',
    description:
      'Build responsive and interactive user interfaces using modern web technologies and frameworks.',
    careerLevel: 'Mid Career',
    estimateYears: '2-3 Years',
    isPopular: true,
  },
  {
    name: 'Backend Developer',
    description:
      'Design and implement server-side logic, databases, and APIs that power web applications.',
    careerLevel: 'Mid Career',
    estimateYears: '2-3 Years',
    isPopular: false,
  },
  {
    name: 'Full Stack Developer',
    description:
      'Build complete web applications from frontend to backend, handling all layers of the tech stack.',
    careerLevel: 'Senior',
    estimateYears: '4-5 Years',
    isPopular: false,
  },
  {
    name: 'Data Analyst',
    description:
      'Analyze complex datasets to extract meaningful insights that drive business decisions.',
    careerLevel: 'Entry Level',
    estimateYears: '1-2 Years',
    isPopular: true,
  },
  {
    name: 'Data Scientist',
    description:
      'Apply machine learning and statistical modeling to solve complex business problems with data.',
    careerLevel: 'Senior',
    estimateYears: '4-5 Years',
    isPopular: false,
  },
  {
    name: 'Product Manager',
    description:
      'Lead product development from ideation to launch by aligning user needs with business goals.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: true,
  },
  {
    name: 'DevOps Engineer',
    description:
      'Bridge development and operations by automating deployments, monitoring systems, and ensuring reliability.',
    careerLevel: 'Mid Career',
    estimateYears: '3-4 Years',
    isPopular: false,
  },
  {
    name: 'Mobile Developer',
    description:
      'Build native or cross-platform mobile applications for iOS and Android platforms.',
    careerLevel: 'Mid Career',
    estimateYears: '2-3 Years',
    isPopular: false,
  },
  {
    name: 'QA Engineer',
    description:
      'Ensure software quality through systematic testing, automation, and quality assurance processes.',
    careerLevel: 'Entry Level',
    estimateYears: '1-2 Years',
    isPopular: false,
  },
];

// ─── Roadmap Levels Data ──────────────────────────────────────────────────────

const roadmapData: Record<
  string,
  {
    level: string;
    levelLabel: string;
    description: string;
    skills: string[];
    tools: string[];
    order: number;
  }[]
> = {
  'UI/UX Designer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Building the foundation of visual communication and user empathy.',
      skills: ['User Research', 'Wireframing', 'Typography', 'Color Theory'],
      tools: ['Figma', 'Notion'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Mastering interaction patterns and shipping complex design systems.',
      skills: ['Auto Layout', 'Prototyping', 'Visual Design', 'Design System'],
      tools: ['Figma', 'Adobe XD'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Leading design vision, mentoring teams, and driving business strategy through UX.',
      skills: [
        'Leadership',
        'UX Strategy',
        'Design Operations',
        'Stakeholder Management',
      ],
      tools: ['Notion'],
      order: 3,
    },
  ],

  'Frontend Developer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description: 'Mastering the building blocks of the web.',
      skills: ['HTML/CSS', 'JavaScript Basics', 'Responsive Design', 'Git'],
      tools: ['VS Code', 'Git', 'Chrome DevTools'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Building modern, interactive web applications with frameworks.',
      skills: [
        'React',
        'TypeScript',
        'State Management',
        'REST API Integration',
      ],
      tools: ['React', 'TypeScript', 'Vite'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Optimizing performance and leading frontend architecture decisions.',
      skills: [
        'Performance Optimization',
        'Testing',
        'Next.js',
        'Web Accessibility',
      ],
      tools: ['Next.js', 'Jest', 'Webpack'],
      order: 3,
    },
  ],

  'Backend Developer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Understanding server-side fundamentals and database basics.',
      skills: ['Node.js Basics', 'REST API Design', 'SQL Fundamentals', 'Git'],
      tools: ['VS Code', 'Postman', 'PostgreSQL'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Building secure, scalable APIs and working with production databases.',
      skills: [
        'Authentication & Authorization',
        'Database Design',
        'TypeScript',
        'Error Handling',
      ],
      tools: ['Express', 'Drizzle ORM', 'Docker'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description:
        'Architecting distributed systems and ensuring high availability.',
      skills: [
        'System Design',
        'Microservices',
        'Caching',
        'Security Best Practices',
      ],
      tools: ['Redis', 'Kubernetes', 'AWS'],
      order: 3,
    },
  ],

  'Full Stack Developer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description: 'Building a foundation across the full web stack.',
      skills: ['HTML/CSS', 'JavaScript', 'Node.js Basics', 'SQL Basics'],
      tools: ['VS Code', 'Git', 'Postman'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Shipping complete features from UI to database.',
      skills: ['React', 'REST APIs', 'Database Design', 'Authentication'],
      tools: ['React', 'Express', 'PostgreSQL'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Leading end-to-end architecture and deployment pipelines.',
      skills: [
        'Next.js',
        'DevOps Basics',
        'System Design',
        'Performance Tuning',
      ],
      tools: ['Next.js', 'Docker', 'AWS'],
      order: 3,
    },
  ],

  'Data Analyst': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Learning to collect, clean, and visualize data effectively.',
      skills: ['Excel', 'SQL Basics', 'Data Cleaning', 'Basic Statistics'],
      tools: ['Excel', 'Google Sheets', 'Tableau'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description:
        'Extracting deeper insights and building impactful dashboards.',
      skills: [
        'Advanced SQL',
        'Python (Pandas)',
        'Data Visualization',
        'A/B Testing',
      ],
      tools: ['Python', 'Power BI', 'PostgreSQL'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Driving strategic decisions through advanced analytics.',
      skills: [
        'Machine Learning Basics',
        'Business Acumen',
        'Statistical Modeling',
        'Storytelling with Data',
      ],
      tools: ['Jupyter Notebook', 'Looker', 'dbt'],
      order: 3,
    },
  ],

  'Data Scientist': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Building strong foundations in math, programming, and data.',
      skills: ['Python', 'Statistics', 'Data Cleaning', 'SQL'],
      tools: ['Python', 'Jupyter Notebook', 'Pandas'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Building and evaluating machine learning models.',
      skills: [
        'Machine Learning',
        'Feature Engineering',
        'Model Evaluation',
        'Data Visualization',
      ],
      tools: ['Scikit-learn', 'Matplotlib', 'Seaborn'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Deploying models at scale and driving data strategy.',
      skills: ['Deep Learning', 'MLOps', 'NLP', 'Model Deployment'],
      tools: ['TensorFlow', 'PyTorch', 'MLflow'],
      order: 3,
    },
  ],

  'Product Manager': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Understanding product thinking and how to work with cross-functional teams.',
      skills: [
        'User Research',
        'Agile/Scrum',
        'Product Documentation',
        'Basic Data Analysis',
      ],
      tools: ['Notion', 'Jira', 'Google Analytics'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Owning product roadmaps and driving feature delivery.',
      skills: [
        'Prioritization Frameworks',
        'Stakeholder Management',
        'A/B Testing',
        'OKR Setting',
      ],
      tools: ['Figma', 'Mixpanel', 'Confluence'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Shaping product vision and leading teams at scale.',
      skills: [
        'Product Strategy',
        'Market Analysis',
        'Technical Understanding',
        'Go-to-Market',
      ],
      tools: ['Amplitude', 'Productboard', 'Tableau'],
      order: 3,
    },
  ],

  'DevOps Engineer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Learning Linux, networking, and version control essentials.',
      skills: [
        'Linux Basics',
        'Git',
        'Networking Fundamentals',
        'Scripting (Bash)',
      ],
      tools: ['Git', 'Linux', 'VS Code'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Containerizing applications and building CI/CD pipelines.',
      skills: ['Docker', 'CI/CD', 'Infrastructure as Code', 'Cloud Basics'],
      tools: ['Docker', 'GitHub Actions', 'Terraform'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Orchestrating at scale and ensuring system reliability.',
      skills: [
        'Kubernetes',
        'Monitoring & Alerting',
        'Security (DevSecOps)',
        'Multi-cloud',
      ],
      tools: ['Kubernetes', 'Prometheus', 'AWS'],
      order: 3,
    },
  ],

  'Mobile Developer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description: 'Getting started with mobile development fundamentals.',
      skills: [
        'Dart/Kotlin/Swift Basics',
        'UI Components',
        'Navigation',
        'State Basics',
      ],
      tools: ['VS Code', 'Android Studio', 'Xcode'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Building real-world apps with APIs and local storage.',
      skills: [
        'REST API Integration',
        'State Management',
        'Local Storage',
        'Push Notifications',
      ],
      tools: ['Flutter', 'Firebase', 'Postman'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Publishing production apps and optimizing performance.',
      skills: [
        'Performance Optimization',
        'App Store Deployment',
        'Testing',
        'Native Modules',
      ],
      tools: ['Google Play Console', 'App Store Connect', 'Fastlane'],
      order: 3,
    },
  ],

  'QA Engineer': [
    {
      level: 'beginner',
      levelLabel: 'Beginner Level',
      description:
        'Understanding software testing fundamentals and manual testing.',
      skills: [
        'Manual Testing',
        'Test Case Writing',
        'Bug Reporting',
        'SDLC Basics',
      ],
      tools: ['Jira', 'TestRail', 'Postman'],
      order: 1,
    },
    {
      level: 'intermediate',
      levelLabel: 'Intermediate Level',
      description: 'Automating tests and integrating QA into CI/CD pipelines.',
      skills: [
        'Test Automation',
        'API Testing',
        'Performance Testing',
        'Regression Testing',
      ],
      tools: ['Selenium', 'Cypress', 'Postman'],
      order: 2,
    },
    {
      level: 'advanced',
      levelLabel: 'Advanced Level',
      description: 'Leading QA strategy and ensuring quality at scale.',
      skills: [
        'QA Strategy',
        'Security Testing',
        'Test Architecture',
        'Mentoring',
      ],
      tools: ['k6', 'SonarQube', 'GitHub Actions'],
      order: 3,
    },
  ],
};

// ─── Seed Function ────────────────────────────────────────────────────────────

const seed = async () => {
  console.log('Seeding roles...');

  await db.insert(roles).values(rolesData).onConflictDoNothing();

  const existingRoles = await db.select().from(roles);
  const roleMap = existingRoles.reduce(
    (acc, role) => {
      acc[role.name] = role.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  console.log(`${existingRoles.length} roles tersedia!`);

  console.log('Seeding roadmap levels...');

  const levelsToInsert = Object.entries(roadmapData).flatMap(
    ([roleName, levels]) =>
      levels.map((level) => ({
        roleId: roleMap[roleName],
        ...level,
      })),
  );

  await db.insert(roadmapLevels).values(levelsToInsert).onConflictDoNothing();

  console.log(`${levelsToInsert.length} roadmap levels berhasil di-seed!`);
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed gagal:', err);
  process.exit(1);
});
