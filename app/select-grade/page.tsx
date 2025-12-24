'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Rocket, GraduationCap, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { getUser } from '@/lib/storage';

const grades = [
  {
    id: 'K-5',
    title: 'Elementary',
    subtitle: 'Grades K-5',
    description: 'Fun stories and simple adventures! 🌟',
    icon: BookOpen,
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-pink-50',
    emoji: '🎨',
  },
  {
    id: '6-8',
    title: 'Middle School',
    subtitle: 'Grades 6-8',
    description: 'Exciting tales and history! 🚀',
    icon: Rocket,
    color: 'from-purple-400 to-indigo-400',
    bgColor: 'bg-purple-50',
    emoji: '🎪',
  },
  {
    id: '9-12',
    title: 'High School',
    subtitle: 'Grades 9-12',
    description: 'Epic stories and deep dives! 🎭',
    icon: GraduationCap,
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50',
    emoji: '🎬',
  },
];

export default function SelectGradePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = getUser();
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const handleGradeSelect = (gradeId: string) => {
    router.push(`/select-topic?grade=${gradeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 md:p-12">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block text-6xl mb-4"
        >
          🎭
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Choose Your Level!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          Pick your grade to start your acting adventure! ✨
        </p>
      </motion.div>

      {/* Grade Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {grades.map((grade, index) => {
          const Icon = grade.icon;
          
          return (
            <motion.div
              key={grade.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <Card 
                hover 
                onClick={() => handleGradeSelect(grade.id)}
                className="h-full relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${grade.bgColor} rounded-full -mr-16 -mt-16 opacity-50`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${grade.color} mb-4 shadow-lg`}>
                    <Icon className="text-white" size={40} />
                  </div>

                  {/* Large emoji */}
                  <div className="text-5xl mb-3">
                    {grade.emoji}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {grade.title}
                  </h2>
                  
                  <p className="text-lg font-semibold text-gray-600 mb-3">
                    {grade.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-lg font-medium">
                    {grade.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-purple-600 font-bold">
                    <span>Let's Go!</span>
                    <span>→</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Fun floating elements */}
      <motion.div
        className="fixed top-20 right-20 text-yellow-400 opacity-40 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sparkles size={40} />
      </motion.div>

      <motion.div
        className="fixed bottom-20 left-20 text-pink-400 opacity-40 pointer-events-none"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sparkles size={35} />
      </motion.div>
    </div>
  );
}

