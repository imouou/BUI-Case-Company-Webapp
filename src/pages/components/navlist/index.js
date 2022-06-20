loader.define(function (require, exports, module, global) {

    var props = $.extend(true, { datas: [], clickItem: null }, module.props);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "navlist",
        data: {
            datas: props.datas,
        },
        methods: {
            clickItem(index) {
                let item = this.datas[index] || {};

                props.clickItem && props.clickItem.call(this, item);
            }
        },
        templates: {
            tpl(data) {
                var html = "";
                data.forEach(function (item, index) {
                    html += `<li class="bui-btn bui-box" b-click="navlist.clickItem(${index})">
                        <div class="icon"><img src="${item.icon}" alt=""></div>
                        <div class="span1">${item.name}</div>
                        <i class="icon-listright"></i>
                    </li>`;
                })

                return html;
            }
        },
        mounted: function () {
            // 数据解析后执行
        }
    })
})