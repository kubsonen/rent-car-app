export class TableColumn {

  private _caption: string;
  private _field: string;

  constructor(caption: string, field: string) {
    this._caption = caption;
    this._field = field;
  }

  public static defaultCaption(fieldName: string): string {

    let caption = '';
    const letterArray: string[] = Array.from(fieldName);
    letterArray.forEach(letter => {
      if (letter === letter.toUpperCase()) {
        caption += ' ';
      }
      caption += letter.toUpperCase();
    });

    return caption;
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
}
