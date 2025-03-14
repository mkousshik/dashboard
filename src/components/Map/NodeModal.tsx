import React from 'react';
import { X, Battery, Signal, ThermometerSun, Droplets, Calendar, MapPin, ArrowUp, Info, Clock, Wind, Gauge, CloudRain, Sun } from 'lucide-react';
import { WeatherNode } from '../../types/node';

interface NodeModalProps {
  node: WeatherNode;
  onClose: () => void;
}

const NodeModal: React.FC<NodeModalProps> = ({ node, onClose }) => {
  const getStatusColor = (status: string) => 
    status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-green-500 dark:text-green-400';
    if (level > 30) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getSignalColor = (level: number) => {
    if (level > 70) return 'text-green-500 dark:text-green-400';
    if (level > 30) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getAQIColor = (pm25: number) => {
    if (pm25 <= 12) return 'text-green-500';
    if (pm25 <= 35.4) return 'text-yellow-500';
    if (pm25 <= 55.4) return 'text-orange-500';
    return 'text-red-500';
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{node.name}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">#{node.id}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(node.status)}`}>
              {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">System Health</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className={getBatteryColor(node.health.battery)} size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Battery</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.health.battery)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Signal className={getSignalColor(node.health.signalStrength)} size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Signal</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.health.signalStrength)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Basic Measurements</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="text-orange-500" size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Temperature</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.measurements.temperature)}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="text-blue-500" size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Humidity</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.measurements.humidity)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gauge className="text-purple-500" size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Pressure</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.measurements.pressure)} hPa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Wind & Rain</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wind className="text-cyan-500" size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Wind Speed</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.measurements.windSpeed)} m/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowUp 
                        className="text-cyan-500" 
                        size={16} 
                        style={{ transform: `rotate(${node.measurements.windDirection}deg)` }}
                      />
                      <span className="text-gray-600 dark:text-gray-300">Wind Direction</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {getWindDirection(node.measurements.windDirection)} ({Math.round(node.measurements.windDirection)}°)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CloudRain className="text-blue-500" size={16} />
                      <span className="text-gray-600 dark:text-gray-300">Rainfall</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.measurements.rainfall)} mm</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Air Quality & UV</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">PM2.5</span>
                    <span className={`font-medium ${getAQIColor(node.measurements.airQuality.pm25)}`}>
                      {Math.round(node.measurements.airQuality.pm25)} µg/m³
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">PM10</span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {Math.round(node.measurements.airQuality.pm10)} µg/m³
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Ozone</span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {Math.round(node.measurements.airQuality.ozone)} ppb
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">NO₂</span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {Math.round(node.measurements.airQuality.no2)} ppb
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="text-yellow-500" size={16} />
                      <span className="text-gray-600 dark:text-gray-300">UV Index</span>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">{Math.round(node.measurements.uvIndex)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <MapPin size={16} />
              <span>{node.location.city}, {node.location.state}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <ArrowUp size={16} />
              <span>Elevation: {Math.round(node.location.elevation)}m</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Info size={16} />
              <span>Logger ID: {node.loggerId}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Calendar size={16} />
              <span>Last Maintenance: {new Date(node.health.lastMaintenance).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeModal;