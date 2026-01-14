import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Splash from './Splash';
import { ProgressBar } from './components/ProgressBar';
import { CursorEffect } from './components/CursorEffect';
import { Navigation } from './components/Navigation';
import { MobileSidebar } from './components/MobileSidebar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Ranks } from './components/Ranks';
import { Stats } from './components/Stats';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased overflow-x-hidden">
      <AnimatePresence>
        {isLoading ? (
          <Splash />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <ProgressBar />
            <CursorEffect />
            <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
            <AnimatePresence>
              {isOpen && <MobileSidebar setIsOpen={setIsOpen} />}
            </AnimatePresence>
            <main>
              <Hero />
              <Features />
              <Ranks />
              <Stats />
              <CTA />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
