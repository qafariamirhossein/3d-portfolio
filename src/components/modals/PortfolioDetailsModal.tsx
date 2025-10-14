import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Users, Clock, Building } from 'lucide-react';
import { TProject } from '../../types';

interface PortfolioDetailsModalProps {
  project: TProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioDetailsModal: React.FC<PortfolioDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-6xl max-h-[90vh] w-full mx-4 bg-tertiary rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6 space-y-6">
                {/* Main Image/Video */}
                <div className="relative">
                  {project.video ? (
                    <video
                      className="w-full h-64 object-cover rounded-lg"
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
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioDetailsModal;
