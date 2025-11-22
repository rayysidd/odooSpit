import { useState } from 'react';

export default function Profile() {
  // Simulated user data state
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
  });

  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formValues);
    setEditing(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-12">
      <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-8 text-gray-200 text-center">User Profile</h1>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2 text-gray-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-semibold mb-2 text-gray-300">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-6">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-3 bg-gray-600 rounded hover:bg-gray-500 text-gray-300 font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700 text-white font-semibold transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8 text-gray-200 text-lg">
            <div>
              <p className="font-semibold">Name:</p>
              <p className="mt-1">{user.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p className="mt-1">{user.phone || '-'}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setEditing(true)}
                className="px-8 py-3 bg-indigo-600 rounded hover:bg-indigo-700 text-white font-semibold transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
