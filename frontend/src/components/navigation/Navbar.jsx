import ProfileMenu from './ProfileMenu';

export default function Navbar({ title }) {
  return (
    <header className="bg-gray-900 text-white flex items-center justify-between px-6 py-3 shadow">
      <h1 className="text-xl font-bold">{title}</h1>
      <ProfileMenu />
    </header>
  );
}
