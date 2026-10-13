import React, { useRef, useEffect, useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  Layers, 
  Move, 
  ArrowDown, 
  RotateCcw
} from 'lucide-react';

interface BlockTile {
  col: number;
  row: number;
  x: number;
  y: number;
  width: number;
  height: number;
  batchId: number;
  revealed: boolean;
  opacity: number;
  glow: number;
}

export const VirtualWorldsVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [revealedPercent, setRevealedPercent] = useState<number>(0);
  const [isLightingUp, setIsLightingUp] = useState<boolean>(false);
  const [batchStats, setBatchStats] = useState({ totalBatches: 80, currentBatch: 80, totalTiles: 0 });

  // Load the photorealistic Inception Paris image
  useEffect(() => {
    const img = new Image();
    img.src = '/inception_paris_fold.jpg';
    img.onload = () => {
      imageRef.current = img;
      setIsImageLoaded(true);
    };
  }, []);

  // Main canvas and diagonal matrix sweep animation loop
  useEffect(() => {
    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    if (!img) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const blockSize = 10; // Fine 10x10px micro-clusters for dense, high-resolution batches
    let cols = Math.ceil(width / blockSize);
    let rows = Math.ceil(height / blockSize);

    let tiles: BlockTile[] = [];

    // Mouse coordinates for gravitational warp on revealed areas
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const totalBatches = 80; // High-density batches for smooth diagonal matrix sweep

    // Initialize tiles with strict Diagonal Matrix Sweep
    const createTiles = () => {
      cols = Math.ceil(width / blockSize);
      rows = Math.ceil(height / blockSize);
      tiles = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * blockSize;
          const y = r * blockSize;

          // Strict diagonal matrix progression from top-left (0) to bottom-right (totalBatches - 1)
          const diagonalProgress = (c / cols + r / rows) / 2;
          const batchId = Math.min(totalBatches - 1, Math.floor(diagonalProgress * totalBatches));

          tiles.push({
            col: c,
            row: r,
            x,
            y,
            width: blockSize,
            height: blockSize,
            batchId,
            revealed: false,
            opacity: 0,
            glow: 0,
          });
        }
      }

      setBatchStats({ totalBatches, currentBatch: 0, totalTiles: tiles.length });
    };

    // Trigger full blackout and subsequent diagonal matrix sweep in batches
    let currentBatchToReveal = 0;
    let batchTimer: any = null;

    const startDiagonalMatrixSweep = () => {
      if (batchTimer) clearInterval(batchTimer);
      setIsLightingUp(true);
      setRevealedPercent(0);

      // 1. ALL PIXELS GO TO BLACK
      createTiles();

      currentBatchToReveal = 0;

      // 2. DIAGONAL SWEEP LIGHTS UP IN 80 BATCHES
      const intervalMs = 18; // 18ms x 80 batches = ~1.44s buttery smooth cascade
      batchTimer = setInterval(() => {
        currentBatchToReveal++;
        setBatchStats((s) => ({ ...s, currentBatch: currentBatchToReveal }));

        let revealedCount = 0;
        tiles.forEach((t) => {
          if (t.batchId <= currentBatchToReveal) {
            t.revealed = true;
            revealedCount++;
          }
        });

        const pct = Math.round((revealedCount / tiles.length) * 100);
        setRevealedPercent(pct);

        if (currentBatchToReveal >= totalBatches) {
          if (batchTimer) clearInterval(batchTimer);
          setIsLightingUp(false);
          setRevealedPercent(100);
        }
      }, intervalMs);
    };

    // Initial diagonal sweep on mount
    startDiagonalMatrixSweep();

    // Clicking anywhere on the canvas resets to black and restarts the diagonal sweep
    const handleCanvasClick = () => {
      startDiagonalMatrixSweep();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      startDiagonalMatrixSweep();
    };

    window.addEventListener('resize', handleResize);

    // Animation render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background: Deep Pitch Black
      ctx.fillStyle = '#04060a';
      ctx.fillRect(0, 0, width, height);

      // Cover-fit image calculation
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;
      let renderImgW = width;
      let renderImgH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        renderImgH = width / imgAspect;
        offsetY = (height - renderImgH) / 2;
      } else {
        renderImgW = height * imgAspect;
        offsetX = (width - renderImgW) / 2;
      }

      // Render micro-tiles
      for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i];

        if (t.revealed) {
          // Fast fade in to 100% opacity
          if (t.opacity < 1) {
            t.opacity += 0.2;
            if (t.opacity > 1) t.opacity = 1;
          }

          // Initial batch illumination flash
          if (t.glow < 1 && t.opacity < 0.5) {
            t.glow = 1.0;
          } else if (t.glow > 0) {
            t.glow -= 0.07;
            if (t.glow < 0) t.glow = 0;
          }

          // Gravitational warp near mouse cursor
          let renderX = t.x;
          let renderY = t.y;

          if (mouse.x > 0 && mouse.y > 0) {
            const dx = t.x + t.width / 2 - mouse.x;
            const dy = t.y + t.height / 2 - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (1 - dist / mouse.radius) * 16;
              const angle = Math.atan2(dy, dx);
              renderX += Math.cos(angle) * force;
              renderY += Math.sin(angle) * force;
            }
          }

          ctx.save();
          ctx.globalAlpha = t.opacity;

          // Source slice on the photo
          const normalizedX = (t.x - offsetX) / renderImgW;
          const normalizedY = (t.y - offsetY) / renderImgH;
          const normalizedW = t.width / renderImgW;
          const normalizedH = t.height / renderImgH;

          const sx = normalizedX * img.naturalWidth;
          const sy = normalizedY * img.naturalHeight;
          const sw = normalizedW * img.naturalWidth;
          const sh = normalizedH * img.naturalHeight;

          ctx.drawImage(
            img,
            sx,
            sy,
            sw,
            sh,
            renderX,
            renderY,
            t.width + 0.6,
            t.height + 0.6
          );

          // Golden illumination crest along the leading sweep front
          if (t.glow > 0.05) {
            ctx.fillStyle = `rgba(254, 240, 138, ${t.glow * 0.45})`;
            ctx.fillRect(renderX, renderY, t.width, t.height);

            ctx.strokeStyle = `rgba(255, 255, 255, ${t.glow * 0.75})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(renderX, renderY, t.width, t.height);
          }

          ctx.restore();
        }
      }

      // Cursor gravity lens
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.75, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (batchTimer) clearInterval(batchTimer);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isImageLoaded]);

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. FULL-PAGE PREVIEW (FILLS THE WHOLE SCREEN FIRST) */}
      {/* ========================================================================= */}
      <div 
        ref={containerRef}
        className="relative w-full h-[calc(100vh-3.5rem)] min-h-[580px] bg-black cursor-pointer select-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Top Minimal Telemetry Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono text-[11px] font-medium tracking-wide">
              INCEPTION_PARIS_HAUSSMANN_FOLD
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
              80 Diagonal Batches
            </span>
          </div>

          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-zinc-300">
            <span>Batch {batchStats.currentBatch}/{batchStats.totalBatches}</span>
            <span className="text-zinc-600">•</span>
            <span>{revealedPercent}% Revealed</span>
          </div>
        </div>

        {/* Floating Center-Bottom Action Pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none">
          <div className="bg-black/75 border border-white/15 px-5 py-2.5 rounded-full text-xs text-zinc-100 shadow-2xl flex items-center space-x-2.5 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              <strong>Click anywhere:</strong> Resets to black and triggers diagonal matrix sweep
            </span>
          </div>

          <div className="flex items-center space-x-1 text-[11px] text-zinc-400 font-mono animate-bounce">
            <span>Scroll down for concept & architecture</span>
            <ArrowDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HEADER AND DESCRIPTION (MOVED BELOW THE PREVIEW) */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20 space-y-12">
        {/* Main Header & Pitch */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs border border-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Real-Time Generative Computing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            Virtual Worlds
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Virtual Worlds reimagines live entertainment through real-time generative computing. Instead of cycling through pre-rendered loops, the space dynamically renders shifting digital environments that perceive and react to crowd energy, sound, and movement on the fly. Applied to curated nightlife, it transforms clubbing from a passive visual show into a living, responsive ecosystem.
          </p>
        </div>

        {/* Referencing the Inception Paris Scene */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-zinc-900 font-semibold text-base">
            <Move className="w-4 h-4 text-zinc-600" />
            <span>Referencing the Paris Scene from Inception</span>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We are referencing the iconic Paris folding scene from Christopher Nolan’s <em>Inception</em>. In the film, the architect realizes that in a constructed world, the laws of physics are not fixed: by intention, she bends the avenues of Paris 90 degrees overhead into the sky. 
            Virtual Worlds brings that same architectural plasticity to live entertainment: an environment that breathes, folds, and pulses in direct conversation with the room.
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
              Sensors track dancefloor velocity, BPM cadence, and movement density. Just as your click triggers batches of light and your cursor warps the Paris streets, the crowd conducts how the physical room behaves.
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
              No VJs playing looping MP4 videos. Real-time procedural shaders and voxel compute synthesize shifting environments live on GPUs at 60–120 FPS in direct response to acoustic frequencies.
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

        {/* Comparison Table */}
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
