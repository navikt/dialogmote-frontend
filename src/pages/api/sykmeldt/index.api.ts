import { NextApiRequest, NextApiResponse } from "next";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";
import { fetchConcurrentDataSM } from "@/server/data/sykmeldt/fetchConcurrentDataSM";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const data = await fetchConcurrentDataSM(req);

  if (data) {
    const { motebehov, brevArray } = data;
    const combinedData = mapDialogmoteData(motebehov, brevArray);
    res.status(200).json(combinedData);
  } else {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;
