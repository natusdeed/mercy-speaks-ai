"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RoiCalculator() {
  const [supportStaff, setSupportStaff] = useState(5);
  const [supportStaffInput, setSupportStaffInput] = useState("5");
  const [hourlyRate, setHourlyRate] = useState(25);

  // Calculate ROI
  const calculations = useMemo(() => {
    const hoursPerYear = 2080; // Full-time equivalent
    const currentCost = supportStaff * hourlyRate * hoursPerYear;
    const aiCost = 1040; // Fixed monthly AI cost per year (or calculate based on staff)
    const yearlySavings = currentCost - aiCost;
    const costReduction = currentCost > 0 ? ((yearlySavings / currentCost) * 100) : 0;

    return {
      currentCost,
      aiCost,
      yearlySavings,
      costReduction,
    };
  }, [supportStaff, hourlyRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 h-full flex flex-col relative overflow-hidden group">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/1 via-transparent to-electric-purple/1 opacity-5" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan/1 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-electric-purple/1 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon-cyan/20 backdrop-blur-sm">
            <Calculator className="w-5 h-5 text-neon-cyan" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-50">ROI Calculator</h3>
        </div>

        {/* Calculator Content */}
        <div className="flex-1 flex flex-col">
          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs text-slate-400 mb-2">Number of Support Staff</label>
              <input
                type="number"
                min="1"
                max="100"
                value={supportStaffInput}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  // Update input display value (allows empty string)
                  setSupportStaffInput(rawValue);
                  // Only update numeric state if we have a valid number
                  if (rawValue !== "") {
                    const parsed = parseInt(rawValue);
                    if (!isNaN(parsed)) {
                      const validatedValue = Math.max(1, parsed);
                      setSupportStaff(validatedValue);
                      // Sync input display with validated value
                      setSupportStaffInput(validatedValue.toString());
                    }
                  }
                }}
                onBlur={(e) => {
                  // When field loses focus, ensure it has a valid value
                  if (e.target.value === "" || isNaN(parseInt(e.target.value))) {
                    setSupportStaff(1);
                    setSupportStaffInput("1");
                  }
                }}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-50 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                min="10"
                max="200"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(10, parseInt(e.target.value) || 10))}
                className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-50 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-colors"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4 mb-6 flex-1">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">Current Cost</div>
              <div className="text-xl font-bold text-slate-50">
                {formatCurrency(calculations.currentCost)}/year
              </div>
            </div>

            <div className="bg-gradient-to-br from-neon-cyan/10 to-electric-purple/10 rounded-lg p-4 border border-neon-cyan/30">
              <div className="text-xs text-neon-cyan mb-1">Yearly Savings</div>
              <div className="text-2xl font-bold text-neon-cyan">
                {formatCurrency(calculations.yearlySavings)}
              </div>
              <div className="text-xs text-neon-cyan/80 mt-1 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                {calculations.costReduction.toFixed(1)}% cost reduction
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">AI Cost</div>
              <div className="text-lg font-semibold text-neon-cyan">
                {formatCurrency(calculations.aiCost)}/year
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="glow"
            size="lg"
            asChild
            className="w-full group/btn"
          >
            <Link href="/book-demo" className="flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
