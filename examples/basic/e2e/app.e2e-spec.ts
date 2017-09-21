import {BasicPage} from "./app.po";

describe('basic App', () => {
    let page: BasicPage;

    beforeEach(() => {
        page = new BasicPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!!');
    });
});
