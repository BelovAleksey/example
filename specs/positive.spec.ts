import { expect } from 'chai';
import mainPage from '../pages/mainPage';

describe('all test together', function() {
  before('open test task', function(done) {
    mainPage.open();
  });

  describe('aaa', function() {
    before('get data', function() {});

    it('ccc', function(done) {});

    it('bbb', function() {
      mainPage.clickSpinButton();
      browser.pause(1000);
    });
  });
});
