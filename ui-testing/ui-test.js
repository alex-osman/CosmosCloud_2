/*
 * TABS
 */
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://www.localhost:4200/home');

    element(by.linkText("Relays")).click();

    var completedAmount = element.all(by.css('.card')).getText();
  });
});

/*
 * ---
 */

