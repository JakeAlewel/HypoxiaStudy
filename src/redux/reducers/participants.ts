import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../RootState';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import type {ReactionTimeTestResults} from '../../screens/ReactionTimeScreen/ReactionTimeScreen';
import type {TrailMakingResults} from '../../screens/TrailMakingScreen/TrailMakingScreen';
import type {CardSortingResults} from '../../screens/CardSortingScreen/CardSortingScreen';
import type {LetterIdentificationResults} from '../../screens/LetterIdentificationScreen/LetterIdentificationScreen';

export enum TrialRun {
  Ground = 'Ground',
  Air1 = 'Air1',
  Air2 = 'Air2',
}

export interface TestResultsBase {
  startTime: string;
  endTime: string;
}

export interface Trial {
  run: TrialRun;
  completed: boolean;
  reactionTimeResults?: ReactionTimeTestResults;
  trailMakingResults?: TrailMakingResults;
  cardSortingResults?: CardSortingResults;
  letterIdentificationResults?: LetterIdentificationResults;
}

export interface Participant {
  name: string;
  dateAdded: string;
  trials: Record<TrialRun, Trial>;
}

export interface ParticipantsState {
  participants: {[key: string]: Participant};
}

const initialState: ParticipantsState = {
  participants: {},
};

function createDefaultTrial(run: TrialRun): Trial {
  return {
    run,
    completed: false,
  };
}

function createDefaultParticipant(name: string): Participant {
  return {
    name,
    dateAdded: new Date().toISOString(),
    trials: {
      [TrialRun.Ground]: createDefaultTrial(TrialRun.Ground),
      [TrialRun.Air1]: createDefaultTrial(TrialRun.Air1),
      [TrialRun.Air2]: createDefaultTrial(TrialRun.Air2),
    },
  };
}

export interface RecordResultsPayload {
  name: string;
  run: TrialRun;
  results: Partial<Omit<Trial, 'run' | 'completed'>>;
}

const slice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addParticipant: (state, {payload}: PayloadAction<Pick<Participant, 'name'>>) => {
      return {
        ...state,
        participants: {
          ...state.participants,
          [payload.name]: createDefaultParticipant(payload.name),
        },
      };
    },
    removeParticipant: (state, {payload: name}: PayloadAction<string>) => {
      const newParticipants = {...state.participants};
      delete newParticipants[name];
      return {
        ...state,
        participants: newParticipants,
      };
    },
    recordResults: (state, {payload: {name, run, results}}: PayloadAction<RecordResultsPayload>) => {
      // I think immer lets me avoid this deep spreading.
      return {
        ...state,
        participants: {
          ...state.participants,
          [name]: {
            ...state.participants[name],
            trials: {
              ...state.participants[name].trials,
              [run]: {
                ...state.participants[name].trials[run],
                ...results,
              },
            },
          },
        },
      };
    },
  },
});

export const {addParticipant, removeParticipant, recordResults} = slice.actions;
export const participants = slice.reducer;

export const selectParticipants = (state: RootState) => state.participants.participants;

export function useParticipant(name: string): Participant {
  return useSelector(useCallback((state: RootState) => state.participants.participants[name], [name]));
}
