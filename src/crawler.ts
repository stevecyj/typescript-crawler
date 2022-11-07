import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import DellAnalyzer from './dellAnalyzer';

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}
class Crawler {
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }

  private filePath = path.resolve(__dirname, '../data/course.json');
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

const secret = 'secretKey';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = new DellAnalyzer();
new Crawler(url, analyzer);
