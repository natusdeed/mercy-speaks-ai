"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, CheckCircle2, Activity, ScanLine, Calendar, Phone, Star, Mail, DollarSign } from "lucide-react";

type ActivityType = "lead" | "call" | "email" | "revenue" | "success";

interface Activity {
  type: ActivityType;
  business: string;
  action: string;
  value: string;
  time: string;
  icon: string;
}

const activities: Activity[] = [
  { 
    type: 'lead',
    business: 'Martinez HVAC',
    action: 'Lead captured',
    value: '$4,200',
    time: '2 min ago',
    icon: '💰'
  },
  { 
    type: 'call',
    business: 'Elite Dental',
    action: 'Appointment booked',
    value: '11:47 PM',
    time: '15 min ago',
    icon: '📞'
  },
  { 
    type: 'lead',
    business: 'Houston Medical Group',
    action: 'Lead captured',
    value: '$1,200',
    time: '22 min ago',
    icon: '💰'
  },
  { 
    type: 'call',
    business: 'Premier Realty Co',
    action: 'AI handled',
    value: '18 calls today',
    time: '28 min ago',
    icon: '📞'
  },
  { 
    type: 'revenue',
    business: 'Bayou Plumbing Services',
    action: 'Emergency call routed',
    value: '$450 service call',
    time: '35 min ago',
    icon: '💵'
  },
  { 
    type: 'success',
    business: 'Gulf Coast Insurance',
    action: 'Quote request processed',
    value: '',
    time: '42 min ago',
    icon: '✅'
  },
];

export function LiveStatusTile() {
  const [displayedLogs, setDisplayedLogs] = useState<Activity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < activities.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, activities[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, currentIndex === 0 ? 1000 : 1500);

      return () => clearTimeout(timer);
    } else {
      // Reset after completion
      const resetTimer = setTimeout(() => {
        setDisplayedLogs([]);
        setCurrentIndex(0);
      }, 8000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex]);

  return (
    <div className="glass rounded-2xl p-6 flex flex-col relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/1 via-transparent to-electric-purple/1 opacity-5" />

      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-neon-cyan/20 backdrop-blur-sm">
              <Terminal className="w-5 h-5 text-neon-cyan" />
            </div>
            <h3 className="text-lg font-semibold text-slate-50">AI Agent Status</h3>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-xs text-neon-cyan"
          >
            <Activity className="w-3 h-3" />
            <span>LIVE</span>
          </motion.div>
        </div>

        {/* Magic UI-style Animated List */}
        <div className="flex flex-col gap-2">
          {displayedLogs.map((activity, index) => {
            // Color coding based on activity type
            const typeConfig = {
              lead: {
                iconBg: "bg-green-500/20",
                iconColor: "text-green-400",
                pulseColor: "bg-green-500",
                borderColor: "border-green-500/50",
                hoverBorderColor: "hover:border-green-500/80",
              },
              success: {
                iconBg: "bg-green-500/20",
                iconColor: "text-green-400",
                pulseColor: "bg-green-500",
                borderColor: "border-green-500/50",
                hoverBorderColor: "hover:border-green-500/80",
              },
              call: {
                iconBg: "bg-blue-500/20",
                iconColor: "text-blue-400",
                pulseColor: "bg-blue-500",
                borderColor: "border-blue-500/50",
                hoverBorderColor: "hover:border-blue-500/80",
              },
              email: {
                iconBg: "bg-purple-500/20",
                iconColor: "text-purple-400",
                pulseColor: "bg-purple-500",
                borderColor: "border-purple-500/50",
                hoverBorderColor: "hover:border-purple-500/80",
              },
              revenue: {
                iconBg: "bg-yellow-500/20",
                iconColor: "text-yellow-400",
                pulseColor: "bg-yellow-500",
                borderColor: "border-yellow-500/50",
                hoverBorderColor: "hover:border-yellow-500/80",
              },
            };
            const config = typeConfig[activity.type];

            return (
              <motion.div
                key={`${activity.business}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border ${config.borderColor} ${config.hoverBorderColor} transition-all group/item relative overflow-hidden hover:scale-[1.02] hover:translate-x-1`}
              >
                {/* Pulse effect */}
                <div
                  className={`absolute inset-0 ${config.pulseColor} opacity-0 animate-pulse`}
                />
                
                <div
                  className={`p-1.5 rounded-md ${config.iconBg} relative z-10 flex items-center justify-center text-lg`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-50 group-hover/item:text-neon-cyan transition-colors">
                      {activity.business}
                    </span>
                    <span className="text-sm text-slate-300 group-hover/item:text-slate-50 transition-colors">
                      - {activity.action}
                    </span>
                    {activity.value && (
                      <span className="text-sm font-medium text-electric-purple group-hover/item:text-electric-purple/80 transition-colors">
                        {activity.value}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 group-hover/item:text-slate-400 transition-colors">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <div className="relative z-10">
                  <CheckCircle2 className={`w-4 h-4 ${config.iconColor}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
