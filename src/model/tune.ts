import {Point} from "./point";
import {Type} from 'class-transformer';
import {TuneInstrument} from "./enums/tuneinstrument";

export class Tune {
  id!: number;
  ownerId!: number;
  title: string = "";
  author: string = "";
  cover: string = "";
  @Type(() => Point)
  points!: Point[];
  sheetWidth!: number;
  sheetHeight!: number;
  pngWidth!: number;
  pngHeight!: number;
  playHeadWidth: number = 18;
  barOffsets!: number[];

  levelNum!: number;
  positionNum!: number;
  instrument: TuneInstrument = TuneInstrument.ACCORDION;
  bestScore: number = 0;
  credits: number = 0;
  selectionRanges!: string;
}
