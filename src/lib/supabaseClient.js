import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://ehelkhinnhhfschcfeft.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZWxraGlubmhoZnNjaGNmZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1OTE1NDQsImV4cCI6MjA3MDE2NzU0NH0.5NTbnRZHsuDeylr1GnEAhd39ygN-bk5_0a2am0e_Hrs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;