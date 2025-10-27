export class UnlockRecord {
  levelNum: number = 0;
  posNum: number = 0;
  tuneId: number = 0;
  ownerId: number = 0;
  title!: string;
  author!: string;
  locked: boolean = true;
  selected: boolean = false;
  bestScore: number = 0;
  credits: number = 0;
}
