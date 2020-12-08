
var App={
    formData:null
}


var picmax =1; //限制上传数量
function imgChange() {
	//如果是编辑状态图片回显
	//var userImg=document.getElementById('userImg');
    //如果是编辑状态图片回显
	var file = document.getElementById('file').files;
  /*  if(userImg!=null){
        file=userImg;
    }*/
    var imglist = document.querySelectorAll('.upload-Picitem');
    var piclist = document.getElementsByClassName('upload-piclist')[0];
    var filelist = file.length + imglist.length > picmax ? 1 - imglist.length : file.length + imglist.length;
	if (file.length + imglist.length >= 1) {
        var uploadfile = document.getElementsByClassName('upload-file')[0]
		//uploadfile.style.display = "none"
	}
	for (var i = 0; i < filelist; i++) {
		readerfile(file[i]).then(e => {
            var html = document.createElement('div');
			html.className = 'upload-Picitem';
			html.innerHTML = '<img onclick="previewImg.call(this)" src=' + e + ' alt="pic">';
			piclist.appendChild(html);
		})
	}
}


function clearFiles(){
    $("#file").files=null;
$(".upload-Picitem").remove();
    closeLayer();
}
var index = null;
function previewImg() {
    var content = "<div style='text-align: center'>" +
        "<img class='showImg' src='" + $(this).attr("src") + "'/> <br/>" +
        "<div style='width:4rem;height:2rem;font-size: 1.5rem;text-align: center; display: inline-block;line-height: normal' onclick='closeLayer();'>返回</div>" +
        "<div style='width:4rem;height:2rem;font-size: 1.5rem;text-align: center; display: inline-block;line-height: normal' onclick='clearFiles();'>删除</div>" +
        "</div>"

    index = layer.open({
        type: 1,
        closeBtn: 1,
        area: ['60%', '60%'],
        skin: 'layui-layer-nobg', //没有背景色
        shadeClose: true,
        content: content
    });

}
function closeLayer() {
    layer.close(index);
}
function readerfile(file) {
	return new Promise((resolve, reject) => {
        var reader = new FileReader();
		reader.addEventListener("load", function() {
			resolve(reader.result);
		}, false)
		if (file) {
			reader.readAsDataURL(file)
		}
	})
}


//textarea高度自适应
var autoTextarea = function(elem, extra, maxHeight) {
	extra = extra || 0;
	var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
		isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
		addEvent = function(type, callback) {
			elem.addEventListener ?
				elem.addEventListener(type, callback, false) :
				elem.attachEvent('on' + type, callback);
		},
		getStyle = elem.currentStyle ? function(name) {
			var val = elem.currentStyle[name];

			if (name === 'height' && val.search(/px/i) !== 1) {
				var rect = elem.getBoundingClientRect();
				return rect.bottom - rect.top -
					parseFloat(getStyle('paddingTop')) -
					parseFloat(getStyle('paddingBottom')) + 'px';
			};

			return val;
		} : function(name) {
			return getComputedStyle(elem, null)[name];
		},
		minHeight = parseFloat(getStyle('height'));

	elem.style.resize = 'none';

	var change = function() {
		var scrollTop, height,
			padding = 0,
			style = elem.style;

		if (elem._length === elem.value.length) return;
		elem._length = elem.value.length;

		if (!isFirefox && !isOpera) {
			padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
		};
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		elem.style.height = minHeight + 'px';
		if (elem.scrollHeight > minHeight) {
			if (maxHeight && elem.scrollHeight > maxHeight) {
				height = maxHeight - padding;
				style.overflowY = 'auto';
			} else {
				height = elem.scrollHeight - padding;
				style.overflowY = 'hidden';
			};
			style.height = height + extra + 'px';
			scrollTop += parseInt(style.height) - elem.currHeight;
			document.body.scrollTop = scrollTop;
			document.documentElement.scrollTop = scrollTop;
			elem.currHeight = parseInt(style.height);
		};
	};

	// addEvent('propertychange', change);
	// addEvent('input', change);
	// addEvent('focus', change);
	change();
};
