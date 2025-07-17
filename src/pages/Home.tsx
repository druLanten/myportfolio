import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SocialLinksModal from '../components/SocialLinksModal';

const roles = [
  'Graphics Designer',
  'IT Specialist',
  'Video Editor',
  'Digital Marketing Specialist',
];

const backgrounds = [
  '/backgrounds/graphics.jpg', // graphics
  '/backgrounds/it.jpg', // IT
  '/backgrounds/video.jpg', // video
  '/backgrounds/marketing.jpg', // marketing
];

const Home = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const navigate = useNavigate();

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = backgrounds.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
          });
        });
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setLoadError(true);
        setImagesLoaded(true); // Allow content to show even if background fails
      }
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3500); // Slightly reduced duration

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <PageTransition>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Background Images */}
        <AnimatePresence initial={false}>
          {!loadError && (
            <motion.div
              key={currentRole}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="fixed inset-0"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backgrounds[currentRole]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: 'translate3d(0,0,0)',
                willChange: 'opacity',
              }}
            />
          )}
        </AnimatePresence>

        {/* Loading state */}
        {!imagesLoaded && (
          <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Fallback background for error state */}
        {loadError && (
          <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        )}

        {/* Content */}
        <div className="relative min-h-screen w-full flex flex-col justify-center items-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, y: imagesLoaded ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Hi, I'm Carlos Shava
            </h1>
            <AnimatePresence mode="wait">
              <motion.h2
                key={roles[currentRole]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-3xl md:text-5xl text-blue-400 mb-8"
              >
                I'm a {roles[currentRole]}
              </motion.h2>
            </AnimatePresence>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Welcome to my portfolio. I bring creativity, technical expertise, and innovation
              to every project, delivering exceptional results across multiple disciplines.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/work')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full
                       text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Explore My Work
            </motion.button>

            {/* Social Links */}
            <div className="mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSocialModalOpen(true)}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Connect with me →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Links Modal */}
      <SocialLinksModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />
    </PageTransition>
  );
};

export default Home;
