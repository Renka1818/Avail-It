import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import HospitalList from './components/HospitalList';
import HospitalForm from './components/HospitalForm';
import UserHospitalSearch from './components/UserHospitalSearch';
import ComplaintModal from './components/ui/ComplaintModal';
import LoginModal from './components/ui/LoginModal';
import ProtectedRoute from './components/ui/ProtectedRoute';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LogoutIcon from '@mui/icons-material/Logout';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Tooltip from '@mui/material/Tooltip';
import ConfirmationDialog from './components/ui/ConfirmationDialog';
import { Menu, User as UserIcon } from 'lucide-react';

function EntryScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">
      <img src="/availit-logo.jpg" alt="AvailIt Logo" className="w-72 h-72 object-contain mb-10 mt-8 drop-shadow-2xl" />
      <h1
        className="text-5xl md:text-7xl font-extrabold text-white mb-2 tracking-wide text-center drop-shadow-2xl animate-slidein"
        style={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          textShadow: '0 4px 24px #1e3a8a, 0 2px 0 #1e3a8a',
          letterSpacing: '0.08em',
          maxWidth: '90vw',
        }}
      >
        Available in Minutes
      </h1>
      <button
        className="joyride-get-started mt-14 px-10 py-5 rounded-full bg-white text-blue-700 font-bold text-2xl shadow-xl hover:bg-blue-100 transition-all duration-200 border-4 border-blue-300 hover:scale-105"
        onClick={() => navigate('/role')}
      >
        Get Started
      </button>
      {/* Animation keyframes for slogan */}
      <style>{`
        @keyframes slidein {
          0% { opacity: 0; transform: translateX(-100vw); }
          60% { opacity: 1; transform: translateX(30px); }
          80% { transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slidein {
          animation: slidein 1.2s cubic-bezier(0.77,0,0.175,1) 0.2s both;
        }
      `}</style>
    </div>
  );
}

function RoleSelectPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('USER');

  const handleSelect = (role) => {
    setSelectedRole(role === 'admin' ? 'ADMIN' : 'USER');
    setModalOpen(true);
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-white">
      {/* Large animated pulse line behind logo */}
      <div className="relative flex flex-col items-center w-full max-w-2xl mb-8" style={{height: '140px'}}>
        <svg
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0 animate-pulse-line"
          width="100%"
          height="80"
          viewBox="0 0 700 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ minWidth: 300, maxWidth: 700 }}
        >
          <polyline
            points="0,40 100,40 130,10 170,70 210,40 300,40 340,10 380,70 420,40 700,40"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <img
          src="/availit-logo.jpg"
          alt="AvailIt Logo"
          className="relative z-10 w-44 h-44 object-contain mx-auto bg-white rounded-xl shadow-xl border-4 border-blue-200"
          style={{ marginTop: '-30px' }}
        />
        <style>{`
          @keyframes pulse-line {
            0% { stroke-dasharray: 0, 1000; }
            20% { stroke-dasharray: 120, 1000; }
            40% { stroke-dasharray: 240, 1000; }
            60% { stroke-dasharray: 360, 1000; }
            80% { stroke-dasharray: 480, 1000; }
            100% { stroke-dasharray: 700, 0; }
          }
          .animate-pulse-line polyline {
            stroke-dasharray: 700, 0;
            stroke-dashoffset: 0;
            animation: pulse-line 1.5s cubic-bezier(0.77,0,0.175,1) infinite alternate;
          }
        `}</style>
      </div>
      {/* Animated Welcome Message */}
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-xl mx-auto bg-white/80 rounded-2xl shadow-xl px-4 py-6 mt-2 mb-6 animate-slidein-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-center text-gray-900 tracking-tight wave-text" style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '0.04em' }}>
            Welcome to <span className="inline-block">AvailIt Hospital Availability</span>
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-center text-blue-900/90" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
            Real-time hospital bed tracking and management system
          </p>
          <style>{`
            @keyframes wave {
              0%, 100% { transform: rotate(-2deg) scale(1.03); }
              10% { transform: rotate(2deg) scale(1.04); }
              20% { transform: rotate(-2deg) scale(1.03); }
              30% { transform: rotate(2deg) scale(1.04); }
              40% { transform: rotate(-2deg) scale(1.03); }
              50% { transform: rotate(0deg) scale(1.05); }
              60% { transform: rotate(2deg) scale(1.04); }
              70% { transform: rotate(-2deg) scale(1.03); }
              80% { transform: rotate(2deg) scale(1.04); }
              90% { transform: rotate(-2deg) scale(1.03); }
            }
            .wave-text { animation: wave 2.5s infinite; }
            @keyframes slidein-left {
              0% { opacity: 0; transform: translateX(-100vw); }
              80% { opacity: 1; transform: translateX(20px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            .animate-slidein-left { animation: slidein-left 1.2s cubic-bezier(0.77,0,0.175,1) 0.2s both; }
          `}</style>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-6 w-full max-w-xs sm:max-w-none mx-auto">
        <button
          className="joyride-login-user w-full sm:w-auto px-8 py-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition shadow-lg"
          onClick={() => handleSelect('user')}
        >
          Login as User
        </button>
        <button
          className="joyride-login-admin w-full sm:w-auto px-8 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition shadow-lg"
          onClick={() => handleSelect('admin')}
        >
          Login as Admin
        </button>
      </div>
      <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} role={selectedRole} />
    </div>
  );
}

