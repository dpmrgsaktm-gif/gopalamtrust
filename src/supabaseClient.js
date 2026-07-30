import { createClient } from '@supabase/supabase-js';

// Setup key names for localStorage config
const KEY_URL = 'gopalam_supabase_url';
const KEY_ANON_KEY = 'gopalam_supabase_key';

let supabase = null;

export function getSupabaseConfig() {
  return {
    url: localStorage.getItem(KEY_URL) || '',
    anonKey: localStorage.getItem(KEY_ANON_KEY) || ''
  };
}

export function saveSupabaseConfig(url, anonKey) {
  if (url && anonKey) {
    localStorage.setItem(KEY_URL, url);
    localStorage.setItem(KEY_ANON_KEY, anonKey);
    try {
      supabase = createClient(url, anonKey);
    } catch (e) {
      console.error("Failed to initialize Supabase client", e);
    }
  } else {
    localStorage.removeItem(KEY_URL);
    localStorage.removeItem(KEY_ANON_KEY);
    supabase = null;
  }
}

// Check if Supabase is configured
const { url, anonKey } = getSupabaseConfig();
if (url && anonKey) {
  try {
    supabase = createClient(url, anonKey);
  } catch (e) {
    console.error("Failed to initialize Supabase client", e);
  }
}

// High-fidelity local database mock for offline-first usage
const LOCAL_STORAGE_DB_KEY = 'gopalam_local_db';

const defaultMockDb = {
  members: [
    { id: 'm1', name: 'Gopalam Convenor', email: 'convenor@gopalam.org', phone: '+91 9876543210', role: 'convenor', bank_account_details: 'GOPALAM TRUST A/C: 1234567890, IFSC: SBIN0001234, STATE BANK OF INDIA', qr_code_text: 'upi://pay?pa=gopalamtrust@sbi&pn=GOPALAM%20FAMILY%20TRUST&am=550&cu=INR', opening_subscription_balance: 0.00, opening_thrift_balance: 0.00 },
    { id: 'm2', name: 'Rama Gopalam', email: 'member1@gopalam.org', phone: '+91 9876543211', role: 'member', bank_account_details: 'GOPALAM TRUST A/C: 1234567890, IFSC: SBIN0001234, STATE BANK OF INDIA', qr_code_text: 'upi://pay?pa=gopalamtrust@sbi&pn=GOPALAM%20FAMILY%20TRUST&am=550&cu=INR', opening_subscription_balance: 24000.00, opening_thrift_balance: 2400.00 },
    { id: 'm3', name: 'Krishna Gopalam', email: 'member2@gopalam.org', phone: '+91 9876543212', role: 'member', bank_account_details: 'GOPALAM TRUST A/C: 1234567890, IFSC: SBIN0001234, STATE BANK OF INDIA', qr_code_text: 'upi://pay?pa=gopalamtrust@sbi&pn=GOPALAM%20FAMILY%20TRUST&am=550&cu=INR', opening_subscription_balance: 20000.00, opening_thrift_balance: 2000.00 },
    { id: 'm4', name: 'Sita Gopalam', email: 'member3@gopalam.org', phone: '+91 9876543213', role: 'member', bank_account_details: 'GOPALAM TRUST A/C: 1234567890, IFSC: SBIN0001234, STATE BANK OF INDIA', qr_code_text: 'upi://pay?pa=gopalamtrust@sbi&pn=GOPALAM%20FAMILY%20TRUST&am=550&cu=INR', opening_subscription_balance: 18000.00, opening_thrift_balance: 1800.00 }
  ],
  meetings: [
    { id: 'meet1', meeting_date: '2026-05-15', conductor_id: 'm1', place: 'Trust Main Office, Visakhapatnam' },
    { id: 'meet2', meeting_date: '2026-06-20', conductor_id: 'm2', place: 'Rama Residence, Hyderabad' },
    { id: 'meet3', meeting_date: '2026-07-18', conductor_id: 'm3', place: 'Krishna Villa, Chennai' }
  ],
  loans: [
    { id: 'l1', member_id: 'm2', principal_amount: 30000.00, interest_rate_monthly: 0.50, issued_date: '2026-05-15', status: 'active', balance_amount: 25000.00 }
  ],
  collections: [
    { id: 'c1', meeting_id: 'meet1', member_id: 'm2', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 5000.00, interest_paid: 150.00, payment_status: 'paid', payment_date: '2026-05-15' },
    { id: 'c2', meeting_id: 'meet1', member_id: 'm3', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 0.00, payment_status: 'paid', payment_date: '2026-05-15' },
    { id: 'c3', meeting_id: 'meet1', member_id: 'm4', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 0.00, payment_status: 'paid', payment_date: '2026-05-15' },
    
    { id: 'c4', meeting_id: 'meet2', member_id: 'm2', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 125.00, payment_status: 'paid', payment_date: '2026-06-20' },
    { id: 'c5', meeting_id: 'meet2', member_id: 'm3', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 0.00, payment_status: 'paid', payment_date: '2026-06-20' },
    { id: 'c6', meeting_id: 'meet2', member_id: 'm4', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 0.00, payment_status: 'paid', payment_date: '2026-06-20' },

    { id: 'c7', meeting_id: 'meet3', member_id: 'm2', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 125.00, payment_status: 'paid', payment_date: '2026-07-18' },
    { id: 'c8', meeting_id: 'meet3', member_id: 'm3', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 0.00, payment_status: 'paid', payment_date: '2026-07-18' },
    { id: 'c9', meeting_id: 'meet3', member_id: 'm4', subscription_amount: 500.00, thrift_amount: 50.00, loan_repayment: 0.00, interest_paid: 0.00, payment_status: 'paid', payment_date: '2026-07-18' }
  ],
  expenses: [
    { id: 'e1', meeting_id: 'meet1', description: 'Refreshments & Hall Rent', amount: 1200.00, expense_date: '2026-05-15' },
    { id: 'e2', meeting_id: 'meet2', description: 'Stationery & Printing', amount: 450.00, expense_date: '2026-06-20' }
  ]
};

