import { NextApiRequest, NextApiResponse } from "next";
import { fetchSykmeldtAG } from "@/server/data/arbeidsgiver/fetchSykmeldtAG";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { mapDialogmoteData } from "@/server/data/common/mapDialogmoteData";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const sykmeldtDTO = await fetchSykmeldtAG(req);

  if (!sykmeldtDTO) {
    res.status(500).json("Could not get sykmelding");
    return;
  }

  const data = await fetchConcurrentDataAG(
    req,
    sykmeldtDTO.fnr,
    sykmeldtDTO.orgnummer
  );

  if (data) {
    const { motebehov, brevArray } = data;
    const mappedData = mapDialogmoteData(motebehov, brevArray, sykmeldtDTO);

    res.json(mappedData);
  } else {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
export default handler;
