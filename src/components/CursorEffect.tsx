import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 blur-3xl"
      animate={{
        x: mousePosition.x - 192,
        y: mousePosition.y - 192,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      style={{
        background:
          "radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)",
      }}
    />
  );
};