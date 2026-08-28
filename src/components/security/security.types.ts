import type {
  ChangePasswordValues,
} from "./security.validation";

export type ChangePasswordPayload =
  ChangePasswordValues;

export type ActiveSession = {
  id: string;

  userAgent: string | null;

  ipAddress: string | null;

  rememberMe: boolean;

  createdAt: string;

  lastActivityAt: string;

  expiresAt: string;

  current: boolean;
};

export type ActiveSessionsResponse = {
  success: boolean;

  sessions: ActiveSession[];
};

export type ChangePasswordResponse = {
  success: boolean;

  message: string;
};