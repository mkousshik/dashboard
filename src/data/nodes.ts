import { WeatherNode } from '../types/node';

// Function to generate random values within ranges
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max));

// Function to generate a random date within the last 3 months
const randomDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - randomInt(0, 3));
  date.setDate(randomInt(1, 28));
  return date.toISOString().split('T')[0];
};

// Function to generate anomalous data
const generateAnomalousData = () => {
  // Generate extreme or invalid values
  return {
    temperature: random(-20, 60),      // Normal range: -10 to 50
    humidity: random(-10, 120),        // Normal range: 0 to 100
    pressure: random(800, 1200),       // Normal range: 870 to 1090
    windSpeed: random(0, 150),         // Normal range: 0 to 100
    windDirection: random(0, 360),
    rainfall: random(0, 800),          // Normal range: 0 to 500
    airQuality: {
      pm25: random(0, 800),           // Normal range: 0 to 500
      pm10: random(0, 1000),          // Normal range: 0 to 600
      ozone: random(0, 600),          // Normal range: 0 to 400
      no2: random(0, 300),            // Normal range: 0 to 200
    },
    uvIndex: random(0, 15)            // Normal range: 0 to 12
  };
};

// Function to generate normal data
const generateNormalData = () => {
  return {
    temperature: random(15, 40),
    humidity: random(30, 90),
    pressure: random(980, 1020),
    windSpeed: random(0, 20),
    windDirection: random(0, 360),
    rainfall: random(0, 50),
    airQuality: {
      pm25: random(0, 150),
      pm10: random(0, 200),
      ozone: random(0, 100),
      no2: random(0, 50)
    },
    uvIndex: randomInt(0, 12)
  };
};

// Define logger regions with their prefixes
export const loggerRegions = [
  { prefix: 'MUM', name: 'Mumbai', state: 'Maharashtra', coords: [72.8777, 19.0760] },
  { prefix: 'DEL', name: 'Delhi', state: 'Delhi', coords: [77.2090, 28.6139] },
  { prefix: 'BLR', name: 'Bangalore', state: 'Karnataka', coords: [77.5946, 12.9716] },
  { prefix: 'KOL', name: 'Kolkata', state: 'West Bengal', coords: [88.3639, 22.5726] },
  { prefix: 'CHN', name: 'Chennai', state: 'Tamil Nadu', coords: [80.2707, 13.0827] },
  { prefix: 'HYD', name: 'Hyderabad', state: 'Telangana', coords: [78.4867, 17.3850] },
  { prefix: 'AHM', name: 'Ahmedabad', state: 'Gujarat', coords: [72.5714, 23.0225] },
  { prefix: 'PUN', name: 'Pune', state: 'Maharashtra', coords: [73.8567, 18.5204] }
];

// Generate 200 weather nodes
export const weatherNodes: WeatherNode[] = Array.from({ length: 200 }, (_, i) => {
  // Select a logger region based on index to distribute nodes evenly
  const loggerRegion = loggerRegions[i % loggerRegions.length];
  
  // Generate coordinates within ~50km of the base city
  const lat = loggerRegion.coords[1] + random(-0.5, 0.5);
  const lon = loggerRegion.coords[0] + random(-0.5, 0.5);
  
  // Generate a status with 85% chance of being active
  const status = Math.random() > 0.15 ? 'active' : 'inactive';

  // Generate logger ID with region prefix and sequential number
  const loggerId = `${loggerRegion.prefix}-01`;
  
  // For active nodes, 20% chance of generating anomalous data
  const measurements = status === 'active' 
    ? (Math.random() < 0.2 ? generateAnomalousData() : generateNormalData())
    : {
        temperature: 0,
        humidity: 0,
        pressure: 0,
        windSpeed: 0,
        windDirection: 0,
        rainfall: 0,
        airQuality: {
          pm25: 0,
          pm10: 0,
          ozone: 0,
          no2: 0
        },
        uvIndex: 0
      };
  
  // Generate node data
  const node: WeatherNode = {
    id: `WN${(i + 1).toString().padStart(4, '0')}`,
    name: `${loggerRegion.name} Node ${i + 1}`,
    coordinates: [lon, lat],
    status,
    health: {
      battery: status === 'active' ? randomInt(60, 100) : randomInt(0, 30),
      signalStrength: status === 'active' ? randomInt(70, 100) : randomInt(0, 40),
      lastMaintenance: randomDate(),
    },
    measurements,
    description: `Weather monitoring station in ${loggerRegion.name} metropolitan area`,
    location: {
      city: loggerRegion.name,
      state: loggerRegion.state,
      elevation: randomInt(0, 1000)
    },
    loggerId
  };
  
  return node;
});