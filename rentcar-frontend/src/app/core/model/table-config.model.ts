export class TableConfig {
  private _dragOver: boolean;
  private _index: number;
  private _field: string;
  private _visible: boolean;

  get dragOver(): boolean {
    return this._dragOver;
  }

  set dragOver(value: boolean) {
    this._dragOver = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get field(): string {
    return this._field;
  }

  set field(value: string) {
    this._field = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }
}
