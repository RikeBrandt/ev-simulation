import { TimePeriod } from "../context/TimePeriodContext";
import {
  HOUR_FACTORS,
  MAX_ARRIVAL_PROBABILITY,
  MONTH_FACTORS,
  PEAK_USAGE_FACTOR,
  WEEK_FACTORS,
} from "./staticValues";

/**
 *
 * @param chargePoints
 * @param arrivalProbability
 * @returns The base amount of used charge points
 */
export function calculateBaseUtilization(
  chargePoints: number,
  arrivalProbability: number
) {
  return Math.round(
    (arrivalProbability / MAX_ARRIVAL_PROBABILITY) * chargePoints
  );
}

export function calculateMaxPowerLoad(chargePoints: number, power: number) {
  return Math.round(chargePoints * power);
}

export function calculatePeakPowerLoad(
  chargePoints: number,
  arrivalProbability: number,
  power: number,
  timePeriod: TimePeriod
) {
  const occupiedChargingStationsAtPeak = calculateActiveChargePoints(
    chargePoints,
    arrivalProbability,
    PEAK_USAGE_FACTOR.get(timePeriod)
  );
  return Math.round(occupiedChargingStationsAtPeak * power);
}

function calculateActiveChargePoints(
  chargePoints: number,
  arrivalProbability: number,
  factor = 1
) {
  return Math.min(
    chargePoints * (arrivalProbability / 200) * factor,
    chargePoints
  );
}

export function calculatePowerUsageOverTime(
  chargePoints: number,
  arrivalProbability: number,
  power: number,
  timePeriod: TimePeriod
) {
  const factors =
    timePeriod === "DAY"
      ? HOUR_FACTORS
      : timePeriod === "WEEK"
      ? WEEK_FACTORS
      : MONTH_FACTORS;
  return factors.map((factor) => {
    const activeChargePoints = calculateActiveChargePoints(
      chargePoints,
      arrivalProbability,
      factor
    );

    const powerUsage = activeChargePoints * power;
    return Math.round(powerUsage);
  });
}

export function calculateAveragePowerUsage(usageData: number[]) {
  return Math.round(
    usageData.reduce((sum, num) => sum + num, 0) / usageData.length
  );
}

export function calculateEnergyConsumptionOverTime(
  chargePoints: number,
  arrivalProbability: number,
  power: number,
  consumption: number,
  timePeriod: TimePeriod
) {
  const hourlyEnergyConsumption = HOUR_FACTORS.map((factor) => {
    const activeChargePoints = calculateActiveChargePoints(
      chargePoints,
      arrivalProbability,
      factor
    );
    const chargingDuration = consumption / power; // might be more than 1 hour
    const durationPerHour = chargingDuration / Math.ceil(chargingDuration); //average charging duration
    return Math.round(power * durationPerHour * activeChargePoints);
  });
  const averageDailyEnergyConsumption = calculateTotalEnergyConsumption(
    hourlyEnergyConsumption
  );
  switch (timePeriod) {
    case "DAY":
      return hourlyEnergyConsumption;
    case "WEEK": {
      return WEEK_FACTORS.map((factor) =>
        Math.round(factor * averageDailyEnergyConsumption)
      );
    }
    default:
      return MONTH_FACTORS.map((factor) =>
        Math.round(factor * averageDailyEnergyConsumption)
      );
  }
}

export function calculateTotalEnergyConsumption(consumptionData: number[]) {
  return Math.round(consumptionData.reduce((prev, cur) => prev + cur));
}
