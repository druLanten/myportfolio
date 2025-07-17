import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

interface WebProject {
  id: number;
  title: string;
  slug: string;
  overview: string;
  problem: string;
  howWeMet: string;
  outcomeImages: string[];
  technologiesUsed: string[];
  lessonsLearnt: string;
  designProcess: string;
  returnClient: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<WebProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<WebProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [category] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'web';
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const apiFile = category === 'graphics' ? 'graphics_projects_api.json' : 'web_projects_api.json';
        const response = await fetch(`/projects/${apiFile}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        // Sort projects by ID in descending order (newest first)
        const sortedProjects = data.sort((a: WebProject, b: WebProject) => b.id - a.id);
        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [category]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProjects(projects);
      return;
    }

    const searchResults = projects.filter(project => {
      const searchFields = [
        project.title.toLowerCase(),
        project.overview.toLowerCase(),
        ...project.technologiesUsed.map(tech => tech.toLowerCase())
      ];
      return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
    });

    setFilteredProjects(searchResults);
  }, [searchTerm, projects]);

  if (error) {
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
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
                {category === 'graphics' ? 'Graphics Design Projects' : 'Web Development Projects'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {category === 'graphics' 
                  ? 'From concept to creation, exploring visual storytelling'
                  : 'Building modern, scalable, and user-friendly web applications'}
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects by title, technology, or description..."
                    className="w-full px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {filteredProjects.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      No projects found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      >
                        <Link to={`/projects/${project.slug}?category=${category}`} className="block">
                          <div className="relative h-60 bg-gray-100 dark:bg-gray-700 group overflow-hidden">
                            <img
                              src={`/projects/${category === 'graphics' ? 'gd_imgs' : 'web_imgs'}/${project.outcomeImages[0]}`}
                              alt={project.title}
                              className="object-cover object-center w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                                View Project
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                              {project.overview}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologiesUsed.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
