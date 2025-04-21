import uuid from 'react-native-uuid';
import { EffectOption } from './EffectOption';

export class Challenge {
  constructor(
    public readonly id: string,
    public readonly effect: EffectOption,
    public readonly durationInSeconds: number
  ) {}

  static create(effect: EffectOption, durationInSeconds: number): Challenge {
    const id = uuid.v4() as string;
    return new Challenge(id, effect, durationInSeconds);
  }

  get summary() {
    return `${this.effect} for ${this.durationInSeconds}s`;
  }
}
