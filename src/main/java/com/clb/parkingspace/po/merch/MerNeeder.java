package com.clb.parkingspace.po.merch;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "mer_needer")//指定表名
public class MerNeeder {
    @TableId(value = "id")
    private String id;
    private String name;
    private int role;
    private String sex;
    private int age;
    private String province;
    private String city;
    private String area;
    private String idCard;
    private String lgt;
    private String lat;
    private String imgUrl;
    private String memo;
    private String phone;
    private String password;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastScan;
    private boolean hasNewMsg;
    private boolean isAccPhone;
}
