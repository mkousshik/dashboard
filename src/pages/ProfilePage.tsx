import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">John Doe</h1>
            <p className="text-gray-600 dark:text-gray-400">Software Developer</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Mail size={20} />
            <span>john.doe@example.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Phone size={20} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <MapPin size={20} />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;