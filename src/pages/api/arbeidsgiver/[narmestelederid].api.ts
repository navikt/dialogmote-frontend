import type { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "@/common/utils/errors/HttpError";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { fetchSykmeldtAG } from "@/server/data/arbeidsgiver/fetchSykmeldtAG";
import { mapDialogmoteDataAG } from "@/server/data/arbeidsgiver/mapDialogmoteDataAG";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  let sykmeldtDTO: Awaited<ReturnType<typeof fetchSykmeldtAG>>;

  try {
    sykmeldtDTO = await fetchSykmeldtAG(req);
  } catch (error) {
    if (error instanceof HttpError && error.code === 404) {
      res.status(404).json({ error: "SYKMELDT_NOT_FOUND" });
      return;
    }

    throw error;
  }

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

    res.json(mappedData);
  } else {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
export default handler;
