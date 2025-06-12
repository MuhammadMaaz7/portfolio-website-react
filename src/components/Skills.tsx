import React from 'react';
import { Code2, Database, Globe, Smartphone, Server, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Programming',
      icon: <Code2 className="text-[#457b9d] dark:text-[#a8dadc]" size={32} />,
      skills: [
        { name: 'Python', level: 70 },
        { name: 'C/C++', level: 65 },
        { name: 'Java (basics)', level: 60 },
        { name: 'Problem Solving', level: 75 },
      ],
      gradient: 'from-[#a8dadc] to-[#457b9d]'
    },
    {
      title: 'Frontend',
      icon: <Code2 className="text-[#457b9d] dark:text-[#a8dadc]" size={32} />,
      skills: [
        { name: 'React JS', level: 80 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML', level: 95 },
        { name: 'Tailwind', level: 85 },
        { name: 'Redux', level: 85 }
      ],
      gradient: 'from-[#457b9d] to-[#a8dadc]'
    },
    {
      title: 'Backend',
      icon: <Server className="text-[#457b9d] dark:text-[#a8dadc]" size={32} />,
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'Express.js', level: 70 },
        { name: 'REST APIs', level: 70 },
        { name: 'JWT', level: 65 },
        { name: 'Microservices', level: 60 },
      ],
      gradient: 'from-[#1d3557] to-[#457b9d]'
    },
    {
      title: 'Databases',
      icon: <Database className="text-[#457b9d] dark:text-[#a8dadc]" size={32} />,
      skills: [
        { name: 'MongoDB', level: 70 },
        { name: 'MySQL', level: 65 },
        { name: 'MS SQL Server', level: 60 },
        { name: 'PostgreSQL', level: 60 }
      ],
      gradient: 'from-[#1d3557] to-[#a8dadc]'
    },
    {
      title: 'Tools',
      icon: <Palette className="text-[#457b9d] dark:text-[#a8dadc]" size={32} />,
      skills: [
        { name: 'Git', level: 80 },
        { name: 'Linux', level: 70 },
        { name: 'Docker', level: 60 },
        { name: 'Kubernetes', level: 55 },
      ],
      gradient: 'from-[#457b9d] to-[#1d3557]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#a8dadc]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1d3557] dark:text-[#a8dadc] mb-6">
            Technical <span className="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern, scalable applications across the full technology stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <motion.div
                className="flex items-center mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl mr-4"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
              </motion.div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: (index * 0.1) + (skillIndex * 0.1) }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: (index * 0.1) + (skillIndex * 0.1),
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Version Control (Git)',
              'Debugging',
              'Agile/Scrum Basics',
              'Code Review',
              'Unit Testing',
              'API Integration',
              'Basic Algorithms',
              'Data Structures',
              'Team Collaboration',
              'Communication',
              'Time Management',
              'Willingness to Learn',
            ].map((skill, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 hover:border-[#457b9d] dark:hover:border-[#a8dadc] hover:shadow-sm transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;