function DashboardNav({ user, onBack, onLogout, onComplaint, onHospitalComplaint, loading, role }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navRef = useRef();
  // Get user info from local/session storage
  const username = localStorage.getItem('username') || sessionStorage.getItem('username');
  const city = localStorage.getItem('city') || sessionStorage.getItem('city');
  const userRole = localStorage.getItem('role') || sessionStorage.getItem('role') || role;

  // Close menus on outside click/touch
  useEffect(() => {
    function handleClick(e) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, []);

  // Only one menu open at a time
  const handleMenuToggle = () => {
    setMenuOpen(o => {
      if (!o) setProfileOpen(false);
      return !o;
    });
  };
  const handleProfileToggle = () => {
    setProfileOpen(o => {
      if (!o) setMenuOpen(false);
      return !o;
    });
  };

  return (
    <div ref={navRef} className="flex items-center justify-between w-full mb-4 md:mb-8 mt-4 md:mt-6 px-2 relative z-30">
      {/* Hamburger menu - always visible */}
      <button
        className="joyride-hamburger flex items-center justify-center p-2 rounded-full bg-gradient-to-br from-blue-400 to-green-400 shadow border-2 border-white hover:scale-105 transition focus:outline-none"
        onClick={handleMenuToggle}
        aria-label="Open menu"
        style={{ boxShadow: '0 4px 16px rgba(56,189,248,0.12)' }}
      >
        <Menu className="h-8 w-8 text-white animate-bounce-short" />
        <style>{`@keyframes bounce-short {0%,100%{transform:scale(1);}50%{transform:scale(1.15);}}.animate-bounce-short{animation:bounce-short 1.2s infinite;}`}</style>
      </button>
      {/* Centered Logo + App Name */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/availit-logo.jpg" alt="AvailIt Logo" className="h-8 w-8 md:h-10 md:w-10 rounded-lg shadow bg-white/80 border border-blue-200" />
          <span className="font-extrabold text-xl md:text-3xl text-white tracking-wide drop-shadow-lg" style={{fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '0.04em'}}>AvailIt</span>
        </div>
        <span className="text-xs md:text-base font-semibold text-white/90 mt-1 tracking-wide" style={{fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '0.02em'}}>AvailIt - Available in Minutes</span>
      </div>
      {/* Main nav actions (button bar) - hidden when menu is open */}
      {!menuOpen && (
        <div className="flex gap-3 md:gap-6 items-center flex-1 justify-center">
          {/* All buttons removed from main nav bar; only hamburger and profile remain */}
        </div>
      )}
      {/* Hamburger dropdown (all screens) */}
      {menuOpen && (
        <div className="absolute left-2 top-14 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col gap-2 p-4 w-56 animate-fade-in z-50">
          <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition text-base" onClick={() => { setMenuOpen(false); onBack(); }}>
            <ArrowBackIcon fontSize="small" /> Back
          </button>
          <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition text-base" onClick={() => { setMenuOpen(false); onComplaint(); }} disabled={loading}>
            <ReportIcon fontSize="small" /> File Complaint
          </button>
          {onHospitalComplaint && (
            <button className="w-full px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow flex items-center gap-2 transition text-base" onClick={() => { setMenuOpen(false); onHospitalComplaint(); }}>
              <ReportProblemIcon fontSize="small" /> File Complaint Against Hospital
            </button>
          )}
          <button className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition text-base" onClick={() => { setMenuOpen(false); onLogout(); }} disabled={loading}>
            <LogoutIcon fontSize="small" /> Logout
          </button>
        </div>
      )}
      {/* Profile button (right) - more visible */}
      <div className="relative flex items-center">
        <button
          className="joyride-profile flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-green-400 shadow-lg border-2 border-white hover:scale-105 transition p-2 ml-2"
          onClick={handleProfileToggle}
          aria-label="Profile"
          style={{ boxShadow: '0 4px 16px rgba(56,189,248,0.18)' }}
        >
          <UserIcon className="h-9 w-9 text-white" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col gap-2 p-4 min-w-[220px] animate-fade-in z-50">
            <div className="flex items-center gap-3 mb-2">
              <UserIcon className="h-10 w-10 text-blue-500" />
              <div>
                <div className="font-bold text-lg text-blue-900">{username || 'User'}</div>
                <div className="text-xs text-gray-500">{userRole}</div>
              </div>
            </div>
            {city && <div className="text-sm text-gray-700">City: <span className="font-semibold">{city}</span></div>}
            <div className="text-xs text-gray-400 mt-2">Logged in as {userRole}</div>
            <button className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow" onClick={() => { setProfileOpen(false); onLogout(); }}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [showComplaint, setShowComplaint] = useState(false);
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [complaintLoading, setComplaintLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });

  const doLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setLogoutLoading(false);
      navigate('/role');
    }, 2000);
  };
  const handleLogout = () => setConfirmDialog({ open: true, action: 'logout' });
  const handleBack = () => setConfirmDialog({ open: true, action: 'back' });
  const handleConfirm = () => {
    if (confirmDialog.action === 'logout') doLogout();
    if (confirmDialog.action === 'back') navigate('/');
    setConfirmDialog({ open: false, action: null });
  };
  const handleCancel = () => setConfirmDialog({ open: false, action: null });
  const handleComplaint = (complaint) => {
    setComplaintLoading(true);
    setTimeout(() => {
      setComplaintLoading(false);
      setShowComplaint(false);
      // You can add toast or API call here
      console.log('Admin complaint:', complaint);
    }, 2000);
  };
  return (
    <>
      <DashboardNav
        onBack={handleBack}
        onLogout={handleLogout}
        onComplaint={() => setShowComplaint(true)}
        loading={logoutLoading || complaintLoading}
        role="ADMIN"
      />
      <ConfirmationDialog
        open={confirmDialog.open}
        title={confirmDialog.action === 'logout' ? 'Confirm Logout' : 'Confirm Navigation'}
        description={confirmDialog.action === 'logout' ? 'Are you sure you want to logout?' : 'Are you sure you want to go back? Unsaved changes may be lost.'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Yes"
        cancelText="No"
      />
      <ComplaintModal open={showComplaint} onClose={() => setShowComplaint(false)} onSubmit={handleComplaint} />
      <HospitalForm
        editing={editing}
        onSuccess={() => { setEditing(null); setRefresh(r => !r); }}
        onCancel={() => setEditing(null)}
      />
      <HospitalList
        onEdit={setEditing}
        refresh={refresh}
      />
    </>
  );
}

