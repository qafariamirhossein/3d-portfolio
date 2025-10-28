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
  figma,
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
    title: "AI Developer",
    icon: web,
  },
  {
    title: "Web3 Developer",
    icon: mobile,
  },
  {
    title: "Full Stack Developer",
    icon: backend,
  },
  {
    title: "Blockchain Developer",
    icon: creator,
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
    title: "AI Developer",
    companyName: "BreakoutwithAI",
    icon: reactjs,
    iconBg: "#383E56",
    date: "January 2024 - Present",
    points: [
      "Developed AI-powered learning assistants using OpenAI API and LangChain for personalized educational experiences.",
      "Built intelligent course recommendation systems with machine learning algorithms and natural language processing.",
      "Created conversational AI interfaces that provide real-time learning support and automated customer service.",
      "Integrated AI capabilities with modern web technologies including React, TypeScript, and Node.js.",
    ],
  },
  {
    title: "Web3 Developer",
    companyName: "Blockchain Solutions",
    icon: nodejs,
    iconBg: "#E6DEDD",
    date: "June 2023 - December 2023",
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
    icon: threejs,
    iconBg: "#383E56",
    date: "September 2022 - May 2023",
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
}));

export { services, technologies, experiences, testimonials, projects };
