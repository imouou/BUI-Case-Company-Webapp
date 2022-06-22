
/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function (require, exports, module, global) {

    var pageview = {
        init() {
            this.tab = this.tabInit();
            this.sidebar = this.sidebarInit();

            // 获取边栏菜单
            this.getNav();
        },
        getNav: async function () {

            let result = await global.ajax({
                url: "json/nav.json"
            })

            loader.delay({
                id: "#sidebar",
                param: {
                    datas: result.data,
                    clickItem: function (item) {
                        bui.hint("点击:" + item.name)

                        switch (item.name) {

                            case "产品中心":
                                // 跳转
                                bui.load({
                                    url: "pages/product/index.html",
                                    param: item
                                })
                                break;
                            case "新闻中心":
                                // 跳转
                                bui.load({
                                    url: "pages/news/index.html",
                                    param: item
                                })
                                break;
                            case "服务案例":
                                // 跳转
                                bui.load({
                                    url: "pages/case/index.html",
                                    param: item
                                })
                                break;
                            case "在线留言":
                            case "联系我们":

                                // 跳转
                                bui.load({
                                    url: "pages/contact/index.html",
                                    param: item
                                })
                                break;
                            default:
                                // 跳转
                                bui.load({
                                    url: "pages/news/detail.html",
                                    param: {
                                        id: item.id
                                    }
                                })
                                break;
                        }

                    }
                }
            });
        },
        sidebarInit() {
            // 侧边栏 js 初始化: 
            var uiSidebar = bui.sidebar({
                id: "#sidebarWrap",
                // handleMove: false,  // 页面不跟着一起移动
                swipe: false, //滑动跟tab滑动冲突，两个只能取一个
                width: 600
            })

            return uiSidebar;
        },
        tabInit() {
            // html:
            // <div id="uiTab" class="bui-tab"></div>
            var uiTab = bui.tab({
                id: "#uiTab",
                position: "bottom",
                iconPosition: "top",
                animate: false,
                // swipe: false, //跟sidebar冲突，只能取一个
                data: [{
                    id: "mainTab0",
                    icon: "icon-home",
                    title: "首页",
                    name: "pages/main/home",
                    param: { type: "news" }
                }, {
                    id: "mainTab1",
                    icon: "icon-menu",
                    title: "产品",
                    name: "pages/product/index",
                    param: { type: "product" },
                }, {
                    id: "mainTab2",
                    icon: "icon-pic",
                    title: "案例",
                    name: "pages/case/index",
                    param: { type: "case" },
                }, {
                    id: "mainTab3",
                    icon: "&#xe678;",
                    title: "联系",
                    name: "pages/contact/index",
                    param: { type: "contact" },
                }
                ]
            })

            return uiTab;
        }
    };


    // 初始化
    pageview.init();

    // 输出模块
    return pageview;

})