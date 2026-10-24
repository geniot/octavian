import {UnlockRecord} from "../unlockrecord";

export class UnlockModel {
  unlockRecords: UnlockRecord[] = [];

  pricePerUnit!: number;
  discountUnits1!: number;
  discountedPricePerUnit1!: number;
  discountUnits2!: number;
  discountedPricePerUnit2!: number;
  discountUnits3!: number;
  discountedPricePerUnit3!: number;

  message!: string | null;
  hasError: boolean = false;
}
