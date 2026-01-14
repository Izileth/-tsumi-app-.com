import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import LoopingVideo from '../LoopingVideo';

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 overflow-hidden">
        <LoopingVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl"
        style={{ opacity, scale }}
      >
        <motion.div
          className="mb-12 opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-red-500 text-xs tracking-[0.4em] uppercase">
            Sociedade das Sombras
          </span>
          <motion.div
            className="w-16 h-px bg-red-600 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        <motion.h1
          className="text-7xl md:text-9xl font-extralight tracking-tight mb-8 leading-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          THE
          <br />
          <motion.span
            className="font-light text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            UNDERWORLD
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-gray-500 text-lg md:text-xl mb-16 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Construa seu império nas sombras
        </motion.p>

        <motion.a
          href="#download"
          className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download
            size={20}
            className="group-hover:translate-y-1 transition-transform"
          />
          <span className="text-sm tracking-wider">BAIXAR</span>
        </motion.a>

        <motion.div
          className="mt-24"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} className="mx-auto opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};