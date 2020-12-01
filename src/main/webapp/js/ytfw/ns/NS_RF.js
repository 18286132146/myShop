//公共变量
NS.RF = {};

/******** 贵州银行 start ************/
//到期预警 - 类型
NS.RF.GZ_WARN_TYPE = [
	{"key":"1","value":"定期存款到期"},
	{"key":"2","value":"理财"},
	{"key":"3","value":"保险"},
	{"key":"4","value":"结构性存款"},
	{"key":"5","value":"贷款产品到期"},
	{"key":"6","value":"贷款合同到期"},
	{"key":"7","value":"营业执照到期"},
	{"key":"8","value":"身份证到期"},
	{"key":"9","value":"抵押物到期预"},
	{"key":"10","value":"星级变动到期"},
	{"key":"11","value":"企业网银证书到期"}
];
//到期预警 & 大额异动 & 信息提醒 - 状态
NS.RF.GZ_DQYJ_STATUS = [
	{"key":"0","value":"未处理"},
	{"key":"1","value":"已处理"}
];
//到期预警 & 大额异动 - 客户类型
NS.RF.GZ_DQYJ_CUST_TYPE = [
	{"key":"1","value":"零售"},
	{"key":"2","value":"公司"}
];
//大额异动 - 异动类型  
NS.RF.GZ_DEYD_WARN_TYPE = [
	{"key":"0","value":"账户异动"},
	{"key":"1","value":"客户异动"}
];
//大额异动 - 异动方向    
NS.RF.GZ_DEYD_DC_FLAG = [
	{"key":"0","value":"转入"},
	{"key":"1","value":"行外转出"}
];
//信息提醒 - 提醒类型 -  18070601    
NS.RF.GZ_XXTX_WARN_TYPE = [];
//公告信息 - 类型 -  63000
NS.RF.GZ_GGXX_SN_TYPE = [];
//信息提醒 - 提醒状态
NS.RF.GZ_XXTX_STATUS = [
	{"key":"0","value":"未浏览"},
	{"key":"1","value":"已浏览"}
];
//营销任务 - 类型 0-年度任务，1-阶段性任务
NS.RF.GZ_YXRW_TI_TIME_TYPE = [
	{"key":"0","value":"年度任务"},
	{"key":"1","value":"阶段性任务"}
];
//营销任务 - 任务状态(0未下发,1已下发,2已接收,9已删除)
NS.RF.GZ_YXRW_TI_STATUS = [
	{"key":"0","value":"已结束"},
	{"key":"1","value":"未进行"},
	{"key":"2","value":"进行中"},
	{"key":"3","value":"已结束"}
];
// 任务状态  TWSSTATUS
NS.RF.GZ_KHBF_TWSSTATUS = [];
// 审批管理 - 审批类型
NS.RF.GZ_SPGL_FLOW_TYPE = [
	{"key":"0","value":"客户认领 "},
	{"key":"1","value":"主办申请"},
	{"key":"2","value":"客户托管"},
	{"key":"3","value":"客户移交"},
	{"key":"4","value":"星级变动"},
	{"key":"98","value":"星级变动"},
	{"key":"5","value":"客户退回"},
	{"key":"6","value":"客户分配"},
	{"key":"7","value":"客户回收"}, 
	{"key":"8","value":"短信模板审批"},
	{"key":"9","value":"团队管理"},
	{"key":"10","value":"短信群发"},
	{"key":"11","value":"营销任务"},
	{"key":"12","value":"营销活动"},
	{"key":"13","value":"特批权益星级变动"}
];
/******** 贵州银行 end ************/
//证件类型 
NS.RF.CUST_IDT = [
	{"key":"01",
		"value":"身份证"},
		{"key":"02",
		"value":"户口簿"},
		{"key":"03",
		"value":"护照"},
		{"key":"08",
		"value":"临时身份证"},
		{"key":"09",
		"value":"外国人居留证"},
		{"key":"11",
		"value":"其他个人证件"},
		{"key":"06",
		"value":"港澳居民来往内地通行证"},
		{"key":"07",
		"value":"台湾同胞来往内地通行证"},
		{"key":"04",
		"value":"军官证"},
		{"key":"05",
		"value":"士兵证"},
		{"key":"10",
		"value":"警官证"},
		{"key":"12",
		"value":"组织机构代码证"},
		{"key":"13",
		"value":"营业执照"},
		{"key":"14",
		"value":"其他企业证件"}
	]
