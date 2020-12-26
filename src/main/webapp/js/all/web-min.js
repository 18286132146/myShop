!function () {
    window.SID = (new Date).getTime();
    var t, e, n, i, a, o, r = document.location;
    r.protocol, r.host, r.pathname, window.urls = document.location.href, window.basePath = location.href.match(/[a-zA-Z0-9:_./\-]*\/page\//)[0].replace("/page/", ""), window._getParameter = function (t, e) {
        var n = String(e || r).match(new RegExp("[?&]" + t + "=([^&]*)(&?)", "i"));
        return n ? n[1] : null
    }, window._getParameter, window.__pageParam, window.FAST = !0, window.Zepto = $, window.Device = (t = {}, n = (e = navigator.userAgent).match(/(Android);?[\s\/]+([\d.]+)?/), i = e.match(/(iPad).*OS\s([\d_]+)/), a = e.match(/(iPod)(.*OS\s([\d_]+))?/), o = !i && e.match(/(iPhone\sOS)\s([\d_]+)/), t.ios = t.android = t.iphone = t.ipad = !1, t.os = "web", n && (t.os = "android", t.osVersion = n[2], t.android = !0), (i || o || a) && (t.os = "iphone", t.ios = !0), o && !a && (t.osVersion = o[2].replace(/_/g, "."), t.iphone = !0), i && (t.osVersion = i[2].replace(/_/g, "."), t.ipad = !0), a && (t.osVersion = a[3] ? a[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t)
}();
var YT = {
    idSeed: 1e4, id: function () {
        return "yt_gen_" + ++YT.idSeed
    }, emptyFn: function () {
    }, log: console && DEBUG ? console : {
        info: function () {
        }, debug: function () {
        }, warn: function () {
        }, error: function () {
        }
    }, namespace: function () {
        var e, n = null;
        return YT.each(arguments, function (t) {
            e = t.split("."), n = window[e[0]] = window[e[0]] || {}, YT.each(e.slice(1), function (t) {
                n = n[t] = n[t] || {}
            })
        }), n
    }, apply: function (t, e, n) {
        if (n && YT.apply(t, n), t && e && YT.isObject(e)) for (var i in e) t[i] = e[i];
        return t
    }, applyIf: function (t, e) {
        if (t) for (var n in e) YT.isDefined(t[n]) || (t[n] = e[n]);
        return t
    }, extend: function () {
        var r = Object.prototype.constructor, s = function (t) {
            for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e])
        };
        return function (e, t, n) {
            if (YT.isObject(t) && (n = t, t = e, e = n.constructor !== r ? n.constructor : function () {
                    t.apply(this, arguments)
                }), !t) return null;
            var i, a = function () {
            }, o = t.prototype;
            return a.prototype = o, (((i = e.prototype = new a).constructor = e).superclass = o).constructor === r && (o.constructor = t), e.override = function (t) {
                YT.override(e, t)
            }, i.override = s, i.proto = i, e.override(n), e.extend = function (t) {
                return YT.extend(e, t)
            }, e
        }
    }(), override: function (t, e) {
        YT.apply(t.prototype, e)
    }, toString: function (t) {
        return Object.prototype.toString.apply(t)
    }, isDefined: function (t) {
        return void 0 !== t
    }, isEmpty: function (t, e) {
        return null == t || "NULL" === String(t).toUpperCase() || YT.isArray(t) && !t.length || !e && "" === t
    }, isArray: function (t) {
        return "[object Array]" === YT.toString(t)
    }, isDate: function (t) {
        return "[object Date]" === YT.toString(t)
    }, isObject: function (t) {
        return !!t && "[object Object]" === YT.toString(t)
    }, isFunction: function (t) {
        return "[object Function]" === YT.toString(t)
    }, isNumber: function (t) {
        return "number" == typeof t && isFinite(t)
    }, isString: function (t) {
        return "string" == typeof t
    }, isBoolean: function (t) {
        return "boolean" == typeof t
    }, isPrimitive: function (t) {
        return YT.isString(t) || YT.isNumber(t) || YT.isBoolean(t)
    }, isIterable: function (t) {
        return !(!t || "string" == typeof t) && YT.isDefined(t.length)
    }, isUrl: function (t) {
        return /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST|127.0.0.1))\/?)/i.test(t)
    }, getRandom: function (t) {
        var e = "";
        if (t && 0 < t) for (var n = 0; n < t; n++) e += Math.floor(10 * Math.random());
        return e
    }, setParameters: function (t) {
        YT._data = t
    }, getParameters: function () {
        return YT._data || {}
    }, clearParameters: function () {
        YT._data = {}
    }, each: function (t, e, n) {
        if (!YT.isEmpty(t)) if (YT.isDefined(n) || (n = t), YT.isObject(t)) {
            var i = 0;
            for (var a in t) if (t.hasOwnProperty(a) && !1 === e.call(n || t, a, t[a], i++, t)) return
        } else {
            YT.isIterable(t) && !YT.isPrimitive(t) || (t = [t]), i = 0;
            for (var o = t.length; i < o; i++) if (!1 === e.call(n || t[i], t[i], i, t)) return i
        }
    }, bind: function (t, e) {
        return YT.isFunction(t) ? function () {
            return t.apply(e, arguments)
        } : t
    }, define: function (t) {
        var e = arguments;
        1 < e.length || !YT.isFunction(t) ? define.apply(this, e) : define.call(this, t)
    }, template: function () {
        var t = arguments, e = t[0];
        if (YT.isArray(e)) if (1 < e.length) {
            var n = [], i = {};
            YT.each(e, function (t) {
                YT.isObject(t) ? YT.apply(i, t) : n.push(t)
            }), YT.each(i, function (t, e) {
                YT.isFunction(e) && juicer.register(t, e)
            }), t[0] = n.join("")
        } else t[0] = e[0];
        return juicer.apply(this, t)
    }, JsonToStr: function (t) {
        return JSON.stringify(t)
    }, JsonEval: function (str) {
        return eval("(" + str + ")")
    }, _hideKeyboard: function (t) {
        YT.Device._hideKeyboard(t)
    }, touch: function () {
        return !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
    }, initPageEvent: function (t, a) {
        var e = function (t, e, n) {
            var i = e.data(n);
            YT.log.debug("event ", n, ":", i), a[i] && a[i](t, e)
        };
        t.on("click", "[data-event]", function (t) {
            e(t, $(this), "event")
        }), t.on("change", "[data-change]", function (t) {
            e(t, $(this), "change")
        }), t.on("input", "[data-input]", function (t) {
            e(t, $(this), "input")
        }), t.on("blur", "[data-blur]", function (t) {
            e(t, $(this), "blur")
        }), YT.Device.initEvent(t)
    }, initPageTitle: function (t) {
        YT.Device.initPageTitle(t)
    }, titleSearchBar: function (t) {
        YT.Device.titleSearchBar(t)
    }, showPageArea: function (t, e, n) {
        YT.Device.showPageArea(t, e, n)
    }, loadPage: function (t, e, n, i, a) {
        YT.AjaxUtil.loadPage(t, e, n, i, a)
    }, getPage: function (t, e, n) {
        YT.AjaxUtil.getPage(t, e, n)
    }, openWaitPanel: function (t) {
        YT.Device.openWaitPanel(t)
    }, hideWaitPanel: function (t) {
        YT.Device.hideWaitPanel(t)
    }, alertinfo: function (t, e, n, i) {
        YT.Device.alertinfo(t, e, n, i)
    }, confirm: function (t, e, n, i, a, o) {
        YT.Device.confirm(t, e, n, i, a, o)
    }, sessionTimeout: function (t) {
        YT.Device.sessionTimeout(t)
    }, getSession: function (t) {
        YT.Device.getSession(t)
    }, setSession: function (t) {
        YT.Device.setSession(t)
    }, showTips: function (t) {
        YT.Tips.showTips({content: t, stayTime: 2e3, type: "warn"})
    }, ajaxData: function (t, e, n, i) {
        YT.Device.ajaxData(t, e, n, i)
    }, onceAjaxData: function (t, e, n, i) {
        YT.AjaxUtil.onceAjaxData(t, e, n, i)
    }, ajaxText: function (t) {
        YT.AjaxUtil.ajaxText(t)
    }, ajaxCashe: function (t, e, n, i, a, o) {
        YT.Device.ajaxCashe(t, e, n, i, a, o)
    }, openMenuPage: function (t) {
        YT.Device.openMenuPage(t)
    }, geneQRC: function (t, e) {
        YT.Device.geneQRC(t, e)
    }, sweepQRC: function (t) {
        YT.Device.sweepQRC(t)
    }, sharePages: function (t, e) {
        YT.Device.sharePages(t, e)
    }, shareReceipt: function (t, e) {
        YT.Device.shareReceipt(t, e)
    }, openMobilePhoto: function (t, e) {
        YT.Device.openMobilePhoto(t, e)
    }, openMobilePhotoAlbum: function (t, e) {
        YT.Device.openMobilePhotoAlbum(t, e)
    }, openMobileCamera: function (t, e) {
        YT.Device.openMobileCamera(t, e)
    }, fingerPrint: function (t) {
        YT.Device.fingerPrint(t)
    }, openFingerPrint: function (t) {
        YT.Device.openFingerPrint(t)
    }, setGesture: function (t) {
        YT.Device.setGesture(t)
    }, checkGesture: function (t) {
        YT.Device.checkGesture(t)
    }, openOrColse: function (t) {
        YT.Device.openOrColse(t)
    }, gotoClientIndex: function () {
        YT.Device.gotoIndex()
    }, gotoClientBack: function () {
        YT.Device.gotoBack()
    }, gotoClientLogin: function () {
        YT.Client.gotoLogin()
    }, dataUrl: function (t, e, n, i) {
        if (t = 0 == t.indexOf("/") ? t : "/" + t, DEBUG) {
            if (YT.isEmpty(e) || e) {
                var a = YT.TestUtil, o = n && (YT.isString(n) ? n : a && a.dispatch(t, n)) || "";
                return basePath + "/data/json" + t + o + (i ? ".json" : ".js")
            }
            return basePath + t + ".do"
        }
        return basePath + t + ".do"
    }, formatUrl: function (t) {
        return t + (0 < t.indexOf("?") ? "&t=" : "?t=") + (new Date).getTime()
    }, exchangeCss: function (t, e, n) {
        YT.log.debug("----run----" + n, "YT.exchangeCss"), e && e.removeClass(n), t && t.addClass(n)
    }, getFunctionName: function (t, n) {
        if (null == t || "" == t) return "";
        if ("[object Function]" !== Object.prototype.toString.apply(t)) return t;
        var i = YT.id();
        return window[i] = function () {
            var e = [];
            YT.each(arguments, function (t) {
                1 == n && (t = decodeURIComponent(t)), "string" == typeof t && "{" == t.charAt(0) && "}" == t.charAt(t.length - 1) && (t = YT.JsonEval(t.replace(/<\/?[^>]*>/g, "").replace(/[\r\n]/g, "<br>"))), e.push(t)
            }, this), t.apply(this, e), delete window[i]
        }, i
    }, executeFunc: function (t, e) {
        e && e(t)
    }, showPopuMenus: function (t) {
        YT.Util.showPopuMenus(t)
    }, sysdate: function (t) {
        YT.DateUtil.sysdate(t)
    }, getDate: function (t, e) {
        return YT.DateUtil.getDate(t, e)
    }, loadIndexPage: function (t, e) {
        YT.NavUtil.loadIndexPage(t, e)
    }, nextPage: function (t, e) {
        YT.setParameters(e), YT.NavUtil.nextPage(t)
    }, prevPage: function () {
        YT.NavUtil.prevPage()
    }, gotoIndex: function () {
        YT.NavUtil.gotoIndex()
    }, refreshPage: function () {
        YT.NavUtil.refreshPage()
    }, openLeftMenu: function (t) {
        YT.NavUtil.openLeftMenu()
    }, openRightMenu: function (t) {
        YT.NavUtil.openRightMenu()
    }, getLayoutData: function (t) {
        YT.Device.getLayoutData(t)
    }, setLayoutData: function (t) {
        YT.Device.setLayoutData(t)
    }
};
YT.namespace("YT.core", "YT.util", "YT.device"), Fw = YT, $.postAjax = {}, $.fn.extend({
    bubbleByCls: function (t) {
        var e = this.parent();
        return t && e ? e.hasClass(t) ? e : e.bubbleByCls(t) : null
    }
}), $.postAjax = {}, YT.AjaxUtil = {
    ajaxData: function (t) {
        t.failure || (t.failure = t.success);
        var e = (new Date).format("yyyyMMddHHmmss");
        t.params.REQ_TIME = e, (new YT.TransAjax).post(t)
    }, onceAjaxData: function (e, n, i, a) {
        var t = (new Date).getTime(), o = YT.apply({}, n);
        if ($.postAjax.lastRequest) {
            if (t - $.postAjax.lastRequest.timestamp < 5e3 && o && JSON.stringify($.postAjax.lastRequest.params) === JSON.stringify(o)) return void YT.alertinfo("交易处理中，请勿重复提交！");
            $.postAjax.lastRequest.params = o, $.postAjax.lastRequest.timestamp = t
        } else $.postAjax.lastRequest = {params: o, timestamp: t};
        onceSuccess = function (t) {
            t && "1" === t.STATUS ? (n.CHECK_TOKEN = "Y", n.REPEAT_TOKEN = t.REPEAT_TOKEN, YT.ajaxData(e, n, i, a)) : (YT.alertinfo("数据请求失败,请查询交易结果，不要重复提交数据！"), YT.hideWaitPanel())
        };
        var r = YT.dataUrl("common/onceTokenGet");
        YT.ajaxData(r, "{}", onceSuccess, a)
    }, ajaxText: function (t) {
        return $.ajax({url: t, async: !1}).responseText
    }, loadPage: function (n, t, i, a, o) {
        $.ajax({
            url: t, data: {}, type: "get", success: function (t) {
                var e = YT.template(t, i);
                n.html(e), o && YT.Form.initPanel(n, o, i), a && a(i)
            }, error: function () {
                YT.showTips("加载模板失败!"), a && a(i)
            }
        })
    }, getPage: function (t, e, n) {
        $.ajax({
            url: t, data: e, type: "get", success: function (t) {
                n && n(t)
            }, error: function () {
                YT.showTips("加载模板失败!"), n && n("加载模板失败!")
            }
        })
    }
}, function () {
    var t, u, d, s;
    YT.log.debug("init", "YT.Collection");
    var c = !1, a = 0, o = 0, f = {en: "", ct: "", mt: "", fp: "", pp: "", st: "", ce: "", oc: "", aoc: ""},
        p = YT.Collection = {
            init: function () {
                t = $("#mainBody"), u = t.find(".pages.ui-navbar-through"), p.initDatas(), p.initEvent()
            }, initDatas: function () {
                var t = new Date;
                p.timeFormat = t.format("yyyy-MM-dd hh:mm:ss");
                var e = t.getTime(), n = p.prevPages();
                if (!YT.isEmpty(n)) {
                    var i = {}, a = n.PAGE_TIME;
                    i.pp = n.PAGE_PATH, i.st = e - a, i.ct = p.timeFormat, YT.Client.setCollection(i)
                }
                p.setPageDatas(e)
            }, initEvent: function () {
                var t = $("body");
                t.on("touchstart", "[data-event]", p.btnTouchStart), t.on("touchmove", "[data-event]", p.btnTouchMove), t.on("touchend", "[data-event]", p.btnTouchEnd), t.on("touchstart", "[data-name]", function () {
                    var t = $(this);
                    YT.log.debug("--click---" + t.data("name"))
                }), t.on("focus", "input,textarea", function () {
                    var t = $(this);
                    t.attr("data-curCollVal", t.val())
                }), t.on("blur", "input,textarea", function () {
                    var t = $(this);
                    t.attr("data-curCollVal") !== t.val() && p.monitorData(t)
                })
            }, monitorData: function (t) {
                var e = t.data("name"), n = {mt: "3", oc: t.val(), aoc: t.attr("data-curCollVal")};
                p.setColl(n, e)
            }, btnTouchStart: function (t) {
                $(t.currentTarget);
                var e = window.location.href;
                p.moduleNo = e.substring(e.lastIndexOf("/") + 1, e.indexOf(".html"));
                var n = t.originalEvent;
                a = n.touches[0].pageX, o = n.touches[0].pageY
            }, btnTouchMove: function (t) {
                var e = t.originalEvent, n = e.touches[0].pageX, i = e.touches[0].pageY;
                (10 < Math.abs(n - a) || 10 < Math.abs(i - o)) && (c = !0)
            }, btnTouchEnd: function (t) {
                if (!c) {
                    var e = $(t.currentTarget), n = e.data("event"), i = "", a = e.attr("data-collectExt"),
                        o = e.attr("data-collectType");
                    o = o || "3", YT.isEmpty(a) || (i = a);
                    var r = {mt: o, ce: i};
                    p.setColl(r, n)
                }
                c = !1
            }, setColl: function (t, e) {
                var n = YT.apply({}, f);
                YT.apply(n, t);
                var i = d.substring(d.lastIndexOf("/") + 1, d.indexOf(".html")), a = new Date,
                    o = a.format("yyyy-MM-dd hh:mm:ss"), r = (a.getTime(), d.substring(d.indexOf("/") + 1));
                r = r.substring(0, r.indexOf("/")), n.en = "B001.C001.M" + r + "." + i + ".E" + e, n.pn = s, n.ct = o, n.pp = d, n.st = "", YT.log.info(n), YT.Client.setCollection(n)
            }, setDatas: function () {
                var t = p.prevPages(), e = new Date, n = e.format("yyyy-MM-dd hh:mm:ss"), i = e.getTime();
                if (t) {
                    var a = YT.apply({}, f), o = t.PAGE_TIME,
                        r = (t.CURR_NO, d.substring(d.lastIndexOf("/") + 1, d.indexOf(".html"))),
                        s = d.substring(d.indexOf("/") + 1);
                    s = s.substring(0, s.indexOf("/"));
                    var c = p.getTitleName(), l = u.find(".page-view.page-on-center");
                    l = l.attr("data-page"), a.en = "B001.C001.M" + s + "." + r + ".V", a.ct = n, a.mt = "4", a.fp = d, a.fn = t.PAGE_NAME, a.pn = c, a.st = (i - o).toString(), a.pp = l, YT.Client.setCollection(a)
                }
                p.setPageDatas(i)
            }, prevPages: function () {
                var t = sessionStorage.getItem("PREV_COLLECTION");
                return YT.isEmpty(t) ? null : (sessionStorage.removeItem("PREV_COLLECTION"), YT.JsonEval(t))
            }, setPageDatas: function (t) {
                var e, n = u.find(".page-view.page-on-center");
                d = n.attr("data-page");
                var i = p.getTitleName();
                e = n.find(">div").attr("id");
                var a = {PAGE_PATH: d, PAGE_ID: e, PAGE_NAME: s = i, PAGE_TIME: t};
                sessionStorage.setItem("PREV_COLLECTION", YT.JsonToStr(a))
            }, getTitleName: function () {
                var t = u.find(".page-view.page-on-center");
                d = t.attr("data-page");
                var e = t.find("title"), n = "";
                return 1 == e.length ? (n = e.text(), YT.isEmpty(n) && (n = t.find("div.page.current").attr("title"))) : n = t.find("div.page.current").attr("title"), n
            }
        };
    YT.log.debug("init-end--")
}(), function () {
    var g = YT.DateUtils = {
        sysdate: function (e) {
            var t = YT.dataUrl("common/sysdate", !0);
            YT.ajaxData(t, {}, function (t) {
                e && e(t)
            })
        }, getDate: function (t, e) {
            var n = e ? new Date(e) : new Date, i = n.getDate();
            t = t || 0, n.setDate(i + t), i = n.getDate();
            var a = n.getMonth();
            return n.getYear() + 1900 + "-" + (a + 1 < 10 ? "0" + (a + 1) : a + 1) + "-" + (i < 10 ? "0" + i : i)
        }, dateDiff: function (t, e) {
            try {
                var n = t.replace(/-/g, "/"), i = e.replace(/-/g, "/");
                d1 = new Date(n), d2 = new Date(i);
                var a = d1.getTime() - d2.getTime();
                return parseInt(a / 864e5)
            } catch (t) {
                return YT.log.debug(t), 0
            }
        }, dateToWeek: function (t) {
            return ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][new Date(Date.parse(t.replace(/-/g, "/"))).getDay()]
        }, initDateController: function (a, o, t) {
            var r = a.find(".y-date");
            r.length < 1 || g.sysdate(function (t) {
                var e = t && (t.SYS_DATE || t.CUR_DATE);
                r.find("input[data-name]").val(e);
                var n = r.find(".x-date-start"), i = r.find(".x-date-end");
                g.initQueryDateControll(n, i, e), g.initDateTab(a, o, e, n, i)
            })
        }, initQueryDateControll: function (d, f, p) {
            var h = YT.Form.resultCustomerValidator;
            d.on("validator", function (t, e) {
                var n = $(e).data("gid"), i = $(e).val(), a = m(f, n).val(), o = g.getDate(0, p),
                    r = i.replace(/-/g, ""), s = a.replace(/-/g, ""), c = o.replace(/-/g, ""),
                    l = g.getDate(-365, p).replace(/-/g, ""), u = g.getDate(-90, a).replace(/-/g, "");
                return s < r ? (h(d, !1, "开始日期不能大于结束日期"), !1) : r < l ? (h(d, !1, "只能查询一年内记录"), !1) : r < u ? (h(d, !1, "查询区间不能大于90天"), !1) : c < s ? (h(f, !1, "结束日期不能大于今天"), !1) : (h(d, !0), h(f, !0), !0)
            })
        }, initDateTab: function (t, r, s, c, l) {
            var u = t.find(".y-date-quick");
            if (!(u.length < 1)) {
                var d = u.data("change");
                u.on("click", "label.ui-radio-s", function (t) {
                    var e = $(this).find("input.x-item"), n = e.data("gid");
                    u.find("li").removeClass("current"), e.addClass("current");
                    var i = e.data("value"), a = s, o = g.getDate(i, s);
                    m(c, n).val(o), m(l, n).val(a), d && r && r[d] && r[d]()
                }), u.find("li.current").trigger("click")
            }
        }
    };

    function m(t, e) {
        return e ? t.filter("[data-gid='" + e + "']") : t
    }
}(), function () {
    var o = "YT.Form", m = NS.MSG;
    YT.log.debug("--init--");
    var v = YT.Form = {
        init: function () {
        }, readyLock: function (t, e) {
            return 0 < t.find("[data-ready='false']").length
        }, initInnerPanel: function (t, e, n) {
            v.setFormJson(t, n), YT.DateUtils && YT.DateUtils.initDateController(t, e, n), YT.Sms.initSmsController(t, e, n), YT.Input && YT.Input.init(t, e, n), YT.Upload && YT.Upload.init(t, e, n), YT.Tab && YT.Tab.initTabFilter(t, e, n), YT.Checkbox && YT.Checkbox.init(t, e, n), YT.Radiobox && YT.Radiobox.init(t, e, n)
        }, initPanel: function (o, r, s) {
            v.initInnerPanel(o, r, s), o.find("[data-extlib]").each(function (t, e) {
                var n = $(this), i = n.attr("data-extlib"), a = NS.EXT_LIBS && NS.EXT_LIBS[i] || null;
                YT.log.info("----init extlib-----", i, a), null != a && seajs.use(a, function (t) {
                    t.init(n, o, r, s)
                })
            })
        }, resetPanel: function (i, a, o) {
            i.find("[data-extlib]").each(function (t, e) {
                var n = $(this);
                v.resetWidget(n, i, a, o)
            })
        }, resetWidget: function (e, n, i, a) {
            var t = e.attr("data-extlib"), o = NS.EXT_LIBS && NS.EXT_LIBS[t] || null;
            YT.log.info("----init extlib-----", t, o), null != o && seajs.use(o, function (t) {
                t.reset(e, n, i, a)
            })
        }, preInitPanel: function (t, e, n) {
        }, getFormJson: function (t, r) {
            if (r = r || {}, !t) return r;
            var s = [];
            return t.find("[data-name]").each(function () {
                var t, e = $(this), n = "";
                t = e.attr("data-name");
                for (var i = 0; i < s.length; i++) if (s[i] == t) return;
                s.push(t);
                var a = e.attr("data-type") || this.type;
                if ("checkbox" == a) {
                    var o = [];
                    e.find("input:checked").each(function () {
                        o.push(this.value)
                    }), n = o.join(",")
                } else "radiobox" == a ? n = e.find("input[type=radio]:checked").val() : (n = e.attr("data-value") || e.val() || e.text() || "", "money" != a && "number" != a || (n = n.replace(/,/g, "")), n = n.replace(/ /g, ""));
                t && n && (r[t] = n)
            }), YT.log.debug(YT.JsonToStr(r), "YT.Form.getFormJson"), r
        }, setFormJson: function (r, s) {
            s = s || {}, "{}" !== YT.JsonToStr(s) && r.find("[data-name]").each(function () {
                var t = $(this), e = t[0].tagName, n = t.attr("data-name") || t.name || "", i = s[n];
                if (i) {
                    var a = t.data("type") || t[0].type || "";
                    if ("INPUT" == e || "SELECT" == e || "TEXTAREA" == e) "radio" == a ? r.find("[type=radio][value=" + i + "]").prop("checked", "checked") : t.val(i); else if ("checkbox" == a) {
                        var o = i.split(",");
                        $.each(o, function (t, e) {
                            $("input:checkbox[value='" + e + "']").attr("checked", "true")
                        })
                    } else t.text(i)
                }
            })
        }, validAgree: function (t, e) {
            if (t.prop("checked")) return !0;
            var n = v.msgjoin(m.MsgCheck, [e]);
            return YT.showTips(n), !1
        }, validator: function (t) {
            var a = !0;
            return t.find("[data-name]").each(function () {
                var t = $(this);
                if (!0 === t.is(":hidden")) return !0;
                var e = t.attr("data-name");
                if (e) {
                    YT.log.debug("valid elem :" + e, o);
                    var n = this.value || t.attr("data-value") || this.innerHTML,
                        i = t.attr("data-type") || this.type || "";
                    if ("checkbox" == i || "radiobox" == i && (n = t.find('input[type="radio"][name="' + e + '"][checked]').val()), !v.validatorElement(t, e, i, n, !0)) return a = !1
                }
            }), a
        }, validatorElement: function (i, t, e, n, a) {
            var o, r;
            o = i.attr("data-required"), r = i.attr("data-label") || t;
            var s = "true" == o || "required" == o;
            if ("protocol" == e) {
                var c = i.find('input[type=checkbox][name="' + t + '"]');
                return v.validAgree(c, r)
            }
            if ("checkbox" == e) return !(!("checkbox" == i.attr("type") ? i.prop("checked") : i.find("input[type=checkbox]").prop("checked")) && s && (g(m.MsgSelect, [r]), 1));
            if (0 == (n = n || "").trim().length) return !s || (g(m.MsgMustInput, [r]), !1);
            "money" != e && "number" != e || (n = n.replace(/,/g, "")), n = n.replace(/\s+/g, "");
            var l = /\'|\"|,|=|:|\{|\}|\[|\]$/;
            if ("db" == i.attr("data-json") && (l = /\'|\"/), l.exec(n)) return g(m.MsgStr, [r]), !1;
            var u = i.attr("data-len");
            if (u && n.length != 1 * u) return g(m.MsgLength, [r, u]), !1;
            var d = i.attr("data-min") || null;
            if (d && 1 * n < 1 * d) return g(m.MsgMinValue, [r, d]), !1;
            var f = i.attr("data-max") || null;
            if (f && 1 * f < 1 * n) return g(m.MsgMaxValue, [r, f]), !1;
            if (("number" == e || "money" == e) && isNaN(n)) return g(m.MsgNumber, [r]), !1;
            var p = NS.PATTERN[e];
            if (!YT.isEmpty(p) && !p.test(n)) {
                var h = m["Msg_" + e];
                return YT.log.info(h), g(h = YT.isEmpty(h) ? m.MsgFormat : h, [r]), !1
            }
            if ("money" == e && n <= 0) return g(m.MsgMoney, [r]), !1;
            if ("certNo" == e && !v.IdCardValidate(n)) return g(m.MsgFormat, [r]), !1;
            if ("orgNo" == e && v.orgcodevalidate(n)) return g(m.MsgFormat, [r]), !1;
            if ("unitcode" == e && (10 < n.length || n.length < 9)) return g(m.MsgFormat, [r]), !1;
            try {
                if (i.trigger("validator", i), "false" == i.attr("data-check")) return !1
            } catch (t) {
            }

            function g(t, e) {
                var n = v.msgjoin(t, e);
                v.showPinLabel(i, n, a)
            }

            return !0
        }, showPinLabel: function (t, e, n) {
            YT.showTips(e), n && t.focus()
        }, msgjoin: function (t, n) {
            return YT.log.debug("Form.msgjoin:" + t, o), t.replace(/\{(\d+)\}/g, function (t, e) {
                return 0 == e ? "'" + n[0] + "'" : n[e]
            })
        }, resultCustomerValidator: function (t, e, n) {
            !e && n ? (t.attr("data-check", "false"), v.showPinLabel(t, n, focus)) : t.attr("data-check", "true")
        }, IdCardValidate: function (t) {
            if (15 == (t = t.replace(/ /g, "")).length) return v.isValidityBrithBy15IdCard(t);
            if (18 != t.length) return !1;
            var e = t.split("");
            return !(!v.isValidityBrithBy18IdCard(t) || !v.isTrueValidateCodeBy18IdCard(e))
        }, isTrueValidateCodeBy18IdCard: function (t) {
            var e = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], n = 0;
            "x" == t[17].toLowerCase() && (t[17] = 10);
            for (var i = 0; i < 17; i++) n += e[i] * t[i];
            return valCodePosition = n % 11, t[17] == [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2][valCodePosition]
        }, isValidityBrithBy18IdCard: function (t) {
            var e = t.substring(6, 10), n = t.substring(10, 12), i = t.substring(12, 14),
                a = new Date(e, parseFloat(n) - 1, parseFloat(i));
            return a.getFullYear() == parseFloat(e) && a.getMonth() == parseFloat(n) - 1 && a.getDate() == parseFloat(i)
        }, isValidityBrithBy15IdCard: function (t) {
            var e = t.substring(6, 8), n = t.substring(8, 10), i = t.substring(10, 12),
                a = new Date(e, parseFloat(n) - 1, parseFloat(i));
            return a.getYear() == parseFloat(e) && a.getMonth() == parseFloat(n) - 1 && a.getDate() == parseFloat(i)
        }, orgcodevalidate: function (t) {
            if ("" != t) {
                var e = t.split("-"), n = [3, 7, 9, 10, 5, 8, 4, 2];
                if (!/^([0-9A-Z]){8}$/.test(e[0])) return !0;
                for (var i = 0, a = 0; a < 8; a++) i += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e[0].charAt(a)) * n[a];
                var o = 11 - i % 11;
                return 11 == o ? o = "0" : 10 == o ? o = "X" : o += "", e[1] + "" != o
            }
        }
    };
    v.init(), YT.log.debug("--end--", o)
}(), function () {
    var a = YT.Format = {
        listIndex: function (t) {
            return 1 * t + 1
        }, fmtNsType: function (t, e) {
            return NS[e] && NS[e][t] || t
        }, fmtAcctNo: function (t, e) {
            if (YT.isEmpty(t)) return "";
            t = a.removeSpace(t);
            var n = "";
            if (e) {
                var i = t.length - 4;
                i < 4 && (i = 4), n = n + t.substring(0, 4) + " **** **** " + t.substring(i, t.length)
            } else {
                for (; 4 < t.length;) n += t.substring(0, 4), n += " ", t = t.substring(4, t.length);
                n += t
            }
            return n
        }, fmtAcctStop4: function (t) {
            return YT.isEmpty(t) ? "" : t.substring(t.length - 4, t.length)
        }, fmtAccInput: function (e) {
            e.on("keyup", function () {
                var t = e.val();
                e.val(t.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 "))
            })
        }, fmtPhoneNo: function (t) {
            if (YT.isEmpty(t)) return "";
            var e = "", n = (t = a.removeSpace(t)).length - 4;
            return n < 4 && (n = 4), e + t.substring(0, 3) + " **** " + t.substring(n, t.length)
        }, fmtIdNo: function (t) {
            if (YT.isEmpty(t)) return "";
            var e = "", n = (t = a.removeSpace(t)).length - 2;
            return n < 2 && (n = 2), e + t.substring(0, 2) + " **** **** " + t.substring(n, t.length)
        }, fmtCustName: function (t) {
            if (YT.isEmpty(t)) return "";
            var e = "", n = (t = a.removeSpace(t)).length - 1;
            return n < 1 && (n = 1), e + t.substring(0, 1) + "*" + t.substring(n, t.length)
        }, removeSpace: function (t) {
            return YT.isEmpty(t) ? "" : t.replace(/\s/g, "")
        }, fmtDate: function (t, e, n) {
            return YT.isEmpty(t) ? "" : (YT.isDate(t) || (t = new Date(t)), t.format(e || "yyyy年MM月dd日"))
        }, fmtMoney: function (t, e, n, i) {
            t = (t += "").replace(/,/g, "");
            var a = (t *= 1) < 0 ? "-" : "";
            e = e || 2, t = t.toFixed(e), e = Math.abs(e) + 1 ? e : 2, n = n || ".", i = i || ",";
            var o = /(\d+)(?:(\.\d+)|)/.exec(t + ""), r = 3 < o[1].length ? o[1].length % 3 : 0;
            return a + (r ? o[1].substr(0, r) + i : "") + o[1].substr(r).replace(/(\d{3})(?=\d)/g, "$1" + i) + (e ? n + (+o[2] || 0).toFixed(e).substr(2) : "")
        }, fmtAmt: function (t) {
            try {
                return a.fmtMoney(t, 2, ".", ",")
            } catch (t) {
                return "0.00"
            }
        }, fmtNum: function (t) {
            return "" == t ? "0" : t
        }, fmtDistance: function (t) {
            return "" == t ? t : (t = parseInt(100 * t / 100), s1 = t + "", 4 < s1.length || 4 == s1.length ? (s1 / 1e3).toFixed(1) + "km" : s1 + "m")
        }, fmtAmt4s: function (t) {
            try {
                return a.fmtMoney(1 * t, 4, ".", ",")
            } catch (t) {
                return "0.0000"
            }
        }, delFmtMony: function (t) {
            var e = t.trim() + "";
            return -1 != e.indexOf(".") && (e = e.substr(0, e.indexOf(".") + 3)), e.replace(/,/g, "")
        }, unfmtAmt: function (t) {
            return YT.isEmpty(t) ? "" : t.replace(/,/g, "")
        }, fmtAddPercent: function (t) {
            var e = Math.floor(100 * t) / 100;
            return (e = e.toFixed(2)) + "%"
        }, fmtNumber2Chinese: function (t) {
            t = t.replace(/,/g, "");
            try {
                0 == (t = parseFloat(t)) && (t = "")
            } catch (t) {
            }
            if (!/^\d*(\.\d*)?$/.test(t)) throw new Error(-1, "Number is wrong!");
            for (var e = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"), n = new Array("", "拾", "佰", "仟", "萬", "億", "圆", ""), i = new Array("角", "分", "厘"), a = ("" + t).replace(/(^0*)/g, "").split("."), o = 0, r = "", s = a[0].length - 1; 0 <= s; s--) {
                switch (o) {
                    case 0:
                        r = n[7] + r;
                        break;
                    case 4:
                        new RegExp("0{4}\\d{" + (a[0].length - s - 1) + "}$").test(a[0]) || (r = n[4] + r);
                        break;
                    case 8:
                        r = n[5] + r, n[7] = n[5], o = 0
                }
                o % 4 == 2 && "0" == a[0].charAt(s) && "0" != a[0].charAt(s + 2) && (r = e[0] + r), 0 != a[0].charAt(s) && (r = e[a[0].charAt(s)] + n[o % 4] + r), o++
            }
            if (1 < a.length) {
                for (r += n[6], s = 0; s < a[1].length && (r += e[a[1].charAt(s)] + i[s], 2 != s); s++) ;
                "0" == a[1].charAt(0) && "0" == a[1].charAt(1) && (r += "元整")
            } else r += "元整";
            return YT.isEmpty(a[0]) && (r = "零元整"), r
        }, fmtImgUrl: function (t) {
            return YT.isEmpyt(t) ? "" : (t = 0 == t.indexOf("/") ? t : "/" + t, basePath + t)
        }, fmtListCovert: function (t, e) {
            if (t && e) for (var n = e.split(",|，||"), i = 0; i < t.length; i++) for (var a = t[i], o = 0; o < n.length; o++) {
                var r = n[o].split("=");
                2 == r.length && (a[r[0]] = a[r[1]])
            }
            return t
        }
    };
    YT.each(a, function (t, e) {
        YT.isFunction(e) && juicer.register(t, e)
    }), Date.prototype.format = function (t) {
        var n = this, i = function (t, e) {
            e || (e = 2), t = String(t);
            for (var n = 0, i = ""; n < e - t.length; n++) i += "0";
            return i + t
        };
        return t.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmMstT])\1?|[lLZ])\b/g, function (t) {
            switch (t) {
                case"d":
                    return n.getDate();
                case"dd":
                    return i(n.getDate());
                case"ddd":
                    return ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][n.getDay()];
                case"dddd":
                    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][n.getDay()];
                case"M":
                    return n.getMonth() + 1;
                case"MM":
                    return i(n.getMonth() + 1);
                case"MMM":
                    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][n.getMonth()];
                case"MMMM":
                    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][n.getMonth()];
                case"yy":
                    return String(n.getFullYear()).substr(2);
                case"yyyy":
                    return n.getFullYear();
                case"h":
                    return n.getHours() % 12 || 12;
                case"hh":
                    return i(n.getHours() % 12 || 12);
                case"H":
                    return n.getHours();
                case"HH":
                    return i(n.getHours());
                case"m":
                    return n.getMinutes();
                case"mm":
                    return i(n.getMinutes());
                case"s":
                    return n.getSeconds();
                case"ss":
                    return i(n.getSeconds());
                case"l":
                    return i(n.getMilliseconds(), 3);
                case"L":
                    var e = n.getMilliseconds();
                    return 99 < e && (e = Math.round(e / 10)), i(e);
                case"tt":
                    return n.getHours() < 12 ? "am" : "pm";
                case"TT":
                    return n.getHours() < 12 ? "AM" : "PM";
                case"Z":
                    return n.toUTCString().match(/[A-Z]+$/);
                default:
                    return t.substr(1, t.length - 2)
            }
        })
    }
}(), $(function () {
    var t = "YT.Input";
    YT.log.debug("---init--", t), YT.Format;
    var u = ["{@each LIST as item,index}", '<option value="${item.KEY}">${item.VALUE}</option>', "{@/each}"].join(""),
        r = ["{@each LIST as item,index}", '<option value="${item.ID}">${item.WEEK}</option>', "{@/each}"].join(""),
        c = ["{@each LIST as item,index}", "<option>${item.VALUE}</option>", "{@/each}"].join(""), i = YT.Input = {
            init: function (t, e, n) {
                i.initMoneyController(t, e, n), i.initAcctNo(t, e, n), i.initSwitch(t, e, n), i.initSelect(t, e, n), i.initSelectParams(t, e, n), i.initSelectWeek(t, e, n), i.initPhoneBook(t, e, n), i.initSms(t, e, n), i.callPhone(t, e, n), i.initAgreement(t, e, n)
            }, initAgreement: function (t, e, n) {
                var i = t.find(".Agreemens");
                i.length < 1 || (YT.log.info("agreemen ele ", i.length), i.on("click", function () {
                    var t = i.attr("data-url");
                    YT.nextPage(t)
                }))
            }, initMoneyController: function (t, n, e) {
                var i = t.find("[data-type='money']");
                if (!(i.length < 1)) {
                    YT.log.info("money ele ", i.length);
                    var a = t.find("[data-zh='r-amt-zh']"), o = i.data("change");
                    i.on("input", function () {
                        var t = YT.Format.unfmtAmt(i.val());
                        if (YT.isEmpty(t) || YT.isEmpty(t.trim())) a.text(""); else {
                            var e = YT.Format.fmtNumber2Chinese(t);
                            a && a.text(e), o && n && n[o] && n[o]()
                        }
                    })
                }
            }, initAcctNo: function (t, e, n) {
                t.find("input[data-type$='acct'],input[data-type^='acct']").on("input", function () {
                    var t = this.value.replace(/^\D*$/g, ""), e = YT.Format.fmtAcctNo(t, !1);
                    $(this).val(e)
                })
            }, initSwitch: function (t, e, n) {
                var i = t.find("[data-type='switch']");
                if (!(i.length < 1)) {
                    var a, o, r = i.attr("data-handle");
                    YT.isEmpty(r) ? (a = t.find('[data-handle="r-switch"]'), o = a.attr("data-toggle")) : (a = t.find("." + r), o = i.attr("data-toggle")), a.length < 1 || (i.on("click", function () {
                        s()
                    }), s())
                }

                function s() {
                    i.prop("checked") ? a.removeClass(o) : a.addClass(o)
                }
            }, initSelect: function (a, t, e) {
                var o = a.find(".y-select-edit");
                if (!(o.length < 1)) {
                    var n = o.find(".x-picker");
                    if (!(n.length < 1)) {
                        var r = n.find("select");
                        if (!(r.length < 1)) {
                            var s = n.attr("data-value");
                            s = YT.isEmpty(s) ? "VALUE" : s;
                            var i = n.attr("data-url");
                            i = YT.isEmpty(i) ? "core/remark" : i, i = YT.dataUrl(i), o.attr("data-ready", "false"), YT.ajaxData(i, {}, function (t) {
                                if ("1" == t.STATUS) {
                                    var e = t.LIST, i = [];
                                    i.push({}), $.each(e, function (t, e) {
                                        var n = {VALUE: e[s]};
                                        i.push(n)
                                    });
                                    var n = YT.template(c, {LIST: i});
                                    r.html(n), o.attr("data-ready", "true")
                                } else YT.hideWaitPanel(), YT.alertinfo(t.MSG);
                                r.on("change", function () {
                                    var t = $(this).find("option:checked").text();
                                    a.find(".y-select-edit input").val(t)
                                })
                            })
                        }
                    }
                }
            }, initSelectParams: function (t, o, e) {
                var r = t.find(".y-select-params");
                if (!(r.length < 1)) {
                    var s = r.find("select");
                    if (!(s.length < 1)) {
                        var c = r.attr("data-key");
                        c = YT.isEmpty(c) ? "KEY" : c;
                        var l = r.attr("data-value");
                        l = YT.isEmpty(l) ? "VLAUE" : l;
                        var n = r.attr("data-url");
                        n = YT.isEmpty(n) ? "core/cert" : n, n = YT.dataUrl(n), r.attr("data-ready", "false"), YT.ajaxData(n, {}, function (t) {
                            if ("1" == t.STATUS) {
                                var e = t.LIST, a = [];
                                $.each(e, function (t, e) {
                                    var n = e, i = {KEY: n[c], VALUE: n[l]};
                                    a.push(i)
                                });
                                var n = YT.template(u, {LIST: a});
                                s.html(n), i(), r.attr("data-ready", "true")
                            } else YT.hideWaitPanel(), YT.alertinfo(t.MSG);

                            function i() {
                                var t = r.data("callback");
                                if (!YT.isEmpty(t)) {
                                    var e = s.val();
                                    o[t] && o[t](e)
                                }
                            }

                            s.on("change", function () {
                                i()
                            })
                        })
                    }
                }
            }, initSelectWeek: function (t, e, n) {
                var i = t.find(".y-date-week");
                if (!(i.length < 1)) {
                    var a = i.find("select");
                    if (!(a.length < 1)) {
                        var o = YT.template(r, {
                            LIST: [{ID: "1", WEEK: "星期一"}, {ID: "2", WEEK: "星期二"}, {
                                ID: "3",
                                WEEK: "星期三"
                            }, {ID: "4", WEEK: "星期四"}, {ID: "6", WEEK: "星期六"}, {ID: "0", WEEK: "星期日"}]
                        });
                        a.html(o)
                    }
                }
            }, initPhoneBook: function (e, t, n) {
                var i = e.find(".y-phone-book");
                i.length < 1 || i.on("click", function () {
                    YT.Device.openPhoneBook(function (t) {
                        e.find(".x-phone-book").val(t.phoneNumber)
                    })
                })
            }, initSms: function (e, t, n) {
                var i = e.find(".y-sms-mess");
                i.length < 1 || i.on("click", function () {
                    var t = e.find(".x-sms-mess").val();
                    YT.Device.sendSms(t)
                })
            }, callPhone: function (e, t, n) {
                var i = e.find(".y-call-phone");
                i.length < 1 || i.on("click", function () {
                    var t = e.find(".x-call-phone").val();
                    YT.Device.callPhone(t)
                })
            }
        };
    YT.log.debug("---end--", t)
}), function () {
    var l, u = [], d = [], a = "", f = "", p = $("#mainBody"), h = $(".navbar-pages"), t = $(".ui-view-overlay"),
        e = $(".ui-view-left"), n = $(".ui-view-right"), g = !1, m = 0, v = YT.NavUtil = {
            idSeed: 1e4, getId: function () {
                return "yt_pid_" + ++v.idSeed
            }, init: function () {
                v.initEvent()
            }, initEvent: function () {
                t && t.on("click", v.closeBtnMenu)
            }, loadIndexPage: function (e, n) {
                m = W_HEIGHT < 650 ? 650 : W_HEIGHT, l = $("#loaddingPage");
                var i = $('<div data-page="index" class="page-view page-transform page-on-center"></div>');
                h.append(i), a = e, this.loadPage(e, function (t) {
                    i.html(t), i.attr("data-page", e), n && n()
                }, function () {
                    n && n()
                })
            }, gotoIndex: function () {
                YT.log.info("返回首页"), h.find(".page-view:not(.page-on-center)").remove();
                var t = {pid: v.getId(), url: a};
                u = [], (d = []).push(t), v.prevPage()
            }, nextPage: function (c) {
                return !g && (v.closeBtnMenu(), g = !0, f == c ? g = !1 : (YT.AuthBox && YT.AuthBox.hideAuthPanel(), v.removeHistoryPage(f), YT.openWaitPanel(), void this.loadPage(c, function (t) {
                    var e = $(window).scrollTop();
                    if (f = c, l.show(), 3 <= u.length) {
                        YT.log.info("超过历史页面保存长度");
                        var n = u.shift().pid;
                        h.find("[data-pid=" + n + "]").remove()
                    }
                    scroll(0, 0), $("body,html").css({height: m + "px"});
                    var i = h.find(".page-on-center");
                    p.addClass("page-transform"), i.addClass("page-transform"), h.find(".page-on-left").removeClass("page-on-left").addClass("page-on-history");
                    var a = v.getId(), o = i.attr("data-page");
                    i.attr("data-pid", a), i.addClass("page-on-left page-center-to-left").removeClass("page-on-center");
                    var r = $("<div data-page='" + c + "' class='page-view page-transform page-on-center'></div>");
                    h.append(r), r.html(t).addClass("page-right-to-center");
                    var s = {pid: a, url: o, top: e};
                    u.push(s), d.push(s), setTimeout(function () {
                        i.removeClass("page-center-to-left"), r.removeClass("page-right-to-center"), r.removeClass("page-transform"), p.removeClass("page-transform"), $("body,html").css({height: "auto"}), g = !1
                    }, 400), YT.Collection.setDatas(), YT.hideWaitPanel(), l.hide()
                }, function () {
                    g = !1
                })))
            }, prevPage: function () {
                if (g) return !1;
                if (v.closeBtnMenu(), g = !0, 0 == d.length) return g = !1, void YT.gotoClientBack();
                YT.AuthBox && YT.AuthBox.hideAuthPanel();
                var t = d.pop();
                u.pop();
                var e = t.pid, i = t.url, a = t.top;
                if (f = i, 0 < h.find("[data-pid=" + e + "]").length) {
                    YT.log.info("存在历史页面"), $("body,html").css({height: m + "px"});
                    var n = h.find(".page-on-left"), o = h.find(".page-on-center");
                    p.addClass("page-transform"), o.addClass("page-transform"), n.addClass("page-left-to-center page-on-center").removeClass("page-on-left"), o.addClass("page-center-to-right").removeClass("page-on-center"), h.find(".page-on-history:last").addClass("page-on-left").removeClass("page-on-history"), $("html, body").animate({scrollTop: a}, 100), setTimeout(function () {
                        n.removeClass("page-left-to-center"), n.removeClass("page-transform"), p.removeClass("page-transform"), $("body,html").css({height: "auto"}), o.remove(), g = !1
                    }, 400), YT.hideWaitPanel(), v.reloadPageTitle(), YT.Collection.setDatas()
                } else YT.log.info("历史页面中不存在----重新加载历史页面"), YT.openWaitPanel(), this.loadPage(i, function (t) {
                    YT.hideWaitPanel(), l.show();
                    var e = $("<div data-page='" + i + "' class='page-view page-transform page-on-left'></div>");
                    h.prepend(e), $("body,html").css({height: m + "px"});
                    var n = h.find(".page-on-center");
                    n.addClass("page-transform"), p.addClass("page-transform"), e.addClass("page-left-to-center page-on-center").removeClass("page-on-left"), n.addClass("page-center-to-right").removeClass("page-on-center"), e.html(t), $("html, body").animate({scrollTop: a}, 100), setTimeout(function () {
                        e.removeClass("page-left-to-center"), e.removeClass("page-transform"), p.removeClass("page-transform"), $("body,html").css({height: "auto"}), n.remove(), g = !1
                    }, 400), YT.Collection.setDatas()
                }, function () {
                    g = !1
                })
            }, refreshPage: function () {
                var t = YT.isEmpty(f) ? a : f;
                if (YT.isEmpty(t)) return YT.gotoClientBack(), !1;
                var e = h.find(".page-on-center");
                YT.openWaitPanel(), v.loadPage(t, function (t) {
                    YT.hideWaitPanel(), e.html(t)
                })
            }, removeHistoryPage: function (a) {
                var o = [], i = [];
                $.each(d, function (t, e) {
                    var n = e.url, i = e.pid;
                    a != n && n.indexOf(a) < 0 ? o.push(e) : h.find("[data-pid=" + i + "]").remove()
                }), $.each(u, function (t, e) {
                    var n = e.url;
                    a != n && n.indexOf(a) < 0 && i.push(e)
                }), d = o, u = i
            }, openLeftMenu: function () {
                t && t.show(), e && e.show(), setTimeout(function () {
                    e.addClass("active")
                }, 100)
            }, openRightMenu: function () {
                t && t.show(), n && n.show(), p && p.addClass("ui-right-reveal"), v.timeRight && clearTimeout(v.timeRight), v.timeRight = setTimeout(function () {
                    n.addClass("active")
                }, 400)
            }, closeBtnMenu: function () {
                v.closeLeftBtnMenu(), v.closeRightBtnMenu()
            }, closeLeftBtnMenu: function () {
                t && t.hide(), p && p.removeClass("ui-right-reveal"), e.addClass("close-view-left"), v.timeLeftClose && clearTimeout(v.timeLeftClose), v.timeLeftClose = setTimeout(function () {
                    e.removeClass("active close-view-left").hide()
                }, 400)
            }, closeRightBtnMenu: function () {
                t && t.hide(), n && n.removeClass("active"), p && p.removeClass("ui-right-reveal"), v.timeRightClose && clearTimeout(v.timeRightClose), v.timeRightClose = setTimeout(function () {
                    n.hide()
                }, 400)
            }, reloadPageTitle: function () {
                var t = h.find(".page-on-center").find(".page.current");
                YT.initPageTitle(t)
            }, loadPage: function (t, e, n) {
                var i = $.ajax({
                    url: t, data: {}, type: "get", success: e, timeout: 8e3, error: function (t) {
                        n && n()
                    }, complete: function (t, e) {
                        YT.hideWaitPanel(), "timeout" == e ? i.abort() : "0" == e ? YT.alertinfo("网络连接异常!请检查您的网络") : "404" == e && YT.alertinfo("请求页面不存在！")
                    }
                })
            }
        };
    v.init()
}(), YT.util.Observable = function () {
    this.events || (this.events = {}), this.listeners && (this.on(this.listeners), delete this.listeners)
}, YT.override(YT.util.Observable, {
    filterOptRe: /^(?:scope|delay|single)$/, fireEvent: function () {
        var t, e, n, i = Array.prototype.slice.call(arguments, 0), a = i[0].toLowerCase(), o = !0, r = this.events[a];
        if (!0 === this.eventsSuspended) (e = this.eventQueue) && e.push(i); else if ("object" == typeof r) if (r.bubble) {
            if (!1 === r.fire.apply(r, i.slice(1))) return !1;
            if ((n = this.getBubbleTarget && this.getBubbleTarget()) && n.enableBubble) return (t = n.events[a]) && "object" == typeof t && t.bubble || n.enableBubble(a), n.fireEvent.apply(n, i)
        } else i.shift(), o = r.fire.apply(r, i);
        return o
    }, on: function (t, e, n, i) {
        var a, o, r;
        if ("object" == typeof t) for (a in i = t) o = i[a], this.filterOptRe.test(a) || this.on(a, o.fn || o, o.scope || i.scope, o.fn ? o : i); else t = t.toLowerCase(), "boolean" == typeof(r = this.events[t] || !0) && (this.events[t] = r = new YT.util.Event(this, t)), r.addListener(e, n, "object" == typeof i ? i : {})
    }, un: function (t, e, n) {
        var i = this.events[t.toLowerCase()];
        "object" == typeof i && i.removeListener(e, n)
    }
}), YT.util.Event = function (t, e) {
    this.name = e, this.obj = t, this.listeners = []
}, YT.override(YT.util.Event, {
    addListener: function (t, e, n) {
        var i;
        e = e || this.obj, this.isListening(t, e) || (i = this.createListener(t, e, n), this.firing && (this.listeners = this.listeners.slice(0)), this.listeners.push(i))
    }, createListener: function (t, e, n) {
        n = n || {};
        var i, a, o, r, s, c, l, u, d, f, p, h = {fn: t, scope: e = e || this.obj, options: n}, g = t;
        return n.target && (i = g, a = n, o = e, g = function () {
            a.target == arguments[0] && i.apply(o, Array.prototype.slice.call(arguments, 0))
        }), n.delay && (r = g, s = n, c = h, l = e, g = function () {
            var t = new YT.util.DelayedTask;
            c.tasks || (c.tasks = []), c.tasks.push(t), t.delay(s.delay || 10, r, l, Array.prototype.slice.call(arguments, 0))
        }), n.single && (u = g, d = this, f = t, p = e, g = function () {
            return d.removeListener(f, p), u.apply(p, arguments)
        }), h.fireFn = g, h
    }, findListener: function (t, e) {
        var n, i = this.listeners, a = i.length;
        for (e = e || this.obj; a--;) if ((n = i[a]) && n.fn == t && n.scope == e) return a;
        return -1
    }, isListening: function (t, e) {
        return -1 != this.findListener(t, e)
    }, removeListener: function (t, e) {
        var n, i, a, o = !1;
        if (-1 != (n = this.findListener(t, e))) {
            if (this.firing && (this.listeners = this.listeners.slice(0)), (i = this.listeners[n]).task && (i.task.cancel(), delete i.task), a = i.tasks && i.tasks.length) {
                for (; a--;) i.tasks[a].cancel();
                delete i.tasks
            }
            this.listeners.splice(n, 1), o = !0
        }
        return o
    }, clearListeners: function () {
        for (var t = me.listeners, e = t.length; e--;) this.removeListener(t[e].fn, t[e].scope)
    }, fire: function () {
        var t, e = this.listeners, n = e.length, i = 0;
        if (0 < n) {
            this.firing = !0;
            for (var a = Array.prototype.slice.call(arguments, 0); i < n; i++) if ((t = e[i]) && !1 === t.fireFn.apply(t.scope || this.obj || window, a)) return this.firing = !1
        }
        return !(this.firing = !1)
    }
}), YT.Session = {
    getSession: function (e) {
        try {
            YT.log.info("--sessionStorage--", "App");
            var t = YT.JsonEval(sessionStorage.getItem("loginsession"));
            if (YT.isEmpty(t)) {
                var n = YT.dataUrl("common/querySessionInfo");
                YT.ajaxData(n, {}, function (t) {
                    t && "1" == t.STATUS ? (sessionStorage.setItem("loginsession", JSON.stringify(t)), e(t)) : (YT.alertinfo(t.MSG, ""), YT.hideWaitPanel())
                }, function () {
                })
            } else e(t)
        } catch (t) {
            YT.log.debug(t)
        }
    }
}, function () {
    var r, t = window, s = {};
    YT.Device = {
        _hideKeyboard: function () {
            $("#mainBody .navbar-views").css({
                "-webkit-transform": "translateY(0)",
                transform: "translateY(0)"
            }), $("#mainBody .yui-auth-form").css({"-webkit-transform": "translateY(0)", transform: "translateY(0)"});
            try {
                r.blur()
            } catch (t) {
            }
        }, _preShowKeyBoard: function (t) {
            YT.isString(t) && (t = $("#" + t));
            var e = t.height(), n = t.offset().top, i = $(window).scrollTop(), a = W_HEIGHT + i - n - e;
            a < 280 && ($("#mainBody .views").css({
                "-webkit-transform": "translateY(" + (a - 280) + "px)",
                transform: "translateY(" + (a - 280) + "px)"
            }), $("#mainBody .yui-auth-form").css({
                "-webkit-transform": "translateY(" + (a - 280) + "px)",
                transform: "translateY(" + (a - 280) + "px)"
            }))
        }, initEvent: function (t) {
            var a = this, o = {
                TPwd: "showTPwdPicker",
                LPwd: "showLPwdPicker",
                Date: "showDatePicker",
                Money: "showMoneyPicker",
                Number: "showNumPicker",
                IDC: "showIDCPicker"
            };
            t.on("click", "input[data-keyboard]", function (t) {
                t.preventDefault();
                var e = $(this);
                "true" == e.attr("data-clear") && e.val(""), YT.Client.showKeyBoard(e);
                var n = e.attr("data-keyboard"), i = o[n];
                return r = e, a[i] && a[i](e), !1
            })
        }, ajaxData: function (t, e, n, i) {
            !YT.isEmpty(i) && YT.isFunction(i) || (i = function (t) {
                YT.hideWaitPanel(), YT.alertinfo(NS.MSG.MsgAjaxError)
            });
            var a = {
                url: t, params: e, success: function (t) {
                    if ("005" == t.STATUS) return YT.alertinfo("超时"), !1;
                    n && n(t)
                }, failure: i
            };
            YT.Client.post(a)
        }, ajaxCashe: function (t, e, n, i, a, o) {
            !YT.isEmpty(o) && YT.isFunction(o) || (o = function (t) {
                YT.hideWaitPanel(), YT.alertinfo(NS.MSG.MsgAjaxError)
            });
            var r = {
                url: t, version: e, type: n, params: i, success: function (t) {
                    if ("005" == t.STATUS) return YT.alertinfo("超时"), !1;
                    a && a(t)
                }, failure: o
            };
            YT.Client.getNativeCache(r)
        }, openMenuPage: function (t) {
            YT.isEmpty(t.type) ? YT.alertinfo("菜单未配置！", "提示") : YT.Client.openMenuPage(t)
        }, initPageTitle: function (t) {
            YT.Client.initPageTitle(t)
        }, titleSearchBar: function (t) {
            YT.Client.titleSearchBar(t)
        }, showPageArea: function (t, e, n) {
            if ($("#loaddingPage").hide(), e) {
                var i = $(window).scrollTop();
                YT.each(e, function (t) {
                    t.find("input,textarea").each(function (t, e) {
                        $(e).is(":focus") && $(e).blur()
                    }), !1 === t.is(":hidden") && t.attr("data-pageTop", i), t.removeClass("current")
                })
            }
            t.addClass("current"), i = (i = t.attr("data-pageTop")) || 0, $("html, body").animate({scrollTop: i}, 100), !0 === n && YT.Device.initPageTitle(t)
        }, openWaitPanel: function (t) {
            t = t || "正在加载中。。。", YT.Client.openWaitPanel(t)
        }, hideWaitPanel: function (t) {
            t = t || 100, setTimeout(YT.Client.hideWaitPanel, t)
        }, alertinfo: function (t, e, n, i) {
            (n = YT.getFunctionName(n)) && ")" != n.substr(n.length - 1) && (n += "()"), e = e || "温馨提示", i = i || "确定", YT.Client.alertinfo(t, e, n, i)
        }, confirm: function (t, e, n, i, a, o) {
            YT.log.debug("----init-1----", "YT.confirm"), (n = YT.getFunctionName(n)) && ")" != n.substr(n.length - 1) && (n += "()"), (i = YT.getFunctionName(i)) && ")" != i.substr(i.length - 1) && (i += "()"), e = e || "温馨提示", a = a || "确定", o = o || "取消", YT.Client.confirm(t, e, n, i, a, o)
        }, sessionTimeout: function (t) {
            YT.log.debug("----init-1----", "YT.sessionTimeout"), title = "温馨提示", msg = "会话超时，请重新登录", t = t || "确定", YT.Client.sessionTimeout(title, msg, t)
        }, setSession: function (t) {
            YT.Client.setSession(t)
        }, getSession: function (t) {
            t = YT.getFunctionName(t), YT.Client.getSession(t)
        }, showTPwdPicker: function (t) {
            try {
                var e = Fw.getRandom(16), n = {
                    len: t.attr("data-len") || "6",
                    transAuth: t.attr("data-transAuth"),
                    random: e,
                    type: "TPWD",
                    callback: "_savePwd"
                };
                YT.Client.showTPwdPicker(t, n);
                var i = {ele: t};
                s.PwdPick = YT.apply(i, n)
            } catch (t) {
                alert("showTPwdPicker=" + t)
            }
        }, showLPwdPicker: function (t) {
            try {
                var e = Fw.getRandom(16), n = {
                    id: t.attr("id"),
                    len: t.attr("data-maxlength") || "16",
                    random: e,
                    type: "LPWD",
                    callback: "_savePwd"
                };
                YT.Client.showLPwdPicker(t, n);
                var i = {ele: t};
                s.PwdPick = YT.apply(i, n)
            } catch (t) {
                alert("showLPwdPicker:" + t)
            }
        }, showDatePicker: function (t) {
            try {
                var e = {
                    text: t.val() || (new Date).format("yyyy-MM-dd"),
                    format: t.attr("data-format") || "yyyy-MM-dd",
                    min: "1900-01-01",
                    max: "2099-12-31",
                    callback: "_saveDate"
                }, n = t.attr("data-min"), i = t.attr("data-max"), a = t.attr("data-startId"), o = t.attr("data-endId");
                a && $("#" + a).val() ? e.min = $("#" + a).val() : n && (e.min = n), o && $("#" + o).val() ? e.max = $("#" + o).val() : i && (e.max = i), YT.Client.showDatePicker(t, e);
                var r = {ele: t};
                s.datePick = YT.apply(r, e)
            } catch (t) {
                alert("showDatePicker=" + t)
            }
        }, showMoneyPicker: function (t) {
            try {
                var e = YT.Format.unfmtAmt(t.val()), n = {
                    text: e = "0.00" != e && "" != e ? 1 * e + "" : "",
                    len: t.attr("data-maxlength") || "9",
                    type: "MONEY",
                    callback: "_saveMoney"
                };
                YT.Client.showMoneyPicker(t, n);
                var i = {ele: t};
                s.moneyPick = YT.apply(i, n)
            } catch (t) {
                alert("showMoneyPicker=" + t)
            }
        }, showNumPicker: function (t) {
            try {
                var e = {text: t.val(), len: t.attr("data-maxlength") || "19", type: "NUMBER", callback: "_saveNumber"};
                YT.Client.showNumPicker(t, e);
                var n = {ele: t};
                s.numberPick = YT.apply(n, e)
            } catch (t) {
                alert("showNumPicker=" + t)
            }
        }, showIDCPicker: function (t) {
            try {
                var e = {
                    id: t.attr("id"),
                    text: t.val(),
                    len: t.attr("data-maxlength") || "18",
                    type: "IDC",
                    callback: "_saveIDC"
                };
                YT.Client.showIDCPicker(t, e);
                var n = {ele: t};
                s.IDCPick = YT.apply(n, e)
            } catch (t) {
                alert("showIDCPicker=" + t)
            }
        }, openPhoneBook: function (t) {
            t = YT.getFunctionName(t), YT.Client.openPhoneBook(t)
        }, geneQRC: function (t, e) {
            e = YT.getFunctionName(e), YT.Client.geneQRC(t || {}, e)
        }, sweepQRC: function (t) {
            t = YT.getFunctionName(t), YT.Client.sweepQRC(t)
        }, sharePages: function (t, e) {
            e = YT.getFunctionName(e), YT.Client.sharePages(t, e)
        }, shareReceipt: function (t, e) {
            e = YT.getFunctionName(e), YT.Client.shareReceipt(t, e)
        }, openMobilePhoto: function (t, e) {
            t.type = "photo", t.COMP_RATE = t.COMP_RATE ? t.COMP_RATE : "0.5", e = YT.getFunctionName(e), YT.Client.openMobilePhoto(t, e)
        }, openMobilePhotoAlbum: function (t, e) {
            t.type = "photoAlbum", t.COMP_RATE = t.COMP_RATE ? t.COMP_RATE : "0.5", e = YT.getFunctionName(e), YT.Client.openMobilePhoto(t, e)
        }, openMobileCamera: function (t, e) {
            t.type = "camera", t.COMP_RATE = t.COMP_RATE ? t.COMP_RATE : "0.5", e = YT.getFunctionName(e), YT.Client.openMobilePhoto(t, e)
        }, sendSms: function (t) {
            var e = {phoneNo: t};
            YT.Client.sendSms(e)
        }, callPhone: function (t) {
            var e = {phoneNo: t};
            YT.Client.callPhone(e)
        }, showPopupWindow: function (a) {
            var o = [];
            $.each(a, function (t) {
                var e = {}, n = a[t];
                e.name = n.name;
                var i = n.func;
                i = YT.getFunctionName(i), e.func = i, o.push(e)
            }), YT.Client.showPopupWindow(o)
        }, encryptData: function (t, e) {
            t = YT.getFunctionName(t), YT.Client.encryptData(t)
        }, decodeData: function (t, e) {
            t = YT.getFunctionName(t), YT.Client.decodeData(t)
        }, location: function (t) {
            t = YT.getFunctionName(t), YT.Client.location(t)
        }, showCityPicker: function (t, e) {
            var n = {deep: t, callback: e = YT.getFunctionName(e)};
            YT.Client.showCityPicker(n)
        }, titleSearchBar: function (t, e) {
            e = YT.getFunctionName(e);
            var n = {placeholder: deep, callback: e};
            YT.Client.titleSearchBar(n)
        }, gotoIndex: function () {
            YT.Client.gotoIndex()
        }, gotoBack: function () {
            YT.Client.gotoBack()
        }, getLayoutData: function (t) {
            var e = {callback: t = YT.getFunctionName(t)};
            YT.Client.getLayoutData(e)
        }, setLayoutData: function (t) {
            YT.Client.setLayoutData(t)
        }, setGesture: function (t) {
            var e = YT.getFunctionName(t);
            YT.Client.setGesture(e)
        }, checkGesture: function (t) {
            var e = YT.getFunctionName(t);
            YT.Client.checkGesture(e)
        }, openFingerPrint: function (t) {
            var e = YT.getFunctionName(t);
            YT.Client.openFingerPrint(e)
        }, openOrColse: function (t) {
            var e = YT.getFunctionName(t);
            YT.Client.openOrColse(e)
        }, fingerPrint: function (t) {
            var e = YT.getFunctionName(t);
            YT.Client.checkFingerPrint(e)
        }
    }, t._savePwd = function (t) {
        try {
            YT.isString(t) && (t = YT.JsonEval(t));
            var e = t.passVal, n = t.showVal, i = s.PwdPick, a = i.ele, o = i.transAuth;
            if (YT.isEmpty(e) || YT.isEmpty(n)) return a.attr("data-value", "").val(""), void(YT.isEmpty(o) || "true" != o || YT.AuthBox.TPwdCallBack(a));
            a.attr("data-value", e), a.val(n), a.attr("data-random", i.random), YT.isEmpty(o) || "true" != o || YT.AuthBox.TPwdCallBack(a)
        } catch (t) {
            alert("PwdPick:" + t)
        }
    }, t._saveDate = function (t) {
        var e = s.datePick.ele;
        e.val(t), e.trigger("change")
    }, t._saveMoney = function (t) {
        var e = s.moneyPick.ele;
        e.val(YT.Format.fmtAmt(t)), e.trigger("change"), e.trigger("input")
    }, t._saveNumber = function (t) {
        var e = s.numberPick.ele;
        e.val(t), e.trigger("change"), e.trigger("input")
    }, t._saveIDC = function (t) {
        var e = s.IDCPick.ele;
        e.val(t), e.trigger("change"), e.trigger("input")
    }
}(), $(function () {
    var TAG = "YT.Web";

    function initEvent() {
        $(document).on("click", "#_authBox .sixDigitPassword i", function () {
            $("#DRAW_PWD").focus()
        }), $(document).on("keyup", "#DRAW_PWD", function (t) {
            var e = $("div.sixDigitPassword").find("i");
            if (curIndex = 0, t = t || window.event, YT.log.debug("============keyup=========", t), 8 == t.keyCode || 48 <= t.keyCode && t.keyCode <= 57 || 96 <= t.keyCode && t.keyCode <= 105) {
                for (curIndex = this.value.length - 1, l = e.size(); l--;) "password" == $("#DRAW_PWD").attr("type") ? e.eq(l).html("·") : e.eq(l).html(this.value.split("")[l]), l > curIndex && e.eq(l).html("");
                6 == this.value.length && YT.log.debug("===密码===", this.value)
            } else this.value = this.value.replace(/\D/g, "")
        })
    }

    function confTitleButton(t) {
        return t && 3 == t.length ? {exist: t[0], name: t[1], func: t[2]} : {exist: !1}
    }

    function confPageTitle(t) {
        var e = $(t), n = {title: e.attr("title")}, i = e.attr("data-btnLeft").split("|");
        n.leftButton = confTitleButton(i);
        var a = e.attr("data-btnRight").split("|");
        n.rightButton = confTitleButton(a);
        var o = e.data("theme");
        return n.theme = o, n
    }

    YT.log.debug("---init--", TAG), NS.EVT = {
        TOUCH_START: "mousedown",
        TOUCH_END: "mouseup",
        TOUCH_MOVE: "scroll"
    }, initEvent(), YT.Client = {
        aaDialog: function (t) {
            YT.log.debug("AA收款提示框調用成功"), t && t()
        }, openMenuPage: function (t) {
            YT.nextPage(t.url)
        }, initPageTitle: function (t) {
            YT.log.debug("--initPageTitle-----", "Client.web");
            var e = confPageTitle(t);
            YT.Titlebar.change(e)
        }, titleSearchBar: function (t) {
            YT.Titlebar.changeTitle(t)
        }, openFingerPrint: function (t) {
            YT.log.debug("开通指纹验证"), t && t()
        }, fingerPrint: function (t) {
            YT.log.debug("指纹验证调用成功"), t && t()
        }, openMobilePhoto: function (t) {
            YT.log.debug("手机相册调用成功"), t && t()
        }, openPhoneBook: function (func) {
            YT.showTips("打开通讯录"), eval("(" + func + "())")
        }, sendSms: function (t) {
            YT.showTips(t.phoneNo)
        }, callPhone: function (t) {
            YT.showTips(t.phoneNo)
        }, openWaitPanel: function () {
            YT.Layer.openWaitPanel()
        }, hideWaitPanel: function (t) {
            YT.Layer.hideWaitPanel(t)
        }, alertinfo: function (msg, title, okAct, okName) {
            YT.log.debug("alertinfo--callback", TAG), YT.MsgBox.hideMsgBox(), YT.MsgBox.alertinfo(msg, title, function () {
                YT.log.debug(okAct, TAG), okAct && (")" != okAct.substr(okAct.length - 1) && (okAct += "()"), eval("(" + okAct + ")")), YT.MsgBox.hideMsgBox()
            }, okName)
        }, confirm: function (msg, title, okAct, cancleAct, okName, cancleName) {
            YT.log.debug("-confirm-1-", TAG), YT.MsgBox.hideMsgBox(), YT.MsgBox.confirm(msg, title, function () {
                YT.log.debug("confirm-21-", TAG), YT.MsgBox.hideMsgBox(), okAct && eval("(" + okAct + ")")
            }, function () {
                YT.log.debug("-confirm-22-", TAG), cancleAct && eval("(" + cancleAct + ")"), YT.MsgBox.hideMsgBox()
            }, okName, cancleName)
        }, sessionTimeout: function () {
            YT.Client.alertinfo("会话超时，请重新登录", "温馨提示", "YT.redirect('http://www.baidu.com')")
        }, getSession: function (t) {
            try {
                return window[t]({mobile: "15609693868", cerType: "01", cerId: "3401221988181810213"})
            } catch (t) {
                alert("getSession=" + t)
            }
        }, post: function (t) {
            YT.AjaxUtil.ajaxData(t)
        }, showPopupWindow: function (t) {
            var e = [], i = [];
            0 < t.length && ($.each(t, function (t, e) {
                var n = {text: e.name, onClick: e.func};
                i.push(n)
            }), e = [i, [{text: "取消", bold: !0}]], YT.actions(e))
        }, _hidePopupWindow: function () {
        }, gotoIndex: function () {
            YT.Client.alertinfo("返回系统首页")
        }, gotoBack: function () {
            YT.Client.alertinfo("返回上一级")
        }, showPopupWindow: function () {
            YT.Client.alertinfo("showPopupWindow")
        }, showDatePicker: function (t, e) {
            "true" != t.attr("data-init") && (t.attr("data-init", "true"), t.off("click").removeAttr("readonly"))
        }, showMoneyPicker: function (t, e) {
            "true" != t.attr("data-init") && t.attr("data-init", "true").off("click").removeAttr("readonly")
        }, showNumPicker: function (t, e) {
            "true" != t.attr("data-init") && t.attr("data-init", "true").off("click").removeAttr("readonly")
        }, showIDCPicker: function (t, e) {
            "true" != t.attr("data-init") && t.attr("data-init", "true").off("click").removeAttr("readonly")
        }, showTPwdPicker: function (t, e) {
            "true" != t.attr("data-init") && t.attr("data-init", "true").off("click").removeAttr("readonly")
        }, showLPwdPicker: function (t, e) {
            "true" != t.attr("data-init") && t.attr("data-init", "true").off("click").removeAttr("readonly")
        }, showKeyBoard: function (t) {
            YT.log.info("showKeyBoard")
        }, pullToRefresh: function (t) {
            console.log("初始化下拉更新" + t)
        }, login: function (t, e) {
            YT.ajaxData("login", {
                LOGIN_TYPE: "00",
                LOGIN_ID: t,
                SYS_VERSION: "",
                CLIENT_OS_TYPE: "iphone",
                APP_VERSION: "1.31",
                DEVICE_UUID: "",
                LOGIN_PASS: e
            }, function (t) {
                if (1 == t.STATUS) return console.log("登录成功"), sessionStorage.setItem("session", JSON.stringify(t)), window.location.reload(), !1;
                YT.alert(t.MSG, "提示", function () {
                    window.location.reload()
                })
            }, function (t) {
                YT.alert(t.MSG, "提示", function () {
                    window.location.reload()
                })
            })
        }, logout: function () {
            YT.confirm("确认退出登录", "提示", function () {
                YT.ajaxData("logout", {}, function () {
                    window.location.reload()
                }), sessionStorage.removeItem("session")
            })
        }, setCollection: function (t) {
            var i = {
                ad: "当前位置街道",
                aoc: "操作前的内容",
                bc: "银行编号",
                bv: "设备系统版本",
                ce: "扩展属性",
                clt: "设备类型",
                cn: "运营商",
                ci: "渠道ID",
                ct: "操作时间",
                dm: "设备型号",
                dn: "设备标识",
                en: "事件编号",
                fp: "上一个页面地址",
                gps: "GPS",
                ia: "客户端ip",
                ij: "是否越狱",
                ind: "是否安装新设备",
                mt: "消息类型",
                nw: "网络类型",
                oc: "操作内容",
                pp: "当前页面地址",
                rn: "设备分辨率",
                si: "启动ID",
                sv: "设备系统版本",
                st: "上一个页面停留时间",
                stt: "启动时间"
            }, a = "#########################################################\n";
            $.each(t, function (t, e) {
                var n = i[t];
                "mt" == t && ("3" == e ? e = "操作" : "4" == e && (e = "访问")), YT.isEmpty(n) || (a += n + ": " + e + "\n")
            }), a += "#########################################################", YT.log.info(a);
            var e = localStorage.getItem("WEB_COLLECT_STORAGE"), n = [];
            YT.isEmpty(e) || (n = YT.JsonEval(e)), n.push(t), localStorage.setItem("WEB_COLLECT_STORAGE", YT.JsonToStr(n)), 10 <= n.length && (localStorage.removeItem("WEB_COLLECT_STORAGE"), YT.log.info(n))
        }, getLayoutData: function (t) {
            var e = localStorage.getItem("APP_LAYOUT_STORAGE");
            e = YT.isEmpty(e) ? null : JSON.parse(e);
            var n = t.callback;
            n && window[n](e)
        }, setLayoutData: function (t) {
            localStorage.setItem("APP_LAYOUT_STORAGE", JSON.stringify(t))
        }
    }, YT.log.debug("---end---", TAG)
}), YT.Ajax = function (t) {
    return YT.apply(this, t), YT.Ajax.superclass.constructor.call(this), this
}, YT.extend(YT.Ajax, YT.util.Observable, {
    autoLoad: !0, autoDecode: !0, params: {}, load: function (t) {
        var e = this;
        YT.apply(e.params, t), e.lastOptions = t, !1 !== e.fireEvent("beforeload", e) && (e.isLoading = !0, YT.log.debug("--ajax.url---", e.url), YT.ajaxData(e.url, e.params, function (t) {
            e.fireEvent("load", e, t), e.isLoading = !1
        }))
    }, reload: function () {
        this.load(this.lastOptions)
    }
}), YT.TransAjax = function () {
    return {
        _timeoutflg: !0, options: {timeout: 12e4, showError: !0, loadText: !1}, init: function (t) {
            YT.apply(this.options, t)
        }, clear: function () {
            this._timeoutflg = !1, this._timeoutHandle && clearTimeout(this._timeoutHandle)
        }, start: function () {
        }, newXhr: function () {
            var t = null;
            try {
                t = new XMLHttpRequest
            } catch (t) {
            }
            return t
        }, loadData: function (t) {
            YT.log.debug("---ajaxData-init----", "TransAjax"), t = YT.apply({
                loadText: !1,
                mediaType: "application/json"
            }, t), this.post(t)
        }, post: function (t) {
            var e = this, n = e.options;
            YT.apply(n, t), e.start();
            var i = this.newXhr();
            i.onreadystatechange = function () {
                if (4 == this.readyState) if (200 == this.status) {
                    e.clear(), YT.log.debug("---callback ", "TransAjax");
                    var t = YT.JsonEval(this.responseText);
                    if (t) {
                        if ("005" == t.STATUS) return YT.hideWaitPanel(), void setTimeout(function () {
                            YT.nextPage("page/00/P400.html")
                        }, 500);
                        if ("006" == t.STATUS) return YT.hideWaitPanel(), void YT.alertinfo("" + t.MSG);
                        if ("1" != t.STATUS && n.showError) return YT.hideWaitPanel(), void YT.alertinfo("" + t.MSG);
                        n.success && n.success(t)
                    } else n.showError && YT.alertinfo(NS.MSG.MsgAjaxError), n.failure && n.failure(t)
                } else n.showError && YT.alertinfo(NS.MSG.MsgAjaxError)
            }, i.open("POST", n.url, !0), i.setRequestHeader("Content-Type", n.mediaType || "application/json"), i.send(YT.JsonToStr(n.param || n.params || {})), 0 < n.timeout && (e._timeoutHandle = setTimeout(function () {
                i && e._timeoutflg && (YT.hideWaitPanel(), i.abort(), n.showError && YT.alertinfo(NS.MSG.MsgAjaxError))
            }, n.timeout))
        }
    }
}, $(function () {
    var t = "YT.Checkbox";
    YT.log.debug("---init--", t);
    var a = YT.Checkbox = {
        init: function (t, e, n) {
            var i = t.find("[data-type='checkbox']");
            0 < i.length && a.initCheckBox(i, t)
        }, initCheckBox: function (t, e) {
            t.find(".y-checkbox").each(function () {
                var t = $(this).find("input[type=checkbox]");
                t.prop("checked") ? ($(this).addClass("checked"), t.attr("checked", "true")) : ($(this).removeClass("checked"), t.removeAttr("checked"))
            }), e.on("click", ".y-checkbox", function () {
                var t = $(this).find("input[type=checkbox]");
                $(this).hasClass("checked") ? ($(this).removeClass("checked"), t.removeAttr("checked", "true")) : ($(this).addClass("checked"), t.attr("checked", "true"))
            })
        }
    };
    YT.log.debug("---end--", t)
}), YT.Component = function (t) {
    return YT.apply(this, t), YT.Component.superclass.constructor.call(this), this.initComponent(), this.initEvents(), this.finishRender(), this
}, YT.extend(YT.Component, YT.util.Observable, {
    initComponent: function () {
        this.el = this.contentEl && (YT.isString(this.contentEl) ? $("#" + this.contentEl) : this.contentEl), this.initTpl()
    }, initEvents: YT.emptyFn, initTpl: YT.emptyFn, finishRender: function () {
        this.fireEvent("render", this)
    }
}), function () {
    var n = "YT.Layer";
    YT.Layer = {
        _forbidLayerId: "backDivX",
        _waitLayerId: "waitDivX",
        _waitCnt: 0,
        _fMenuCnt: 0,
        _fmCache: [],
        openWaitPanel: function (t) {
            if (YT.log.debug("---openWaitPanel--", n), t = t || "请稍等,正在加载中...", !this._waitCnt) {
                this.createWaitForbider();
                var e = document.createElement("div");
                e.id = this._waitLayerId, this._lastLayer = document.body.appendChild(e), (e = $(e).addClass("wait-layer")).append(YT.template("<div align='center' class='container'><div class='loading'>${msg}</div></div>", {msg: t})), this._waitCnt++
            }
        },
        hideWaitPanel: function (t) {
            var e = this;
            if (YT.log.debug("---hideWaitPanel--" + e._waitCnt, n), e._waitCnt-- <= 0) e._waitCnt = Math.max(e._waitCnt, 0); else try {
                setTimeout(function () {
                    e.closeWaitForbider(), e.removeDivId(e._waitLayerId)
                }, t || 300)
            } catch (t) {
                YT.log.debug("---hideWaitPanel-error-", n)
            }
        },
        createWaitForbider: function (t) {
            YT.log.debug("---createWaitForbider--", n), t = t || this._forbidLayerId;
            var e = document.createElement("div");
            return e.id = t, document.body.appendChild(e), $(e).addClass("forbid")
        },
        removeDivId: function (t) {
            var e = document.getElementById(t);
            e && e.parentNode.removeChild(e)
        },
        closeWaitForbider: function (t) {
            t = t || this._forbidLayerId, this.removeDivId(t)
        }
    }
}(), function () {
    var u = "YT.MsgBox";
    YT.log.debug("-----init----", u);
    var d = YT.MsgBox = {
        _forbidLayerId: "backMsgDiv",
        _contentLayerId: "contentMsgDiv",
        _creatCnt: 0,
        _tplMsgBox: null,
        init: function () {
            d._tplMsgBox = ['<div class="ui-dialog show">', '<div class="ui-dialog-cnt">', '<div class="ui-dialog-bd">', "<h4>${title}</h4>", "<div>${msg}</div>", "</div>", '<div class="ui-dialog-ft ui-btn-group">', '<button type="button" id="msg_box_ok">${okName}</button>', "\t {@if cancleAct}", '<button type="button" id="msg_box_cancle">${cancleName}</button>', "\t {@/if}", "</div>", "</div>", "</div>"].join(""), YT.log.debug("-----init-compile-2--", u)
        },
        alertinfo: function (t, e, n, i) {
            YT.log.debug("----init-1----", "YT.alertinfo"), YT.MsgBox.openMsgBox(t, e, n || YT.MsgBox.hideMsgBox, i)
        },
        confirm: function (t, e, n, i, a, o) {
            YT.log.debug("----init-1----", "YT.confirm"), YT.MsgBox.openMsgBox(t, e, n, a, i || YT.MsgBox.hideMsgBox, o)
        },
        openMsgBox: function (t, e, n, i, a, o) {
            if (YT.log.debug("---openMsgPanel--", u), !this._creatCnt) {
                this._creatCnt++, this.createMsgBoxForbider();
                var r = document.createElement("div");
                r.id = this._contentLayerId, this._lastLayer = document.body.appendChild(r), r = $(r).addClass("msg-layer");
                var s = d._tplMsgBox, c = YT.isDefined(a);
                YT.log.debug("=====cancle====" + c, u);
                var l = juicer(s, {
                    title: e || "提示",
                    msg: t || "",
                    cancleAct: c,
                    okName: i || "确认",
                    cancleName: o || "取消"
                });
                r.append(l), $("#msg_box_ok").on("click", function () {
                    YT.log.debug("=====button.ok==1===", u), n && n(r), d.hideMsgBox()
                }), c && $("#msg_box_cancle").on("click", function () {
                    YT.log.debug("=====button.cancle==1===", u), a && a(r), d.hideMsgBox()
                })
            }
        },
        hideMsgBox: function () {
            if (YT.log.debug("---hideMsgBox--" + d._creatCnt, u), d._creatCnt-- <= 0) d._creatCnt = Math.max(d._creatCnt, 0); else try {
                d.closeMsgBoxForbider(), d.removeDivId(d._contentLayerId)
            } catch (t) {
                YT.log.debug("---hideMsgPanel-error-", u)
            }
        },
        createMsgBoxForbider: function (t) {
            YT.log.debug("---createMsgBoxForbider--", u), t = t || this._forbidLayerId;
            var e = document.createElement("div");
            return e.id = t, document.body.appendChild(e), $(e).addClass("forbid-box")
        },
        removeDivId: function (t) {
            var e = document.getElementById(t);
            e && e.parentNode.removeChild(e)
        },
        closeMsgBoxForbider: function (t) {
            t = t || this._forbidLayerId, this.removeDivId(t)
        }
    };
    d.init(), YT.log.debug("-----end----", u)
}(), function () {
    var o = YT.Popup = {
        _popupBoxId: "_popupBox",
        _AppWindow: "",
        _popupMenuTpl: ['<div class="yui-popup-mask"></div>', '<div class="yui-popup-group"><div class="yui-popup-array">', "<em></em>", "<i></i>", "</div>", '<div class="yui-popup-menus">', "<ul>{@each LIST as item,index}", '<li data-func="${item.func}">${item.name}</li>', "{@/each}", "</ul></div>", "</div>"].join(""),
        initPopupindow: function (t, e, n) {
            this._AppWindow = e, this.hidePopupPanel();
            var i = n.tpl ? n.tpl : "", a = document.createElement("div");
            t[0].appendChild(a), a.id = this._popupBoxId;
            var o = '\t<div class="ui-popup-overlay"></div>\t<div class="ui-popup-modal-view">\t\t<div class="ui-popup-modal-group">\t\t\t<div class="ui-popup-modal-label">请选择</div>\t\t{@each LIST as item,index}\t\t\t<div class="ui-popup-modal-button" func="${item.func}">${item.name}</div>\t\t{@/each}\t\t</div>\t\t<div class="ui-popup-modal-group">\t\t\t<div class="ui-popup-modal-button">取消</div>\t\t</div>\t</div>';
            o = i || o;
            var r = Fw.template(o, {LIST: n.list});
            $(a).html(r);
            var s = $(a).find(".ui-popup-modal-view");
            setTimeout(function () {
                s.addClass("modal-in")
            }, 200), $("body").css({overflow: "hidden"}), this.initEvent()
        },
        initEvent: function () {
            var t = $("#" + this._popupBoxId);
            t.on("click", ".ui-popup-modal-button", this.btnFunc), t.on("click", ".ui-popup-overlay", this.hidePopupPanel)
        },
        btnFunc: function () {
            var t = $(this).attr("func");
            YT.isEmpty(t) || o._AppWindow[t] && o._AppWindow[t](), o.hidePopupPanel()
        },
        hidePopupPanel: function () {
            $("body").css({overflow: "auto"});
            var t = $("#" + o._popupBoxId), e = t.find(".ui-popup-modal-view");
            t.find(".ui-popup-overlay").remove(), e.removeClass("modal-in"), e.addClass("modal-out"), setTimeout(function () {
                t.remove()
            }, 300)
        },
        initPopuMenus: function (t, e, n) {
            var i = Fw.template(o._popupMenuTpl, {LIST: n}), a = document.createElement("div");
            t[0].appendChild(a), a.id = "_popuMenus", $(a).html(i), $(a).on("click", ".yui-popup-menus li", function () {
                var t = $(this).data("func");
                YT.isEmpty(t) || e[t] && e[t](), o.hidePopuMenus()
            }), $(a).on("click", ".yui-popup-mask", function () {
                o.hidePopuMenus()
            })
        },
        hidePopuMenus: function () {
            $("#_popuMenus").remove()
        }
    }
}(), $(function () {
    var t = "YT.Radiobox";
    YT.log.debug("---init--", t);
    var a = YT.Radiobox = {
        init: function (t, e, n) {
            var i = t.find('[data-type="radiobox"]');
            i.length < 1 || (a.initNormalRabiobox(i, t, e, n), a.initTabRabiobox(i, t, e, n))
        }, initTabRabiobox: function (t, i, a, e) {
            t.find(".y-radio-tab").each(function () {
                $(this).find('input[type="radio"]').prop("checked") ? $(this).addClass("current") : $(this).removeClass("current")
            }), i.on("click", ".y-radio-tab", function () {
                var t = $(this).attr("data-callback"), e = $(this).find("input[type=radio]"), n = e.attr("name");
                i.find("input[type=radio]").filter("[name=" + n + "]").each(function () {
                    $(this).parent().removeClass("current"), $(this).removeAttr("checked")
                }), $(this).addClass("current"), e.attr("checked", "true"), a[t] && a[t]()
            })
        }, initNormalRabiobox: function (t, e, n, i) {
            t.find(".y-radio").each(function () {
                var t = $(this).find('input[type="radio"]');
                t.prop("checked") ? ($(this).addClass("checked"), t.attr("checked", "true")) : ($(this).removeClass("checked"), t.removeAttr("checked"))
            }), e.on("click", ".y-radio", function () {
                var t = $(this).find("input[type=radio]").attr("name");
                e.find("input[type=radio]").filter("[name=" + t + "]").each(function () {
                    $(this).prop("checked") ? ($(this).parent().addClass("checked"), $(this).attr("checked", "true")) : ($(this).parent().removeClass("checked"), $(this).removeAttr("checked"))
                })
            })
        }
    };
    YT.log.debug("---end--", t)
}), function () {
    var c = null, a = 181, l = YT.Slider = {
        init: function (t, e, n) {
            var i = t.find(".y-slider");
            if (0 == i.length) return !1;
            a = i.attr("data-height"), a = YT.isEmpty(a) ? 181 : a, seajs.use("assets/js/plugin/swiper/swiper.min", function () {
                l.initSilde(i, e, n)
            })
        }, initSilde: function (e, n, t) {
            var i = e.find(".x-slider"), a = [];
            i.each(function (t, e) {
                var n = {};
                n.img = $(e).attr("data-img"), n.title = $(e).attr("data-title"), n.click = $(e).attr("data-click"), a.push(n)
            });
            var o = e.attr("data-title"), r = !1;
            YT.isEmpty(o) || "show" != o || (r = !0);
            var s = e.attr("data-auto");
            s = YT.isEmpty(s) ? 3e3 : s, c || l.initTpl(r), e.html(YT.template(c, {LIST: a})), new Swiper(".ui-swiper-containe", {
                lazy: !0,
                autoplay: {delay: s, stopOnLastSlide: !1, disableOnInteraction: !0},
                on: {
                    slideChange: function () {
                        var t = e.data("change");
                        n[t] && n[t]()
                    }
                }
            }), e.on("click", "[data-click]", function () {
                var t = $(this).data("click"), e = $(this).data("index");
                n[t] && n[t](e)
            })
        }, initTpl: function (t) {
            var e = [];
            e.push('<div class="ui-swiper-containe">'), e.push('\t<div <div class="swiper-wrapper ui-swiper-wrapper">'), e.push("{@each LIST as item,index}"), e.push('\t\t<div class="swiper-slide" data-click="${item.click}" data-index="${index}" >'), e.push('\t\t\t<img class="swiper-lazy" data-src="${item.img}" width="100%" height="' + a + 'px" />'), e.push('\t\t\t<div class="swiper-lazy-preloader" style="height:' + a + 'px"><div class="swiper-lazy-preloader-loadding"></div></div>'), t && e.push('\t\t<div class="ui-swiper-title">${item.title}</div>'), e.push("\t\t</div>"), e.push("{@/each}"), e.push("\t</div>"), e.push("</div>"), c = e.join("")
        }
    }
}(), function () {
    var c = YT.Sms = {
        initSmsController: function (e, n, t) {
            var i = e.find(".y-sms");
            if (!(i.length < 1)) {
                var a = i.find(".x-sms-send");
                if (a.length < 1) YT.log.error("---YT.Sms---", "not found 'x-sms-send' define"); else {
                    c.relem = e.find(".r-sms-send");
                    var o = i.data("url") || "common/smsCodeSend";
                    if (o) {
                        var r = i.data("send-clazz"), s = i.data("callback");
                        c.timer = c.counttime = i.data("timer") || 60, c.openTimerListener(a, t, function () {
                            if (YT.isEmpty(s)) {
                                var t = e.find(r);
                                return !!YT.Form.validator(t) && YT.Form.getFormJson(t)
                            }
                            return n[s]()
                        }, function () {
                            YT.log.info("---sms.callback---")
                        }, o)
                    }
                }
            }
        }, getSmsCode: function (t, e, n, i) {
            var a = this;
            i = YT.dataUrl(i), YT.ajaxData(i, e, function (t) {
                YT.hideWaitPanel(), "1" == t.STATUS ? (YT.showTips("短信已发送!"), a.relem && 0 < a.relem.length && (a.relem.data("flow-no-name") < 1 && Fw.log.warn("---YT.Sms---", "'r-send-sms' data-flow-no-name is not defined"), a.relem.find("input").val(t[a.relem.data("flow-no-name") || "SMS_FLOW_NO"])), n && n()) : YT.alertinfo(t.MSG)
            }, function (t) {
                YT.hideWaitPanel(), YT.alertinfo(t ? t.MSG : "网络失败，请稍后重试")
            })
        }, openTimerListener: function (e, n, i, t, a) {
            void 0 === n && (n = {});
            var o = this;
            e.on("click", function () {
                if (i) {
                    var t = i();
                    if (!t) return;
                    $.extend(n, t)
                }
                o._initTime = (new Date).getTime() - 1e3, o._sumTime = o.counttime, o.getSmsCode(e, n, function () {
                    o._startTimerListener(e)
                }, a), o._startTimerListener(e)
            })
        }, _startTimerListener: function (t) {
            var e = this;
            if (0 < e.timer) {
                var n = e._getTimer();
                e.timer = e._sumTime - n, 0 < e.timer ? (t.text(e.timer + "秒"), t.attr("disabled", !0), e.intervalID = setTimeout(function () {
                    e._startTimerListener(t)
                }, 1e3)) : e._closeTimerListener(t)
            } else e._closeTimerListener(t)
        }, _getTimer: function () {
            var t = (new Date).getTime();
            return Math.floor((t - this._initTime) / 1e3)
        }, _closeTimerListener: function (t) {
            var e = this;
            e.intervalID && (clearTimeout(e.intervalID), t.removeAttr("disabled"), t.text("重新发送"), e.timer = e.counttime, e.intervalID = null)
        }
    }
}(), function () {
    var l = YT.Tab = {
        initTab: function (c, n) {
            var i = n.Panel, t = i.find(".y-tab");
            l.App = c, l.Page = n.Page, l.Json = n.Json, t.each(function () {
                var t = l.box = $(this), e = l.menu = t.find("[data-name=tab-ele]"),
                    o = l.content = t.find("[data-name=tab-ele-content]"),
                    r = (e.length, l.slidedom = t.find(".r-tab-container")),
                    s = (e.parent(), o.parent().width(), void 0 === t.find(".active") ? t.find(".active") : e.eq(0));
                s.addClass("active"), s.attr("data-ready", "true"), YT.loadPage(o.eq(s.index()), s.data("url"), {}, function () {
                    YT.Form.initPanel(l.Page, l.App, l.Json);
                    var t = s.data("callback");
                    YT.isEmpty(t) || c[t] && c[t](o.eq(s.index()))
                }), s.attr("data-ready", "false"), e.on("click", function () {
                    var t = $(this), e = t.index(), n = t.data("url"), i = t.data("callback"),
                        a = s.attr("data-ready", "true");
                    n && a && (YT.loadPage(o.eq(e), n, {}, function () {
                        YT.Form.initPanel(l.Page, l.App, l.Json), YT.isEmpty(i) || c[i] && c[i](o.eq(e))
                    }), t.attr("data-ready", "false"), l.slideEvent(t, e, o, r))
                }), n.Scroll || ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (l.body = i[0], l.body.addEventListener("touchstart", Fw.bind(l.start, this), !1))
            })
        }, slideEvent: function (t, e, n, i) {
            t.addClass("active").siblings().removeClass("active");
            var a = $(window).width() * e * -1;
            i.animate({left: a})
        }, start: function (t) {
            var e = t.targetTouches[0];
            l.startPos = {
                x: e.pageX,
                y: e.pageY,
                time: +new Date
            }, l.isScrolling = 0, l.body.addEventListener("touchmove", Fw.bind(l.move, this), !1), l.body.addEventListener("touchend", Fw.bind(l.end, this), !1)
        }, move: function (t) {
            if (!(1 < t.targetTouches.length || t.scale && 1 !== t.scale)) {
                var e = t.targetTouches[0];
                l.endPos = {
                    x: e.pageX - l.startPos.x,
                    y: e.pageY - l.startPos.y
                }, l.isScrolling = Math.abs(l.endPos.x) < Math.abs(l.endPos.y) ? 1 : 0, 0 === l.isScrolling && t.preventDefault()
            }
        }, end: function (t) {
            l.body.removeEventListener("touchmove", Fw.bind(l.move, this), !1), l.body.removeEventListener("touchend", Fw.bind(l.end, this), !1);
            var e = +new Date - l.startPos.time;
            if (0 === l.isScrolling && 100 < Number(e)) {
                var n = l.box.find(".active").index();
                if (YT.isEmpty(l.endPos) || YT.isEmpty(l.endPos.x)) return;
                if (50 < l.endPos.x ? n -= 1 : l.endPos.x < -50 && (n += 1), l.box.length < n || n < 0) return;
                var i = l.menu.eq(n), a = i.data("url"), o = i.data("callback"),
                    r = l.box.find(".active").attr("data-ready", "true");
                a && r && (YT.loadPage(l.content.eq(n), a, {}, function () {
                    YT.Form.initPanel(l.Page, l.App, l.Json), YT.isEmpty(o) || l.App[o] && l.App[o](l.content.eq(n))
                }), i.attr("data-ready", "false"), l.slideEvent(i, n, l.content, l.slidedom))
            }
        }, initTabFilter: function (t, e, n) {
            var i = t.find(".y-select-change-tab");
            i.length < 1 || (l.initTabClick(i, t), l.initTabItemClick(i, t, e, n), l.initShandow(i))
        }, initTabClick: function (a, o) {
            a.find(".y-select-change div").on("click", "", function (t) {
                var e = $(this).data("index");
                if ($(this).hasClass("makesoft1")) return $(this).removeClass("makesoft1"), $(this).addClass("makesoft"), $(o).parent().css("height", "initial"), $(o).css("height", "initial"), a.find(".y-select-change-item[data-index='" + e + "']").hide(), void a.find(".y-shandow").hide();
                var n = a.find(".y-select-change div[class='makesoft1']");
                n.removeClass("makesoft1"), n.addClass("makesoft");
                var i = n.data("index");
                a.find(".y-select-change-item[data-index='" + i + "']").hide(), $(o).parent().css("height", "100%"), $(o).css("height", "100%"), $(this).removeClass("makesoft"), $(this).addClass("makesoft1"), a.find(".y-shandow").show(), a.find(".y-select-change-item[data-index='" + e + "']").stop().slideDown()
            })
        }, initTabItemClick: function (i, t, a, e) {
            var o = i.data("change");
            i.find(".y-select-change-item div").on("click", "", function () {
                $(this).siblings(".current").removeClass("current"), $(this).addClass("current");
                var t = $(this).parent();
                t.hide(), t.attr("data-value", $(this).data("value"));
                var e = t.data("index"), n = i.find(".y-select-change div[data-index='" + e + "']");
                n.removeClass("makesoft1"), n.addClass("makesoft"), n.children("span:first-child").html($(this).html()), i.find(".y-shandow").hide(), o && a && a[o] && a[o]()
            })
        }, initShandow: function (e) {
            e.find(".y-shandow").on("touchmove", function (t) {
                t.preventDefault(), t.stopPropagation()
            }), e.find(".y-shandow").on("click", function (t) {
                e.find(".y-select-change div").addClass("makesoft"), e.find(".y-select-change div").removeClass("makesoft1"), e.find(".y-shandow").hide(), e.find(".y-select-change-item").hide()
            });
            var t = $(window).height();
            e.find(".y-shandow").height(t)
        }
    }
}(), $(function () {
    var t = "YT.Tips";
    YT.log.debug("--init--", t);
    var a = {
        content: "", stayTime: 1e3, type: "info", callback: function () {
        }
    };
    YT.Tips = {
        showTips: function (t) {
            t = YT.apply(a, t);
            var e = YT.template('<div class="ui-poptips ui-poptips-${type}"><div class="ui-poptips-cnt"><i></i>${content}</div></div>', t),
                n = $(e);
            n.appendTo("body");
            var i = n.height();
            n.css({"-webkit-transform": "translateY(-" + i + "px)"}), setTimeout(function () {
                n.css({"-webkit-transition": "all .5s", "-webkit-transform": "translateY(0)"})
            }, 20), 0 < t.stayTime && setTimeout(function () {
                n.css({"-webkit-transform": "translateY(-" + i + "px)"}), setTimeout(function () {
                    n.remove()
                }, 500)
            }, t.stayTime)
        }
    }, YT.log.debug("--end--", t)
}), $(function () {
    var n = "YT.Titlebar";
    YT.log.debug("--init--", n);
    var i = ['<div class="web-title-warp">', '\t<h1 class="web-title"></h1>', '\t<span class="titlebar-left-btn"></span>', '\t<span class="titlebar-right-btn"></span>', "</div>", '<div class="web-searchbar-warp"></div>'].join(""),
        r = ['<div class="ui-searchbar ui-border-radius">', '<i class="ui-icon-search"></i>', '<div class="ui-searchbar-input">', '<input value="${val}" data-name="SEARCH_NAME" type="text" placeholder="${placeholder}">', "</div>", "</div>"].join(""),
        s = YT.Titlebar = {
            divId: "web_titlebar", create: function () {
                YT.log.debug("---create--", n);
                var t = document.createElement("div");
                t.id = this.divId;
                var e = $(t);
                e.prependTo(document.body), this.div = e.html(i), this.titleEl = e.find(".web-title"), this.btnLeft = e.find(".titlebar-left-btn"), this.btnRight = e.find(".titlebar-right-btn")
            }, change: function (t) {
                this.div.removeClass(), "red" == t.theme ? this.div.addClass("theme-red") : "alpha" == t.theme ? this.div.addClass("theme-alpha") : this.div.addClass("theme-def"), t.title && this.titleEl.html(t.title), s._button(this.btnLeft, t.leftButton), s._button(this.btnRight, t.rightButton), this.div.find(".web-title-warp").show(), this.div.find(".web-searchbar-warp").empty()
            }, _button: function (t, e) {
                e && "true" == e.exist ? ("titlebar-right-btn" == t.attr("class") ? t.show().html(e.name) : t.show(), t.attr("onclick", e.func)) : t.hide()
            }, changeTitle: function (t) {
                if (!YT.isEmpty(t) && YT.isObject(t)) {
                    var e = t.defalutVal ? t.defalutVal : "", n = t.placeholder ? t.placeholder : "请输入搜索内容",
                        i = t.callback, a = {val: e, placeholder: n}, o = ($("#" + s.divId), YT.template(r, a));
                    this.div.find(".web-title-warp").hide(), this.div.find(".web-searchbar-warp").html(o).show(), this.div.off("keydown", ".web-searchbar-warp input"), this.div.on("keydown", ".web-searchbar-warp input", function () {
                        var t = window.event;
                        13 == t.keyCode && (i && i($(this).val()), s.div.find(".web-searchbar-warp").empty(), s.div.find(".web-title-warp").show()), 27 == t.keyCode && (s.div.find(".web-searchbar-warp").empty(), s.div.find(".web-title-warp").show())
                    })
                }
            }
        };
    s.create(), YT.log.debug("--end--", n)
}), function () {
    var o = "", c = YT.Upload = {
        init: function (t, e, n) {
            c.initImgUploadTemp(t, e, n)
        }, initImgUploadTemp: function (t, e, n) {
            if (0 == t.find(".y-upload-img").length) return !1;
            seajs.use("assets/js/plugin/jquery/ajaxfileupload", function () {
                c.initImgUpload(t, e, n)
            })
        }, initImgUpload: function (t, e, n) {
            var i = t.find(".y-upload-img"), a = (c.uploadImg = i).find(".ui-upload [type=file]"),
                o = i.attr("data-maxNum"), r = i.attr("data-maxSize"), s = i.attr("data-compress"),
                module = i.attr("data-module");
            r = YT.isEmpty(r) ? 1024 : r, c.compress = YT.isEmpty(s) ? "" : s, c.maxNum = YT.isEmpty(o) ? 3 : o, c.curMaxNum = 0, c.module = module, i.on("click", ".ui-upload-close", function () {
                c.closeUpload($(this))
            }), i.on("click", "[data-event=fileUpload]", function () {
                c.fileUpload(e)
            }), i.on("click", "[data-event=filePreview]", function () {
                c.filePreview($(this))
            }), a.on("change", function () {
                c.thatImg = $(this);
                var t = $(this)[0].files[0];
                ["jpeg", "png", "gif", "jpg"].indexOf(t.type.split("/")[1]) < 0 ? YT.showTips("文件类型仅支持 jpeg/jpg/png/gif！") : t.size > 1024 * r ? YT.showTips("文件大小不能超过:" + r + "K") : (c.imgType = t.type || "image/jpeg", c.buildLoading(t, i))
            })
        }, fileUpload: function (i) {
            var t = c.uploadImg.find(".img-upload[type=file]"), n = [];
            $.each(t, function (t, e) {
                n[t] = $(e).attr("id")
            });
            var e = c.uploadImg.attr("data-url");
            e = YT.isEmpty(e) ? "file/upload" : e;
            var a = YT.dataUrl(e);
            $.ajaxFileUpload({
                url: a,
                secureuri: !1,
                dataType: "text",
                data: {module: c.module},
                fileElementId: n,
                success: function (t) {
                    YT.log.info("upload reponse :", t);
                    try {
                        var e = YT.JsonEval(t);
                        if (e && "1" == e.STATUS) {
                            var n = c.uploadImg.attr("data-callback");
                            i[n] && i[n](e)
                        } else YT.alertinfo(e && e.MSG || "上传失败！", "系统提示")
                    } catch (t) {
                        YT.alertinfo("上传失败！", "系统提示")
                    }
                }
            })
        }, buildLoading: function (t, e) {
            var n = c.thatImg.parent().parent();
            o = YT.id();
            var i = '<div class="ui-upload-item"><i class="ui-upload-close" data-id=' + c.thatImg.attr("id") + '></i><div class="ui-upload"><div><i class="ui-upload-loding"></i><div class="ui-upload-text">加载中...</div></div></div></div>',
                a = $(i);
            n.before(a), c.loading = a, c.fileToDataUrl(t), c.curMaxNum++, c.judgePanel()
        }, fileToDataUrl: function (t) {
            var e = new FileReader;
            e.readAsDataURL(t), e.onload = function (t) {
                var e = t.target.result;
                "compress" == c.compress && c.compressHandler(e, function (t) {
                    c.loading.html('<i class="ui-upload-close" data-id="' + c.thatImg.attr("id") + '"></i><div class="ui-upload-info"><img data-id="' + o + '" data-event="filePreview" alt="" src="' + t + '"></div>'), YT.log.info("图片加载成功!");
                    var e = c.thatImg.clone();
                    e.attr("id", o), e.attr("name", o), e.attr("class", "img-upload"), c.loading.append(e), c.loading && (c.loading = null), c.thatImg && c.thatImg.val("")
                })
            }, e.onerror = function () {
                c.loading && c.loading.remove(), c.curMaxNum--, c.judgePanel(), YT.log.info("图片加载失败!"), c.loading = null
            }
        }, compressHandler: function (t, i) {
            var a = new window.Image;
            a.src = t, a.onload = function () {
                var t, e = document.createElement("canvas"), n = e.getContext("2d");
                e.width = a.width, e.height = a.height, n.drawImage(a, 0, 0, e.width, e.height), t = e.toDataURL(c.imgType, .2), i(t)
            }
        }, closeUpload: function (t) {
            t.parent().remove(), c.abortHandler(), c.curMaxNum--;
            var e = $(t).attr("data-id");
            $("#" + e).parent().parent().show()
        }, abortHandler: function () {
            c.reader && (c.reader.abort(), YT.showTips("图片上传中断!"))
        }, judgePanel: function () {
            var t = c.uploadImg.find(".ui-upload-select");
            c.curMaxNum >= c.maxNum ? t.hide() : t.show(), 1 < t.length && c.thatImg.parent().parent().hide()
        }, filePreview: function (t) {
            var e = $("#mainBody");
            e.css("overflow", "hidden"), e.append(YT.template('<div class="ui-upload-preview" id="yt-upload-preview">\t<div class="ui-upload-preview-mask" data-event="preview-hide"></div>\t<div class="ui-upload-preview-img">\t\t<i class="close" data-id="${ID}" data-event="preview-del"></i>\t\t<img src="${SRC}">\t</div></div>', {
                SRC: t.attr("src"),
                ID: t.attr("data-id")
            }));
            var n = $("#yt-upload-preview");
            n.on("click", "[data-event=preview-hide]", function () {
                n.remove()
            }), n.on("click", "[data-event=preview-del]", function () {
                var t = $(this).attr("data-id");
                $("#" + t).parent().remove(), n.remove(), c.curMaxNum--, c.judgePanel()
            })
        }
    }
}();