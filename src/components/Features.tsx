import { motion } from 'framer-motion';
import { features } from '../data';
import { FeatureCard } from './FeatureCard';

export const Features = () => {
  return (
    <section id="recursos" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] text-red-500 uppercase">
            Sistema
          </span>
          <h2 className="text-5xl md:text-6xl font-light mt-4 tracking-tight">
            Clan Management
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-red-950/20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <FeatureCard
                key={idx}
                feature={feature}
                Icon={Icon}
                idx={idx}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};