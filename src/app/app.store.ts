import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type ScoreState = {
  score: number; // счетчик
  isLoading: boolean; // индикатор загрузки
};

// Начальное состояние стора:
const initialState: ScoreState = {
  score: 0,
  isLoading: false,
};

export const ScoreStore = signalStore(
  { providedIn: 'root' },
  withState(initialState), // задаём начальное состояние
  withMethods((store) => ({
    // Асинхронный метод для восстановления значения счетчика из Telegram Cloud Storage.
    async setInitialScore(score: string | undefined) {
      patchState(store, { isLoading: true });
      patchState(store, (state) => ({
        ...state,
        isLoading: false,
        score: parseInt(score === '' || score === undefined ? '0' : score, 10),
      }));
    },
    // Метод для обновления значения счетчика в Telegram Cloud Storage.
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
