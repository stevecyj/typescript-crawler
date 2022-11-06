import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import DellAnalyzer from './dellAnalyzer';
class Crawler {
  constructor(private analyzer: any) {
    this.initSpiderProcess();
  }

  private filePath = path.resolve(__dirname, '../data/course.json');
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHTML = '';

  async initSpiderProcess() {
    const rawHtml = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(rawHtml, this.filePath);
    this.writeFile(fileContent);
  }

  private writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent);
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
}

const analyzer = new DellAnalyzer();
const crawler = new Crawler(analyzer);
