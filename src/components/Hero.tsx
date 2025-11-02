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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      bgRef.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(1.02)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-24 pb-12">
      <div ref={bgRef} className="absolute inset-0 -z-10 transition-transform duration-300 will-change-transform">
        <ThreeBackground />
      </div>

      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full filter blur-3xl"
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
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 rounded-full filter blur-3xl"
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

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center w-full text-center">


          {/* Scattered Floating Code Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { symbol: '{ }', x: '8%', y: '15%', rotate: '12deg', delay: 0 },
              { symbol: '< />', x: '92%', y: '25%', rotate: '-18deg', delay: 1.2 },
              { symbol: '[ ]', x: '3%', y: '65%', rotate: '22deg', delay: 2.5 },
              { symbol: '( )', x: '88%', y: '78%', rotate: '-8deg', delay: 3.8 },
              { symbol: '=>', x: '12%', y: '42%', rotate: '28deg', delay: 0.7 },
              { symbol: '&&', x: '95%', y: '55%', rotate: '-32deg', delay: 4.2 },
              { symbol: '{ }', x: '18%', y: '88%', rotate: '15deg', delay: 1.8 },
              { symbol: '< />', x: '78%', y: '12%', rotate: '-25deg', delay: 3.1 },
              { symbol: '||', x: '6%', y: '35%', rotate: '35deg', delay: 2.2 },
              { symbol: '++', x: '85%', y: '45%', rotate: '-12deg', delay: 4.5 },
              { symbol: '!=', x: '25%', y: '8%', rotate: '18deg', delay: 1.5 },
              { symbol: '===', x: '72%', y: '92%', rotate: '-22deg', delay: 3.7 },
              { symbol: '?:', x: '2%', y: '78%', rotate: '25deg', delay: 0.3 },
              { symbol: '//', x: '96%', y: '18%', rotate: '-15deg', delay: 2.8 },
              { symbol: '**', x: '35%', y: '95%', rotate: '8deg', delay: 4.1 },
            ].map((item, index) => (
              <motion.span
                key={index}
                className="absolute text-cyan-400/30 font-mono text-base sm:text-lg md:text-xl select-none"
                style={{
                  left: item.x,
                  top: item.y,
                  transform: `rotate(${item.rotate})`
                }}
                animate={{
                  y: [0, -8, 0],
                  x: [0, Math.random() * 4 - 2, 0],
                  opacity: [0.15, 0.4, 0.15],
                  rotate: [item.rotate, `${parseInt(item.rotate) + 3}deg`, item.rotate]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
              >
                {item.symbol}
              </motion.span>
            ))}
          </div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 text-center"
            variants={itemVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
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
            className="space-y-6 mb-12 w-full max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-300 font-light text-center"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Full Stack Developer & AI Enthusiast
            </motion.p>

            <motion.p
              className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed text-center"
              variants={itemVariants}
            >
              Building scalable web applications with modern technologies. Passionate about creating
              efficient, reliable solutions that solve real-world problems.
            </motion.p>
          </motion.div>

          {/* Modern Social Links */}
          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-12 sm:mb-16"
            variants={itemVariants}
          >
            {[
              { icon: Github, href: "https://github.com/MuhammadMaaz7", color: "hover:bg-gray-700" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-maaz-uddin-512b4b26b/", color: "hover:bg-blue-600" },
              { icon: Mail, href: "mailto:maazawan100@gmail.com", color: "hover:bg-red-600" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-slate-300 ${social.color} transition-all duration-300`}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </motion.div>

          {/* Modern CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 sm:mb-20"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold text-lg shadow-2xl relative overflow-hidden focus:outline-none"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px 10px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 bg-white/5 backdrop-blur-xl text-white rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/10 relative overflow-hidden focus:outline-none"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Download size={20} />
                <span>Get In Touch</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Modern Scroll Indicator */}
          <motion.button
            onClick={scrollToNext}
            className="text-slate-400 hover:text-white transition-colors duration-300"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.2 }}
          >
            <ChevronDown size={32} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;