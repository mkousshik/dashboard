import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Style } from 'ol/style';
import { weatherNodes } from '../../data/nodes';
import { loggerInfos } from '../../data/loggerInfo';
import { WeatherNode } from '../../types/node';
import { LoggerInfo } from '../../types/logger';
import NodeModal from './NodeModal';
import LoggerModal from './LoggerModal';
import { Layers } from 'lucide-react';

type ViewMode = 'nodes' | 'loggers';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [selectedNode, setSelectedNode] = useState<WeatherNode | null>(null);
  const [selectedLogger, setSelectedLogger] = useState<LoggerInfo | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('nodes');
  const nodesLayerRef = useRef<VectorLayer<VectorSource>>();
  const loggersLayerRef = useRef<VectorLayer<VectorSource>>();

  useEffect(() => {
    if (!mapRef.current) return;

    // Create vector source and features for nodes
    const nodesSource = new VectorSource();
    weatherNodes.forEach(node => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(node.coordinates)),
        node: node,
        type: 'node'
      });

      feature.setStyle(new Style({
        image: new CircleStyle({
          radius: 4,
          fill: new Fill({ 
            color: node.status === 'active' ? '#22c55e' : '#ef4444'
          })
        })
      }));

      nodesSource.addFeature(feature);
    });

    // Create vector source and features for loggers
    const loggersSource = new VectorSource();
    loggerInfos.forEach(logger => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(logger.coordinates)),
        logger: logger,
        type: 'logger'
      });

      feature.setStyle(new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ 
            color: logger.status === 'online' ? '#3b82f6' : '#dc2626'
          })
        })
      }));

      loggersSource.addFeature(feature);
    });

    // Create vector layers
    const nodesLayer = new VectorLayer({
      source: nodesSource,
      visible: viewMode === 'nodes'
    });
    nodesLayerRef.current = nodesLayer;

    const loggersLayer = new VectorLayer({
      source: loggersSource,
      visible: viewMode === 'loggers'
    });
    loggersLayerRef.current = loggersLayer;

    // Create the map instance
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=C5USvEsaqGlsB31oeWgy',
            tilePixelRatio: 2,
            maxZoom: 19,
            attributions: '© <a href="https://www.maptiler.com">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        }),
        nodesLayer,
        loggersLayer
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), // Center of India
        zoom: 5,
      }),
    });

    // Add click handler
    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, feature => feature);
      if (feature) {
        const type = feature.get('type');
        if (type === 'node') {
          const nodeData = feature.get('node') as WeatherNode;
          setSelectedNode(nodeData);
          setSelectedLogger(null);
        } else if (type === 'logger') {
          const loggerData = feature.get('logger') as LoggerInfo;
          setSelectedLogger(loggerData);
          setSelectedNode(null);
        }
      }
    });

    // Add pointer cursor on hover
    map.on('pointermove', (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTarget().style.cursor = hit ? 'pointer' : '';
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update layer visibility when view mode changes
  useEffect(() => {
    if (nodesLayerRef.current && loggersLayerRef.current) {
      nodesLayerRef.current.setVisible(viewMode === 'nodes');
      loggersLayerRef.current.setVisible(viewMode === 'loggers');
    }
  }, [viewMode]);

  return (
    <div className="relative w-full h-[calc(100%-5rem)]">
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <button
            onClick={() => setViewMode(viewMode === 'nodes' ? 'loggers' : 'nodes')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Layers size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{viewMode === 'nodes' ? 'Show Loggers' : 'Show Nodes'}</span>
          </button>
        </div>
        <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {viewMode === 'nodes' ? 'Active Node' : 'Online Logger'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {viewMode === 'nodes' ? 'Inactive Node' : 'Offline Logger'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-full"
      />
      {selectedNode && (
        <NodeModal 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
        />
      )}
      {selectedLogger && (
        <LoggerModal 
          logger={selectedLogger} 
          onClose={() => setSelectedLogger(null)} 
        />
      )}
    </div>
  );
};

export default MapView;