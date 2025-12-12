import React from 'react';
import { ScriptConfig } from '../types';
import { Settings, Type, Palette, Layout, MousePointer2 } from 'lucide-react';

interface ConfigPanelProps {
  config: ScriptConfig;
  onChange: (newConfig: ScriptConfig) => void;
  onDownload: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, onDownload }) => {
  const handleChange = (key: keyof ScriptConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-gray-800 border-r border-gray-700 h-full overflow-y-auto p-6 flex flex-col gap-6 w-[400px] shrink-0 scrollbar-hide">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">脚本参数配置</h1>
      </div>

      {/* Colors Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 font-medium">
          <Palette className="w-4 h-4" /> 颜色设置
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">高亮歌词颜色</label>
            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded border border-gray-700">
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
              />
              <span className="text-xs font-mono text-gray-300">{config.textColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">普通歌词颜色</label>
            <div className="flex items-center gap-2 bg-gray-900 p-2 rounded border border-gray-700">
              <input
                type="color"
                value={config.inactiveColor}
                onChange={(e) => handleChange('inactiveColor', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
              />
              <span className="text-xs font-mono text-gray-300">{config.inactiveColor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Typography & Layout */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 font-medium">
          <Type className="w-4 h-4" /> 字体与布局
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-xs text-gray-400 mb-1">字号 (px)</label>
            <input
              type="number"
              value={config.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
           <div>
            <label className="block text-xs text-gray-400 mb-1">行间距 (px)</label>
            <input
              type="number"
              value={config.spacing}
              onChange={(e) => handleChange('spacing', Number(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
            <label className="block text-xs text-gray-400 mb-1">字体名称 (需本机安装)</label>
            <input
              type="text"
              value={config.fontName}
              onChange={(e) => handleChange('fontName', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
        </div>

        <div>
           <label className="block text-xs text-gray-400 mb-2">对齐方式</label>
           <div className="flex gap-2">
             <button 
                onClick={() => handleChange('alignment', 'left')}
                className={`flex-1 py-2 text-xs rounded border ${config.alignment === 'left' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-900 border-gray-700 text-gray-400'}`}
             >
                左对齐
             </button>
             <button 
                onClick={() => handleChange('alignment', 'center')}
                className={`flex-1 py-2 text-xs rounded border ${config.alignment === 'center' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-900 border-gray-700 text-gray-400'}`}
             >
                居中对齐
             </button>
           </div>
        </div>
      </section>

      {/* Animation Physics */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-300 font-medium">
          <MousePointer2 className="w-4 h-4" /> 动画参数
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>边缘模糊半径</span>
              <span>{config.blurMax}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.blurMax}
              onChange={(e) => handleChange('blurMax', Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>高亮缩放比例</span>
              <span>{(config.activeScale * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="2"
              step="0.05"
              value={config.activeScale}
              onChange={(e) => handleChange('activeScale', Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

           <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>背景缩放比例</span>
              <span>{(config.inactiveScale * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={config.inactiveScale}
              onChange={(e) => handleChange('inactiveScale', Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>动画阻尼 (越大越快)</span>
              <span>{config.damping}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={config.damping}
              onChange={(e) => handleChange('damping', Number(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <p className="text-[10px] text-gray-500 mt-1">控制歌词滑动的停止速度，数值越大停止越干脆，数值越小越平滑。</p>
          </div>
        </div>
      </section>

      <div className="flex-grow"></div>

      <button
        onClick={onDownload}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <Layout className="w-5 h-5" />
        下载 AE 脚本 (.jsx)
      </button>
    </div>
  );
};

export default ConfigPanel;