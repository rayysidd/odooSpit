import { useEffect } from 'react';
import { useUser } from '../features/user/UserProvider';
import Loader from '../components/common/Loader';

export default function Profile() {
  const { profile, fetchUserProfile, loading, error } = useUser();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="p-6 max-w-md mx-auto text-white space-y-6">
      <h2 className="text-2xl font-semibold">User Profile</h2>
      {error && <p className="text-red-400">{error}</p>}
      
      {profile && (
        <div className="bg-gray-800 p-6 rounded shadow space-y-4">
          <div>
            <label className="block text-gray-400 text-sm">Name</label>
            <p className="text-lg font-medium">{profile.name}</p>
          </div>
          <div>
            <label className="block text-gray-400 text-sm">Email</label>
            <p className="text-lg font-medium">{profile.email}</p>
          </div>
          <div>
            <label className="block text-gray-400 text-sm">Role</label>
            <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs uppercase tracking-wide">
              {profile.role}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}