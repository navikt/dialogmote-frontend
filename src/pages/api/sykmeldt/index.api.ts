import type { NextApiRequest, NextApiResponse } from "next";
import { fetchConcurrentDataSM } from "@/server/data/sykmeldt/fetchConcurrentDataSM";
import { mapDialogmoteDataSM } from "@/server/data/sykmeldt/mapDialogmoteDataSM";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const data = await fetchConcurrentDataSM(req);

  if (data) {
    const { motebehov, brevArray } = data;
    const combinedData = mapDialogmoteDataSM(motebehov, brevArray);
    res.status(200).json(combinedData);
  } else {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;
