export default function Settings() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-12">
      <section className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-10 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">User Settings</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-semibold mb-2">
              Change Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="notifications" className="block text-lg font-semibold mb-2">
              Email Notifications
            </label>
            <select
              id="notifications"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-indigo-600 rounded hover:bg-indigo-700 font-semibold"
            >
              Save Settings
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
