import {ComboBoxItem} from '../abstract/combo-box-item';

export class Common implements ComboBoxItem {
  public id: string;
  selected: boolean;
  inEdit: boolean;

  getItemCaption(): string {
    return toString();
  }

  getItemId(): string {
    return this.id;
  }
}
