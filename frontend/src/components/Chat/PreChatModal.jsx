import { useState } from "react";
import { X } from "lucide-react";

export const PreChatModal = ({ onClose }) => {

  const interests = [
    "Gaming",
    "Music",
    "Art",
    "Technology",
    "Sports",
    "Movies",
    "Books",
    "Travel",
  ];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Before You Chat</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Temporary Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white"
              placeholder="Enter a username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Gender Preference
            </label>
            <select className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white">
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Language
            </label>
            <select className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white">
              {languages.map((language) => (
                <option key={language} value={language.toLowerCase()}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
              onClick={onClose}
            >
              Start Matching
            </button>
            <button
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
              onClick={onClose}
            >
              Skip & Chat Anonymously
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
