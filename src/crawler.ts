import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string;
  count: number;
}
class Crawler {
  constructor() {
    this.getRawHtml();
  }

  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHTML = '';

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getCourseInfo(result.text);
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
