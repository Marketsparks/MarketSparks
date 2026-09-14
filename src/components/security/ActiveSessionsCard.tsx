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
        rounded-lg
        border
        border-[var(--user-card-border)]
        bg-[var(--user-card-bg)]
        p-3
        sm:rounded-[var(--user-radius-lg)]
        sm:p-5
      "
    >
      <div
        className="
          mb-3
          flex
          items-start
          gap-2.5
          sm:mb-4
          sm:gap-3
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[var(--user-button-bg)]/10
            text-[var(--user-button-bg)]
            sm:h-9
            sm:w-9
          "
        >
          <MonitorSmartphone
            size={16}
            className="sm:hidden"
          />
          <MonitorSmartphone
            size={18}
            className="hidden sm:block"
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-[12px]
              font-semibold
              text-[var(--user-title)]
              sm:text-sm
            "
          >
            Active Sessions
          </h2>

          <p
            className="
              mt-0.5
              text-[10px]
              leading-4
              text-[var(--user-text-muted)]
              sm:mt-1
              sm:text-xs
              sm:leading-5
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
            py-6
            sm:py-8
          "
        >
          <Loader2
            size={18}
            className="
              animate-spin
              text-[var(--user-button-bg)]
              sm:hidden
            "
          />
          <Loader2
            size={22}
            className="
              hidden
              animate-spin
              text-[var(--user-button-bg)]
              sm:block
            "
          />
        </div>
      ) : sessions.length === 0 ? (
        <EmptySessions />
      ) : (
        <div
          className="
            space-y-2
            sm:space-y-3
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