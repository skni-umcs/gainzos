import { Activity, Gender, Goal } from "@gainzos/constants"

export type UserMetricsDTO = {
    id: number;
    userId: number;
    gender: Gender;
    birthDate: string; // ISO date string
    weight: number;
    height: number;
    bicepsCircumference: number;
    chestCircumference: number;
    waistCircumference: number;
    bodyFatPercentage: number;
    activityLevel: Activity;
    goal: Goal;
}