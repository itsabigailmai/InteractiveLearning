'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = getUser();
    if (user) {
      router.push('/select-grade');
    } else {
      router.push('/login');
    }
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🎭</div>
        <p className="text-2xl font-bold text-purple-600">Loading...</p>
      </div>
    </div>
  );
}
