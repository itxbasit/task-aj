// components/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface AuthContextValue {
  user: any
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Sync auth status from localStorage to cookie for middleware
  const syncAuthToCookie = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        // Set cookie with auth token (expires in 1 hour)
        document.cookie = `auth-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`;
        document.cookie = `auth-user=${JSON.stringify(session.user)}; path=/; max-age=3600; SameSite=Lax`;
      } else {
        // Clear cookies if no session
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    } catch (error) {
      console.error('Error syncing auth to cookie:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      // Sync auth to cookie first
      await syncAuthToCookie();

      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null)
      const isAuthenticated = !!session;

      // If on login/register and authenticated, redirect to home
      if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
        router.push('/');
        setLoading(false);
        return;
      }

      // If on home and not authenticated, redirect to login
      if (pathname === '/' && !isAuthenticated) {
        router.push('/login');
        setLoading(false);
        return;
      }

      // If on protected route and not authenticated, redirect to login
      const protectedRoutes = ['/documents'];
      const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));
      
      if (isProtectedRoute && !isAuthenticated) {
        router.push('/login');
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Listen for auth changes (login/logout)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Sync auth to cookie on any auth change
      await syncAuthToCookie();

      if (event === 'SIGNED_OUT' || !session) {
        setUser(null)
        // Clear cookies on sign out
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        // Redirect to login if on protected page
        const protectedRoutes = ['/documents'];
        const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route));
        if (isProtectedRoute || pathname === '/') {
          router.push('/login');
        }
      } else if (session?.access_token) {
        setUser(session.user)
        // Update cookies on sign in
        document.cookie = `auth-token=${session.access_token}; path=/; max-age=3600; SameSite=Lax`;
        document.cookie = `auth-user=${JSON.stringify(session.user)}; path=/; max-age=3600; SameSite=Lax`;
        
        // Redirect to home if on login/register
        if (pathname === '/login' || pathname === '/register') {
          router.push('/');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}