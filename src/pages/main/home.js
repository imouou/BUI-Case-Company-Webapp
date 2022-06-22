loader.define(function (require, exports, module, global) {

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "home",
        data: {
            about: "",
            product: [],
            article: [],
        },
        methods: {
            openSide: function () {
                // 获取父页面组件
                var main = bui.history.getLast("exports");

                main.sidebar.open();
            },
            getCompany: function () {
                global.ajax({
                    url: global.api.getContentCompanyUrl
                }).then((res) => {

                    this.about = res.data ? res.data.description : "";
                })
            },
            getProduct: function (url) {
                global.ajax({
                    url: url
                }).then((res) => {

                    this.product = res.data;
                })
            },
            slide: function (url) {

                // 焦点图 js 初始化:
                let uiSlide = bui.slide({
                    id: "#uiSlide",
                    height: 240,
                    autoplay: true,
                    autopage: true,
                    loop: true,
                    data: []
                })
                // 获取轮播图的数据
                global.ajax({
                    url: url
                }).then(function (res) {

                    let data = res.data || [];
                    // 处理成轮播图需要的数据
                    data = data.map(function (item, index) {
                        // 需要跳转则加url
                        return {
                            // url:"pages/product/detail?id="+item.id,
                            image: global.api.path + item.pic
                        }
                    })

                    uiSlide.option("data", data);
                })
            },
            newsList: function (url) {
                global.ajax({
                    url: url
                }).then((res) => {

                    this.article = res.data;
                })

            }
        },
        watch: {},
        computed: {},
        templates: {
            tplProduct: function (data) {
                var html = "";
                data.forEach(function (el, index) {
                    html += `<li class="bui-btn" href="pages/product/detail.html?id=${el.id}">
                        <div class="bui-thumbnail">
                            <img src="${el.ico ? (global.api.path + el.ico) : "images/about-img.jpg"}" alt="">
                        </div>
                        <h3 class="bui-text-hide">${el.title}</h3>
                    </li>`
                })

                return html;
            },
            tplArticle: function (data, res) {
                var html = "";
                if (data && data.length) {
                    data.forEach(function (el, index) {
                        html += `<li class="bui-btn bui-box" href="pages/news/detail.html?id=${el.id}">
                        <div class="bui-thumbnail"><img src="${el.ico ? el.ico : "images/nopic.png"}" alt=""></div>
                        <div class="span1">
                            <h3 class="item-title bui-text-hide">${el.title}</h3>
                            <p class="item-text">${el.author}</p>
                        </div>
                    </li>`

                    })
                } else {
                    html = `<li class="bui-btn bui-box">暂无新闻</li>`
                }

                return html;
            }
        },
        beforeMount: function () {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function () {
            // 初始化轮播图
            this.slide(global.api.getSlideUrl);
            // 初始化新闻列表
            this.newsList(global.api.getListUrl + "2.json");
            // 获取公司简介
            this.getCompany(global.api.getContentCompanyUrl);
            // 获取产品列表
            this.getProduct(global.api.getListUrl + "5.json");
        }
    })

})