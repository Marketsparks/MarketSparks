"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  emailVerifiedAt: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;

  loading: boolean;

  refresh: () => Promise<void>;

  logout: () => Promise<void>;

  isAuthenticated: boolean;
};

const AuthContext =
  createContext<AuthContextValue | null>(
    null,
  );

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

const refresh = useCallback(
  async () => {
    try {
      const response = await fetch(
        "/api/auth/me",
        {
          credentials: "include",
          cache: "no-store",
        },
      );

      if (!response.ok) {
        setUser(null);

        return;
      }

      const data =
        await response.json();

      if (!data.success) {
        setUser(null);

        return;
      }

      setUser(data.user);
    } catch {
      setUser(null);
    }
  },
  [],
);

  const logout = useCallback(
    async () => {
      try {
        await fetch(
          "/api/auth/logout",
          {
            method: "POST",
            credentials: "include",
          },
        );
      } finally {
        setUser(null);
      }
    },
    [],
  );

useEffect(() => {
  async function initializeAuth() {
    try {
      await refresh();
    } finally {
      setLoading(false);
    }
  }

  void initializeAuth();
}, [refresh]);

  const value = useMemo(
    () => ({
      user,

      loading,

      refresh,

      logout,

      isAuthenticated:
        user !== null,
    }),
    [
      user,
      loading,
      refresh,
      logout,
    ],
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider.",
    );
  }

  return context;
}