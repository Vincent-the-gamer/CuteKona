/**
 * 获取Konachan图片
 */
const fs = require("fs");
const useAdvancedSearch = require("./useAdvancedSearch");
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

        const noPic = await playwrightPage.getByText('Nobody here but us chickens!');

        // 判断nobody here...的标签个数，如果为0则不存在，否则大于0，表示存在
        const noPicTagCount = await noPic.count();

        if(noPicTagCount > 0){
            console.log("没有找到图片，请更换关键词重新搜索。")
            const mayYouMeant = await playwrightPage.getByText('Maybe you meant: nagatoro_hayase');
            const mayYouMeantCount = await mayYouMeant.count();
            if(mayYouMeantCount > 0){
                const tagHint = await playwrightPage.getByRole('link', { name: 'nagatoro_hayase' });
                const tagHintCount = await tagHint.count();
                if(tagHintCount > 0){
                    const hintText = await tagHint.evaluate((element, from) => element.innerText)
                    console.log("也许你想要搜索：", hintText)
                }
            }
            return false
        } else {
            const largeimgs = await playwrightPage.$$('a[class*="largeimg"]'); // 包含largeimg class的所有a标签

            for (let imgDom of largeimgs) {
                const result = await imgDom.evaluate((target, from) => target.href)
                imgUrls.push(result)
            }
    
            return true
        }
    }


    // 结果写入文件
    async function writeResult(outputDir){
        // 写入文件
        fs.exists(outputDir, (exists) => {
            // 路径不存在则创建
            if (!exists) {
                fs.mkdir(outputDir, (err) => {
                    if (err) {
                        throw err
                    }
                })
            }
            // 结果写入文件
            fs.writeFile(`${outputDir}/konachan.txt`, imgUrls.join("\n"), (err) => {
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