function UserDashboard() {
  const navigate = useNavigate();
  const [showComplaint, setShowComplaint] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [complaintLoading, setComplaintLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null });
  const [showLiveDataToast, setShowLiveDataToast] = useState(true);

  useEffect(() => {
    if (showLiveDataToast) {
      const timer = setTimeout(() => setShowLiveDataToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showLiveDataToast]);

  const doLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setLogoutLoading(false);
      navigate('/role');
    }, 2000);
  };
  const handleLogout = () => setConfirmDialog({ open: true, action: 'logout' });
  const handleBack = () => setConfirmDialog({ open: true, action: 'back' });
  const handleConfirm = () => {
    if (confirmDialog.action === 'logout') doLogout();
    if (confirmDialog.action === 'back') navigate('/');
    setConfirmDialog({ open: false, action: null });
  };
  const handleCancel = () => setConfirmDialog({ open: false, action: null });
  const handleComplaint = (complaint) => {
    setComplaintLoading(true);
    setTimeout(() => {
      setComplaintLoading(false);
      setShowComplaint(false);
      // You can add toast or API call here
      console.log('User complaint:', complaint);
    }, 2000);
  };
  return (
    <>
      <DashboardNav
        onBack={handleBack}
        onLogout={handleLogout}
        onComplaint={() => setShowComplaint(true)}
        onHospitalComplaint={() => window.open('https://www.nmc.org.in/complaints/', '_blank')}
        loading={logoutLoading || complaintLoading}
        role="USER"
      />
      <ConfirmationDialog
        open={confirmDialog.open}
        title={confirmDialog.action === 'logout' ? 'Confirm Logout' : 'Confirm Navigation'}
        description={confirmDialog.action === 'logout' ? 'Are you sure you want to logout?' : 'Are you sure you want to go back? Unsaved changes may be lost.'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Yes"
        cancelText="No"
      />
      <ComplaintModal open={showComplaint} onClose={() => setShowComplaint(false)} onSubmit={handleComplaint} />
      <UserHospitalSearch showLiveDataToast={showLiveDataToast} />
    </>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 flex flex-col">
      <Routes>
        <Route path="/" element={<EntryScreen />} />
        <Route path="/role" element={<RoleSelectPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/user/dashboard" element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
