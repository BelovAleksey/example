class MainPage {
  private spinButton = () => $('//input[@id="spinButton"]');
  private testData = () => $('//input[@id="testdata"]');
  private payTableData = () => $('//table//tbody');
  private slotData = () => $('//div[@id="slot"]');

  clickSpinButton() {
    this.spinButton().click();
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
  getSlotData() {
    return this.slotData()
      .getText()
      .split('\n');
  }
  getMiddleRow() {
    const data: string[] = this.getSlotData();
    let middleRow = '';
    for (let i = 1; i < data.length; i += 3) {
      middleRow += data[i];
    }
    return middleRow;
  }
}

export default new MainPage();
