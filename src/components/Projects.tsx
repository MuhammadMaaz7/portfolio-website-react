import { useState, useEffect } from "react";
import { ExternalLink, Github, Eye, X, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: "Task Management App",
      description: "Full-stack collaborative task management platform with real-time features",
      longDescription:
        "A modern, feature-rich task management application built with React and Node.js. Features drag-and-drop task reordering, real-time collaboration with user permissions, email notifications, CSV/PDF export capabilities, and comprehensive task organization tools. Includes user authentication, task sharing with view/edit permissions, activity tracking, and automated email reminders for due dates.",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Vite",
        "Docker",
      ],
      category: "Full Stack",
      liveUrl: "https://task-management-application-client-one.vercel.app/",
      githubUrl: "https://github.com/MuhammadMaaz7/task-management-application",
      features: [
        "Drag-and-drop task reordering with @dnd-kit",
        "User authentication and authorization",
        "Task sharing with view/edit permissions",
        "Real-time task collaboration",
        "Priority levels and due date management",
        "Email notifications for due dates and overdue tasks",
        "CSV and PDF export functionality",
        "Task activity tracking and comments",
        "Responsive design with Tailwind CSS",
        "Docker containerization and CI/CD pipeline",
      ],
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather application with geolocation and AI chatbot integration",
      longDescription:
        "A responsive weather dashboard that displays real-time weather information and 5-day forecasts using the OpenWeatherMap API. It uses geolocation to automatically detect the user's current city and provides weather data accordingly. A built-in chatbot allows users to ask weather-related questions about their current location.",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "OpenWeather API",
        "Geolocation API",
        "Chatbot",
      ],
      category: "Web",
      liveUrl: "https://muhammadmaaz7.github.io/Weather-Dashboard/index.html",
      githubUrl: "https://github.com/muhammadmaaz7/Weather-Dashboard",
      features: [
        "Auto-detects user's location using Geolocation API",
        "Displays real-time weather data (temperature, humidity, wind)",
        "5-day weather forecast",
        "Interactive chatbot that answers weather questions for the current city",
        "Clean, responsive, and user-friendly UI",
      ],
      gradient: "from-blue-400 to-indigo-600"
    },
    {
      id: 3,
      title: "GoLocal Guide",
      description: "Comprehensive tourism platform with multi-role booking system",
      longDescription:
        "GoLocal Guide is a comprehensive local tourism management system built to help tourists discover and book local services like hotels, restaurants, and tour guides across various cities in Pakistan. As part of a team project, I was responsible for the complete development of the Tourist Panel — both frontend and backend — including core booking features, personalized dashboards, and itinerary planning. I also created the landing page and designed the login/signup user flows. The platform includes 4 major user panels: Admin, Tourist, Guide, and Business, each with its own set of features and dashboards.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Auth",
        "Firebase",
        "OpenWeather API",
        "Tailwind CSS",
        "REST API",
        "Vercel",
      ],
      category: "Full Stack",
      liveUrl: "https://golocal-guide.vercel.app/",
      githubUrl: "https://github.com/MuhammadMaaz7/golocal-guide",
      features: [
        "Multi-role access: Tourist, Guide, Admin, Business",
        "Tourist Panel: Search destinations, book hotels/restaurants/guides",
        "Location-based discovery and AI-powered recommendations",
        "Secure login and JWT-based authentication system",
        "Interactive booking with real-time availability",
        "Responsive landing page and personalized dashboards",
        "Payment system integration for online bookings",
        "Review and rating system for destinations and services",
      ],
      gradient: "from-green-500 to-emerald-700"
    },
    {
      id: 4,
      title: "Word Ladder Adventure",
      description: "AI-powered word puzzle game with multiple pathfinding algorithms",
      longDescription:
        "Word Ladder Adventure is a game where players transform a start word into a target word by changing one letter at a time, with each step being a valid English word. I built both the frontend and backend of the application using React and FastAPI. The backend features three different search algorithms (UCS, A*, GBFS) and dynamically generates puzzles based on difficulty. The game also provides hints and keeps track of session scores using in-memory logic. The frontend is deployed on Vercel, and the backend is hosted via Railway.",
      technologies: [
        "React.js",
        "FastAPI",
        "Python",
        "Uvicorn",
        "Railway",
        "Vercel",
        "CORS",
        "UUID",
        "Tailwind CSS",
      ],
      category: "Web",
      liveUrl: "https://word-ladder-adventure-frontend.vercel.app/",
      githubUrl: "https://github.com/MuhammadMaaz7/word-ladder-adventure",
      features: [
        "Three difficulty levels: Beginner, Intermediate, Advanced",
        "AI algorithms: Uniform Cost Search, A*, Greedy Best-First Search",
        "Backend with FastAPI deployed on Railway",
        "Frontend with React.js deployed on Vercel",
        "Session-based gameplay with UUID tracking",
        "Hint system powered by AI pathfinding",
        "CORS configuration for cross-origin support",
        "Mobile-responsive UI with interactive game flow",
      ],
      gradient: "from-cyan-500 to-teal-600"
    },
    {
      id: 5,
      title: "PixelRNN Image Completion",
      description: "Deep learning model for image inpainting using RowLSTM architecture",
      longDescription:
        "A PixelRNN-based image completion model that reconstructs occluded regions of images using sequential pixel prediction. Unlike convolutional approaches that predict all pixels in parallel, this autoregressive model predicts each pixel conditioned on all previously generated ones. The RowLSTM variant processes images row by row, learning spatial and contextual dependencies. Trained on bedroom images with 64×64 resolution, achieving 26.9 dB PSNR. Features a Streamlit interface for interactive visualization of occluded inputs, reconstructed outputs, and ground-truth comparisons.",
      technologies: [
        "Python",
        "PyTorch",
        "Streamlit",
        "NumPy",
        "PIL",
        "LSTM",
        "Computer Vision",
        "Deep Learning",
      ],
      category: "AI/ML",
      liveUrl: "https://image-completion.streamlit.app/",
      githubUrl: "https://github.com/MuhammadMaaz7/pixelrnn-image-completion",
      features: [
        "RowLSTM architecture for sequential pixel prediction",
        "Autoregressive image generation with spatial dependencies",
        "7×7 masked convolution for feature extraction",
        "Two stacked RowLSTM layers with 128 hidden channels",
        "Combined MSE and Perceptual loss optimization",
        "Interactive Streamlit interface for real-time visualization",
        "Trained on bedroom occluded images dataset",
        "Achieved 26.9 dB PSNR with 0.0275 validation MSE",
        "Adam optimizer with gradient clipping",
        "Batch processing with efficient 64×64 image handling",
      ],
      gradient: "from-purple-500 to-pink-600"
    },
  ];

  const categories = ["All", "Full Stack", "AI/ML", "Web"];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Modern 3D Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #06b6d4 0%, transparent 50%)",
              "radial-gradient(circle at 70% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 30% 60%, #06b6d4 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #06b6d4 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* 3D Geometric Shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A showcase of my recent work, demonstrating expertise across various
            technologies and industries.
          </motion.p>
        </motion.div>
        {/* Modern Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-xl border ${activeCategory === category
                ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white shadow-2xl shadow-cyan-500/25 border-white/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 border-white/10 hover:shadow-xl"
                }`}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.gradient}`}></div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>


                </div>

                {/* Technologies */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-slate-300 text-xs rounded-md font-medium hover:bg-white/20 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white/5 text-slate-400 text-xs rounded-md">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto p-6 pt-4 border-t border-white/5">
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 border border-blue-500/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </motion.button>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Live Demo"
                    >
                      <ExternalLink size={14} />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Source Code"
                    >
                      <Github size={14} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Project Modal - Rendered at root level */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-3xl rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/[0.15] shadow-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Header */}
              <div className="relative p-8 pb-6">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl transition-all duration-300 text-white/80 hover:text-white border border-white/10 hover:border-white/20"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 pr-16">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${selectedProject.gradient} shadow-lg`}></div>
                      <span className="text-sm font-medium text-white/60 uppercase tracking-widest">
                        {selectedProject.category}
                      </span>
                    </div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="flex flex-row gap-3">
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-xl text-white rounded-2xl font-medium border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300"
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </motion.a>
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white rounded-2xl font-medium border border-white/20 hover:border-white/30 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-8 pb-8 modal-scroll">
                {/* Description */}
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-lg">
                    <p className="text-white/90 leading-relaxed text-lg font-light">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                </div>

                {/* Split Layout for Features and Technologies */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Key Features */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-br from-cyan-500/[0.08] via-blue-500/[0.05] to-transparent backdrop-blur-xl rounded-3xl p-8 border border-cyan-400/20 hover:border-cyan-400/30 transition-all duration-500 h-full shadow-lg hover:shadow-cyan-500/10">
                      <div className="flex items-center space-x-4 mb-8">
                        <div className="p-3 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur-xl rounded-2xl border border-cyan-400/30">
                          <Code size={22} className="text-cyan-300" />
                        </div>
                        <h4 className="text-2xl font-semibold text-white">Key Features</h4>
                      </div>
                      <ul className="space-y-4">
                        {selectedProject.features.map(
                          (feature: string, index: number) => (
                            <motion.li
                              key={index}
                              className="flex items-start space-x-4 group/item"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-3 flex-shrink-0 shadow-lg shadow-cyan-400/50 group-hover/item:shadow-cyan-400/80 transition-all duration-300"></div>
                              <span className="text-white/80 leading-relaxed font-light group-hover/item:text-white transition-colors duration-300">
                                {feature}
                              </span>
                            </motion.li>
                          )
                        )}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Technologies Used */}
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="bg-gradient-to-br from-emerald-500/[0.08] via-teal-500/[0.05] to-transparent backdrop-blur-xl rounded-3xl p-8 border border-emerald-400/20 hover:border-emerald-400/30 transition-all duration-500 h-full shadow-lg hover:shadow-emerald-500/10">
                      <div className="flex items-center space-x-4 mb-8">
                        <div className="p-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 backdrop-blur-xl rounded-2xl border border-emerald-400/30">
                          <Code size={22} className="text-emerald-300" />
                        </div>
                        <h4 className="text-2xl font-semibold text-white">Technologies</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map(
                          (tech: string, index: number) => (
                            <motion.span
                              key={index}
                              className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl text-white/90 hover:text-white rounded-2xl font-medium transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.5 + index * 0.05,
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;