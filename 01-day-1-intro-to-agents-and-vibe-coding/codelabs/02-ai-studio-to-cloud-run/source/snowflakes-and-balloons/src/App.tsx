/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Snowflake, Sparkles, Trash2, Zap, Heart, Volume2, VolumeX, Eye, EyeOff } from "lucide-react";
import VisualCanvas from "./components/VisualCanvas";

// Web Audio API Synthesizer helpers
const playSnowChime = (isEnabled: boolean) => {
  if (!isEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // Play a lovely sparkling crystal chime sequence
    const notes = [1500, 2100, 2800];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      
      gain.gain.setValueAtTime(0.04, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.35);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.4);
    });
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

const playBalloonFloat = (isEnabled: boolean) => {
  if (!isEnabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle"; // Warm, soft physical sound
    const now = ctx.currentTime;
    
    // Create an uplifting bubble frequency sweep (160Hz up to 480Hz)
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.35);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

export default function App() {
  const [snowflakeCount, setSnowflakeCount] = useState(0);
  const [balloonCount, setBalloonCount] = useState(0);

  // Sound FX and Reduced Motion settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Real-time active simulation counts reported back by the canvas engine
  const [activeSnowflakes, setActiveSnowflakes] = useState(0);
  const [activeBalloons, setActiveBalloons] = useState(0);

  // Active effect countdowns (remaining seconds out of 5s)
  const [snowTimeLeft, setSnowTimeLeft] = useState(0);
  const [balloonTimeLeft, setBalloonTimeLeft] = useState(0);

  // Timestamps of triggers to handle exact 5-second countdown progress perfectly
  const lastSnowTriggerTimeRef = useRef<number>(0);
  const lastBalloonTriggerTimeRef = useRef<number>(0);

  // Incremented triggers to signal canvas to spawn new batches
  const [spawnSnowflakesTrigger, setSpawnSnowflakesTrigger] = useState(0);
  const [spawnBalloonsTrigger, setSpawnBalloonsTrigger] = useState(0);
  const [clearTrigger, setClearTrigger] = useState(0);

  const handleActiveCountsChange = useCallback((snowflakes: number, balloons: number) => {
    setActiveSnowflakes(snowflakes);
    setActiveBalloons(balloons);
  }, []);

  // Sync real-time 5-second countdown timer safely based on triggered timestamps
  useEffect(() => {
    let frameId: number;
    const updateCountdowns = () => {
      const now = Date.now();

      if (lastSnowTriggerTimeRef.current > 0) {
        const elapsed = now - lastSnowTriggerTimeRef.current;
        const remaining = Math.max(0, (5000 - elapsed) / 1000);
        setSnowTimeLeft(remaining);
        if (remaining === 0) lastSnowTriggerTimeRef.current = 0;
      } else {
        setSnowTimeLeft(0);
      }

      if (lastBalloonTriggerTimeRef.current > 0) {
        const elapsed = now - lastBalloonTriggerTimeRef.current;
        const remaining = Math.max(0, (5000 - elapsed) / 1000);
        setBalloonTimeLeft(remaining);
        if (remaining === 0) lastBalloonTriggerTimeRef.current = 0;
      } else {
        setBalloonTimeLeft(0);
      }

      frameId = requestAnimationFrame(updateCountdowns);
    };

    frameId = requestAnimationFrame(updateCountdowns);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const triggerSnowflakes = () => {
    lastSnowTriggerTimeRef.current = Date.now();
    setSpawnSnowflakesTrigger((prev) => prev + 1);
    setSnowflakeCount((prev) => prev + 1);
    playSnowChime(soundEnabled);
  };

  const triggerBalloons = () => {
    lastBalloonTriggerTimeRef.current = Date.now();
    setSpawnBalloonsTrigger((prev) => prev + 1);
    setBalloonCount((prev) => prev + 1);
    playBalloonFloat(soundEnabled);
  };

  const triggerBoth = () => {
    triggerSnowflakes();
    triggerBalloons();
  };

  const clearCanvas = () => {
    // Zero out count triggers and countdown remaining times cleanly
    lastSnowTriggerTimeRef.current = 0;
    lastBalloonTriggerTimeRef.current = 0;
    setSnowTimeLeft(0);
    setBalloonTimeLeft(0);
    
    // Clear the active canvas without page reload
    setClearTrigger((prev) => prev + 1);
  };

  const hasActiveParticles = activeSnowflakes > 0 || activeBalloons > 0;

  return (
    <main className="relative h-screen h-[100dvh] w-full bg-[#0f172a] font-sans text-slate-100 flex flex-col justify-between overflow-hidden select-none">
      {/* Frosted Glass Mesh Gradient Background */}
      <div className="mesh-bg" />

      {/* Decorative Blur Background Emojis from Design HTML */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute opacity-5 blur-[2px] text-[120px]" style={{ top: "10%", left: "5%" }}>❄️</div>
        <div className="absolute opacity-5 blur-[2px] text-[120px]" style={{ bottom: "15%", right: "10%" }}>🎈</div>
        <div className="absolute opacity-5 blur-[2px] text-[120px]" style={{ top: "40%", right: "5%" }}>❄️</div>
        <div className="absolute opacity-5 blur-[2px] text-[120px]" style={{ bottom: "5%", left: "20%" }}>🎈</div>
      </div>

      {/* 2. Interactive High-Performance Simulation Canvas */}
      <VisualCanvas
        snowflakeTrigger={spawnSnowflakesTrigger}
        balloonTrigger={spawnBalloonsTrigger}
        clearTrigger={clearTrigger}
        reducedMotion={reducedMotion}
        onActiveCountsChange={handleActiveCountsChange}
      />

      {/* HEADER SECTION */}
      <header className="relative z-20 w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center max-w-7xl mx-auto flex-shrink-0">
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
            <span className="text-sm sm:text-[15px]">❄️</span>
          </div>
          <span className="font-display font-semibold tracking-tight text-sm sm:text-base text-white/90">
            Snowflakes & Balloons
          </span>
        </div>

        {/* Playful & Clean interactive settings bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Sound Toggle Button */}
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all border cursor-pointer ${
              soundEnabled
                ? "bg-white/10 border-white/20 text-cyan-300"
                : "bg-white/[0.02] border-white/5 text-slate-400"
            }`}
            title={soundEnabled ? "Mute sounds" : "Enable sound effects"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Reduced Motion Toggle Button */}
          <button
            onClick={() => setReducedMotion((prev) => !prev)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all border cursor-pointer ${
              reducedMotion
                ? "bg-white/10 border-white/20 text-rose-300"
                : "bg-white/[0.02] border-white/5 text-slate-400"
            }`}
            title={reducedMotion ? "Standard motion enabled" : "Reduce physical movement representation"}
          >
            {reducedMotion ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>
      </header>

      {/* FLOATING DIRECT ACTIVE TIMERS OVERLAY */}
      {(snowTimeLeft > 0 || balloonTimeLeft > 0) && (
        <div className="absolute top-[60px] sm:top-16 md:top-20 left-4 right-4 md:left-auto md:right-6 flex flex-row md:flex-col justify-center items-center gap-2 z-30 pointer-events-none md:w-[260px]">
          {snowTimeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-auto md:w-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md rounded-xl p-1.5 sm:p-2 px-2.5 sm:px-3 flex items-center justify-between gap-2.5 sm:gap-4 shadow-xl"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs animate-spin text-cyan-300" style={{ animationDuration: "3s" }}>❄️</span>
                <span className="text-[10px] sm:text-xs text-slate-200 font-medium tracking-wide whitespace-nowrap">Snow active</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="hidden sm:block w-12 md:w-16 h-1 bg-cyan-950/80 rounded-full overflow-hidden border border-cyan-800/25">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-75"
                    style={{ width: `${(snowTimeLeft / 5) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300">{snowTimeLeft.toFixed(1)}s</span>
              </div>
            </motion.div>
          )}

          {balloonTimeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-auto md:w-full bg-slate-900/90 border border-rose-500/30 backdrop-blur-md rounded-xl p-1.5 sm:p-2 px-2.5 sm:px-3 flex items-center justify-between gap-2.5 sm:gap-4 shadow-xl"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs animate-bounce text-rose-300">🎈</span>
                <span className="text-[10px] sm:text-xs text-slate-200 font-medium tracking-wide whitespace-nowrap">Balloons active</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="hidden sm:block w-12 md:w-16 h-1 bg-rose-950/80 rounded-full overflow-hidden border border-rose-800/25">
                  <div
                    className="h-full bg-rose-400 transition-all duration-75"
                    style={{ width: `${(balloonTimeLeft / 5) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-rose-300">{balloonTimeLeft.toFixed(1)}s</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* HERO & TACTILE CARD SECTION */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-4 overflow-hidden min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] glass-card rounded-[24px] sm:rounded-[32px] md:rounded-[40px] p-4 sm:p-6 md:p-10 relative overflow-hidden flex flex-col justify-between my-auto"
          id="main-celebration-card"
        >
          {/* Subtle glowing reflection line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="text-center">
            {/* Elegant Tag */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-slate-300 font-medium mb-3 sm:mb-4 md:mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              Tap to Make the Sky Move
            </div>

            <h1 className="title font-display font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-[1.1] mb-2 sm:mb-3 bg-gradient-to-r from-white to-[#94a3b8] bg-clip-text text-transparent">
              Snowflakes & Balloons
            </h1>

            <p className="description font-light text-slate-300 text-xs sm:text-sm md:text-base leading-[1.5] max-w-sm mx-auto mb-5 sm:mb-6 md:mb-8">
              A playful mini experience for your screen. Tap once to release a gentle snowfall or send colorful balloons floating upward.
            </p>
          </div>

          {/* TWO MAIN INTERACTIVE BUTTONS WITH HOVER STATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Button 1: Snowflakes ❄️ */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={triggerSnowflakes}
              className="btn-snow-glass relative px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer group"
              id="trigger-snowflakes-button"
            >
              <span className="text-lg group-hover:rotate-[30deg] transition-transform duration-300 text-[#cae8ff]">❄️</span>
              Snowflakes
            </motion.button>

            {/* Button 2: Balloons 🎈 */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={triggerBalloons}
              className="btn-balloon-glass relative px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer group"
              id="trigger-balloons-button"
            >
              <span className="text-lg group-hover:scale-120 transition-transform duration-300">🎈</span>
              Balloons
            </motion.button>
          </div>

          {/* SECONDARY SPECIAL DOUBLE TRIGGER & RESET CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-white/5 mt-4 sm:mt-6">
            <button
              onClick={triggerBoth}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 text-[11px] sm:text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer"
              id="trigger-combo-button"
            >
              <Zap className="w-3 h-3 text-amber-300" />
              Start Celebration Mix
            </button>

            {hasActiveParticles && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearCanvas}
                className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-red-950/20 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 text-[11px] sm:text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer"
                id="clear-simulation-button"
              >
                <Trash2 className="w-3 h-3" />
                Clear Space
              </motion.button>
            )}
          </div>

          {/* ACTIVE COUNTER STATISTICS (PREMIUM PILLS) */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/[0.01] rounded-xl sm:rounded-2xl py-2 sm:py-2.5 px-3 border border-white/5">
              <span className="block text-[9px] font-semibold text-slate-400 tracking-wider uppercase">Snowflakes on screen</span>
              <span className="text-xl sm:text-2xl font-bold font-display text-[#bae6fd] mt-0.5 block">
                {activeSnowflakes}
              </span>
            </div>
            <div className="bg-white/[0.01] rounded-xl sm:rounded-2xl py-2 sm:py-2.5 px-3 border border-white/5">
              <span className="block text-[9px] font-semibold text-slate-400 tracking-wider uppercase">Balloons floating</span>
              <span className="text-xl sm:text-2xl font-bold font-display text-[#fca5a5] mt-0.5 block">
                {activeBalloons}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full text-center py-2 px-4 flex-shrink-0" />
    </main>
  );
}
