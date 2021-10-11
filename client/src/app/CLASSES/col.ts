import { Item } from './item';
import { Row } from './row';

export class Col {
  dragOverCol = false
  isColOptions = false
  private _parentRow: Row = null
  constructor(public attributes: any = {},
    public styles: any = {},
    public items: Array<Item> = [],
    public index: number = null,
    public chooseCol: boolean = false,
  ) { }
  get parentRow(): Row {
    return this._parentRow;
  }
  set parentRow(value: Row) {
    this.index = value.cols.length;
    value.cols.push(this);
    this._parentRow = value;
  }
  toServerObject() {
    let col = {
      attributes: Object.assign({}, this.attributes),
      styles: Object.assign({}, this.styles),
      items: [],
      index: this.index,
      _parentRow: null
    };
    col.items = [];
    this.items.forEach(i => {
      col.items.push(i.toServerObject())
    })
    return col;
  }


  copyObject(parentRow) {
    let colCopied = new Col();
    colCopied.styles = this.styles;
    colCopied.attributes = this.attributes;
    colCopied.index = this.index;
    this.items.forEach(i => {
      colCopied.items.push(i.copyObject(i.parentCol));
    });
    colCopied._parentRow = parentRow;
    return colCopied;
  }
  static fromServerObject(col, parentRow): Col {
    let newCol = new Col(col.attributes, Object.assign(col.styles), [], col.index);
    col.items.forEach(item => {
      newCol.items.push(Item.fromServerObject(item, newCol));
    });

    newCol._parentRow = parentRow;
    return newCol;
  }
}