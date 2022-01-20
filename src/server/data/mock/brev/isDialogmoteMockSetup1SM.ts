import { Brev } from "@/common/api/types/brevTypes";

const endring = require("./components/endring");
const referat = require("./components/referat");
const innkallelse2 = require("./components/innkallelse2");
const referat2 = require("./components/referat2");
const innkallelse3 = require("./components/innkallelse3");
const referat3 = require("./components/referat3");
const referat4 = require("./components/referat4"); // Ikke behov
const avlysning = require("./components/avlysning");

const isDialogmoteMockSetup1SM: Brev[] = [
  referat,
  referat2,
  referat3,
  referat4,
  avlysning,
  endring,
  innkallelse3,
  innkallelse2,
];

export default isDialogmoteMockSetup1SM;
