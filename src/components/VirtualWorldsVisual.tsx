import React, { useRef, useEffect, useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  Layers, 
  Move, 
  Zap,
  Info,
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface Pixel {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  baseAlpha: number;
  currentAlpha: number;
}

export const VirtualWorldsVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [crowdEnergyLevel, setCrowdEnergyLevel] = useState<number>(85);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [stats, setStats] = useState({ fps: 60, activePixels: 6400 });
  const [resetKey, setResetKey] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 920);
    let height = (canvas.height = 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 500;
      generateInceptionParisPixels();
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates and state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 125,
      isDown: false,
    };

    let pixels: Pixel[] = [];

    // Helper: Draw the iconic Paris Inception folding scene onto an off-screen buffer
    const generateInceptionParisPixels = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const w = width;
      const h = height;

      // 1. Sky & Atmospheric Twilight in the horizon gap
      const skyGrad = offCtx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#0f172a'); // deep navy at top
      skyGrad.addColorStop(0.35, '#1e293b');
      skyGrad.addColorStop(0.48, '#e0e7ff'); // twilight horizon light
      skyGrad.addColorStop(0.52, '#fde68a'); // golden sunset fold horizon
      skyGrad.addColorStop(0.65, '#334155');
      skyGrad.addColorStop(1, '#0f172a');
      offCtx.fillStyle = skyGrad;
      offCtx.fillRect(0, 0, w, h);

      // 2. LOWER HALF: Paris Street Level
      // Left Haussmann Building
      offCtx.fillStyle = '#edd6b1'; // Parisian limestone
      offCtx.fillRect(0, h * 0.52, w * 0.32, h * 0.48);

      // Mansard Roof on Left (Slate Blue)
      offCtx.fillStyle = '#475569';
      offCtx.beginPath();
      offCtx.moveTo(0, h * 0.52);
      offCtx.lineTo(w * 0.32, h * 0.52);
      offCtx.lineTo(w * 0.28, h * 0.44);
      offCtx.lineTo(0, h * 0.44);
      offCtx.fill();

      // Right Haussmann Building
      offCtx.fillStyle = '#e8d2ab'; // Parisian limestone
      offCtx.fillRect(w * 0.68, h * 0.52, w * 0.32, h * 0.48);

      // Mansard Roof on Right
      offCtx.fillStyle = '#475569';
      offCtx.beginPath();
      offCtx.moveTo(w * 0.68, h * 0.52);
      offCtx.lineTo(w, h * 0.52);
      offCtx.lineTo(w, h * 0.44);
      offCtx.lineTo(w * 0.72, h * 0.44);
      offCtx.fill();

      // Street in Central Perspective
      offCtx.fillStyle = '#374151'; // Cobblestone asphalt road
      offCtx.beginPath();
      offCtx.moveTo(w * 0.32, h);
      offCtx.lineTo(w * 0.68, h);
      offCtx.lineTo(w * 0.54, h * 0.52);
      offCtx.lineTo(w * 0.46, h * 0.52);
      offCtx.fill();

      // Sidewalks
      offCtx.fillStyle = '#9ca3af';
      offCtx.beginPath();
      offCtx.moveTo(w * 0.30, h);
      offCtx.lineTo(w * 0.34, h);
      offCtx.lineTo(w * 0.47, h * 0.52);
      offCtx.lineTo(w * 0.45, h * 0.52);
      offCtx.fill();

      offCtx.beginPath();
      offCtx.moveTo(w * 0.66, h);
      offCtx.lineTo(w * 0.70, h);
      offCtx.lineTo(w * 0.55, h * 0.52);
      offCtx.lineTo(w * 0.53, h * 0.52);
      offCtx.fill();

      // Left Parisian Cafe (Red / Orange Awning)
      offCtx.fillStyle = '#dc2626';
      offCtx.fillRect(w * 0.22, h * 0.78, w * 0.10, h * 0.05);
      offCtx.fillStyle = '#ea580c';
      offCtx.fillRect(w * 0.22, h * 0.83, w * 0.10, h * 0.02);

      // Parisian Trees (Rich Greens)
      offCtx.fillStyle = '#15803d';
      offCtx.beginPath();
      offCtx.arc(w * 0.36, h * 0.72, 28, 0, Math.PI * 2);
      offCtx.arc(w * 0.41, h * 0.62, 18, 0, Math.PI * 2);
      offCtx.arc(w * 0.64, h * 0.72, 28, 0, Math.PI * 2);
      offCtx.arc(w * 0.59, h * 0.62, 18, 0, Math.PI * 2);
      offCtx.fill();

      // Glowing Windows on Lower Buildings
      offCtx.fillStyle = '#fef08a';
      for (let floor = 0; floor < 5; floor++) {
        const yPos = h * 0.56 + floor * (h * 0.08);
        for (let col = 0; col < 4; col++) {
          offCtx.fillRect(w * 0.03 + col * (w * 0.07), yPos, w * 0.035, h * 0.045);
          offCtx.fillRect(w * 0.72 + col * (w * 0.065), yPos, w * 0.035, h * 0.045);
        }
      }

      // Continuous Wrought-Iron Balconies (Dark Charcoal)
      offCtx.fillStyle = '#18181b';
      offCtx.fillRect(0, h * 0.68, w * 0.32, h * 0.015);
      offCtx.fillRect(0, h * 0.84, w * 0.32, h * 0.015);
      offCtx.fillRect(w * 0.68, h * 0.68, w * 0.32, h * 0.015);
      offCtx.fillRect(w * 0.68, h * 0.84, w * 0.32, h * 0.015);

      // Warm Street Lamps (Amber Glow)
      offCtx.fillStyle = '#fbbf24';
      offCtx.beginPath();
      offCtx.arc(w * 0.38, h * 0.82, 6, 0, Math.PI * 2);
      offCtx.arc(w * 0.62, h * 0.82, 6, 0, Math.PI * 2);
      offCtx.fill();

      // 3. THE 90-DEGREE FOLDING CURVE (Center Transition)
      // The road and facades bending directly up into the sky
      offCtx.fillStyle = '#475569';
      offCtx.beginPath();
      offCtx.moveTo(w * 0.46, h * 0.52);
      offCtx.lineTo(w * 0.54, h * 0.52);
      offCtx.lineTo(w * 0.56, h * 0.46);
      offCtx.lineTo(w * 0.44, h * 0.46);
      offCtx.fill();

      // 4. UPPER HALF: The Inverted City Overhead (The Ceiling)
      // Upside-down Haussmann buildings hanging down!
      offCtx.fillStyle = '#dfc8a2'; // Inverted limestone
      offCtx.fillRect(0, 0, w * 0.33, h * 0.44);

      // Inverted Mansard Roof
      offCtx.fillStyle = '#334155';
      offCtx.beginPath();
      offCtx.moveTo(0, h * 0.44);
      offCtx.lineTo(w * 0.33, h * 0.44);
      offCtx.lineTo(w * 0.29, h * 0.48);
      offCtx.lineTo(0, h * 0.48);
      offCtx.fill();

      // Inverted Right Building
      offCtx.fillStyle = '#dbc49e';
      offCtx.fillRect(w * 0.67, 0, w * 0.33, h * 0.44);

      // Inverted Right Roof
      offCtx.fillStyle = '#334155';
      offCtx.beginPath();
      offCtx.moveTo(w * 0.67, h * 0.44);
      offCtx.lineTo(w, h * 0.44);
      offCtx.lineTo(w, h * 0.48);
      offCtx.lineTo(w * 0.71, h * 0.48);
      offCtx.fill();

      // Inverted Overhead Street
      offCtx.fillStyle = '#1f2937';
      offCtx.beginPath();
      offCtx.moveTo(w * 0.33, 0);
      offCtx.lineTo(w * 0.67, 0);
      offCtx.lineTo(w * 0.56, h * 0.44);
      offCtx.lineTo(w * 0.44, h * 0.44);
      offCtx.fill();

      // Inverted Glowing Windows overhead
      offCtx.fillStyle = '#fde047';
      for (let floor = 0; floor < 4; floor++) {
        const yPos = h * 0.06 + floor * (h * 0.08);
        for (let col = 0; col < 4; col++) {
          offCtx.fillRect(w * 0.03 + col * (w * 0.07), yPos, w * 0.035, h * 0.045);
          offCtx.fillRect(w * 0.72 + col * (w * 0.065), yPos, w * 0.035, h * 0.045);
        }
      }

      // Inverted Wrought-Iron Balconies
      offCtx.fillStyle = '#09090b';
      offCtx.fillRect(0, h * 0.16, w * 0.33, h * 0.015);
      offCtx.fillRect(0, h * 0.32, w * 0.33, h * 0.015);
      offCtx.fillRect(w * 0.67, h * 0.16, w * 0.33, h * 0.015);
      offCtx.fillRect(w * 0.67, h * 0.32, w * 0.33, h * 0.015);

      // Inverted Street Lamps
      offCtx.fillStyle = '#f59e0b';
      offCtx.beginPath();
      offCtx.arc(w * 0.40, h * 0.14, 5, 0, Math.PI * 2);
      offCtx.arc(w * 0.60, h * 0.14, 5, 0, Math.PI * 2);
      offCtx.fill();

      // 5. EXTRACT PIXELS FROM THE DRAWN SCENE
      const imgData = offCtx.getImageData(0, 0, w, h);
      const data = imgData.data;

      pixels = [];
      const cols = 100;
      const rows = 56;
      const stepX = Math.floor(w / cols);
      const stepY = Math.floor(h / rows);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sampleX = Math.floor(c * stepX + stepX / 2);
          const sampleY = Math.floor(r * stepY + stepY / 2);
          const idx = (sampleY * w + sampleX) * 4;

          const red = data[idx];
          const green = data[idx + 1];
          const blue = data[idx + 2];
          const alpha = data[idx + 3] / 255;

          if (alpha > 0.05) {
            // Scattered starting position to animate in and assemble
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 140;

            pixels.push({
              homeX: sampleX,
              homeY: sampleY,
              x: sampleX + Math.cos(angle) * dist,
              y: sampleY + Math.sin(angle) * dist,
              vx: 0,
              vy: 0,
              size: stepX * 0.95,
              r: red,
              g: green,
              b: blue,
              baseAlpha: alpha,
              currentAlpha: 0.1,
            });
          }
        }
      }

      setStats((s) => ({ ...s, activePixels: pixels.length }));
    };

    generateInceptionParisPixels();

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setIsInteracting(false);
    };

    const handleMouseDown = () => {
      mouse.isDown = true;
      mouse.radius = 210; // Gravitational shockwave
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
      mouse.radius = 125;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Animation Render Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;

    const render = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      frameCount++;
      fpsTimer += delta;
      if (fpsTimer >= 1000) {
        setStats((s) => ({ ...s, fps: frameCount }));
        frameCount = 0;
        fpsTimer = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle background grid
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      const energySpring = (crowdEnergyLevel / 85) * 0.085;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        // 1. Spring force to home position in the folded Paris scene
        const dxHome = p.homeX - p.x;
        const dyHome = p.homeY - p.y;
        p.vx += dxHome * energySpring;
        p.vy += dyHome * energySpring;

        // 2. Gravitational warp / mouse interaction
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const forceRatio = 1 - distMouse / mouse.radius;
          const force = forceRatio * (mouse.isDown ? 28 : 12);
          const angle = Math.atan2(dyMouse, dxMouse);

          // Disperse pixels away from cursor, simulating architectural fold warp
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;

          // Increase luminance near the cursor
          p.currentAlpha = Math.min(1.0, p.baseAlpha + forceRatio * 0.4);
        } else {
          // Smooth return to base alpha
          p.currentAlpha += (p.baseAlpha - p.currentAlpha) * 0.06;
        }

        // 3. Apply damping/friction
        p.vx *= 0.81;
        p.vy *= 0.81;

        p.x += p.vx;
        p.y += p.vy;

        // 4. Draw pixel with its true sampled color from the Inception Paris scene
        const isNearMouse = distMouse < mouse.radius;
        const brightness = isNearMouse ? 1.35 : 1.0;
        const rColor = Math.min(255, Math.floor(p.r * brightness));
        const gColor = Math.min(255, Math.floor(p.g * brightness));
        const bColor = Math.min(255, Math.floor(p.b * brightness));

        ctx.fillStyle = `rgb(${rColor}, ${gColor}, ${bColor})`;
        ctx.globalAlpha = p.currentAlpha;

        const size = p.size * (isNearMouse ? 1.25 : 1.0);
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }

      ctx.globalAlpha = 1.0;

      // Draw subtle Inception gravitational field circle around cursor
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.75, 0, Math.PI * 2);
        ctx.strokeStyle = mouse.isDown ? 'rgba(251, 191, 36, 0.8)' : 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [crowdEnergyLevel, resetKey]);

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. HERO TITLE & REFERENCE */}
      {/* ========================================================================= */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs border border-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span>Real-Time Generative Computing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
          Virtual Worlds
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
          The canvas below renders the iconic <strong>Paris folding city scene from Inception</strong> entirely out of reactive colored pixels. Move your mouse to warp the gravity of the city in real time, simulating how a space perceives and reacts to crowd energy.
        </p>

        {/* Scene Badge */}
        <div className="pt-1 flex items-center justify-center space-x-2 text-xs">
          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-lg border border-zinc-200/80 font-medium">
            Inception (2010) • Parisian Avenue 90° Gravity Fold
          </span>
          <button
            onClick={() => setResetKey((k) => k + 1)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Re-assemble Pixels</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. REAL-TIME GENERATIVE COLORED PIXEL CANVAS */}
      {/* ========================================================================= */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden relative group">
        {/* Real-time Telemetry Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 text-xs bg-zinc-900/90 text-zinc-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-200 font-medium font-mono text-[11px]">
              PARIS_INCEPTION_FOLD.PIXELS
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] text-zinc-400 hidden sm:inline">
              Limestone Facades • Cobalt Sky • Inverted City
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span>Pixels: {stats.activePixels.toLocaleString()}</span>
            <span>FPS: {stats.fps}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isInteracting ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
            }`}>
              {isInteracting ? 'GRAVITATIONAL WARP' : 'STABLE MATRIX'}
            </span>
          </div>
        </div>

        {/* The Colored Pixel Canvas */}
        <div className="relative w-full h-[500px] bg-zinc-950 cursor-crosshair select-none">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Instructions */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-zinc-700/80 px-4 py-1.5 rounded-full text-xs text-zinc-300 shadow-lg flex items-center space-x-2 pointer-events-none backdrop-blur-md">
            <Move className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Move cursor to bend and distort Paris • Click to trigger a folding shockwave</span>
          </div>
        </div>

        {/* Energy Slider Controls */}
        <div className="px-5 py-3 bg-zinc-900 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-[11px] font-medium text-zinc-300 uppercase tracking-wider">
              BPM / Energy Spring Rate:
            </span>
            <input
              type="range"
              min="30"
              max="150"
              value={crowdEnergyLevel}
              onChange={(e) => setCrowdEnergyLevel(Number(e.target.value))}
              className="w-36 accent-amber-400 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
            />
            <span className="font-mono text-amber-400 font-semibold">{crowdEnergyLevel} BPM</span>
          </div>

          <div className="text-[11px] text-zinc-400">
            Simulates crowd kinetic energy altering the elasticity of the environment
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCROLL DOWN: THE EXPLANATION OF THE IDEA */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4 border-t border-zinc-200/80">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-600 font-medium">
            The Concept Explained
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
            Why the Inception Paris Scene?
          </h3>
          <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
            In Christopher Nolan’s <em>Inception</em>, Ariadne realizes that in a constructed world, the laws of physics are not fixed: by sheer intention, she folds the Haussmann avenues of Paris over onto themselves, turning the ground into a ceiling. 
            <strong> Virtual Worlds brings that same architectural plasticity to live entertainment.</strong>
          </p>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
              <Eye className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400">Layer 01</div>
              <h4 className="text-sm font-semibold text-zinc-900 mt-0.5">Crowd Energy Perception</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Sensors track dancefloor velocity, BPM cadence, and movement density. Just as your mouse bent the Paris pixels above, the collective crowd conducts how the physical room behaves.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
              <Sparkles className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400">Layer 02</div>
              <h4 className="text-sm font-semibold text-zinc-900 mt-0.5">Zero Pre-Rendered Loops</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              No VJs playing looping MP4 videos. Real-time procedural shaders and voxel compute synthesize shifting environments live on GPUs at 60–120 FPS based on audio frequencies.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
              <Volume2 className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400">Layer 03</div>
              <h4 className="text-sm font-semibold text-zinc-900 mt-0.5">Living Nightlife Ecosystem</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Applied to curated nightlife, clubbing transforms from a passive spectator show into an interactive ritual where architecture breathes, stretches, and folds with the room's energy.
            </p>
          </div>
        </div>

        {/* Comparison Callout */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-semibold text-zinc-900 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-zinc-600" />
            <span>Traditional Nightlife Visuals vs. Virtual Worlds</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60 space-y-2">
              <div className="text-zinc-400 uppercase font-mono text-[10px] tracking-wider">Traditional Nightlife</div>
              <ul className="space-y-1.5 text-zinc-600">
                <li className="flex items-start space-x-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span><strong>Static Video Playback:</strong> Repetitive pre-rendered loops run regardless of crowd engagement.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span><strong>One-Way Broadcast:</strong> Clubbers passively stare at a screen behind the DJ booth.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span><strong>Rigid Space:</strong> The room geometry is dead and unreactive.</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200/60 space-y-2">
              <div className="text-purple-800 uppercase font-mono text-[10px] tracking-wider font-semibold">Virtual Worlds</div>
              <ul className="space-y-1.5 text-purple-950">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>100% Real-Time Generative:</strong> Every pixel is calculated live on GPUs in response to sound and motion.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Bidirectional Feedback Loop:</strong> The crowd's movement directly sculpts and bends the environment.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Plastic Architecture:</strong> The venue feels like a dream space that folds, expands, and pulses.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
