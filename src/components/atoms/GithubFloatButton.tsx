import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const GithubFloatButton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <motion.a
      href="https://github.com/qafariamirhossein"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-8 left-8 z-50
        flex items-center justify-center
        w-14 h-14
        rounded-full
        shadow-2xl
        transition-all duration-300
        ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
            : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'
        }
        group
        border-2 ${
          theme === 'dark'
            ? 'border-gray-700 hover:border-gray-600'
            : 'border-gray-300 hover:border-gray-400'
        }
      `}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-white"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Github 
          size={28} 
          className={theme === 'dark' ? 'text-white' : 'text-gray-800'} 
        />
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          theme === 'dark' ? 'bg-white' : 'bg-gray-800'
        } opacity-20`}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-500/30 to-blue-500/30' 
            : 'bg-gradient-to-br from-blue-400/30 to-purple-400/30'
        } opacity-0 group-hover:opacity-100`}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default GithubFloatButton;

