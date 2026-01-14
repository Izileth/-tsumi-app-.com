import { Users, Target, Trophy, Shield } from 'lucide-react';

export const features = [
  {
    icon: Users,
    title: 'Clãs',
    desc: 'Sistema completo de organização',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=300&fit=crop'
  },
  {
    icon: Target,
    title: 'Missões',
    desc: 'Desafios estratégicos',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=300&fit=crop'
  },
  {
    icon: Trophy,
    title: 'Hierarquia',
    desc: 'Progressão por lealdade',
    image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=400&h=300&fit=crop'
  },
  {
    icon: Shield,
    title: 'Territórios',
    desc: 'Conquiste domínios',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop'
  }
];

export const ranks = [
  { name: 'Oyabun', kanji: '親分', progress: 100 },
  { name: 'Kyodai', kanji: '兄弟', progress: 75 },
  { name: 'Wakashu', kanji: '若衆', progress: 50 }
];

export const navLinks = [
    { name: "RECURSOS", href: "#recursos" },
    { name: "RANKS", href: "#ranks" },
    { name: "DOWNLOAD", href: "#download" },
  ];
  
export const stats = [
    { kanji: "組", label: "Clãs" },
    { kanji: "忠", label: "Lealdade" },
    { kanji: "地", label: "Territórios" },
    { kanji: "戦", label: "Missões" },
];