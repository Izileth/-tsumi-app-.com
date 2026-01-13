import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown, Download, Users, Target, Trophy, Shield } from 'lucide-react';
import Splash from './Splash';
import LoopingVideo from './LoopingVideo';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Clãs',
      desc: 'Sistema completo de organização',
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=300&fit=crop'
    },
    {
      icon: Target,
      title: 'Missões',
      desc: 'Desafios estratégicos',
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop'
    },
    {
      icon: Trophy,
      title: 'Hierarquia',
      desc: 'Progressão por lealdade',
      image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: 'Territórios',
      desc: 'Conquiste domínios',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop'
    }
  ];

  const ranks = [
    { name: 'Oyabun', kanji: '親分', progress: 100 },
    { name: 'Kyodai', kanji: '兄弟', progress: 75 },
    { name: 'Wakashu', kanji: '若衆', progress: 50 }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <Splash />}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Cursor Effect */}
      <motion.div 
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
        }}
      />
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-xl border-b border-red-950/30' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl font-light tracking-[0.3em]">TSUMI</span>
            </motion.div>
            
            <div className="hidden md:flex gap-12 text-sm tracking-wider">
              {['RECURSOS', 'RANKS', 'DOWNLOAD'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-red-500 transition-colors duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden hover:text-red-500 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-80 bg-gradient-to-b from-black via-red-950/10 to-black border-l border-red-950/30 md:hidden z-50"
              >
                <div className="p-6">
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 text-red-500"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                  
                  <div className="mt-20 space-y-8">
                    {[
                      { name: 'RECURSOS', href: '#recursos' },
                      { name: 'RANKS', href: '#ranks' },
                      { name: 'DOWNLOAD', href: '#download' }
                    ].map((item, idx) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="block text-2xl font-light tracking-wider hover:text-red-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
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
                        <p className="text-xs text-gray-500 tracking-wider mb-2">ENTRE NO SUBMUNDO</p>
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
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
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
            <span className="text-red-500 text-xs tracking-[0.4em] uppercase">Sociedade das Sombras</span>
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
            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
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

      {/* Features */}
      <section id="recursos" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.4em] text-red-500 uppercase">Sistema</span>
            <h2 className="text-5xl md:text-6xl font-light mt-4 tracking-tight">
              Clan Management
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-red-950/20">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <FeatureCard key={idx} feature={feature} Icon={Icon} idx={idx} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Ranks */}
      <section id="ranks" className="py-32 px-6 bg-gradient-to-b from-black via-red-950/5 to-black">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.4em] text-red-500 uppercase">Hierarquia</span>
            <h2 className="text-5xl md:text-6xl font-light mt-4 tracking-tight">
              Sistema de Lealdade
            </h2>
          </motion.div>

          <div className="space-y-16">
            {ranks.map((rank, idx) => (
              <RankBar key={idx} rank={rank} idx={idx} />
            ))}
          </div>

          <motion.div 
            className="mt-24 text-center border border-red-950/30 p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-400 font-light italic text-lg">
              "Se não existir luz, não existirá escuridão"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6 border-y border-red-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 text-center">
            {['組', '忠', '地', '戦'].map((kanji, idx) => (
              <motion.div 
                key={idx} 
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-7xl font-light text-red-600 mb-6">
                  {kanji}
                </div>
                <div className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                  {['Clãs', 'Lealdade', 'Territórios', 'Missões'][idx]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-6xl md:text-7xl font-light mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Pronto para
            <br />
            <span className="text-red-600">ascender?</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-500 text-lg mb-16 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Entre em um clã, complete missões e construa seu império
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button 
              className="px-10 py-5 bg-red-600 hover:bg-red-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm tracking-wider">ANDROID</span>
            </motion.button>
            <motion.button 
              className="px-10 py-5 border border-red-950/50 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm tracking-wider">iOS</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-950/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-light tracking-[0.3em]">TSUMI</span>
          </motion.div>
          
          <motion.p 
            className="text-xs text-gray-600 tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            © 2026 — WELCOME TO THE UNDERWORLD
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  image: string;
}

const FeatureCard = ({ feature, Icon, idx }: { feature: Feature; Icon: React.ComponentType<any>; idx: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-black relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        initial={false}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src={feature.image} 
          alt={feature.title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="relative z-10 p-12 bg-gradient-to-b from-transparent via-black/50 to-black">
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Icon 
            size={32} 
            className="mb-8 text-red-600"
            strokeWidth={1.5}
          />
        </motion.div>
        <h3 className="text-xl font-light mb-3 tracking-wide">{feature.title}</h3>
        <motion.p 
          className="text-gray-500 text-sm font-light"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {feature.desc}
        </motion.p>
      </div>
    </motion.div>
  );
};

type Rank = {
  name: string;
  kanji: string;
  progress: number;
};


const RankBar = ({ rank: Rank, idx }: { rank: Rank; idx: number }) => {
  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.2, duration: 0.6 }}
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-3xl font-light">{Rank.name}</span>
          <motion.span 
            className="text-red-500 ml-4 text-2xl"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 + 0.3 }}
          >
            {Rank.kanji}
          </motion.span>
        </div>
        <motion.span 
          className="text-sm text-gray-500 tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 + 0.5 }}
        >
          {Rank.progress}%
        </motion.span>
      </div>
      <div className="h-px bg-red-950/30 overflow-hidden">
        <motion.div
          className="h-full bg-red-600"
          initial={{ width: 0 }}
          whileInView={{ width: `${Rank.progress}%` }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 + 0.4, duration: 1.2, ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default App;