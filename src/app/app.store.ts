import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type ScoreState = {
  score: number;
  isLoading: boolean;
};

const initialState: ScoreState = {
  score: 0,
  isLoading: false,
};

export const ScoreStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    async setInitialScore(score: string | undefined) {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        isLoading: false,
        score: parseInt(score === '' || score === undefined ? '0' : score, 10),
      }));
    },
    updateScore() {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        isLoading: false,
        score: state.score + 1,
      }));
    },
  })),
);
