// 全局配置文件，用于定义业务接口及常用方法 ajax,hint 之类的
// 小程序里面的调试，把cache设置为false，不需要缓存
window.loader = bui.loader({
    cache: false
})

// api 配置
loader.global(function (global) {

    // 接口说明：
    // num: 分页大小
    // page: 第几页

    // api的根路径
    let path = "";
    // 正式环境
    // let path = "http://10.7.128.214:8888";

    // 获取轮播图
    let getSlideUrl = path + "json/slide.json";
    // 获取详情页
    let getContentUrl = path + "json/content";

    // 获取分类下的列表接口，传分类id */page/2
    let getListUrl = path + "json/list";
    // 获取单页内容-公司简介
    let getContentCompanyUrl = path + "json/about.json";
    // 获取公司基础信息
    let getInfoCompanyUrl = path + "json/contact.json";
    // 搜索
    let getListSearchUrl = path + "json/search.json";
    let postMessageUrl = path + "json/postmessage.json";


    return {
        api: {
            path: path, // 站点路径
            getSlideUrl: getSlideUrl, // 获取轮播图
            getContentUrl: getContentUrl, // 获取详情内容
            getContentCompanyUrl: getContentCompanyUrl, // 获取公司简介
            getInfoCompanyUrl: getInfoCompanyUrl,   // 获取公司基本信息
            postMessageUrl: postMessageUrl,   // 发送留言
            getListUrl: getListUrl, // 获取内容列表
            getListSearchUrl: getListSearchUrl   // 搜索
        },
        ajax: function (opt) {
            // 全局请求的方法，可以在这里配置一些默认的opt参数，比方token
            return bui.ajax(opt);
        },
        hint: function (content) {
            return bui.hint({
                content: content,
                effect: "fadeInDown",
                position: "center"
            })
        }
    }
});

