loader.define(function (require, exports, module, global) {


    var pageview = {
        init: function () {

            // 是否需要返回
            this.needBack();

            // 初始化分页列表
            this.listInit();

        },
        listInit() {

            // 列表控件 js 初始化: 
            var uiList = bui.list({
                id: "#uiListProduct",
                url: global.api.getListUrl + "5.json",// 产品列表,
                pageSize: 4, // 设置大一点就不会循环加载，测试数据没有分页，一直返回4条
                data: {},
                //如果分页的字段名不一样,通过field重新定义
                field: {
                    page: "page",
                    size: "num",
                    data: "data"
                },
                callback: function (e) { },
                template: function (data) {
                    var html = "";
                    data.forEach(function (el, index) {

                        html += `<li class="bui-btn bui-box" href="pages/product/detail.html?id=${el.id}">
                        <div class="bui-thumbnail"><img src="${el.ico ? (global.api.path + el.ico) : "images/nopic.png"}" alt=""></div>
                        <div class="span1">
                            <h3 class="item-title">${el.title}</h3>
                            <p class="item-text bui-box-text-hide">${el.description}</p>
                        </div>
                    </li>`
                    });

                    return html;
                }
            });

            return uiList;

        },
        needBack: function () {
            let last = bui.history.getLast();

            if (last.name == "pages/product/index") {
                bui.$("#btnback").show();
            } else {
                bui.$("#btnback").hide();
            }
        }
    };

    pageview.init();

    return pageview;
})