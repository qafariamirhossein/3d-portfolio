# Blog Setup Guide for Amir Qafari's 3D Portfolio

This guide will help you set up the Strapi CMS with your blog data for the 3D portfolio project.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Basic understanding of Strapi CMS

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd cms
npm install
```

### 2. Start Strapi Development Server

```bash
npm run dev
```

This will start Strapi on `http://localhost:1337`

### 3. Create Admin Account

1. Open `http://localhost:1337/admin` in your browser
2. Create your admin account
3. Complete the setup wizard

### 4. Generate API Token

1. Go to **Settings** > **API Tokens** in the admin panel
2. Click **Create new API Token**
3. Name it "Blog Setup Token"
4. Set permissions to **Full access**
5. Copy the generated token

### 5. Set Up Blog Data

You have two options for setting up the blog data:

#### Option A: Automated Setup (Recommended)

```bash
# Set your API token
export STRAPI_API_TOKEN="your-copied-token-here"

# Run the automated setup
npm run auto-setup-blog
```

This will automatically:
- Create the author (Amir Qafari)
- Create all categories
- Create all tags
- Create all blog posts
- Publish the blog posts

#### Option B: Manual Setup

```bash
# Generate setup data
npm run setup-blog
```

This will create a `strapi-setup-data.json` file with all the data you need to manually enter in the admin panel.

## 📊 Data Overview

The setup includes:

### Author
- **Name**: Amir Qafari
- **Email**: amir@qafari.dev
- **Bio**: Full-stack developer specializing in 3D web experiences
- **Social Links**: Twitter, GitHub, LinkedIn, Portfolio

### Categories (6)
- Web Development
- React
- TypeScript
- Portfolio
- AI & Technology
- Developer Tools

### Tags (20+)
- Three.js, React, WebGL, 3D Graphics, Frontend
- React Hooks, Context API, Performance, JavaScript
- TypeScript, Type System, Best Practices, Large Scale
- And many more...

### Blog Posts (6)
1. **Building Immersive 3D Web Experiences with Three.js and React** (8 min read)
2. **Modern React Development: Hooks, Context, and Performance Optimization** (12 min read)
3. **TypeScript Best Practices for Large-Scale Applications** (15 min read)
4. **Building Responsive 3D Portfolios with React and Three.js** (10 min read)
5. **The Future of AI in Web Development: From Code Generation to Intelligent UIs** (12 min read)
6. **Essential Developer Tools for Maximum Productivity in 2024** (15 min read)

## 🖼️ Featured Images Setup

After running the automated setup, you'll need to upload featured images:

1. Go to **Media Library** in the admin panel
2. Upload the following images (from your portfolio images):
   - `threejs-project.png` for the Three.js article
   - `react-project.png` for the React article
   - `typescript-project.png` for the TypeScript article
   - `portfolio-project.png` for the Portfolio article
   - `ai-project.png` for the AI article
   - `developer-tools.png` for the Developer Tools article

3. Edit each blog post and assign the corresponding featured image

## 🔧 API Configuration

### Content Types

The setup includes these content types:

#### Blog Post (`/api/blogs`)
- `title` (string, required)
- `slug` (uid, required)
- `excerpt` (text, required)
- `content` (richtext, required)
- `featuredImage` (media, required)
- `gallery` (media, optional)
- `author` (relation to Author)
- `category` (relation to Category)
- `tags` (relation to Tags)
- `readingTime` (integer)
- `seoTitle` (string)
- `seoDescription` (text)
- `featured` (boolean)
- `publishedAt` (datetime)
- `views` (integer)
- `likes` (integer)

#### Author (`/api/authors`)
- `name` (string, required)
- `email` (email, required)
- `bio` (text)
- `avatar` (media)
- `socialLinks` (json)
- `slug` (uid, required)

#### Category (`/api/categories`)
- `name` (string, required)
- `description` (text)
- `slug` (uid, required)
- `color` (string, hex color)

#### Tag (`/api/tags`)
- `name` (string, required)
- `slug` (uid, required)

### API Endpoints

Once set up, you can access:

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get specific blog post
- `GET /api/authors` - Get all authors
- `GET /api/categories` - Get all categories
- `GET /api/tags` - Get all tags

### Query Parameters

You can use Strapi's built-in query parameters:

```
GET /api/blogs?filters[featured][$eq]=true
GET /api/blogs?filters[category][name][$eq]=React
GET /api/blogs?filters[tags][name][$in]=Three.js,React
GET /api/blogs?sort=publishedAt:desc
GET /api/blogs?pagination[page]=1&pagination[pageSize]=5
```

## 🔗 Frontend Integration

To integrate with your React frontend:

1. Install axios or fetch for API calls
2. Create API service functions
3. Replace the static JSON data with API calls
4. Add loading states and error handling

Example API service:

```javascript
// services/blogApi.js
import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const blogApi = {
  getBlogs: async (params = {}) => {
    const response = await axios.get(`${API_URL}/blogs`, { params });
    return response.data;
  },
  
  getBlog: async (slug) => {
    const response = await axios.get(`${API_URL}/blogs`, {
      params: { filters: { slug: { $eq: slug } } }
    });
    return response.data.data[0];
  },
  
  getFeaturedBlogs: async () => {
    const response = await axios.get(`${API_URL}/blogs`, {
      params: { filters: { featured: { $eq: true } } }
    });
    return response.data;
  }
};
```

## 🐛 Troubleshooting

### Common Issues

1. **"Could not connect to Strapi"**
   - Make sure Strapi is running (`npm run dev`)
   - Check if the server is accessible at `http://localhost:1337`
   - Verify the API token is correct

2. **"API token is invalid"**
   - Generate a new API token in the admin panel
   - Make sure the token has full access permissions
   - Update the `STRAPI_API_TOKEN` environment variable

3. **"Category/Tag already exists"**
   - This is normal - the script will fetch existing entities
   - No action needed

4. **"Featured images not showing"**
   - Upload images to the Media Library first
   - Edit blog posts and assign featured images
   - Check image file paths and formats

### Reset Database

If you need to start over:

```bash
# Stop Strapi
# Delete the database file
rm -rf .tmp/data.db

# Restart Strapi
npm run dev
```

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Query Parameters](https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication)

## 🎯 Next Steps

1. ✅ Set up Strapi CMS
2. ✅ Populate with blog data
3. 🔄 Upload featured images
4. 🔄 Integrate with frontend
5. 🔄 Configure production deployment
6. 🔄 Set up content management workflow

---

**Need help?** Check the troubleshooting section or create an issue in the repository.