'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookText, Clock, Scroll, Compass, Microscope, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getUser } from '@/lib/storage';
import { getLessonsByGrade, Lesson } from '@/lib/lessons';

const categoryIcons: Record<string, any> = {
  Literature: BookText,
  History: Scroll,
  Adventure: Compass,
  Science: Microscope,
};

const categoryColors: Record<string, string> = {
  Literature: 'from-pink-400 to-rose-500',
  History: 'from-amber-400 to-orange-500',
  Adventure: 'from-emerald-400 to-teal-500',
  Science: 'from-blue-400 to-indigo-500',
};

export default function SelectTopicPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') as 'K-5' | '6-8' | '9-12' | null;
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Check if user is logged in
    const user = getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if grade is selected
    if (!grade) {
      router.push('/select-grade');
      return;
    }

    // Load lessons for the selected grade
    const gradeLessons = getLessonsByGrade(grade);
    setLessons(gradeLessons);
  }, [router, grade]);

  const categories = ['All', ...new Set(lessons.map(l => l.category))];
  
  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(l => l.category === selectedCategory);

  const handleLessonSelect = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  const handleBack = () => {
    router.push('/select-grade');
  };

  const gradeDisplayNames: Record<string, string> = {
    'K-5': 'Elementary (K-5)',
    '6-8': 'Middle School (6-8)',
    '9-12': 'High School (9-12)',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 md:p-12">
      {/* Back button */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="mb-6"
      >
        <Button
          onClick={handleBack}
          variant="secondary"
          size="md"
          className="font-bold"
        >
          <ArrowLeft className="inline mr-2" size={20} />
          Back to Grades
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
          {grade && gradeDisplayNames[grade]}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 font-medium">
          Pick a story to bring to life! 🎬
        </p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {categories.map((category, index) => {
          const Icon = categoryIcons[category];
          const isSelected = selectedCategory === category;
          
          return (
            <motion.button
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-3 rounded-full font-bold text-lg shadow-lg
                transition-all duration-200
                ${isSelected 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' 
                  : 'bg-white text-gray-700 hover:shadow-xl'
                }
              `}
            >
              {Icon && <Icon className="inline mr-2" size={20} />}
              {category === 'All' ? '✨ All Stories' : `${category}`}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Lessons grid */}
      <div className="max-w-7xl mx-auto">
        {filteredLessons.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl text-gray-600 font-medium">
              No lessons found in this category!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => {
              const categoryColor = categoryColors[lesson.category] || 'from-gray-400 to-gray-500';
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <Card 
                    hover 
                    onClick={() => handleLessonSelect(lesson.id)}
                    className="h-full relative overflow-hidden group"
                  >
                    {/* Category badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColor} text-white text-xs font-bold shadow-md`}>
                      {lesson.category}
                    </div>

                    {/* Emoji icon */}
                    <div className="text-6xl mb-4">
                      {lesson.emoji}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {lesson.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 font-medium mb-4 line-clamp-2">
                      {lesson.description}
                    </p>

                    {/* Time estimate */}
                    <div className="flex items-center gap-2 text-purple-600 font-semibold">
                      <Clock size={18} />
                      <span>{lesson.estimatedTime}</span>
                    </div>

                    {/* Hover effect */}
                    <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-center gap-2 text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Start Acting!</span>
                      <span>🎭</span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fun decorations */}
      <motion.div
        className="fixed top-32 right-10 text-yellow-400 opacity-30 pointer-events-none text-4xl"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="fixed bottom-32 left-10 text-pink-400 opacity-30 pointer-events-none text-5xl"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
        }}
      >
        🎪
      </motion.div>
    </div>
  );
}

