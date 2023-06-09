//公共变量
var NS = {};// 事件
/* pdf阅览页相对路径 不用修改*/
/* NS.SERVERPATH = "/showPdf/web/viewer.html?file="; */
/* 服务器文件代理路径 需要根据服务器修改*/
//NS.FILEPATH = "http://172.31.27.130:8000/UPLOAD/"
/* NS.FILEPATH = "http://172.31.27.47:8000/UPLOAD/" */
/* NS.FILEPATH = "http://172.31.26.102:8000/UPLOAD/" */
//拜访方式
NS.VISIT_CHANNEL = [
	{"key":"0","value":"电访"},
	{"key":"1","value":"面访"},
	{"key":"2","value":"走访"},
	{"key":"3","value":"短信"},
	{"key":"99","value":"其他"}
];
NS.MSG = {
	MsgMustInput : "请输入{0}！",
	MsgSelect : "请选择{0}！",
	MsgCheck : "请阅读并勾选{0}！",
	MsgMinLength : "{0}长度不能小于{1}位！",
	MsgMaxLength : "{0}长度不能超过{1}位！",
	MsgLength : "{0}长度必须为{1}位！",
	MsgMinValue : "{0}不能小于{1}！",
	MsgMaxValue : "{0}不能大于{1}！",
	MsgMoney : "{0}必须大于0！",
	MsgMoney2 : "{0}金额由整数或两位小数组成！",
	MsgNumber : "{0}必须是整数！",
	MsgFormat : "{0}格式不正确！",
	MsgStr : "{0}不能包含特殊字符！",
	Msglengu : "{0}必须是9-10位的字符",
	MsgAjaxError : "系统繁忙，系统繁忙请退出重试",
	Msg_int : "{0}必须是整数！",
	Msg_zipcode : "{0}必须为6位数字！",
	Msg_money : "金额由最多8位整数或2位小数组成！",
	Msg_card : "{0}必须是16-19位数字！",
	Msg_chinese : "{0}必须是汉字！",
	Msg_specialFont : "{0}不能包含特殊字符！",
	Msg_sms : "{0}必须为6位数字！",
};
NS.EVT_NAME = {
	QUERY : "查询",
	OK : "确定",
	BACK : "返回",
	CANCLE : "取消"
};
// 正则表达式
NS.PATTERN = {
	// 数字无点整形类型
	"int" : /^-?[1-9]\d*$/,
	int2 : /^\d*$/,//必须是正数
	// 手机号码验证
	mobile : /^0?(13[0-9]|14[57]|15[012356789]|17[0-9]|18[0-9]|166|198|199|147)[0-9]{8}$/,
	// 电话及手机号
	//phone : /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$|0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}/,
	// 邮政编码验证
	zipcode : /^[1-9][0-9]{5}$/,
	// 金额验证
	money : /^([1-9][\d]{0,8}|0)(\.[\d]{1,2})?$/,
	// 电子邮件
	email : /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
	// 银行卡号
	card : /^\d{16,19}$/,
	// 大写小写字母及数字
	lpd : /^[a-z|A-Z|0-9]*$/,
	// 中文字符
	chinese : /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/,
	// 中文字符带点号
	name : /^[\u4e00-\u9fa5]+·*[\u4e00-\u9fa5]*$/,
	// 校验非中文非数字非字符的字符
	specialFont : /[^\u4e00-\u9fa5\w，。；：“”‘’,.()（）]/,
	// 校验组织机构代码
	unitcode : /^[0-9a-zA-Z-]*$/,
	// 短信验证码
	sms : /^\d{6}$/
}
