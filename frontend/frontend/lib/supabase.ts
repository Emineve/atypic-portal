import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dfiqxbysbysurvfamilr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmaXF4YnlzYnlzdXJ2ZmFtaWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4ODk0MTIsImV4cCI6MjEwOTQ2NTQxMn0.ZdDxtuXHdVqGt5rOVTxbK9aL6WH1vF1IqRVIorfey6I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
