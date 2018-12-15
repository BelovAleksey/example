const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data.json'));
import mainPage from '../pages/mainPage';
import { expect } from 'chai';

describe('Check initial state and data', function() {
  before('open test task', function() {
    mainPage.open();
  });

  it('Expect that combinations exist and visible', function() {
    let allCombination: string[][] = [];
    allCombination = mainPage.getPayTableData();
    data.combination = allCombination;
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    expect(data.combination).not.to.be.null;
    expect(mainPage.isPayTableDataVisible()).to.be.true;
  });

  it('Expect that application header is visible and correct', function() {
    expect(mainPage.isApplicationHeaderVisible()).to.be.true;
    expect(mainPage.getApplicationHeader()).to.equal(data.applicationTitle);
  });
  it('Expect that game description is visible and correct', function() {
    expect(mainPage.isGameDescriptionVisible()).to.be.true;
    expect(mainPage.getGameDescription()).to.equal(data.gameDescription);
  });
  it('Expect that start balance is visible and correct', function() {
    expect(mainPage.isBalanceVisible()).to.be.true;
    expect(mainPage.getBalance()).to.equal(data.startBalance);
  });
  it('Expect that there is no slot data', function() {
    expect(mainPage.getSlotData()).to.be.null;
    expect(mainPage.getBalance()).to.equal(data.startBalance);
  });
});
