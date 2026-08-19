import React, { useState, useEffect, useRef } from 'react';
import { Waves, Sparkles, RefreshCw, Zap } from 'lucide-react';

export const ResonanceDemo: React.FC = () => {
  const [freq, setFreq] = useState<number>(1.0); // 0.2 to 2.0
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Natural frequency f0 = 1.0 Hz
  const f0 = 1.0;
  // Amplitude resonance formula approximation: A = A0 / sqrt((1 - (f/f0)^2)^2 + 4*(damping^2)*(f/f0)^2)
  const damping = 0.15;
  const ratio = freq / f0;
  const amplitudeFactor = 1 / Math.sqrt(Math.pow(1 - ratio * ratio, 2) + 4 * Math.pow(damping, 2) * ratio * ratio);
  const isResonating = Math.abs(freq - f0) <= 0.08;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = isPlaying;

    const render = () => {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw central equilibrium axis
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current amplitude in pixels (max ~ 48px)
      const baseAmp = 10;
      const ampPx = Math.min(centerY - 8, baseAmp * amplitudeFactor);

      // Draw Sine Wave
      ctx.lineWidth = isResonating ? 3.5 : 2;
      ctx.strokeStyle = isResonating ? '#f59e0b' : '#0284c7';
      ctx.beginPath();

      const waveSpeed = 2 * Math.PI * freq;
      for (let x = 0; x < width; x++) {
        const k = 0.035; // wave number
        const y = centerY + Math.sin(k * x - timeRef.current * waveSpeed) * ampPx;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Resonating glow effect
      if (isResonating) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const k = 0.035;
          const y = centerY + Math.sin(k * x - timeRef.current * waveSpeed) * ampPx;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, centerY);
        ctx.lineTo(0, centerY);
        ctx.closePath();
        ctx.fill();
      }

      // Draw a resonant test particle (oscillator)
      const particleX = width * 0.75;
      const particleY = centerY + Math.sin(0.035 * particleX - timeRef.current * waveSpeed) * ampPx;

      // Particle shadow / guide
      ctx.strokeStyle = isResonating ? '#ea580c' : '#0369a1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(particleX, centerY);
      ctx.lineTo(particleX, particleY);
      ctx.stroke();

      // Particle
      ctx.fillStyle = isResonating ? '#f59e0b' : '#0284c7';
      ctx.beginPath();
      ctx.arc(particleX, particleY, isResonating ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (running) {
        timeRef.current += 0.02;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [freq, isPlaying, amplitudeFactor, isResonating]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-mono font-bold text-base">
            Φ
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Minh Họa Hiện Tượng Cộng Hưởng (Φ.RESO)
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Kéo thanh trượt tần số <span className="font-mono font-bold text-sky-800">f</span> để chạm điểm cộng hưởng cực đại
            </p>
          </div>
        </div>

        {isResonating ? (
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 animate-pulse border border-amber-300">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
            CỘNG HƯỞNG CỰC ĐẠI!
          </span>
        ) : (
          <span className="text-xs sm:text-sm text-slate-400 font-mono font-semibold">
            f₀ = 1.00 Hz
          </span>
        )}
      </div>

      <div className="relative w-full h-40 bg-slate-900 rounded-2xl overflow-hidden mb-4 border border-slate-800">
        <canvas
          ref={canvasRef}
          width={500}
          height={160}
          className="w-full h-full block"
        />
        <div className="absolute top-3 left-3 text-xs font-mono text-slate-400 bg-slate-900/85 px-2.5 py-1 rounded-lg backdrop-blur">
          Biên độ A: <span className={isResonating ? 'text-amber-400 font-bold' : 'text-sky-300'}>{amplitudeFactor.toFixed(1)}x</span>
        </div>
        <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-400 bg-slate-900/85 px-2.5 py-1 rounded-lg backdrop-blur">
          Tần số f = <span className="text-sky-300 font-bold">{freq.toFixed(2)} Hz</span>
        </div>
      </div>

      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700">
          <span>Tần số cưỡng bức: <strong className="font-mono text-sky-800 font-bold text-sm sm:text-base">{freq.toFixed(2)} Hz</strong></span>
          <button
            type="button"
            onClick={() => setFreq(1.0)}
            className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1.5 hover:underline cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Đặt về f = f₀ (1.0 Hz)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-mono font-semibold text-slate-500">0.2Hz</span>
          <input
            type="range"
            min="0.2"
            max="1.8"
            step="0.02"
            value={freq}
            onChange={(e) => setFreq(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            aria-label="Tần số dao động"
          />
          <span className="text-xs sm:text-sm font-mono font-semibold text-slate-500">1.8Hz</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 bg-sky-50/70 p-3.5 rounded-xl border border-sky-100 leading-relaxed">
          💡 <strong className="text-slate-800 font-bold">Triết lý Φ.RESO:</strong> Khi học sinh tìm được đúng phương pháp tư duy và người thầy định hướng, năng lực tiếp thu môn Vật Lí sẽ tự nhiên bứt phá mạnh mẽ như hiện tượng cộng hưởng tự nhiên!
        </p>
      </div>
    </div>
  );
};
