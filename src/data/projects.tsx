import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import React, { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";

const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

export const isRealLink = (url?: string): url is string => {
  if (!url) return false;
  const trimmed = url.trim();
  return Boolean(
    trimmed &&
    trimmed !== "#" &&
    !trimmed.includes("[") &&
    trimmed.startsWith("http")
  );
};

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  const hasLive = isRealLink(live);
  const hasRepo = isRealLink(repo);

  if (!hasLive && !hasRepo) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {hasLive && (
        <Button variant={"default"} size={"sm"} asChild>
          <a
            className="font-mono flex items-center gap-2"
            rel="noopener noreferrer"
            target="_blank"
            href={live}
          >
            Live Demo
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </a>
        </Button>
      )}
      {hasRepo && (
        <Button variant={"outline"} size={"sm"} asChild>
          <a
            className="font-mono flex items-center gap-2"
            rel="noopener noreferrer"
            target="_blank"
            href={repo}
          >
            GitHub
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </a>
        </Button>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
  react: brand("React", "react-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  vercel: brand("Vercel", "vercel-mono.svg"),
  next: brand("Next.js", "nextdotjs-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  js: brand("JavaScript", "javascript-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  jwt: {
    title: "JWT",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">JWT</span>,
  },
  mysql: {
    title: "MySQL",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">MySQL</span>,
  },
  render: {
    title: "Render",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Render</span>,
  },
  gemini: {
    title: "Gemini AI",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">Gemini</span>,
  },
  ml: {
    title: "Machine Learning",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">ML</span>,
  },
  aes: {
    title: "AES-256-GCM",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">AES</span>,
  },
  bcrypt: {
    title: "bcrypt",
    bg: "black",
    fg: "white",
    icon: <span className="text-xs font-bold">bcrypt</span>,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    id: "campus2career",
    category: "Career Roadmap & EdTech",
    title: "Campus2Career",
    src: "/assets/projects-screenshots/campus2career/Campus2Career.png",
    screenshots: ["Campus2Career.png"],
    live: "https://campus2-career-phi.vercel.app",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.gemini,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Personalised Skill Roadmap &amp; AI Interview Platform
          </TypographyP>
          <TypographyP className="font-mono">
            Turns a student&apos;s resume into a personalised skill roadmap. I built
            the AI engine: skill extraction, role matching, roadmap generation and
            mock interviews. Stack: React, Node.js, Express, Supabase.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">AI Engine &amp; Skill Extraction</TypographyH3>
          <p className="font-mono mb-2">
            The AI engine parses uploaded resumes, extracts technical proficiencies,
            and performs semantic role matching against real-world job requirements
            to map missing knowledge gaps.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/campus2career/Campus2Career.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Roadmap Generation &amp; Mock Interviews</TypographyH3>
          <p className="font-mono mb-2">
            Generates personalized learning milestones and powers an interactive
            mock interview simulator that conducts technical and behavioral
            evaluations with real-time actionable feedback. Data persistence and
            user sessions are managed with Supabase.
          </p>
        </div>
      );
    },
  },
  {
    id: "stashly",
    category: "AI Utility App",
    title: "Stashly",
    src: "/assets/projects-screenshots/stashly/Satshly.png",
    screenshots: ["Satshly.png"],
    live: "https://stashly-btntkkik.manus.space/",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.gemini,
        PROJECT_SKILLS.supabase,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            AI Warranty &amp; Receipt Tracker
          </TypographyP>
          <TypographyP className="font-mono">
            AI assistant that extracts warranty and return details from receipts,
            tracks expiry dates and guides users through claims.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Automated Receipt Parsing</TypographyH3>
          <p className="font-mono mb-2">
            Users upload receipt images or PDFs. A multimodal vision pipeline extracts
            purchase dates, merchant details, warranty coverage duration, and return
            deadlines automatically.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/stashly/Satshly.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Expiry Tracking &amp; Claim Assistance</TypographyH3>
          <p className="font-mono mb-2">
            Maintains a consolidated catalog of purchases, alerts users prior to
            warranty expiration, and provides guided claim flows with pre-drafted
            support templates.
          </p>
        </div>
      );
    },
  },
  {
    id: "threatlensai",
    category: "AI Cybersecurity",
    title: "ThreatLensAI",
    src: "/assets/projects-screenshots/threatlensai/ThreatLensAI.png",
    screenshots: ["ThreatLensAI.png"],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.ml,
        PROJECT_SKILLS.gemini,
        PROJECT_SKILLS.supabase,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Email Threat Detection Platform
          </TypographyP>
          <p className="text-xs font-mono text-center text-muted-foreground mb-4">
            Built for Smart India Hackathon 2026
          </p>
          <TypographyP className="font-mono">
            An email threat detection platform that spots phishing, domain spoofing,
            and social engineering, and traces an email&apos;s origin and delivery path
            using machine learning classifiers, threat-intel feeds, and Gemini.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Scam Check API &amp; Origin Tracing</TypographyH3>
          <p className="font-mono mb-2">
            I built the Scam Check API that inspects SPF, DKIM, and DMARC authentication
            headers, traces network hops from received headers, and classifies
            social engineering indicators using machine learning classifiers and Gemini.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/threatlensai/ThreatLensAI.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Scan History &amp; Community Intelligence</TypographyH3>
          <p className="font-mono mb-2">
            Built the Local Scan History module and a Supabase-backed Community
            Scam Reports module for aggregated threat logging and collective reporting.
          </p>
        </div>
      );
    },
  },
  {
    id: "dormfix",
    category: "Hostel Management Platform",
    title: "DormFix",
    src: "/assets/projects-screenshots/dormfix/DormFix.png",
    screenshots: ["DormFix.png"],
    live: "https://dorm-fix-tau.vercel.app",
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.jwt,
        PROJECT_SKILLS.bcrypt,
        PROJECT_SKILLS.vercel,
        PROJECT_SKILLS.render,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Hostel Complaint Tracking Platform with 48-Hour Auto-Escalation
          </TypographyP>
          <TypographyP className="font-mono">
            A full-stack hostel complaint management system with photo evidence
            uploads, 48-hour auto-escalation, and an administrative dashboard.
            Secured with JWT and bcrypt, rate limiting, and duplicate-complaint
            detection. Stack: React, Node.js, MongoDB, Vercel, Render.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Auto-Escalation Engine</TypographyH3>
          <p className="font-mono mb-2">
            Includes an automated 48-hour escalation scheduler that elevates
            unresolved complaints to senior wardens, ensuring prompt issue resolution.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/dormfix/DormFix.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Security &amp; Administration</TypographyH3>
          <p className="font-mono mb-2">
            Protected with salted bcrypt password hashing, JWT session authorization,
            request rate limiting, and an admin oversight portal for staff workflow
            assignments.
          </p>
        </div>
      );
    },
  },
  {
    id: "digitallegacy",
    category: "Security & Database Management",
    title: "Digital Legacy & Password Vault",
    src: "/assets/projects-screenshots/digitallegacy/DigitalLegacyVault.png",
    screenshots: ["DigitalLegacyVault.png"],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.mysql,
        PROJECT_SKILLS.jwt,
        PROJECT_SKILLS.aes,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Encrypted Credential Vault with Nominee Inactivity Flow
          </TypographyP>
          <TypographyP className="font-mono">
            Served as team lead for this DBMS project: an encrypted credential vault
            with a nominee-access flow and automated inactivity detection. Stack:
            Node.js, MySQL, JWT, AES-256-GCM.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Cryptographic Vault Architecture</TypographyH3>
          <p className="font-mono mb-2">
            Stores credentials securely using authenticated AES-256-GCM encryption
            with randomized initialization vectors (IVs) and PBKDF2 key derivation.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/digitallegacy/DigitalLegacyVault.png`,
            ]}
          />

          <TypographyH3 className="my-4 mt-8">Nominee Authorization Protocol</TypographyH3>
          <p className="font-mono mb-2">
            Monitors inactivity using scheduled heartbeat verification. Upon
            prolonged inactivity, it initiates a secure nominee-access flow allowing
            designated recipients to request verified access to emergency vaults.
          </p>
        </div>
      );
    },
  },
];

export default projects;
