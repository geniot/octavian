import {Point} from "./point";
import {Type} from 'class-transformer';

export class Tune {
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
  selectionRanges!: string;
}
