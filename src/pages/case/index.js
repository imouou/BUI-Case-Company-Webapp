loader.define(function (require, exports, module, global) {

    // 列表控件 js 初始化: 
    var uiList = bui.list({
        id: "#uiListCase",
        url: global.api.getListUrl + "8.json",// 8为案例的模型id
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
            console.log(data)
            var html = "";
            data.forEach(function (el, index) {

                html += `<li class="bui-btn" href="pages/case/detail.html?id=${el.id}">
                    <div class="bui-box-space">
                        <div class="span1">
                            <div class="photo-item">
                                <img src="${el.ico ? global.api.path + el.ico : "images/nopic.png"}" alt="">
                            </div>
                            <div class="photo-info">
                                <h3 class="photo-title">${el.title}</h3>
                                <div class="photo-desc">
                                    <span class="time">${el.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`
            });

            return html;
        }
    });
})
