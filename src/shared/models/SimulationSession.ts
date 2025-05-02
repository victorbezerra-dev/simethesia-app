import { Challenge } from "./Challenge";
import { PatientData } from "./PatientData";
import { SimulationResult } from "./SimulationResult";

export type SimulationSession = {
    patient: PatientData;
    challenges: Challenge[];
    totalSimulationTime: number;
    result?: SimulationResult;
};