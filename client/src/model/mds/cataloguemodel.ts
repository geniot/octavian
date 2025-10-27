import {Type} from "class-transformer";
import {Tune} from "../tune";

export class CatalogueModel {
  @Type(() => Map<number, Tune>)
  requestedTunes: Map<string, Tune> = new Map();

  message!: string | null;
  hasError: boolean = false;
}
