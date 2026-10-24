export class ChangeEvent {
  value!: number;
  emitter!: any;

  constructor(v: number, e: any) {
    this.value = v;
    this.emitter = e;
  }
}
