import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";

import Playground from "@/components/playground/Playground";
import { PlaygroundToast } from "@/components/toast/PlaygroundToast";
import { ToastProvider, useToast } from "@/components/toast/ToasterProvider";
import { ConfigProvider, useConfig } from "@/hooks/useConfig";
import { ConnectionProvider, useConnection } from "@/hooks/useConnection";

const themeColors = ["amber"]; // align with accent color (#F17455-ish)

export default function AgentsPage() {
  return (
    <ToastProvider>
      <ConfigProvider>
        <ConnectionProvider>
          <AgentsInner />
        </ConnectionProvider>
      </ConfigProvider>
    </ToastProvider>
  );
}

function AgentsInner() {
  const { shouldConnect, wsUrl, token, connect, disconnect } = useConnection();

  const { config } = useConfig();
  const { toastMessage, setToastMessage } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  const handleConnect = useCallback(
    async (shouldConnectNow: boolean) => {
      return shouldConnectNow ? connect("guest") : disconnect();
    },
    [connect, disconnect],
  );

  useEffect(() => {
    let cancelled = false;
    const doConnect = async () => {
      if (wsUrl || connecting) return;
      setConnecting(true);
      setConnectError(null);
      try {
        await handleConnect(true);
      } catch (e: any) {
        if (!cancelled) {
          setConnectError(e?.message || "Failed to join as guest.");
        }
      } finally {
        if (!cancelled) {
          setConnecting(false);
        }
      }
    };
    void doConnect();
    return () => {
      cancelled = true;
    };
  }, [handleConnect, wsUrl, connecting]);

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          property="og:image"
          content="https://livekit.io/images/og/agents-playground.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex flex-col justify-center px-4 items-center h-full w-full bg-[#121212] min-h-screen">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="left-0 right-0 top-0 absolute z-10"
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -50 }}
            >
              <PlaygroundToast />
            </motion.div>
          )}
        </AnimatePresence>
        {wsUrl ? (
          <LiveKitRoom
            className="flex flex-col h-full w-full"
            serverUrl={wsUrl}
            token={token}
            connect={shouldConnect}
            onError={(e) => {
              setToastMessage({ message: e.message, type: "error" });
              console.error(e);
            }}
          >
            <Playground
              themeColors={themeColors}
              onConnect={(connected) => {
                handleConnect(connected);
              }}
            />
            <RoomAudioRenderer />
            <StartAudio label="Click to enable audio playback" />
          </LiveKitRoom>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-white py-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center space-y-2"
            >
              <h2 className="text-xl font-semibold">Connecting to Jan Agent...</h2>
              <p className="text-sm text-gray-400">
                Creating a guest session and fetching room credentials.
              </p>
            </motion.div>
            <motion.div
              className="h-10 w-10 rounded-full border-2 border-[#F17455]/40 border-t-[#F17455] animate-spin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
            {connectError && (
              <div className="text-sm text-red-400 text-center max-w-md">
                {connectError}
              </div>
            )}
            <button
              className="text-sm text-[#F17455] underline"
              onClick={() => handleConnect(true)}
              disabled={connecting}
            >
              Retry
            </button>
          </div>
        )}
      </main>
    </>
  );
}
