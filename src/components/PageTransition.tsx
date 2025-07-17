import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeIn } from '../utils/animations';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      variants={fadeIn()}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
