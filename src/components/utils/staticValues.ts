import { TimePeriod } from "../context/TimePeriodContext";
import { SimulationInput } from "./types";

export const MAX_ARRIVAL_PROBABILITY = 200;
export const MIN_ARRIVAL_PROBABILITY = 20;

export const PEAK_USAGE_FACTOR = new Map<TimePeriod, number>();
PEAK_USAGE_FACTOR.set("DAY", 1.4);
PEAK_USAGE_FACTOR.set("WEEK", 1.7);
PEAK_USAGE_FACTOR.set("MONTH", 1.7);

export const HOUR_FACTORS = [
  0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.2, 1.4, 1.2, 0.7, 0.6, 0.2,
];

export const WEEK_FACTORS = [1.4, 0.7, 0.5, 0.6, 0.8, 1.7, 0.1];

export const MONTH_FACTORS = [
  1.2, 0.6, 0.5, 0.6, 0.8, 1.7, 0.2, 1.3, 0.7, 0.5, 0.6, 0.8, 1.5, 0.4, 1.2,
  0.9, 0.5, 0.5, 0.8, 1.3, 0.3, 1.4, 0.7, 0.5, 0.6, 0.8, 1.7, 0.1, 0.2, 0.5,
];

export const DEFAULT_INPUT: SimulationInput = {
  chargePoints: 20,
  arrivalProbability: 100,
  power: 11,
  consumption: 18,
};
