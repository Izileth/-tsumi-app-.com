import { motion } from 'framer-motion';
import { stats } from '../data';

export const Stats = () => (
    <section className="py-32 px-6 border-y border-red-950/20">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-16 text-center">
                {stats.map((stat, idx) => (
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
                            {stat.kanji}
                        </div>
                        <div className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);