import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Eye } from "lucide-react";

import { github } from "../../assets";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";
import { styles } from "../../constants/styles";

const ProjectCard: React.FC<{ index: number } & TProject & { onViewDetails: (projectId: string) => void }> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
  liveDemoLink,
  onViewDetails,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.1, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <Tilt
        glareEnable={!isMobile}
        tiltEnable={false}
        glareColor="#aaa6c3"
      >
        <div 
          className="bg-tertiary w-full sm:w-[355px] rounded-2xl p-5 relative overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[230px] w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Hover Overlay - Hidden on mobile, visible on desktop hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 bg-black bg-opacity-60 rounded-2xl hidden sm:flex items-center justify-center group-hover:scale-105"
            >
              <div className="flex space-x-3">
                {/* View Details Button */}
                <button
                  onClick={() => onViewDetails(id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Details</span>
                </button>
                
                {/* Live Demo Button */}
                {liveDemoLink && (
                  <a
                    href={liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Mobile Touch Overlay - Always visible on mobile */}
            <div className="absolute inset-0 z-10 bg-black bg-opacity-60 rounded-2xl flex sm:hidden items-center justify-center">
              <div className="flex space-x-3">
                {/* View Details Button */}
                <button
                  onClick={() => onViewDetails(id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Details</span>
                </button>
                
                {/* Live Demo Button */}
                {liveDemoLink && (
                  <a
                    href={liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Original GitHub Link (always visible) */}
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
              <div
                onClick={() => window.open(sourceCodeLink, "_blank")}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:scale-110 transition-transform"
              >
                <img
                  src={github}
                  alt="github"
                  className="h-1/2 w-1/2 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
            <p className="text-secondary mt-2 text-[14px] line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetails = (projectId: string) => {
    navigate(`/portfolio/${projectId}`);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 6, projects.length));
      setIsLoading(false);
    }, 500);
  };

  // Projects are already sorted by order in constants/index.ts
  const displayedProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < projects.length;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0, margin: "-100px 0px" }}
      className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
      id="work"
    >
      <span className="hash-span">&nbsp;</span>
      
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {displayedProjects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`} 
            index={index} 
            {...project} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProjects && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                Load More Projects
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Works;
