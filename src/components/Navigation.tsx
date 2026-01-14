import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data';

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Navigation = ({ isOpen, setIsOpen }: NavigationProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrollY > 50
            ? "bg-black/80 backdrop-blur-xl border-b border-red-950/30"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl  font-light tracking-[0.3em]">
                TSUMI
              </span>
            </motion.div>

            <div className="hidden md:flex gap-12 text-sm tracking-wider">
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="hover:text-red-500 transition-colors duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden hover:text-red-500 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};