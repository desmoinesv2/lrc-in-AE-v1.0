import React, { useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import PreviewPanel from './components/PreviewPanel';
import { ScriptConfig, DEFAULT_CONFIG } from './types';
import { generateAeScript } from './utils/aeScriptGenerator';

const App: React.FC = () => {
  const [config, setConfig] = useState<ScriptConfig>(DEFAULT_CONFIG);

  const handleDownload = () => {
    const scriptContent = generateAeScript(config);
    const blob = new Blob([scriptContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `AM_Lyrics_Generator_v2.jsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-hidden">
      <ConfigPanel 
        config={config} 
        onChange={setConfig} 
        onDownload={handleDownload} 
      />
      <PreviewPanel config={config} />
    </div>
  );
};

export default App;