import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Clock, Building } from 'lucide-react';
import { projects } from '../../constants';
import { TProject } from '../../types';

const PortfolioDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<TProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        // Project not found, redirect to home
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <h1 className="text-xl font-bold text-white">{project.name}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleBackClick}
          className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Portfolio</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-tertiary rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Main Image/Video */}
          <div className="relative">
            {project.video ? (
              <video
                className="w-full h-64 md:h-96 object-contain bg-black"
                controls
                poster={project.image}
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Additional Videos */}
            {project.additionalVideos && project.additionalVideos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Additional Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.additionalVideos.map((videoUrl, index) => (
                    <video
                      key={index}
                      className="w-full h-48 md:h-64 object-contain rounded-lg bg-black"
                      controls
                      poster={project.image}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.name} - Image ${index + 1}`}
                      className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${
                        activeImageIndex === index
                          ? 'ring-2 ring-blue-500'
                          : 'hover:opacity-80'
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">Project Details</h3>
                <div className="space-y-2">
                  {project.duration && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">Duration: {project.duration}</span>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Team Size: {project.teamSize}</span>
                    </div>
                  )}
                  {project.role && (
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-300">Role: {project.role}</span>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-300">Year: {project.year}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges & Solutions */}
            {(project.challenges || project.solutions) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenges && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Challenges</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span className="text-gray-300">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.solutions && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Solutions</h3>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span className="text-gray-300">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className={`text-sm px-3 py-1 rounded-full ${tag.color}`}>
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700">
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              <a
                href={project.sourceCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
