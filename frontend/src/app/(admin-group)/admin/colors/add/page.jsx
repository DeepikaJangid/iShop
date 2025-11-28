import React from "react";
import { FiPlus, FiCopy } from "react-icons/fi";

export function AddColorForm() {
  return (
    <form className="max-w-2xl w-full bg-white border border-gray-100 shadow-lg rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Add New Color</h3>
          <p className="mt-1 text-sm text-gray-500">Fill in the details to create a new color.</p>
        </div>

        <div className="flex gap-3">
          <button type="button" className="px-3 py-1.5 border rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            Reset
          </button>

          <button type="button" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg shadow">
            <FiPlus /> Save
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Name */}
        <label className="col-span-2 flex flex-col">
          <span className="text-sm text-gray-600 font-medium">Color Name</span>
          <input
            placeholder="e.g. Sky Blue"
            className="mt-2 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200"
          />
          <span className="text-xs text-gray-400 mt-1">Max 15 characters</span>
        </label>

        {/* Status */}
        <label className="flex flex-col">
          <span className="text-sm text-gray-600 font-medium">Status</span>

          <div className="mt-2 inline-flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-green-100 border border-green-200 text-green-700 font-medium">
              Active
            </div>
            <div className="px-3 py-1 rounded-lg bg-gray-100 border text-gray-600 font-medium">
              Inactive
            </div>
          </div>
        </label>

        {/* Color Code */}
        <label className="col-span-3 flex flex-col">
          <span className="text-sm text-gray-600 font-medium">Color Code (HEX)</span>

          <div className="mt-2 flex gap-3 items-center">
            <input
              placeholder="#AABBCC"
              className="flex-1 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"
            >
              <FiCopy /> Copy
            </button>

            <div className="w-12 h-12 border rounded-lg bg-gradient-to-br from-gray-100 to-gray-200" />
          </div>
        </label>
      </div>

      {/* Suggestions */}
      <div className="mt-4">
        <span className="text-sm text-gray-600 font-medium">Quick Suggestions</span>

        <div className="mt-2 flex gap-3 flex-wrap">

          <div className="flex items-center gap-3 px-3 py-2 border rounded-lg hover:shadow">
            <div className="w-5 h-5 rounded bg-[#003366]" />
            <span className="text-sm text-gray-700">Midnight Blue</span>
            <span className="text-xs text-gray-400">#003366</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 border rounded-lg hover:shadow">
            <div className="w-5 h-5 rounded bg-[#DC143C]" />
            <span className="text-sm text-gray-700">Crimson</span>
            <span className="text-xs text-gray-400">#DC143C</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 border rounded-lg hover:shadow">
            <div className="w-5 h-5 rounded bg-[#50C878]" />
            <span className="text-sm text-gray-700">Emerald</span>
            <span className="text-xs text-gray-400">#50C878</span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 border rounded-lg hover:shadow">
            <div className="w-5 h-5 rounded bg-[#FF5E3A]" />
            <span className="text-sm text-gray-700">Sunset Orange</span>
            <span className="text-xs text-gray-400">#FF5E3A</span>
          </div>

        </div>
      </div>
    </form>
  );
}
