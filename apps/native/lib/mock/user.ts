import type { UserMetricsDTO } from '@gainzos/types';
import { ACTIVITY, GENDER, GOAL } from '@gainzos/constants';

/** No UserDTO exists in @gainzos/types yet; this is a minimal mock-only shape. */
export type MockUser = {
  id: number;
  username: string;
  email: string;
};

export const USER: MockUser = {
  id: 1,
  username: 'marcus_lifts',
  email: 'marcus@gainzos.app',
};

export const METRICS: UserMetricsDTO = {
  id: 1,
  userId: 1,
  gender: GENDER.MALE,
  birthDate: '1994-03-22',
  weight: 82.4,
  height: 181,
  bicepsCircumference: 38.5,
  chestCircumference: 104,
  waistCircumference: 81,
  bodyFatPercentage: 14.8,
  activityLevel: ACTIVITY.HIGH,
  goal: GOAL.GAIN_WEIGHT,
};
