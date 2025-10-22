/**
 * Example component showing how to use the Blog API service
 * This demonstrates how to integrate Strapi CMS with your React components
 */

import React, { useState, useEffect } from 'react';
import { blogApi, type TransformedBlogPost } from '../../api/blogApi';

interface BlogExampleProps {
  className?: string;
}

const BlogExample: React.FC<BlogExampleProps> = ({ className = '' }) => {
  const [blogs, setBlogs] = useState<TransformedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredBlogs, setFeaturedBlogs] = useState<TransformedBlogPost[]>([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load all blogs
      const blogsResult = await blogApi.getBlogs({
        pageSize: 6,
        sort: 'publishedAt:desc'
      });
      setBlogs(blogsResult.blogs);
      
      // Load featured blogs
      const featured = await blogApi.getFeaturedBlogs();
      setFeaturedBlogs(featured);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (slug: string) => {
    // Navigate to blog detail page
    console.log('Navigate to blog:', slug);
    // You can implement routing here
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <span className="ml-4 text-white">Loading blogs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-8 text-center ${className}`}>
        <div className="text-red-400 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-semibold">Error Loading Blogs</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
        <button
          onClick={loadBlogs}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Featured Blogs Section */}
      {featuredBlogs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleBlogClick(blog.slug)}
              >
                <div className="aspect-video bg-gray-700 flex items-center justify-center">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No Image</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-400 font-medium">{blog.category}</span>
                    <span className="text-sm text-gray-400">{blog.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-400">{blog.author}</span>
                    </div>
                    <span className="text-sm text-gray-400">{blog.publishedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* All Blogs Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleBlogClick(blog.slug)}
            >
              <div className="aspect-video bg-gray-700 flex items-center justify-center">
                {blog.featuredImage ? (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">No Image</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400 font-medium">{blog.category}</span>
                  <span className="text-sm text-gray-400">{blog.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-400">{blog.author}</span>
                  </div>
                  <span className="text-sm text-gray-400">{blog.publishedAt}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      +{blog.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* API Status */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          <div>
            <h3 className="text-green-400 font-semibold">Strapi CMS Connected</h3>
            <p className="text-green-300 text-sm">
              Successfully loaded {blogs.length} blog posts from Strapi CMS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogExample;
