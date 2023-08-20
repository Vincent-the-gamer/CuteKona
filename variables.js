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

module.exports = {
    Size, Rating, Order
}