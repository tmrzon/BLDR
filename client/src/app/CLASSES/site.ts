import { DbService } from '../SERVICES/db.service';
import { Item } from './item';
import { Page } from './page';
import { Section } from './section';

export class Site {
    public chooseSite: boolean = false;
    public overSite: boolean = false;
    constructor(
        public name: string = '',
        public url: string = '',
        public pages: Array<any> = [],
        public siteId: string = '',
        public logo: string = '',
        public favicon: string = '',
        public screenshot: string = '',
        public generalSetting: any = {
            'simpleStyles': {
                'color': 'black',
                'background-color': 'rgb(0,0,0,0)',
                'text-align': 'center',
                'width': '100%',
                'font-family': 'Roboto',
                'font-wight': 'normal'
            },
            'divStyles': {
                'justify-content': 'center'
            },
            'spanStyles': {
                'width': '100%',
                'display': 'flex',
                'flex-direction': 'column'
            },
            'divStylesHeader': {
                'color': 'black',
                'background-color': '#f0f0f0',
                // 'margin-left':'20px'
            },
            'imgStylesHeader': {

            }
        },
        public header: Item = new Item('header'),
        public _id: string = '',
        public footer: Section = null,
        public notFoundPage: Page = null,
        public globalWidgetsName: Array<any> = [],
        public publishHeader: string = '',
        public publishFooter: string = ''
    ) { }

    toServerObject() {

        let site = {
            _id: this._id,
            name: this.name,
            url: this.url,
            pages: [],
            logo: this.logo,
            favicon: this.favicon,
            screenshot: this.screenshot,
            siteId: this.siteId,
            header: JSON.stringify(this.header.toServerObject()),
            footer: this.footer.toServerObject(),
            generalSetting: JSON.stringify(DbService.generalSettings),
            notFoundPage: this.notFoundPage ? this.notFoundPage.toServerObject() : null,
            globalWidgetsName: JSON.stringify(this.globalWidgetsName),
            publishHeader: this.publishHeader,
            publishFooter: this.publishFooter
        };
        if (!this._id)
            delete site._id
        this.pages.forEach(p => {
            site.pages.push(p.toServerObject());
        })

        return site;
    }
    static fromServerObject(site) {
        let pages = [];

        DbService.generalSettings = JSON.parse(site.generalSetting);
        site.pages.forEach(p => {
            pages.push(Page.fromServerObject(p));
        });
        let footer
        if (site.footer)
            footer = Section.fromServerObject(site.footer)
        else
            footer = this.createDefaultFooterTemplate()
        let header
        if (site.header)
            header = Item.fromServerObject(JSON.parse(site.header), null)
        let notFoundPage
        if (site.notFoundPage)
            notFoundPage = Page.fromServerObject(site.notFoundPage)
        let globalWidgetsName
        if (site.globalWidgetsName)
            globalWidgetsName = JSON.parse(site.globalWidgetsName)
        if (!globalWidgetsName || globalWidgetsName == '[]')
            globalWidgetsName = []
        let newSite = new Site(site.name, site.url, pages, site.siteId, site.logo, '', site.screenshot, JSON.parse(site.generalSetting), header, site._id, footer, notFoundPage, globalWidgetsName, site.publishHeader, site.publishFooter);
        return newSite;
    }
    static createDefaultFooterTemplate() {
        let footer = new Section(1, "footer", '1', '1');

        let p = new Item('p');
        p.textContent = 'The footer of your site will be here...'
        p.styles.simpleStyles['font-size'] = '1.5rem'
        p.styles.divStyles['margin-top'] = '5%'
        p.parentCol = footer.item.rows[0].cols[0];
        return footer
    }

}