import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimulationSession } from '@/shared/models/SimulationSession';
import { SimulationResult } from '../models/SimulationResult';

interface SimulationState {
    session: SimulationSession | null;
}

const initialState: SimulationState = {
    session: null,
};

export const simulationSlice = createSlice({
    name: 'simulation',
    initialState,
    reducers: {
        setSimulationSession(state, action: PayloadAction<SimulationSession>) {
            state.session = action.payload;
        },
        setSimulationResult(state, action: PayloadAction<SimulationResult>) {
            if (state.session) {
                state.session.result = action.payload;
            }
        },
        resetSimulation(state) {
            state.session = null;
        },
    },
});

export const { setSimulationSession, setSimulationResult, resetSimulation } = simulationSlice.actions;
export default simulationSlice.reducer;
