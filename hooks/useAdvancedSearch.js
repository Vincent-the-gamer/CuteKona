/**
 * 高级搜索
 */
module.exports = () => {
    /**
     * 枚举值
     */ 
    // Size: 尺寸过滤
    const Size = {
        Exact: 1,
        BiggerThan: 2,
        Smaller: 3
    }

    // Rating: 分级过滤
    const Rating = {
        SafeOnly: 1,
        QuestionableOnly: 2,
        ExplicitOnly: 3,
        QuestionableAndExplicit: 4,
        QuestionableAndSafe: 5
    }

    // Order： 搜索结果排序
    const Order = {
        Score: 1,
        Favorited: 2,
        WidescreenFirst: 3,  // 宽屏在前
        WidescreenLast: 4   // 宽屏在后
    }


    /**
     * 构造url
     * @param {*} tags 搜索的关键词tag
     * @param {*} currentPage 当前页码
     * 
     * 以下参数参考：https://konachan.com/post/advanced_search
     * @param {*} size 图片尺寸过滤条件
     * @param {*} order 按指定顺序过来
     * @param {*} rating 按照分级过滤
     * @returns 
     */
    function buildUrl(
        tags = "", 
        currentPage = 1,
        size,
        order,
        rating
    ){
        let url = currentPage === 1 ? `https://konachan.com/post?tags=${tags}`
                                    : `https://konachan.com/post?page=${currentPage}&tags=${tags}`

        // size
        if(size){
            const { sizeType, width, height } = size
            switch(sizeType){
                case Size.Exact:
                    url += `%20width:${ width }%20height:${ height }`
                    break
                case Size.BiggerThan:
                    url += `%20width:${ width }..%20height:${ height }..`
                    break
                case Size.Smaller:
                    url += `%20width:..${ width }%20height:..${ height }`
                default:
                    break;
            }
        }

        // order
        if(order){
            switch(order){
                case Order.Score:
                    url += "%20order:score"
                    break
                case Order.Favorited:
                    url += "%20order:fav"
                    break
                case Order.WidescreenFirst:
                    url += "%20order:wide"
                    break
                case Order.WidescreenLast:
                    url += "%20order:nonwide"
                    break
                default:
                    break
            }
        }


        // rating
        if(rating){
            switch(rating){
                case Rating.SafeOnly:
                    url += "%20rating:safe"
                    break
                case Rating.QuestionableOnly:
                    url += "%20rating:questionable"
                    break
                case Rating.ExplicitOnly:
                    url += "%20rating:explicit"
                    break
                case Rating.QuestionableAndExplicit:
                    url += "%20rating:questionableplus"
                    break
                case Rating.QuestionableAndSafe:
                    url += "%20rating:questionableless"
                    break
                default:
                    break
            }
        }

        // 符号转义
        url.replaceAll("(","%28")
           .replaceAll(":","%3A")
           .replaceAll(")","%29");

        return url
    }

    return {
        Size,
        Rating,
        Order,
        buildUrl
    }
}