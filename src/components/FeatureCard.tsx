import { useState } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  image: string;
}

export const FeatureCard = ({ feature, Icon, idx }: { feature: Feature; Icon: React.ComponentType<any>; idx: number }) => {
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