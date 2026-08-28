import type {
  ActiveSessionsResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "./security.types";

async function parseResponse<T>(
  response: Response,
): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ??
        "Something went wrong.",
    );
  }

  return data;
}

export async function changePassword(
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> {
  const response = await fetch(
    "/api/security/password",
    {
      method: "PATCH",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(payload),
    },
  );

  return parseResponse(response);
}

export async function getActiveSessions(): Promise<ActiveSessionsResponse> {
  const response = await fetch(
    "/api/security/sessions",
    {
      cache: "no-store",
    },
  );

  return parseResponse(response);
}

export async function revokeSession(
  sessionId: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(
    `/api/security/sessions/${sessionId}`,
    {
      method: "DELETE",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ??
        "Unable to revoke session.",
    );
  }

  return data;
}