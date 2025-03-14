import { LoggerInfo } from '../types/logger';
import { loggerRegions } from './nodes';

const generateLoggerInfo = (prefix: string, name: string, coordinates: [number, number]): LoggerInfo => {
  const isOnline = Math.random() > 0.1;
  const totalNodes = Math.floor(Math.random() * 15) + 20;
  const activeNodes = isOnline ? Math.floor(totalNodes * (0.8 + Math.random() * 0.2)) : 0;

  return {
    id: `${prefix}-01`,
    name: `${name} Central Logger`,
    coordinates,
    status: isOnline ? 'online' : 'offline',
    connectedNodes: {
      total: totalNodes,
      active: activeNodes,
      deactivated: totalNodes - activeNodes
    },
    system: {
      cpu: {
        usage: isOnline ? Math.random() * 60 + 20 : 0,
        cores: 4,
        model: 'ARM Cortex-A72'
      },
      ram: {
        total: 8,
        used: isOnline ? Math.random() * 6 + 1 : 0,
        usage: isOnline ? Math.random() * 60 + 20 : 0
      },
      software: {
        version: '2.4.1',
        lastUpdate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    },
    hardware: {
      model: 'WeatherLogger Pro X1',
      manufacturer: 'TechWeather Solutions',
      serialNumber: `${prefix}${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      installationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      specifications: {
        storage: '256GB SSD',
        connectivity: ['4G LTE', 'WiFi 6', 'Ethernet', 'LoRaWAN'],
        powerSupply: 'Solar with Battery Backup',
        operatingTemp: '-40°C to 85°C'
      }
    }
  };
};

export const loggerInfos: LoggerInfo[] = loggerRegions.map(region => 
  generateLoggerInfo(region.prefix, region.name, region.coords)
);