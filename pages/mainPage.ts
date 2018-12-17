import * as fs from 'fs';
let data = JSON.parse(fs.readFileSync('./data.json').toString());
class MainPage {
  private spinButton = () => $('//input[@id="spinButton"]');
  private testData = () => $('//input[@id="testdata"]');
  private payTableData = () => $('//table//tbody');
  private tableElements = () => $$('//table//tr');
  private slotData = () => $('//div[@id="slot"]');
  private applicationHeader = () => $('//div[@id="game"]//h3');
  private gameDescription = () => $('//div[@id="paytable"]//span');
  private balance = () => $('//input[@id="balance-value"]');
  private winBox = () => $('//div[@id="winbox"]');

  open() {
    browser.url(data.url);
    browser.pause(2000);
  }
  setTestData(data: string) {
    //we need to add blank if length < 5 to exclude random combination changing
    return this.testData().setValue(data.length < 5 ? data + '0' : data);
  }
  getTestData() {
    return this.testData().getValue();
  }
  isWinBoxVisible() {
    return this.winBox().isVisible();
  }
  getWinBoxMessage() {
    return this.winBox().getText();
  }
  getCoinAmountWon() {
    return Number(this.getWinBoxMessage().split(' ')[1]);
  }
  isBalanceVisible() {
    return this.balance().isVisible();
  }
  getBalance() {
    return Number(this.balance().getValue());
  }
  setBalance(count: number | string) {
    return this.balance().setValue(count);
  }
  clickSpinButton() {
    this.spinButton().click();
    //add pause for rendering page
    browser.pause(200);
  }
  isSpinButtonDisabled() {
    return this.spinButton()
      .getHTML()
      .includes('disabled');
  }
  waitSpinButtonEnabled(timeout: number) {
    this.spinButton().waitForEnabled(timeout);
  }

  getSpinButtonText() {
    return this.spinButton().getText();
  }
  isApplicationHeaderVisible() {
    return this.applicationHeader().isVisible();
  }
  getApplicationHeader() {
    return this.applicationHeader().getText();
  }
  isGameDescriptionVisible() {
    return this.gameDescription().isVisible();
  }
  getGameDescription() {
    return this.gameDescription().getText();
  }
  getPayTableData() {
    const tableData = this.payTableData()
      .getText()
      .split('\n');

    let normalizePaytable = [];

    for (const data of tableData) {
      const combinationAndWin = data.replace(/ \+ /g, '').split(' ');
      normalizePaytable.push(combinationAndWin);
    }

    return normalizePaytable;
  }
  isPayTableDataVisible() {
    return this.payTableData().isVisible();
  }
  getSlotData() {
    const data = this.slotData()
      .getText()
      .split('\n');
    return data.length === 1 && data[0] === '' ? null : data;
  }
  getMiddleRow() {
    const data: string[] = this.getSlotData();
    let middleRow: string = '';
    for (let i = 1; i < data.length; i += 3) {
      middleRow += data[i];
    }
    return middleRow;
  }

  getTableElement() {
    console.log(this.tableElements());
    return this.tableElements();
  }
}

export default new MainPage();
