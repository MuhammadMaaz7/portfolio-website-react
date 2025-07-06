import React, { useRef, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';

const Hero = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      bgRef.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(1.03)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#f1faee] via-white to-[#a8dadc] dark:from-[#1d3557] dark:via-[#457b9d] dark:to-[#a8dadc] pt-24 pb-12">
      <div ref={bgRef} className="absolute inset-0 -z-10 transition-transform duration-300 will-change-transform">
        <ThreeBackground />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#457b9d] to-[#a8dadc] rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-[#1d3557] to-[#457b9d] rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center w-full text-center">
          {/* Profile Image with 3D effect */}
          <motion.div
            className="mb-8 relative flex flex-col items-center justify-center"
            variants={itemVariants}
          >
            <motion.div
              className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] p-1 relative shadow-xl"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: '0 0 40px 10px #a8dadc',
                transition: { duration: 0.3 }
              }}
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  '0 0 40px 0px #a8dadc',
                  '0 0 60px 10px #457b9d',
                  '0 0 40px 0px #a8dadc'
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-5xl font-bold text-gray-600 dark:text-gray-300 relative overflow-hidden shadow-inner">
                <img
                  src="/picture.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute inset-0 w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 text-center"
            variants={itemVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Muhammad Maaz
            </motion.span>
          </motion.h1>

          <motion.div
            className="space-y-4 mb-8 w-full max-w-2xl mx-auto text-center"
            variants={itemVariants}
          >
            <motion.p
              className="text-lg sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light text-center"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Junior Software Engineer
            </motion.p>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed text-center"
              variants={itemVariants}
            >
              Enthusiastic about building software, learning new technologies, and solving real-world problems. Eager to contribute to collaborative projects, grow as an engineer, and make a positive impact through code.
            </motion.p>
          </motion.div>

          {/* Animated Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            variants={itemVariants}
          >
            {[
              { icon: Github, href: "https://github.com/MuhammadMaaz7", color: "hover:text-gray-900 dark:hover:text-white" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-maaz-uddin-512b4b26b/", color: "hover:text-blue-600" },
              { icon: Mail, href: "mailto:maazawan100@gmail.com", color: "hover:text-red-500" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300`}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] text-white rounded-full font-semibold text-lg shadow-xl relative overflow-hidden focus:outline-none"
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 0 30px 0 #a8dadc, 0 25px 50px -12px rgba(0,0,0,0.25)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Explore My Work</span>
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-[#457b9d] to-[#a8dadc] text-white rounded-full font-semibold text-lg shadow-xl border-2 border-[#a8dadc] hover:border-[#1d3557] relative overflow-hidden focus:outline-none"
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 0 30px 0 #457b9d, 0 25px 50px -12px rgba(0,0,0,0.25)"
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Download size={20} />
                <span>Get In Touch</span>
              </span>
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.button
            onClick={scrollToNext}
            className="text-gray-400 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.2 }}
          >
            <ChevronDown size={40} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;