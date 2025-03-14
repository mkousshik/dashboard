import React from 'react';
import { Settings, Bell, Shield, Moon } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="text-blue-600 dark:text-blue-400" size={28} />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your notification preferences</p>
              </div>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Configure</button>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Privacy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Control your privacy settings</p>
              </div>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Manage</button>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">Appearance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Customize the interface</p>
              </div>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Customize</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;