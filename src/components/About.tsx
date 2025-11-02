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
      role: 'Frontend Developer (Part Time)',
      company: 'Freelance',
      period: 'Dec 2024 – Mar 2025',
      description: 'Built a responsive React web app integrated with Django APIs, delivering production-ready UI with smooth backend synchronization.',
      achievements: [
        'Developed responsive React application with seamless Django API integration',
        'Delivered production-ready UI with optimized performance and user experience'
      ],
      color: 'from-[#1d3557] to-[#457b9d]'
    },
    {
      role: 'Software Development Intern',
      company: 'OGDCL',
      period: 'Jun 2025 – Jul 2025',
      description: 'Built internal automation modules using MERN Stack and integrated APIs to optimize workflows for faster data handling.',
      achievements: [
        'Developed automation modules using MERN Stack for internal processes',
        'Integrated APIs and optimized workflows for enhanced data handling efficiency'
      ],
      color: 'from-[#457b9d] to-[#a8dadc]'
    },
    {
      role: 'Frappe Developer Intern',
      company: 'Osmany & Company (Pvt.) Ltd.',
      period: 'Jun 2024 – Aug 2024',
      description: 'Developed a Complaint Management System on ERPNext, designed database models and tested modules for reliability.',
      achievements: [
        'Designed database models and defined Doctypes with appropriate constraints',
        'Implemented complete CMS module using Frappe Framework',
        'Conducted comprehensive testing to ensure module reliability and ERPNext integration'
      ],
      color: 'from-emerald-400 to-green-400'
    }
  ];

  const stats = [
    { icon: Trophy, label: 'Projects Completed', value: '8+', color: 'text-cyan-400' },
    { icon: Users, label: 'Internships', value: '3', color: 'text-cyan-400' },
    { icon: Zap, label: 'Years Experience', value: '2+', color: 'text-cyan-400' },
    { icon: Award, label: 'Awards Won', value: '3', color: 'text-cyan-400' },
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
    <section id="about" className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Modern 3D Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 50% 20%, #14b8a6 0%, transparent 50%)",
              "radial-gradient(circle at 70% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 30% 60%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 50% 80%, #14b8a6 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 50% 20%, #14b8a6 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Elements */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-8"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Full Stack Developer & DevOps Enthusiast skilled in building scalable web applications using the MERN stack and cloud deployment. Experienced in API integration, CI/CD automation, and applying AI concepts in web solutions. Passionate about building efficient, reliable, and impactful products.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
              whileHover={{
                scale: 1.08,
                rotateY: 5,
                rotateX: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
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
              <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={40} />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Personal Info */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Personal Info</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: 'Islamabad, Pakistan', color: 'text-blue-400' },
                  { icon: Calendar, text: '2+ Years Experience', color: 'text-cyan-400' },
                  { icon: Award, text: '8+ Projects Completed', color: 'text-teal-400' },
                  { icon: Code, text: 'Full Stack Developer & AI Enthusiast', color: 'text-emerald-400' },
                  { icon: GraduationCap, text: 'BS Software Engineering, FAST NUCES (2022 – 2026)', color: 'text-green-400' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className={item.color} size={20} />
                    <span className="text-slate-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">What I Do</h3>
              <p className="text-slate-300 leading-relaxed">
                I specialize in building scalable web applications using the MERN stack, with expertise in
                DevOps practices and AI integration. My experience includes developing automation modules,
                implementing CI/CD pipelines, and creating innovative solutions like PixelRNN for image completion.
                I'm passionate about leveraging modern technologies to build efficient, reliable products that solve real-world problems.
              </p>
            </motion.div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white mb-8">Professional Journey</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-emerald-400"></div>

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
                    className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                      <span className="text-sm text-slate-400 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-cyan-400 font-semibold mb-3">{exp.company}</p>
                    <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">{achievement}</span>
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