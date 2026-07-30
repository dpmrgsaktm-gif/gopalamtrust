-- GOPALAM FAMILY UNIT TRUST DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor.

-- Drop tables if they exist (clean setup)
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS collections CASCADE;
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS meetings CASCADE;
DROP TABLE IF EXISTS members CASCADE;

-- 1. MEMBERS TABLE
CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('convenor', 'member')),
  bank_account_details TEXT DEFAULT 'GOPALAM TRUST A/C: 1234567890, IFSC: SBIN0001234, STATE BANK OF INDIA',
  qr_code_text TEXT DEFAULT 'upi://pay?pa=gopalamtrust@sbi&pn=GOPALAM%20FAMILY%20TRUST&am=550&cu=INR',
  opening_subscription_balance DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  opening_thrift_balance DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. MEETINGS TABLE
CREATE TABLE meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_date DATE NOT NULL UNIQUE,
  conductor_id UUID REFERENCES members(id) ON DELETE SET NULL,
  place TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LOANS TABLE
CREATE TABLE loans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,
  principal_amount DECIMAL(10,2) NOT NULL CHECK (principal_amount <= 50000.00),
  interest_rate_monthly DECIMAL(5,2) DEFAULT 0.50 NOT NULL, -- 50 paise per 100 Rs = 0.50% per month
  issued_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'repaid')),
  balance_amount DECIMAL(10,2) NOT NULL CHECK (balance_amount >= 0.00),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. COLLECTIONS TABLE (Ledger for monthly collection per member)
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE NOT NULL,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE NOT NULL,
  subscription_amount DECIMAL(10,2) DEFAULT 500.00 NOT NULL,
  thrift_amount DECIMAL(10,2) DEFAULT 50.00 NOT NULL,
  loan_repayment DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  interest_paid DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('paid', 'pending')),
  payment_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(meeting_id, member_id)
);

-- 5. EXPENSES TABLE
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  expense_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SEED DATA (Optional, creates first convenor and members)
-- Convenor credentials: convenor@gopalam.org
-- Member credentials: member1@gopalam.org, member2@gopalam.org
INSERT INTO members (name, email, phone, role) VALUES 
('Gopalam Convenor', 'convenor@gopalam.org', '+91 9876543210', 'convenor'),
('Rama Gopalam', 'member1@gopalam.org', '+91 9876543211', 'member'),
('Krishna Gopalam', 'member2@gopalam.org', '+91 9876543212', 'member'),
('Sita Gopalam', 'member3@gopalam.org', '+91 9876543213', 'member');
