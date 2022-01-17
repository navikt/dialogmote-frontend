import { Brev } from "@/common/api/types/brevTypes";

const endring = require("./brev/endring");
const referat = require("./brev/referat");
const innkallelse2 = require("./brev/innkallelse2");
const referat2 = require("./brev/referat2");
const innkallelse3 = require("./brev/innkallelse3");
const referat3 = require("./brev/referat3");
const referat4 = require("./brev/referat4"); // Ikke behov
const avlysning = require("./brev/avlysning");

const isDialogmoteMockSetup1: Brev[] = [
  referat,
  referat2,
  referat3,
  referat4,
  avlysning,
  endring,
  innkallelse3,
  innkallelse2,
];

export default isDialogmoteMockSetup1;
