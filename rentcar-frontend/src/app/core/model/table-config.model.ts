export class TableConfig {
  private _dragOver: boolean;
  private _index: number;
  private _caption: string;
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

  get caption(): string {
    return this._caption;
  }

  set caption(value: string) {
    this._caption = value;
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
