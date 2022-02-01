import { DocumentBuilder } from "@/server/data/mock/builders/documentBuilder";
import { DocumentComponentBuilder } from "@/server/data/mock/builders/documentComponentBuilder";

const documentHeaderComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withText(`REFERAT tjo hopp`)
  .build();

const descriptionComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withText("Dette skjedde i møtet")
  .build();

const friskmeldingComponent = new DocumentComponentBuilder()
  .withType("HEADER")
  .withKey("FRISKMELDING_ARBEIDSFORMIDLING")
  .withText("Hoho hei hei hopp")
  .build();

const bestRegardsComponent = new DocumentComponentBuilder()
  .withType("PARAGRAPH")
  .withText("Med hilsen")
  .withText("NAV Staden")
  .withText("Åge Saksbehandler")
  .withText("yolo@nav.no")
  .withText("95959595")
  .build();

export const anotherReferatDocument = new DocumentBuilder()
  .withComponent(documentHeaderComponent)
  .withComponent(descriptionComponent)
  .withComponent(friskmeldingComponent)
  .withComponent(bestRegardsComponent)
  .build();
