import {TrialRun} from '../../redux/reducers/participants';
import {NavonMap} from './NavonMap';

export enum LetterTarget {
  Large = 'Large',
  Small = 'Small',
}

export interface LetterRule {
  large: string;
  small: string;
  target: LetterTarget;
  correctAnswer: string;
  display: string;
}

const generateDisplay = (large: string, small: string, target: LetterTarget): LetterRule => ({
  large,
  small,
  correctAnswer: target === LetterTarget.Large ? large : small,
  target,
  display: NavonMap[large].replaceAll('*', small),
});

export const LetterRules: Record<TrialRun, LetterRule[]> = {
  [TrialRun.Ground]: [
    generateDisplay('F', 'H', LetterTarget.Small),
    generateDisplay('L', 'T', LetterTarget.Small),
    generateDisplay('R', 'N', LetterTarget.Large),
    generateDisplay('G', 'M', LetterTarget.Small),
    generateDisplay('O', 'X', LetterTarget.Small),
    generateDisplay('B', 'D', LetterTarget.Large),
    generateDisplay('U', 'R', LetterTarget.Large),
    generateDisplay('P', 'Q', LetterTarget.Large),
    generateDisplay('A', 'Z', LetterTarget.Small),
    generateDisplay('E', 'X', LetterTarget.Large),
  ],
  [TrialRun.Air1]: [
    generateDisplay('R', 'L', LetterTarget.Small),
    generateDisplay('Z', 'N', LetterTarget.Small),
    generateDisplay('K', 'T', LetterTarget.Small),
    generateDisplay('M', 'G', LetterTarget.Small),
    generateDisplay('H', 'K', LetterTarget.Large),
    generateDisplay('X', 'O', LetterTarget.Large),
    generateDisplay('S', 'B', LetterTarget.Small),
    generateDisplay('C', 'F', LetterTarget.Small),
    generateDisplay('J', 'P', LetterTarget.Large),
    generateDisplay('R', 'W', LetterTarget.Large),
  ],
  [TrialRun.Air2]: [
    generateDisplay('T', 'A', LetterTarget.Small),
    generateDisplay('V', 'J', LetterTarget.Large),
    generateDisplay('H', 'S', LetterTarget.Small),
    generateDisplay('G', 'K', LetterTarget.Large),
    generateDisplay('R', 'S', LetterTarget.Small),
    generateDisplay('Z', 'T', LetterTarget.Large),
    generateDisplay('V', 'C', LetterTarget.Small),
    generateDisplay('W', 'E', LetterTarget.Small),
    generateDisplay('Y', 'I', LetterTarget.Small),
    generateDisplay('L', 'I', LetterTarget.Small),
  ],
};
