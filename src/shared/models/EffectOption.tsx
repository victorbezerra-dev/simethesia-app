export type EffectOption = {
    icon: any, 
    code: number;
    label: string;
    description: string;
};

export const effectOptions: readonly EffectOption[] = [
    {
        icon: require('@/assets/icons/icon-hemorrhage.png'),
        code: 1,
        label: 'Hemorragia',
        description: 'Reduz V1 em 25% e aumenta k10 em 30%',
    },
    {
        icon: require('@/assets/icons/icon-vasodilation.png'),
        code: 2,
        label: 'Vasodilatação',
        description: 'Aumenta V1 em 40%',
    },
    {
        icon: require('@/assets/icons/icon-vasoconstriction.png'),
        code: 3,
        label: 'Vasoconstrição',
        description: 'Reduz V1 em 40% e ke0 em 30%',
    },
    {
        icon: require('@/assets/icons/icon-vasoactive-drugs.png'),
        code: 4,
        label: 'Drogas vasoativas',
        description: 'Aumenta ke0 em 50% e Emax em 20%',
    },
    {
        icon: require('@/assets/icons/icon-neuronal-challenge.png'),
        code: 5,
        label: 'Desafio neuronal',
        description: 'Reduz E0 em 15%',
    },
];
