import React from 'react';
import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isOpen: boolean;
}

const NavItem = ({ icon: Icon, label, to, isOpen }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          flex items-center px-3 py-3 transition-colors rounded-lg group
          ${isActive 
            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'}
        `}
      >
        <Icon size={20} className={`${isOpen ? 'mr-3' : 'mx-auto'} transition-all`} />
        <span className={`${isOpen ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300`}>
          {label}
        </span>
      </NavLink>
    </li>
  );
};

export default NavItem;