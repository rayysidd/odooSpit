import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (action) => {
    setOpen(false);
    if (action === 'Profile') {
      navigate('/profile');
    } else if (action === 'Settings') {
      // Navigate or show settings page/modal
      alert('Settings clicked!');
    } else if (action === 'Logout') {
      // Perform logout logic
      alert('Logging out...');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="rounded-full w-8 h-8"
        />
        <span className="hidden sm:inline">User Name</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg py-2 text-white text-sm"
          role="menu"
          aria-label="Profile menu"
        >
          <li>
            <button
              onClick={() => handleMenuClick('Profile')}
              className="block w-full px-4 py-2 hover:bg-gray-700"
              role="menuitem"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick('Settings')}
              className="block w-full px-4 py-2 hover:bg-gray-700"
              role="menuitem"
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick('Logout')}
              className="block w-full px-4 py-2 hover:bg-gray-700"
              role="menuitem"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
