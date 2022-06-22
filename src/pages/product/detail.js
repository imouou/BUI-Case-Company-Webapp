loader.define(function (require, exports, module, global) {

    var params = bui.history.getParams(module.id);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "product",
        data: {
            content: "",
            contact: "pages/contact/index.html"
        },
        methods: {
            getContent: function (url) {
                global.ajax({
                    url: url
                }).then((res) => {

                    let data = res.data || {};


                    // 只提取这些字段
                    var field = ["content", "title", "author", "date", "sortname", "ext_color", "ext_price", "ext_type"];
                    if (data) {
                        this.content = bui.unit.filterField(data, field);
                        // 设置跳转的url
                        // false 中文不转码，跳转会自动转
                        this.contact = bui.setUrlParams(this.$data.contact, { title: data.title }, false)
                    }

                    // 获取轮播的数组, 没有多图则展示缩略图
                    if (data.pics) {
                        var pics = data.pics.split(",");

                        pics = pics.map(function (item, index) {
                            return {
                                image: global.api.path + item
                            }
                        })

                        this.slide(pics);
                    } else {
                        this.slide([{ image: global.api.path + data.ico }]);
                    }
                })
            },
            slide: function (data) {
                // 焦点图 js 初始化:
                var uiSlideProduct = bui.slide({
                    id: "#uiSlideProduct",
                    height: 300,
                    autopage: true,
                    cross: true,
                    loop: true,
                    data: data || []
                })
            }
        },
        watch: {},
        computed: {},
        templates: {
            tplContent: function (data) {
                var html = "";
                html += `
                        <div class="bui-panel">
                        <div class="bui-panel-head">${data.title}</div>
                        <div class="bui-panel-main">
                            <ul class="bui-list">
                                <li class="bui-btn bui-box">
                                    <label class="bui-label">类型</label>
                                    <div class="span1">
                                        <div class="bui-value">${data.ext_type}</div>
                                    </div>
                                </li>
                                <li class="bui-btn bui-box">
                                    <label class="bui-label">颜色</label>
                                    <div class="span1">
                                        <div class="bui-value">${data.ext_color}</div>
                                    </div>
                                </li>
                                <li class="bui-btn bui-box">
                                    <label class="bui-label">价格</label>
                                    <div class="span1">
                                        <div class="bui-value">￥${parseFloat(data.ext_price).toFixed(2)}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="bui-panel">
                        <div class="bui-panel-head">产品详情</div>
                        <div class="bui-panel-main">
                            <article class="bui-article">
                                <section>
                                ${data.content}
                                </section>
                            </article>
                        </div>
                    </div>
            `
                return html;
            }
        },
        beforeMount: function () {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function () {
            // 数据解析后执行
            // 测试数据的接口
            let url = global.api.getContentUrl + params.id + ".json";
            this.getContent(url);

        }
    })

})