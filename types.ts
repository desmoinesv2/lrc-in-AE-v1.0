export interface ScriptConfig {
  compName: string;
  width: number;
  height: number;
  fps: number;
  duration: number;
  fontSize: number;
  fontName: string;
  textColor: string; // Hex
  inactiveColor: string; // Hex
  spacing: number;
  blurMax: number;
  activeScale: number; // e.g. 1.1 for 110%
  inactiveScale: number; // Unused in this specific script version (hardcoded to 100)
  damping: number;
  alignment: 'left' | 'center';
  textLift: number;
}

export const DEFAULT_CONFIG: ScriptConfig = {
  compName: "歌词层",
  width: 1920,
  height: 1920,
  fps: 30,
  duration: 300,
  fontSize: 90,
  fontName: "Microsoft YaHei",
  textColor: "#FFFFFF",
  inactiveColor: "#878787", // Approx [0.53, 0.53, 0.53]
  spacing: 180,
  blurMax: 20,
  activeScale: 1.1,
  inactiveScale: 1.0, 
  damping: 0.8,
  alignment: "left",
  textLift: 10
};