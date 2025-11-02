import React from 'react';
import { Code2, Database, Server, Cloud, Wrench, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Full Stack Development',
      icon: <Code2 size={28} />,
      description: 'Building complete web applications from frontend interfaces to backend systems with modern frameworks and best practices',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'DevOps & Automation',
      icon: <Cloud size={28} />,
      description: 'Streamlining development workflows through containerization, CI/CD pipelines, and cloud deployment strategies',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      title: 'AI & Machine Learning',
      icon: <Brain size={28} />,
      description: 'Implementing intelligent solutions using deep learning models, computer vision, and neural network architectures',
      color: 'from-teal-500 to-emerald-500'
    },
    {
      title: 'Database Design',
      icon: <Database size={28} />,
      description: 'Architecting scalable data solutions with both SQL and NoSQL databases for optimal performance and reliability',
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'API Development',
      icon: <Server size={28} />,
      description: 'Creating robust RESTful services and microservices architecture for seamless system integration',
      color: 'from-green-500 to-lime-500'
    },
    {
      title: 'Problem Solving',
      icon: <Wrench size={28} />,
      description: 'Analytical thinking and creative approaches to tackle complex technical challenges and optimize solutions',
      color: 'from-lime-500 to-blue-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="skills" className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 40% 80%, #14b8a6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 20%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 60% 80%, #14b8a6 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 40% 80%, #14b8a6 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2]
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
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I do all kinds of neat stuff
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 text-center overflow-hidden min-h-[320px] flex flex-col justify-center">

                {/* Animated Border Gradient */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, transparent, ${category.color.split(' ')[1]}, transparent)`,
                    padding: '2px'
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* 3D Icon */}
                  <motion.div
                    className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-6 shadow-lg`}
                    whileHover={{
                      scale: 1.2,
                      rotateY: 180,
                      rotateX: 15
                    }}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      },
                      scale: { duration: 0.3 },
                      rotateY: { duration: 0.6 },
                      rotateX: { duration: 0.6 }
                    }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {category.icon}
                  </motion.div>

                  {/* Title with 3D Effect */}
                  <motion.h3
                    className="text-xl font-bold text-white mb-4"
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                    }}
                  >
                    {category.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-slate-300 leading-relaxed text-sm mt-4 px-2"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {category.description}
                  </motion.p>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;