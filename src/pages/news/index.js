loader.define(function (require, exports, module, global) {

    // html:
    // <div id="uiTabHead" class="bui-tab"></div>
    var uiTabHead = bui.tab({
        id: "#uiTabHead",
        position: "top",
        iconPosition: "left",
        data: [{
            id: "uiTabHead0",
            title: "公司动态",
            name: "pages/components/newslist/index",
            param: { id: "2.json" }
        }, {
            id: "uiTabHead1",
            title: "行业动态",
            name: "pages/components/newslist/index",
            param: { id: "2.json" },
        }
        ]
    })

})