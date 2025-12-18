"use client";

import React, { createContext, useState } from "react";
import { useCallback } from "react";

export type ConnectionMode = "guest";

type TokenGeneratorData = {
  shouldConnect: boolean;
  wsUrl: string;
  token: string;
  mode: ConnectionMode;
  disconnect: () => Promise<void>;
  connect: (mode: ConnectionMode) => Promise<void>;
};

const ConnectionContext = createContext<TokenGeneratorData | undefined>(
  undefined,
);

export const ConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [connectionDetails, setConnectionDetails] = useState<{
    wsUrl: string;
    token: string;
    mode: ConnectionMode;
    shouldConnect: boolean;
  }>({ wsUrl: "", token: "", shouldConnect: false, mode: "guest" });

  const connect = useCallback(async (_mode: ConnectionMode) => {
    let apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBase) {
      const envRes = await fetch("/api/config");
      if (envRes.ok) {
        const data = await envRes.json();
        apiBase = data.apiBaseUrl;
      }
    }
    if (!apiBase) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
    }
    const normalizedBase = apiBase.replace(/\/$/, "");

    const guestLogin = await fetch(`${normalizedBase}/auth/guest-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!guestLogin.ok) {
      throw new Error("Guest login failed");
    }
    const guestData = await guestLogin.json();
    const bearer =
      guestData.access_token ||
      guestData.accessToken ||
      guestData.token ||
      guestData?.data?.access_token;
    if (!bearer) {
      throw new Error("Guest login did not return an access token");
    }

    const sessionRes = await fetch(`${normalizedBase}/v1/realtime/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (!sessionRes.ok) {
      const detail = await sessionRes.text();
      throw new Error(
        `Failed to create realtime session: ${sessionRes.status} ${detail}`,
      );
    }
    const session = await sessionRes.json();
    const url = session.ws_url;
    const token =
      session.client_secret?.value || session.client_secret || session.token;
    if (!url || !token) {
      throw new Error("Realtime session response missing ws_url or token");
    }

    setConnectionDetails({ wsUrl: url, token, shouldConnect: true, mode: "guest" });
  }, []);

  const disconnect = useCallback(async () => {
    setConnectionDetails((prev) => ({ ...prev, shouldConnect: false }));
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        shouldConnect: connectionDetails.shouldConnect,
        mode: connectionDetails.mode,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
