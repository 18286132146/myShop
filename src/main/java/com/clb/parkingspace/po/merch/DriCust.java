package com.clb.parkingspace.po.merch;

import com.baomidou.mybatisplus.annotations.TableName;
import lombok.Data;


@Data
@TableName(value = "dri_cust")//指定表名
public class DriCust {
    private String custId;
    private String name;
    private int age;
    private String sex;
    private String  phone;
    private String province;
    private String city;
    private String area;
    private String remark;
    private String ownner;
    private String grade;
}
