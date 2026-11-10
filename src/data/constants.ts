// order = keycap layout, 6 per row (18 skills = 3 rows of 6)
export enum SkillNames {
  PYTHON = "python",
  JAVA = "java",
  C = "c",
  CPP = "cpp",
  JAVASCRIPT = "javascript",
  REACT = "react",
  NODEJS = "nodejs",
  EXPRESS = "express",
  REST_APIS = "restapis",
  TAILWIND = "tailwind",
  MONGODB = "mongodb",
  MYSQL = "mysql",
  SUPABASE = "supabase",
  JWT = "jwt",
  MACHINE_LEARNING = "machinelearning",
  GIT_GITHUB = "gitgithub",
  VERCEL = "vercel",
  RENDER = "render",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  /** Optional local artwork for the 3D key; falls back to icon. */
  keyboardIcon?: string;
  /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
  keyboardColor?: string;
  /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
  shortcut?: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "Clean syntax, ML models, and high-performance automation 🐍⚡",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    keyboardIcon: "/assets/logos/python-mono.svg",
    keyboardColor: "#3776AB",
  },
  [SkillNames.JAVA]: {
    id: 2,
    name: "java",
    label: "Java",
    shortDescription: "Robust OOP, typed structures, and enterprise backbone ☕🏗️",
    color: "#EA2D2E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    keyboardColor: "#EA2D2E",
  },
  [SkillNames.C]: {
    id: 3,
    name: "c",
    label: "C",
    shortDescription: "Pointers, memory management, and close-to-metal control ⚙️💾",
    color: "#A8B9CC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    keyboardColor: "#00599C",
  },
  [SkillNames.CPP]: {
    id: 4,
    name: "cpp",
    label: "C++",
    shortDescription: "High-speed algorithms, data structures, and raw execution power 🚀🦾",
    color: "#00599C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    keyboardColor: "#004482",
  },
  [SkillNames.JAVASCRIPT]: {
    id: 5,
    name: "javascript",
    label: "JavaScript",
    shortDescription: "Bringing interactive magic and full-stack dynamism to the web 🌐✨",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/js.svg",
    keyboardColor: "#ff9408",
  },
  [SkillNames.REACT]: {
    id: 6,
    name: "react",
    label: "React",
    shortDescription: "Composable UIs, slick state management, and modern component design ⚛️🎨",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    keyboardIcon: "/assets/keyboard/logos/react.svg",
    keyboardColor: "#00cce8",
  },
  [SkillNames.NODEJS]: {
    id: 7,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "Event-driven asynchronous backend services built for real-time scale 🟢🚂",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
    keyboardColor: "#00952c",
  },
  [SkillNames.EXPRESS]: {
    id: 8,
    name: "express",
    label: "Express.js",
    shortDescription: "Fast, unopinionated REST endpoints and microservice middleware 🚂💨",
    color: "#ffffff",
    icon: "https://cdn.simpleicons.org/express/FFFFFF",
    keyboardIcon: "/assets/keyboard/logos/express.svg",
    keyboardColor: "#343638",
  },
  [SkillNames.REST_APIS]: {
    id: 9,
    name: "restapis",
    label: "REST APIs",
    shortDescription: "Clean API architecture, strict contracts, and seamless data flow 🔌📡",
    color: "#FF6C37",
    icon: "https://cdn.simpleicons.org/postman/FF6C37",
    keyboardColor: "#FF6C37",
  },
  [SkillNames.TAILWIND]: {
    id: 10,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription: "Rapid responsive styling with utility-first precision and zero CSS bloat 🌪️💎",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    keyboardIcon: "/assets/keyboard/logos/tailwind.svg",
    keyboardColor: "#00bfd8",
  },
  [SkillNames.MONGODB]: {
    id: 11,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Flexible NoSQL document storage designed for modern MERN stacks 🍃📊",
    color: "#47A248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    keyboardIcon: "/assets/keyboard/logos/mongodb.svg",
    keyboardColor: "#00c51b",
  },
  [SkillNames.MYSQL]: {
    id: 12,
    name: "mysql",
    label: "MySQL",
    shortDescription: "Relational modeling, ACID compliance, and optimized SQL queries 🐬🗄️",
    color: "#4479A1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    keyboardColor: "#00758F",
  },
  [SkillNames.SUPABASE]: {
    id: 13,
    name: "supabase",
    label: "Supabase",
    shortDescription: "Postgres-backed backend-as-a-service with instant auth and real-time triggers ⚡🛡️",
    color: "#3ECF8E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    keyboardIcon: "/assets/logos/supabase-mono.svg",
    keyboardColor: "#3ECF8E",
  },
  [SkillNames.JWT]: {
    id: 14,
    name: "jwt",
    label: "JWT",
    shortDescription: "Stateless token-based authentication and cryptographically verified sessions 🔑🔒",
    color: "#D63AFF",
    icon: "https://cdn.simpleicons.org/jsonwebtokens/D63AFF",
    keyboardColor: "#D63AFF",
  },
  [SkillNames.MACHINE_LEARNING]: {
    id: 15,
    name: "machinelearning",
    label: "Machine Learning",
    shortDescription: "Predictive models, neural feature engineering, and intelligent automation 🧠🤖",
    color: "#FF6F00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    keyboardColor: "#FF6F00",
  },
  [SkillNames.GIT_GITHUB]: {
    id: 16,
    name: "gitgithub",
    label: "Git / GitHub",
    shortDescription: "Version control discipline, atomic commits, and team collaboration workflows 🐙🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
  [SkillNames.VERCEL]: {
    id: 17,
    name: "vercel",
    label: "Vercel",
    shortDescription: "Serverless edge deployments, instant previews, and seamless cloud hosting 🔺🚀",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    keyboardIcon: "/assets/logos/vercel-mono.svg",
    keyboardColor: "#222222",
  },
  [SkillNames.RENDER]: {
    id: 18,
    name: "render",
    label: "Render",
    shortDescription: "Reliable automated cloud hosting for web services, databases, and cron workers ☁️📦",
    color: "#46E3B7",
    icon: "https://cdn.simpleicons.org/render/46E3B7",
    keyboardColor: "#46E3B7",
  },
};

export type Experience = {
  id: number;
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "Aug 12, 2026", end: "Sep 16, 2026" }],
    title: "MERN Stack Intern",
    company: "Emertxe",
    description: [
      "Built HomelyHub, a full-stack property booking platform, using MongoDB, Express.js, React and Node.js.",
      "Implemented responsive user interfaces, dynamic property browsing, and secure backend booking services.",
    ],
    skills: [
      SkillNames.MONGODB,
      SkillNames.EXPRESS,
      SkillNames.REACT,
      SkillNames.NODEJS,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
