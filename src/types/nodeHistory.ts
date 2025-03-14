export interface NodeMeasurementHistory {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  rainfall: number;
  airQuality: {
    pm25: number;
    pm10: number;
    ozone: number;
    no2: number;
  };
  uvIndex: number;
}

export interface NodeHistory {
  nodeId: string;
  measurements: NodeMeasurementHistory[];
}

export interface AggregatedData {
  period: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  rainfall: number;
  airQuality: {
    pm25: number;
    pm10: number;
    ozone: number;
    no2: number;
  };
  uvIndex: number;
}

export type TimePeriod = 'current' | '12h' | '24h' | '3d' | '7d' | '30d' | '2m' | '3m';

export interface TimeRangeData {
  label: string;
  value: TimePeriod;
  duration: number; // in hours
}