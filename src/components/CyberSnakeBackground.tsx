import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Compass, Sparkles, Trophy, Gamepad2, Volume2, VolumeX, Eye, EyeOff, X, RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  alphaDelta: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  alpha: number;
  vy: number;
}

export const CyberSnakeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [playMode, setPlayMode] = useState<'auto' | 'manual'>('auto');
  const [score, setScore] = useState(0);
  const [frogsCaught, setFrogsCaught] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCardHidden, setIsCardHidden] = useState(false);

  // References for game loop state without recreating event listeners
  const gameStateRef = useRef({
    playMode: 'auto' as 'auto' | 'manual',
    manualDirection: { x: 1, y: 0 },
    score: 0,
    frogsCaught: 0,
  });

  // Keep ref synced
  useEffect(() => {
    gameStateRef.current.playMode = playMode;
  }, [playMode]);

  const handleResetGame = useCallback(() => {
    setScore(0);
    setFrogsCaught(0);
    gameStateRef.current.score = 0;
    gameStateRef.current.frogsCaught = 0;
  }, []);

  // Handle keyboard arrow, WASD, and Escape keys when manual play is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameStateRef.current.playMode === 'manual') {
        setPlayMode('auto');
        return;
      }
      if (gameStateRef.current.playMode !== 'manual') return;
      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        gameStateRef.current.manualDirection = { x: 0, y: -1 };
      } else if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        gameStateRef.current.manualDirection = { x: 0, y: 1 };
      } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        gameStateRef.current.manualDirection = { x: -1, y: 0 };
      } else if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        gameStateRef.current.manualDirection = { x: 1, y: 0 };
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleManualDirection = (x: number, y: number) => {
    setPlayMode('manual');
    gameStateRef.current.playMode = 'manual';
    gameStateRef.current.manualDirection = { x, y };
  };

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Universe Starfield Initialization (120 stars)
    const starColors = ['#ffffff', '#7dd3fc', '#a7f3d0', '#fde047', '#e0e7ff'];
    const stars: Star[] = Array.from({ length: 110 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      alpha: Math.random() * 0.7 + 0.2,
      alphaDelta: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    // Particle Bursts & Floating Text Effects
    const particles: Particle[] = [];
    const floatingTexts: FloatingText[] = [];

    // Prominent Cyber-Snake Initialization
    const snakeLength = 26;
    const snake: Point[] = [];
    let head: Point = { x: width * 0.4, y: height * 0.35 };
    let velocity: Point = { x: 2.2, y: 1.4 };

    for (let i = 0; i < snakeLength; i++) {
      snake.push({ x: head.x - i * 14, y: head.y });
    }

    // Quantum Frog Initialization
    const frog = {
      x: width * 0.65,
      y: height * 0.4,
      targetX: width * 0.65,
      targetY: height * 0.4,
      vx: 0,
      vy: 0,
      radius: 13,
      hopTimer: 0,
      pulse: 0,
      eyeBlink: 0,
      isHopping: false,
    };

    const triggerCatchEffect = (x: number, y: number) => {
      // Spawn 32 colorful shockwave particles
      const colors = ['#22d3ee', '#34d399', '#a855f7', '#fbbf24', '#ffffff'];
      for (let i = 0; i < 32; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 2.0;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 45,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2,
        });
      }

      floatingTexts.push({
        x: Math.min(Math.max(x - 50, 60), width - 160),
        y: Math.max(y - 20, 60),
        text: '+100 Quantum Data!',
        alpha: 1,
        vy: -1.2,
      });

      setScore((prev) => prev + 100);
      setFrogsCaught((prev) => prev + 1);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Universe Cosmic Backdrop (Deep Nebula Glows)
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 20, width * 0.2, height * 0.3, 400);
      grad1.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
      grad1.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 30, width * 0.8, height * 0.7, 450);
      grad2.addColorStop(0, 'rgba(168, 85, 247, 0.035)');
      grad2.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Twinkling Universe Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.alphaDelta;
        if (star.alpha > 0.85 || star.alpha < 0.15) {
          star.alphaDelta *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 3. Update Quantum Frog Position & Hopping Behavior
      frog.pulse += 0.06;
      frog.eyeBlink += 0.02;
      frog.hopTimer += 1;

      // Distance from snake head to frog
      const distToHead = Math.hypot(frog.x - head.x, frog.y - head.y);

      // Frog hops periodically or when snake approaches too close!
      if (frog.hopTimer > 180 || (distToHead < 120 && !frog.isHopping)) {
        frog.hopTimer = 0;
        frog.isHopping = true;
        // Hop away from snake or to random safe location
        const escapeAngle = Math.atan2(frog.y - head.y, frog.x - head.x) + (Math.random() - 0.5) * 0.8;
        const hopDist = Math.random() * 120 + 80;
        let nx = frog.x + Math.cos(escapeAngle) * hopDist;
        let ny = frog.y + Math.sin(escapeAngle) * hopDist;

        // Keep inside bounds
        nx = Math.max(80, Math.min(width - 80, nx));
        ny = Math.max(80, Math.min(height - 80, ny));

        frog.targetX = nx;
        frog.targetY = ny;
      }

      // Smooth hop interpolation
      if (frog.isHopping) {
        frog.x += (frog.targetX - frog.x) * 0.12;
        frog.y += (frog.targetY - frog.y) * 0.12;
        if (Math.hypot(frog.targetX - frog.x, frog.targetY - frog.y) < 4) {
          frog.isHopping = false;
        }
      }

      // Check if Snake caught Frog!
      if (distToHead < 26) {
        triggerCatchEffect(frog.x, frog.y);
        // Teleport frog to new location
        frog.x = Math.random() * (width - 180) + 90;
        frog.y = Math.random() * (height - 180) + 90;
        frog.targetX = frog.x;
        frog.targetY = frog.y;
        frog.isHopping = false;
        frog.hopTimer = 0;
      }

      // 4. Update Snake Movement (Auto-Hunt AI vs Manual Play)
      const currentMode = gameStateRef.current.playMode;
      if (currentMode === 'auto') {
        // AI Steering towards Quantum Frog
        const angleToFrog = Math.atan2(frog.y - head.y, frog.x - head.x);
        velocity.x += Math.cos(angleToFrog) * 0.18;
        velocity.y += Math.sin(angleToFrog) * 0.18;

        const currentSpeed = Math.hypot(velocity.x, velocity.y);
        const maxSpeed = 3.6;
        if (currentSpeed > maxSpeed) {
          velocity.x = (velocity.x / currentSpeed) * maxSpeed;
          velocity.y = (velocity.y / currentSpeed) * maxSpeed;
        }
      } else {
        // Manual Steering
        const dir = gameStateRef.current.manualDirection;
        const manualSpeed = 3.8;
        velocity.x = dir.x * manualSpeed;
        velocity.y = dir.y * manualSpeed;
      }

      head.x += velocity.x;
      head.y += velocity.y;

      // Screen boundary wrap-around
      if (head.x < 0) head.x = width;
      if (head.x > width) head.x = 0;
      if (head.y < 0) head.y = height;
      if (head.y > height) head.y = 0;

      // Update snake segments follow
      snake.unshift({ x: head.x, y: head.y });
      if (snake.length > snakeLength) {
        snake.pop();
      }

      // 5. Draw Quantum Frog (Prominent, Glowing, Cyber-Frog)
      ctx.save();
      ctx.translate(frog.x, frog.y);

      // Frog Outer Quantum Energy Field
      const frogGlowRadius = frog.radius + 6 + Math.sin(frog.pulse) * 3;
      const frogGlow = ctx.createRadialGradient(0, 0, 4, 0, 0, frogGlowRadius + 10);
      frogGlow.addColorStop(0, 'rgba(52, 211, 153, 0.45)');
      frogGlow.addColorStop(0.7, 'rgba(16, 185, 129, 0.2)');
      frogGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = frogGlow;
      ctx.beginPath();
      ctx.arc(0, 0, frogGlowRadius + 10, 0, Math.PI * 2);
      ctx.fill();

      // Frog Rear Webbed Legs (Cyber-emerald)
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.ellipse(-12, 6, 6, 10, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(12, 6, 6, 10, 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Frog Body
      const bodyGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, frog.radius);
      bodyGrad.addColorStop(0, '#6ee7b7');
      bodyGrad.addColorStop(0.6, '#10b981');
      bodyGrad.addColorStop(1, '#047857');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, frog.radius, frog.radius * 0.9, 0, 0, Math.PI * 2);
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Frog Glowing Eyes
      const eyeOpen = Math.sin(frog.eyeBlink) > -0.92;
      // Left eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-6, -8, 4, 0, Math.PI * 2);
      ctx.fill();
      if (eyeOpen) {
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.arc(-6, -8, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Right eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(6, -8, 4, 0, Math.PI * 2);
      ctx.fill();
      if (eyeOpen) {
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.arc(6, -8, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Quantum Core Icon on Frog Back
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚡', 0, 3);

      ctx.restore();

      // 6. Draw Cyber-Snake (Prominent, Glowing, High Visual Presence)
      for (let i = snake.length - 1; i >= 0; i--) {
        const pt = snake[i];
        const t = 1 - i / snake.length; // 1 at head, 0 at tail
        const segmentRadius = Math.max(4.5, t * 12.5 + 2.5);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, segmentRadius, 0, Math.PI * 2);

        // Segment Gradient (Cyan to Emerald Neon)
        if (i === 0) {
          // Head segment
          const headGrad = ctx.createRadialGradient(pt.x - 2, pt.y - 2, 2, pt.x, pt.y, segmentRadius);
          headGrad.addColorStop(0, '#a5f3fc');
          headGrad.addColorStop(0.5, '#06b6d4');
          headGrad.addColorStop(1, '#0891b2');
          ctx.fillStyle = headGrad;
          ctx.shadowColor = '#22d3ee';
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Snake Cybernetic Eyes
          const headingAngle = Math.atan2(velocity.y, velocity.x);
          const eyeDist = 6;
          const eyeForward = 5;

          const lx = pt.x + Math.cos(headingAngle + 0.6) * eyeDist + Math.cos(headingAngle) * eyeForward;
          const ly = pt.y + Math.sin(headingAngle + 0.6) * eyeDist + Math.sin(headingAngle) * eyeForward;
          const rx = pt.x + Math.cos(headingAngle - 0.6) * eyeDist + Math.cos(headingAngle) * eyeForward;
          const ry = pt.y + Math.sin(headingAngle - 0.6) * eyeDist + Math.sin(headingAngle) * eyeForward;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(lx, ly, 3, 0, Math.PI * 2);
          ctx.arc(rx, ry, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(lx, ly, 1.5, 0, Math.PI * 2);
          ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Body segment
          const alpha = Math.max(0.25, t * 0.75);
          ctx.fillStyle = i % 2 === 0 ? `rgba(6, 182, 212, ${alpha})` : `rgba(16, 185, 129, ${alpha})`;
          if (i < 8) {
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 8;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner metallic cyber ring
          if (i % 3 === 0) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 7. Render Particle Shockwaves
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 8. Render Floating Texts
      for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y += ft.vy;
        ft.alpha -= 0.02;

        if (ft.alpha <= 0) {
          floatingTexts.splice(i, 1);
          continue;
        }

        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.fillStyle = `rgba(52, 211, 153, ${ft.alpha})`;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  return (
    <>
      {/* Universe Canvas Layer: In Manual Play, elevated to z-40 with top-layer visibility so snake & frog are 100% visible */}
      <div
        className={`fixed inset-0 overflow-hidden transition-all duration-300 ${
          playMode === 'manual'
            ? 'z-40 pointer-events-auto bg-slate-950/85 backdrop-blur-[2px]'
            : 'z-0 pointer-events-none'
        }`}
      >
        {enabled && (
          <canvas
            ref={canvasRef}
            className={`w-full h-full transition-opacity duration-300 ${
              playMode === 'manual' ? 'opacity-100' : 'opacity-85'
            }`}
          />
        )}
      </div>

      {/* Top Arcade HUD when Manual Play is Active (z-50) */}
      {playMode === 'manual' && (
        <aside
          aria-label="Cyber-Snake Manual Arcade HUD"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl animate-fadeIn"
        >
          <div className="p-3 sm:px-5 sm:py-3.5 rounded-2xl bg-slate-950/95 border border-emerald-500/60 shadow-2xl shadow-emerald-500/25 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-100">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-wide">
                    Cyber-Snake Arcade
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">
                    TOP VIEW ACTIVE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Steer the cyber snake to catch quantum frogs &bull; Arrow Keys / WASD
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Score:</span>
                <span className="text-cyan-400 font-bold">{score}</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-bold">{frogsCaught} frogs</span>
              </div>

              <button
                type="button"
                onClick={handleResetGame}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Reset Game Score"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setPlayMode('auto')}
                className="px-3 py-2 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-md shadow-rose-500/20 whitespace-nowrap"
                title="Return to background AI Auto-Hunt (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Arcade</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Interactive Cyber-Snake & Frog Universe Control Dock (Compact Low-Profile Bar, z-40) */}
      {isCardHidden && playMode === 'auto' ? (
        /* Minimized Floating Trigger Pill when card is hidden */
        <button
          type="button"
          onClick={() => setIsCardHidden(false)}
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 md:right-24 z-40 cursor-pointer pointer-events-auto px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900/95 hover:bg-slate-850 border border-emerald-500/50 text-emerald-400 hover:text-white text-[11px] sm:text-xs font-mono shadow-xl backdrop-blur-xl flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          title="Show Cyber-Snake Play / Stats Card"
        >
          <Gamepad2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold">Snake: {score} pts</span>
          <span className="text-[10px] text-cyan-400 underline ml-0.5 hidden xs:inline">Open</span>
        </button>
      ) : (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 md:right-24 z-40 pointer-events-auto max-w-[calc(100vw-7rem)] sm:max-w-sm">
          <div className="py-1 px-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-2xl shadow-xl shadow-cyan-500/10 text-xs text-slate-200 transition-all">
            {/* Main Slim Status Bar */}
            <div className="flex items-center justify-between gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2 min-w-0">
                <span className="relative flex h-2 w-2 sm:h-3 sm:w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-emerald-500" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="font-bold text-white font-mono text-[9px] sm:text-[11px] truncate leading-tight">
                      <span className="sm:hidden">Snake</span>
                      <span className="hidden sm:inline">Cyber-Snake</span>
                    </span>
                    <span className="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[8px] sm:text-[10px] font-bold shrink-0">
                      {score} <span className="hidden sm:inline">pts</span>
                    </span>
                  </div>
                  <span className="text-[9px] text-cyan-400 font-mono hidden sm:block">
                    {playMode === 'auto' ? 'AI Auto-Hunt' : 'Manual Arcade'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {/* Play / Stats Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`px-2 py-1 text-[9px] sm:text-[10px] font-mono rounded-lg transition-colors flex items-center gap-1 font-semibold ${
                    isExpanded
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-slate-850 hover:bg-slate-800 text-cyan-300 border border-slate-750'
                  }`}
                  title={isExpanded ? 'Collapse card stats' : 'Expand score stats & game controls'}
                >
                  <Gamepad2 className="w-3 h-3" />
                  <span className="hidden sm:inline">{isExpanded ? 'Collapse' : 'Play / Stats'}</span>
                  <span className="sm:hidden">{isExpanded ? 'Hide' : 'Play'}</span>
                </button>

                {/* Canvas Animation Toggle */}
                <button
                  onClick={() => setEnabled(!enabled)}
                  className="p-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title={enabled ? 'Turn snake canvas off' : 'Turn snake canvas on'}
                >
                  {enabled ? <Eye className="w-3 h-3 text-cyan-400" /> : <EyeOff className="w-3 h-3 text-slate-500" />}
                </button>

                {/* Hide Card Completely */}
                <button
                  onClick={() => setIsCardHidden(true)}
                  className="p-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Hide this card"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Expanded Interactive Control Tray */}
            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-3 animate-fadeIn">
                {/* Score and Stats Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Score:</span>
                    <span className="text-cyan-400 font-bold">{score} pts</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Frogs Caught:</span>
                    <span className="text-emerald-400 font-bold">{frogsCaught}</span>
                  </div>
                </div>

                {/* Mode Toggle Buttons: AI Auto vs Manual Play */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayMode('auto')}
                    className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      playMode === 'auto'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>AI Auto-Hunt</span>
                  </button>

                  <button
                    onClick={() => {
                      setPlayMode('manual');
                      setIsExpanded(true);
                      setIsCardHidden(false);
                    }}
                    className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      playMode === 'manual'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Manual Play</span>
                  </button>
                </div>

                {/* On-screen D-Pad for manual mode */}
                {playMode === 'manual' && (
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 mb-2 text-center">
                      Use Arrow Keys, WASD, or Click D-Pad:
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleManualDirection(0, -1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs flex items-center justify-center border border-slate-700 transition-colors"
                      >
                        ▲
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleManualDirection(-1, 0)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs flex items-center justify-center border border-slate-700 transition-colors"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => handleManualDirection(0, 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs flex items-center justify-center border border-slate-700 transition-colors"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleManualDirection(1, 0)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-xs flex items-center justify-center border border-slate-700 transition-colors"
                        >
                          ▶
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick hide card action */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/60">
                  <span>Arrow keys &amp; WASD supported</span>
                  <button
                    onClick={() => setIsCardHidden(true)}
                    className="text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Hide Card</span>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
