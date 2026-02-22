type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Amir Qafari | Full-Stack Developer - React, Node.js, TypeScript, AI & Web3",
    fullName: "Amir Qafari",
    email: "qafariamirhossein@gmail.com",
  },
  hero: {
    name: "Amir Qafari",
    p: ["I build scalable full-stack applications", "with AI integration and modern web technologies"],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `I'm a skilled Full-Stack Developer with expertise in building modern, scalable web applications from concept to deployment. My technical stack includes React, Next.js, TypeScript, Node.js, Python, and PostgreSQL for backend development. I specialize in creating responsive frontends with Tailwind CSS and Three.js for immersive 3D experiences, while building robust APIs and microservices on the backend. My experience extends to AI/ML integration using OpenAI, LangChain, and TensorFlow, as well as Web3 development with Solidity and ethers.js. I'm passionate about clean code architecture, CI/CD pipelines, and delivering high-performance applications that solve real business problems.`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Explore my portfolio of full-stack applications showcasing expertise across the entire development lifecycle. Each project demonstrates proficiency in frontend frameworks like React and Next.js, backend technologies including Node.js and Python, database design with PostgreSQL and MongoDB, and cloud deployment on AWS and Vercel. From AI-powered SaaS platforms to decentralized Web3 applications, these projects highlight my ability to architect scalable solutions, implement secure authentication systems, optimize performance, and deliver exceptional user experiences.`,
    },
  },
};
