import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../RootState';

export interface Participant {
  name: string;
  dateAdded: string;
  completedGround: boolean;
  completedAir1: boolean;
  completedAir2: boolean;
}

export interface ParticipantsState {
  participants: {[key: string]: Participant};
}

const initialState: ParticipantsState = {
  participants: {},
};

const slice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addParticipant: (state, {payload}: PayloadAction<Pick<Participant, 'name'>>) => {
      const newParticipant: Participant = {
        ...payload,
        dateAdded: new Date().toISOString(),
        completedGround: false,
        completedAir1: false,
        completedAir2: false,
      };

      return {
        ...state,
        participants: {
          ...state.participants,
          [payload.name]: newParticipant,
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
  },
});

export const {addParticipant, removeParticipant} = slice.actions;
export const participants = slice.reducer;

export const selectParticipants = (state: RootState) => state.participants.participants;
