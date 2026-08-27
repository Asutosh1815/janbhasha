import React from 'react';

interface AudioWaveformProps {
  isPlaying?: boolean;
  color?: string;
  barCount?: number;
  height?: number;
  className?: string;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isPlaying = true,
  color = '#22c55e',
  barCount = 28,
  height = 36,
  className = '',
}) => {
  // Pre-calculated heights for realistic audio waveform curves
  const heights = [
    8, 14, 22, 12, 18, 30, 26, 14, 28, 34, 
    20, 15, 32, 28, 18, 24, 30, 16, 22, 29, 
    14, 20, 32, 26, 18, 12, 16, 8
  ];

  return (
    <div 
      className={`flex items-center justify-center gap-[2.5px] px-2 py-1 overflow-hidden ${className}`} 
      style={{ height }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const baseHeight = heights[i % heights.length];
        const animationDelay = `${(i * 0.08) % 1.2}s`;
        const animationDuration = `${0.6 + ((i % 5) * 0.15)}s`;

        return (
          <div
            key={i}
            className="w-[2.5px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: color,
              height: isPlaying ? `${Math.max(4, baseHeight * (height / 36))}px` : '4px',
              animation: isPlaying ? `wave-bar ${animationDuration} ease-in-out ${animationDelay} infinite` : 'none',
              opacity: isPlaying ? 0.9 : 0.4,
            }}
          />
        );
      })}
    </div>
  );
};
