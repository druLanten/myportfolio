import { motion } from 'framer-motion';
import { useState } from 'react';
import PageTransition from '../components/PageTransition';

const About = () => {
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  const journeySteps = [
    {
      year: "Early Days",
      title: "The Curious Coder",
      content: "My journey began with pure curiosity and a laptop. From a young age, I found myself lost in the world of web development, building basic apps just for the thrill of seeing my ideas come alive. Each line of code was a step into understanding the digital world behind the screen.",
      icon: "💻"
    },
    {
      year: "2019",
      title: "The Academic Path",
      content: "That early passion wasn't just a phase – it was my calling. I dove into Computer Science, eager to understand the deeper principles behind technology. Every class, every project was another piece of the puzzle falling into place.",
      icon: "📚"
    },
    {
      year: "2022",
      title: "The Design Discovery",
      content: "During my internship, everything shifted. Graphics design entered my world, and something just clicked. I found myself spending countless hours on YouTube tutorials, completely captivated by the creative process. It wasn't just work – it was a new way of expressing ideas.",
      icon: "🎨"
    },
    {
      year: "2024-2025",
      title: "The Visual Storyteller",
      content: "One creative pursuit led to another. I ventured into video editing, starting with simple clips but quickly advancing to full-length documentaries. Each project became more complex, more challenging, and infinitely more rewarding. I was no longer just building – I was telling stories.",
      icon: "🎬"
    },
    {
      year: "Early 2025",
      title: "The Marketing Explorer",
      content: "As my portfolio of designs and videos grew, I realized something crucial – great content deserves to reach the right audience. This insight pulled me into the world of digital marketing, where I'm learning to craft strategies that don't just capture attention but create genuine connections.",
      icon: "🎯"
    },
    {
      year: "May 2025",
      title: "The Milestone",
      content: "Completing my Computer Science degree wasn’t just an academic win — it was a journey through setbacks, sacrifices, and moments of doubt. It tested my strength and resilience, but also revealed my ability to push forward. It reminded me how far I’ve come — and how much further I’m capable of going.",
      icon: "🎓"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[60vh] bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/backgrounds/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Who Am I
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Creative Professional • Tech Enthusiast • Digital Storyteller
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"
          />
        </motion.div>

        {/* Introduction Cards */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto -mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">👋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Where it All Began</h3>
              <p className="text-gray-600 dark:text-gray-300">
                I’m Carlos — a designer and developer from Zimbabwe with a deep love for creativity and problem-solving. My journey didn’t start in a studio or tech hub; it started with curiosity, resourcefulness, and a need to make things work with what I had. Every skill I’ve learned — from design and motion to code and marketing — came from a desire to create value and figure things out when resources were limited. That hunger still drives me today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">What I Do</h3>
              <p className="text-gray-600 dark:text-gray-300">
                I blend design and tech to tell stories, solve problems, and bring ideas to life. Whether I’m working on a flyer, editing a video, designing a brand, or building a website, I’m always thinking about impact. I care about clarity, connection, and creating work that actually helps — not just looks good. This isn’t just a job for me. It’s a way to uplift, empower, and build something that lasts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 md:col-span-2 lg:col-span-1"
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">How I Work</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Working with me means working with someone who listens, digs deep, and isn’t afraid to experiment until it feels right. I’m hands-on, honest, and committed to growth — both mine and yours. Whether you're launching something new or reimagining what you already have, I bring a mix of creativity, precision, and purpose to the table.
              </p>
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto mt-24"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              My Journey
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
              
              {/* Journey Steps */}
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                  className={`relative flex md:items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveJourneyStep(index)}
                >
                  <div className="flex-1 md:w-1/2 p-4 relative z-10">
                    <div 
                      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 ${
                        activeJourneyStep === index ? 'border-2 border-blue-500 shadow-xl' : ''
                      }`}
                    >
                      <div className="text-4xl mb-4">{step.icon}</div>
                      <div className="text-sm text-blue-500 dark:text-blue-400 font-semibold mb-2">
                        {step.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.content}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 z-0"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Let's create something extraordinary together. 
            </p>
          </motion.div>
          
          {/* Final Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center mt-8 max-w-2xl mx-auto"
          >
            <p className="text-gray-600 dark:text-gray-400 italic">
              "All of this has happened in just a couple of years — a fast-paced, deeply rewarding journey that continues to unfold. Each skill I've gained builds on the last, and I'm excited to keep growing, creating, and exploring new ways to bring ideas to life."
            </p>
          </motion.div>

          {/* Professional Experience & Qualifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-24 max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-transparent bg-clip-text">
                  Professional Experience & Qualifications
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto"></div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">🎓</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">BSc Computer Science</h4>
                    <p className="text-sm text-blue-500">Midlands State University</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed: May 2025 | Class: 2.1</p>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 pt-2 border-t dark:border-gray-700">
                    Dissertation: Blockchain-Based CRS
                  </div>
                </div>
              </motion.div>

              {/* Certifications Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">🏅</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">CISCO</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                      <li>Cybersecurity & Network Defense</li>
                      <li>IoT & Networking Basics</li>
                      <li>Endpoint Security</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Google</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Digital Marketing Fundamentals</p>
                  </div>
                </div>
              </motion.div>

              {/* Employment Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">💼</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">ZCC & Oikos Studio</h4>
                    <p className="text-sm text-blue-500">Sep 2022 - May 2024</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">IT & Communications, Graphics Design Lead</p>
                  </div>
                  <div className="pt-2 border-t dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Zimfri Mining</h4>
                    <p className="text-sm text-blue-500">May 2024 - Aug 2024</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Digital Marketing Specialist</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
