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
  private transformBlogPost(blog: BlogPost) {
    return {
      id: blog.id,
      title: blog.attributes.title,
      slug: blog.attributes.slug,
      excerpt: blog.attributes.excerpt,
      content: blog.attributes.content,
      author: blog.attributes.author?.data?.attributes?.name || 'Unknown Author',
      authorImage: blog.attributes.author?.data?.attributes?.avatar?.data?.attributes?.url 
        ? this.getImageUrl(blog.attributes.author.data.attributes.avatar.data.attributes.url)
        : '/me/me.png',
      publishedAt: blog.attributes.publishedAt.split('T')[0], // Format as YYYY-MM-DD
      updatedAt: blog.attributes.updatedAt.split('T')[0],
      readTime: `${blog.attributes.readingTime} min read`,
      category: blog.attributes.category?.data?.attributes?.name || 'Uncategorized',
      tags: blog.attributes.tags?.data?.map(tag => tag.attributes.name) || [],
      featuredImage: blog.attributes.featuredImage?.data?.attributes?.url
        ? this.getImageUrl(blog.attributes.featuredImage.data.attributes.url)
        : '/portfolio/images/default-blog.png',
      seo: {
        metaTitle: blog.attributes.seoTitle || blog.attributes.title,
        metaDescription: blog.attributes.seoDescription || blog.attributes.excerpt,
        keywords: blog.attributes.tags?.data?.map(tag => tag.attributes.name) || []
      },
      views: blog.attributes.views,
      likes: blog.attributes.likes,
      featured: blog.attributes.featured
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
    blogs: any[];
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
      
      // Populate relations
      queryParams.append('populate[0]', 'featuredImage');
      queryParams.append('populate[1]', 'author');
      queryParams.append('populate[2]', 'author.avatar');
      queryParams.append('populate[3]', 'category');
      queryParams.append('populate[4]', 'tags');

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
  async getBlogBySlug(slug: string): Promise<any> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('filters[slug][$eq]', slug);
      queryParams.append('populate[0]', 'featuredImage');
      queryParams.append('populate[1]', 'author');
      queryParams.append('populate[2]', 'author.avatar');
      queryParams.append('populate[3]', 'category');
      queryParams.append('populate[4]', 'tags');

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
  async getFeaturedBlogs(): Promise<any[]> {
    const result = await this.getBlogs({ featured: true, pageSize: 3 });
    return result.blogs;
  }

  // Get blog posts by category
  async getBlogsByCategory(category: string): Promise<any[]> {
    const result = await this.getBlogs({ category });
    return result.blogs;
  }

  // Get blog posts by tags
  async getBlogsByTags(tags: string[]): Promise<any[]> {
    const result = await this.getBlogs({ tags });
    return result.blogs;
  }

  // Search blog posts
  async searchBlogs(query: string): Promise<any[]> {
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

// Export types for use in components
export type { BlogPost, Author, Category, Tag };
