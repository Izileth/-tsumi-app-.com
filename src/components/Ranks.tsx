import { motion } from 'framer-motion';
import { ranks } from '../data';
import { RankBar } from './RankBar';

export const Ranks = () => {
  return (
    <section
      id="ranks"
      className="py-32 px-6 bg-gradient-to-b from-black via-red-950/5 to-black"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.4em] text-red-500 uppercase">
            Hierarquia
          </span>
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
  );
};