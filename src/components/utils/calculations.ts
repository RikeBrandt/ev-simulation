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
  power: number
) {
  return Math.round(
    Math.min(occupiedChargingStations * 1.4, totalChargingStations) * power
  );
}

// Predefined hourly utilization pattern (10% to 140%)
export const HOUR_FACTORS = [
  0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.2, 1.4, 1.2, 0.7, 0.6, 0.2,
];

export function calculateHourlyPowerUsage(
  chargePoints: number,
  utilizationRate: number,
  power: number
) {
  return HOUR_FACTORS.map((factor) => {
    const activeChargePoints = Math.min(
      chargePoints * (utilizationRate / 200) * factor,
      chargePoints
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
