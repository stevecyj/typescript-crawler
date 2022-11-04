import superagent from 'superagent';
class Crawler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHTML = '';

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.rawHTML = result.text;
  }
  constructor() {
    this.getRawHtml();
  }
}

const crawler = new Crawler();
