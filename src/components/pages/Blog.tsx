import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Tag, Search } from 'lucide-react';
import blogData from '../../data/blog.json';

interface BlogPost {
  id: string;
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
}

interface BlogListProps {
  posts: BlogPost[];
  onPostClick: (slug: string) => void;
}

const BlogCard: React.FC<{ post: BlogPost; onPostClick: (slug: string) => void }> = ({ post, onPostClick }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-tertiary p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 group cursor-pointer"
      onClick={() => onPostClick(post.slug)}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-300 text-sm line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const BlogList: React.FC<BlogListProps> = ({ posts, onPostClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors duration-300"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} onPostClick={onPostClick} />
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No blog posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

const BlogPost: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  useEffect(() => {
    // Update page title and meta tags for SEO
    document.title = post.seo.metaTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.seo.metaDescription);
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.featuredImage,
      "author": {
        "@type": "Person",
        "name": post.author,
        "image": post.authorImage
      },
      "publisher": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Blog</span>
      </button>

      {/* Featured Image */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Author Bio */}
      <div className="mt-12 p-6 bg-gray-800 rounded-2xl">
        <div className="flex items-center gap-4">
          <img
            src={post.authorImage}
            alt={post.author}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{post.author}</h3>
            <p className="text-gray-300">
              Passionate 3D web developer creating immersive digital experiences with React and Three.js.
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Blog: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'post'>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { slug } = useParams<{ slug: string }>();
  
  const posts: BlogPost[] = blogData.blogs;

  useEffect(() => {
    // Set up SEO meta tags for the blog page
    document.title = 'Blog - Amir Qafari | 3D Web Developer';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore insights on 3D web development, React, TypeScript, and modern web technologies. Learn from practical tutorials and best practices.');
    }
    
    // Add structured data for the blog
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Amir Qafari's Blog",
      "description": "A blog about 3D web development, React, TypeScript, and modern web technologies",
      "url": window.location.href,
      "author": {
        "@type": "Person",
        "name": "Amir Qafari",
        "url": "https://amirqafari.vercel.app"
      },
      "publisher": {
        "@type": "Person",
        "name": "Amir Qafari"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (slug) {
      const post = posts.find(p => p.slug === slug);
      if (post) {
        setSelectedPost(post);
        setCurrentView('post');
      }
    }
  }, [slug, posts]);

  const handlePostClick = (postSlug: string) => {
    const post = posts.find(p => p.slug === postSlug);
    if (post) {
      setSelectedPost(post);
      setCurrentView('post');
      window.history.pushState({}, '', `/blog/${postSlug}`);
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPost(null);
    window.history.pushState({}, '', '/blog');
  };

  return (
    <div className="bg-primary relative z-0 min-h-screen">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {currentView === 'list' ? (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  My Blog
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Insights on 3D web development, React, TypeScript, and modern web technologies. 
                  Learn from practical tutorials and best practices.
                </p>
              </motion.div>
              
              <BlogList posts={posts} onPostClick={handlePostClick} />
            </div>
          ) : (
            selectedPost && <BlogPost post={selectedPost} onBack={handleBackToList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
