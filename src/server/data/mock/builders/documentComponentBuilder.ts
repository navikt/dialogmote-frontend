import {
  DocumentComponent,
  DocumentComponentType,
} from "@/server/data/types/external/BrevTypes";

export class DocumentComponentBuilder {
  private readonly documentComponent: DocumentComponent;

  constructor() {
    this.documentComponent = {
      type: "PARAGRAPH",
      texts: [],
    };
  }

  withType(type: DocumentComponentType): DocumentComponentBuilder {
    this.documentComponent.type = type;
    return this;
  }

  withKey(key: string): DocumentComponentBuilder {
    this.documentComponent.key = key;
    return this;
  }

  withTitle(title: string): DocumentComponentBuilder {
    this.documentComponent.title = title;
    return this;
  }

  withText(text: string): DocumentComponentBuilder {
    this.documentComponent.texts.push(text);
    return this;
  }

  build(): DocumentComponent {
    return this.documentComponent;
  }
}
