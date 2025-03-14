import React from 'react';
import { X } from 'lucide-react';
import { Location } from '../../types/location';

interface CityModalProps {
  city: Location;
  onClose: () => void;
}

const CityModal: React.FC<CityModalProps> = ({ city, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-xl">
        <div className="relative">
          <img 
            src={city.image} 
            alt={city.name} 
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{city.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{city.description}</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Population</h3>
              <p className="text-gray-800 dark:text-gray-200">{city.population}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Famous For</h3>
              <ul className="mt-1 grid grid-cols-2 gap-2">
                {city.famousFor.map((item, index) => (
                  <li 
                    key={index}
                    className="text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityModal;