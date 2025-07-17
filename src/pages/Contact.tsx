import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Contact = () => {

  const contactMethods = [
    {
      title: 'Email',
      value: 'shavacarlos1@gmail.com',
      icon: '📧',
      href: 'mailto:shavacarlos1@gmail.com',
      color: 'blue'
    },
    {
      title: 'WhatsApp',
      value: '+263 783 365 941',
      icon: '💬',
      href: 'https://wa.me/263783365941',
      color: 'green'
    },
    {
      title: 'Phone',
      value: '+263 783 365 941',
      icon: '📱',
      href: 'tel:+263783365941',
      color: 'purple'
    },
    {
      title: 'Location',
      value: 'Greendale, Harare, Zimbabwe',
      icon: '📍',
      color: 'red'
    }
  ];

  const socialLinks = [
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/carlos-shava-b6a06b282/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Twitter',
      url: 'https://x.com/shavacarlos',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'sky'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/lighthouse_creative.zw/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'pink'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section with Animated Background */}
        <div className="relative h-[40vh] overflow-hidden flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30"
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text"
            >
              Let's Connect
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
            >
              Ready to bring your ideas to life? Let's talk.
            </motion.p>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="container mx-auto px-4 py-16 -mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                {method.href ? (
                  <motion.a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block h-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                        method.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        method.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                        method.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-red-100 dark:bg-red-900/30'
                      }`}>
                        <span className="text-3xl">{method.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {method.title}
                      </h3>
                      <p className={
                        method.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        method.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        method.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        'text-red-600 dark:text-red-400'
                      }>
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                ) : (
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                      method.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      method.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                      method.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <span className="text-3xl">{method.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {method.title}
                    </h3>
                    <p className={
                      method.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      method.color === 'green' ? 'text-green-600 dark:text-green-400' :
                      method.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                      'text-red-600 dark:text-red-400'
                    }>
                      {method.value}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                Connect on Social Media
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all ${
                    social.color === 'blue' ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20' :
                    social.color === 'sky' ? 'hover:bg-sky-50 dark:hover:bg-sky-900/20' :
                    'hover:bg-pink-50 dark:hover:bg-pink-900/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`${
                    social.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    social.color === 'sky' ? 'text-sky-600 dark:text-sky-400' :
                    'text-pink-600 dark:text-pink-400'
                  }`}>
                    {social.icon}
                  </div>
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {social.title}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
