import {StatsRecord} from "../statsrecord";

export class StatsModel {
  submittedStats!: StatsRecord;
  requestedStats!: StatsRecord[];

  message!: string | null;
  hasError: boolean = false;
}
