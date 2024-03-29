import { NextApiRequest, NextApiResponse } from "next";
import getMockDb, {
  assignNewDbSetup,
  TestScenario,
} from "server/data/mock/getMockDb";
import { getMockSetupForScenario } from "server/data/mock/activeMockData";
import { isDemoOrLocal } from "@/common/publicEnv";
import { TEST_SESSION_ID } from "@/common/api/axios/axios";
import { handleQueryParamError } from "@/server/utils/errors";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isDemoOrLocal) {
    return res.status(404).end();
  }

  if (req.method === "POST") {
    const sessionId = req.headers[TEST_SESSION_ID];

    if (typeof sessionId !== "string") {
      return handleQueryParamError(sessionId);
    }

    const newScenario: TestScenario = req.body;
    assignNewDbSetup(getMockSetupForScenario(newScenario), sessionId);

    res.status(200).end();
  } else {
    res.status(200).json(getMockDb(req).activeTestScenario);
  }
}
