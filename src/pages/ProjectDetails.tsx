import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import PageTransition from '../components/PageTransition';

interface ProjectDetails {
  id: number;
  title: string;
  slug: string;
  overview: string;
  problem: string;
  designProcess: string;
  outcomeImages: string[];
  technologiesUsed: string[];
  lessonsLearnt: string;
  howWeMet: string;
  returnClient: boolean;
}

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [category] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'web';
  });

  useEffect(() => {
    const loadProject = async () => {
      try {
        console.log('Loading project with slug:', slug);
        const apiFile = category === 'graphics' ? 'graphics_projects_api.json' : 'web_projects_api.json';
        const response = await fetch(`/projects/${apiFile}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        
        const data = await response.json();
        console.log('Loaded projects:', data);
        const foundProject = data.find((p: ProjectDetails) => p.slug === slug);
        console.log('Found project:', foundProject);
        
        if (!foundProject) {
          setError('Project not found');
          return;
        }

        setProject(foundProject);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project details');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug, category]);

  // Move handleKeyPress inside the component and wrap with useCallback
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!project) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        setCurrentImageIndex((prev) => 
          prev === 0 ? project.outcomeImages.length - 1 : prev - 1
        );
        break;
      case 'ArrowRight':
        setCurrentImageIndex((prev) => 
          prev === project.outcomeImages.length - 1 ? 0 : prev + 1
        );
        break;
      case 'Escape':
        if (isFullscreen) setIsFullscreen(false);
        break;
    }
  }, [project, isFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Helper function for image paths
  const getImagePath = (imageName: string) => `/projects/${category === 'graphics' ? 'gd_imgs' : 'web_imgs'}/${imageName}`;

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageTransition>
    );
  }

  if (error || !project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Oops!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => navigate('/projects')}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Back to Projects
              </button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  const renderImageModal = () => (
    <AnimatePresence>
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={getImagePath(project.outcomeImages[currentImageIndex])}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain select-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              />
            </AnimatePresence>

            {/* Navigation controls */}
            {project.outcomeImages.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => 
                      prev === 0 ? project.outcomeImages.length - 1 : prev - 1
                    );
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => 
                      prev === project.outcomeImages.length - 1 ? 0 : prev + 1
                    );
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}

            {/* Image counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm backdrop-blur-sm"
            >
              {currentImageIndex + 1} / {project.outcomeImages.length}
            </motion.div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderImageGallery = () => (
    <div className="mb-12">
      <div className="relative h-[60vh] bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
        <motion.img
          src={getImagePath(project.outcomeImages[currentImageIndex])}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          className="object-contain w-full h-full cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Navigation arrows */}
        {project.outcomeImages.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => 
                  prev === 0 ? project.outcomeImages.length - 1 : prev - 1
                );
              }}
              className="p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors transform hover:translate-x-[-5px]"
              title="Previous image"
              aria-label="View previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm"
            >
              {currentImageIndex + 1} / {project.outcomeImages.length}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => 
                  prev === project.outcomeImages.length - 1 ? 0 : prev + 1
                );
              }}
              className="p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors transform hover:translate-x-[5px]"
              title="Next image"
              aria-label="View next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>

      {/* Thumbnail gallery */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700 pt-4">
        {project.outcomeImages.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-200 ${
              currentImageIndex === index 
                ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800' 
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={getImagePath(image)}
              alt={`${project.title} - Thumbnail ${index + 1}`}
              className="object-cover w-full h-full transform transition-transform hover:scale-110"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {renderImageModal()}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center justify-between"
            >
              <motion.button
                whileHover={{ x: -5 }}
                onClick={() => navigate(`/projects?category=${category}`)}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Projects
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/projects"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Browse All Projects
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologiesUsed.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {renderImageModal()}

              {renderImageGallery()}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="space-y-12">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                        <div className="pl-4">
                          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                            <span className="mr-3">Project Overview</span>
                            <motion.div 
                              className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                            ></motion.div>
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{project.overview}</p>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                        <div className="pl-4">
                          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                            <span className="mr-3">The Challenge</span>
                            <motion.div 
                              className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.6, duration: 0.8 }}
                            ></motion.div>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{project.problem}</p>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                        <div className="pl-4">
                          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                            <span className="mr-3">Design Process</span>
                            <motion.div 
                              className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.7, duration: 0.8 }}
                            ></motion.div>
                          </h3>
                          <div className="prose prose-lg dark:prose-invert max-w-none">
                            {project.designProcess.split('. ').map((paragraph, index) => (
                              <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-4">
                                {paragraph}.
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="relative"
                      >
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                        <div className="pl-4">
                          <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                            <span className="mr-3">Key Learnings</span>
                            <motion.div 
                              className="h-px flex-grow bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.8, duration: 0.8 }}
                            ></motion.div>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{project.lessonsLearnt}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg sticky top-8 space-y-6 hover:shadow-xl transition-shadow">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Details</h3>
                      
                      <div className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Client Acquisition</h4>
                          <p className="text-gray-600 dark:text-gray-400">{project.howWeMet}</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Return Client</h4>
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                              project.returnClient
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {project.returnClient ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            {project.returnClient ? 'Yes' : 'No'}
                          </motion.span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          className="mt-6"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-3">View Output</h4>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsFullscreen(true)}
                            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                            View Design Output
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="border-t border-gray-200 dark:border-gray-700 pt-6"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Share Project</h4>
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out this amazing project: ${project.title}&url=${window.location.href}`)}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${project.title}`)}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetails;
