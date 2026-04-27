import type { NextApiRequest, NextApiResponse } from "next";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { fetchSykmeldtAG } from "@/server/data/arbeidsgiver/fetchSykmeldtAG";
import { mapDialogmoteDataAG } from "@/server/data/arbeidsgiver/mapDialogmoteDataAG";
import { logMissingMoteinnkallingAG } from "@/server/utils/logMissingMoteinnkallingAG";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const narmestelederid = req.query.narmestelederid as string;
  const sykmeldtDTO = await fetchSykmeldtAG(req);

  if (!sykmeldtDTO) {
    res.status(500).json("Could not get sykmelding");
    return;
  }

  const data = await fetchConcurrentDataAG(
    req,
    sykmeldtDTO.fnr,
    sykmeldtDTO.orgnummer,
  );

  if (data) {
    const { motebehov, brevArray } = data;
    const mappedData = mapDialogmoteDataAG(motebehov, sykmeldtDTO, brevArray);

    await logMissingMoteinnkallingAG({
      narmestelederid,
      sykmeldtFnr: sykmeldtDTO.fnr,
      brevArray,
      dialogmoteData: mappedData,
    });

    res.json(mappedData);
  } else {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
export default handler;
