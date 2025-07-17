import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';

const categories = [
  {
    title: 'Graphics Design',
    description: 'Creating stunning visuals that capture attention and communicate effectively.',
    image: '/backgrounds/graphics.jpg',
    slug: 'graphics-design',
  },
  {
    title: 'Web Development',
    description: 'Building modern, responsive websites and web applications.',
    image: '/backgrounds/it.jpg',
    slug: 'web-development',
  },
  {
    title: 'Video Editor',
    description: 'Crafting compelling visual stories through expert video editing.',
    image: '/backgrounds/video.jpg',
    slug: 'video-editing',
  },
  {
    title: 'Digital Marketing',
    description: 'Driving growth through strategic digital marketing campaigns.',
    image: '/backgrounds/marketing.jpg',
    slug: 'digital-marketing',
  },
];

const Work = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      try {
        await Promise.all(
          categories.map(
            (category) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = category.image;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Loading state component
  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative z-10">
                <motion.h3 
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  {modalContent.title}
                </motion.h3>
                <motion.p 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-gray-600 dark:text-gray-300 mb-6"
                >
                  {modalContent.message}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:shadow-lg"
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-screen">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              onClick={() => {
                if (category.slug === 'graphics-design') {
                  navigate('/projects?category=graphics');
                } else if (category.slug === 'web-development') {
                  navigate('/projects?category=web');
                } else {
                  setModalContent({
                    title: 'Coming Soon!',
                    message: 'Projects in this category are currently being updated. Please check out our Graphics Design or Web Development projects in the meantime.'
                  });
                  setShowModal(true);
                }
              }}
              className="relative h-[50vh] md:h-[50vh] cursor-pointer group overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-black/30 before:transition-opacity before:duration-500 hover:before:opacity-0"
            >
              {/* Background Image with Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-700 group-hover:scale-110 bg-cover bg-center 
                  after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-500
                  after:bg-gradient-to-t after:from-blue-600/20 after:to-transparent group-hover:after:opacity-100`}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${category.image})`,
                  transform: 'translate3d(0,0,0)',
                  willChange: 'transform',
                  boxShadow: '0 0 30px rgba(0,0,0,0.3)',
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center items-center text-white p-8 text-center z-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:text-blue-300">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-200 max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {category.description}
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="px-6 py-2 border-2 border-white rounded-full text-white hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    View Projects
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Work;
