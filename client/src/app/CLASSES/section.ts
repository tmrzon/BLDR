import { Item } from './item';
import { DbService } from 'src/app/SERVICES/db.service';

export class Section {

  public item: Item
  constructor(

    public index: number = null,
    public name: string = '',
    public pageId: string = '',
    public categoryId: string = '',
    public _id: string = '') {

    this.item = Item.fromServerObject(DbService.createGrid({ gridType: 'One' }).toServerObject(), this);
  }

  toServerObject() {
    let section = {
      index: this.index,
      name: this.name,
      item: JSON.stringify(this.item.toServerObject()),
      pageId: this.pageId,
      categoryId: null,
      _id: this._id
    };
    if (this.name != 'footer')
      delete section._id
    else 
      section.pageId=null
    return section;
  }

  static fromServerObject(section) {

    let newSection = new Section(section.index, section.name, section.pageId, section.categoryId, section._id);
    if (section.item)
      newSection.item = Item.fromServerObject(JSON.parse(section.item), newSection)
    return newSection;
  }
}