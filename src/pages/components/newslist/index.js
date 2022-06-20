loader.define(function (require, exports, module, global) {

    let params = bui.history.getParams(module.id);

    // 列表控件 js 初始化: 
    let uiList = bui.list({
        id: `#${module.id} .bui-scroll`,
        url: global.api.getListUrl + (params.id || "5.json"),// 产品列表,
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
            data.forEach(function (el, index) {

                html += `<li class="bui-btn bui-box" href="pages/news/detail.html?id=${el.id}">
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
})