function getLocalDb() {
  const db = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
  if (!db) {
    localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(defaultMockDb));
    return defaultMockDb;
  }
  return JSON.parse(db);
}

function saveLocalDb(db) {
  localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(db));
}

// Central database service that switches between Supabase and LocalStorage
export const dbService = {
  isSupabaseConfigured() {
    return !!supabase;
  },
  async getMembers() {
    if (supabase) {
      const { data, error } = await supabase.from('members').select('*');
      if (!error) {
        if (data.length === 0) {
          const defaultMembers = getLocalDb().members;
          const seedData = defaultMembers.map(({ id, ...rest }) => rest);
          const { data: seeded, error: seedError } = await supabase.from('members').insert(seedData).select();
          if (!seedError) return seeded;
        } else {
          return data;
        }
      }
      console.warn("Supabase query error, using local fallback", error);
    }
    return getLocalDb().members;
  },

  async addMember(member) {
    if (supabase) {
      const { data, error } = await supabase.from('members').insert([member]).select();
      if (!error) return data[0];
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    const newMember = { ...member, id: 'm_' + Date.now() };
    db.members.push(newMember);
    saveLocalDb(db);
    return newMember;
  },

  async updateMember(id, memberData) {
    if (supabase) {
      const { data, error } = await supabase.from('members').update(memberData).eq('id', id).select();
      if (!error) return data[0];
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    const idx = db.members.findIndex(m => m.id === id);
    if (idx !== -1) {
      db.members[idx] = { ...db.members[idx], ...memberData };
      saveLocalDb(db);
      return db.members[idx];
    }
    return null;
  },

  async getMeetings() {
    if (supabase) {
      const { data, error } = await supabase.from('meetings').select('*, conductor:conductor_id(name)');
      if (!error) return data;
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    return db.meetings.map(m => {
      const conductor = db.members.find(mem => mem.id === m.conductor_id);
      return { ...m, conductor: conductor ? { name: conductor.name } : null };
    });
  },

  async addMeeting(meeting) {
    if (supabase) {
      const { data, error } = await supabase.from('meetings').insert([meeting]).select();
      if (!error) return data[0];
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    const newMeeting = { ...meeting, id: 'meet_' + Date.now() };
    db.meetings.push(newMeeting);
    saveLocalDb(db);
    return newMeeting;
  },

  async getLoans() {
    if (supabase) {
      const { data, error } = await supabase.from('loans').select('*, member:member_id(name)');
      if (!error) return data;
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    return db.loans.map(l => {
      const member = db.members.find(mem => mem.id === l.member_id);
      return { ...l, member: member ? { name: member.name } : null };
    });
  },

  async addLoan(loan) {
    // Check constraint: member must not have an active loan
    const loans = await this.getLoans();
    const activeLoan = loans.find(l => l.member_id === loan.member_id && l.status === 'active');
    if (activeLoan) {
      throw new Error("Member already has an active loan. Complete the current loan first.");
    }

    if (supabase) {
      const { data, error } = await supabase.from('loans').insert([loan]).select();
      if (!error) return data[0];
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    const newLoan = { ...loan, id: 'l_' + Date.now(), status: 'active', balance_amount: loan.principal_amount };
    db.loans.push(newLoan);
    saveLocalDb(db);
    return newLoan;
  },

  async updateLoanBalance(loanId, repaymentAmount) {
    const db = getLocalDb();
    const idx = db.loans.findIndex(l => l.id === loanId);
    if (idx !== -1) {
      const loan = db.loans[idx];
      let newBalance = Math.max(0, loan.balance_amount - repaymentAmount);
      let newStatus = newBalance === 0 ? 'repaid' : 'active';
      
      if (supabase) {
        const { data, error } = await supabase.from('loans').update({ balance_amount: newBalance, status: newStatus }).eq('id', loanId).select();
        if (!error) return data[0];
        console.warn("Supabase query error, using local fallback", error);
      }

      loan.balance_amount = newBalance;
      loan.status = newStatus;
      saveLocalDb(db);
      return loan;
    }
    return null;
  },

  async getCollections() {
    if (supabase) {
      const { data, error } = await supabase.from('collections').select('*, member:member_id(name), meeting:meeting_id(meeting_date)');
      if (!error) return data;
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    return db.collections.map(c => {
      const member = db.members.find(mem => mem.id === c.member_id);
      const meeting = db.meetings.find(meet => meet.id === c.meeting_id);
      return { 
        ...c, 
        member: member ? { name: member.name } : null,
        meeting: meeting ? { meeting_date: meeting.meeting_date } : null
      };
    });
  },

  async addCollection(collection) {
    if (supabase) {
      const { data, error } = await supabase.from('collections').insert([collection]).select();
      if (!error) return data[0];
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    const newCollection = { ...collection, id: 'c_' + Date.now() };
    db.collections.push(newCollection);
    saveLocalDb(db);
    return newCollection;
  },

  async getExpenses() {
    if (supabase) {
      const { data, error } = await supabase.from('expenses').select('*, meeting:meeting_id(meeting_date)');
      if (!error) return data;
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    return db.expenses.map(e => {
      const meeting = db.meetings.find(meet => meet.id === e.meeting_id);
      return { ...e, meeting: meeting ? { meeting_date: meeting.meeting_date } : null };
    });
  },

  async addExpense(expense) {
    if (supabase) {
      const { data, error } = await supabase.from('expenses').insert([expense]).select();
      if (!error) return data[0];
      console.warn("Supabase query error, using local fallback", error);
    }
    const db = getLocalDb();
    const newExpense = { ...expense, id: 'e_' + Date.now() };
    db.expenses.push(newExpense);
    saveLocalDb(db);
    return newExpense;
  }
};
