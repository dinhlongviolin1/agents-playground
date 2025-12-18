import { Button } from "./button/Button";
import { useState } from "react";

type PlaygroundConnectProps = {
  accentColor: string;
  onConnectClicked: () => Promise<void>;
};

const Spinner = () => (
  <span
    className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-[#F17455]/30 border-t-[#F17455] animate-spin"
    aria-hidden
  />
);

export const PlaygroundConnect = ({
  accentColor,
  onConnectClicked,
}: PlaygroundConnectProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    setError(null);
    setLoading(true);
    try {
      await onConnectClicked();
    } catch (e: any) {
      setError(e?.message || "Failed to join as guest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex left-0 top-0 w-full h-full bg-black/80 items-center justify-center text-center gap-2">
      <div className="min-h-[280px]">
        <div className="flex flex-col bg-gray-950 w-full max-w-[420px] rounded-lg text-white border border-gray-900 p-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl">Join as Guest</h1>
            <p className="text-sm text-gray-500">
              We will create a guest session and drop you into your Jan Agent room.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              accentColor={accentColor}
              className="w-full bg-[#F17455] hover:bg-transparent hover:border-[#F17455] hover:text-[#F17455]"
              onClick={handleJoin}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Spinner />
                  Processing…
                </span>
              ) : (
                "Joined as Guest"
              )}
            </Button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
