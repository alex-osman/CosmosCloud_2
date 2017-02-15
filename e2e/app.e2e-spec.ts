import { CosmosCloudPage } from './app.po';

describe('cosmos-cloud App', function() {
  let page: CosmosCloudPage;

  beforeEach(() => {
    page = new CosmosCloudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
