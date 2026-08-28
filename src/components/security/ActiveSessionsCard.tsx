"use client";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import {
  MonitorSmartphone,
  Loader2,
} from "lucide-react";

import SessionItem from "./SessionItem";
import EmptySessions from "./EmptySessions";

import {
  getActiveSessions,
  revokeSession,
} from "./security.service";

import type {
  ActiveSession,
} from "./security.types";

export default function ActiveSessionsCard() {
  const [
    sessions,
    setSessions,
  ] = useState<
    ActiveSession[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    revokingId,
    setRevokingId,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    try {
      setLoading(true);

      const response =
        await getActiveSessions();

      setSessions(
        response.sessions,
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load active sessions.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRevoke(
    sessionId: string,
  ) {
    try {
      setRevokingId(
        sessionId,
      );

      const response =
        await revokeSession(
          sessionId,
        );

      toast.success(
        response.message,
      );

      setSessions(
        (previous) =>
          previous.filter(
            (session) =>
              session.id !==
              sessionId,
          ),
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to revoke session.",
      );
    } finally {
      setRevokingId(
        null,
      );
    }
  }

  return (
    <section
      className="
        rounded-[var(--user-radius-lg)]
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-4
        sm:p-5
      "
    >
      <div
        className="
          mb-4
          flex
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-[var(--user-button-bg)]/10
            text-[var(--user-button-bg)]
          "
        >
          <MonitorSmartphone
            size={18}
          />
        </div>

        <div>
          <h2
            className="
              text-sm
              font-semibold
              text-[var(--user-title)]
            "
          >
            Active Sessions
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-[var(--user-text-muted)]
            "
          >
            Manage devices that are currently signed
            into your account.
          </p>
        </div>
      </div>

      {loading ? (
        <div
          className="
            flex
            justify-center
            py-8
          "
        >
          <Loader2
            size={22}
            className="
              animate-spin
              text-[var(--user-button-bg)]
            "
          />
        </div>
      ) : sessions.length === 0 ? (
        <EmptySessions />
      ) : (
        <div
          className="
            space-y-3
          "
        >
          {sessions.map(
            (session) => (
              <SessionItem
                key={session.id}
                session={
                  session
                }
                loading={
                  revokingId ===
                  session.id
                }
                onRevoke={
                  handleRevoke
                }
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}