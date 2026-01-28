"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Phone, Volume2, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  delay: number;
}

// Mock conversation data - easily replaceable with Vapi API calls
const DEMO_MESSAGES: Message[] = [
  { id: 1, text: "Hello! This is your AI receptionist.", sender: "ai", delay: 800 },
  { id: 2, text: "How can I assist you today?", sender: "ai", delay: 2500 },
  { id: 3, text: "I'd like to schedule a consultation.", sender: "user", delay: 4000 },
  { id: 4, text: "Perfect! I have availability tomorrow at 2 PM. Should I book that?", sender: "ai", delay: 5500 },
];

// ============================================
// MOCK SIMULATION LOGIC (Replace with Vapi API)
// ============================================
const simulateCall = (
  onMessage: (message: Message) => void,
  onRecordingChange: (isRecording: boolean) => void
) => {
  onRecordingChange(true);
  
  DEMO_MESSAGES.forEach((msg) => {
    setTimeout(() => {
      onMessage(msg);
      if (msg.id === DEMO_MESSAGES.length) {
        setTimeout(() => onRecordingChange(false), 1000);
      }
    }, msg.delay);
  });
};

export function VoiceDemoTile() {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // Clean, swappable function for Vapi API integration
  const startDemo = () => {
    setIsActive(true);
    setMessages([]);
    
    // TODO: Replace with Vapi API call
    // Example: await vapi.startCall({ ... });
    simulateCall(
      (msg) => setMessages((prev) => [...prev, msg]),
      (recording) => setIsRecording(recording)
    );
  };

  const resetDemo = () => {
    setIsActive(false);
    setMessages([]);
    setIsRecording(false);
  };

  // Enhanced animated waveform - more realistic live call visualization
  const Waveform = () => {
    const [heights, setHeights] = useState(Array(16).fill(4));

    useEffect(() => {
      if (!isRecording) {
        setHeights(Array(16).fill(4));
        return;
      }

      const interval = setInterval(() => {
        setHeights((prev) =>
          prev.map((_, i) => {
            // Create more realistic waveform pattern
            const baseHeight = 8;
            const variation = Math.random() * 32;
            const centerBias = Math.abs(i - 8) < 3 ? 1.5 : 1;
            return baseHeight + variation * centerBias;
          })
        );
      }, 100);

      return () => clearInterval(interval);
    }, [isRecording]);

    return (
      <div className="flex items-end justify-center gap-1.5 h-20 px-4">
        {heights.map((height, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-1.5 rounded-full",
              isRecording 
                ? "bg-gradient-to-t from-electric-purple via-neon-cyan to-electric-purple" 
                : "bg-slate-700"
            )}
            animate={{
              height: isRecording ? `${Math.max(height, 6)}px` : "4px",
              opacity: isRecording ? [0.6, 1, 0.6] : 0.3,
            }}
            transition={{
              duration: 0.1,
              repeat: isRecording ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{
              minHeight: "4px",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
      {/* Background gradient glow - intensifies during call */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-electric-purple/1 via-transparent to-neon-cyan/1"
        animate={{
          opacity: isActive ? 0.075 : 0.05,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Pulsing glow effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-electric-purple/2 rounded-2xl"
          animate={{
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div 
              className={cn(
                "p-2 rounded-lg bg-electric-purple/20 backdrop-blur-sm",
                isActive && "glow-purple"
              )}
              animate={{
                scale: isActive ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <PhoneCall className="w-5 h-5 text-electric-purple" />
            </motion.div>
            <h3 className="text-lg font-semibold text-slate-50">
              Voice AI Demo
            </h3>
          </div>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-xs text-neon-cyan"
            >
              <div className="w-2 h-2 bg-neon-cyan rounded-full hover:scale-105 transition-transform" />
              <span>Live</span>
            </motion.div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Enhanced Glowing Microphone Icon - Live Call Aesthetic */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Outer glow rings */}
                  <motion.div
                    className="absolute inset-0 bg-electric-purple/4 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.04, 0.06, 0.04],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-neon-cyan/3 rounded-full blur-xl -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.03, 0.05, 0.03],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                  
                  {/* Microphone container */}
                  <div className="relative p-10 rounded-full bg-gradient-to-br from-electric-purple/3 via-electric-purple/2 to-neon-cyan/2 border-2 border-electric-purple/4 backdrop-blur-sm">
                    <Mic className="w-16 h-16 text-electric-purple drop-shadow-lg" />
                  </div>
                </motion.div>

                <p className="text-slate-400 text-center max-w-xs">
                  Experience our AI voice assistant in action
                </p>

                <Button
                  onClick={startDemo}
                  variant="glow"
                  size="lg"
                  className="mt-2 group/btn"
                >
                  <Volume2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  Start Demo
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col gap-4"
              >
                {/* Live Call Interface: Glowing Microphone + Waveform */}
                <div className="flex flex-col items-center gap-4 mb-2">
                  {/* Active Microphone Icon */}
                  <motion.div
                    className="relative"
                    animate={{
                      scale: isRecording ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isRecording ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-electric-purple/5 rounded-full blur-xl"
                      animate={{
                        opacity: isRecording ? [0.05, 0.08, 0.05] : 0.03,
                        scale: isRecording ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isRecording ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="relative p-4 rounded-full bg-gradient-to-br from-electric-purple/4 to-neon-cyan/3 border-2 border-electric-purple/5">
                      <Mic className="w-8 h-8 text-electric-purple" />
                    </div>
                  </motion.div>

                  {/* Enhanced Waveform Visualizer */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="w-full"
                  >
                    <Waveform />
                  </motion.div>
                </div>

                {/* Conversation Messages - Chat Bubbles */}
                <div className="flex flex-col gap-3 max-h-48 overflow-y-auto px-1">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: msg.sender === "ai" ? -20 : 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={cn(
                          "flex",
                          msg.sender === "ai" ? "justify-start" : "justify-end"
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-xl px-4 py-2.5 max-w-[85%] backdrop-blur-sm",
                            msg.sender === "ai"
                              ? "bg-slate-800/60 text-slate-200 border border-slate-700/50"
                              : "bg-electric-purple/30 text-electric-purple border border-electric-purple/40 glow-purple"
                          )}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Status Indicator */}
                {!isRecording && messages.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-sm text-slate-400"
                  >
                    <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                    <span>Demo complete</span>
                  </motion.div>
                )}

                <Button
                  onClick={resetDemo}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Reset Demo
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
