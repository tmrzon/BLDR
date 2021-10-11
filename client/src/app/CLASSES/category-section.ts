
export class CategorySection {
    constructor(

        public name: string,
        public img: string,
        public _id: string = ''
    ) { }

    toServerObject() {
        let category = {
            name: this.name,
            _id: this._id,
            img: this.img
        };
        return category;
    }
    static fromServerObject(category) {
        let newCategory = new CategorySection(category.name,category.img, category._id);
        return newCategory;
    }
}
