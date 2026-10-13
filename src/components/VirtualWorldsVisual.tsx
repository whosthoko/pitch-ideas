import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  Layers, 
  Move, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  Flame, 
  Grid
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
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [batchPattern, setBatchPattern] = useState<'radial' | 'matrix' | 'clusters'>('radial');
  const [revealedPercent, setRevealedPercent] = useState<number>(0);
  const [isLightingUp, setIsLightingUp] = useState<boolean>(false);
  const [activeBatchInfo, setActiveBatchInfo] = useState({ totalBatches: 24, currentBatch: 24 });

  // Load the photorealistic Inception Paris image
  useEffect(() => {
    const img = new Image();
    img.src = '/inception_paris_fold.jpg';
    img.onload = () => {
      imageRef.current = img;
      setIsImageLoaded(true);
    };
  }, []);

  // Main canvas and batch-lighting animation loop
  useEffect(() => {
    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    if (!img) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 920);
    // 16:9 aspect ratio height
    let height = (canvas.height = Math.round(width * (9 / 16)));

    const blockSize = 16; // 16x16px clusters (~2,000 - 3,500 batches, high-performance & visually crisp)
    let cols = Math.ceil(width / blockSize);
    let rows = Math.ceil(height / blockSize);

    let tiles: BlockTile[] = [];

    // Mouse coordinates for gravitational warp on revealed areas
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 130,
      rippleRadius: 0,
    };

    // Initialize or recalculate tiles
    const createTiles = (originX = width / 2, originY = height / 2, pattern = batchPattern) => {
      cols = Math.ceil(width / blockSize);
      rows = Math.ceil(height / blockSize);
      tiles = [];

      const totalBatches = 28;
      const maxDist = Math.sqrt(width * width + height * height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * blockSize;
          const y = r * blockSize;

          let batchId = 0;

          if (pattern === 'radial') {
            // Batches radiate outward from the click origin point
            const dx = (x + blockSize / 2) - originX;
            const dy = (y + blockSize / 2) - originY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            batchId = Math.min(totalBatches - 1, Math.floor((dist / (maxDist * 0.75)) * totalBatches));
          } else if (pattern === 'matrix') {
            // Batches flow diagonally across the matrix like a neural shader pass
            const normalized = (c / cols + r / rows) / 2;
            batchId = Math.min(totalBatches - 1, Math.floor(normalized * totalBatches));
          } else {
            // Clustered organic batches
            const noise = Math.sin(c * 0.25) * Math.cos(r * 0.25) * 0.5 + 0.5;
            batchId = Math.min(totalBatches - 1, Math.floor(noise * totalBatches));
          }

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

      setActiveBatchInfo({ totalBatches, currentBatch: 0 });
    };

    // Trigger full blackout and subsequent lighting in batches
    let currentBatchToReveal = 0;
    let batchTimer: any = null;

    const startBatchLighting = (clickX = width / 2, clickY = height / 2) => {
      if (batchTimer) clearInterval(batchTimer);
      setIsLightingUp(true);
      setRevealedPercent(0);

      // 1. ALL PIXELS GO TO BLACK
      createTiles(clickX, clickY, batchPattern);

      currentBatchToReveal = 0;
      const totalBatches = 28;

      // 2. LIGHT UP IN BATCHES AT A TIME
      const intervalMs = 45; // Smooth rapid cascade across ~1.3 seconds
      batchTimer = setInterval(() => {
        currentBatchToReveal++;
        setActiveBatchInfo({ totalBatches, currentBatch: currentBatchToReveal });

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

    // Start initial batch lighting on mount
    startBatchLighting(width / 2, height / 2);

    // Canvas click triggers full blackout and new batch-lighting sequence from the click point!
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      mouse.rippleRadius = 1;
      startBatchLighting(clickX, clickY);
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
      height = canvas.height = Math.round(width * (9 / 16));
      startBatchLighting(width / 2, height / 2);
    };

    window.addEventListener('resize', handleResize);

    // Main animation render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background: Pitch Black
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, width, height);

      // Render tiles
      for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i];

        if (t.revealed) {
          // Animate opacity lighting up
          if (t.opacity < 1) {
            t.opacity += 0.15;
            if (t.opacity > 1) t.opacity = 1;
          }

          // Initial batch glow flash
          if (t.glow < 1 && t.opacity < 0.6) {
            t.glow = 1.0;
          } else if (t.glow > 0) {
            t.glow -= 0.08;
            if (t.glow < 0) t.glow = 0;
          }

          // Calculate interactive gravitational distortion if mouse is near
          let renderX = t.x;
          let renderY = t.y;

          if (mouse.x > 0 && mouse.y > 0) {
            const dx = t.x + t.width / 2 - mouse.x;
            const dy = t.y + t.height / 2 - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (1 - dist / mouse.radius) * 14;
              const angle = Math.atan2(dy, dx);
              renderX += Math.cos(angle) * force;
              renderY += Math.sin(angle) * force;
            }
          }

          // Draw the photorealistic photo slice for this block
          ctx.save();
          ctx.globalAlpha = t.opacity;

          // Source coordinates on the high-res image
          const sx = (t.x / width) * img.naturalWidth;
          const sy = (t.y / height) * img.naturalHeight;
          const sWidth = (t.width / width) * img.naturalWidth;
          const sHeight = (t.height / height) * img.naturalHeight;

          ctx.drawImage(
            img,
            sx,
            sy,
            sWidth,
            sHeight,
            renderX,
            renderY,
            t.width + 0.5,
            t.height + 0.5
          );

          // Digital illumination flash when the batch lights up
          if (t.glow > 0.05) {
            ctx.fillStyle = `rgba(254, 240, 138, ${t.glow * 0.4})`; // golden twilight light
            ctx.fillRect(renderX, renderY, t.width, t.height);

            ctx.strokeStyle = `rgba(255, 255, 255, ${t.glow * 0.7})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(renderX, renderY, t.width, t.height);
          }

          ctx.restore();
        }
      }

      // Draw subtle interactive cursor gravity lens
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.75, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
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
  }, [isImageLoaded, batchPattern]);

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
          Photorealistic real-time environment rendering inspired by the iconic <strong>Paris folding street scene from Inception</strong>. Click the canvas to trigger full blackouts and watch the city light up in digital pixel batches, reacting dynamically to your presence.
        </p>

        {/* Batch Pattern Controls */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-zinc-400 mr-1">Batch Reveal Pattern:</span>
          {[
            { id: 'radial', label: 'Radial Wave from Click' },
            { id: 'matrix', label: 'Diagonal Matrix Sweep' },
            { id: 'clusters', label: 'Organic Neural Clusters' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setBatchPattern(mode.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                batchPattern === mode.id
                  ? 'bg-zinc-900 text-white font-medium shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE PHOTOREALISTIC INCEPTION CANVAS (BATCH LIGHTING & INTERACTION) */}
      {/* ========================================================================= */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden relative">
        {/* Top Telemetry HUD */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 text-xs bg-zinc-900/90 text-zinc-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-zinc-200 font-medium font-mono text-[11px]">
              INCEPTION_PARIS_HAUSSMANN_FOLD.RAW
            </span>
            <span className="text-zinc-700">•</span>
            <span className="text-[11px] text-zinc-400 hidden sm:inline">
              Photorealistic 16x16 Pixel Clusters
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span>
              Batches: {activeBatchInfo.currentBatch}/{activeBatchInfo.totalBatches}
            </span>
            <span>Revealed: {revealedPercent}%</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isLightingUp ? 'bg-amber-400 text-zinc-950 animate-pulse' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
            }`}>
              {isLightingUp ? 'BATCHES LIGHTING UP' : '100% REVEALED'}
            </span>
          </div>
        </div>

        {/* The Interactive Photorealistic Canvas */}
        <div className="relative w-full aspect-video max-h-[520px] bg-black cursor-pointer select-none">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Instruction Banner */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-zinc-700/80 px-4 py-2 rounded-full text-xs text-zinc-200 shadow-xl flex items-center space-x-2.5 pointer-events-none backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              <strong>Click anywhere:</strong> All pixels turn black, then light up in batches from your click!
            </span>
          </div>
        </div>

        {/* Bottom Control & Status Strip */}
        <div className="px-5 py-3 bg-zinc-900 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center space-x-2 text-zinc-300">
            <Move className="w-3.5 h-3.5 text-amber-400" />
            <span>
              <strong>Move mouse:</strong> Warps the photorealistic Haussmann facades in real time.
            </span>
          </div>

          <div className="text-[11px] font-mono text-zinc-400">
            Cluster resolution: 16×16px (~2,400 discrete block batches)
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
            In Christopher Nolan’s <em>Inception</em>, the dream architect realizes that physical reality is not static: by sheer intention, she bends the avenues of Paris 90 degrees overhead into the sky, creating an impossible architectural canopy. 
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
