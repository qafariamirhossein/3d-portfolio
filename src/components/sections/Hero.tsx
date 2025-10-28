import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { ComputersCanvas, Particles } from "../canvas";
import { config } from "../../constants/config";
import { useTheme } from "../../contexts/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className={`relative mx-auto h-screen w-full overflow-hidden`}>
      {/* Background Particles */}
      <Particles count={1000} theme={theme} />

      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <motion.div 
            className={`h-5 w-5 rounded-full ${
              theme === 'dark' ? 'bg-[#915EFF]' : 'bg-[#4F46E5]'
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className={`violet-gradient h-40 w-1 sm:h-80 ${
            theme === 'light' ? 'opacity-60' : ''
          }`} />
        </div>

        <div>
          <motion.h1 
            className={`${styles.heroHeadText} ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm <span className={`${
              theme === 'dark' ? 'text-[#915EFF]' : 'text-[#4F46E5]'
            }`}>{config.hero.name}</span>
          </motion.h1>
          <motion.p 
            className={`${styles.heroSubText} ${
              theme === 'dark' ? 'text-white-100' : 'text-gray-600'
            } mt-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </motion.p>
          
          {/* Animated typing effect for additional text */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p 
              className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Specializing in AI & Web3 Solutions
            </motion.p>
          </motion.div>
        </div>
      </div>

      <ComputersCanvas />

      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center z-10">
        <motion.a 
          href="#about" 
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('about');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`border-4 ${
            theme === 'dark' ? 'border-secondary' : 'border-gray-400'
          } flex h-[64px] w-[35px] items-start justify-center rounded-3xl p-2 group-hover:border-opacity-80 transition-all duration-300`}>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className={`${
                theme === 'dark' ? 'bg-secondary' : 'bg-gray-400'
              } mb-1 h-3 w-3 rounded-full`}
            />
          </div>
        </motion.a>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  );
};

export default Hero;
