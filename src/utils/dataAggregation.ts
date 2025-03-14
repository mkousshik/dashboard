import { NodeHistory, AggregatedData, TimePeriod } from '../types/nodeHistory';

export const calculateAverages = (
  histories: NodeHistory[],
  period: TimePeriod
): AggregatedData => {
  const now = new Date();
  const periodHours = getPeriodHours(period);
  const cutoffDate = new Date(now.getTime() - periodHours * 60 * 60 * 1000);

  // Collect all measurements within the time period
  const relevantMeasurements = histories.flatMap(history =>
    history.measurements.filter(m => new Date(m.timestamp) >= cutoffDate)
  );

  if (relevantMeasurements.length === 0) {
    return createEmptyAggregation(period);
  }

  // Calculate averages
  const sum = relevantMeasurements.reduce((acc, measurement) => ({
    temperature: acc.temperature + measurement.temperature,
    humidity: acc.humidity + measurement.humidity,
    pressure: acc.pressure + measurement.pressure,
    windSpeed: acc.windSpeed + measurement.windSpeed,
    rainfall: acc.rainfall + measurement.rainfall,
    airQuality: {
      pm25: acc.airQuality.pm25 + measurement.airQuality.pm25,
      pm10: acc.airQuality.pm10 + measurement.airQuality.pm10,
      ozone: acc.airQuality.ozone + measurement.airQuality.ozone,
      no2: acc.airQuality.no2 + measurement.airQuality.no2,
    },
    uvIndex: acc.uvIndex + measurement.uvIndex,
  }), createEmptyAggregation(period));

  const count = relevantMeasurements.length;

  return {
    period,
    temperature: sum.temperature / count,
    humidity: sum.humidity / count,
    pressure: sum.pressure / count,
    windSpeed: sum.windSpeed / count,
    rainfall: sum.rainfall / count,
    airQuality: {
      pm25: sum.airQuality.pm25 / count,
      pm10: sum.airQuality.pm10 / count,
      ozone: sum.airQuality.ozone / count,
      no2: sum.airQuality.no2 / count,
    },
    uvIndex: sum.uvIndex / count,
  };
};

const getPeriodHours = (period: TimePeriod): number => {
  switch (period) {
    case 'current': return 0;
    case '12h': return 12;
    case '24h': return 24;
    case '3d': return 72;
    case '7d': return 168;
    case '30d': return 720;
    case '2m': return 1440;
    case '3m': return 2160;
    default: return 0;
  }
};

const createEmptyAggregation = (period: TimePeriod): AggregatedData => ({
  period,
  temperature: 0,
  humidity: 0,
  pressure: 0,
  windSpeed: 0,
  rainfall: 0,
  airQuality: {
    pm25: 0,
    pm10: 0,
    ozone: 0,
    no2: 0,
  },
  uvIndex: 0,
});