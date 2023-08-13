/**
 * 获取Konachan图片
 */
const fs = require("fs");
const useAdvancedSearch = require("../hooks/useAdvancedSearch");
const { buildUrl } = useAdvancedSearch();

// 传入 Playwright 的 page 对象
module.exports = (playwrightPage) => {
    imgUrls = []

    async function getKonachanPics(
        tags = "",
        currentPage = 1,
        size,
        order,
        rating
    ) {
        const url = buildUrl(tags, currentPage, size, order, rating)

        await playwrightPage.goto(url);

        const largeimgs = await playwrightPage.$$('a[class*="largeimg"]'); // 包含largeimg class的所有a标签

        for (let imgDom of largeimgs) {
            const result = await imgDom.evaluate((target, from) => target.href)
            imgUrls.push(result)
        }
    }

    // 结果写入文件
    async function writeResult(){
        // 写入文件
        fs.exists("../output", (exists) => {
            // 路径不存在则创建
            if (!exists) {
                fs.mkdir("../output", (err) => {
                    if (err) {
                        throw err
                    }
                })
            }
            // 结果写入文件
            fs.writeFile('../output/konachan.txt', imgUrls.join("\n"), (err) => {
                if (err) {
                    throw err
                } else {
                    console.log('konachan.txt文件写入成功')
                }
            })
        });
    }


    return {
        getKonachanPics,
        writeResult
    }
}