/**
 * Blog setup script for Amir Qafari's 3D Portfolio
 * Run this after starting Strapi to create sample data
 * 
 * Usage: npm run setup-blog
 */

const fs = require('fs');
const path = require('path');

// Read the actual blog data from the JSON file
const blogDataPath = path.join(__dirname, '../../src/data/blog.json');
const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));

// Author data for Amir Qafari
const authorData = {
  name: "Amir Qafari",
  email: "amir@qafari.dev",
  bio: "Full-stack developer specializing in 3D web experiences, React, and modern web technologies. Passionate about creating immersive digital experiences that push the boundaries of web development.",
  socialLinks: {
    twitter: "https://twitter.com/amirqafari",
    github: "https://github.com/amirqafari",
    linkedin: "https://linkedin.com/in/amirqafari",
    portfolio: "https://amirqafari.vercel.app"
  }
};

// Categories based on the blog data
const categoriesData = [
  {
    name: "Web Development",
    description: "Articles about modern web development practices, frameworks, and tools",
    color: "#3B82F6"
  },
  {
    name: "React",
    description: "React.js tutorials, best practices, and advanced techniques",
    color: "#61DAFB"
  },
  {
    name: "TypeScript",
    description: "TypeScript guides, type system mastery, and best practices",
    color: "#3178C6"
  },
  {
    name: "Portfolio",
    description: "Portfolio development, 3D web experiences, and creative projects",
    color: "#8B5CF6"
  },
  {
    name: "AI & Technology",
    description: "Artificial intelligence in web development and emerging technologies",
    color: "#10B981"
  },
  {
    name: "Developer Tools",
    description: "Productivity tools, workflows, and development environment setup",
    color: "#F59E0B"
  }
];

// Extract unique tags from blog data
const allTags = new Set();
blogData.blogs.forEach(blog => {
  blog.tags.forEach(tag => allTags.add(tag));
});

const tagsData = Array.from(allTags).map(tag => ({
  name: tag
}));

// Transform blog data to match Strapi schema
const blogsData = blogData.blogs.map(blog => ({
  title: blog.title,
  slug: blog.slug,
  excerpt: blog.excerpt,
  content: blog.content,
  readingTime: parseInt(blog.readTime.replace(' min read', '')),
  seoTitle: blog.seo.metaTitle,
  seoDescription: blog.seo.metaDescription,
  featured: blog.id === "1" || blog.id === "4", // Mark first and portfolio articles as featured
  publishedAt: new Date(blog.publishedAt).toISOString(),
  views: Math.floor(Math.random() * 1000) + 100, // Random views between 100-1100
  likes: Math.floor(Math.random() * 50) + 10, // Random likes between 10-60
  // Note: featuredImage, author, category, and tags will be set after creating related entities
}));

// Function to create Strapi API calls
const createStrapiData = () => {
  console.log("🚀 Setting up blog data for Amir Qafari's 3D Portfolio");
  console.log("=" .repeat(60));
  
  console.log("\n📝 Author Data:");
  console.log(JSON.stringify(authorData, null, 2));
  
  console.log("\n📂 Categories Data:");
  console.log(JSON.stringify(categoriesData, null, 2));
  
  console.log("\n🏷️  Tags Data:");
  console.log(JSON.stringify(tagsData, null, 2));
  
  console.log("\n📰 Blog Posts Data:");
  console.log(`Total blog posts: ${blogsData.length}`);
  blogsData.forEach((blog, index) => {
    console.log(`${index + 1}. ${blog.title} (${blog.readingTime} min read)`);
  });
  
  console.log("\n" + "=" .repeat(60));
  console.log("📋 Setup Instructions:");
  console.log("1. Start your Strapi server: npm run dev");
  console.log("2. Open http://localhost:1337/admin");
  console.log("3. Create an admin account if not already done");
  console.log("4. Follow these steps in order:");
  console.log("   a. Create the author (Amir Qafari)");
  console.log("   b. Create all categories");
  console.log("   c. Create all tags");
  console.log("   d. Upload featured images to Media Library");
  console.log("   e. Create blog posts and link them to author, categories, and tags");
  console.log("5. Publish all blog posts");
  
  console.log("\n💡 Pro Tips:");
  console.log("- Use the bulk import feature in Strapi admin for faster setup");
  console.log("- Featured images should be uploaded to the Media Library first");
  console.log("- Make sure to set the correct publication dates");
  console.log("- Test the API endpoints after setup");
  
  return {
    author: authorData,
    categories: categoriesData,
    tags: tagsData,
    blogs: blogsData
  };
};

// Export the data
const strapiData = createStrapiData();

// Save the data to a JSON file for easy reference
const outputPath = path.join(__dirname, 'strapi-setup-data.json');
fs.writeFileSync(outputPath, JSON.stringify(strapiData, null, 2));
console.log(`\n💾 Data saved to: ${outputPath}`);

module.exports = strapiData;
