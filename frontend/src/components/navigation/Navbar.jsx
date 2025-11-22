import ProfileMenu from './ProfileMenu';

/**
 * Navbar component with a title and user profile menu.
 *
 * Props:
 * - title (string): The main title or brand name shown on the navbar.
 *
 * This navbar uses a dark background with white text, flexbox for horizontal layout,
 * and a max width container to restrict the layout on wider screens.
 */
export default function Navbar({ title }) {
  return (
    <header className="bg-gray-900 text-white shadow">
      {/* Center content horizontally with max width and padding */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Site or app title, clickable if needed (e.g., to home) */}
        <h1 className="text-xl font-bold">
          {/* You can wrap this in a Link if using a router */}
          {title}
        </h1>

        {/* ProfileMenu component - displays user avatar and dropdown menu */}
        <nav aria-label="User Profile Menu">
          <ProfileMenu />
        </nav>
      </div>
    </header>
  );
}
