class MainPage {
  private spinButton = () => $('//input[@id="spinButton"]');
  private testData = () => $('//input[@id="testdata"]');
  private payTableData = () => $('//table//tbody');
  private tableElements = () => $$('//table//tr');
  private slotData = () => $('//div[@id="slot"]');
  private applicationHeader = () => $('//div[@id="game"]//h3');
  private gameDescription = () => $('//div[@id="paytable"]//span');
  private balance = () => $('//input[@id="balance-value"]');

  open() {
    browser.url('file:///Users/macbook/Documents/Projects/example/Test_Task.html');
    browser.pause(2000);
  }
  isBalanceVisible() {
    return this.balance().isVisible();
  }
  getBalance() {
    return this.balance().getValue();
  }
  clickSpinButton() {
    this.spinButton().click();
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
    let middleRow = '';
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
