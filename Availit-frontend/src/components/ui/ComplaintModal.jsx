import React, { useState } from 'react';

export default function ComplaintModal({ open, onClose, onSubmit }) {
  const [complaint, setComplaint] = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-md w-full text-center relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">File a Complaint</h2>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
          placeholder="Describe the issue you faced..."
          value={complaint}
          onChange={e => setComplaint(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 w-full">
          <button
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            onClick={() => { onSubmit(complaint); setComplaint(''); onClose(); }}
            disabled={!complaint.trim()}
          >
            Submit
          </button>
          <button
            className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 