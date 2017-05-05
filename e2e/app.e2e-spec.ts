import { AppChartsPage } from './app.po';

describe('app-charts App', () => {
  let page: AppChartsPage;

  beforeEach(() => {
    page = new AppChartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
