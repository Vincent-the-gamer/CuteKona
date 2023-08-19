const { chromium } = require('playwright');
const useKonachanFetch = require("../hooks/konachan/useKonachanFetch");

/**
 * Konachan爬取主函数
 * @param {*} tags 传入要查询的tag
 * @param {*} pages 传入一个数组，里面是所有要爬取的页码
 * @param {*} size 根据大小搜索，传入一个对象： { sizeType, width, height }, sizeType为枚举值，width, height为数字，可以不传
 * @param {*} order 按照指定顺序检索(传入枚举值)，可以不传
 * @param {*} rating 按照图片分级检索(传入枚举值)，可以不传
 */
module.exports = async (
  tags = "",
  pages = [1],
  size,
  order,
  rating
) => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: {
      height: 720,
      width: 1280
    }
  });

  const page = await context.newPage();

  const { getKonachanPics, writeResult } = useKonachanFetch(page);

  for (let page of pages) {
    const isSuccess = await getKonachanPics(tags, page, size, order, rating)
    isSuccess ? writeResult() : console.log("获取图片失败！")
  }
  

  // ---------------------
  await context.close();
  await browser.close();
}