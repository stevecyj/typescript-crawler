import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string;
  count: number;
}
class Crawler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHTML = '';

  constructor() {
    this.initSpiderProcess();
  }
  async initSpiderProcess() {
    const rawHtml = await this.getRawHtml();
    this.getCourseInfo(rawHtml);
  }
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];

    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      courseInfos.push({ title, count });
    });
    const result = {
      time: new Date().getTime(),
      data: courseInfos,
    };
    console.log(result);
  }
}

const crawler = new Crawler();
