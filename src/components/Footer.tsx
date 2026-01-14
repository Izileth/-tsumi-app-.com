import { motion } from 'framer-motion';

export const Footer = () => (
    <footer className="border-t border-red-950/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <span className="text-sm font-light tracking-[0.3em]">
                    TSUMI
                </span>
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
);