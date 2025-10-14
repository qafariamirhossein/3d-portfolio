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
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "3D Web Developer",
    icon: web,
  },
  {
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "Full Stack Developer",
    icon: backend,
  },
  {
    title: "UI/UX Designer",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "Frontend Developer",
    companyName: "Tech Solutions Inc.",
    icon: reactjs,
    iconBg: "#383E56",
    date: "June 2021 - December 2022",
    points: [
      "Developed responsive web applications using React.js, TypeScript, and modern CSS frameworks.",
      "Implemented 3D visualizations using Three.js for interactive user experiences.",
      "Collaborated with UI/UX designers to create pixel-perfect, accessible interfaces.",
      "Optimized application performance and implemented best practices for code quality.",
    ],
  },
  {
    title: "Full Stack Developer",
    companyName: "Digital Innovations",
    icon: nodejs,
    iconBg: "#E6DEDD",
    date: "January 2023 - August 2023",
    points: [
      "Built end-to-end web applications using React, Node.js, and MongoDB.",
      "Created RESTful APIs and integrated third-party services for enhanced functionality.",
      "Implemented real-time features using WebSocket connections and state management.",
      "Mentored junior developers and conducted code reviews to maintain high standards.",
    ],
  },
  {
    title: "3D Web Developer",
    companyName: "Creative Studio",
    icon: threejs,
    iconBg: "#383E56",
    date: "September 2023 - Present",
    points: [
      "Specialized in creating immersive 3D web experiences using Three.js and React Three Fiber.",
      "Developed interactive 3D portfolios and product showcases for various clients.",
      "Integrated 3D models and animations with responsive web design principles.",
      "Explored cutting-edge web technologies including WebGL and advanced shader programming.",
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Amir's expertise in 3D web development is exceptional. He transformed our static website into an immersive experience that our users love.",
    name: "Sarah Johnson",
    designation: "Product Manager",
    company: "Tech Innovations",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Working with Amir was a game-changer. His attention to detail and innovative approach to 3D visualization exceeded our expectations.",
    name: "Michael Chen",
    designation: "Creative Director",
    company: "Digital Studio",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Amir's 3D portfolio work increased our client engagement by 300%. His technical skills and creative vision are outstanding.",
    name: "Emily Rodriguez",
    designation: "CEO",
    company: "Creative Agency",
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
