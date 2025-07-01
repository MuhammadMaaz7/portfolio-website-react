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
      "id": 1,
      "title": "Task Management App",
      "description": "Full-stack collaborative task management platform",
      "longDescription": "A modern, feature-rich task management application built with React and Node.js. Features drag-and-drop task reordering, real-time collaboration with user permissions, email notifications, CSV/PDF export capabilities, and comprehensive task organization tools. Includes user authentication, task sharing with view/edit permissions, activity tracking, and automated email reminders for due dates.",
      "image": "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      "technologies": ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Vite", "Docker"],
      "category": "Productivity",
      "liveUrl": "https://task-management-application-client-one.vercel.app/",
      "githubUrl": "https://github.com/MuhammadMaaz7/task-management-application",
      "features": [
        "Drag-and-drop task reordering with @dnd-kit",
        "User authentication and authorization",
        "Task sharing with view/edit permissions",
        "Real-time task collaboration",
        "Priority levels and due date management",
        "Email notifications for due dates and overdue tasks",
        "CSV and PDF export functionality",
        "Task activity tracking and comments",
        "Responsive design with Tailwind CSS",
        "Docker containerization and CI/CD pipeline"
      ],
      "gradient": "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Web-based weather dashboard with location-based forecasts and chatbot support',
      longDescription: 'A responsive weather dashboard that displays real-time weather information and 5-day forecasts using the OpenWeatherMap API. It uses geolocation to automatically detect the user’s current city and provides weather data accordingly. A built-in chatbot allows users to ask weather-related questions about their current location.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API', 'Geolocation API', 'Chatbot'],
      category: 'Web',
      liveUrl: 'https://muhammadmaaz7.github.io/Weather-Dashboard/index.html',
      githubUrl: 'https://github.com/muhammadmaaz7/Weather-Dashboard',
      features: [
        'Auto-detects user’s location using Geolocation API',
        'Displays real-time weather data (temperature, humidity, wind)',
        '5-day weather forecast',
        'Interactive chatbot that answers weather questions for the current city',
        'Clean, responsive, and user-friendly UI'
      ],
      gradient: 'from-blue-400 to-indigo-600'
    },    
    {
      id: 3,
      title: 'GoLocal Guide',
      description: 'A full-featured local tourism platform with booking, planning, and real-time support',
      longDescription: 'GoLocal Guide is a comprehensive local tourism management system built to help tourists discover and book local services like hotels, restaurants, and tour guides across various cities in Pakistan. As part of a team project, I was responsible for the complete development of the Tourist Panel — both frontend and backend — including core booking features, personalized dashboards, and itinerary planning. I also created the landing page and designed the login/signup user flows. The platform includes 4 major user panels: Admin, Tourist, Guide, and Business, each with its own set of features and dashboards.',
      image: 'https://images.pexels.com/photos/290120/pexels-photo-290120.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Firebase', 'OpenWeather API', 'Tailwind CSS', 'REST API', 'Vercel'],
      category: 'Web',
      liveUrl: 'https://golocal-guide.vercel.app/',
      githubUrl: 'https://github.com/MuhammadMaaz7/golocal-guide',
      features: [
        'Multi-role access: Tourist, Guide, Admin, Business',
        'Tourist Panel: Search destinations, book hotels/restaurants/guides',
        'Location-based discovery and AI-powered recommendations',
        'Secure login and JWT-based authentication system',
        'Interactive booking with real-time availability',
        'Responsive landing page and personalized dashboards',
        'Payment system integration for online bookings',
        'Review and rating system for destinations and services'
      ],
      gradient: 'from-green-500 to-emerald-700'
    }
  ];

  const categories = ['All', 'Full Stack', 'Productivity'];

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