import { PortalInmAdmPage } from './app.po';

describe('portal-inm-adm App', function() {
  let page: PortalInmAdmPage;

  beforeEach(() => {
    page = new PortalInmAdmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
