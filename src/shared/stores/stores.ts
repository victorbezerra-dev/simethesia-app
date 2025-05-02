import { configureStore } from '@reduxjs/toolkit';
import simulationReducer from './simulationSlice';

export const store = configureStore({
  reducer: {
    simulation: simulationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
