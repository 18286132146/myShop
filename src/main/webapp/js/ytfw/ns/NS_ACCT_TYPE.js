NS.ACCT_TYPE = {
	SA : "01",// 借记卡
	CC : "02",// 信用卡
	ELE : "04",// 电子账号
	OTH : "08"// 他行卡
};
NS.ACCT_TYPE_NAME = {
	"01" : "借记卡",// 借记卡
	"02" : "信用卡",// 信用卡
	"04" : "电子账号",// 电子账号
	"08" : "他行卡"// 他行卡
};
// 账户状态
NS.ACCT_STAT = {
	NOM : "0", // 正常
	YKH : "1", // 预开户
	DJH : "2", // 待激活
	STOP : "3", // 停用
	LOCK : "4",// 锁定
	SELP : "5",// 休眠
	YXH : "6",// 预销户
	XH : "7",// 销户
};
NS.DEPT_TYPE = { // 存款类型
	ALA : "01", // 整存整取
	LAM : "02" // 零存整取
};
NS.ACTV_STAT = { // 信用卡状态
	ACTV : "1",
	NOACTV : "2"
};
NS.ACCT_LV = { // 账户等级
	QUR : "1",
	PAY : "2",
	PAYTRANS : "3"
};
NS.USER_LV = { // 用户等级
	I : "01",
	II : "02",
	III : "03"
};
NS.LEND_TYPE = {// 贷款状态
	A : "1",// 正常
	B : "2",// 逾期
	C : "3",// 结清
	D : "4"// 核销
};
NS.IS_DEFL = {// 是否默认账户
	Y : "1",// 是
	N : "0",// 否
};
// 交易明细收付标志
NS.IO_FLAG = {
	PAYEE : "1",// 收款
	PAY : "2",// 付款
}
// 是否为注册手机号
NS.MOBILE_TYPE = {
	LOGIN : "1",// 平台注册手机号
	OBLIG : "2",// 预留手机号
}
// 交易密码是否设置
NS.CC_POWD = {
	Y : "1",
	N : "0",
}
// 短信类型代码
NS.SMS_TYPE = {
	CC : "0",// 信用卡申请短信验证码
	NONBATCH : "1",// 非批量
	PAYBIN : "2",// 微信支付账户绑定验证（需根据转出账号/卡号验证手机号为核心预留手机号）
	PAYACCT : "3",// 微信支付动账
	PAYSIGN : "4",// 微信支付登录（当用户没有绑定账户时做登录交易，会要求用户输入手机号，核心需要校验手机号为核心预留手机号)
	RELIEVE : "5",// 微信账户解除绑定
	RE : "6",// 微信紧急挂失
	LOAN : "7",// 贷款预约
}
// 存款贷款利率参数类型代码
NS.PRAM_TYPE = {
	DEPOSITde : "1001",
	LOANS : "1002"
}