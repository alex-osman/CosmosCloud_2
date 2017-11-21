/*
 * General
 */
describe('General', function() {
  it('Goto Relays Tab', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/dashboard');
    element(by.partialLinkText('Relay')).click();
    expect(browser.getCurrentUrl()).toEqual('http://www.localhost:4200/relay');
  });

  it('Goto Indicator Tab', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/dashboard');
    element(by.partialLinkText('Indicator')).click();
    expect(browser.getCurrentUrl()).toEqual('http://www.localhost:4200/indicator');
  });

  it('Goto Alarm Tab', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/dashboard');
    element(by.partialLinkText('Alarm')).click();
    expect(browser.getCurrentUrl()).toEqual('http://www.localhost:4200/alarm');
  });

  it('Goto Room Setup Tab', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/dashboard');
    element(by.partialLinkText('Room Setup')).click();
    expect(browser.getCurrentUrl()).toEqual('http://www.localhost:4200/room-setup');
  });

  it('Goto Fileshare Tab', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/dashboard');
    element(by.partialLinkText('Fileshare')).click();
    expect(browser.getCurrentUrl()).toEqual('http://www.localhost:4200/fileshare');
  });
});

/*
 * Relay
 */
describe('Relay', function() {
  it('Cancel editing room', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/room-setup');

    element.all(by.partialButtonText('Save')).count().then(function (sizeBefore) {
      expect(sizeBefore).toEqual(0);
      element(by.partialButtonText('Edit')).click();

      element.all(by.partialButtonText('Save')).count().then(function (sizeAfterEdit) {
        expect(sizeAfterEdit).toEqual(1);
        element(by.partialButtonText('Cancel')).click();

        element.all(by.className('Save')).count().then(function (sizeAfterCancel) {
          expect(sizeBefore).toEqual(sizeAfterCancel);
        });
      });
    });
  });

  it('toggles lights', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/relay/10.0.0.98/toggle/');
  });

  // TODO: Test "Edit" and change text, then "Save" and make sure the text updates
  // TODO: Test "All On" (Will only work if connected to pi)
  // TODO: Test "All Off" (Will only work if connected to pi)
  // TODO: Test "<PowerButton>" (Will only work if connected to pi)
});

/*
 * Indicator
 */
describe('Indicator', function() {
  // TODO: Test changing the color of an indicator light (Test the card numbers change)
});

/*
 * Alarm
 */
describe('Alarm', function() {
  it('Add alarm', function() {
    browser.ignoreSynchronization = false;
    browser.get('http://www.localhost:4200/alarm');
    element.all(by.className('card')).count().then(function (sizeBefore) {
      element(by.partialButtonText('Add Alarm')).click();

      element.all(by.className('card')).count().then(function (sizeAfter) {
        expect(sizeAfter).toEqual(sizeBefore + 1);
      });
    });
  });

  it('Cancel editing alarm', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/room-setup');

    element.all(by.partialButtonText('Save')).count().then(function (sizeBefore) {
      expect(sizeBefore).toEqual(0);
      element(by.partialButtonText('Edit')).click();

      element.all(by.partialButtonText('Save')).count().then(function (sizeAfterEdit) {
        expect(sizeAfterEdit).toEqual(1);
        element(by.partialButtonText('Cancel')).click();

        element.all(by.className('Save')).count().then(function (sizeAfterCancel) {
          expect(sizeBefore).toEqual(sizeAfterCancel);
        });
      });
    });
  });

  it('Turn on alarm', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/alarm');
    element.all(by.className('fa-toggle-on')).count().then(function (numberAlarmsOnBefore) {
      element(by.className('fa-toggle-off')).click();

      element.all(by.className('fa-toggle-on')).count().then(function (numberAlarmsOnAfter) {
        expect(numberAlarmsOnAfter).toEqual(numberAlarmsOnBefore + 1);
      });
    });
  });

  // TODO: Test editing the name of a alarm
  // TODO: Test editing the time of a alarm
  // TODO: Test deleting an alarm
});

/*
 * Room Setup
 * - Can't automate the creation of a room with accurate coordinates
 */
describe('Room Setup', function() {
  it('Setup a new room (without coordinates)', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/room-setup');
    element(by.xpath("//input[@type='text']")).sendKeys('test');
    element(by.partialButtonText('Setup New Room')).click();

    element.all(by.className('card')).count().then(function (sizeBefore) {
      element(by.partialButtonText('Finish!')).click();

      element.all(by.className('card')).count().then(function (sizeAfter) {
        expect(sizeAfter).toEqual(sizeBefore + 1);
      });
    });
  });

  it('Cancel editing room', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/room-setup');

    element.all(by.partialButtonText('Save')).count().then(function (sizeBefore) {
      expect(sizeBefore).toEqual(0);
      element(by.partialButtonText('Edit')).click();

      element.all(by.partialButtonText('Save')).count().then(function (sizeAfterEdit) {
        expect(sizeAfterEdit).toEqual(1);
        element(by.partialButtonText('Cancel')).click();

        element.all(by.className('Save')).count().then(function (sizeAfterCancel) {
          expect(sizeBefore).toEqual(sizeAfterCancel);
        });
      });
    });
  });

  it('Delete room', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://www.localhost:4200/room-setup');

    element.all(by.className('card')).count().then(function (sizeBefore) {
      element(by.partialButtonText('Delete')).click();

      element.all(by.className('card')).count().then(function (sizeAfter) {
        expect(sizeAfter).toEqual(sizeBefore - 1);
      });
    });
  });
});

/*
 * Fileshare
 */
describe('Fileshare', function() {
  // TODO: Test upload of a ducument (Might not be possible)
  // TODO: Test delete of a ducument (Might not be possible)
  // TODO: Test cancel of an uploading document (Might not be possible)
});

