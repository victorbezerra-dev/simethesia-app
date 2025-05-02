import { create } from 'zustand';
import { Challenge } from '@/shared/models/Challenge';
import { EffectOption, effectOptions } from '@/shared/models/EffectOption';

type ChallengeStore = {
    challenges: Challenge[];
    setReordered: (list: Challenge[]) => void;
    addChallenge: (effect: EffectOption, durationInSeconds: number) => void;
    removeChallenge: (id: string) => void;
    clearChallenges: () => void;
};

export const useChallengeStore = create<ChallengeStore>((set) => ({
    challenges: [],
    setReordered: (list) =>
        set(() => ({
            challenges: list,
        })),
    addChallenge: (effect, durationInSeconds) =>
        set((state) => ({
            challenges: [
                ...state.challenges,
                Challenge.create(effect, durationInSeconds),
            ],
        })),
    removeChallenge: (id: string) =>
        set(state => ({
            challenges: state.challenges.filter(ch => ch.id !== id),
        })),
    clearChallenges: () => set({ challenges: [] }),
}));
