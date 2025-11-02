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
      icon: <Code2 size={32} />,
      description: 'Building complete web applications from frontend interfaces to backend systems with modern frameworks and best practices',
      color: 'from-[#1d3557] to-[#457b9d]'
    },
    {
      title: 'DevOps & Automation',
      icon: <Cloud size={32} />,
      description: 'Streamlining development workflows through containerization, CI/CD pipelines, and cloud deployment strategies',
      color: 'from-[#457b9d] to-[#a8dadc]'
    },
    {
      title: 'AI & Machine Learning',
      icon: <Brain size={32} />,
      description: 'Implementing intelligent solutions using deep learning models, computer vision, and neural network architectures',
      color: 'from-[#a8dadc] to-[#e63946]'
    },
    {
      title: 'Database Design',
      icon: <Database size={32} />,
      description: 'Architecting scalable data solutions with both SQL and NoSQL databases for optimal performance and reliability',
      color: 'from-[#e63946] to-[#1d3557]'
    },
    {
      title: 'API Development',
      icon: <Server size={32} />,
      description: 'Creating robust RESTful services and microservices architecture for seamless system integration',
      color: 'from-[#457b9d] to-[#1d3557]'
    },
    {
      title: 'Problem Solving',
      icon: <Wrench size={32} />,
      description: 'Analytical thinking and creative approaches to tackle complex technical challenges and optimize solutions',
      color: 'from-[#1d3557] to-[#a8dadc]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#a8dadc]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1d3557] dark:text-[#a8dadc] mb-6">
            Technical <span className="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I do all kinds of neat stuff
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 text-center"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              {/* Icon */}
              <motion.div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              >
                {category.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          {[
            { label: 'Technologies', value: '20+' },
            { label: 'Projects Built', value: '8+' },
            { label: 'Years Learning', value: '3+' },
            { label: 'Frameworks', value: '10+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.05 }}
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            >
              <div className="text-2xl font-bold text-[#1d3557] dark:text-[#a8dadc] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Skills;