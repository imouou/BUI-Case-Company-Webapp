loader.define(function (require, exports, module, global) {

    var pageview = {};

    pageview.init = function () {
        // 列表控件 js 初始化: 
        var uiList = bui.list({
            id: "#uiListProduct",
            url: global.api.getListUrl + "5.json",// 产品列表,
            pageSize: 5,
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
                console.log(data)
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

    }

    pageview.init();

    return pageview;
})