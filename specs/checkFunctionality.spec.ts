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
    it('check that spin button blocked if current balance is zero', function() {
      mainPage.setBalance(0);
      expect(mainPage.isSpinButtonDisabled()).to.be.true;
    });
  });
  describe('check current balance field', function() {
    it('check that current balance field cannot accept negative values', function() {
      mainPage.setBalance(-1);
      expect(mainPage.getBalance()).to.equal(0);
    });
    // I don't have enough information about this app so next steps just my postulate
    it('check that current balance field cannot accept fractional numbers', function() {
      mainPage.setBalance(1.5);
      expect(mainPage.getBalance()).to.equal(1);
    });
    it('check that current balance field cannot accept letters', function() {
      mainPage.setBalance('ab');
      expect(mainPage.getBalance()).to.equal(0);
    });
    it('check that current balance field cannot accept mathematical operation', function() {
      mainPage.setBalance('+');
      expect(mainPage.getBalance()).to.equal(0);
    });
  });
  describe('check test data field', function() {
    //I suppose that in the game participate just digit
    it('check that test field cannot accept letters and special symbols', function() {
      mainPage.setTestData('a+ы@中');
      expect(mainPage.getTestData()).to.equal('');
    });
    //add this test because if you add some symbols to win combo (e.x.  111110'),
    //you'll see five '1' at middle row but you will not win
    it('check that test field cannot accept string longer than 5 letters', function() {
      mainPage.setTestData('111110');
      expect(mainPage.getTestData()).to.equal('11111');
    });
  });
  describe('check paytable combinations', function() {
    beforeEach('set balance to 1', function() {
      //add this action to improve test results analyze
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
