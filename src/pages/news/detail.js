loader.define(function (require, exports, module, global) {

    var params = bui.history.getParams(module.id);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "news",
        data: {
            content: {},
        },
        methods: {
            getContent: function (id) {
                global.ajax({
                    url: global.api.getContentUrl + (id || "")
                }).then((res) => {
                    // 只提取这些字段
                    var field = ["content", "title", "author", "date", "sortname", "visits"];
                    if (res.data) {
                        this.content = bui.unit.filterField(res.data, field);
                    }
                })
            }
        },
        watch: {},
        computed: {},
        templates: {
            tplContent: function (data) {
                var html = "";
                html += `<h1>${data.title}</h1>
                <div class="article-info bui-box">
                    <span class="article-from">${data.sortname}</span>
                    <div class="span1"> <i class="icon-time"> ${bui.date.format(data.date, "yyyy-MM-dd")}</i></div>
                    <i class="icon-eye"> ${data.visits}</i>
                </div>
                <section>
                    ${data.content}
                </section>`
                return html;
            }
        },
        mounted: function () {
            // 数据解析后执行

            // this.getContent(params.id);
            // 测试数据
            this.getContent(params.id + ".json");

        }
    })

})