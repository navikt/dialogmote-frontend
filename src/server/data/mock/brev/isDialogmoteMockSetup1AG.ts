import { Brev } from "@/server/data/types/external/BrevTypes";

const endring = require("./components/endring");
const referat = require("./components/referat");
const innkallelse2 = require("./components/innkallelse2");
const referat2 = require("./components/referat2");
const innkallelse3 = require("./components/innkallelse3");
const referat3 = require("./components/referat3");
const avlysning = require("./components/avlysning");

const isDialogmoteMockSetup1AG: Brev[] = [
  innkallelse2,
  referat,
  referat2,
  referat3,
  avlysning,
  endring,
  innkallelse3,
  innkallelse2,
];

export default isDialogmoteMockSetup1AG;
