import { NextApiRequest, NextApiResponse } from "next";

export type TRevalidateQueryParams = { revalidationPagePath?: string };

type TApiRequest = NextApiRequest & { query: TRevalidateQueryParams };

export default async function handler(req: TApiRequest, res: NextApiResponse) {
  // todo: uncomment this in the real project
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //     return res.status(401).json({ message: 'Invalid token' })
  // }

  if (!req.query.revalidationPagePath) {
    return res.status(500).send("Error revalidating");
  }

  try {
    await res.revalidate(req.query.revalidationPagePath);
    return res.json({ revalidated: true });
  } catch {
    return res.status(500).send("Error revalidating");
  }
}
