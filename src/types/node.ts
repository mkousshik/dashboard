export interface WeatherNode {
  id: string;
  name: string;
  coordinates: [number, number];
  status: 'active' | 'inactive';
  health: {
    battery: number;
    signalStrength: number;
    lastMaintenance: string;
  };
  measurements: {
    temperature: number;      // in Celsius
    humidity: number;         // in percentage
    pressure: number;         // in hPa
    windSpeed: number;        // in m/s
    windDirection: number;    // in degrees (0-360)
    rainfall: number;         // in mm
    airQuality: {
      pm25: number;          // in µg/m³
      pm10: number;          // in µg/m³
      ozone: number;         // in ppb
      no2: number;           // in ppb
    };
    uvIndex: number;         // 0-11+ scale
  };
  description: string;
  location: {
    city: string;
    state: string;
    elevation: number;       // in meters
  };
  loggerId: string;         // ID of the connected data logger
}