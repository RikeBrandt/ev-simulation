import { SimulationInput } from "../context/SimulationInputContext";
import { TimePeriod } from "../context/TimePeriodContext";

export const MAX_ARRIVAL_PROBABILITY = 200;
export const MIN_ARRIVAL_PROBABILITY = 20;

export const PEAK_USAGE_FACTOR = new Map<TimePeriod, number>();
PEAK_USAGE_FACTOR.set("DAY", 1.4);
PEAK_USAGE_FACTOR.set("WEEK", 1.7);

export const HOUR_FACTORS = [
  0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.2, 1.4, 1.2, 0.7, 0.6, 0.2,
];

export const WEEK_FACTORS = [1.4, 0.7, 0.5, 0.6, 0.8, 1.7, 0.1];

export const DEFAULT_INPUT: SimulationInput = {
  chargePoints: 20,
  arrivalProbability: 100,
  power: 11,
  consumption: 18,
};

export const SECONDARY_CHART_COLOR = "#90A4AE";
export const PRIMARY_CHART_COLOR = "oklch(0.789 0.154 211.53)";
