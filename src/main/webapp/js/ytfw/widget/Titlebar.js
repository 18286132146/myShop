$(function() {
	var TAG = "YT.Titlebar";
	YT.log.debug("--init--", TAG);
	var tpl = [ '<div class="web-title-warp">', '	<h1 class="web-title"></h1>',
			'	<span class="titlebar-left-btn"></span>',
			'	<span class="titlebar-right-btn"></span>', '</div>',
			'<div class="web-searchbar-warp"></div>' ].join("");
	var titleSearch_tpl = [
			'<div class="ui-searchbar ui-border-radius">',
			'<i class="ui-icon-search"></i>',
			'<div class="ui-searchbar-input">',
			'<input value="${val}" data-name="SEARCH_NAME" type="text" placeholder="${placeholder}">',
			'</div>', '</div>' ].join('');
	// 设置页面的标题栏；
	var me = YT.Titlebar = {
		divId : "web_titlebar",
		create : function() {
			YT.log.debug("---create--", TAG);
			var div = document.createElement("div");
			div.id = this.divId;
			var jqEl = $(div);
			jqEl.prependTo(document.body);
			this.div = jqEl.html(tpl);
			this.titleEl = jqEl.find(".web-title");
			this.btnLeft = jqEl.find(".titlebar-left-btn");
			this.btnRight = jqEl.find(".titlebar-right-btn");
		},
		change : function(conf) {
			this.div.removeClass();
			if (conf.theme == 'red') {
				this.div.addClass('theme-red');
			} else if (conf.theme == 'alpha') {
				this.div.addClass('theme-alpha');
			} else {
				this.div.addClass('theme-def');
			}
			conf.title && this.titleEl.html(conf.title);
			me._button(this.btnLeft, conf.leftButton);
			me._button(this.btnRight, conf.rightButton);
			this.div.find('.web-title-warp').show();
			this.div.find('.web-searchbar-warp').empty();

		},
		_button : function(btn, btnConf) {
			if (!(btnConf && btnConf.exist == "true")) {
				btn.hide();
				return;
			}
			var classname = btn.attr("class");
			if ("titlebar-right-btn" == classname) {
				btn.show().html(btnConf.name);
			} else {
				btn.show();
			}
			btn.attr("onclick", btnConf.func);

		},
		changeTitle : function(cfg) {
			if (YT.isEmpty(cfg) || !YT.isObject(cfg)) {
				return;
			}
			var val = cfg.defalutVal ? cfg.defalutVal : "";
			var placeholder = cfg.placeholder ? cfg.placeholder : "请输入搜索内容";
			var callback = cfg.callback;
			var params = {
				val : val,
				placeholder : placeholder
			}
			var title = $('#' + me.divId);
			var html = YT.template(titleSearch_tpl, params);
			this.div.find('.web-title-warp').hide();
			this.div.find('.web-searchbar-warp').html(html).show();
			this.div.off('keydown', '.web-searchbar-warp input');
			this.div.on('keydown', '.web-searchbar-warp input', function() {
				var e = window.event;
				if (e.keyCode == 13) {
					callback && callback($(this).val());
					me.div.find('.web-searchbar-warp').empty();
					me.div.find('.web-title-warp').show();
				}
				if (e.keyCode == 27) {
					me.div.find('.web-searchbar-warp').empty();
					me.div.find('.web-title-warp').show();
				}
			});
		},
	};
	me.create();
	YT.log.debug("--end--", TAG);
});