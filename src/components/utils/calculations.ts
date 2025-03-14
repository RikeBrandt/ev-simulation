import { TimePeriod } from "../context/TimePeriodContext";

/**
 *
 * @param chargePoints
 * @param utilizationRate
 * @returns The base amount of used charge points
 */
export function calculateBaseUtilization(
  chargePoints: number,
  utilizationRate: number
) {
  return Math.round((utilizationRate / 200) * chargePoints);
}

export function calculateMaxPowerLoad(
  totalChargingStations: number,
  power: number
) {
  return Math.round(totalChargingStations * power);
}

export function calculatePeakPowerLoad(
  totalChargingStations: number,
  occupiedChargingStations: number,
  power: number,
  timePeriod: TimePeriod
) {
  return Math.round(
    Math.min(
      occupiedChargingStations * (peakUsage.get(timePeriod) ?? 1),
      totalChargingStations
    ) * power
  );
}

const peakUsage = new Map<TimePeriod, number>();
peakUsage.set("DAY", 1.4);
peakUsage.set("WEEK", 1.7);

// Predefined hourly utilization pattern (10% to 140%)
export const HOUR_FACTORS = [
  0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.2, 1.4, 1.2, 0.7, 0.6, 0.2,
];

export const WEEK_FACTORS = [1.4, 0.7, 0.5, 0.6, 0.8, 1.7, 0.1];

function calculateActiveChargePoints(
  chargePoints: number,
  utilizationRate: number,
  factor: number
) {
  return Math.min(
    chargePoints * (utilizationRate / 200) * factor,
    chargePoints
  );
}

export function calculatePowerUsage(
  chargePoints: number,
  utilizationRate: number,
  power: number,
  timePeriod: TimePeriod
) {
  const factors = timePeriod === "DAY" ? HOUR_FACTORS : WEEK_FACTORS;
  return factors.map((factor) => {
    const activeChargePoints = calculateActiveChargePoints(
      chargePoints,
      utilizationRate,
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

export function calculateHourlyEnergyConsumption(
  chargePoints: number,
  utilizationRate: number,
  power: number,
  consumption: number,
  timePeriod: TimePeriod
) {
  const hourlyEnergyConsumption = HOUR_FACTORS.map((factor) => {
    const activeChargePoints = calculateActiveChargePoints(
      chargePoints,
      utilizationRate,
      factor
    );
    const chargingDuration = consumption / power; // might be more than 1 hour
    const durationPerHour = chargingDuration / Math.ceil(chargingDuration); //average charging duration
    return Math.round(power * durationPerHour * activeChargePoints);
  });
  if (timePeriod === "DAY") return hourlyEnergyConsumption;

  const averageDailyEnergyConsumption = calculateTotalEnergyConsumption(
    hourlyEnergyConsumption
  );

  return WEEK_FACTORS.map((factor) => factor * averageDailyEnergyConsumption);
}

export function calculateTotalEnergyConsumption(consumptionData: number[]) {
  return Math.round(consumptionData.reduce((prev, cur) => prev + cur));
}
