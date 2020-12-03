package com.clb.parkingspace.po;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "needer")//指定表名
public class Needer {
    @TableId(value = "id")
    private String id;
    private String name;
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
}
