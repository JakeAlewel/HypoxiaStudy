import {TrialRun} from '../redux/reducers/participants';

export const RunNames: Record<TrialRun, string> = {
  [TrialRun.Ground]: 'Ground',
  [TrialRun.Air1]: 'Air 1',
  [TrialRun.Air2]: 'Air 2',
};
