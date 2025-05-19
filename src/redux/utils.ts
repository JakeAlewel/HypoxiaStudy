import {useRef} from 'react';
import {recordResults, TestResultsBase, Trial, TrialRun} from './reducers/participants';
import {useDispatch} from 'react-redux';

export function isTrialComplete(trial: Trial): boolean {
  return Boolean(
    trial.reactionTimeResults &&
      trial.trailMakingResults &&
      trial.cardSortingResults &&
      trial.letterIdentificationResults,
  );
}

export interface UseRecordResultsHookResult<
  TestKey extends keyof Omit<Trial, 'run'>,
  ResultData extends Trial[TestKey],
> {
  record: (testKey: TestKey, results: Omit<ResultData, keyof TestResultsBase>) => void;
}

export function useRecordResults<TestKey extends keyof Omit<Trial, 'run'>, ResultData extends Trial[TestKey]>(
  name: string,
  run: TrialRun,
): UseRecordResultsHookResult<TestKey, ResultData> {
  const startTime = useRef(new Date());
  const dispatch = useDispatch();

  return useRef<UseRecordResultsHookResult<TestKey, ResultData>>({
    record: (testKey: TestKey, results: Omit<ResultData, keyof TestResultsBase>) => {
      dispatch(
        recordResults({
          name,
          run,
          results: {
            [testKey]: {
              ...results,
              startTime: startTime.current.toISOString(),
              endTime: new Date().toISOString(),
            },
          },
        }),
      );
    },
  }).current;
}
