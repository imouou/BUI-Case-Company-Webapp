loader.define(function (require, exports, module, global) {

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "about",
        data: {
            content: "",
        },
        methods: {
            getCompany: function (url) {
                global.ajax({
                    url: url
                }).then((res) => {
                    this.content = res.data ? res.data.content : "";
                })
            },
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
            this.getCompany(global.api.getContentCompanyUrl);
        }
    })
})