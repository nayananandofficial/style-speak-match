
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
// When connected to Supabase via Lovable integration, these variables are automatically available
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we're running in development mode and use fallbacks if needed
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not detected. Using fallback values.');
  
  // These values will be replaced with the actual values from your Supabase project
  // They are visible in the client but this is normal for the anonymous key
  // as it's meant to be public
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-project-url.supabase.co";
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-supabase-anon-key";
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get user profile
export async function getUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Get profile from users table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return { user, profile };
}
