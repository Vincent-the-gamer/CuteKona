const { chromium } = require('playwright');
const useKonachanFetch = require("../hooks/konachan/useKonachanFetch");
const PlaywrightProxy = require('./PlaywrightProxy');

// 代理
const proxy = new PlaywrightProxy();

/**
 * cutekona(outputDir, tags, pages, size, order, rating)
 * 主函数
 * @param {*} outputDir 传入要写入txt的路径（会自动生成文件）
 * @param {*} tags 传入要查询的tag
 * @param {*} pages 传入一个数组，里面是所有要爬取的页码
 * @param {*} size 根据大小搜索，传入一个对象： { sizeType, width, height }, 
 * sizeType为枚举值Size，表示尺寸是否小于/等于/大于输入的宽高，width, height为数字，可以不传
 * @param {*} order 按照指定顺序检索(传入枚举值)，可以不传
 * @param {*} rating 按照图片分级检索(传入枚举值)，可以不传
 */
async function konachan(
  outputDir,
  tags = "",
  pages = [1],
  size,
  order,
  rating
){
  // 读取代理配置
  let launchProxy = undefined
  
  if(proxy.server){
    let username = undefined
    let password = undefined
    if(proxy.username){
      username = proxy.username;
    }
    if(proxy.password){
      password = proxy.password
    }
    launchProxy = {
      server: proxy.server,
      username: proxy.username,
      password: proxy.password
    }
  } 

  const launchOptions = {
    headless: false,
    proxy: launchProxy
  }
  const browser = await chromium.launch(launchOptions);

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
    isSuccess ? writeResult(outputDir) : console.log("获取图片失败！")
  }
  

  // ---------------------
  await context.close();
  await browser.close();
}


module.exports = {
  konachan,
  proxy
}