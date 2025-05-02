import { create } from 'zustand';
import { SimulationSample } from '@/shared/models/SimulationSample';


interface SimulationMetricsState {
    calculateMetricsFromSamples: (samples: SimulationSample[]) => void;
    resetMetrics: () => void;
    iae: number;
    ise: number;
    tcv: number;
}

export const useSimulationMetricsStore = create<SimulationMetricsState>((set, get) => ({
    calculateMetricsFromSamples: (samples: SimulationSample[]) => {
        const { iae, ise, tcv } = calculateMetrics(samples);
        set({ iae, ise, tcv });
    },
    resetMetrics: () => set({ iae: 0, ise: 0, tcv: 0 }),
    iae: 0,
    ise: 0,
    tcv: 0,
}));

function calculateMetrics(samples: SimulationSample[]) {
    let iae = 0;
    let ise = 0;
    let tcv = 0;

    for (let i = 1; i < samples.length; i++) {
        const prev = samples[i - 1];
        const curr = samples[i];
        const dt = curr.timestamp - prev.timestamp;

        const e = curr.BISValue - 50;
        iae += Math.abs(e) * dt;
        ise += e * e * dt;

        const deltaU = Math.abs(curr.infusionRate - prev.infusionRate);
        tcv += deltaU;
    }

    return { iae, ise, tcv };
}