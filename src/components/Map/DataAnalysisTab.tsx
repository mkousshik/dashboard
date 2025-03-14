import React, { useState, useMemo } from 'react';
import { ThermometerSun, Droplets, Wind, CloudRain, Gauge } from 'lucide-react';
import { LoggerInfo } from '../../types/logger';
import { WeatherNode } from '../../types/node';
import { timeRanges } from '../../data/timeRanges';
import { TimePeriod } from '../../types/nodeHistory';

interface DataAnalysisTabProps {
  logger: LoggerInfo;
  connectedNodes: WeatherNode[];
}

const DataAnalysisTab: React.FC<DataAnalysisTabProps> = ({ logger, connectedNodes }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('current');

  // Calculate current averages from active nodes
  const currentAverages = useMemo(() => {
    const activeNodes = connectedNodes.filter(node => node.status === 'active');
    if (activeNodes.length === 0) return null;

    return {
      temperature: activeNodes.reduce((sum, node) => sum + node.measurements.temperature, 0) / activeNodes.length,
      humidity: activeNodes.reduce((sum, node) => sum + node.measurements.humidity, 0) / activeNodes.length,
      pressure: activeNodes.reduce((sum, node) => sum + node.measurements.pressure, 0) / activeNodes.length,
      windSpeed: activeNodes.reduce((sum, node) => sum + node.measurements.windSpeed, 0) / activeNodes.length,
      rainfall: activeNodes.reduce((sum, node) => sum + node.measurements.rainfall, 0) / activeNodes.length,
      airQuality: {
        pm25: activeNodes.reduce((sum, node) => sum + node.measurements.airQuality.pm25, 0) / activeNodes.length,
        pm10: activeNodes.reduce((sum, node) => sum + node.measurements.airQuality.pm10, 0) / activeNodes.length,
        ozone: activeNodes.reduce((sum, node) => sum + node.measurements.airQuality.ozone, 0) / activeNodes.length,
        no2: activeNodes.reduce((sum, node) => sum + node.measurements.airQuality.no2, 0) / activeNodes.length,
      },
      uvIndex: activeNodes.reduce((sum, node) => sum + node.measurements.uvIndex, 0) / activeNodes.length,
    };
  }, [connectedNodes]);

  if (!currentAverages) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No active nodes to display data
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Time Period Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setSelectedPeriod(range.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedPeriod === range.value
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Data Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Card */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <ThermometerSun className="text-orange-500" size={20} />
            <h3 className="font-medium text-gray-800 dark:text-white">Temperature</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentAverages.temperature.toFixed(1)}°C
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average across {logger.connectedNodes.active} active nodes
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="text-blue-500" size={20} />
            <h3 className="font-medium text-gray-800 dark:text-white">Humidity</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentAverages.humidity.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average relative humidity
          </div>
        </div>

        {/* Pressure Card */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="text-purple-500" size={20} />
            <h3 className="font-medium text-gray-800 dark:text-white">Pressure</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentAverages.pressure.toFixed(1)} hPa
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Atmospheric pressure
          </div>
        </div>

        {/* Wind Speed Card */}
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wind className="text-cyan-500" size={20} />
            <h3 className="font-medium text-gray-800 dark:text-white">Wind Speed</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentAverages.windSpeed.toFixed(1)} m/s
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average wind speed
          </div>
        </div>

        {/* Rainfall Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CloudRain className="text-blue-500" size={20} />
            <h3 className="font-medium text-gray-800 dark:text-white">Rainfall</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentAverages.rainfall.toFixed(1)} mm
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total precipitation
          </div>
        </div>

        {/* Air Quality Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CloudRain className="text-emerald-500" size={20} />
            <h3 className="font-medium text-gray-800 dark:text-white">Air Quality</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">PM2.5</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {currentAverages.airQuality.pm25.toFixed(1)} µg/m³
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">PM10</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {currentAverages.airQuality.pm10.toFixed(1)} µg/m³
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisTab;