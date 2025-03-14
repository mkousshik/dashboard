import React, { useState, useMemo } from 'react';
import { X, Server, Cpu, MemoryStick as Memory, Package, Calendar, Activity, Power, ChevronRight, ThermometerSun, Droplets, Wind, CloudRain, BarChart } from 'lucide-react';
import { LoggerInfo } from '../../types/logger';
import { weatherNodes } from '../../data/nodes';
import { WeatherNode } from '../../types/node';
import DataAnalysisTab from './DataAnalysisTab';

interface LoggerModalProps {
  logger: LoggerInfo;
  onClose: () => void;
}

const LoggerModal: React.FC<LoggerModalProps> = ({ logger, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'nodes' | 'data'>('info');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get nodes connected to this logger and calculate counts
  const { connectedNodes, nodeCounts } = useMemo(() => {
    const nodes = weatherNodes.filter(node => node.loggerId === logger.id);
    const activeNodes = nodes.filter(node => node.status === 'active');
    return {
      connectedNodes: nodes,
      nodeCounts: {
        total: nodes.length,
        active: activeNodes.length,
        deactivated: nodes.length - activeNodes.length
      }
    };
  }, [logger.id]);

  const NodeCard: React.FC<{ node: WeatherNode }> = ({ node }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-800 dark:text-white">{node.name}</h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">#{node.id}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${node.status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
          {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
        </span>
      </div>

      {node.status === 'active' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThermometerSun size={14} className="text-orange-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {node.measurements.temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets size={14} className="text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {node.measurements.humidity.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wind size={14} className="text-cyan-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {node.measurements.windSpeed.toFixed(1)} m/s
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain size={14} className="text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {node.measurements.rainfall.toFixed(1)} mm
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Battery</span>
            <span className={`text-xs font-medium ${
              node.health.battery > 70 ? 'text-green-600 dark:text-green-400' :
              node.health.battery > 30 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {node.health.battery}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Signal</span>
            <span className={`text-xs font-medium ${
              node.health.signalStrength > 70 ? 'text-green-600 dark:text-green-400' :
              node.health.signalStrength > 30 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {node.health.signalStrength}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{logger.name}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">#{logger.id}</span>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 
              ${logger.status === 'online' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
              {logger.status.charAt(0).toUpperCase() + logger.status.slice(1)}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="border-b border-gray-100 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'info'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
            >
              Logger Information
              {activeTab === 'info' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('nodes')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'nodes'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
            >
              Connected Nodes ({connectedNodes.length})
              {activeTab === 'nodes' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-2 text-sm font-medium transition-colors relative
                ${activeTab === 'data'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
            >
              Data Analysis
              {activeTab === 'data' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'info' ? (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="text-blue-500" size={20} />
                    <h3 className="font-medium text-gray-800 dark:text-white">Connected Nodes</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {nodeCounts.total}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {nodeCounts.active}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {nodeCounts.deactivated}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Deactivated</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="text-purple-500" size={20} />
                    <h3 className="font-medium text-gray-800 dark:text-white">System Resources</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Cpu size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">CPU Usage</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {logger.system.cpu.usage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${logger.system.cpu.usage}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Memory size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">RAM Usage</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {logger.system.ram.used.toFixed(1)} / {logger.system.ram.total} GB
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${logger.system.ram.usage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="text-indigo-500" size={20} />
                    <h3 className="font-medium text-gray-800 dark:text-white">Hardware & Software Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Model</div>
                      <div className="text-gray-800 dark:text-gray-200">{logger.hardware.model}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Manufacturer</div>
                      <div className="text-gray-800 dark:text-gray-200">{logger.hardware.manufacturer}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Operating System</div>
                      <div className="text-gray-800 dark:text-gray-200">Ubuntu 22.04 LTS</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Last Software Update</div>
                      <div className="text-gray-800 dark:text-gray-200">
                        {formatDate(logger.system.software.lastUpdate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Installation Date</div>
                      <div className="text-gray-800 dark:text-gray-200">
                        {formatDate(logger.hardware.installationDate)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Power className="text-emerald-500" size={20} />
                    <h3 className="font-medium text-gray-800 dark:text-white">Specifications</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Storage</div>
                      <div className="text-gray-800 dark:text-gray-200">
                        {logger.hardware.specifications.storage}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Connectivity</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {logger.hardware.specifications.connectivity.map((conn, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
                          >
                            {conn}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Power Supply</div>
                      <div className="text-gray-800 dark:text-gray-200">
                        {logger.hardware.specifications.powerSupply}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Operating Temperature</div>
                      <div className="text-gray-800 dark:text-gray-200">
                        {logger.hardware.specifications.operatingTemp}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'nodes' ? (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectedNodes.map(node => (
                  <NodeCard key={node.id} node={node} />
                ))}
              </div>
            </div>
          ) : (
            <DataAnalysisTab logger={logger} connectedNodes={connectedNodes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;