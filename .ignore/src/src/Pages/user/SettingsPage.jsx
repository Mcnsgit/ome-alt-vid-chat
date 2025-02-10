import  { useState } from "react";
import { X } from "lucide-react";



export const SettingsPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("privacy");
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="border-b border-gray-700">
          <div className="flex">
            {["privacy", "video", "matching"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === tab ? "border-b-2 border-indigo-500 text-indigo-500" : "text-gray-400 hover:text-white"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          {activeTab === "privacy" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Blur Background</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Hide Location</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          )}
          {activeTab === "video" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Camera
                </label>
                <select className="w-full px-4 py-2 bg-gray-700 rounded-lg">
                  <option>Default Camera</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Microphone
                </label>
                <select className="w-full px-4 py-2 bg-gray-700 rounded-lg">
                  <option>Default Microphone</option>
                </select>
              </div>
            </div>
          )}
          {activeTab === "matching" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Age Range
                </label>
                <input type="range" className="w-full" min="18" max="50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Interest Priority
                </label>
                <div className="space-y-2">
                  {["Gaming", "Music", "Art"].map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center justify-between"
                    >
                      <span>{interest}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-4 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;