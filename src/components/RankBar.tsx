import { motion } from 'framer-motion';

type Rank = {
  name: string;
  kanji: string;
  progress: number;
};

export const RankBar = ({ rank, idx }: { rank: Rank; idx: number }) => {
  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.2, duration: 0.6 }}
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-3xl font-light">{rank.name}</span>
          <motion.span 
            className="text-red-500 ml-4 text-2xl"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 + 0.3 }}
          >
            {rank.kanji}
          </motion.span>
        </div>
        <motion.span 
          className="text-sm text-gray-500 tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 + 0.5 }}
        >
          {rank.progress}%
        </motion.span>
      </div>
      <div className="h-px bg-red-950/30 overflow-hidden">
        <motion.div
          className="h-full bg-red-600"
          initial={{ width: 0 }}
          whileInView={{ width: `${rank.progress}%` }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 + 0.4, duration: 1.2, ease: "easeOut" }}
        ></motion.div>
      </div>
    </motion.div>
  );
};