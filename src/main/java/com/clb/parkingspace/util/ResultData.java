package com.clb.parkingspace.util;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 表格分页数据对象
 */
public class ResultData implements Serializable {
    //
    private static final long serialVersionUID = -2652773809295318093L;
    /**
     * 消息状态码
     */
    private int code;
    private String msg;
    /**
     * 总记录数
     */
/*    private Long total;
    *//**
     * 列表数据
     *//*
    private List<?> rows;*/
    private Object data;
    private String currTime ;//当前时间
    /**
     * @author zmr
     */
    public ResultData() {
        super();
    }

    public String getCurrTime() {
        return currTime;
    }

    public void setCurrTime(String currTime) {
        this.currTime = currTime;
    }

    /**
     * @param code
     * @param msg
     * @author zmr
     */
    public ResultData(int code, String msg) {
        super();
        this.code = code;
        this.msg = msg;
    }

    /**
     * @param code
     * @param msg
     * @param data
     * @author zmr
     */
    public ResultData(int code, String msg, Object data) {
        super();
        this.code = code;
        this.msg = msg;
        this.data = data;
    }


/*
    public ResultData(int code, String msg, Long total, List<?> rows) {
        super();
        this.code = code;
        this.msg = msg;
        this.total = total;
        this.rows = rows;
    }
*/

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static ResultData success() {
        return new ResultData(Constant.SUCCESS, "success");
    }

    public static ResultData successMsg(String msg) {
        return new ResultData(Constant.SUCCESS, msg);
    }

    public static ResultData success(Object data) {
        return new ResultData(Constant.SUCCESS, "success", data);
    }

    public static ResultData error(int code, String msg) {
        return new ResultData(code, msg);
    }

    public static ResultData error(String msg) {
        return new ResultData(Constant.FAIL, msg);
    }
}
