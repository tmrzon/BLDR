
import { Col } from './col';
import { Item } from './item';

export class Row {
  private _parentItem: Item = null
  constructor(
    public attributes: any = {},
    public cols: Array<Col> = [],
    public index: number = null
  ) { }

  //property to _parentItem
  get parentItem(): Item {
    return this._parentItem;
  }
  set parentItem(value: Item) {
    this.index = value.rows.length;
    value.rows.push(this);
    this._parentItem = value;
  }

  toServerObject() {
    let row = {
      attributes: this.attributes,
      cols: [],
      index: this.index,
      _parentItem: null
    };

    this.cols.forEach(c => {
      row.cols.push(c.toServerObject())
    })
    row._parentItem = null;
    return row;
  }

  copyObject(parentItem) {
    let rowCopied = new Row(Object.assign({}, this.attributes));
    rowCopied.index = this.index;
    this.cols.forEach(c => {
      rowCopied.cols.push(c.copyObject(c.parentRow));
    });
    rowCopied._parentItem = parentItem;
    return rowCopied;
  }

  static fromServerObject(row, parentItem): Row {
    let newRow = new Row(row.attributes, [], row.index);
    row.cols.forEach(col => {
      newRow.cols.push(Col.fromServerObject(col, newRow));
    });
    newRow._parentItem = parentItem;
    return newRow;
  }
}
