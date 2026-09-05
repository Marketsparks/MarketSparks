"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { usePathname } from "next/navigation";

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

const HEARTBEAT_INTERVAL = 60_000;

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const pathname = usePathname();

  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const lastHeartbeat =
    useRef(0);

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

  const sendHeartbeat =
    useCallback(async () => {
      if (!user) {
        return;
      }

      const now = Date.now();

      if (
        now - lastHeartbeat.current <
        HEARTBEAT_INTERVAL
      ) {
        return;
      }

      lastHeartbeat.current = now;

      try {
        await fetch(
          "/api/auth/activity",
          {
            method: "POST",
            credentials: "include",
            keepalive: true,
          },
        );
      } catch {
      }
    }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const handleActivity = () => {
      void sendHeartbeat();
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
      "pointerdown",
    ] as const;

    events.forEach((event) => {
      window.addEventListener(
        event,
        handleActivity,
        {
          passive:
            event === "mousemove" ||
            event === "touchstart" ||
            event === "scroll",
        },
      );
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(
          event,
          handleActivity,
        );
      });
    };
  }, [user, sendHeartbeat]);

  useEffect(() => {
    if (!user) {
      return;
    }

    void sendHeartbeat();
  }, [
    pathname,
    user,
    sendHeartbeat,
  ]);

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