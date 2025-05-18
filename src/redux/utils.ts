import {Trial} from './reducers/participants';

export function isTrialComplete(trial: Trial): boolean {
  return Boolean(
    trial.reactionTimeResults &&
      trial.trailMakingResults &&
      trial.cardSortingResults &&
      trial.letterIdentificationResults,
  );
}
