'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface CustomVideoPlayerProps {
  videoSrc: string;
  audioSrc: string;
  autoPlay?: boolean;
}

export function CustomVideoPlayer({ videoSrc, audioSrc, autoPlay = false }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;

    // Set up duration when metadata loads - use the shorter of video or audio duration
    const updateDuration = () => {
      if (video.duration && audio.duration) {
        setDuration(Math.min(video.duration, audio.duration));
      } else if (video.duration) {
        setDuration(video.duration);
      }
    };
    
    const handleLoadedMetadata = () => {
      updateDuration();
    };

    // Update current time while playing
    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
        // Keep audio in sync
        if (Math.abs(audio.currentTime - video.currentTime) > 0.3) {
          audio.currentTime = video.currentTime;
        }
      }
    };

    // Handle play/pause
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    // Handle video end - stop audio too
    const handleVideoEnded = () => {
      setIsPlaying(false);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
    
    // Handle audio end - stop video too (in case audio is shorter)
    const handleAudioEnded = () => {
      setIsPlaying(false);
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleVideoEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnded);

    // Auto-play if specified
    if (autoPlay) {
      video.play().then(() => {
        audio.play();
      }).catch(err => console.log('Autoplay prevented:', err));
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleVideoEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [autoPlay, isDragging]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;

    if (isPlaying) {
      video.pause();
      audio.pause();
    } else {
      video.play();
      audio.play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const audio = audioRef.current;
    const progressBar = e.currentTarget;
    
    if (!video || !audio) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    video.currentTime = newTime;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    handleSeek(e);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleSeek(e);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const restart = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;

    video.currentTime = 0;
    audio.currentTime = 0;
    setCurrentTime(0);
    video.play();
    audio.play();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-3">
      {/* Video Display */}
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          onClick={togglePlayPause}
        />
        
        {/* Play/Pause Overlay on Click */}
        {!isPlaying && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
            onClick={togglePlayPause}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center"
            >
              <Play className="text-purple-600 ml-1" size={40} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} />

      {/* Custom Controls */}
      <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
        {/* Progress Bar */}
        <div
          className="relative h-3 bg-gray-200 rounded-full cursor-pointer group"
          onClick={handleSeek}
          onMouseDown={handleProgressMouseDown}
          onMouseUp={handleProgressMouseUp}
          onMouseMove={handleProgressMouseMove}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Filled Progress */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          
          {/* Draggable Handle */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing"
            style={{ left: `${(currentTime / duration) * 100}%`, marginLeft: '-10px' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>

        {/* Time Display */}
        <div className="flex items-center justify-between text-sm text-gray-600 font-semibold">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Play/Pause & Restart */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={restart}
              className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300 cursor-pointer"
            >
              <RotateCcw size={18} />
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 flex-grow max-w-xs">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="text-gray-600 hover:text-purple-600 cursor-pointer"
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </motion.button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-grow h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:bg-purple-500
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:bg-purple-500
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

