export function calculateUsedChargingStations(
  chargePoints: number,
  utilizationRate: number
) {
  return Math.round((utilizationRate / 200) * chargePoints);
}

export function calculateMaxPowerLoad(
  totalChargingStations: number,
  occupiedChargingStations: number,
  power: number
) {
  return (
    Math.min(occupiedChargingStations * 1.4, totalChargingStations) * power
  );
}

export function calculatePowerChartData() {
  return [
    { x: "06:00", y: calculatePowerPerHour(20, 10, 0.05, 11) },
    { x: "08:00", y: calculatePowerPerHour(20, 10, 0.2, 11) },
    { x: "10:00", y: calculatePowerPerHour(20, 10, 0.6, 11) },
    { x: "12:00", y: calculatePowerPerHour(20, 10, 0.9, 11) },
    { x: "14:00", y: calculatePowerPerHour(20, 10, 1.2, 11) }, // Midday peak
    { x: "16:00", y: calculatePowerPerHour(20, 10, 0.8, 11) },
    { x: "18:00", y: calculatePowerPerHour(20, 10, 0.7, 11) },
    { x: "20:00", y: calculatePowerPerHour(20, 10, 0.6, 11) },
  ];
}

const calculatePowerPerHour = (
  chargePoints: number,
  avgUsedChargePoints: number,
  utilizationRate: number,
  powerPerChargePoint: number
): number => {
  // Ensure utilizationRate is within bounds
  const clampedUtilization = Math.max(0, Math.min(utilizationRate, 2));

  // Effective charge points in use based on utilization
  const activeChargePoints = Math.min(
    avgUsedChargePoints * clampedUtilization,
    chargePoints
  );

  // Calculate peak power (active chargers * power per charger)
  return Math.round(activeChargePoints * powerPerChargePoint);
};
