import React, { useState, useMemo } from 'react';
import { Calendar, LineChart, BarChart3, Filter, Download, RefreshCcw, MapPin } from 'lucide-react';
import { weatherNodes } from '../data/nodes';
import { loggerInfos } from '../data/loggerInfo';
import { timeRanges } from '../data/timeRanges';
import { TimePeriod } from '../types/nodeHistory';
import { loggerRegions } from '../data/nodes';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

type ViewMode = 'all' | 'region' | 'logger';

const DataAnalysisPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7d');
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedLogger, setSelectedLogger] = useState<string>('');

  // Filter nodes based on selection
  const filteredNodes = useMemo(() => {
    let nodes = weatherNodes.filter(node => node.status === 'active');

    if (viewMode === 'region' && selectedRegion) {
      const region = loggerRegions.find(r => r.prefix === selectedRegion);
      if (region) {
        nodes = nodes.filter(node => node.location.city === region.name);
      }
    } else if (viewMode === 'logger' && selectedLogger) {
      nodes = nodes.filter(node => node.loggerId === selectedLogger);
    }

    return nodes;
  }, [viewMode, selectedRegion, selectedLogger]);

  // Calculate aggregated data
  const aggregatedData = useMemo(() => {
    const data = [];
    
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= dayDiff; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dailyData = {
        date: currentDate.toISOString().split('T')[0],
        temperature: 0,
        humidity: 0,
        pressure: 0,
        windSpeed: 0,
        rainfall: 0,
        pm25: 0,
        uvIndex: 0,
      };

      // Calculate averages for filtered nodes
      filteredNodes.forEach(node => {
        dailyData.temperature += node.measurements.temperature;
        dailyData.humidity += node.measurements.humidity;
        dailyData.pressure += node.measurements.pressure;
        dailyData.windSpeed += node.measurements.windSpeed;
        dailyData.rainfall += node.measurements.rainfall;
        dailyData.pm25 += node.measurements.airQuality.pm25;
        dailyData.uvIndex += node.measurements.uvIndex;
      });

      const nodeCount = filteredNodes.length;
      if (nodeCount > 0) {
        dailyData.temperature /= nodeCount;
        dailyData.humidity /= nodeCount;
        dailyData.pressure /= nodeCount;
        dailyData.windSpeed /= nodeCount;
        dailyData.rainfall /= nodeCount;
        dailyData.pm25 /= nodeCount;
        dailyData.uvIndex /= nodeCount;
      }

      data.push(dailyData);
    }

    return data;
  }, [dateRange, filteredNodes]);

  const metrics = [
    { id: 'temperature', label: 'Temperature (°C)', color: '#ef4444' },
    { id: 'humidity', label: 'Humidity (%)', color: '#3b82f6' },
    { id: 'pressure', label: 'Pressure (hPa)', color: '#8b5cf6' },
    { id: 'windSpeed', label: 'Wind Speed (m/s)', color: '#10b981' },
    { id: 'rainfall', label: 'Rainfall (mm)', color: '#6366f1' },
    { id: 'pm25', label: 'PM2.5 (µg/m³)', color: '#f59e0b' },
    { id: 'uvIndex', label: 'UV Index', color: '#ec4899' },
  ];

  const currentMetric = metrics.find(m => m.id === selectedMetric);

  const systemSummary = useMemo(() => {
    return {
      totalNodes: filteredNodes.length,
      activeNodes: filteredNodes.length,
      averageTemp: filteredNodes.reduce((sum, node) => sum + node.measurements.temperature, 0) / filteredNodes.length,
      averageHumidity: filteredNodes.reduce((sum, node) => sum + node.measurements.humidity, 0) / filteredNodes.length,
    };
  }, [filteredNodes]);

  const getViewModeLabel = () => {
    if (viewMode === 'region' && selectedRegion) {
      const region = loggerRegions.find(r => r.prefix === selectedRegion);
      return `${region?.name} Region`;
    } else if (viewMode === 'logger' && selectedLogger) {
      const logger = loggerInfos.find(l => l.id === selectedLogger);
      return logger?.name || 'Selected Logger';
    }
    return 'All Nodes';
  };

  return (
    <div className="max-w-[95%] mx-auto space-y-6">
      {/* View Mode Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">View Mode</label>
            <select
              value={viewMode}
              onChange={(e) => {
                setViewMode(e.target.value as ViewMode);
                setSelectedRegion('');
                setSelectedLogger('');
              }}
              className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Nodes</option>
              <option value="region">By Region</option>
              <option value="logger">By Logger</option>
            </select>
          </div>

          {viewMode === 'region' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="">Choose a region</option>
                {loggerRegions.map(region => (
                  <option key={region.prefix} value={region.prefix}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {viewMode === 'logger' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Logger</label>
              <select
                value={selectedLogger}
                onChange={(e) => setSelectedLogger(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="">Choose a logger</option>
                {loggerInfos.map(logger => (
                  <option key={logger.id} value={logger.id}>
                    {logger.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {getViewModeLabel()}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400">Active Nodes</h3>
            <span className="text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full text-sm">
              {viewMode === 'all' ? 'All Regions' : viewMode === 'region' ? 'Region' : 'Logger'}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {systemSummary.activeNodes}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400">Avg Temperature</h3>
            <ThermometerIcon className="text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {systemSummary.averageTemp.toFixed(1)}°C
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400">Avg Humidity</h3>
            <DropletIcon className="text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {systemSummary.averageHumidity.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        {/* Controls */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Metric</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
                >
                  {metrics.map(metric => (
                    <option key={metric.id} value={metric.id}>{metric.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <Download size={16} />
                Export Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                <RefreshCcw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={currentMetric?.color}
                  strokeWidth={2}
                  dot={false}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm text-left">
                  <thead className="sticky top-0 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/90 shadow-sm">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      {metrics.map(metric => (
                        <th key={metric.id} className="px-4 py-3 font-semibold">{metric.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {aggregatedData.map((data, index) => (
                      <tr 
                        key={index} 
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{data.date}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.temperature.toFixed(1)}°C</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.humidity.toFixed(1)}%</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.pressure.toFixed(1)} hPa</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.windSpeed.toFixed(1)} m/s</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.rainfall.toFixed(1)} mm</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.pm25.toFixed(1)} µg/m³</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{data.uvIndex.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThermometerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

const DropletIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

export default DataAnalysisPage;