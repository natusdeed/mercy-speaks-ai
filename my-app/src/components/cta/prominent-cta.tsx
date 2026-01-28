"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Play, Pause, MessageSquare, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProminentCTA() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Replace with your actual phone number
  const phoneNumber = "(703) 332-5956";
  const phoneLink = `tel:7033325956`;

  // Replace with your actual audio file URL
  const audioUrl = "/audio/sample-call.mp3"; // Place your audio file in public/audio/

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = x / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  return (
    <section className="w-full py-40 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/20 via-transparent to-neon-cyan/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Phone Number CTA - Large, Prominent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/2 via-transparent to-electric-purple/2 opacity-5 group-hover:opacity-[7.5%] transition-opacity" />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-6"
                >
                  <div className="p-4 rounded-full bg-neon-cyan/20 backdrop-blur-sm border-2 border-neon-cyan/40">
                    <Phone className="w-12 h-12 text-neon-cyan" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">
                  Call Our AI Right Now
                </h3>
                <p className="text-slate-400 mb-8 max-w-sm">
                  Experience our AI receptionist in real-time. The same technology we'll install for your business.
                </p>
                
                <Button
                  asChild
                  variant="cyan"
                  size="lg"
                  className="text-lg px-8 py-6 group/btn"
                >
                  <a href={phoneLink} className="flex items-center gap-3">
                    <Phone className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-semibold">{phoneNumber}</span>
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Audio Player - Real Call Recording */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/2 via-transparent to-neon-cyan/2 opacity-5 group-hover:opacity-[7.5%] transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-electric-purple/20 backdrop-blur-sm">
                    <Volume2 className="w-6 h-6 text-electric-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-50">
                      Listen: Real Customer Call
                    </h3>
                    <p className="text-sm text-slate-400">
                      How our AI handled a real customer inquiry
                    </p>
                  </div>
                </div>

                {/* Audio Player Controls */}
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="flex items-center justify-center mb-4">
                    <Button
                      onClick={handlePlayPause}
                      variant="glow"
                      size="lg"
                      className="rounded-full w-16 h-16 p-0"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div
                      onClick={handleProgressClick}
                      className="w-full h-2 bg-slate-800 rounded-full cursor-pointer group/progress"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-electric-purple to-neon-cyan rounded-full"
                        style={{
                          width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                {/* Hidden Audio Element */}
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            </motion.div>
          </div>

          {/* Chatbot CTA - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1 opacity-5 group-hover:opacity-[7.5%] transition-opacity" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-electric-purple/20 backdrop-blur-sm">
                  <MessageSquare className="w-8 h-8 text-electric-purple" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-50 mb-2">
                    Chat with Our AI
                  </h3>
                  <p className="text-slate-400">
                    The same AI assistant we'll install for your business. Try it now.
                  </p>
                </div>
              </div>
              
              <Button
                variant="glow"
                size="lg"
                className="group/btn"
                onClick={() => {
                  // TODO: Open chatbot widget or navigate to chat page
                  // This can be integrated with your chatbot solution
                  alert("Chatbot widget will open here. Integrate with your chatbot solution.");
                }}
              >
                <MessageSquare className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                Start Chatting
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
