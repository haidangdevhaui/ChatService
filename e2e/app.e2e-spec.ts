import { ChatServicePage } from './app.po';

describe('chat-service App', function() {
  let page: ChatServicePage;

  beforeEach(() => {
    page = new ChatServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
