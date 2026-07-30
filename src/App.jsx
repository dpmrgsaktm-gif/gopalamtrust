import React, { useState, useEffect } from 'react';
import { 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  dbService 
} from './supabaseClient';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  FileText, 
  Lock, 
  LogOut, 
  Plus, 
  QrCode, 
  Settings, 
  TrendingUp, 
  User, 
  Users, 
  Wallet,
  CheckCircle,
  AlertTriangle,
  Info,
  Sun,
  Moon,
  Trash2
} from 'lucide-react';
import './App.css';

// SVG-based dynamic UPI QR code generator for maximum UX
function DynamicUpiQr({ amount = 550, name = "GOPALAM TRUST" }) {
  // Let's create a beautiful decorative QR scan visual using SVGs
  const upiLink = `upi://pay?pa=gopalamtrust@sbi&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8.5px' }}>
      <div className="qr-code">
        {/* We generate a high-fidelity decorative QR code vector pattern */}
        <svg width="150" height="150" viewBox="0 0 100 100" style={{ shapeRendering: 'crispEdges' }}>
          <rect width="100" height="100" fill="white" />
          {/* Top Left Finder Pattern */}
          <rect x="5" y="5" width="25" height="25" fill="#1e1b4b" />
          <rect x="8" y="8" width="19" height="19" fill="white" />
          <rect x="11" y="11" width="13" height="13" fill="#1e1b4b" />
          
          {/* Top Right Finder Pattern */}
          <rect x="70" y="5" width="25" height="25" fill="#1e1b4b" />
          <rect x="73" y="8" width="19" height="19" fill="white" />
          <rect x="76" y="11" width="13" height="13" fill="#1e1b4b" />
          
          {/* Bottom Left Finder Pattern */}
          <rect x="5" y="70" width="25" height="25" fill="#1e1b4b" />
          <rect x="8" y="73" width="19" height="19" fill="white" />
          <rect x="11" y="76" width="13" height="13" fill="#1e1b4b" />
          
          {/* Random mock QR data modules */}
          <rect x="35" y="5" width="5" height="5" fill="#1e1b4b" />
          <rect x="45" y="5" width="10" height="5" fill="#1e1b4b" />
          <rect x="60" y="5" width="5" height="5" fill="#1e1b4b" />
          
          <rect x="35" y="15" width="15" height="5" fill="#1e1b4b" />
          <rect x="55" y="15" width="5" height="10" fill="#1e1b4b" />
          
          <rect x="35" y="25" width="5" height="10" fill="#1e1b4b" />
          <rect x="45" y="25" width="10" height="5" fill="#1e1b4b" />
          <rect x="60" y="25" width="5" height="5" fill="#1e1b4b" />
          
          <rect x="5" y="35" width="10" height="5" fill="#1e1b4b" />
          <rect x="20" y="35" width="5" height="15" fill="#1e1b4b" />
          <rect x="30" y="35" width="10" height="5" fill="#1e1b4b" />
          <rect x="45" y="35" width="5" height="10" fill="#1e1b4b" />
          <rect x="55" y="35" width="20" height="5" fill="#1e1b4b" />
          <rect x="80" y="35" width="15" height="5" fill="#1e1b4b" />
          
          <rect x="5" y="55" width="15" height="5" fill="#1e1b4b" />
          <rect x="25" y="45" width="10" height="5" fill="#1e1b4b" />
          <rect x="40" y="45" width="5" height="15" fill="#1e1b4b" />
          <rect x="50" y="50" width="15" height="5" fill="#1e1b4b" />
          <rect x="70" y="45" width="10" height="10" fill="#1e1b4b" />
          <rect x="85" y="45" width="5" height="15" fill="#1e1b4b" />
          
          <rect x="35" y="65" width="10" height="5" fill="#1e1b4b" />
          <rect x="50" y="60" width="5" height="15" fill="#1e1b4b" />
          <rect x="60" y="65" width="20" height="5" fill="#1e1b4b" />
          <rect x="85" y="65" width="10" height="5" fill="#1e1b4b" />
          
          <rect x="35" y="75" width="5" height="20" fill="#1e1b4b" />
          <rect x="45" y="80" width="15" height="5" fill="#1e1b4b" />
          <rect x="65" y="75" width="10" height="10" fill="#1e1b4b" />
          <rect x="80" y="80" width="5" height="15" fill="#1e1b4b" />
          <rect x="90" y="75" width="5" height="5" fill="#1e1b4b" />
          
          <rect x="45" y="90" width="10" height="5" fill="#1e1b4b" />
          <rect x="60" y="90" width="15" height="5" fill="#1e1b4b" />
          <rect x="85" y="90" width="10" height="5" fill="#1e1b4b" />
          
          {/* Logo overlay badge in center */}
          <rect x="40" y="40" width="20" height="20" rx="3" fill="#6366f1" />
          <text x="50" y="52" fontSize="7" fill="white" fontWeight="bold" textAnchor="middle">GFT</text>
        </svg>
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', wordBreak: 'break-all', maxWidth: '200px' }}>
        {upiLink}
      </span>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('gopalam_theme');
    return saved !== 'light'; // default to dark mode
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('gopalam_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  // Data state
  const [members, setMembers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [loans, setLoans] = useState([]);
  const [collections, setCollections] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  // UI Tabs / Modals
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, meetings, loans, reports
  const [showConfig, setShowConfig] = useState(false);
  const [configUrl, setConfigUrl] = useState('');
  const [configKey, setConfigKey] = useState('');
  
  // Report filters
  const [reportYear, setReportYear] = useState('2026');
  const [reportMonth, setReportMonth] = useState('07');

  // Opening balance configurations
  const [generalOpeningBalance, setGeneralOpeningBalance] = useState(() => {
    return parseFloat(localStorage.getItem('gopalam_general_opening') || '100000.00');
  });
  const [editedMembers, setEditedMembers] = useState({});
  
  // Action form states
  const [meetingForm, setMeetingForm] = useState({ date: '', conductorId: '', place: '' });
  const [collectionForm, setCollectionForm] = useState({ meetingId: '', memberId: '', subscription: 500, thrift: 50, repayment: 0, interest: 0 });
  const [loanForm, setLoanForm] = useState({ memberId: '', amount: 10000, date: '' });
  const [expenseForm, setExpenseForm] = useState({ meetingId: '', description: '', amount: 0, date: '' });
  const [newMemberForm, setNewMemberForm] = useState({ name: '', email: '', phone: '', role: 'member', openingSub: 0, openingThrift: 0 });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch configs
  useEffect(() => {
    const conf = getSupabaseConfig();
    setConfigUrl(conf.url);
    setConfigKey(conf.anonKey);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mems = await dbService.getMembers();
      setMembers(mems);
      
      const meets = await dbService.getMeetings();
      setMeetings(meets);
      
      const lns = await dbService.getLoans();
      setLoans(lns);
      
      const colls = await dbService.getCollections();
      setCollections(colls);
      
      const exps = await dbService.getExpenses();
      setExpenses(exps);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailLower = loginEmail.trim().toLowerCase();
    const found = members.find(m => m.email.toLowerCase() === emailLower);
    
    if (found) {
      setCurrentUser(found);
      setAuthError('');
      setLoginEmail('');
    } else {
      setAuthError('User not found. Try convenor@gopalam.org or member1@gopalam.org');
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveSupabaseConfig(configUrl, configKey);
    setShowConfig(false);
    setSuccessMessage('Supabase credentials updated successfully!');
    fetchData();
  };

  // Add Meeting
  const handleAddMeeting = async (e) => {
    e.preventDefault();
    if (!meetingForm.date || !meetingForm.conductorId || !meetingForm.place) {
      setErrorMessage('Please fill in all fields for the meeting.');
      return;
    }
    try {
      await dbService.addMeeting({
        meeting_date: meetingForm.date,
        conductor_id: meetingForm.conductorId,
        place: meetingForm.place
      });
      setSuccessMessage('Meeting scheduled successfully!');
      setMeetingForm({ date: '', conductorId: '', place: '' });
      fetchData();
    } catch (err) {
      setErrorMessage(err.message || 'Error scheduling meeting.');
    }
  };

  // Add Collection
  const handleAddCollection = async (e) => {
    e.preventDefault();
    if (!collectionForm.meetingId || !collectionForm.memberId) {
      setErrorMessage('Please specify the meeting and member.');
      return;
    }
    try {
      const amtRepayment = parseFloat(collectionForm.repayment) || 0;
      
      // If there is loan repayment, reduce loan balance
      if (amtRepayment > 0) {
        const activeLoan = loans.find(l => l.member_id === collectionForm.memberId && l.status === 'active');
        if (activeLoan) {
          await dbService.updateLoanBalance(activeLoan.id, amtRepayment);
        } else {
          setErrorMessage('Warning: Repayment was specified, but no active loan was found for this member.');
        }
      }

      await dbService.addCollection({
        meeting_id: collectionForm.meetingId,
        member_id: collectionForm.memberId,
        subscription_amount: parseFloat(collectionForm.subscription),
        thrift_amount: parseFloat(collectionForm.thrift),
        loan_repayment: amtRepayment,
        interest_paid: parseFloat(collectionForm.interest) || 0,
        payment_status: 'paid',
        payment_date: new Date().toISOString().split('T')[0]
      });

      setSuccessMessage('Collection payment recorded!');
      setCollectionForm({ meetingId: '', memberId: '', subscription: 500, thrift: 50, repayment: 0, interest: 0 });
      fetchData();
    } catch (err) {
      setErrorMessage(err.message || 'Error recording collection.');
    }
  };

  // Add Loan
  const handleAddLoan = async (e) => {
    e.preventDefault();
    if (!loanForm.memberId || !loanForm.amount || !loanForm.date) {
      setErrorMessage('Please fill in all loan fields.');
      return;
    }
    if (parseFloat(loanForm.amount) > 50000) {
      setErrorMessage('Loan cannot exceed 50,000 Rs.');
      return;
    }
    try {
      await dbService.addLoan({
        member_id: loanForm.memberId,
        principal_amount: parseFloat(loanForm.amount),
        issued_date: loanForm.date,
        balance_amount: parseFloat(loanForm.amount)
      });
      setSuccessMessage('Loan disbursed successfully!');
      setLoanForm({ memberId: '', amount: 10000, date: '' });
      fetchData();
    } catch (err) {
      setErrorMessage(err.message || 'Error disbursing loan.');
    }
  };

  // Add Expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseForm.description || !expenseForm.amount || !expenseForm.date) {
      setErrorMessage('Please fill all expense fields.');
      return;
    }
    try {
      await dbService.addExpense({
        meeting_id: expenseForm.meetingId || null,
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount),
        expense_date: expenseForm.date
      });
      setSuccessMessage('Expense added successfully!');
      setExpenseForm({ meetingId: '', description: '', amount: 0, date: '' });
      fetchData();
    } catch (err) {
      setErrorMessage(err.message || 'Error recording expense.');
    }
  };

  // Create New Member
  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!newMemberForm.name || !newMemberForm.email) {
      setErrorMessage('Name and Email are required.');
      return;
    }
    try {
      await dbService.addMember({
        name: newMemberForm.name,
        email: newMemberForm.email,
        phone: newMemberForm.phone || null,
        role: newMemberForm.role,
        opening_subscription_balance: parseFloat(newMemberForm.openingSub) || 0,
        opening_thrift_balance: parseFloat(newMemberForm.openingThrift) || 0
      });
      setSuccessMessage(`New member "${newMemberForm.name}" created successfully!`);
      setNewMemberForm({ name: '', email: '', phone: '', role: 'member', openingSub: 0, openingThrift: 0 });
      fetchData();
    } catch (err) {
      setErrorMessage('Failed to create new member.');
    }
  };

  // Auto calculate loan repayment info for Convenor form
  const handleMemberChangeInCollection = (memberId) => {
    const activeLoan = loans.find(l => l.member_id === memberId && l.status === 'active');
    if (activeLoan) {
      // Interest is 50 paise per 100 Rs = 0.5% per month
      const calculatedInterest = activeLoan.balance_amount * 0.005;
      setCollectionForm(prev => ({
        ...prev,
        memberId,
        interest: calculatedInterest.toFixed(2),
        repayment: Math.min(activeLoan.balance_amount, 2000) // Default recommended repayment
      }));
    } else {
      setCollectionForm(prev => ({
        ...prev,
        memberId,
        interest: 0,
        repayment: 0
      }));
    }
  };

  // Calculations for Reports
  const totalMemberOpeningSubs = members.reduce((acc, curr) => acc + (parseFloat(curr.opening_subscription_balance) || 0), 0);
  const totalMemberOpeningThrift = members.reduce((acc, curr) => acc + (parseFloat(curr.opening_thrift_balance) || 0), 0);

  const totalSubscriptions = totalMemberOpeningSubs + collections.reduce((acc, curr) => acc + parseFloat(curr.subscription_amount), 0);
  const totalThrifts = totalMemberOpeningThrift + collections.reduce((acc, curr) => acc + parseFloat(curr.thrift_amount), 0);
  const totalRepayments = collections.reduce((acc, curr) => acc + parseFloat(curr.loan_repayment), 0);
  const totalInterest = collections.reduce((acc, curr) => acc + parseFloat(curr.interest_paid), 0);
  const totalDisbursed = loans.reduce((acc, curr) => acc + parseFloat(curr.principal_amount), 0);
  const totalExp = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  
  // Total trust balance = general opening balance + new collections + repayments + interest - disbursed - expenses
  const newCollectionsSum = collections.reduce((acc, curr) => 
    acc + parseFloat(curr.subscription_amount) + parseFloat(curr.thrift_amount) + parseFloat(curr.loan_repayment) + parseFloat(curr.interest_paid)
  , 0);
  const trustBalance = generalOpeningBalance + newCollectionsSum - totalDisbursed - totalExp;

  // Clear messages after 4 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header>
        <div className="nav-container">
          <div className="logo">
            <Building2 size={24} />
            <span>GOPALAM TRUST</span>
          </div>
          <div className="nav-links">
            <button className="btn" onClick={() => setDarkMode(!darkMode)} title="Toggle Light/Dark Theme">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            <button className="btn" onClick={() => setShowConfig(true)}>
              <Settings size={18} />
              <span>Database Config</span>
            </button>
            {currentUser && (
              <>
                <span className="user-profile">
                  <User size={16} />
                  <span>{currentUser.name} ({currentUser.role})</span>
                </span>
                <button className="btn btn-danger" onClick={() => { setCurrentUser(null); setActiveTab('dashboard'); }}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ALERT BANNERS */}
      <main>
        {successMessage && (
          <div className="alert-banner" style={{ background: 'rgba(45, 212, 191, 0.1)', border: '1px solid var(--accent-teal)', color: 'var(--accent-teal)' }}>
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="alert-banner" style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent-rose)', color: 'var(--accent-rose)' }}>
            <AlertTriangle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* DATABASE SETUP SCREEN / CONFIG MODAL */}
        {showConfig && (
          <div className="glass-panel" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3>Supabase Connection Settings</h3>
              <span className="config-badge">
                <Info size={14} /> Status: {dbService.isSupabaseConfigured() ? 'Connected' : 'Offline Mock Fallback'}
              </span>
            </div>
            <form onSubmit={handleSaveConfig}>
              <div className="form-group">
                <label>Supabase Project URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="https://yourproject.supabase.co" 
                  value={configUrl}
                  onChange={(e) => setConfigUrl(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Supabase Anon Key</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="eyJhbGciOiJIUzI1Ni..." 
                  value={configKey}
                  onChange={(e) => setConfigKey(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary">Save Settings</button>
                <button type="button" className="btn" onClick={() => {
                  saveSupabaseConfig('', '');
                  setConfigUrl('');
                  setConfigKey('');
                  setShowConfig(false);
                  fetchData();
                }}>Reset to Offline Mock</button>
                <button type="button" className="btn" onClick={() => setShowConfig(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* AUTH/LOGIN SCREEN */}
        {!currentUser ? (
          <div className="auth-wrapper glass-panel">
            <h2 className="auth-title">Trust Portal Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  placeholder="convenor@gopalam.org or member1@gopalam.org" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              {authError && <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem', marginBottom: '15px' }}>{authError}</div>}
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Lock size={16} style={{ marginRight: '8px' }} />
                <span>Verify Credentials</span>
              </button>
            </form>
            <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <p>For testing, use login details:</p>
              <code style={{ color: 'var(--accent-gold)' }}>convenor@gopalam.org</code> (Convenor) or<br />
              <code style={{ color: 'var(--accent-teal)' }}>member1@gopalam.org</code> (Rama Gopalam)
            </div>
          </div>
        ) : (
          /* DASHBOARD VIEWPORT */
          <div>
            {/* CONVENOR VIEWPORT */}
            {currentUser.role === 'convenor' && (
              <div>
                {/* Stats row */}
                <div className="stats-grid">
                  <div className="glass-panel stat-card stat-accent-gold">
                    <span className="stat-label">Trust Account Balance</span>
                    <span className="stat-value">Rs. {trustBalance.toLocaleString()}</span>
                  </div>
                  <div className="glass-panel stat-card stat-accent-teal">
                    <span className="stat-label">Total Subscriptions</span>
                    <span className="stat-value">Rs. {totalSubscriptions.toLocaleString()}</span>
                  </div>
                  <div className="glass-panel stat-card stat-accent-indigo">
                    <span className="stat-label">Active Loans Out</span>
                    <span className="stat-value">Rs. {loans.filter(l => l.status === 'active').reduce((acc, curr) => acc + parseFloat(curr.balance_amount), 0).toLocaleString()}</span>
                  </div>
                  <div className="glass-panel stat-card stat-accent-rose">
                    <span className="stat-label">Total Expenses</span>
                    <span className="stat-value">Rs. {totalExp.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                  <div className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                    Financial Register
                  </div>
                  <div className={`tab ${activeTab === 'meetings' ? 'active' : ''}`} onClick={() => setActiveTab('meetings')}>
                    Meetings & Scheduling
                  </div>
                  <div className={`tab ${activeTab === 'loans' ? 'active' : ''}`} onClick={() => setActiveTab('loans')}>
                    Loan Disbursals
                  </div>
                  <div className={`tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
                    Monthly Reports
                  </div>
                  <div className={`tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                    Opening Balances
                  </div>
                </div>

                {/* TAB CONTENTS */}
                {activeTab === 'dashboard' && (
                  <div className="flex-layout">
                    {/* Left: Record Payment Form */}
                    <div className="glass-panel">
                      <h3 className="card-title" style={{ marginBottom: '16px' }}>
                        <Wallet size={20} className="text-accent-teal" /> Record Monthly Member Collection
                      </h3>
                      <form onSubmit={handleAddCollection}>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Meeting Date</label>
                            <select 
                              className="form-control" 
                              required
                              value={collectionForm.meetingId}
                              onChange={(e) => setCollectionForm({...collectionForm, meetingId: e.target.value})}
                            >
                              <option value="">Select Meeting...</option>
                              {meetings.map(m => (
                                <option key={m.id} value={m.id}>{m.meeting_date} ({m.place})</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Member</label>
                            <select 
                              className="form-control" 
                              required
                              value={collectionForm.memberId}
                              onChange={(e) => handleMemberChangeInCollection(e.target.value)}
                            >
                              <option value="">Select Member...</option>
                              {members.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Monthly Subscription (Rs.)</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              required
                              value={collectionForm.subscription}
                              onChange={(e) => setCollectionForm({...collectionForm, subscription: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Monthly Thrift (Rs.)</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              required
                              value={collectionForm.thrift}
                              onChange={(e) => setCollectionForm({...collectionForm, thrift: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Loan Repayment Principal (Rs.)</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              value={collectionForm.repayment}
                              onChange={(e) => setCollectionForm({...collectionForm, repayment: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Interest Collected (Rs.)</label>
                            <input 
                              type="number" 
                              step="0.01"
                              className="form-control" 
                              value={collectionForm.interest}
                              onChange={(e) => setCollectionForm({...collectionForm, interest: e.target.value})}
                            />
                          </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          <Plus size={16} /> Record Transaction
                        </button>
                      </form>
                    </div>

                    {/* Right: Record Expense Form */}
                    <div className="glass-panel">
                      <h3 className="card-title" style={{ marginBottom: '16px' }}>
                        <TrendingUp size={20} className="text-accent-rose" /> Record Expense
                      </h3>
                      <form onSubmit={handleAddExpense}>
                        <div className="form-group">
                          <label>Linked Meeting (Optional)</label>
                          <select 
                            className="form-control" 
                            value={expenseForm.meetingId}
                            onChange={(e) => setExpenseForm({...expenseForm, meetingId: e.target.value})}
                          >
                            <option value="">None / General</option>
                            {meetings.map(m => (
                              <option key={m.id} value={m.id}>{m.meeting_date}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            required 
                            placeholder="e.g. Refreshments, Venue rent" 
                            value={expenseForm.description}
                            onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Amount (Rs.)</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              required 
                              value={expenseForm.amount}
                              onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                            />
                          </div>
                          <div className="form-group">
                            <label>Expense Date</label>
                            <input 
                              type="date" 
                              className="form-control" 
                              required 
                              value={expenseForm.date}
                              onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          <Plus size={16} /> Log Expense
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'meetings' && (
                  <div className="flex-layout">
                    {/* Schedule Form */}
                    <div className="glass-panel">
                      <h3 className="card-title" style={{ marginBottom: '16px' }}>
                        <Calendar size={20} /> Schedule Monthly Meeting
                      </h3>
                      <form onSubmit={handleAddMeeting}>
                        <div className="form-group">
                          <label>Meeting Date</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            required 
                            value={meetingForm.date}
                            onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Conductor (Who is conducting)</label>
                          <select 
                            className="form-control" 
                            required 
                            value={meetingForm.conductorId}
                            onChange={(e) => setMeetingForm({...meetingForm, conductorId: e.target.value})}
                          >
                            <option value="">Select Conductor...</option>
                            {members.map(m => (
                              <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Meeting Place</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            required 
                            placeholder="e.g. Venue, House Address" 
                            value={meetingForm.place}
                            onChange={(e) => setMeetingForm({...meetingForm, place: e.target.value})}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          <Plus size={16} /> Schedule Meeting
                        </button>
                      </form>
                    </div>

                    {/* Scheduled Meetings List */}
                    <div className="glass-panel">
                      <h3>Scheduled Meetings</h3>
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Conductor</th>
                              <th>Place</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {meetings.map(m => (
                              <tr key={m.id}>
                                <td>{m.meeting_date}</td>
                                <td>{m.conductor?.name || 'Unknown'}</td>
                                <td>{m.place}</td>
                                <td>
                                  <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={async () => {
                                    if(confirm("Delete this meeting? Linked collections/expenses will also be deleted.")) {
                                      await dbService.deleteMeeting(m.id);
                                      setSuccessMessage("Meeting deleted.");
                                      fetchData();
                                    }
                                  }}><Trash2 size={14} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'loans' && (
                  <div className="flex-layout">
                    {/* Disburse Loan */}
                    <div className="glass-panel">
                      <h3 className="card-title" style={{ marginBottom: '16px' }}>
                        <DollarSign size={20} /> Disburse Loan
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>
                        Note: A member can only get a new loan after completely paying off the current outstanding loan.
                      </p>
                      <form onSubmit={handleAddLoan}>
                        <div className="form-group">
                          <label>Member Beneficiary</label>
                          <select 
                            className="form-control" 
                            required
                            value={loanForm.memberId}
                            onChange={(e) => setLoanForm({...loanForm, memberId: e.target.value})}
                          >
                            <option value="">Select Member...</option>
                            {members.map(m => (
                              <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Principal Amount (Max Rs 50,000)</label>
                          <input 
                            type="number" 
                            max="50000"
                            className="form-control" 
                            required 
                            value={loanForm.amount}
                            onChange={(e) => setLoanForm({...loanForm, amount: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Disbursal Date</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            required 
                            value={loanForm.date}
                            onChange={(e) => setLoanForm({...loanForm, date: e.target.value})}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Disburse Loan
                        </button>
                      </form>
                    </div>

                    {/* Loans Ledger */}
                    <div className="glass-panel">
                      <h3>Loans History</h3>
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Member</th>
                              <th>Principal</th>
                              <th>Balance</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loans.map(l => (
                              <tr key={l.id}>
                                <td>{l.member?.name}</td>
                                <td>Rs. {parseFloat(l.principal_amount).toLocaleString()}</td>
                                <td>Rs. {parseFloat(l.balance_amount).toLocaleString()}</td>
                                <td>
                                  <span className={`badge ${l.status === 'active' ? 'badge-pending' : 'badge-success'}`}>
                                    {l.status}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={async () => {
                                    if(confirm("Delete this loan record?")) {
                                      await dbService.deleteLoan(l.id);
                                      setSuccessMessage("Loan record deleted.");
                                      fetchData();
                                    }
                                  }}><Trash2 size={14} /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reports' && (
                  <div>
                    {/* Month/Year Selector Form */}
                    <div className="glass-panel" style={{ marginBottom: '24px' }}>
                      <h3 style={{ marginBottom: '16px' }}>Select Monthly Financial Report</h3>
                      <div className="form-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div className="form-group" style={{ flex: '1', minWidth: '150px', marginBottom: '0' }}>
                          <label>Year</label>
                          <select 
                            className="form-control" 
                            value={reportYear}
                            onChange={(e) => setReportYear(e.target.value)}
                          >
                            {Array.from({ length: new Date().getFullYear() - 2018 + 1 }, (_, i) => 2018 + i).map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group" style={{ flex: '1', minWidth: '150px', marginBottom: '0' }}>
                          <label>Month</label>
                          <select 
                            className="form-control" 
                            value={reportMonth}
                            onChange={(e) => setReportMonth(e.target.value)}
                          >
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {(() => {
                      const prefix = `${reportYear}-${reportMonth}`;
                      const reportMeetings = meetings.filter(m => m.meeting_date.startsWith(prefix));
                      const reportMeetingIds = reportMeetings.map(m => m.id);
                      
                      // Collections linked to this month's meetings
                      const reportCollections = collections.filter(c => reportMeetingIds.includes(c.meeting_id));
                      
                      // Expenses linked to this month or meeting
                      const reportExpenses = expenses.filter(e => reportMeetingIds.includes(e.meeting_id) || e.expense_date.startsWith(prefix));
                      
                      // Loans disbursed in this month
                      const reportDisbursedLoans = loans.filter(l => l.issued_date.startsWith(prefix));

                      // Aggregates
                      const subTotal = reportCollections.reduce((acc, curr) => acc + parseFloat(curr.subscription_amount), 0);
                      const thriftTotal = reportCollections.reduce((acc, curr) => acc + parseFloat(curr.thrift_amount), 0);
                      const repaymentTotal = reportCollections.reduce((acc, curr) => acc + parseFloat(curr.loan_repayment), 0);
                      const interestTotal = reportCollections.reduce((acc, curr) => acc + parseFloat(curr.interest_paid), 0);
                      
                      const totalInflow = subTotal + thriftTotal + repaymentTotal + interestTotal;
                      const expenseTotal = reportExpenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
                      const loansOutTotal = reportDisbursedLoans.reduce((acc, curr) => acc + parseFloat(curr.principal_amount), 0);
                      const totalOutflow = expenseTotal + loansOutTotal;

                      const netMonthlySurplus = totalInflow - totalOutflow;

                      return (
                        <div>
                          {/* Aggregated Cards */}
                          <div className="stats-grid">
                            <div className="glass-panel stat-card stat-accent-teal">
                              <span className="stat-label">Monthly Collections (Inflow)</span>
                              <span className="stat-value">Rs. {totalInflow.toLocaleString()}</span>
                            </div>
                            <div className="glass-panel stat-card stat-accent-rose">
                              <span className="stat-label">Expenses & Disbursals</span>
                              <span className="stat-value">Rs. {totalOutflow.toLocaleString()}</span>
                            </div>
                            <div className={`glass-panel stat-card ${netMonthlySurplus >= 0 ? 'stat-accent-teal' : 'stat-accent-rose'}`}>
                              <span className="stat-label">Net Monthly Surplus</span>
                              <span className="stat-value">Rs. {netMonthlySurplus.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Meeting details */}
                          <div className="glass-panel" style={{ marginBottom: '24px' }}>
                            <h3 style={{ marginBottom: '12px' }}>Meeting Details</h3>
                            {reportMeetings.length > 0 ? (
                              <div className="table-wrapper">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Meeting Date</th>
                                      <th>Host Conductor</th>
                                      <th>Place</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {reportMeetings.map(m => (
                                      <tr key={m.id}>
                                        <td>{m.meeting_date}</td>
                                        <td>{m.conductor?.name || 'Unknown'}</td>
                                        <td>{m.place}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p style={{ color: 'var(--text-secondary)' }}>No meeting scheduled for this month.</p>
                            )}
                          </div>

                          {/* Detailed Collection Table */}
                          <div className="glass-panel" style={{ marginBottom: '24px' }}>
                            <h3 style={{ marginBottom: '12px' }}>Member Collections Ledger</h3>
                            {reportCollections.length > 0 ? (
                              <div className="table-wrapper">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Member</th>
                                      <th>Subscription</th>
                                      <th>Thrift</th>
                                      <th>Loan Repayment</th>
                                      <th>Interest Paid</th>
                                      <th>Total Contributed</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {reportCollections.map(c => {
                                      const totalPaid = parseFloat(c.subscription_amount) + parseFloat(c.thrift_amount) + parseFloat(c.loan_repayment) + parseFloat(c.interest_paid);
                                      return (
                                        <tr key={c.id}>
                                          <td>{c.member?.name}</td>
                                          <td>Rs. {parseFloat(c.subscription_amount).toLocaleString()}</td>
                                          <td>Rs. {parseFloat(c.thrift_amount).toLocaleString()}</td>
                                          <td>Rs. {parseFloat(c.loan_repayment).toLocaleString()}</td>
                                          <td>Rs. {parseFloat(c.interest_paid).toLocaleString()}</td>
                                          <td style={{ fontWeight: 'bold' }}>Rs. {totalPaid.toLocaleString()}</td>
                                          <td>
                                            <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={async () => {
                                              if (confirm("Delete this collection record? If there was a loan repayment, it will be reversed.")) {
                                                await dbService.deleteCollection(c.id);
                                                setSuccessMessage("Collection deleted.");
                                                fetchData();
                                              }
                                            }}><Trash2 size={14} /></button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                    <tr style={{ fontWeight: 'bold', borderTop: '2px solid var(--glass-border)' }}>
                                      <td>Total</td>
                                      <td>Rs. {subTotal.toLocaleString()}</td>
                                      <td>Rs. {thriftTotal.toLocaleString()}</td>
                                      <td>Rs. {repaymentTotal.toLocaleString()}</td>
                                      <td>Rs. {interestTotal.toLocaleString()}</td>
                                      <td>Rs. {totalInflow.toLocaleString()}</td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p style={{ color: 'var(--text-secondary)' }}>No collections recorded for this month.</p>
                            )}
                          </div>

                          {/* Expenses and Loans Disbursed */}
                          <div className="flex-layout">
                            <div className="glass-panel">
                              <h3>Monthly Expenses</h3>
                              {reportExpenses.length > 0 ? (
                                <div className="table-wrapper">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {reportExpenses.map(e => (
                                        <tr key={e.id}>
                                          <td>{e.expense_date}</td>
                                          <td>{e.description}</td>
                                          <td style={{ color: 'var(--accent-rose)', fontWeight: '500' }}>Rs. {parseFloat(e.amount).toLocaleString()}</td>
                                          <td>
                                            <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={async () => {
                                              if(confirm("Delete this expense?")) {
                                                await dbService.deleteExpense(e.id);
                                                setSuccessMessage("Expense deleted.");
                                                fetchData();
                                              }
                                            }}><Trash2 size={14} /></button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>No expenses logged for this month.</p>
                              )}
                            </div>

                            <div className="glass-panel">
                              <h3>Loans Disbursed</h3>
                              {reportDisbursedLoans.length > 0 ? (
                                <div className="table-wrapper">
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Member</th>
                                        <th>Principal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {reportDisbursedLoans.map(l => (
                                        <tr key={l.id}>
                                          <td>{l.member?.name}</td>
                                          <td style={{ color: 'var(--accent-indigo)', fontWeight: '500' }}>Rs. {parseFloat(l.principal_amount).toLocaleString()}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>No loans issued in this month.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    {/* General trust opening balance */}
                    <div className="glass-panel" style={{ marginBottom: '24px' }}>
                      <h3 style={{ marginBottom: '12px' }}>General Trust Settings</h3>
                      <div className="form-group" style={{ maxWidth: '300px' }}>
                        <label>Trust Opening Reserve Balance (Rs.)</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input 
                            type="number" 
                            className="form-control"
                            value={generalOpeningBalance}
                            onChange={(e) => setGeneralOpeningBalance(parseFloat(e.target.value) || 0)}
                          />
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              localStorage.setItem('gopalam_general_opening', generalOpeningBalance.toString());
                              setSuccessMessage('General trust opening reserve updated!');
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Member registry & balances section */}
                    <div className="flex-layout">
                      {/* Member opening balances */}
                      <div className="glass-panel">
                        <h3 style={{ marginBottom: '16px' }}>Member Opening Balances Registry</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                          Set the initial subscription and thrift balances accumulated by each member prior to using this management software.
                        </p>
                        <div className="table-wrapper">
                          <table>
                            <thead>
                              <tr>
                                <th>Member Name</th>
                                <th>Opening Subscription (Rs.)</th>
                                <th>Opening Thrift (Rs.)</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {members.map(m => {
                                const tempSub = editedMembers[m.id]?.opening_subscription_balance ?? m.opening_subscription_balance;
                                const tempThrift = editedMembers[m.id]?.opening_thrift_balance ?? m.opening_thrift_balance;
                                return (
                                  <tr key={m.id}>
                                    <td style={{ fontWeight: '500' }}>{m.name} ({m.role})</td>
                                    <td>
                                      <input 
                                        type="number" 
                                        className="form-control"
                                        style={{ padding: '6px 12px', maxWidth: '180px' }}
                                        value={tempSub}
                                        onChange={(e) => setEditedMembers({
                                          ...editedMembers,
                                          [m.id]: {
                                            ...editedMembers[m.id],
                                            opening_subscription_balance: parseFloat(e.target.value) || 0,
                                            opening_thrift_balance: tempThrift
                                          }
                                        })}
                                      />
                                    </td>
                                    <td>
                                      <input 
                                        type="number" 
                                        className="form-control"
                                        style={{ padding: '6px 12px', maxWidth: '180px' }}
                                        value={tempThrift}
                                        onChange={(e) => setEditedMembers({
                                          ...editedMembers,
                                          [m.id]: {
                                            opening_subscription_balance: tempSub,
                                            opening_thrift_balance: parseFloat(e.target.value) || 0
                                          }
                                        })}
                                      />
                                    </td>
                                    <td>
                                      <button 
                                        className="btn"
                                        style={{ padding: '6px 12px' }}
                                        onClick={async () => {
                                          try {
                                            await dbService.updateMember(m.id, {
                                              opening_subscription_balance: parseFloat(tempSub) || 0,
                                              opening_thrift_balance: parseFloat(tempThrift) || 0
                                            });
                                            setSuccessMessage(`Opening balances updated for ${m.name}`);
                                            fetchData();
                                          } catch (err) {
                                            setErrorMessage('Error updating balances');
                                          }
                                        }}
                                      >
                                        Update
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Add new member form */}
                      <div className="glass-panel">
                        <h3 style={{ marginBottom: '16px' }}>Add New Family Member</h3>
                        <form onSubmit={handleCreateMember}>
                          <div className="form-group">
                            <label>Full Name</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required 
                              placeholder="e.g. Hari Gopalam"
                              value={newMemberForm.name}
                              onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address (For Login)</label>
                            <input 
                              type="email" 
                              className="form-control" 
                              required 
                              placeholder="e.g. hari@gopalam.org"
                              value={newMemberForm.email}
                              onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="e.g. +91 9876543214"
                              value={newMemberForm.phone}
                              onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Account Role</label>
                            <select 
                              className="form-control"
                              value={newMemberForm.role}
                              onChange={(e) => setNewMemberForm({ ...newMemberForm, role: e.target.value })}
                            >
                              <option value="member">Trust Member</option>
                              <option value="convenor">Trust Convenor</option>
                            </select>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label>Opening Subs Balance (Rs.)</label>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={newMemberForm.openingSub}
                                onChange={(e) => setNewMemberForm({ ...newMemberForm, openingSub: parseFloat(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="form-group">
                              <label>Opening Thrift Balance (Rs.)</label>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={newMemberForm.openingThrift}
                                onChange={(e) => setNewMemberForm({ ...newMemberForm, openingThrift: parseFloat(e.target.value) || 0 })}
                              />
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            <Plus size={16} /> Register Member
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MEMBER PORTAL VIEWPORT */}
            {currentUser.role === 'member' && (
              <div>
                {/* Statistics Row for Member */}
                {(() => {
                  const myCollections = collections.filter(c => c.member_id === currentUser.id);
                  const myActiveLoan = loans.find(l => l.member_id === currentUser.id && l.status === 'active');
                  const myRepaidLoans = loans.filter(l => l.member_id === currentUser.id && l.status === 'repaid');
                  const myThriftTotal = (parseFloat(currentUser.opening_thrift_balance) || 0) + myCollections.reduce((acc, curr) => acc + parseFloat(curr.thrift_amount), 0);
                  const mySubsTotal = (parseFloat(currentUser.opening_subscription_balance) || 0) + myCollections.reduce((acc, curr) => acc + parseFloat(curr.subscription_amount), 0);

                  return (
                    <div>
                      <div className="stats-grid">
                        <div className="glass-panel stat-card stat-accent-teal">
                          <span className="stat-label">Total Thrift Contributed</span>
                          <span className="stat-value">Rs. {myThriftTotal.toLocaleString()}</span>
                        </div>
                        <div className="glass-panel stat-card stat-accent-indigo">
                          <span className="stat-label">Active Loan Outstanding</span>
                          <span className="stat-value">
                            Rs. {myActiveLoan ? parseFloat(myActiveLoan.balance_amount).toLocaleString() : '0'}
                          </span>
                        </div>
                        <div className="glass-panel stat-card stat-accent-gold">
                          <span className="stat-label">Interest Due (Next Meeting)</span>
                          <span className="stat-value">
                            Rs. {myActiveLoan ? (parseFloat(myActiveLoan.balance_amount) * 0.005).toLocaleString() : '0'}
                          </span>
                        </div>
                        <div className="glass-panel stat-card stat-accent-rose">
                          <span className="stat-label">Subscription Paid</span>
                          <span className="stat-value">Rs. {mySubsTotal.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Main member layouts */}
                      <div className="flex-layout">
                        {/* Member Payments Table */}
                        <div className="glass-panel">
                          <h3>My Payment Ledger</h3>
                          <div className="table-wrapper">
                            <table>
                              <thead>
                                <tr>
                                  <th>Meeting Date</th>
                                  <th>Subscription</th>
                                  <th>Thrift</th>
                                  <th>Repayment</th>
                                  <th>Interest Paid</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {myCollections.map(c => (
                                  <tr key={c.id}>
                                    <td>{c.meeting?.meeting_date}</td>
                                    <td>Rs. {parseFloat(c.subscription_amount).toLocaleString()}</td>
                                    <td>Rs. {parseFloat(c.thrift_amount).toLocaleString()}</td>
                                    <td>Rs. {parseFloat(c.loan_repayment).toLocaleString()}</td>
                                    <td>Rs. {parseFloat(c.interest_paid).toLocaleString()}</td>
                                    <td><span className="badge badge-success">{c.payment_status}</span></td>
                                  </tr>
                                ))}
                                {myCollections.length === 0 && (
                                  <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                      No transaction history found.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>Upcoming Meeting Schedules</h3>
                          <div className="table-wrapper">
                            <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Host Conductor</th>
                                  <th>Meeting Place</th>
                                </tr>
                              </thead>
                              <tbody>
                                {meetings.map(m => (
                                  <tr key={m.id}>
                                    <td>{m.meeting_date}</td>
                                    <td>{m.conductor?.name}</td>
                                    <td>{m.place}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Payment Scan/Account panel */}
                        <div className="glass-panel qr-panel">
                          <h3 className="card-title">
                            <QrCode size={20} className="text-accent-gold" /> Pay Trust Online
                          </h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            Scan QR below to pay current month's subscription (Rs. 500) + Thrift (Rs. 50) = <strong>Rs. 550</strong> plus interest/loan repayment if applicable.
                          </p>

                          {/* Dynamic UPI Qr code */}
                          <DynamicUpiQr amount={myActiveLoan ? (550 + (parseFloat(myActiveLoan.balance_amount) * 0.005)) : 550} />

                          <div className="bank-details-box" style={{ width: '100%' }}>
                            <div className="bank-detail-item">
                              <span className="bank-label">Bank Name</span>
                              <span className="bank-value">State Bank of India</span>
                            </div>
                            <div className="bank-detail-item">
                              <span className="bank-label">Account No</span>
                              <span className="bank-value">1234567890</span>
                            </div>
                            <div className="bank-detail-item">
                              <span className="bank-label">IFSC Code</span>
                              <span className="bank-value">SBIN0001234</span>
                            </div>
                            <div className="bank-detail-item">
                              <span className="bank-label">Beneficiary</span>
                              <span className="bank-value">Gopalam Trust Unit</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
