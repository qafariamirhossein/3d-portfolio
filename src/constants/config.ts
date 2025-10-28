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
    title: "Amir Qafari — Full-Stack Developer",
    fullName: "Amir Qafari",
    email: "qafariamirhossein@gmail.com",
  },
  hero: {
    name: "Amir Qafari",
    p: ["I develop AI-powered applications", "and Web3 solutions with modern tech"],
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
      content: `I'm Amir Qafari, a passionate full-stack developer specializing in AI-powered applications and Web3 solutions. With expertise in modern technologies including TypeScript, React, Node.js, and blockchain development, I create innovative solutions that bridge the gap between artificial intelligence and decentralized technologies. My experience spans from building intelligent AI assistants and machine learning platforms to developing smart contracts and DeFi applications. I'm dedicated to pushing the boundaries of what's possible with technology, creating seamless user experiences that combine cutting-edge AI capabilities with robust Web3 infrastructure.`,
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
      content: `Following projects showcase my expertise in AI development and Web3 solutions through
    real-world examples of my work. Each project demonstrates my ability to integrate
    artificial intelligence with modern web technologies, build decentralized applications,
    and create innovative solutions that solve complex problems. From AI-powered learning
    platforms to blockchain-based betting systems, these projects reflect my passion for
    cutting-edge technology and creative problem-solving.`,
    },
  },
};
