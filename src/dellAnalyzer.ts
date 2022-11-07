import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

import { Analyzer } from './crawler';

interface Course {
  title: string;
  count: number;
}

interface CourseInfo {
  time: number;
  data: Course[];
}

interface Content {
  [propName: string]: Course[];
}

export default class DellAnalyzer implements Analyzer {
  constructor() {}
  private filePath = path.resolve(__dirname, '../data/course.json');
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: Course[] = [];

    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      courseInfos.push({ title, count });
    });

    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  generateJsonContent(courseInfo: CourseInfo, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  /**
   * analyze
   */
  public analyze(rawHtml: string, filePath: string) {
    const courseInfo = this.getCourseInfo(rawHtml);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}