;
//客户类型
// 消息 - 大额异动
NS.RF.POTE_TYPE = [
	{
		"key":"1",
		"value":"零售"
	},
	{
		"key":"2",
		"value":"对公"
	}
];
//客户状态
NS.RF.POTE_STATUS = [
	{
		"key":"0",
		"value":"潜在客户"
	},
	{
		"key":"1",
		"value":"我行客户"
	}
];
//网格类型
NS.RF.GRID_TYPE = [
	{
		"key":"1",
		"value":"平台"
	},
	{
		"key":"2",
		"value":"农户"
	}
];
//客户经理类型
NS.RF.RF_KHJL_TYPE = [
	{
		"key":"1",
		"value":"家金经理日志"
	},
	{
		"key":"2",
		"value":"公司经理日志"
	},
	{
		"key":"3",
		"value":"社区经理日志"
	}
];
//管户类型
NS.RF.MAN_MAIN = [
	{
		"key":"1",
		"value":"主办"
	},
	{
		"key":"2",
		"value":"协办"
	},
	{
		"key":"3",
		"value":"托管"
	}
];
//客户星级
NS.RF.CUST_LVL = [
	{
		"key":"0",
		"value":"零星级"
	},
	{
		"key":"1",
		"value":"一星级"
	},
	{
		"key":"2",
		"value":"二星级"
	},
	{
		"key":"3",
		"value":"三星级"
	},
	{
		"key":"4",
		"value":"四星级"
	},
	{
		"key":"5",
		"value":"五星级"
	}
];
//拜访类型   拜访类型
NS.RF.VISIT_TYPE = [];
//拜访方式
NS.RF.VISIT_CHANNEL = [
	{"key":"0","value":"电访"},
	{"key":"1","value":"面访"},
	{"key":"2","value":"走访"},
	{"key":"3","value":"短信"},
	{"key":"99","value":"其他"}
];
NS.RF.CUST_ATTITUDE = [
	{"key":"5","value":"非常好"},
	{"key":"4","value":"好"},
	{"key":"3","value":"一般"},
	{"key":"2","value":"差"}
];

//公告类型
NS.RF.SN_TYPE = [
    {
        "key":"3",
        "value":"新闻"
    },
    {
        "key":"1",
        "value":"通知"
    },
    {
        "key":"4",
        "value":"咨询"
    },
    {
        "key":"2",
        "value":"公告"
    }
];
//任务类型
NS.RF.TASK_TYPE = [
	{
		"key":"1",
		"value":"既定任务"
	},
	{
		"key":"2",
		"value":"不定时任务"
	},
	{
		"key":"3",
		"value":"自定义任务"
	}
];
//任务状态
NS.RF.TI_STATUS = [
    {
        "key":"1",
        "value":"未进行"
    },
    {
        "key":"2",
        "value":"进行中"
    },
    {
        "key":"3",
        "value":"已结束"
    }
];
//网格化-平台类型
NS.RF.wgh_CUST_TYPE = [
    {
        "key":"1",
        "value":"外贸型"
    },
    {
        "key":"2",
        "value":"集团型"
    },
    {
        "key":"3",
        "value":"出租型"
    },
    {
        "key":"4",
        "value":"印染集群"
    },
    {
        "key":"5",
        "value":"工业化集群"
    },
    {
        "key":"6",
        "value":"楼宇"
    },
    {
        "key":"7",
        "value":"4s店树状型"
    }
];
/**
 * 消息 - 信息提醒查询 
 * 提醒ID(1，客户逾期 2，风险评级变动 3，其他事件) [WARN_TYPE]
 */
NS.RF.WARN_TYPE_4 = [
    {
        "key":"1",
        "value":"客户逾期"
    },
    {
        "key":"2",
        "value":"风险评级变动"
    },
    {
        "key":"3",
        "value":"其他事件"
    }
];
//预警类型(01 定期存款到期,02 银票到期,03 贴现到期,04 还款日提醒,05 贷款合同到期,06 国际业务到期,07 保函到期,08 委托贷款合同到期,09 理财产品到期)
NS.RF.WARN_TYPE_1 = [
    {
        "key":"01",
        "value":"定期存款到期"
    },
    {
        "key":"02",
        "value":"银票到期"
    },
    {
        "key":"03",
        "value":"贴现到期"
    },
    {
        "key":"04",
        "value":"还款日提醒"
    },
    {
        "key":"05",
        "value":"贷款合同到期"
    },
    {
        "key":"06",
        "value":"国际业务到期"
    },
    {
        "key":"07",
        "value":"保函到期"
    },
    {
        "key":"08",
        "value":"委托贷款合同到期"
    },
    {
        "key":"09",
        "value":"理财产品到期"
    }
];
/**
 * 消息 - 信息提醒查询
 * 消息 - 大额异动
 * 
 * 提醒状态(0--未浏览 1--已浏览) [STATUS]
 * 
 */
NS.RF.STATUS_4 = [
    {
        "key":"0",
        "value":"未浏览"
    },
    {
        "key":"1",
        "value":"已浏览"
    }
];
/**
 * 消息 - 客户关怀
 * 关怀类型(01 客户大事提醒,02 亲属生日,03 公司开业,04 结婚纪念日,05 客户生日)
 * CARE_TYPE
 */
NS.RF.CARE_TYPE_3 = [
    {
        "key":"01",
        "value":"客户大事提醒"
    },
    {
        "key":"02",
        "value":"亲属生日"
    },
    {
        "key":"03",
        "value":"公司开业"
    },
    {
        "key":"04",
        "value":"结婚纪念日"
    },
    {
        "key":"05",
        "value":"客户生日"
    }
];
/**
 * 消息 - 大额异动
 * 借贷标志(0取 1存) [DC_FLAG]:
 * CARE_TYPE
 */
NS.RF.DC_FLAG_2 = [
    {
        "key":"0",
        "value":"取"
    },
    {
        "key":"1",
        "value":"存"
    }
];
/**
 * 自定义提醒频率
 */
NS.RF.FREQUENCY = [
    {
        "key":"0",
        "value":"日"
    },
    {
        "key":"1",
        "value":"周"
    },
    {
        "key":"2",
        "value":"月"
    },
    {
        "key":"3",
        "value":"年"
    }
];
/**
 * 是否到期
 */
NS.RF.IS_EXPIRE = [
    {
        "key":"0",
        "value":"未到期"
    },
    {
        "key":"1",
        "value":"已到期"
    }
];

