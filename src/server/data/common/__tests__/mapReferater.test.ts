import { createInnkallelseBrev } from "../../../../tests/fixtures/brev";
import { mapReferater } from "@/server/data/common/mapReferater";
import { infoUrls } from "@/common/constants/InfoUrls";
import { DocumentComponentKey } from "../../../../types/client/brev";

describe("Data mapper for Referat brev", () => {
  it("should only include brev of type Referat", () => {
    const brevList = [
      createInnkallelseBrev({
        uuid: "REFERAT_ENDRET",
        brevType: "REFERAT_ENDRET",
      }),
      createInnkallelseBrev({ uuid: "REFERAT", brevType: "REFERAT" }),
      createInnkallelseBrev({ brevType: "AVLYST" }),
      createInnkallelseBrev({ brevType: "INNKALT" }),
      createInnkallelseBrev({ brevType: "NYTT_TID_STED" }),
    ];

    const mappedReferater = mapReferater(brevList);

    expect(mappedReferater).toHaveLength(2);

    expect(mappedReferater).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ uuid: "REFERAT_ENDRET" }),
        expect.objectContaining({ uuid: "REFERAT" }),
      ])
    );
  });

  it("should map data correctly", () => {
    const referatBrev = createInnkallelseBrev({ brevType: "REFERAT" });
    const referatEndretBrev = createInnkallelseBrev({
      brevType: "REFERAT_ENDRET",
    });

    const validInfoUrls = Object.keys(infoUrls).map(
      (key) => infoUrls[key as DocumentComponentKey]?.url
    );

    const mappedReferat = mapReferater([referatBrev]).pop();
    const mappedReferatEndret = mapReferater([referatEndretBrev]).pop();

    expect(mappedReferat).toEqual(expect.objectContaining({ endring: false }));
    expect(mappedReferatEndret).toEqual(
      expect.objectContaining({ endring: true })
    );

    expect(mappedReferat?.uuid).toEqual(referatBrev.uuid);
    expect(mappedReferat?.createdAt).toEqual(referatBrev.createdAt);
    expect(mappedReferat?.tid).toEqual(referatBrev.tid);
    expect(mappedReferat?.lestDato).toEqual(referatBrev.lestDato);

    mappedReferat?.document.forEach((document, idx) => {
      expect(validInfoUrls).toContain(document?.infoUrl?.url);
      expect(document.type).toEqual(referatBrev.document[idx]?.type);
      expect(document.title).toEqual(referatBrev.document[idx]?.title);
      expect(document.texts).toEqual(referatBrev.document[idx]?.texts);
    });
  });
});
