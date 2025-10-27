/**
 * Blog API Service for Strapi CMS Integration
 * This service handles all blog-related API calls to Strapi
 */

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Types for Strapi responses
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface BlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    readingTime: number;
    seoTitle?: string;
    seoDescription?: string;
    featured: boolean;
    publishedAt: string;
    views: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
    featuredImage?: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText?: string;
          caption?: string;
          width: number;
          height: number;
          formats: any;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string;
          provider: string;
          provider_metadata?: any;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
    author?: {
      data: {
        id: number;
        attributes: {
          name: string;
          email: string;
          bio?: string;
          avatar?: {
            data: {
              id: number;
              attributes: {
                url: string;
                name: string;
                alternativeText?: string;
              };
            };
          };
          socialLinks?: {
            twitter?: string;
            github?: string;
            linkedin?: string;
            portfolio?: string;
          };
          slug: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
    category?: {
      data: {
        id: number;
        attributes: {
          name: string;
          description?: string;
          color?: string;
          slug: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
          createdAt: string;
          updatedAt: string;
        };
      }>;
    };
  };
}

interface Author {
  id: number;
  attributes: {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
      data: {
        id: number;
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      };
    };
    socialLinks?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      portfolio?: string;
    };
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
    description?: string;
    color?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Tag {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

// API service class
class BlogApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  // Helper method to get full image URL
  private getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${STRAPI_URL}${imagePath}`;
  }

  // Helper method to transform blog post data
  private transformBlogPost(blog: any): TransformedBlogPost {
    // Handle both possible response formats (flat or nested)
    const blogData = blog.attributes || blog;
    
    // Get author name (handle multiple formats)
    const authorName = blogData.author?.data?.attributes?.name || 
                      blogData.author?.attributes?.name || 
                      blogData.author?.name || 
                      'Unknown Author';
    
    // Get author image/avatar
    const authorImage = blogData.author?.data?.attributes?.avatar?.data?.attributes?.url ||
                       blogData.author?.attributes?.avatar?.data?.attributes?.url ||
                       blogData.author?.avatar?.data?.attributes?.url ||
                       blogData.author?.avatar?.url ||
                       '/me/me.png';
    
    // Get category name
    const categoryName = blogData.category?.data?.attributes?.name || 
                        blogData.category?.attributes?.name || 
                        blogData.category?.name || 
                        'Uncategorized';
    
    // Get tags (handle both single relations and collections)
    let tags: string[] = [];
    if (blogData.tags?.data) {
      // Collection format (v4+)
      tags = blogData.tags.data.map((tag: any) => tag.attributes?.name || tag.name);
    } else if (blogData.tags) {
      // Could be an array or single object
      const tagsArray = Array.isArray(blogData.tags) ? blogData.tags : [blogData.tags];
      tags = tagsArray.map((tag: any) => tag.attributes?.name || tag.name).filter(Boolean);
    }
    
    // Get featured image
    const featuredImageUrl = blogData.featuredImage?.data?.attributes?.url ||
                             blogData.featuredImage?.data?.url ||
                             blogData.featuredImage?.attributes?.url ||
                             blogData.featuredImage?.url ||
                             '/portfolio/images/default-blog.png';
    
    return {
      id: blog.id,
      title: blogData.title,
      slug: blogData.slug,
      excerpt: blogData.excerpt,
      content: blogData.content,
      author: authorName,
      authorImage: authorImage.startsWith('http') ? authorImage : this.getImageUrl(authorImage),
      publishedAt: blogData.publishedAt ? blogData.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
      updatedAt: blogData.updatedAt ? blogData.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0],
      readTime: `${blogData.readingTime || 5} min read`,
      category: categoryName,
      tags: tags,
      featuredImage: featuredImageUrl.startsWith('http') ? featuredImageUrl : this.getImageUrl(featuredImageUrl),
      seo: {
        metaTitle: blogData.seoTitle || blogData.title,
        metaDescription: blogData.seoDescription || blogData.excerpt,
        keywords: tags
      },
      views: blogData.views || 0,
      likes: blogData.likes || 0,
      featured: blogData.featured || false
    };
  }

  // Get all blog posts with optional filters
  async getBlogs(params: {
    page?: number;
    pageSize?: number;
    featured?: boolean;
    category?: string;
    tags?: string[];
    sort?: string;
    search?: string;
  } = {}): Promise<{
    blogs: TransformedBlogPost[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('pagination[page]', params.page.toString());
      if (params.pageSize) queryParams.append('pagination[pageSize]', params.pageSize.toString());
      if (params.sort) queryParams.append('sort', params.sort);
      
      // Add filters
      if (params.featured !== undefined) {
        queryParams.append('filters[featured][$eq]', params.featured.toString());
      }
      
      if (params.category) {
        queryParams.append('filters[category][name][$eq]', params.category);
      }
      
      if (params.tags && params.tags.length > 0) {
        params.tags.forEach(tag => {
          queryParams.append('filters[tags][name][$in]', tag);
        });
      }
      
      if (params.search) {
        queryParams.append('filters[$or][0][title][$containsi]', params.search);
        queryParams.append('filters[$or][1][excerpt][$containsi]', params.search);
        queryParams.append('filters[$or][2][content][$containsi]', params.search);
      }
      
      // Populate all relations
      queryParams.append('populate', '*');

      const response = await fetch(`${this.baseUrl}/blogs?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StrapiResponse<BlogPost[]> = await response.json();
      
      return {
        blogs: data.data.map(blog => this.transformBlogPost(blog)),
        pagination: data.meta.pagination || {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: data.data.length
        }
      };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  // Get a single blog post by slug
  async getBlogBySlug(slug: string): Promise<TransformedBlogPost> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('filters[slug][$eq]', slug);
      queryParams.append('populate', '*');

      const response = await fetch(`${this.baseUrl}/blogs?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StrapiResponse<BlogPost[]> = await response.json();
      
      if (data.data.length === 0) {
        throw new Error(`Blog post with slug "${slug}" not found`);
      }
      
      return this.transformBlogPost(data.data[0]);
    } catch (error) {
      console.error(`Error fetching blog post with slug "${slug}":`, error);
      throw error;
    }
  }

  // Get featured blog posts
  async getFeaturedBlogs(): Promise<TransformedBlogPost[]> {
    const result = await this.getBlogs({ featured: true, pageSize: 3 });
    return result.blogs;
  }

  // Get blog posts by category
  async getBlogsByCategory(category: string): Promise<TransformedBlogPost[]> {
    const result = await this.getBlogs({ category });
    return result.blogs;
  }

  // Get blog posts by tags
  async getBlogsByTags(tags: string[]): Promise<TransformedBlogPost[]> {
    const result = await this.getBlogs({ tags });
    return result.blogs;
  }

  // Search blog posts
  async searchBlogs(query: string): Promise<TransformedBlogPost[]> {
    const result = await this.getBlogs({ search: query });
    return result.blogs;
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StrapiResponse<Category[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get all tags
  async getTags(): Promise<Tag[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tags`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StrapiResponse<Tag[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  // Get author information
  async getAuthor(): Promise<Author | null> {
    try {
      const response = await fetch(`${this.baseUrl}/authors`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: StrapiResponse<Author[]> = await response.json();
      return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error('Error fetching author:', error);
      throw error;
    }
  }
}

// Create and export the API service instance
export const blogApi = new BlogApiService();

// Transformed blog post type (what components actually use)
export interface TransformedBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  views: number;
  likes: number;
  featured: boolean;
}

// Export types for use in components
export type { BlogPost, Author, Category, Tag };
