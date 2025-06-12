import React from 'react';
import { Calendar, MapPin, Award, Code, Zap, Users, Trophy, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      role: 'Frontend Developer',
      company: 'Techverse',
      period: 'Dec 2024 – Mar 2025',
      description: 'Migrated Queryverse UI to React.js, integrated backend APIs, and enhanced user experience for natural language database querying.',
      achievements: [
        'Built a responsive and user-friendly UI for real-time query execution',
        'Optimized performance and ensured seamless API integration'
      ],
      color: 'from-[#1d3557] to-[#457b9d]'
    },
    {
      role: 'ERP Developer Intern',
      company: 'Osmany & Company (Pvt.) Ltd.',
      period: 'Jun 2024 – Aug 2024',
      description: 'Developed a Complaint Management System module within ERPNext to automate and streamline the company\'s complaint handling process.',
      achievements: [
        'Designed the ERD and defined Doctypes with appropriate constraints',
        'Implemented the complete CMS module using the Frappe Framework',
        'Conducted testing to ensure smooth integration and functionality within ERPNext'
      ],
      color: 'from-[#457b9d] to-[#a8dadc]'
    }
  ];

  const stats = [
    { icon: Trophy, label: 'Projects Completed', value: '5+', color: 'text-[#457b9d] dark:text-[#a8dadc]' },
    { icon: Users, label: 'Happy Clients', value: '3+', color: 'text-[#457b9d] dark:text-[#a8dadc]' },
    { icon: Zap, label: 'Years Experience', value: '1+', color: 'text-[#457b9d] dark:text-[#a8dadc]' },
    { icon: Award, label: 'Awards Won', value: '2', color: 'text-[#457b9d] dark:text-[#a8dadc]' },
  ];

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

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d3557] to-[#457b9d] transform rotate-12 scale-150"></div>
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
            About <span className="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I am a passionate Junior Software Engineer with a strong foundation in programming and a drive to learn new technologies. I enjoy collaborating with others, tackling challenges, and continuously improving my skills to contribute to meaningful projects.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
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
              <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={40} />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Personal Info */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="bg-gradient-to-br from-[#f1faee] to-[#a8dadc] dark:from-[#1d3557] dark:to-[#457b9d]/20 rounded-2xl p-8 border border-[#a8dadc] dark:border-[#1d3557]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Info</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: 'Islamabad, Pakistan', color: 'text-[#1d3557]' },
                  { icon: Calendar, text: '1+ Year Experience', color: '[#457b9d]' },
                  { icon: Award, text: '5+ Projects Completed', color: 'text-[#a8dadc]' },
                  { icon: Code, text: 'MERN Stack Specialist', color: 'text-[#e63946]' },
                  { icon: GraduationCap, text: 'BS Software Engineering, FAST NUCES, Islamabad (2022 – 2026)', color: 'text-[#457b9d]' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className={item.color} size={20} />
                    <span className="text-gray-600 dark:text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Do</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I specialize in building modern web applications using cutting-edge technologies. 
                My expertise spans from creating responsive frontends with React to developing 
                robust backend APIs with Node.js. I'm passionate about writing clean, maintainable 
                code and delivering exceptional user experiences that make a lasting impact.
              </p>
            </motion.div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Professional Journey</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1d3557] via-[#457b9d] to-[#a8dadc]"></div>
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12 pb-12 last:pb-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className={`absolute left-2 w-4 h-4 bg-gradient-to-r ${exp.color} rounded-full border-4 border-white dark:border-gray-900 shadow-lg`}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)"
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-[#1d3557] dark:text-[#a8dadc] font-semibold mb-3">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#1d3557] to-[#457b9d] rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;