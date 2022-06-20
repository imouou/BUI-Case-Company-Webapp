loader.define(function (require, exports, module, global) {

    var params = bui.history.getParams(module.id);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "case",
        data: {
            title: "",
            content: "",
        },
        methods: {
            getContent: function (id) {
                global.ajax({
                    url: global.api.getContentUrl + id
                }).then((res) => {
                    console.log(res)
                    let data = res.data || {};
                    this.title = data.title;
                    this.content = data.content;

                    // 获取轮播的数组
                    if (data.pics) {
                        var pics = data.pics.split(",");

                        pics = pics.map(function (item, index) {
                            return {
                                image: global.api.path + item
                            }
                        })

                        this.slide(pics);
                    }
                })
            },
            slide: function (data) {
                // 焦点图 js 初始化:
                var uiSlideCase = bui.slide({
                    id: "#uiSlideCase",
                    height: 380,
                    autopage: true,
                    loop: true,
                    data: data || []
                })
            }
        },
        watch: {},
        computed: {},
        templates: {},
        beforeMount: function () {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function () {
            // 数据解析后执行

            // this.getContent(params.id);
            // 测试数据
            this.getContent(params.id + ".json");

        }
    })

})