import { motion } from 'framer-motion';
import { useState } from 'react';
import { stats } from '../data';

export const Stats = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Kanjis decorativos que aparecem no fundo
    const backgroundKanjis = ['武', '道', '心', '技', '体', '礼', '気', '力'];

    return (
        <section className="py-32 px-6 border-y border-red-950/20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-16 text-center">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            onHoverStart={() => setHoveredIndex(idx)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            {/* Kanjis de fundo - aparecem ao hover */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {backgroundKanjis.slice(0, 3).map((kanji, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute text-9xl font-light text-red-950/5 select-none"
                                        style={{
                                            left: `${(i * 40) - 20}%`,
                                            top: `${(i * 30) - 10}%`,
                                        }}
                                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                        animate={
                                            hoveredIndex === idx
                                                ? {
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotate: 0,
                                                    transition: {
                                                        delay: i * 0.1,
                                                        duration: 0.4,
                                                        ease: 'easeOut',
                                                    },
                                                }
                                                : {
                                                    opacity: 0,
                                                    scale: 0.5,
                                                    rotate: -10,
                                                }
                                        }
                                    >
                                        {kanji}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Círculo decorativo de fundo */}
                            <motion.div
                                className="absolute inset-0 -z-10"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={
                                    hoveredIndex === idx
                                        ? { scale: 1.3, opacity: 0.05 }
                                        : { scale: 0, opacity: 0 }
                                }
                                transition={{ duration: 0.4 }}
                            >
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-900 blur-2xl" />
                            </motion.div>

                            {/* Conteúdo principal */}
                            <motion.div
                                className="relative z-10"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <motion.div
                                    className="text-7xl font-light text-red-600 mb-6 relative"
                                    animate={
                                        hoveredIndex === idx
                                            ? {
                                                textShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                                                scale: 1.05
                                            }
                                            : {
                                                textShadow: '0 0 0px rgba(220, 38, 38, 0)',
                                                scale: 1
                                            }
                                    }
                                >
                                    {stat.kanji}

                                    {/* Partículas ao redor do kanji */}
                                    {hoveredIndex === idx && (
                                        <>
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 bg-red-500 rounded-full"
                                                    style={{
                                                        left: '50%',
                                                        top: '50%',
                                                    }}
                                                    initial={{ scale: 0, x: 0, y: 0 }}
                                                    animate={{
                                                        scale: [0, 1, 0],
                                                        x: Math.cos((i * Math.PI) / 4) * 40,
                                                        y: Math.sin((i * Math.PI) / 4) * 40,
                                                        opacity: [0, 1, 0],
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        repeat: Infinity,
                                                        delay: i * 0.1,
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </motion.div>

                                <motion.div
                                    className="text-xs tracking-[0.3em] text-gray-500 uppercase"
                                    animate={
                                        hoveredIndex === idx
                                            ? { color: '#dc2626', letterSpacing: '0.4em' }
                                            : { color: '#6b7280', letterSpacing: '0.3em' }
                                    }
                                    transition={{ duration: 0.3 }}
                                >
                                    {stat.label}
                                </motion.div>
                            </motion.div>

                            {/* Borda decorativa ao hover */}
                            <motion.div
                                className="absolute -inset-4 border border-red-600/20 rounded-lg -z-10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={
                                    hoveredIndex === idx
                                        ? { opacity: 1, scale: 1 }
                                        : { opacity: 0, scale: 0.9 }
                                }
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Kanjis decorativos fixos no fundo da seção inteira */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
                {backgroundKanjis.map((kanji, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[12rem] font-light text-red-950/[0.02] select-none"
                        style={{
                            left: `${(i * 12.5) % 100}%`,
                            top: `${((i * 37) % 80) + 10}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {kanji}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};