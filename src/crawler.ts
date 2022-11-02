class Crawler {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  constructor() {
    console.log('constructor')
  }
}

const crawler = new Crawler()
