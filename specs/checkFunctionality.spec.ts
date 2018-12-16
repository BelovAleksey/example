import * as fs from 'fs';
import { expect } from 'chai';
import mainPage from '../pages/mainPage';
let data = JSON.parse(fs.readFileSync('./data.json').toString());

describe('Cheking all functionality', function() {
  before('open test task', function() {
    mainPage.open();
  });
  beforeEach('wait spin button enabled', function() {
    mainPage.waitSpinButtonEnabled(6000);
  });
  afterEach('save screenshot', function() {
    if (this.currentTest.state !== 'passed') {
      browser.saveScreenshot();
    }
  });

  describe('check spin button', function() {
    it('check balance changing after clicking on spin button', function() {
      const initialBalance: number = mainPage.getBalance();
      mainPage.clickSpinButton();
      const changedBalance: number = mainPage.getBalance();
      const win = mainPage.isWinBoxVisible();
      const coinCount: number = win ? mainPage.getCoinAmountWon() : 0;
      expect(initialBalance - 1 + coinCount).to.equal(changedBalance);
    });

    it('check slot data changing after clicking on spin button', function() {
      const initialSlotData: string[] = mainPage.getSlotData();
      mainPage.clickSpinButton();
      const changedSlotData: string[] = mainPage.getSlotData();
      expect(initialSlotData).to.not.equal(changedSlotData);
    });
    it.skip('check that spin button blocked if current balance is zero', function() {
      mainPage.setBalance(0);
      expect(mainPage.isSpinButtonDisabled()).to.be.true;
    });
  });
  describe.skip('check current balance field', function() {
    it('check that current balance field cannot accept negative values', function() {
      mainPage.setBalance(-1);
      expect(mainPage.getBalance()).to.equal(0);
    });
  });
  describe('check paytable combinations', function() {
    beforeEach('set balance to 1', function() {
      //add this action to improve data analyze
      mainPage.setBalance(1);
    });
    data.payTable.forEach(line => {
      it(`check combination - ${line[0]}`, function() {
        const balance: number = mainPage.getBalance();
        const combination: string = line[0];
        const expectedWin: number = Number(line[1]);
        mainPage.setTestData(combination);
        mainPage.clickSpinButton();
        const changedBalance: number = mainPage.getBalance();
        expect(mainPage.getMiddleRow()).to.include(combination);
        expect(changedBalance).to.equal(expectedWin + balance - 1);
        expect(mainPage.isWinBoxVisible()).to.be.true;
        expect(mainPage.getCoinAmountWon()).to.be.equal(expectedWin);
      });
    });
  });
});
