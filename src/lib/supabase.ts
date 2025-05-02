
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
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://nbjriasakctsmlfyxvum.supabase.co";
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ianJpYXNha2N0c21sZnl4dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzA4MzksImV4cCI6MjA2MTcwNjgzOX0.yAgNmXkN-AOnnrUHBlR6BgF0KF4wwCcy0BLb_Et4Q7k";
}

// Get the current deployed URL for auth redirects
const getRedirectUrl = () => {
  const isBrowser = typeof window !== 'undefined';
  // In the browser, use the current origin (deployed URL)
  const baseUrl = isBrowser ? window.location.origin : 'http://localhost:5173';
  return baseUrl;
};

// Create and configure the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    // Use deployed URL for redirects instead of hardcoding localhost
    redirectTo: `${getRedirectUrl()}/reset-password/update`,
  },
});

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
