import { Item } from './item';
import { Section } from './section';
import { ɵgetDebugNodeR2 } from '@angular/core';

export class Page {
    constructor(
        public index: number = null,
        public name: string = '',
        public url: string = '',
        public title: string = '',
        public description: String = '',
        public enable: boolean = true,
        public pageLayout: string = 'container-fluid',
        public sections: Array<Section> = [],
        public siteId: string = '',
        public _id: string = '',
        public styles: any = {},
        public password: string = '',
        public permission: string = 'public',
        public publishPage: string = ''
    ) { }

    toServerObject() {
        let page = {
            _id: this._id,
            index: this.index,
            name: this.name,
            url: this.url,
            title: this.title,
            description: this.description,
            enable: this.enable,
            pageLayout: this.pageLayout,
            sections: [],
            styles: this.styles,
            siteId: this.siteId,
            password: this.password,
            permission: this.permission,
        };
        if (this._id == '')
            delete page._id
        this.sections.forEach(s => {
            page.sections.push(s.toServerObject());
        })
        return page;
    }

    static fromServerObject(page) {
        let sections = [];

        if (page.sections[0] != null) {
            page.sections.forEach(s => {
                sections.push(Section.fromServerObject(s));
            });
        }
        let newPage = new Page(page.index, page.name, page.url, page.title, page.description, page.enable, page.pageLayout, sections, page.siteId, page._id, {}, page.password, page.permission);
        return newPage;
    }
}