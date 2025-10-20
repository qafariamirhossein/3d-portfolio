# Blog CMS Setup Guide

This Strapi CMS has been configured with a complete blog system including the following content types:

## Content Types

### 1. Blog Posts (`api::blog.blog`)
- **Title**: Blog post title
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Excerpt**: Short description for previews
- **Content**: Rich text content
- **Featured Image**: Main image for the post
- **Gallery**: Additional images/videos
- **Author**: Relationship to author
- **Category**: Relationship to category
- **Tags**: Many-to-many relationship with tags
- **Reading Time**: Estimated reading time in minutes
- **SEO Title**: Custom title for search engines
- **SEO Description**: Meta description
- **Featured**: Boolean to mark as featured post
- **Published At**: Publication date
- **Views**: View counter
- **Likes**: Like counter

### 2. Authors (`api::author.author`)
- **Name**: Author's full name
- **Email**: Contact email (unique)
- **Bio**: Author biography
- **Avatar**: Profile image
- **Social Links**: JSON object for social media links
- **Slug**: URL-friendly identifier

### 3. Categories (`api::category.category`)
- **Name**: Category name
- **Description**: Category description
- **Slug**: URL-friendly identifier
- **Color**: Hex color code for UI
- **Blogs**: One-to-many relationship with blog posts

### 4. Tags (`api::tag.tag`)
- **Name**: Tag name
- **Slug**: URL-friendly identifier
- **Blogs**: Many-to-many relationship with blog posts

## API Endpoints

### Standard CRUD Endpoints
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get single blog post
- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get single author
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get single tag

### Custom Blog Endpoints
- `GET /api/blogs/featured` - Get featured blog posts
- `GET /api/blogs/category/:categorySlug` - Get blogs by category slug
- `GET /api/blogs/tag/:tagSlug` - Get blogs by tag slug
- `GET /api/blogs/author/:authorSlug` - Get blogs by author slug
- `POST /api/blogs/:id/increment-views` - Increment view count

## Getting Started

1. **Start the CMS**:
   ```bash
   cd cms
   npm run develop
   ```

2. **Access Admin Panel**:
   - Open `http://localhost:1337/admin`
   - Create your admin account

3. **Configure Content**:
   - Create authors in the Authors section
   - Create categories in the Categories section
   - Create tags in the Tags section
   - Create blog posts in the Blog Posts section

4. **API Access**:
   - All content types are publicly readable
   - Use the API endpoints to fetch data in your frontend

## Default Data

The system automatically creates:
- 5 default categories (Technology, Web Development, React, Tutorials, News)
- 12 default tags (javascript, react, typescript, etc.)

## Frontend Integration

Example API calls for your React frontend:

```javascript
// Get all published blog posts with relations
const response = await fetch('http://localhost:1337/api/blogs?populate=*');
const blogs = await response.json();

// Get featured blog posts
const featured = await fetch('http://localhost:1337/api/blogs/featured?populate=*');

// Get blogs by category
const categoryBlogs = await fetch('http://localhost:1337/api/blogs/category/react?populate=*');

// Get single blog post
const blog = await fetch('http://localhost:1337/api/blogs/1?populate=*');
```

## CORS Configuration

The CMS is configured to allow requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)
- `https://yourdomain.com` (production domain)

Update the CORS origins in `config/middlewares.ts` as needed.

## Permissions

All content types have public read permissions configured automatically. This means your frontend can fetch data without authentication.

For admin operations (create, update, delete), you'll need to authenticate through the admin panel.
