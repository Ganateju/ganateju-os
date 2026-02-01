export interface Project {
  id: string;
  title: string;
  category: "SYSTEMS" | "HARDWARE" | "INTELLIGENCE";
  tagline: string;
  friction: string; // The "Hardest Part"
  solution: string; // The "Engineering Fix"
  nextVersion: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    id: "consensus-mesh",
    title: "Consensus Mesh",
    category: "SYSTEMS",
    tagline: "Zero-Trust Identity via Environmental Signals",
    friction: "RF volatility destroyed early accuracy. Multipath reflections caused massive false positives.",
    solution: "Switched from raw RSSI to vector similarity using Cosine & Euclidean displacement over temporal windows.",
    nextVersion: "BLE + WiFi Sensor Fusion and Differential Privacy layers.",
    tech: ["Node.js", "MongoDB", "Signal Processing", "Flutter"]
  },
  {
    id: "aerotoroid",
    title: "AeroToroid",
    category: "HARDWARE",
    tagline: "Toroidal UAV Architecture",
    friction: "Inner ring created turbulent recirculation, killing efficiency and heating motors.",
    solution: "Custom vent alignment + duct shaping to guide laminar flow.",
    nextVersion: "Wind tunnel + CFD simulation for aerodynamic optimization.",
    tech: ["Fusion 360", "MATLAB", "Simulink", "Aerodynamics"]
  },
  {
    id: "lumina",
    title: "LUMINA",
    category: "INTELLIGENCE",
    tagline: "Light-based Parallel Computing",
    friction: "Physical light signal cross-talk. Theory looked clean; physics said 'try again'.",
    solution: "Separated channels by orthogonal properties (wavelength vs polarization) instead of intensity.",
    nextVersion: "Bench-top optical logic gate using off-the-shelf photonics hardware.",
    tech: ["Photonics", "Parallel Computing", "Optical Physics"]
  }
];