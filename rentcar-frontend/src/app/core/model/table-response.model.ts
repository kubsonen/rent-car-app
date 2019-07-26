export class TableResponse<T> {
  actualPage: number;
  countOfPage: number;
  data: Array<T> = new Array<T>();
}
