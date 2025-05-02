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
    challenges: [
        Challenge.create(effectOptions[0], 30),
        Challenge.create(effectOptions[1], 45),
        Challenge.create(effectOptions[2], 45),
        Challenge.create(effectOptions[3], 60),
        Challenge.create(effectOptions[4], 60),
    ],
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
