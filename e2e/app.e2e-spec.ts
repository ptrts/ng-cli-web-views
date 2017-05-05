import { NgCliWebViewsPage } from './app.po';

describe('ng-cli-web-views App', () => {
  let page: NgCliWebViewsPage;

  beforeEach(() => {
    page = new NgCliWebViewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
