import React, { useState } from 'react';
import { ExternalLink, Github, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features',
      longDescription: 'A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration with Stripe, admin dashboard, inventory management, and real-time notifications.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'JWT'],
      category: 'Full Stack',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'User authentication and authorization',
        'Shopping cart and wishlist functionality',
        'Secure payment processing',
        'Admin dashboard for inventory management',
        'Real-time order tracking',
        'Responsive design for all devices'
      ],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management',
      longDescription: 'A comprehensive social media analytics dashboard that aggregates data from multiple platforms. Built with React and D3.js for data visualization, featuring real-time updates and customizable reports.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'Python', 'Flask', 'PostgreSQL', 'Redis'],
      category: 'Data Visualization',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Multi-platform data aggregation',
        'Interactive data visualizations',
        'Real-time analytics updates',
        'Custom report generation',
        'User engagement metrics',
        'Export functionality for reports'
      ],
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative project management tool',
      longDescription: 'A modern task management application inspired by Trello and Asana. Features drag-and-drop functionality, real-time collaboration, file attachments, and team management capabilities.',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io'],
      category: 'Productivity',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Drag-and-drop task management',
        'Real-time collaboration',
        'File attachment support',
        'Team and project organization',
        'Due date and priority management',
        'Activity tracking and notifications'
      ],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 4,
      title: 'Weather Forecast App',
      description: 'Beautiful weather app with location-based forecasts',
      longDescription: 'A sleek weather application that provides detailed forecasts based on user location. Features include hourly and weekly forecasts, weather maps, and severe weather alerts.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'TypeScript', 'Weather API', 'Maps API'],
      category: 'Mobile',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Location-based weather data',
        'Hourly and 7-day forecasts',
        'Interactive weather maps',
        'Severe weather alerts',
        'Beautiful animations and transitions',
        'Offline data caching'
      ],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'Modern blogging platform with CMS features',
      longDescription: 'A full-featured blogging platform with content management system capabilities. Includes rich text editor, SEO optimization, comment system, and social media integration.',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'Sanity CMS', 'Tailwind CSS', 'Vercel'],
      category: 'CMS',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Rich text editor with markdown support',
        'SEO optimization features',
        'Comment system with moderation',
        'Social media integration',
        'Tag and category management',
        'Analytics and performance tracking'
      ],
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: 6,
      title: 'Crypto Portfolio Tracker',
      description: 'Real-time cryptocurrency portfolio management',
      longDescription: 'A comprehensive cryptocurrency portfolio tracker with real-time price updates, portfolio analytics, and market insights. Features advanced charting and price alert functionality.',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Chart.js', 'CoinGecko API', 'Firebase'],
      category: 'Finance',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Real-time price tracking',
        'Portfolio performance analytics',
        'Advanced charting capabilities',
        'Price alerts and notifications',
        'Market news integration',
        'Multiple exchange support'
      ],
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const categories = ['All', 'Full Stack', 'Data Visualization', 'Productivity', 'Mobile', 'CMS', 'Finance'];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1d3557] dark:text-[#a8dadc] mb-6">
            Featured <span className="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, demonstrating expertise across various technologies and industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#f1faee] dark:hover:bg-[#1d3557] hover:text-[#1d3557] dark:hover:text-[#a8dadc]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group"
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="p-4 w-full">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          className="flex-1 bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye size={16} />
                          <span>View Details</span>
                        </motion.button>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 text-gray-900 rounded-lg hover:bg-white transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 text-gray-900 rounded-lg hover:bg-white transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={16} />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 bg-gradient-to-r from-[#1d3557] to-[#457b9d] text-white text-xs rounded-full font-medium`}>
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h3>
                      <span className={`px-3 py-1 bg-gradient-to-r from-[#1d3557] to-[#457b9d] text-white rounded-full text-sm font-medium`}>
                        {selectedProject.category}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1d3557] to-[#457b9d] text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </motion.a>
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </motion.a>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature: string, index: number) => (
                          <motion.li
                            key={index}
                            className="flex items-start space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#1d3557] to-[#457b9d] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string, index: number) => (
                          <motion.span
                            key={index}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;