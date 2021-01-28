var Fw = {

    getBasePath: function () {
        return window.basePath;
    },
    idSeed: 10000,
    /**
     * 返回ID
     * @param {Object} v
     */
    id: function () {
        return 'fw-gen-' + (++Fw.idSeed);
    },
    /**
     * 返回UUID
     * @param {int} len
     */
    uuid: function (len) {
        var uuid = [], me = arguments.callee, c = me.chars;
        len = len || 32;
        if (!c) c = me.chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        for (var i = 0; i < len; i++) uuid[i] = c[0 | Math.random() * 62];
        return uuid.join('');
    },
    /**
     * 日志输出
     * @param info
     * @param tag
     */
    log: function (info, tag) {
        if (console) {
            console.log(tag, '\t', info);
        }
    },
    /**
     * 空白函数
     */
    emptyFn: function () {
    },
    /**
     * 定义命名空间
     */
    namespace: function () {
        var space = null, path;
        Fw.each(arguments, function (v) {
            path = v.split('.');
            space = window[path[0]] = window[path[0]] || {};
            Fw.each(path.slice(1), function (v2) {
                space = space[v2] = space[v2] || {};
            });
        });
        return space;
    },
    //页面下拉框渲染 公共模型
    querySelectViewCM: function (selectObj, selectValue, selectFlg, flag) {
        var comboBoxTpl = Fw.template([
            '{@each data as item,index}',
            '<option value="${item.parValue}">${item.parName}</option>',
            '{@/each}'
        ]);
        //参数依次为下拉框对象，下拉框选中值，下拉框后台接受渲染标志,
        Fw.util.Ajax.query({
            //数据源
            service: 'wdCustService',
            method: 'queryCustLvl',
            async: false,
            //请求参数
            params: {
                flag: selectFlg
            },
            sort: [{
                property: 'parValue',
                direction: 'asc'
            }],
//            async:false,//异步加载
            //请求成功后回调
            success: function (data, result) {
                //插入一条
                if (!flag) {
                    data.splice(0, 0, {
                        parId: '',
                        parName: '请选择'
                    });
                }
                var html = comboBoxTpl.render({
                    data: data
                });
                selectObj.html(html);
                //设置选中值
                selectObj.val(selectValue);
            }
        });
    },
    /**
     * 属性复制（同jQuery的$.extend）
     * @param {} object
     * @param {} config
     * @param {} defaults
     */
    apply: function (object, config, defaults) {
        if (defaults) {
            Fw.apply(object, defaults);
        }
        if (object && config && Fw.isObject(config)) {
            for (var property in config) {
                object[property] = config[property];
            }
        }
        return object;
    },
    /**
     * 属性复制（仅复制object中不存在的属性）
     * @param {} object
     * @param {} config
     */
    applyIf: function (object, config) {
        if (object) {
            for (var p in config) {
                if (!Fw.isDefined(object[p])) {
                    object[p] = config[p];
                }
            }
        }
        return object;
    },
    /**
     * 继承
     */
    extend: function () {
        var objectConstructor = Object.prototype.constructor, inlineOverrides = function (o) {
            for (var m in o) {
                if (!o.hasOwnProperty(m)) {
                    continue;
                }
                this[m] = o[m];
            }
        };
        return function (subclass, superclass, overrides) {
            /*
            if(Fw.isString(subclass)){
                var className = subclass;
                if(!eval(className)){
                    seajs.async = false;
                    seajs.use(className);
                    subclass = eval(className);
                    alert(subclass);
                    return Fw.extend(subclass, superclass, overrides);
                }
            }
            */
            //
            if (Fw.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor !== objectConstructor ? overrides.constructor : function () {
                    superclass.apply(this, arguments);
                };
            }
            if (!superclass) {
                return null;
            }
            //
            var F = function () {
            };
            var subclassProto, superclassProto = superclass.prototype;
            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;
            if (superclassProto.constructor === objectConstructor) {
                superclassProto.constructor = superclass;
            }
            subclass.override = function (overrides) {
                Fw.override(subclass, overrides);
            };
            subclassProto.override = inlineOverrides;
            subclassProto.proto = subclassProto;
            subclass.override(overrides);
            subclass.extend = function (o) {
                return Fw.extend(subclass, o);
            };
            return subclass;
        };
    }(),
    /**
     * 覆盖
     * @param {} cls
     * @param {} overrides
     */
    override: function (cls, overrides) {
        Fw.apply(cls.prototype, overrides);
    },
    /**
     * 转换为字符
     * @param {Object} v
     */
    toString: function (v) {
        return Object.prototype.toString.apply(v);
    },
    /**
     * 是否已定义
     * @param {} v
     */
    isDefined: function (v) {
        return typeof v !== 'undefined';
    },
    /**
     * 是否为空
     * @param {} v
     * @param {} allowBlank
     */
    isEmpty: function (v, allowBlank) {
        if (Fw.isObject(v)) {
            var name;
            for (name in v) {
                return false;
            }
            return true;
        }
        if (Fw.isArray(v)) {
            return !v.length;
        }
        return v === null || v === undefined || String(v).toUpperCase() === 'NULL' || (!allowBlank ? v === '' : false);
    },
    /**
     * 是否相等
     * 支持各种类型比较
     */
    isEqual: function (value, value2) {
        //都是NULL
        if (Fw.isEmpty(value) && Fw.isEmpty(value2)) {
            return true;
        }
        //其中一个是NULL
        else if (Fw.isEmpty(value) || Fw.isEmpty(value2)) {
            return false;
        }
        //数组
        else if (Fw.isArray(value) && Fw.isArray(value2)) {
            return value.sort().toString() === value2.sort().toString();
        }
        //日期
        else if (Fw.isDate(value) && Fw.isDate(value2)) {
            return value.getTime() === value2.getTime();
        }
        //非Object（Object只做简单比较）
        else if (!Fw.isObject(value) && !Fw.isObject(value)) {
            return String(value) === String(value2);
        }

        //
        return value === value2;
    },
    /**
     * 是否是数组
     * @param {} v
     */
    isArray: function (v) {
        return Fw.toString(v) === '[object Array]';
    },
    /**
     * 是否是日期
     * @param {} v
     */
    isDate: function (v) {
        return Fw.toString(v) === '[object Date]';
    },
    /**
     * 是否是对象
     * @param {} v
     */
    isObject: function (v) {
        return !!v && Fw.toString(v) === '[object Object]' && !Fw.isNumber(v.length) && !Fw.isFunction(v.splice) && (!Fw.isFunction(v.propertyIsEnumerable) || !v.propertyIsEnumerable('splice'));
    },
    /**
     * 是否是函数
     * @param {} v
     */
    isFunction: function (v) {
        return Fw.toString(v) === '[object Function]';
    },
    /**
     * 是否是数值型
     * @param {} v
     */
    isNumber: function (v) {
        return typeof v === 'number' && isFinite(v);
    },
    /**
     * 是否是字符型
     * @param {} v
     */
    isString: function (v) {
        return typeof v === 'string';
    },
    /**
     * 是否是布尔型
     * @param {} v
     */
    isBoolean: function (v) {
        return typeof v === 'boolean';
    },
    /**
     * 是否是原始类型
     * @param {} v
     */
    isPrimitive: function (v) {
        return Fw.isString(v) || Fw.isNumber(v) || Fw.isBoolean(v);
    },
    /**
     * 是否可迭代
     * @param {} v
     */
    isIterable: function (v) {
        return (v && typeof v !== 'string') ? Fw.isDefined(v.length) : false;
    },
    /**
     * 是否是URL
     * @param {} v
     * @return {}
     */
    isURL: function (v) {
        return Fw.util.VTypes.url(v);
    },
    /**
     * 去掉字符两端空格
     * @param {} str
     * @return {}
     */
    trim: function (str) {
        var reg = '/(^\s*)|(\s*$)/';
        return str.replace(reg, '');
    },
    /**
     * 页面跳转
     * @param {} url
     * @param {} params
     * @param {} local（如果是向后抬提交请求，则应设置为false）
     */
    redirect: function (url, params, local) {
        YT.openWaitPanel();
        if (Fw.isEmpty(params)) {
            params = {};
        }
        var ps = params;
        //本地存储
        if (local !== false) {
            window.localStorage.setItem("params", JSON.stringify(params));
        }
        //在url中存储（一般用于提交到后台）
        else {
            var search = document.location.search;
            if (!Fw.isEmpty(search)) {
                search = search.replace(/(&?)t=[^&]+/g, '');
                search = search.replace(/(&?)parameters=[^&]+/g, '');
                url += search === '?' ? '' : search;
            }
            url += (url.indexOf('?') > 0 ? '&' : '?') + 'parameters=' + ps;
        }
        ///
        url += (url.indexOf('?') > 0 ? '&' : '?') + 't=' + new Date().getTime();
        document.location.href = Fw.getBasePath() + "/" + url;
    },

    /**
     * 返回parameters参数
     * 特指页面跳转间传递的参数
     */
    getParameters: function (key) {
        var params = window.localStorage.getItem("params");
        if (params) {
            var paraObj = eval('(' + params + ')');
            if (paraObj && key) {
                return paraObj[key] ? paraObj[key] : null;
            }
            return null;
        }
        return null;
    },

    /**
     * 遍历数组
     * @param {} value
     * @param {} fn
     * @param {} scope
     */
    each: function (value, fn, scope) {
        if (Fw.isEmpty(value)) {
            return;
        }
        if (!Fw.isDefined(scope)) {
            scope = value;
        }
        if (Fw.isObject(value)) {
            var i = 0;
            for (var prop in value) {
                if (value.hasOwnProperty(prop)) {
                    if (fn.call(scope || value, prop, value[prop], i++, value) === false) {
                        return;
                    }
                    ;
                }
            }
        } else {
            if (!Fw.isIterable(value) || Fw.isPrimitive(value)) {
                value = [value];
            }
            for (var i = 0, len = value.length; i < len; i++) {
                if (fn.call(scope || value[i], value[i], i, value) === false) {
                    return i;
                }
                ;
            }
        }
    },
    /**
     * 绑定作用域
     * @param {} fn
     * @param {} scope
     * @param {} args
     * @return {}
     */
    bind: function (fn, scope, args, appendArgs) {
        if (!Fw.isFunction(fn)) {
            return fn;
        }
        if (args) {
            var method = fn, slice = Array.prototype.slice;
            return function () {
                var callArgs = args || arguments;
                if (appendArgs === true) {
                    callArgs = slice.call(arguments, 0);
                    callArgs = callArgs.concat(args);
                }
                return method.apply(scope, callArgs);
            };
        }
        else {
            return function () {
                return fn.apply(scope, arguments);
            };
        }
    },
    /**
     * 触发回调函数
     * @param {} fn
     * @param {} scope
     * @param {} args
     */
    call: function (fn, scope, args) {
        if (!fn) {
            return fn;
        }
        else if (Fw.isFunction(fn)) {
            if (scope) {
                if (args) {
                    return fn.apply(scope, args);
                }
                else {
                    return fn.call(scope);
                }
            }
            else {
                return Fw.call(fn, fn, args);
            }
        }
        else if (Fw.isObject(fn) && fn.fn) {
            return Fw.call(fn.fn, scope || fn.scope, args || fn.args);
        }
        else {
            return fn;
        }
    },
    /**
     * 延时执行
     */
    defer: function (fn, millis, scope) {
        fn = Fw.bind(fn, scope);
        if (millis > 0) {
            return setTimeout(function () {
                fn();
            }, millis);
        }
        fn();
        return 0;
    },
    /**
     * 页面加载完毕后，初始化应用
     * @param {} app
     */
    onReady: function (app) {
        if (app.init) {
            var deps = seajs.parseDependencies(app.init.toString());
            if (Fw.isArray(deps)) {
                if (Fw.BASE_LIB) {
                    deps = Fw.BASE_LIB.concat(deps);
                }
                if (app.requires && app.requires.length > 0) {
                    deps = deps.concat(app.requires);
                }
                Fw.define(deps, Fw.bind(app.init, app));
            } else {
                Fw.define(Fw.bind(app.init, app));
            }
        } else {
            Fw.define(app);
        }
    },
    /**
     * 定义模块
     * 桥接Seajs
     * http://seajs.org
     * @param {} deps
     * @param {} factory
     */
    define: function () {
        define.apply(this, arguments);
    },
    /**
     * 模版
     * 桥接Juicer
     * http://juicer.name
     */
    template: function () {
        var tpl = arguments[0];
        if (Fw.isArray(tpl)) {
            if (tpl.length > 1) {
                var arr = [], funs = {};
                //从模版中分出自定义函数
                Fw.each(tpl, function (item) {
                    if (Fw.isObject(item)) {
                        Fw.apply(funs, item);
                    }
                    else {
                        arr.push(item);
                    }
                });
                //注册自定义函数
                Fw.each(funs, function (prop, fun) {
                    if (Fw.isFunction(fun)) {
                        juicer.register(prop, fun);
                    }
                });
                //
                arguments[0] = arr.join('');
            }
            else {
                arguments[0] = tpl[0];
            }
        }
        return juicer.apply(this, arguments);
    }
};

//父窗口
if (self != top) {
    Fw.TOP_WINDOW = parent.window;
}

//浏览器判断
//是否IE
Fw.isIE = !!document.documentMode;
Fw.each([7, 8, 9, 10, 11], function (v) {
    Fw['isIE' + v] = Fw.isIE && document.documentMode === v;
});

//设备判断
var ua = navigator.userAgent.toLowerCase();
Fw.isIPhone = /iphone/i.test(ua);
Fw.isIPad = /ipad/i.test(ua);
Fw.isIOS = Fw.isIPhone || Fw.isIPad;
Fw.isAndroid = /android/i.test(ua);
Fw.isTouch = Fw.isIOS || Fw.isAndroid;

//
Fw.namespace('Fw.core', 'Fw.util', 'Fw.app');
