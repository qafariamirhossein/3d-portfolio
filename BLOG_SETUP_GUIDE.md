# Blog Content Management Setup Guide

## 📋 Overview

Your blog has been updated to support **dynamic content from Strapi CMS**. You now have two options for managing blog posts:

### Option 1: Dynamic CMS (Recommended for Production)
- Manage blogs through Strapi admin panel
- Easy to add, edit, and delete posts
- No need to edit code

### Option 2: Static JSON (Fallback)
- Quick static content
- Edit `src/data/blog.json` directly
- Rebuild app after changes

---

## 🚀 Setup Instructions

### 1. Start Strapi CMS

```bash
cd cms
npm run dev
```

This will start Strapi at `http://localhost:1337`

### 2. Create Admin Account

1. Open `http://localhost:1337/admin` in your browser
2. Create your admin account
3. Complete the setup wizard

### 3. Populate Blog Data

You can populate Strapi with your existing blog data using the automated script:

```bash
# First, generate an API token in Strapi:
# 1. Go to Settings > API Tokens
# 2. Create new token with Full access
# 3. Copy the token

# Set the token and run the setup
export STRAPI_API_TOKEN="your-token-here"
npm run auto-setup-blog
```

This will automatically create:
- Author (Amir Qafari)
- Categories (Web Development, React, TypeScript, etc.)
- Tags (Three.js, React, WebGL, etc.)
- All 6 blog posts from your existing data

### 4. Configure Frontend

Create a `.env.local` file in the project root:

```bash
# .env.local
VITE_STRAPI_URL=http://localhost:1337
```

For production, use your deployed Strapi URL:
```bash
VITE_STRAPI_URL=https://your-strapi-instance.com
```

---

## 📝 Managing Blog Posts

### Adding a New Blog Post

1. Go to `http://localhost:1337/admin`
2. Navigate to **Content Manager** > **Blog Post**
3. Click **Create new entry**
4. Fill in all fields:
   - **Title**: Your blog post title
   - **Slug**: URL-friendly version (auto-generated)
   - **Excerpt**: Short description
   - **Content**: Full content in Markdown
   - **Published At**: Publication date
   - **Reading Time**: Estimated read time
   - **Category**: Select or create category
   - **Tags**: Add relevant tags
   - **Featured Image**: Upload an image
5. Click **Save** and **Publish**

### Editing a Blog Post

1. Go to Content Manager > Blog Post
2. Click on the post to edit
3. Make your changes
4. Click **Save**

### Editing Static JSON (Fallback)

If you prefer to use static content:

1. Edit `src/data/blog.json`
2. Run `npm run build` to rebuild
3. Or use `npm run dev` for development

**Note**: To switch back to static JSON, you'll need to update `src/components/pages/Blog.tsx` to import from `blog.json` instead of using `blogApi`.

---

## 🏗️ Project Structure

```
reactjs18-3d-portfolio/
├── cms/                          # Strapi CMS backend
│   ├── src/
│   │   └── api/
│   │       ├── blog/             # Blog API
│   │       ├── author/           # Author API
│   │       ├── category/         # Category API
│   │       └── tag/              # Tag API
│   └── scripts/
│       ├── auto-setup-blog.js   # Automated setup script
│       └── setup-blog.js         # Manual setup script
├── src/
│   ├── api/
│   │   └── blogApi.ts           # Blog API service
│   ├── data/
│   │   └── blog.json            # Static blog data (fallback)
│   └── components/
│       └── pages/
│           └── Blog.tsx         # Blog component (updated for CMS)
└── .env.local                    # Environment configuration
```

---

## 🔧 API Methods Available

The `blogApi` service provides these methods:

```typescript
// Get all blogs
const response = await blogApi.getBlogs({
  page: 1,
  pageSize: 10,
  category: 'Web Development',
  featured: true,
  tags: ['React', 'Three.js']
});

// Get single blog by slug
const blog = await blogApi.getBlogBySlug('my-blog-post-slug');

// Get featured blogs
const featured = await blogApi.getFeaturedBlogs();

// Get blogs by category
const categoryBlogs = await blogApi.getBlogsByCategory('React');

// Search blogs
const results = await blogApi.searchBlogs('search query');

// Get all categories
const categories = await blogApi.getCategories();

// Get all tags
const tags = await blogApi.getTags();
```

---

## 🎯 Quick Start (Fastest Way)

1. **Start Strapi**:
   ```bash
   cd cms && npm run dev
   ```

2. **Create admin account** at `http://localhost:1337/admin`

3. **Get API token**:
   - Settings > API Tokens > Create new token (Full access)

4. **Run automated setup**:
   ```bash
   export STRAPI_API_TOKEN="your-token"
   npm run auto-setup-blog
   ```

5. **Create .env.local**:
   ```bash
   echo "VITE_STRAPI_URL=http://localhost:1337" > .env.local
   ```

6. **Start frontend**:
   ```bash
   npm run dev
   ```

7. **Visit blog page** and see your posts!

---

## 🐛 Troubleshooting

### Blog posts not loading?

1. Check if Strapi is running: `http://localhost:1337`
2. Verify `.env.local` has the correct URL
3. Check browser console for errors
4. Ensure API token has proper permissions

### Want to use static JSON instead?

Edit `src/components/pages/Blog.tsx`:
- Change import from `blogApi` to `blogData` from `blog.json`
- Remove the API fetch logic
- Use `blogData.blogs` directly

---

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Content Manager Guide](https://docs.strapi.io/user-guide/content-manager/introduction-to-content-manager)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)

---

## ✨ What Changed?

### Before
- Blog posts were loaded from static JSON file
- Had to edit code to change content
- Required rebuild for every content change

### After
- Blog posts loaded from Strapi CMS
- Easy to add/edit posts via admin UI
- Can switch between CMS and static data
- Loading state with spinner
- Graceful error handling

---

## 🎉 You're All Set!

You now have a fully functional blog with dynamic content management. Happy blogging! 🚀

