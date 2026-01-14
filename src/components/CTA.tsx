import { motion } from 'framer-motion';

export const CTA = () => (
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
);