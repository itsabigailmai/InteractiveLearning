'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, VideoOff, Play, RotateCcw, Check, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CustomAudioPlayer } from '@/components/ui/CustomAudioPlayer';
import { getUser } from '@/lib/storage';
import { getLessonById } from '@/lib/lessons';
import { getGeneratedScript, getAudioPath, removeAudioTags } from '@/lib/generated-scripts';

type RecordingPhase = 'setup' | 'countdown' | 'recording' | 'review';

export default function RecordPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const [lesson] = useState(getLessonById(lessonId));
  const [script] = useState(getGeneratedScript(lessonId));
  const [currentScene, setCurrentScene] = useState(1);
  const [phase, setPhase] = useState<RecordingPhase>('setup');
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const user = getUser();
    if (!user || !lesson || !script) {
      router.push('/login');
      return;
    }

    // Request webcam permission on mount
    requestWebcam();

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [router, lesson, script]);

  const requestWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (error) {
      console.error('Webcam permission denied:', error);
      alert('Please allow webcam and microphone access to record your performance!');
    }
  };

  const startCountdown = () => {
    setPhase('countdown');
    setCountdown(3);
    setRecordingTime(0); // Reset timer before countdown

    const countInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countInterval);
          setTimeout(() => startRecording(), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    // Ensure video is showing webcam feed and playing
    if (videoRef.current && videoRef.current.srcObject !== streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(err => console.log('Play error:', err));
    }

    setPhase('recording');
    setRecordingTime(0); // Reset timer
    chunksRef.current = [];

    // Start recording
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp8,opus'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      const url = URL.createObjectURL(blob);
      setRecordedUrl(url);
      setPhase('review');
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;

    // Play audio for the scene
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // Start timer (count every second using Date.now() to avoid drift)
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setRecordingTime(elapsed);
    }, 100); // Update frequently but calculate actual elapsed time
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Don't clear srcObject here - let the review phase handle it
  };

  const handleRetake = () => {
    // Clean up any running timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Clean up audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Clean up recorded video
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedBlob(null);
    setRecordedUrl(null);
    setRecordingTime(0);
    
    // Restore webcam feed immediately
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(err => console.log('Play error:', err));
    }
    
    setPhase('setup');
  };

  const handleKeep = () => {
    // Clean up timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Clean up audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // TODO: Save to localStorage
    if (currentScene < (script?.scenes.length || 5)) {
      // Move to next scene
      setCurrentScene(prev => prev + 1);
      
      // Clean up current recording
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
      }
      setRecordedBlob(null);
      setRecordedUrl(null);
      setRecordingTime(0);
      
      // Restore webcam feed
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      
      setPhase('setup');
    } else {
      // All scenes done, go to compilation
      router.push(`/lesson/${lessonId}/results`);
    }
  };

  if (!lesson || !script) {
    return null;
  }

  const currentSceneData = script.scenes[currentScene - 1];
  const totalScenes = script.scenes.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {lesson.title}
            </h1>
            <p className="text-lg text-gray-600 font-semibold mt-1">
              Scene {currentScene} of {totalScenes}: {currentSceneData.title}
            </p>
          </div>
          <div className="px-6 py-3 bg-purple-500 text-white rounded-full font-bold text-lg">
            🎬 Recording
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${(currentScene / totalScenes) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Video/Camera */}
        <div>
          <Card className="overflow-hidden relative">
            {/* Video Display */}
            <div className="relative bg-black aspect-video">
              {phase === 'review' && recordedUrl ? (
                <video
                  key={recordedUrl}
                  src={recordedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover mirror"
                />
              )}

              {/* Countdown Overlay */}
              <AnimatePresence>
                {phase === 'countdown' && countdown > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50"
                  >
                    <motion.div
                      key={countdown}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white text-9xl font-bold"
                    >
                      {countdown}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Recording Indicator */}
              {phase === 'recording' && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                  REC {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                </div>
              )}

              {/* Camera Permission */}
              {!hasPermission && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center text-white">
                    <VideoOff size={64} className="mx-auto mb-4" />
                    <p className="text-xl font-semibold">Requesting camera access...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Controls */}
          <div className="mt-6 flex justify-center gap-4">
            {phase === 'setup' && (
              <Button
                onClick={startCountdown}
                variant="primary"
                size="xl"
                disabled={!hasPermission}
                className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer"
              >
                <Video className="mr-2" size={24} />
                Ready to Record!
              </Button>
            )}

            {phase === 'recording' && (
              <Button
                onClick={stopRecording}
                variant="danger"
                size="xl"
                className="font-bold cursor-pointer"
              >
                Stop Recording
              </Button>
            )}

            {phase === 'review' && (
              <div className="flex gap-4">
                <Button
                  onClick={handleRetake}
                  variant="secondary"
                  size="lg"
                  className="font-bold cursor-pointer"
                >
                  <RotateCcw className="mr-2" size={20} />
                  Try Again
                </Button>
                <Button
                  onClick={handleKeep}
                  variant="success"
                  size="lg"
                  className="font-bold cursor-pointer"
                >
                  <Check className="mr-2" size={20} />
                  Keep This Take
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Script & Instructions */}
        <div className="space-y-6">
          {/* Audio Preview Card */}
          {phase === 'setup' && (
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Volume2 size={28} />
                🎧 Listen First
              </h3>
              <CustomAudioPlayer src={getAudioPath(lessonId, currentScene)} />
              <p className="text-sm mt-4 text-white/90">
                Practice listening to the narration before you start recording. The audio will play automatically during recording!
              </p>
            </Card>
          )}

          {/* Script Card */}
          <Card>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📜 Your Script
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {removeAudioTags(currentSceneData.script)}
              </p>
            </div>

            {/* Audio Info - only show when not in setup */}
            {phase !== 'setup' && (
              <div className="mt-4 flex items-center gap-3 bg-purple-100 rounded-xl p-4">
                <Volume2 className="text-purple-600" size={24} />
                <div className="flex-grow">
                  <p className="text-purple-800 font-semibold">
                    {phase === 'recording' ? 'Audio is playing!' : 'The audio played during recording'}
                  </p>
                </div>
              </div>
            )}

            {/* Hidden audio element for recording */}
            <audio
              ref={audioRef}
              src={getAudioPath(lessonId, currentScene)}
              preload="auto"
            />
          </Card>

          {/* Tips Card */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              💡 Acting Tips
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Listen to the narration and act along with it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Use facial expressions and hand gestures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>Have fun and be creative!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">✓</span>
                <span>You can retake as many times as you want</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Hidden styles for mirror effect */}
      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}

