import { DocumentBuilder } from "@/server/data/mock/builders/documentBuilder";
import { DocumentComponentBuilder } from "@/server/data/mock/builders/documentComponentBuilder";

const documentHeaderComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withText(`REFERAT hei hei`)
  .build();

const descriptionComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withText("Dette skjedde i møtet")
  .build();

const okonomiskStotteComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withKey("OKONOMISK_STOTTE")
  .withText("Noe om økonomi, ting og tang.")
  .build();

const avklaringArbeidsevneComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withKey("AVKLARING_ARBEIDSEVNE")
  .withText("Noe om avklaring av arbeidsevne, mer ting og tang.")
  .build();

const bestRegardsComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Med hilsen")
  .withText("NAV Staden")
  .withText("Kari Saksbehandler")
  .withText("kari@nav.no")
  .withText("99998888")
  .build();

export const referatDocument = new DocumentBuilder()
  .withComponent(documentHeaderComponent)
  .withComponent(descriptionComponent)
  .withComponent(okonomiskStotteComponent)
  .withComponent(avklaringArbeidsevneComponent)
  .withComponent(bestRegardsComponent)
  .build();
