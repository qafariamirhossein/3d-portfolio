import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  // figma,
  docker,
  threejs,
} from "../assets";

// Import portfolio data from JSON file
import portfolioData from '../data/portfolio.json';

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "blog",
    title: "Blog",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "AI / AI Agents Developer",
    icon: creator,
  },
  {
    title: "Web3 / Blockchain Developer",
    icon: mobile,
  },
  {
    title: "Full Stack Developer",
    icon: threejs,
  },
];

const technologies: TTechnology[] = [
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React",
    icon: reactjs,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Python",
    icon: javascript,
  },
  {
    name: "Solidity",
    icon: html,
  },
  {
    name: "Web3.js",
    icon: css,
  },
  {
    name: "TensorFlow",
    icon: redux,
  },
  {
    name: "OpenAI API",
    icon: tailwind,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three.js",
    icon: threejs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "Backend Developer",
    companyName: "TechCorp Solutions",
    icon: nodejs,
    iconBg: "#383E56",
    date: "January 2024 - Present",
    points: [
      "Designed and implemented scalable RESTful APIs using Node.js, Express, and TypeScript.",
      "Built microservices architecture with Docker containerization and Kubernetes orchestration.",
      "Developed database schemas and optimized queries for PostgreSQL and MongoDB.",
      "Implemented authentication and authorization systems with JWT and OAuth2 protocols.",
    ],
  },
  {
    title: "Frontend Developer",
    companyName: "Digital Innovations",
    icon: reactjs,
    iconBg: "#E6DEDD",
    date: "September 2023 - December 2023",
    points: [
      "Created responsive and interactive user interfaces using React, TypeScript, and Tailwind CSS.",
      "Implemented state management solutions with Redux Toolkit and Context API.",
      "Built reusable component libraries and maintained design system consistency.",
      "Optimized application performance with code splitting, lazy loading, and bundle optimization.",
    ],
  },
  {
    title: "AI / AI Agents Developer",
    companyName: "BreakoutwithAI",
    icon: threejs,
    iconBg: "#383E56",
    date: "June 2023 - August 2023",
    points: [
      "Developed AI-powered learning assistants using OpenAI API and LangChain for personalized educational experiences.",
      "Built intelligent course recommendation systems with machine learning algorithms and natural language processing.",
      "Created conversational AI interfaces that provide real-time learning support and automated customer service.",
      "Integrated AI capabilities with modern web technologies including React, TypeScript, and Node.js.",
    ],
  },
  {
    title: "Web3 / Blockchain Developer",
    companyName: "Blockchain Solutions",
    icon: mongodb,
    iconBg: "#E6DEDD",
    date: "March 2023 - May 2023",
    points: [
      "Developed decentralized applications (dApps) using Solidity, Web3.js, and Ethereum smart contracts.",
      "Built tokenized betting platforms and DeFi applications with secure wallet integration and real-time data feeds.",
      "Implemented smart contract security best practices and conducted comprehensive testing and auditing.",
      "Created user-friendly interfaces for complex blockchain interactions and cryptocurrency trading.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "Tech Innovations",
    icon: git,
    iconBg: "#383E56",
    date: "September 2022 - February 2023",
    points: [
      "Built end-to-end web applications using React, Node.js, MongoDB, and modern development frameworks.",
      "Developed multilingual platforms with internationalization support and responsive design principles.",
      "Implemented real-time features using WebSocket connections and advanced state management techniques.",
      "Created scalable backend architectures with RESTful APIs and microservices design patterns.",
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Amir's expertise in AI development is exceptional. He built our intelligent learning assistant that increased user engagement by 300% and transformed our educational platform.",
    name: "Sarah Johnson",
    designation: "Product Manager",
    company: "BreakoutwithAI",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Working with Amir on our Web3 project was incredible. His blockchain expertise and attention to detail created a secure, user-friendly DeFi platform that exceeded all expectations.",
    name: "Michael Chen",
    designation: "CTO",
    company: "Blockchain Solutions",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Amir's full-stack development skills are outstanding. He delivered a multilingual platform with AI integration that our international users love. His technical expertise is unmatched.",
    name: "Emily Rodriguez",
    designation: "CEO",
    company: "Tech Innovations",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    testimonial:
      "Amir's backend architecture design is outstanding. He built our microservices infrastructure with Docker and Kubernetes, reducing deployment time by 60% and improving system scalability tremendously.",
    name: "David Park",
    designation: "Technical Lead",
    company: "TechCorp Solutions",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    testimonial:
      "Amir delivered a beautiful, responsive frontend that our users rave about. His expertise in React and TypeScript, combined with his eye for detail, created an exceptional user experience.",
    name: "Lisa Thompson",
    designation: "Design Director",
    company: "Digital Innovations",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    testimonial:
      "Amir is a brilliant developer with deep knowledge across the entire stack. He helped us build robust authentication systems and database optimizations that improved our performance by 40%. Highly recommended!",
    name: "James Wilson",
    designation: "Engineering Manager",
    company: "TechCorp Solutions",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    testimonial:
      "Amir's React expertise and state management skills are top-notch. He transformed our legacy application into a modern, maintainable codebase with Redux Toolkit and made our team's workflow much more efficient.",
    name: "Alexandra Kim",
    designation: "Frontend Lead",
    company: "Digital Innovations",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

// Transform the JSON data to match the TProject interface
const projects: TProject[] = portfolioData.portfolios.map(portfolio => ({
  id: portfolio.id,
  name: portfolio.name,
  description: portfolio.description,
  detailedDescription: portfolio.detailedDescription,
  shortDescription: portfolio.shortDescription,
  tags: portfolio.tags,
  image: portfolio.image,
  gallery: portfolio.gallery,
  video: portfolio.video,
  additionalVideos: portfolio.additionalVideos,
  liveDemoLink: portfolio.liveDemoLink,
  sourceCodeLink: portfolio.sourceCodeLink,
  technologies: portfolio.technologies,
  features: portfolio.features,
  challenges: portfolio.challenges,
  solutions: portfolio.solutions,
  duration: portfolio.duration,
  teamSize: portfolio.teamSize,
  role: portfolio.role,
  client: portfolio.client,
  year: portfolio.year,
  order: portfolio.order,
}))
.sort((a, b) => {
  // Sort by order field: 1 at top, 9999 at end, undefined defaults to 9999
  const orderA = a.order ?? 9999;
  const orderB = b.order ?? 9999;
  return orderA - orderB;
});

export { services, technologies, experiences, testimonials, projects };
