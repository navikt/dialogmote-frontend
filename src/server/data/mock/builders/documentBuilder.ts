import { DocumentComponent } from "@/server/data/types/external/BrevTypes";

export class DocumentBuilder {
  private readonly document: DocumentComponent[];

  constructor() {
    this.document = [];
  }

  withComponent(component: DocumentComponent): DocumentBuilder {
    this.document.push(component);
    return this;
  }

  build(): DocumentComponent[] {
    return this.document;
  }
}
