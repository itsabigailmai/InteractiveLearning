'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, ArrowLeft, Clock, Film, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getUser } from '@/lib/storage';
import { getLessonById } from '@/lib/lessons';
import { getGeneratedScript, hasGeneratedScript } from '@/lib/generated-scripts';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  
  const [lesson, setLesson] = useState(getLessonById(lessonId));
  const [script, setScript] = useState(getGeneratedScript(lessonId));

  useEffect(() => {
    // Check if user is logged in
    const user = getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if lesson exists
    if (!lesson) {
      router.push('/select-grade');
      return;
    }
  }, [router, lesson]);

  if (!lesson) {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  const handleStartRecording = () => {
    // TODO: Navigate to recording page
    alert('Recording feature coming soon!');
  };

  // Check if script is available
  const scriptAvailable = hasGeneratedScript(lessonId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 md:p-12">
      {/* Back button */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
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
          Back
        </Button>
      </motion.div>

      {/* Lesson Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-5xl mx-auto mb-8"
      >
        <div className="text-center mb-6">
          <div className="text-8xl mb-4">{lesson.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600 font-medium mb-4">
            {lesson.description}
          </p>
          
          <div className="flex items-center justify-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-purple-600" />
              <span className="font-semibold">{lesson.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Film size={20} className="text-purple-600" />
              <span className="font-semibold">{script?.scenes.length || 6} Scenes</span>
            </div>
            <div className="px-4 py-2 bg-purple-100 rounded-full">
              <span className="font-bold text-purple-700">{lesson.category}</span>
            </div>
          </div>
        </div>

        {!scriptAvailable && (
          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <div className="text-center">
              <Sparkles className="inline-block text-yellow-600 mb-2" size={32} />
              <p className="text-lg font-semibold text-yellow-800">
                Story script coming soon! We're working on creating more amazing stories for you.
              </p>
            </div>
          </Card>
        )}
      </motion.div>

      {/* Script Preview */}
      {scriptAvailable && script && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto space-y-6"
        >
          {/* Info Card */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">📜 Your Story Script</h2>
              <p className="text-lg opacity-90">
                Read through each scene below. When you're ready, you'll act out each scene with your webcam!
              </p>
            </div>
          </Card>

          {/* Scenes */}
          <div className="space-y-4">
            {script.scenes.map((scene, index) => (
              <motion.div
                key={scene.sceneNumber}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Scene Number Badge */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {scene.sceneNumber}
                      </span>
                    </div>

                    {/* Scene Content */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">
                          {scene.title}
                        </h3>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          {scene.duration}
                        </span>
                      </div>

                      {/* Script Text */}
                      <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {scene.script}
                        </p>
                      </div>

                      {/* Audio Tags Info */}
                      {scene.script.includes('[') && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                          <Sparkles size={16} />
                          <span>This scene includes special voice directions in [brackets]</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Start Recording Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center pt-8"
          >
            <Button
              onClick={handleStartRecording}
              variant="primary"
              size="xl"
              className="font-bold shadow-2xl"
            >
              <Play className="inline mr-3" size={28} />
              Start Acting! 🎬
            </Button>
            <p className="mt-4 text-gray-600 text-lg">
              You'll record each scene one at a time, with unlimited retakes!
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Floating decorations */}
      <motion.div
        className="fixed top-20 right-10 text-yellow-400 opacity-20 pointer-events-none text-5xl"
        animate={{ 
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
        }}
      >
        ⭐
      </motion.div>

      <motion.div
        className="fixed bottom-20 left-10 text-pink-400 opacity-20 pointer-events-none text-6xl"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
        }}
      >
        🎭
      </motion.div>
    </div>
  );
}

