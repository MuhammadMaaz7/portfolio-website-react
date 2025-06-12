import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: false });

    try {
      // Send message to your email
      await emailjs.sendForm(
        'service_oy9d5yk',
        'template_ceubdgu',
        formRef.current!,
        'B2tSaHdAan64WRTIK'
      );

      // Send auto-reply to the user
      await emailjs.send(
        'service_oy9d5yk',
        'template_j8j643n',
        {
          name: formData.name,
          subject: formData.subject,
          from_name: 'Muhammad Maaz Uddin'
        },
        'B2tSaHdAan64WRTIK'
      );

      setStatus({ submitting: false, submitted: true, error: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({ submitting: false, submitted: false, error: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#1d3557] via-[#457b9d] to-[#a8dadc]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
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
            Get In <span className="bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Let's Start a Conversation</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you're a company looking to hire, or you're someone looking to build something 
                together, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'maazawan100@gmail.com', href: 'mailto:maazawan100@gmail.com', color: 'bg-[#f1faee] dark:bg-[#1d3557]/30 text-[#457b9d] dark:text-[#a8dadc]' },
                { icon: Phone, label: 'Phone', value: '+92 315 4426400', href: 'tel:+923154426400', color: 'bg-[#f1faee] dark:bg-[#1d3557]/30 text-[#457b9d] dark:text-[#a8dadc]' },
                { icon: MapPin, label: 'Location', value: 'Islamabad, Pakistan', href: '#', color: 'bg-[#f1faee] dark:bg-[#1d3557]/30 text-[#457b9d] dark:text-[#a8dadc]' },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`p-3 rounded-lg ${contact.color}`}
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <contact.icon size={24} />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{contact.label}</p>
                    {contact.href.startsWith('mailto:') || contact.href.startsWith('tel:') ? (
                      <a href={contact.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">{contact.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/MuhammadMaaz7", color: "hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-maaz-uddin-512b4b26b/", color: "hover:text-blue-600 hover:border-blue-300" },
                  { icon: Twitter, href: "https://twitter.com/maazawan2004", color: "hover:text-sky-600 hover:border-sky-300" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 ${social.color} transition-all duration-300`}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <social.icon size={24} className="text-gray-600 dark:text-gray-300" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your full name"
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Tell me about your project or just say hello!"
                />
              </motion.div>

              {status.submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg"
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}

              {status.error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg"
                >
                  Oops! Something went wrong. Please try again later.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status.submitting}
                className={`w-full bg-gradient-to-r from-[#1d3557] via-[#457b9d] to-[#a8dadc] text-white py-4 px-6 rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 ${status.submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ 
                  scale: status.submitting ? 1 : 1.02,
                  boxShadow: status.submitting ? 'none' : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                whileTap={{ scale: status.submitting ? 1 : 0.98 }}
              >
                <Send size={20} />
                <span>{status.submitting ? 'Sending...' : 'Send Message'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 Muhammad Maaz. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;