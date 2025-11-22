import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Dashboard', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Receipts', to: '/receipts' },
  { name: 'Deliveries', to: '/deliveries' },
  { name: 'Transfers', to: '/transfers' },
  { name: 'Adjustments', to: '/adjustments' },
  { name: 'Profile', to: '/profile' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-900 text-white h-screen p-5 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-56'
      } transition-width duration-300`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!isCollapsed}
        className="mb-8 self-end px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isCollapsed ? '▶' : '◀'}
      </button>

      <nav className="flex flex-col space-y-4" aria-label="Primary navigation">
        {links.map(({ name, to }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive ? 'bg-blue-700 font-semibold' : ''
              }`
            }
            title={isCollapsed ? name : undefined}
            tabIndex={0}
          >
            {!isCollapsed ? name : name.charAt(0)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
