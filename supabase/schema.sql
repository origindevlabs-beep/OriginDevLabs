-- ═══════════════════════════════════════════════════════════════════
-- Origin Dev Labs — Supabase Database Schema
-- Run this in your Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- 1. Leads Table — stores all Get Started questionnaire submissions
CREATE TABLE IF NOT EXISTS leads (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name    TEXT NOT NULL,
  last_name     TEXT DEFAULT '',
  email         TEXT NOT NULL,
  phone         TEXT DEFAULT '',
  company       TEXT DEFAULT '',

  -- Questionnaire answers
  services            TEXT[] NOT NULL DEFAULT '{}',
  pain_points         TEXT[] NOT NULL DEFAULT '{}',
  pain_custom_text    TEXT DEFAULT '',
  project_details     TEXT[] NOT NULL DEFAULT '{}',
  project_custom_text TEXT DEFAULT '',
  contact_preferences TEXT[] NOT NULL DEFAULT '{}',
  best_time           TEXT DEFAULT '',
  budget              TEXT DEFAULT '',
  additional_notes    TEXT DEFAULT '',

  -- Metadata
  status     TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  source     TEXT DEFAULT 'website',
  user_agent TEXT DEFAULT '',
  ip_address TEXT DEFAULT '',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  source     TEXT DEFAULT 'footer',
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Rate Limit Tracking Table
CREATE TABLE IF NOT EXISTS rate_limits (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  endpoint   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════
-- Indexes for performance
-- ═══════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_company    ON leads(company) WHERE company IS NOT NULL AND company != '';

CREATE INDEX IF NOT EXISTS idx_newsletter_email     ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_subscribers(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_endpoint ON rate_limits(ip_address, endpoint, created_at);

-- ═══════════════════════════════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Leads: only service_role can read/write
CREATE POLICY "service_role_all_leads" ON leads
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Newsletter: only service_role can read/write
CREATE POLICY "service_role_all_newsletter" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Rate limits: only service_role can read/write
CREATE POLICY "service_role_all_rate_limits" ON rate_limits
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════════════
-- Auto-update updated_at trigger
-- ═══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══════════════════════════════════════════════════════════════════
-- Cleanup: auto-delete rate limit entries older than 1 hour
-- ═══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Optional: schedule this as a pg_cron job (if pg_cron is enabled)
-- SELECT cron.schedule('cleanup-rate-limits', '0 * * * *', 'SELECT cleanup_old_rate_limits()');