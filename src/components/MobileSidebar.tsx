import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { navLinks } from '../data';

interface MobileSidebarProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileSidebar = ({ setIsOpen }: MobileSidebarProps) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden"
      onClick={() => setIsOpen(false)}
    />
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
      }}
      className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-b from-black via-red-950/10 to-black border-l border-red-950/30 md:hidden z-50"
    >
      <div className="p-6">
        <motion.button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-red-500"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        <div className="mt-20 space-y-8">
          {navLinks.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="block text-2xl font-light tracking-wider hover:text-red-500 transition-colors"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ x: 10 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="absolute bottom-12 left-6 right-6">
          <div className="border-t border-red-950/30 pt-8 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-gray-500 tracking-wider mb-2">
                ENTRE NO SUBMUNDO
              </p>
              <div className="flex gap-2">
                <motion.button
                  className="flex-1 px-4 py-3 bg-red-600 text-xs tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ANDROID
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-3 border border-red-950/50 text-xs tracking-wider"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  iOS
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
);