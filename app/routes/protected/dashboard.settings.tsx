import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function SystemSettings() {
  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="space-y-6">
        <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
          <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
          <span className="text-[#000640] font-semibold text-sm">
            &nbsp;settings
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold ">System Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">General Settings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    System Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue="IEEE BNS Management System"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Theme
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Security Settings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium ">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-500">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium ">
                      Auto-Lock Inactive Accounts
                    </h3>
                    <p className="text-sm text-gray-500">
                      Lock accounts after 90 days of inactivity
                    </p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
