/**
 * Automated Blog Setup Script for Amir Qafari's 3D Portfolio
 * This script automatically populates Strapi with blog data via API
 * 
 * Usage: 
 * 1. Start Strapi: npm run dev
 * 2. Run this script: node scripts/auto-setup-blog.js
 * 
 * Prerequisites:
 * - Strapi server running on https://thankful-books-8c2655df05.strapiapp.com
 * - Admin account created
 * - API token generated (Settings > API Tokens > Create new token)
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const STRAPI_URL = 'https://thankful-books-8c2655df05.strapiapp.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'your-api-token-here';

// Create axios instance with auth
const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Read the actual blog data from the JSON file
const blogDataPath = path.join(__dirname, '../../src/data/blog.json');
const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));

// Author data for Amir Qafari
const authorData = {
  name: "Amir Qafari",
  email: "amir@qafari.dev",
  slug: "amir-qafari",
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
    slug: "web-development",
    description: "Articles about modern web development practices, frameworks, and tools",
    color: "#3B82F6"
  },
  {
    name: "React",
    slug: "react",
    description: "React.js tutorials, best practices, and advanced techniques",
    color: "#61DAFB"
  },
  {
    name: "TypeScript",
    slug: "typescript",
    description: "TypeScript guides, type system mastery, and best practices",
    color: "#3178C6"
  },
  {
    name: "Portfolio",
    slug: "portfolio",
    description: "Portfolio development, 3D web experiences, and creative projects",
    color: "#8B5CF6"
  },
  {
    name: "AI & Technology",
    slug: "ai-technology",
    description: "Artificial intelligence in web development and emerging technologies",
    color: "#10B981"
  },
  {
    name: "Developer Tools",
    slug: "developer-tools",
    description: "Productivity tools, workflows, and development environment setup",
    color: "#F59E0B"
  },
  {
    name: "DevOps",
    slug: "devops",
    description: "DevOps practices, containerization, deployment, and infrastructure",
    color: "#EC4899"
  },
  {
    name: "Linux",
    slug: "linux",
    description: "Linux commands, system administration, and Unix-based systems",
    color: "#F97316"
  }
];

// Extract unique tags from blog data
const allTags = new Set();
blogData.blogs.forEach(blog => {
  blog.tags.forEach(tag => allTags.add(tag));
});

const tagsData = Array.from(allTags).map(tag => ({
  name: tag,
  slug: `tag-${tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
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
  originalCategory: blog.category, // Store original category name for mapping
  originalTags: blog.tags // Store original tags for mapping
}));

// Helper function to handle API errors
const handleError = (error, context) => {
  console.error(`❌ Error ${context}:`, error.response?.data || error.message);
  if (error.response?.data?.error?.details?.errors) {
    console.error('Validation errors:', error.response.data.error.details.errors);
  }
  throw error;
};

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create author
const createAuthor = async () => {
  try {
    console.log('👤 Creating author...');
    const response = await api.post('/api/authors', { data: authorData });
    console.log('✅ Author created successfully');
    return response.data.data;
  } catch (error) {
    // Check if author already exists (email unique constraint)
    if (error.response?.status === 400) {
      const validationErrors = error.response?.data?.error?.details?.errors || [];
      const emailExists = validationErrors.some(err => 
        err.path.includes('email') && err.message.includes('unique')
      );
      
      if (emailExists) {
        console.log('ℹ️  Author already exists, fetching existing...');
        const response = await api.get('/api/authors', {
          params: { filters: { email: authorData.email } }
        });
        if (response.data.data && response.data.data.length > 0) {
          console.log('✅ Found existing author');
          return response.data.data[0];
        }
      }
    }
    handleError(error, 'creating author');
  }
};

// Create categories
const createCategories = async () => {
  console.log('📂 Creating categories...');
  const createdCategories = {};
  
  for (const category of categoriesData) {
    try {
      const response = await api.post('/api/categories', { data: category });
      createdCategories[category.name] = response.data.data;
      console.log(`✅ Category "${category.name}" created`);
    } catch (error) {
      // Check if category already exists (name unique constraint)
      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.error?.details?.errors || [];
        const nameExists = validationErrors.some(err => 
          err.path.includes('name') && err.message.includes('unique')
        );
        
        if (nameExists) {
          console.log(`ℹ️  Category "${category.name}" already exists, fetching...`);
          const response = await api.get('/api/categories', {
            params: { filters: { name: category.name } }
          });
          if (response.data.data && response.data.data.length > 0) {
            createdCategories[category.name] = response.data.data[0];
            console.log(`✅ Found existing category "${category.name}"`);
          }
        } else {
          handleError(error, `creating category "${category.name}"`);
        }
      } else {
        handleError(error, `creating category "${category.name}"`);
      }
    }
    await wait(100); // Small delay between requests
  }
  
  return createdCategories;
};

// Create tags
const createTags = async () => {
  console.log('🏷️  Creating tags...');
  const createdTags = {};
  
  for (const tag of tagsData) {
    try {
      const response = await api.post('/api/tags', { data: tag });
      createdTags[tag.name] = response.data.data;
      console.log(`✅ Tag "${tag.name}" created`);
    } catch (error) {
      // Check if tag already exists (name or slug unique constraint)
      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.error?.details?.errors || [];
        const nameExists = validationErrors.some(err => 
          err.path.includes('name') && err.message.includes('unique')
        );
        const slugExists = validationErrors.some(err => 
          err.path.includes('slug') && err.message.includes('unique')
        );
        
        if (nameExists || slugExists) {
          console.log(`ℹ️  Tag "${tag.name}" already exists, fetching...`);
          const response = await api.get('/api/tags', {
            params: { filters: { name: tag.name } }
          });
          if (response.data.data && response.data.data.length > 0) {
            createdTags[tag.name] = response.data.data[0];
            console.log(`✅ Found existing tag "${tag.name}"`);
          } else {
            // Try fetching by slug if name search failed
            const slugResponse = await api.get('/api/tags', {
              params: { filters: { slug: tag.slug } }
            });
            if (slugResponse.data.data && slugResponse.data.data.length > 0) {
              createdTags[tag.name] = slugResponse.data.data[0];
              console.log(`✅ Found existing tag "${tag.name}" by slug`);
            }
          }
        } else {
          handleError(error, `creating tag "${tag.name}"`);
        }
      } else {
        handleError(error, `creating tag "${tag.name}"`);
      }
    }
    await wait(100); // Small delay between requests
  }
  
  return createdTags;
};

// Upload featured images (placeholder function - requires actual image files)
const uploadFeaturedImages = async () => {
  console.log('🖼️  Note: Featured images need to be uploaded manually to the Media Library');
  console.log('   Required images:');
  blogData.blogs.forEach(blog => {
    console.log(`   - ${blog.featuredImage} for "${blog.title}"`);
  });
  return {};
};

// Create blog posts
const createBlogPosts = async (author, categories, tags) => {
  console.log('📰 Creating blog posts...');
  const createdBlogs = [];
  
  for (const blog of blogsData) {
    try {
      // Check if blog post already exists
      let existingBlog = null;
      try {
        const existingResponse = await api.get('/api/blogs', {
          params: { filters: { slug: blog.slug } }
        });
        if (existingResponse.data.data && existingResponse.data.data.length > 0) {
          existingBlog = existingResponse.data.data[0];
        }
      } catch (error) {
        // Ignore error, continue to create new blog
      }
      
      if (existingBlog) {
        console.log(`⏭️  Blog post "${blog.title}" already exists, skipping...`);
        createdBlogs.push(existingBlog);
        continue;
      }
      
      // Find the category ID
      const categoryId = categories[blog.originalCategory]?.id;
      if (!categoryId) {
        console.warn(`⚠️  Category "${blog.originalCategory}" not found for blog "${blog.title}"`);
      }
      
      // Find tag IDs
      const tagIds = blog.originalTags
        .map(tagName => tags[tagName]?.id)
        .filter(id => id !== undefined);
      
      const blogData = {
        ...blog,
        author: author.id,
        category: categoryId,
        tags: tagIds,
        // Remove original fields
        originalCategory: undefined,
        originalTags: undefined
      };
      
      const response = await api.post('/api/blogs', { data: blogData });
      createdBlogs.push(response.data.data);
      console.log(`✅ Blog post "${blog.title}" created`);
    } catch (error) {
      // Check if blog already exists by slug
      if (error.response?.status === 400) {
        const validationErrors = error.response?.data?.error?.details?.errors || [];
        const slugExists = validationErrors.some(err => 
          err.path.includes('slug') && err.message.includes('unique')
        );
        
        if (slugExists) {
          console.log(`⏭️  Blog post "${blog.title}" already exists, skipping...`);
          // Try to fetch existing blog
          try {
            const existingResponse = await api.get('/api/blogs', {
              params: { filters: { slug: blog.slug } }
            });
            if (existingResponse.data.data && existingResponse.data.data.length > 0) {
              createdBlogs.push(existingResponse.data.data[0]);
            }
          } catch (fetchError) {
            console.warn(`⚠️  Could not fetch existing blog "${blog.title}"`);
          }
          continue;
        }
      }
      handleError(error, `creating blog post "${blog.title}"`);
    }
    await wait(200); // Small delay between requests
  }
  
  return createdBlogs;
};

// Publish blog posts
const publishBlogPosts = async (blogs) => {
  console.log('📢 Publishing blog posts...');
  
  for (const blog of blogs) {
    try {
      // Handle both Strapi v4 and v5 response formats
      const blogId = blog.id || blog.data?.id;
      const blogTitle = blog.attributes?.title || blog.data?.attributes?.title || blog.title || 'Unknown';
      const publishedAt = blog.attributes?.publishedAt || blog.data?.attributes?.publishedAt || blog.publishedAt;
      
      if (!blogId) {
        console.warn(`⚠️  Skipping blog post "${blogTitle}" - no ID found`);
        continue;
      }
      
      await api.put(`/api/blogs/${blogId}`, {
        data: { publishedAt: publishedAt }
      });
      console.log(`✅ Blog post "${blogTitle}" published`);
    } catch (error) {
      const blogTitle = blog.attributes?.title || blog.data?.attributes?.title || blog.title || 'Unknown';
      console.warn(`⚠️  Could not publish blog post "${blogTitle}":`, error.message);
    }
    await wait(100);
  }
};

// Main setup function
const setupBlog = async () => {
  try {
    console.log('🚀 Starting automated blog setup for Amir Qafari\'s 3D Portfolio');
    console.log('=' .repeat(70));
    
    // Check if API token is set
    if (API_TOKEN === 'your-api-token-here') {
      console.log('❌ Please set your Strapi API token:');
      console.log('   export STRAPI_API_TOKEN="your-actual-token"');
      console.log('   or edit the API_TOKEN variable in this script');
      return;
    }
    
    // Test connection
    try {
      const response = await api.get('/api/authors');
      console.log('Response:', response.data);
      console.log('✅ Connected to Strapi successfully');
    } catch (error) {
      console.log('❌ Could not connect to Strapi. Make sure:');
      console.log('   1. Strapi server is running (npm run dev)');
      console.log('   2. API token is correct');
      console.log('   3. Server is accessible at https://thankful-books-8c2655df05.strapiapp.com');
      return;
    }
    
    // Create entities in order
    const author = await createAuthor();
    const categories = await createCategories();
    const tags = await createTags();
    await uploadFeaturedImages();
    const blogs = await createBlogPosts(author, categories, tags);
    await publishBlogPosts(blogs);
    
    console.log('\n' + '=' .repeat(70));
    console.log('🎉 Blog setup completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - 1 author created`);
    console.log(`   - ${Object.keys(categories).length} categories created`);
    console.log(`   - ${Object.keys(tags).length} tags created`);
    console.log(`   - ${blogs.length} blog posts created`);
    console.log('\n🔗 Next steps:');
    console.log('   1. Upload featured images to Media Library');
    console.log('   2. Update blog posts with featured images');
    console.log('   3. Test your API endpoints');
    console.log('   4. Configure your frontend to consume the API');
    
  } catch (error) {
    console.error('💥 Setup failed:', error.message);
    process.exit(1);
  }
};

// Run the setup
if (require.main === module) {
  setupBlog();
}

module.exports = {
  setupBlog,
  createAuthor,
  createCategories,
  createTags,
  createBlogPosts,
  publishBlogPosts
};
