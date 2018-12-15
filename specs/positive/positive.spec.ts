import { expect } from 'chai';
import mainPage from '../../pages/mainPage';

let allCombination: string[][] = [];

describe('all test together', () => {
  before('open test task', () => {
    browser.url('file:///Users/remotetester/Documents/Projects/example/Test_Task.html');
    browser.pause(2000);
  });

  describe('', () => {
    before('get data', () => {
      allCombination = mainPage.getPayTableData();
    });

    // allCombination.forEach(combination => {
    //   it(`Check combination - ${combination[0]}`, () => {});
    // });
    it('', () => {
      mainPage.clickSpinButton();
      browser.pause(1000);
    });
  });
});
