import React from 'react';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8 border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Weather IoT Node Management Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Introducing the Weather IoT Node Management Dashboard Our Weather IoT Node Management 
          Dashboard is a state-of-the-art solution designed to monitor and manage weather-related
          IoT nodes across India. This product offers a comprehensive suite of features to ensure 
          the optimal performance and reliability of your weather monitoring network.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Features:</h2>
          <ul className="list-disc list-inside text-blue-600 dark:text-blue-300 space-y-2">
            <li>Real-time Weather Data Collection</li>
            <li>Real-time node health monitoring</li>
            <li>Alerts for non-functional nodes</li>
            <li>Identification of nodes with incorrect outputs</li>
            <li>Maintenance scheduling and tracking</li>
          </ul>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 my-4">
          Our Weather IoT Node Management Dashboard is designed to provide a seamless and efficient 
          experience for administrators, ensuring that your weather monitoring network operates 
          smoothly and reliably. With its modern and clean interface, you can easily monitor 
          real-time weather data, view alerts, and manage maintenance schedules, all in one place.
        </p>
      </div>
    </div>
  );
};

export default HomePage;