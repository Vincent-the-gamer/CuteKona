const { chromium } = require('playwright');
const useKonachanFetch = require("../hooks/konachan/useKonachanFetch");

(async () => {
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

  // for (let i = 1; i <= 2; i++) {
  //   await getKonachanPics("rem_(re:zero)", i)
  // }
  const isSuccess = await getKonachanPics("hayase_nagatoro", 1)

  isSuccess ? writeResult() : console.log("获取图片失败！")
  

  // ---------------------
  await context.close();
  await browser.close();
})();