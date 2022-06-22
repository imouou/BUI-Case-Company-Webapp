/**
 * 个人中心模板
 * 默认模块名: pages/main/personal
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module, global) {

    var params = bui.history.getParams(module.id);
    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "contact",
        data: {
            info: null,
            form: {
                contacts: "",
                mobile: "",
                content: ""
            }
        },
        methods: {
            getInfo: function (url) {
                global.ajax({
                    url: url
                }).then((res) => {

                    res.data && (this.info = res.data);
                })
            },
            checkFromMain: function () {
                // 检测是否从main进入联系方式页面
                if (window.location.hash === "#main") {
                    bui.$("#showBack").css("display", "none")
                } else {
                    bui.$("#showBack").css("display", "block")
                }
            },
            checkFormEmpty: function (opt) {
                for (let key in opt) {
                    if (opt[key] == "") {
                        return true;
                    }
                }
                return false;
            },
            reset: function () {
                this.form = {
                    contacts: "",
                    mobile: "",
                    content: ""
                };
                global.hint("表单已重置");
            },
            submit: function () {

                if (this.checkFormEmpty(this.$data.form)) {
                    global.hint("请填写表单所有字段");
                    return false;
                }
                global.ajax({
                    url: global.api.postMessageUrl,    // 自定义留言表单
                    data: this.$data.form,
                    // 测试数据用的get
                    // method: "POST"
                }).then((res) => {
                    // 重置表单
                    this.form = {
                        contacts: "",
                        mobile: "",
                        content: ""
                    };

                    // 输出提醒
                    res.data && global.hint(res.data);
                })
            }
        },
        watch: {},
        computed: {},
        templates: {
            tplInfo: function (data) {

                var html = "";
                if (data) {
                    html = `<li class="bui-btn bui-box">
                            <div class="span1">
                                <div class="bui-value">${data.name}</div>
                            </div>
                        </li>
                        <li class="bui-btn bui-box">
                            <label class="bui-label">营业执照：</label>
                            <div class="span1">
                                <div class="bui-value">${data.blicense}</div>
                            </div>
                        </li>
                        <li class="bui-btn bui-box">
                            <label class="bui-label">地址：</label>
                            <div class="span1">
                                <div class="bui-value">${data.address}</div>
                            </div>
                        </li>
                        <li class="bui-btn bui-box">
                            <label class="bui-label">Email：</label>
                            <div class="span1">
                                <div class="bui-value">${data.email}</div>
                            </div>
                        </li>
                        <li class="bui-btn bui-box">
                            <label class="bui-label">电话：</label>
                            <div class="span1">
                                <div class="bui-value">${data.phone}</div>
                            </div>
                        </li>`;

                } else {
                    html = ""
                }

                return html;
            }
        },
        beforeMount: function () {
            // 数据解析前执行, 修改data的数据示例
            // this.$data.a = 2
        },
        mounted: function () {
            // 数据解析后执行
            this.getInfo(global.api.getInfoCompanyUrl);
            // 如果是从main进入联系方式页面，无需展示后退按钮
            this.checkFromMain();

            if (params.title) {

                this.form.content = "我想咨询" + params.title;
            }
        }
    })

})