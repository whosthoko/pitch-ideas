import React, { useRef, useEffect, useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Eye, 
  Volume2, 
  Layers, 
  Radio, 
  Move, 
  Zap,
  Info,
  Sliders,
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
  baseAlpha: number;
  currentAlpha: number;
  color: string;
  shape: 'square' | 'circle';
}

export const VirtualWorldsVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Selected environment theme
  const [sceneMode, setSceneMode] = useState<'portal' | 'terrain' | 'nebula'>('portal');
  const [crowdEnergyLevel, setCrowdEnergyLevel] = useState<number>(75);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [stats, setStats] = useState({ fps: 60, activePixels: 3200, cursorForce: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = 460);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 460;
      initPixels();
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 110,
      isDown: false,
    };

    let pixels: Pixel[] = [];

    // Initialize pixels to form the picture based on sceneMode
    const initPixels = () => {
      pixels = [];
      const cols = 70;
      const rows = 40;
      const spacingX = width / cols;
      const spacingY = height / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const homeX = c * spacingX + spacingX / 2;
          const homeY = r * spacingY + spacingY / 2;

          // Normalized coordinates (-1 to 1)
          const nx = (homeX - width / 2) / (width / 2);
          const ny = (homeY - height / 2) / (height / 2);

          let inShape = false;
          let color = '#27272a'; // default subtle zinc
          let alpha = 0.15;

          if (sceneMode === 'portal') {
            // Scene 1: The Nightlife Gateway / Monolith & Spatial Sphere
            const distFromCenter = Math.sqrt(nx * nx + ny * ny);
            const inArch = Math.abs(nx) < 0.45 && ny > -0.65 && ny < 0.7;
            const inInnerArch = Math.abs(nx) < 0.35 && ny > -0.55 && ny < 0.6;
            const inSphere = distFromCenter < 0.28;

            if (inSphere) {
              inShape = true;
              color = '#18181b'; // dark core
              alpha = 0.95;
            } else if (inArch && !inInnerArch) {
              inShape = true;
              color = '#3f3f46';
              alpha = 0.85;
            } else if (Math.abs(nx) < 0.85 && ny > 0.6) {
              // Floor perspective grid
              inShape = true;
              color = '#52525b';
              alpha = 0.4 + (r % 3 === 0 ? 0.3 : 0);
            }
          } else if (sceneMode === 'terrain') {
            // Scene 2: Soundwave Frequency Topography
            const wave1 = Math.sin(nx * 5) * 0.25;
            const wave2 = Math.cos(nx * 10) * 0.1;
            const terrainY = wave1 + wave2;

            if (Math.abs(ny - terrainY) < 0.15 || ny > terrainY) {
              inShape = true;
              const depth = (ny - terrainY);
              color = depth < 0.05 ? '#18181b' : '#3f3f46';
              alpha = 0.75 - Math.max(0, depth * 0.5);
            }
          } else {
            // Scene 3: Crowd Nebula & Particle Vortex
            const angle = Math.atan2(ny, nx);
            const dist = Math.sqrt(nx * nx + ny * ny);
            const spiral = Math.sin(dist * 12 - angle * 3);

            if (dist < 0.75 && Math.abs(spiral) > 0.4) {
              inShape = true;
              color = dist < 0.3 ? '#18181b' : '#3f3f46';
              alpha = 0.85 - dist * 0.5;
            }
          }

          if (inShape || Math.random() < 0.12) {
            pixels.push({
              homeX,
              homeY,
              // Start slightly scattered and animate to form the picture
              x: homeX + (Math.random() - 0.5) * 120,
              y: homeY + (Math.random() - 0.5) * 120,
              vx: 0,
              vy: 0,
              size: inShape ? (sceneMode === 'portal' ? 3.5 : 3.0) : 2.0,
              baseAlpha: inShape ? alpha : 0.08,
              currentAlpha: 0,
              color: inShape ? color : '#d4d4d8',
              shape: 'square',
            });
          }
        }
      }

      setStats((s) => ({ ...s, activePixels: pixels.length }));
    };

    initPixels();

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
      mouse.radius = 180; // Expand force on click
    };

    const handleMouseUp = () => {
      mouse.isDown = false;
      mouse.radius = 110;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Animation render loop
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

      // Subtle canvas background grid
      ctx.strokeStyle = '#f4f4f5';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics and render for each pixel
      const energyMultiplier = crowdEnergyLevel / 75;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        // Vector to home position
        const dxHome = p.homeX - p.x;
        const dyHome = p.homeY - p.y;
        const distHome = Math.sqrt(dxHome * dxHome + dyHome * dyHome);

        // Spring force returning pixel to its position in the image
        const spring = 0.08 * energyMultiplier;
        p.vx += dxHome * spring;
        p.vy += dyHome * spring;

        // Vector to mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        // Interactive mouse interaction (reaction to human movement / crowd energy)
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * (mouse.isDown ? 22 : 9);
          const angle = Math.atan2(dyMouse, dxMouse);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;

          // Illuminate pixels near the cursor
          p.currentAlpha = Math.min(1.0, p.baseAlpha + (1 - distMouse / mouse.radius) * 0.8);
        } else {
          // Fade smoothly to base alpha
          p.currentAlpha += (p.baseAlpha - p.currentAlpha) * 0.05;
        }

        // Apply friction / damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // Draw pixel
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.currentAlpha;

        const size = p.size * (distMouse < mouse.radius ? 1.4 : 1.0);
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }

      ctx.globalAlpha = 1.0;

      // Draw subtle interactive ripple indicator at mouse position
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = '#a1a1aa';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
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
  }, [sceneMode, crowdEnergyLevel]);

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* 1. HERO TITLE & CONCEPT */}
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
          Reimagining live entertainment through real-time generative computing. Instead of cycling through pre-rendered loops, the space dynamically renders shifting digital environments that perceive and react to crowd energy, sound, and movement on the fly.
        </p>

        {/* Scene Presets */}
        <div className="pt-2 flex items-center justify-center space-x-1.5 text-xs">
          <span className="text-zinc-400 mr-1">Generative Scene:</span>
          {[
            { id: 'portal', label: 'Club Gateway Portal' },
            { id: 'terrain', label: 'Acoustic Topography' },
            { id: 'nebula', label: 'Crowd Bio-Nebula' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSceneMode(s.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                sceneMode === s.id
                  ? 'bg-zinc-900 text-white font-medium shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE PIXEL ANIMATION CANVAS */}
      {/* ========================================================================= */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-xs overflow-hidden relative group">
        {/* Real-time HUD Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 text-xs bg-white/90 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-zinc-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Generative Canvas</span>
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400 hidden sm:inline">Zero Pre-Rendered Loops</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono text-zinc-500">
            <span>Pixels: {stats.activePixels.toLocaleString()}</span>
            <span>FPS: {stats.fps}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${
              isInteracting ? 'bg-purple-100 text-purple-800 font-bold' : 'bg-zinc-100 text-zinc-500'
            }`}>
              {isInteracting ? 'CROWD SENSING ACTIVE' : 'AWAITING INTERACTION'}
            </span>
          </div>
        </div>

        {/* The Interactive Canvas */}
        <div className="relative w-full h-[460px] bg-[#FAFAFA] cursor-crosshair select-none">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Instructions Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 border border-zinc-200/80 px-3.5 py-1.5 rounded-full text-xs text-zinc-600 shadow-xs flex items-center space-x-2 pointer-events-none backdrop-blur-sm">
            <Move className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
            <span>Move cursor or click to disperse and illuminate pixels in real time</span>
          </div>
        </div>

        {/* Interactive Controls Bar Below Canvas */}
        <div className="px-5 py-3.5 bg-white border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-zinc-500 text-[11px] uppercase tracking-wider font-medium">
              Crowd Energy & BPM Response:
            </span>
            <input
              type="range"
              min="30"
              max="140"
              value={crowdEnergyLevel}
              onChange={(e) => setCrowdEnergyLevel(Number(e.target.value))}
              className="w-36 accent-zinc-900 bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
            />
            <span className="font-mono text-zinc-700 font-semibold">{crowdEnergyLevel} BPM</span>
          </div>

          <div className="text-zinc-400 text-[11px]">
            Simulating live venue computer vision tracking crowd velocity & energy
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCROLL DOWN INFORMATION ABOUT THE IDEA */}
      {/* ========================================================================= */}
      <div className="space-y-6 pt-4 border-t border-zinc-200/60">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-600 font-medium">
            The Philosophy & Architecture
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
            From Static Visuals to Living Nightlife Ecosystems
          </h3>
          <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
            In modern nightlife, club visuals are almost entirely passive: a VJ plays looping pre-rendered MP4 animations on LED screens that run regardless of whether the dancefloor is packed or empty. Virtual Worlds replaces pre-rendered playback with an autonomous, generative compute pipeline.
          </p>
        </div>

        {/* 3 Core Architecture Pillars (Notion / OpenAI Style Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
              <Eye className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400">Layer 01</div>
              <h4 className="text-sm font-semibold text-zinc-900 mt-0.5">Perception & Computer Vision</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Ceiling-mounted sensors and thermal computer vision continuously track crowd density, movement velocity, jump cadence, and collective energy without identifying individual faces.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
              <Sparkles className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400">Layer 02</div>
              <h4 className="text-sm font-semibold text-zinc-900 mt-0.5">Real-Time Neural Shaders</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Zero pre-rendered loops. Procedural voxel engines and real-time graphics shaders compute every frame live on GPUs, synthesizing responsive architectural worlds at 60–120 FPS.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
              <Volume2 className="w-4 h-4 text-zinc-700" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-400">Layer 03</div>
              <h4 className="text-sm font-semibold text-zinc-900 mt-0.5">Spatial Acoustic Symbiosis</h4>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Visual environments react bidirectionally with the DJ's audio frequencies: low-end sub-bass ripples physical geometry, while crowd movement signals changes in lighting and spatial audio cues.
            </p>
          </div>
        </div>

        {/* Traditional Nightlife vs Virtual Worlds Table */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-semibold text-zinc-900 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-zinc-600" />
            <span>Traditional Clubbing vs. Virtual Worlds Ecosystem</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60 space-y-2">
              <div className="text-zinc-400 uppercase font-mono text-[10px] tracking-wider">Traditional Nightlife Visuals</div>
              <ul className="space-y-1.5 text-zinc-600">
                <li className="flex items-start space-x-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span><strong>Static Pre-Rendered Loops:</strong> VJs cycle through canned video files (MP4s) with no awareness of the crowd.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span><strong>Passive Consumer Experience:</strong> Clubbers watch a screen rather than participating in an interactive space.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-zinc-400 font-bold">•</span>
                  <span><strong>Disconnected Atmosphere:</strong> Visuals stay intense even when the room needs tension or atmospheric decompression.</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50/40 p-4 rounded-xl border border-purple-200/60 space-y-2">
              <div className="text-purple-800 uppercase font-mono text-[10px] tracking-wider font-semibold">Virtual Worlds Generative System</div>
              <ul className="space-y-1.5 text-purple-950">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>100% Real-Time Generative:</strong> Every pixel, light ray, and architectural shift is calculated live on the fly.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Crowd as the Conductor:</strong> Collective movement and sound dictate how the digital room breathes, expands, and contracts.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Living Responsive Architecture:</strong> The physical venue feels alive, transforming clubbing into an interactive ritual.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
