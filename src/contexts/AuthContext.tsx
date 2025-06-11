import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import profileService from "../services/profile.service";

type User = any;

interface AuthContextProps {
    user: User | null;
    setUser: (user: User) => void,
    signIn: (email: string, password: string) => Promise<any>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {},
    loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchAndSetUserProfile(authUser: any) {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const profile = await profileService.getProfile(authUser.id);
      setUser({ ...authUser, ...profile });
    } catch {
      setUser(authUser);
    }
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      fetchAndSetUserProfile(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchAndSetUserProfile(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    return data;
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setUser(data.user);
    return data;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);