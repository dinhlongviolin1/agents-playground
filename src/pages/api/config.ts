import type { NextApiRequest, NextApiResponse } from "next";

type ConfigResponse = {
  apiBaseUrl: string | null;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ConfigResponse>,
) {
  res.status(200).json({
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || null,
  });
}
