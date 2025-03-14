import React from 'react';
import { Menu, X, Home, Map, Database } from 'lucide-react';
import NavItem from './NavItem';
import ThemeToggle from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  const navItems = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: Map, label: 'View Map', to: '/map' },
    { icon: Database, label: 'Data Analysis', to: '/analysis' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 ease-in-out z-10`}
      style={{ width: isOpen ? '240px' : '64px' }}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-6 left-0 w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex justify-center items-center group"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X size={22} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600" />
        ) : (
          <Menu size={22} className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600" />
        )}
      </button>

      <nav className="pt-20">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isOpen={isOpen}
            />
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-0 w-full px-4 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;