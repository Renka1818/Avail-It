import React, { useState } from 'react';
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

function EntryScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">
      <img src="/availit-logo2.jpg" alt="AvailIt Logo" className="w-72 h-72 object-contain mb-10 mt-8 drop-shadow-2xl" />
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
          src="/availit-logo2.jpg"
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
      <h2 className="text-2xl font-bold mb-2 text-blue-800 drop-shadow-lg">Welcome to AvailIt Hospital Availability</h2>
      <p className="text-blue-700 mb-6 text-lg drop-shadow">Real-time hospital bed tracking and management system</p>
      <div className="flex justify-center gap-6 mt-6">
        <button
          className="px-8 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition shadow-lg"
          onClick={() => handleSelect('admin')}
        >
          Login as Admin
        </button>
        <button
          className="px-8 py-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg transition shadow-lg"
          onClick={() => handleSelect('user')}
        >
          Login as User
        </button>
      </div>
      <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} role={selectedRole} />
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
      <div className="flex gap-4 mb-8 mt-6 items-center">
        <Tooltip title="Go back to home page" arrow>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={handleBack}
          >
            <ArrowBackIcon fontSize="small" />
            Back
          </button>
        </Tooltip>
        <Tooltip title="File a complaint about the system" arrow>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={() => setShowComplaint(true)}
            disabled={complaintLoading}
          >
            <ReportIcon fontSize="small" />
            File Complaint
          </button>
        </Tooltip>
        <Tooltip title="Logout from your account" arrow>
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            <LogoutIcon fontSize="small" />
            Logout
          </button>
        </Tooltip>
      </div>
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
      <div className="flex gap-4 mb-8 mt-6 items-center">
        <Tooltip title="Go back to home page" arrow>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={handleBack}
          >
            <ArrowBackIcon fontSize="small" />
            Back
          </button>
        </Tooltip>
        <Tooltip title="File a complaint about the system" arrow>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={() => setShowComplaint(true)}
            disabled={complaintLoading}
          >
            <ReportIcon fontSize="small" />
            File Complaint
          </button>
        </Tooltip>
        <Tooltip title="File a complaint against a hospital" arrow>
          <button
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={() => window.open('https://www.nmc.org.in/complaints/', '_blank')}
          >
            <ReportProblemIcon fontSize="small" />
            File Complaint Against Hospital
          </button>
        </Tooltip>
        <Tooltip title="Logout from your account" arrow>
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow flex items-center gap-2 transition"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            <LogoutIcon fontSize="small" />
            Logout
          </button>
        </Tooltip>
      </div>
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
      <UserHospitalSearch />
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  return (
    <>
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
