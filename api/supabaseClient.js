const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wmryptyxmpxxtysdwvcs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcnlwdHl4bXB4eHR5c2R3dmNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzc2OTUsImV4cCI6MjA1MTc1MzY5NX0.tGv_itjqSfUUSfhDw1wlTVO4TsEiLF7Mhvac7KJ4ikk';
// WARNING: change to environement based key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
module.exports = supabase;
