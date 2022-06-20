loader.define(function (require, exports, module, global) {

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "search",
        data: {
            content: [],
        },
        methods: {
            getSearchList: function (keyword) {
                global.ajax({
                    url: global.api.getListSearchUrl,
                    // method:"POST",
                    data: {
                        keyword: keyword,
                        // scode: 2, // 指定分类 
                        // field: 2, // 指定字段 
                        // fuzzy: 0, // 关闭模糊搜索 
                    }
                }).then((res) => {

                    this.content.$replace(res.data)
                })
            },
            searchbar: function () {
                var that = this;
                var uiSearchbar = bui.searchbar({
                    id: "#searchbar",
                    onInput: function (ui, keyword) {
                        //实时搜索
                        // console.log(++n)
                    },
                    onRemove: function (ui, keyword) {
                        //删除关键词需要做什么其它处理
                        // console.log(keyword);
                        that.content.$empty();
                    },
                    callback: function (ui, keyword) {

                        // 
                        that.getSearchList(keyword);
                    }

                });

            }
        },
        watch: {},
        computed: {},
        templates: {
            tplContent: function (data) {
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
        },
        beforeMount: function () {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function () {
            // 数据解析后执行
            this.searchbar();
        }
    })
})