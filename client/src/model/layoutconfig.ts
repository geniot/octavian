export class LayoutConfig {
  columns: Column[] = [
    new Column(true, 25),
    new Column(true, 50),
    new Column(true, 25),
    new Column(true, 50),
    new Column(true, 50)
  ];
}

export class PianoLayoutConfig {
  columns: Column[] = [
    new Column(true, 20),
    new Column(true, 40),
    new Column(true, 40)
  ];
}

class Column {
  visible: boolean;
  size: number;

  constructor(v: boolean, s: number) {
    this.visible = v;
    this.size = s;
  }
}
