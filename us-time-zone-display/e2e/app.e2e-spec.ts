import { UsTimeZoneDisplayPage } from './app.po';

describe('us-time-zone-display App', () => {
  let page: UsTimeZoneDisplayPage;

  beforeEach(() => {
    page = new UsTimeZoneDisplayPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
