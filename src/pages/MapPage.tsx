import React, { useEffect } from 'react';
import MapView from '../components/Map/MapView';

const MapPage = () => {
  return (
    <div className="max-w-[95%] mx-auto h-[calc(100vh-2rem)]">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-full w-full border border-gray-100 dark:border-gray-700 p-4 flex items-center justify-center">
        <MapView />
      </div>
    </div>
  );
};

export default MapPage;

