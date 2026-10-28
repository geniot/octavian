import {Type} from "class-transformer";
import {Point} from "../point";

export class TuneModel {
  title: string = "";
  author: string = "";
  @Type(() => Point)
  points!: Point[];
  sheetWidth!: number;
  sheetHeight!: number;
  pngWidth!: number;
  pngHeight!: number;
  playHeadWidth: number = 18;
  barOffsets!: number[];
  selectionRanges!: number[];
}
