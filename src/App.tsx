import  { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Download, Users, Target, Trophy, Shield } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    { icon: Users, title: 'Clãs', desc: 'Sistema completo de organização' },
    { icon: Target, title: 'Missões', desc: 'Desafios estratégicos' },
    { icon: Trophy, title: 'Hierarquia', desc: 'Progressão por lealdade' },
    { icon: Shield, title: 'Territórios', desc: 'Conquiste domínios' }
  ];

  const ranks = [
    { name: 'Oyabun', kanji: '親分', progress: 100 },
    { name: 'Kyodai', kanji: '兄弟', progress: 75 },
    { name: 'Wakashu', kanji: '若衆', progress: 50 }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Cursor Effect */}
      <div 
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192
        }}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrollY > 50 ? 'bg-black/80 backdrop-blur-xl border-b border-red-950/30' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
                <span className="text-sm font-bold">組</span>
              </div>
              <span className="text-xl font-light tracking-[0.3em]">TSUMI</span>
            </div>
            
            <div className="hidden md:flex gap-12 text-sm tracking-wider">
              <a href="#features" className="hover:text-red-500 transition-colors duration-300">RECURSOS</a>
              <a href="#ranks" className="hover:text-red-500 transition-colors duration-300">RANKS</a>
              <a href="#download" className="hover:text-red-500 transition-colors duration-300">DOWNLOAD</a>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden hover:text-red-500 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-red-950/30">
            <div className="px-6 py-8 space-y-6 text-sm tracking-wider">
              <a href="#features" className="block hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>RECURSOS</a>
              <a href="#ranks" className="block hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>RANKS</a>
              <a href="#download" className="block hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>DOWNLOAD</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-red-600"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <div className="mb-12 opacity-80">
            <span className="text-red-500 text-xs tracking-[0.4em] uppercase">Sociedade das Sombras</span>
            <div className="w-16 h-px bg-red-600 mx-auto mt-4"></div>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-extralight tracking-tight mb-8 leading-none">
            THE
            <br />
            <span className="font-light text-red-600">UNDERWORLD</span>
          </h1>
          
          <p className="text-gray-500 text-lg md:text-xl mb-16 font-light max-w-2xl mx-auto">
            Construa seu império nas sombras
          </p>

          <a 
            href="#download" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 transition-all duration-300 group"
          >
            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            <span className="text-sm tracking-wider">BAIXAR</span>
          </a>

          <div className="mt-24 animate-bounce opacity-50">
            <ChevronDown size={24} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs tracking-[0.4em] text-red-500 uppercase">Sistema</span>
            <h2 className="text-5xl md:text-6xl font-light mt-4 tracking-tight">
              Clan Management
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-red-950/20">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-black p-12 hover:bg-red-950/10 transition-all duration-500 group"
                >
                  <Icon 
                    size={32} 
                    className="mb-8 text-red-600 group-hover:scale-110 transition-transform duration-500"
                    strokeWidth={1.5}
                  />
                  <h3 className="text-xl font-light mb-3 tracking-wide">{feature.title}</h3>
                  <p className="text-gray-500 text-sm font-light">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ranks */}
      <section id="ranks" className="py-32 px-6  from-black via-red-950/5 to-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs tracking-[0.4em] text-red-500 uppercase">Hierarquia</span>
            <h2 className="text-5xl md:text-6xl font-light mt-4 tracking-tight">
              Sistema de Lealdade
            </h2>
          </div>

          <div className="space-y-16">
            {ranks.map((rank, idx) => (
              <div key={idx} className="group">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-3xl font-light">{rank.name}</span>
                    <span className="text-red-500 ml-4 text-2xl">{rank.kanji}</span>
                  </div>
                  <span className="text-sm text-gray-500 tracking-wider">{rank.progress}%</span>
                </div>
                <div className="h-px bg-red-950/30 overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${rank.progress}%`,
                      transitionDelay: `${idx * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center border border-red-950/30 p-12">
            <p className="text-gray-400 font-light italic text-lg">
              "Se não existir luz, não existirá escuridão"
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6 border-y border-red-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 text-center">
            {['組', '忠', '地', '戦'].map((kanji, idx) => (
              <div key={idx} className="group">
                <div className="text-7xl font-light text-red-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {kanji}
                </div>
                <div className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                  {['Clãs', 'Lealdade', 'Territórios', 'Missões'][idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-light mb-8 tracking-tight">
            Pronto para
            <br />
            <span className="text-red-600">ascender?</span>
          </h2>
          
          <p className="text-gray-500 text-lg mb-16 font-light max-w-2xl mx-auto">
            Entre em um clã, complete missões e construa seu império
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-red-600 hover:bg-red-700 transition-all duration-300 group">
              <span className="text-sm tracking-wider">ANDROID</span>
            </button>
            <button className="px-10 py-5 border border-red-950/50 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300">
              <span className="text-sm tracking-wider">iOS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-950/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-600 flex items-center justify-center">
              <span className="text-xs">組</span>
            </div>
            <span className="text-sm font-light tracking-[0.3em]">TSUMI</span>
          </div>
          
          <p className="text-xs text-gray-600 tracking-wider">
            © 2026 — WELCOME TO THE UNDERWORLD
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;