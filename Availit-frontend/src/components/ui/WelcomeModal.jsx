import React from 'react';

const ambulanceUrl = 'https://raw.githubusercontent.com/undraw-io/undraw-illustrations/master/svg/undraw_ambulance_re_8jiu.svg';

export default function WelcomeModal({ open, onClose, onSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Banner with ambulance and creative slogan */}
      <div className="absolute top-0 left-0 w-full h-72 md:h-96 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400">
        <img
          src={ambulanceUrl}
          alt="Ambulance"
          className="w-40 md:w-56 h-auto drop-shadow-xl mb-2 animate-bounce"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.18))' }}
        />
        <div className="w-full flex flex-col items-center">
          <span
            className="text-white text-3xl md:text-5xl font-extrabold tracking-wide mb-1"
            style={{
              textShadow: '0 2px 16px #0e3a5e, 0 1px 0 #0e3a5e',
              letterSpacing: '0.08em',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Available
          </span>
          <span
            className="text-white text-xl md:text-3xl font-bold tracking-widest bg-white/20 px-4 py-1 rounded-full shadow-lg"
            style={{
              textShadow: '0 2px 8px #0e3a5e',
              marginTop: '-0.5rem',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            in Minutes
          </span>
        </div>
      </div>
      {/* Modal */}
      <div className="relative z-10 bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center mt-60">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="mb-4 flex flex-col items-center">
          <img src="/availit-logo.jpg" alt="AvailIt Logo" className="w-32 h-32 object-contain mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome to AvailIt Hospital Availability</h2>
          <p className="text-gray-600 mb-4">Real-time hospital bed tracking and management system</p>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <button
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            onClick={() => onSelect('admin')}
          >
            Admin
          </button>
          <button
            className="px-6 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
            onClick={() => onSelect('user')}
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
} 