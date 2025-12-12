import React, { useState, useEffect } from 'react';
import { ScriptConfig } from '../types';

interface PreviewPanelProps {
  config: ScriptConfig;
}

const SAMPLE_LYRICS = [
  "Hear me",
  "雨夜里灿烂的烟火",
  "一秒绽放一秒又坠落",
  "追逐流逝的烟火",
  "我的世界 流光闪烁",
  "如果你听到我",
  "会不会懂"
];

const PreviewPanel: React.FC<PreviewPanelProps> = ({ config }) => {
  const [activeIndex, setActiveIndex] = useState(2);

  // Auto-scroll trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SAMPLE_LYRICS.length);
    }, 2000); // Change line every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate container height based on config to mimic AE Comp
  const scaleRatio = 0.3; // Scale down for web preview

  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center p-10 overflow-hidden relative">
      <div className="absolute top-6 left-6 z-10 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex flex-col gap-1">
        <span className="text-xs font-mono text-gray-400">效果预览 (平滑过渡)</span>
      </div>

      <div 
        className="relative bg-black overflow-hidden shadow-2xl border border-gray-800 rounded-xl"
        style={{
          width: 500, // Fixed width for UI
          height: 700, 
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            // Use CSS transform for smooth sliding
            transform: `translateY(${-activeIndex * (config.spacing * scaleRatio)}px)`
          }}
        >
          {SAMPLE_LYRICS.map((line, index) => {
            const diff = Math.abs(index - activeIndex);
            
            // Logic mimicking AE smooth interpolation
            // We approximate the continuous AE values with discrete CSS states
            
            // Scale Calculation
            let scaleVal = 1.0;
            if (diff <= 0.8) {
               const t = diff / 0.8; 
               scaleVal = config.activeScale + (1.0 - config.activeScale) * t;
            }
            
            // Opacity Calculation
            let opacityVal = 1.0;
            if (diff >= 3.5) {
              opacityVal = 0.5;
            } else if (diff > 1.0) {
              const t = (diff - 1.0) / 2.5;
              opacityVal = 1.0 - 0.5 * t;
            }

            // Blur Calculation
            const blurVal = (diff < 0.3) ? 0 : config.blurMax;

            // Color highlighting
            const isActive = diff < 0.5;
            const color = isActive ? config.textColor : config.inactiveColor;
            
            return (
              <div
                key={index}
                className="absolute w-full flex items-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                   top: '50%',
                   left: 0,
                   marginTop: (index * config.spacing * scaleRatio),
                   justifyContent: config.alignment === 'left' ? 'flex-start' : 'center',
                   paddingLeft: config.alignment === 'left' ? '10%' : 0,
                   transform: `translateY(-50%) scale(${scaleVal})`, 
                   opacity: opacityVal,
                   filter: `blur(${blurVal}px)`,
                   color: color,
                   fontFamily: config.fontName,
                   fontSize: `${config.fontSize * scaleRatio}px`,
                   fontWeight: isActive ? 700 : 400,
                   whiteSpace: 'nowrap'
                }}
              >
                {line}
              </div>
            );
          })}
        </div>

        {/* Overlay to simulate depth fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      </div>
      
      <p className="mt-6 text-gray-500 text-sm max-w-md text-center">
        预览模拟了 Apple Music 风格的平滑滚动效果（无回弹）。
      </p>
    </div>
  );
};

export default PreviewPanel;