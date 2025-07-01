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
import Joyride, { STATUS } from 'react-joyride';

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
        className="mt-14 px-10 py-5 rounded-full bg-white text-blue-700 font-bold text-2xl shadow-xl hover:bg-blue-100 transition-all duration-200 border-4 border-blue-300 hover:scale-105"
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
          className="w-full sm:w-auto px-8 py-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition shadow-lg"
          onClick={() => handleSelect('user')}
        >
          Login as User
        </button>
        <button
          className="w-full sm:w-auto px-8 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition shadow-lg"
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
        className="flex items-center justify-center p-2 rounded-full bg-gradient-to-br from-blue-400 to-green-400 shadow border-2 border-white hover:scale-105 transition focus:outline-none"
        onClick={handleMenuToggle}
        aria-label="Open menu"
        style={{ boxShadow: '0 4px 16px rgba(56,189,248,0.12)' }}
      >
        <Menu className="h-8 w-8 text-white animate-bounce-short" />
        <style>{`@keyframes bounce-short {0%,100%{transform:scale(1);}50%{transform:scale(1.15);}}.animate-bounce-short{animation:bounce-short 1.2s infinite;}`}</style>
      </button>
      {/* Main nav actions (button bar) - hidden when menu is open */}
      {!menuOpen && (
        <div className="flex gap-3 md:gap-6 items-center flex-1 justify-center">
          <button className="min-w-[120px] px-4 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-full shadow flex items-center justify-center gap-2 transition text-base md:text-lg" onClick={onBack}>
            <ArrowBackIcon fontSize="small" /> Back
          </button>
          <button className="min-w-[120px] px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow flex items-center justify-center gap-2 transition text-base md:text-lg" onClick={onComplaint} disabled={loading}>
            <ReportIcon fontSize="small" /> File Complaint
          </button>
          {onHospitalComplaint && (
            <button className="min-w-[120px] px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow flex items-center justify-center gap-2 transition text-base md:text-lg" onClick={onHospitalComplaint}>
              <ReportProblemIcon fontSize="small" /> File Complaint Against Hospital
            </button>
          )}
          <button className="min-w-[120px] px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow flex items-center justify-center gap-2 transition text-base md:text-lg" onClick={onLogout} disabled={loading}>
            <LogoutIcon fontSize="small" /> Logout
          </button>
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
          className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-green-400 shadow-lg border-2 border-white hover:scale-105 transition p-2 ml-2"
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
  const [runTour, setRunTour] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const tourSteps = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <div className="text-lg font-bold text-blue-900">Welcome to AvailIt!<br/>Let us show you around.<br/><span className='text-base font-normal text-gray-700'>(You can skip anytime)</span></div>
      ),
      disableBeacon: true,
      spotlightClicks: true,
      styles: { tooltip: { maxWidth: 340 } },
    },
    {
      target: '.animate-slidein',
      content: 'This is the main slogan and entry point.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.bg-white/80',
      content: 'Here is the welcome message and app description.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.bg-purple-600',
      content: 'Click here to login as a User and continue the tour.',
      placement: 'top',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.bg-blue-600',
      content: 'Click here to login as an Admin and continue the tour.',
      placement: 'top',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.flex.items-center.justify-between.w-full.mb-4',
      content: 'This is the navigation bar. Use the hamburger menu and profile button for navigation and account actions.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 340 } },
    },
    {
      target: '.flex.items-center.justify-between.w-full.mb-4 button', // Hamburger menu button
      content: 'Click the hamburger menu to open navigation options.',
      placement: 'bottom',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.bg-gradient-to-br.from-blue-400.to-green-400',
      content: 'Click your profile button to view your info or logout.',
      placement: 'left',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.min-w-[120px].bg-blue-500',
      content: 'Use this button to go back to the previous page.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.min-w-[120px].bg-red-600',
      content: 'File a complaint if you face any issues.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.min-w-[120px].bg-yellow-500',
      content: 'File a complaint against a hospital (User only).',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.min-w-[120px].bg-indigo-600',
      content: 'Logout from your account.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.statistics-bar',
      content: 'This bar shows live statistics for hospitals and beds.',
      placement: 'bottom',
      styles: { tooltip: { maxWidth: 340 } },
    },
    {
      target: '.hospital-card',
      content: 'Each card shows a hospital. Click Show Map to view its location.',
      placement: 'top',
      styles: { tooltip: { maxWidth: 340 } },
    },
    {
      target: '.show-map-btn',
      content: 'Click here to view the hospital on a map.',
      placement: 'left',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.search-bar',
      content: 'Click here and start typing to search for hospitals.',
      placement: 'bottom',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: '.mt-14.px-10.py-5.rounded-full.bg-white.text-blue-700', // Get Started button
      content: 'Click here to get started! The tour will continue after you click.',
      placement: 'bottom',
      spotlightClicks: true,
      disableOverlayClose: true,
      styles: { tooltip: { maxWidth: 320 } },
    },
    {
      target: 'body',
      placement: 'center',
      content: (
        <div className="text-lg font-bold text-blue-900">That concludes the tour!<br/>You can revisit it anytime from the profile menu.<br/>Enjoy using AvailIt!</div>
      ),
      disableBeacon: true,
      spotlightClicks: true,
      styles: { tooltip: { maxWidth: 340 } },
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem('availit_tour_done')) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status, index, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      localStorage.setItem('availit_tour_done', '1');
    }
    setTourStepIndex(index);
  };

  return (
    <>
      <Joyride
        steps={tourSteps}
        run={runTour}
        stepIndex={tourStepIndex}
        continuous
        showSkipButton
        showProgress
        disableScrolling={false}
        styles={{
          options: {
            zIndex: 9999,
            primaryColor: '#2563eb',
            backgroundColor: '#fff',
            textColor: '#1e293b',
            arrowColor: '#fff',
            borderRadius: 32,
            boxShadow: '0 8px 32px 0 rgba(56,189,248,0.18)',
            padding: '1.5rem',
            width: 'auto',
            minWidth: 220,
            maxWidth: 360,
          },
          tooltip: {
            borderRadius: 32,
            boxShadow: '0 8px 32px 0 rgba(56,189,248,0.18)',
            border: '2px solid #bae6fd',
            background: 'linear-gradient(135deg, #fff 80%, #e0f2fe 100%)',
            padding: '1.5rem',
            minWidth: 220,
            maxWidth: 360,
          },
          arrow: {
            color: '#e0f2fe',
            border: '2px solid #bae6fd',
            filter: 'drop-shadow(0 2px 8px #38bdf855)',
          },
          buttonNext: {
            background: 'linear-gradient(90deg,#38bdf8,#6366f1)',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '9999px',
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            boxShadow: '0 2px 8px #38bdf855',
            transition: 'all 0.2s',
            animation: 'pulse 1s infinite',
          },
          buttonSkip: {
            background: 'linear-gradient(90deg,#f87171,#fbbf24)',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '9999px',
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            boxShadow: '0 2px 8px #f8717155',
            transition: 'all 0.2s',
            animation: 'pulse 1s infinite',
          },
        }}
        callback={handleJoyrideCallback}
        locale={{
          next: 'Next →',
          skip: 'Skip Tour',
          last: 'Finish',
        }}
        showArrow
        disableOverlayClose={false}
        spotlightClicks={true}
        tooltipComponent={undefined}
      />
      {/* Custom cloud style for Joyride tooltip */}
      <style>{`
        .react-joyride__tooltip {
          border-radius: 2rem !important;
          box-shadow: 0 8px 32px 0 rgba(56,189,248,0.18) !important;
          border: 2px solid #bae6fd !important;
          background: linear-gradient(135deg, #fff 80%, #e0f2fe 100%) !important;
          min-width: 220px !important;
          max-width: 360px !important;
          padding: 1.5rem !important;
        }
        .react-joyride__arrow {
          color: #e0f2fe !important;
          border: 2px solid #bae6fd !important;
          filter: drop-shadow(0 2px 8px #38bdf855) !important;
        }
      `}</style>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 flex flex-col">
        <Routes>
          <Route path="/" element={<EntryScreen />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/user/dashboard" element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
