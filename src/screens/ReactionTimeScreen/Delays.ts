import {TrialRun} from '../../redux/reducers/participants';

export const Index = 0;
export const Delay = 1;
export type ButtonData = [number, number];

export const Delays: Record<TrialRun, ButtonData[]> = {
  [TrialRun.Ground]: [
    [3, 3],
    [3, 1.5],
    [2, 0.5],
    [2, 0],
    [4, 1.5],
    [1, 4],
    [5, 1],
    [3, 3],
    [2, 3.5],
    [2, 3],
  ],
  [TrialRun.Air1]: [
    [4, 0.5],
    [3, 4],
    [3, 0.5],
    [2, 2],
    [3, 1.5],
    [1, 0],
    [4, 1],
    [3, 4],
    [4, 0.5],
    [1, 0.5],
  ],
  [TrialRun.Air2]: [
    [1, 3.5],
    [5, 3],
    [3, 1.5],
    [1, 1.5],
    [2, 3],
    [3, 2],
    [2, 3.5],
    [5, 3.5],
    [3, 0],
    [1, 3],
  ],
};
