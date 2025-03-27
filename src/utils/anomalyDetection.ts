import { WeatherNode } from '../types/node';

// Weather measurement thresholds for India
const THRESHOLDS = {
  temperature: {
    min: -10, // Minimum temperature in Celsius
    max: 50,  // Maximum temperature in Celsius
    hourlyChange: 5 // Maximum expected change per hour
  },
  humidity: {
    min: 0,
    max: 100,
    hourlyChange: 20
  },
  pressure: {
    min: 870,  // Minimum pressure in hPa (high altitude)
    max: 1090, // Maximum pressure in hPa
    hourlyChange: 10
  },
  windSpeed: {
    min: 0,
    max: 100, // Maximum wind speed in m/s
    hourlyChange: 15
  },
  rainfall: {
    min: 0,
    max: 500, // Maximum rainfall in mm per day
    hourlyChange: 50
  },
  airQuality: {
    pm25: {
      min: 0,
      max: 500,
      hourlyChange: 50
    },
    pm10: {
      min: 0,
      max: 600,
      hourlyChange: 75
    },
    ozone: {
      min: 0,
      max: 400,
      hourlyChange: 40
    },
    no2: {
      min: 0,
      max: 200,
      hourlyChange: 30
    }
  },
  uvIndex: {
    min: 0,
    max: 12,
    hourlyChange: 2
  }
};

export interface AnomalyReport {
  hasAnomaly: boolean;
  anomalies: {
    field: string;
    value: number;
    threshold: {
      min?: number;
      max?: number;
    };
    message: string;
  }[];
}

export const checkNodeAnomalies = (node: WeatherNode): AnomalyReport => {
  const anomalies = [];

  // Only check active nodes
  if (node.status !== 'active') {
    return { hasAnomaly: false, anomalies: [] };
  }

  // Check temperature
  if (node.measurements.temperature < THRESHOLDS.temperature.min || 
      node.measurements.temperature > THRESHOLDS.temperature.max) {
    anomalies.push({
      field: 'temperature',
      value: node.measurements.temperature,
      threshold: {
        min: THRESHOLDS.temperature.min,
        max: THRESHOLDS.temperature.max
      },
      message: `Temperature reading (${node.measurements.temperature}°C) is outside normal range`
    });
  }

  // Check humidity
  if (node.measurements.humidity < THRESHOLDS.humidity.min || 
      node.measurements.humidity > THRESHOLDS.humidity.max) {
    anomalies.push({
      field: 'humidity',
      value: node.measurements.humidity,
      threshold: {
        min: THRESHOLDS.humidity.min,
        max: THRESHOLDS.humidity.max
      },
      message: `Humidity reading (${node.measurements.humidity}%) is outside normal range`
    });
  }

  // Check pressure
  if (node.measurements.pressure < THRESHOLDS.pressure.min || 
      node.measurements.pressure > THRESHOLDS.pressure.max) {
    anomalies.push({
      field: 'pressure',
      value: node.measurements.pressure,
      threshold: {
        min: THRESHOLDS.pressure.min,
        max: THRESHOLDS.pressure.max
      },
      message: `Pressure reading (${node.measurements.pressure} hPa) is outside normal range`
    });
  }

  // Check wind speed
  if (node.measurements.windSpeed < THRESHOLDS.windSpeed.min || 
      node.measurements.windSpeed > THRESHOLDS.windSpeed.max) {
    anomalies.push({
      field: 'windSpeed',
      value: node.measurements.windSpeed,
      threshold: {
        min: THRESHOLDS.windSpeed.min,
        max: THRESHOLDS.windSpeed.max
      },
      message: `Wind speed reading (${node.measurements.windSpeed} m/s) is outside normal range`
    });
  }

  // Check rainfall
  if (node.measurements.rainfall < THRESHOLDS.rainfall.min || 
      node.measurements.rainfall > THRESHOLDS.rainfall.max) {
    anomalies.push({
      field: 'rainfall',
      value: node.measurements.rainfall,
      threshold: {
        min: THRESHOLDS.rainfall.min,
        max: THRESHOLDS.rainfall.max
      },
      message: `Rainfall reading (${node.measurements.rainfall} mm) is outside normal range`
    });
  }

  // Check air quality
  Object.entries(node.measurements.airQuality).forEach(([key, value]) => {
    const threshold = THRESHOLDS.airQuality[key as keyof typeof THRESHOLDS.airQuality];
    if (value < threshold.min || value > threshold.max) {
      anomalies.push({
        field: `airQuality.${key}`,
        value: value,
        threshold: {
          min: threshold.min,
          max: threshold.max
        },
        message: `${key.toUpperCase()} reading (${value}) is outside normal range`
      });
    }
  });

  // Check UV index
  if (node.measurements.uvIndex < THRESHOLDS.uvIndex.min || 
      node.measurements.uvIndex > THRESHOLDS.uvIndex.max) {
    anomalies.push({
      field: 'uvIndex',
      value: node.measurements.uvIndex,
      threshold: {
        min: THRESHOLDS.uvIndex.min,
        max: THRESHOLDS.uvIndex.max
      },
      message: `UV Index reading (${node.measurements.uvIndex}) is outside normal range`
    });
  }

  return {
    hasAnomaly: anomalies.length > 0,
    anomalies
  };
};

export const isValidForAggregation = (node: WeatherNode): boolean => {
  const { hasAnomaly } = checkNodeAnomalies(node);
  return !hasAnomaly && node.status === 'active';
};