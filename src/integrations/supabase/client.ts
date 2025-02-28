import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Keep these values fixed to ensure consistency even in different environments
const SUPABASE_URL = "https://sfawuxgliitwasjwbxte.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmYXd1eGdsaWl0d2FzandieHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MDE2MzMsImV4cCI6MjA1NjI3NzYzM30.p5ML3fF8skzYIVnfqt_O4ICEw_SewhBnXckkRLIcKPI";

// Create a more robust storage implementation
const customStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  }
};

// Initialize the Supabase client with improved configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: customStorage,
    detectSessionInUrl: true,
    flowType: 'implicit'
  },
  global: {
    fetch: (...args) => fetch(...args)
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper to clear auth cache in case of problems
export const clearAuthCache = () => {
  try {
    // Clear Supabase auth-related items
    const keysToRemove = [
      'supabase.auth.token',
      'supabase-auth-token',
      'sb-sfawuxgliitwasjwbxte-auth-token',
      'supabase-auth-token-sfawuxgliitwasjwbxte'
    ];
    
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error(`Failed to remove ${key}:`, e);
      }
    });
    
    console.log('Auth cache cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing auth cache:', error);
    return false;
  }
};

// Helper to check if we have a valid session
export const hasValidSession = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Session error:', error);
      return false;
    }
    return !!data.session;
  } catch (error) {
    console.error('Exception checking session:', error);
    return false;
  }
};
