'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Stars } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { saveUser } from '@/lib/storage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email!');
      setIsLoading(false);
      return;
    }

    // Check password (hardcoded for demo)
    if (password !== process.env.NEXT_PUBLIC_DEMO_PASSWORD) {
      setError('Oops! Wrong password. Try again!');
      setIsLoading(false);
      return;
    }

    // Save user and redirect
    saveUser(email);
    
    // Simulate loading for fun effect
    setTimeout(() => {
      router.push('/select-grade');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-20 text-yellow-400 opacity-60"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles size={40} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 text-pink-400 opacity-60"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Stars size={50} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 text-blue-400 opacity-40"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Wand2 size={35} />
      </motion.div>

      {/* Main login card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full relative z-10"
      >
        {/* Logo/Title Area */}
        <motion.div 
          className="text-center mb-8"
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="text-white" size={48} />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Act & Learn! 🎭
          </h1>
          
          <p className="text-gray-600 text-lg font-medium">
            Become a star while learning! ⭐
          </p>
        </motion.div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            label="📧 Your Email"
            placeholder="student@school.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            label="🔐 Secret Password"
            placeholder="Enter the magic password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold text-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
                Getting Ready...
              </span>
            ) : (
              "🚀 Start Learning!"
            )}
          </Button>
        </form>

        {/* Fun footer */}
        <motion.p 
          className="text-center text-gray-500 text-sm mt-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨ Learn through acting and have fun! ✨
        </motion.p>
      </motion.div>

      {/* More floating elements */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 text-purple-400 opacity-40"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Stars size={30} />
      </motion.div>
    </div>
  );
}

