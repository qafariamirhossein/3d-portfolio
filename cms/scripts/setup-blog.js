/**
 * Blog setup script
 * Run this after starting Strapi to create sample data
 */

const sampleAuthors = [
  {
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer with 5+ years of experience in React and Node.js",
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    }
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    bio: "Frontend specialist passionate about modern web technologies and user experience",
    socialLinks: {
      twitter: "https://twitter.com/janesmith",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith"
    }
  }
];

const sampleBlogs = [
  {
    title: "Getting Started with React 18",
    excerpt: "Learn the fundamentals of React 18 and its new features including concurrent rendering and automatic batching.",
    content: "# Getting Started with React 18\n\nReact 18 introduces several exciting new features that make building user interfaces even more powerful and efficient...",
    featured: true,
    readingTime: 8
  },
  {
    title: "Building Modern Web Applications with TypeScript",
    excerpt: "Discover how TypeScript can improve your development workflow and catch errors before they reach production.",
    content: "# Building Modern Web Applications with TypeScript\n\nTypeScript has become an essential tool for modern web development...",
    featured: false,
    readingTime: 12
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive comparison of CSS Grid and Flexbox to help you choose the right layout method for your projects.",
    content: "# CSS Grid vs Flexbox: When to Use Which\n\nBoth CSS Grid and Flexbox are powerful layout systems, but they serve different purposes...",
    featured: true,
    readingTime: 6
  }
];

console.log("Blog setup script ready!");
console.log("Use this data to create sample content in your Strapi admin panel.");
console.log("\nSample Authors:", JSON.stringify(sampleAuthors, null, 2));
console.log("\nSample Blogs:", JSON.stringify(sampleBlogs, null, 2));
