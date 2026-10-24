import {StatsRecord} from "../statsrecord";

export class StatsModel {
  submittedStats!: StatsRecord;
  records: Map<string, StatsRecord[]> = new Map([]);
}
