import {Type} from "class-transformer";
import {Tune} from "../tune";

export class TuneModel {
  @Type(() => Tune)
  tune!: Tune;

  message!: string | null;
  hasError: boolean = false;
}
