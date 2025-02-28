import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Exception fetching user profile:', error);
      return null;
    }
  };

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      
      // Set session and user
      setSession(data.session);
      setUser(data.session?.user || null);

      // If we have a user, fetch their profile
      if (data.session?.user) {
        const profileData = await fetchUserProfile(data.session.user.id);
        setProfile(profileData);
        setIsAdmin(profileData?.is_admin || false);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up auth state listener when the component mounts
  useEffect(() => {
    refreshSession();

    // Set up listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user || null);

        // Handle profile information
        if (session?.user) {
          const profileData = await fetchUserProfile(session.user.id);
          setProfile(profileData);
          setIsAdmin(profileData?.is_admin || false);
          
          if (event === 'SIGNED_IN') {
            toast.success('Inicio de sesión exitoso');
          }
        } else {
          setProfile(null);
          setIsAdmin(false);
          
          if (event === 'SIGNED_OUT') {
            toast.success('Sesión cerrada exitosamente');
          }
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || 'Error al cerrar sesión');
    }
  };

  // Provide the auth context to the app
  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin,
        isLoading,
        signOut,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
