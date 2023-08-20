<p align="center" style="position:relative;margin:0 auto;">
    <img src=".github/logo.png" alt="logo"
    style="position: relative; width: 80px;"/>
</p>
<h1 align="center">CuteKona</h1>
<p align="center">基于Playwright, 各种瑟瑟图片网站的爬虫</p>

# 前言

由于该项目的特殊性，~~该项目有几率随时被删除，懂自懂。~~

# 目标

还是由于该项目的特殊性，以下网站请自行搜索，这里不贴网址。

目前已实现：
| 网站名  | 备注 |
|    -   |  -  |
| K站 | K 欧 恩 诶 西 诶吃 诶 恩 点com  |
| 未完待续... | 科科... |

# 特性
* K站
    * 全站高级搜索✅
    * 分页爬取✅


# 爬取成果
由于图片都比较大，很多超过4K分辨率，所以只爬取链接, 请自行使用下载工具下载

推荐的下载工具：**Motrix**

[https://github.com/agalwood/Motrix](https://github.com/agalwood/Motrix)

温馨提示，需要魔法，在Motrix中配置代理服务器即可
![proxy](.github/motrixProxy.png)

# 如何使用该程序
直接安装npm发布包

~~~shell
npm install cute-kona
~~~

然后引入，调用函数即可

## 参数和枚举值说明
## 枚举值
后面的参数表格需要用到这里的枚举值
~~~js
// Size: 尺寸过滤
const Size = {
    Exact: 1,  // 尺寸等于输入的宽高
    BiggerThan: 2, // 尺寸大于输入的宽高
    Smaller: 3  // 尺寸小于输入的宽高
}

// Rating: 分级过滤
const Rating = {
    SafeOnly: 1,  // 安全模式
    QuestionableOnly: 2,  // 诶吃模式
    ExplicitOnly: 3,   // 很太模式
    QuestionableAndExplicit: 4,  // 诶吃和很太混合
    QuestionableAndSafe: 5 // 诶吃和安全混合
}

// Order： 搜索结果排序
const Order = {
    Score: 1,  // 评分高的在前
    Favorited: 2,  // 喜欢的在前（应该是要点favorite以后)
    WidescreenFirst: 3,  // 横屏的在前
    WidescreenLast: 4   // 竖屏的在前
}
~~~


## 参数
|    参数   | 是否必须传入 |    说明     |
|    -      |   -     |    -       |
| outputDir | <font color="red">**必须**</font>  | 传入要写入txt的路径（会自动生成文件konachan.txt）例: `./output`|
| tags     | <font color="red">**必须**</font> | 传入要查询的tag 例: `"hoshino_ai"`，则搜索星野爱图片  |
| pages    | <font color="red">**必须**</font> | 传入一个数组，里面是所有要爬取的页码 例: `[1,2,3]`  |
| size    | **非必须** | 根据图片的尺寸大小进行搜索，传入一个对象：`{ sizeType, width, height }`, sizeType为`枚举值Size`，表示尺寸是否小于/等于/大于输入的宽高，width, height为数字，可以不传  |
| order    | **非必须** | 按照指定顺序检索(传入`枚举值Order`)，可以不传  |
| rating    | **非必须** | 按照图片分级检索(传入`枚举值Rating`)，可以不传  |

## 简单搜索

只按照tag和页码进行搜索

~~~js
const { konachan } = require("cute-kona");

/**
 * konachan(outputDir, tags, pages)
 * @param {*} outputDir 传入要写入txt的路径（会自动生成文件）
 * @param {*} tags 传入要查询的tag
 * @param {*} pages 传入一个数组，里面是所有要爬取的页码
 */
konachan("./output", "hoshino_ai", [1])
~~~

## 高级搜索

~~~js
/**
 * konachan(outputDir, tags, pages, size, order, rating)
 * @param {*} outputDir 传入要写入txt的路径（会自动生成文件）
 * @param {*} tags 传入要查询的tag
 * @param {*} pages 传入一个数组，里面是所有要爬取的页码
 * @param {*} size 根据大小搜索，传入一个对象： { sizeType, width, height }, sizeType为枚举值Size，表示尺寸是否小于/等于/大于输入的宽高，width, height为数字，可以不传
 * @param {*} order 按照指定顺序检索(传入枚举值)，可以不传
 * @param {*} rating 按照图片分级检索(传入枚举值)，可以不传
 */
const { konachan, Size, Rating, Order } = require("cute-kona")

konachan("./output", "hoshino_ai", [1], {
    width: 1000,
    height: 1000,
    sizeType: Size.BiggerThan
}, Order.Score, Rating.QuestionableAndExplicit)
~~~

## 使用代理

若要使用代理，请对代理进行配置

~~~js
const { konachan, Size, Rating, Order, proxy } = require("cute-kona")

proxy.setProxy("http://xxx.xxx.com:1234","username", "password")
// 或者
// proxy.setProxy("http://xxx.xxx.com:1234")

// 这时候打开的浏览器就会使用代理服务器
konachan("./output", "hoshino_ai", [1], {
    width: 1000,
    height: 1000,
    sizeType: Size.BiggerThan
}, Order.Score, Rating.QuestionableAndExplicit)
~~~