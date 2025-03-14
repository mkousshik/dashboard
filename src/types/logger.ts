export interface LoggerInfo {
  id: string;
  name: string;
  coordinates: [number, number];
  status: 'online' | 'offline';
  connectedNodes: {
    total: number;
    active: number;
    deactivated: number;
  };
  system: {
    cpu: {
      usage: number;
      cores: number;
      model: string;
    };
    ram: {
      total: number;      // in GB
      used: number;       // in GB
      usage: number;      // percentage
    };
    software: {
      version: string;
      lastUpdate: string;
    };
  };
  hardware: {
    model: string;
    manufacturer: string;
    serialNumber: string;
    installationDate: string;
    lastMaintenance: string;
    specifications: {
      storage: string;
      connectivity: string[];
      powerSupply: string;
      operatingTemp: string;
    };
  };
}