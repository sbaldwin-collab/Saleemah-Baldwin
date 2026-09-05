import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Sparkles, Disc, Radio, SkipForward } from 'lucide-react';
import { musicEngine, MUSIC_TRACKS, MusicTrack } from '../utils/musicGenerator';

interface MusicPlayerBarProps {
  onShowToast?: (msg: string) => void;
}

export function MusicPlayerBar({ onShowToast }: MusicPlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [prevVolume, setPrevVolume] = useState<number>(0.5);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const currentTrack: MusicTrack = MUSIC_TRACKS[currentTrackIndex];

  const handleTogglePlay = () => {
    const nextState = musicEngine.togglePlay(currentTrackIndex);
    setIsPlaying(nextState);
    if (nextState) {
      onShowToast?.(`Generating live ambient music: ${currentTrack.name}`);
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    if (isPlaying) {
      musicEngine.playTrack(index);
      onShowToast?.(`Playing: ${MUSIC_TRACKS[index].name}`);
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    handleSelectTrack(nextIndex);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
    musicEngine.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume || 0.5);
      musicEngine.setVolume(prevVolume || 0.5);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
      musicEngine.setVolume(0);
    }
  };

  // Audio Visualizer Animation Loop
  useEffect(() => {
    let active = true;

    const draw = () => {
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) {
        animFrameIdRef.current = requestAnimationFrame(draw);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const analyser = musicEngine.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (analyser && isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barCount = 24;
        const barWidth = (width / barCount) - 2;
        const step = Math.floor(bufferLength / barCount);

        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i * step] || 0;
          const barHeight = Math.max(3, (value / 255) * height);
          const x = i * (barWidth + 2);
          const y = height - barHeight;

          // Gradient color: sky to cyan
          const grad = ctx.createLinearGradient(0, y, 0, height);
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(1, '#0284c7');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
          ctx.fill();
        }
      } else {
        // Idle gentle waveform
        const barCount = 24;
        const barWidth = (width / barCount) - 2;
        const time = Date.now() * 0.002;

        for (let i = 0; i < barCount; i++) {
          const pseudoVal = Math.sin(time + i * 0.3) * 0.5 + 0.5;
          const barHeight = isPlaying ? 8 + pseudoVal * (height - 12) : 3;
          const x = i * (barWidth + 2);
          const y = height - barHeight;

          ctx.fillStyle = '#334155';
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [1, 1, 0, 0]);
          ctx.fill();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(draw);
    };

    animFrameIdRef.current = requestAnimationFrame(draw);

    return () => {
      active = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <section
      id="music-generator"
      className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-950/40 relative overflow-hidden backdrop-blur-md"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-sky-500/10 blur-[60px] pointer-events-none rounded-full" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Left track info and play controls */}
        <div className="flex items-center gap-4 flex-1">
          {/* Large Play/Pause Button */}
          <button
            id="music-play-button"
            type="button"
            onClick={handleTogglePlay}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-lg ${
              isPlaying
                ? 'bg-sky-400 text-slate-950 shadow-sky-500/30 ring-4 ring-sky-500/20'
                : 'bg-slate-800 hover:bg-sky-400 text-sky-400 hover:text-slate-950 border border-slate-700 hover:border-sky-400'
            }`}
            title={isPlaying ? 'Pause generative ambient music' : 'Play generated keynote soundtrack'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 ml-0.5 fill-current" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-bold uppercase tracking-wider">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Generative Tech Ambient</span>
              </span>
              {isPlaying && (
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  LIVE SYNTH
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-100 flex items-center gap-2">
              <span>{currentTrack.name}</span>
            </h3>

            <p className="text-xs text-slate-400 max-w-md mt-0.5 line-clamp-1">
              {currentTrack.description}
            </p>
          </div>
        </div>

        {/* Center: Live Sound Spectrum Canvas Visualizer */}
        <div className="w-full md:w-44 flex flex-col items-center justify-center bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 shrink-0">
          <canvas
            ref={canvasRef}
            width={160}
            height={36}
            className="w-full h-9 rounded"
          />
          <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest flex items-center justify-between w-full">
            <span>{currentTrack.bpm} BPM</span>
            <span>{isPlaying ? 'ACTIVE' : 'STANDBY'}</span>
          </div>
        </div>

        {/* Right: Track Switcher & Volume */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
          {/* Quick Track Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            {MUSIC_TRACKS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTrack(idx)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentTrackIndex === idx
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Track {idx + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={handleNextTrack}
              className="p-1 text-slate-400 hover:text-sky-400 rounded-lg transition-colors"
              title="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={handleToggleMute}
              className="text-slate-400 hover:text-sky-400 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <input
              id="music-volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 sm:w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              title="Music Volume"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
