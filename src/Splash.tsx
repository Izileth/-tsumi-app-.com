import { motion, useAnimate } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const KANJI_LIST = "積重遅速遅延遅刻落雷落第落第点落第者落伍者落後者落馬落莫落胆落着落着き落着き先落着き所落着き払う";

const generateRandomString = (length: number): string => {
  let result = '';
  const charactersLength = KANJI_LIST.length;
  for (let i = 0; i < length; i++) {
    result += KANJI_LIST.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const Splash = () => {
  const [scope, animate] = useAnimate();
  const [decryptedText, setDecryptedText] = useState(() => generateRandomString(1));
  const [isComplete, setIsComplete] = useState(false);

  const targetText = useMemo(() => "積", []);

  useEffect(() => {
    let frameId: number;
    let currentText = decryptedText;
    let iterations = 0;
    const maxIterations = 20;

    const decryptEffect = () => {
      if (currentText !== targetText && iterations < maxIterations) {
        let newText = "";
        for (let i = 0; i < targetText.length; i++) {
          if (i < currentText.length && currentText[i] === targetText[i]) {
            newText += targetText[i];
          } else {
            const randomChar = KANJI_LIST.charAt(
              Math.floor(Math.random() * KANJI_LIST.length)
            );
            newText += randomChar;
          }
        }
        
        if (currentText.length < targetText.length) {
          newText += KANJI_LIST.charAt(
            Math.floor(Math.random() * KANJI_LIST.length)
          );
        }
        
        const finalText = newText.substring(0, targetText.length);
        setDecryptedText(finalText);
        currentText = finalText;
        iterations++;

        frameId = requestAnimationFrame(() => {
          setTimeout(decryptEffect, 100);
        });
      } else {
        setDecryptedText(targetText);
        setIsComplete(true);
      }
    };

    frameId = requestAnimationFrame(() => {
      setTimeout(decryptEffect, 100);
    });

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [targetText, decryptedText]);

  useEffect(() => {
    if (!isComplete) return;

    const runSequence = async () => {
      await animate(
        ".kanji-main",
        { scale: [1, 1.2, 1], opacity: [1, 1, 1] },
        { duration: 1.5 }
      );
      
      await animate(
        ".content-container",
        { opacity: 0, scale: 0.9 },
        { duration: 1, delay: 1.5 }
      );
      
      await animate(
        ".splash-container",
        { y: "-100vh" },
        { duration: 1.2, ease: "easeInOut" }
      );
    };

    runSequence();
  }, [isComplete, animate]);

  return (
    <motion.div
      ref={scope}
      className="splash-container fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ y: 0 }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-600 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Radial Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full bg-red-600/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content - Centered */}
      <motion.div
        className="content-container relative z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Kanji with Glow */}
        <div className="relative">
          {/* Glow Effect Behind */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-48 h-48 bg-red-600 rounded-full" />
          </motion.div>

          {/* Main Kanji Text */}
          <motion.div
            className="kanji-main relative text-[12rem] md:text-[16rem] font-bold text-white tracking-wider leading-none"
            style={{ 
              fontFamily: 'monospace',
              textShadow: '0 0 40px rgba(220, 38, 38, 0.8), 0 0 80px rgba(220, 38, 38, 0.4)'
            }}
            animate={{
              textShadow: [
                "0 0 40px rgba(220, 38, 38, 0.8), 0 0 80px rgba(220, 38, 38, 0.4)",
                "0 0 60px rgba(220, 38, 38, 1), 0 0 120px rgba(220, 38, 38, 0.6)",
                "0 0 40px rgba(220, 38, 38, 0.8), 0 0 80px rgba(220, 38, 38, 0.4)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {decryptedText}
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          className="mt-12 text-lg md:text-xl text-red-500 tracking-[0.5em] uppercase font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          TSUMI
        </motion.div>

        {/* Decorative Line */}
        <motion.div 
          className="mt-6 w-32 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isComplete ? 1 : 0, opacity: isComplete ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

        {/* Loading Bar */}
        <motion.div className="mt-10 w-64 h-px bg-red-950/30 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600"
            initial={{ width: "0%" }}
            animate={{ width: isComplete ? "100%" : "0%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Status Text */}
        <motion.div
          className="mt-6 text-xs text-gray-600 tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 0.5 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {isComplete ? "ENTERING THE UNDERWORLD" : "DECRYPTING..."}
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-red-600/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-red-600/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-red-600/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-red-600/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      />

      {/* Scanning Lines Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.03) 2px, rgba(220, 38, 38, 0.03) 4px)'
        }}
        animate={{
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default Splash;